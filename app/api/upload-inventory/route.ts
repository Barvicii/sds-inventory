import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import * as XLSX from 'xlsx';

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
    const data = XLSX.utils.sheet_to_json(firstSheet);
    
    if (data.length === 0) {
      return NextResponse.json(
        { error: 'El archivo Excel está vacío' },
        { status: 400 }
      );
    }

    // Check if it looks like ChemicalStores (has Chemical and location columns)
    const firstRow: any = data[0];
    const hasChemicalColumn = 'Chemical' in firstRow || 'ChemicalName' in firstRow;
    const hasLocationColumns = Object.keys(firstRow).some(key => 
      ['Wellsford', 'Pukekohe', 'Tuakau', 'Waiuku', 'Patumahoe'].includes(key)
    );

    if (!hasChemicalColumn || !hasLocationColumns) {
      return NextResponse.json(
        { 
          error: 'El archivo no parece ser ChemicalStores. Debe tener columnas "Chemical" y ubicaciones (Wellsford, Pukekohe, etc.)',
          found: Object.keys(firstRow)
        },
        { status: 400 }
      );
    }

    // Create timestamp for backup
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const publicDir = path.join(process.cwd(), 'public');
    
    // Ensure public directory exists
    if (!existsSync(publicDir)) {
      await mkdir(publicDir, { recursive: true });
    }

    // Backup old file if it exists
    const oldFilePath = path.join(publicDir, 'ChemicalStores.xlsx');
    if (existsSync(oldFilePath)) {
      const backupFilePath = path.join(publicDir, `ChemicalStores_backup_${timestamp}.xlsx`);
      const oldFile = await import('fs/promises').then(fs => fs.readFile(oldFilePath));
      await writeFile(backupFilePath, oldFile);
    }

    // Save new file
    const newFilePath = path.join(publicDir, 'ChemicalStores.xlsx');
    await writeFile(newFilePath, buffer);

    // Also save with timestamp
    const timestampedPath = path.join(publicDir, `ChemicalStores_${timestamp}.xlsx`);
    await writeFile(timestampedPath, buffer);

    // Analyze the data
    const chemicals = new Set<string>();
    let totalRows = 0;
    let newChemicals: string[] = [];

    // Get existing chemicals from the old file
    let existingChemicals = new Set<string>();
    if (existsSync(oldFilePath)) {
      try {
        const oldWorkbook = XLSX.readFile(oldFilePath);
        const oldSheet = oldWorkbook.Sheets[oldWorkbook.SheetNames[0]];
        const oldData = XLSX.utils.sheet_to_json(oldSheet);
        oldData.forEach((row: any) => {
          const name = row.Chemical || row.ChemicalName;
          if (name && name !== '(blank)' && !String(name).includes('Total')) {
            existingChemicals.add(String(name).trim());
          }
        });
      } catch (error) {
        console.error('Error reading old file:', error);
      }
    }

    // Analyze new data
    data.forEach((row: any) => {
      const name = row.Chemical || row.ChemicalName;
      if (name && name !== '(blank)' && !String(name).includes('Total')) {
        const chemicalName = String(name).trim();
        chemicals.add(chemicalName);
        totalRows++;
        
        if (!existingChemicals.has(chemicalName)) {
          newChemicals.push(chemicalName);
        }
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Archivo subido y procesado exitosamente',
      stats: {
        totalChemicals: chemicals.size,
        totalRows: totalRows,
        newChemicals: newChemicals.length,
        newChemicalsList: newChemicals,
        fileName: file.name,
        fileSize: `${(file.size / 1024).toFixed(2)} KB`,
        uploadDate: new Date().toISOString(),
        backupCreated: existsSync(oldFilePath)
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
