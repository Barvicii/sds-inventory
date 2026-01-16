import { NextRequest, NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import clientPromise from '@/lib/mongodb';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No se recibió ningún archivo' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      return NextResponse.json(
        { error: 'El archivo debe ser formato Excel (.xlsx o .xls)' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Parse Excel file to validate it
    let workbook;
    try {
      workbook = XLSX.read(buffer, { type: 'buffer' });
    } catch (error) {
      return NextResponse.json(
        { error: 'No se pudo leer el archivo Excel. Asegúrate que sea un archivo válido.' },
        { status: 400 }
      );
    }

    // Validate that it has the expected structure
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    
    // Try to read the data - ChemicalStores has headers on row 5 (0-indexed)
    const rawData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
    
    // Find the header row (contains "Chemical")
    let headerRowIndex = -1;
    for (let i = 0; i < Math.min(10, rawData.length); i++) {
      const row = rawData[i] as any[];
      if (row && row.includes('Chemical')) {
        headerRowIndex = i;
        break;
      }
    }

    if (headerRowIndex === -1) {
      return NextResponse.json(
        { error: 'No se encontró la fila de encabezados con "Chemical"' },
        { status: 400 }
      );
    }

    // Read data starting from the header row
    const range = XLSX.utils.decode_range(firstSheet['!ref'] || 'A1');
    range.s.r = headerRowIndex;
    const adjustedRef = XLSX.utils.encode_range(range);
    const tempSheet = { ...firstSheet, '!ref': adjustedRef };
    const data = XLSX.utils.sheet_to_json(tempSheet);
    
    if (data.length === 0) {
      return NextResponse.json(
        { error: 'El archivo Excel está vacío o no tiene datos después de los encabezados' },
        { status: 400 }
      );
    }

    // Check if it looks like ChemicalStores
    const firstRow: any = data[0];
    const hasChemicalColumn = 'Chemical' in firstRow;
    const hasStoreColumn = 'Store' in firstRow || 'StockUnit' in firstRow;

    if (!hasChemicalColumn || !hasStoreColumn) {
      return NextResponse.json(
        { 
          error: 'El archivo no parece ser ChemicalStores. Debe tener columnas "Chemical" y "Store"',
          found: Object.keys(firstRow)
        },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    let client;
    try {
      client = await clientPromise;
    } catch (error) {
      console.error('MongoDB connection error:', error);
      return NextResponse.json(
        { 
          error: 'No se pudo conectar a MongoDB. Verifica que:\n' +
                 '1. MONGODB_URI esté configurado en las variables de entorno\n' +
                 '2. MongoDB Atlas permita conexiones desde 0.0.0.0/0 (todas las IPs)\n' +
                 '3. El usuario de MongoDB tenga permisos correctos\n\n' +
                 'Error técnico: ' + (error as Error).message
        },
        { status: 500 }
      );
    }
    
    const db = client.db('sds-inventory');
    const chemicalsCollection = db.collection('chemicals');
    const uploadsCollection = db.collection('uploads');

    // Get existing chemicals from database
    const existingChemicals = new Set<string>();
    const existingDocs = await chemicalsCollection.find({}).toArray();
    existingDocs.forEach(doc => {
      existingChemicals.add(doc.name);
    });

    // Process new data
    const chemicals = new Set<string>();
    let totalRows = 0;
    let newChemicals: string[] = [];
    const chemicalData: any[] = [];

    data.forEach((row: any) => {
      const name = row.Chemical;
      if (name && name !== '(blank)' && !String(name).includes('Total')) {
        const chemicalName = String(name).trim();
        chemicals.add(chemicalName);
        totalRows++;
        
        if (!existingChemicals.has(chemicalName)) {
          newChemicals.push(chemicalName);
        }

        // Store full row data
        chemicalData.push({
          name: chemicalName,
          store: row.Store || '',
          stockUnit: row.StockUnit || '',
          total: row.Total || 0,
          updatedAt: new Date()
        });
      }
    });

    // Update chemicals in database
    // Delete old data
    await chemicalsCollection.deleteMany({});
    
    // Insert new data
    if (chemicalData.length > 0) {
      await chemicalsCollection.insertMany(chemicalData);
    }

    // Save upload history
    const uploadRecord = {
      fileName: file.name,
      fileSize: file.size,
      uploadDate: new Date(),
      totalChemicals: chemicals.size,
      totalRows: totalRows,
      newChemicals: newChemicals,
      processedBy: 'admin',
    };
    await uploadsCollection.insertOne(uploadRecord);

    return NextResponse.json({
      success: true,
      message: 'Archivo subido y procesado exitosamente. Datos guardados en MongoDB.',
      stats: {
        totalChemicals: chemicals.size,
        totalRows: totalRows,
        newChemicals: newChemicals.length,
        newChemicalsList: newChemicals,
        fileName: file.name,
        fileSize: `${(file.size / 1024).toFixed(2)} KB`,
        uploadDate: new Date().toISOString(),
        savedToDatabase: true
      }
    });

  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Error procesando el archivo: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
