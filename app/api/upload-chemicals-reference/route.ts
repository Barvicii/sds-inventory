import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import * as XLSX from 'xlsx';
import { readFileSync } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Endpoint para cargar los datos de Chemicals.xlsx a MongoDB
 * Solo necesita ejecutarse una vez, o cuando se actualice el archivo de referencia
 */
export async function POST(request: NextRequest) {
  try {
    console.log('📚 Starting Chemicals reference data upload to MongoDB...');

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('sds-inventory');
    const chemicalsRefCollection = db.collection('chemicalsReference');

    // Read Chemicals.xlsx file using fs
    const chemicalsPath = path.join(process.cwd(), 'public', 'Chemicals_20260108193431.xlsx');
    console.log(`📂 Reading file from: ${chemicalsPath}`);
    
    const fileBuffer = readFileSync(chemicalsPath);
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
    const sheet = workbook.Sheets['Data'];
    const rawData = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as any[][];
    
    // Find header row (should be row 2, index 2)
    let headerRowIndex = -1;
    for (let i = 0; i < Math.min(10, rawData.length); i++) {
      const row = rawData[i];
      if (row && row.includes('Description')) {
        headerRowIndex = i;
        console.log(`✓ Found header row at index ${i}`);
        break;
      }
    }
    
    if (headerRowIndex === -1) {
      throw new Error('Could not find header row with "Description" column');
    }
    
    // Adjust range to start from header
    const range = XLSX.utils.decode_range(sheet['!ref'] || 'A1');
    range.s.r = headerRowIndex;
    const adjustedRef = XLSX.utils.encode_range(range);
    const tempSheet = { ...sheet, '!ref': adjustedRef };
    const data = XLSX.utils.sheet_to_json(tempSheet);
    
    console.log(`📊 Found ${data.length} chemicals in reference file`);

    // Prepare documents for MongoDB
    const chemicalDocs = data
      .filter((row: any) => row.Description) // Only rows with a name
      .map((row: any) => ({
        name: row.Description.trim(),
        sprayChemicalID: row.SprayChemicalID || null,
        type: row.Type || 'Chemical',
        stockUnit: row.StockUnit || '',
        activeIngredient: row.ActiveIngredient || '',
        hazardClasses: row.HazardClasses || '',
        msdsLink: row.MSDSLink || '',
        msdsExpiryDate: row.MSDSExpiryDate || null,
        licenceCode: row.LicenceCode || '',
        bioGroCert: row.BioGroCert || false,
        latestCost: row.LatestCost || null,
        sprayMixGroup: row.SprayMixGroup || '',
        primaryTarget: row.PrimaryTarget || '',
        secondaryTarget: row.SecondaryTarget || '',
        witholdingPeriodDays: row.WitholdingPeriodDays || null,
        reentryPeriod: row.ReentryPeriod || null,
        isActive: row.IsActive !== false, // Default to true
        tags: row.Tags || '',
        notes: row.Notes || '',
        updatedAt: new Date()
      }));

    console.log(`🗑️ Clearing old reference data...`);
    const deleteResult = await chemicalsRefCollection.deleteMany({});
    console.log(`   Deleted ${deleteResult.deletedCount} old documents`);

    console.log(`💾 Inserting ${chemicalDocs.length} chemical reference records...`);
    const insertResult = await chemicalsRefCollection.insertMany(chemicalDocs);
    console.log(`✅ Inserted ${insertResult.insertedCount} documents`);

    // Create index on name for fast lookups
    await chemicalsRefCollection.createIndex({ name: 1 });
    console.log(`🔍 Created index on 'name' field`);

    // Get some statistics
    const withHazardClasses = chemicalDocs.filter(doc => doc.hazardClasses).length;
    const chemicals = chemicalDocs.filter(doc => doc.type === 'Chemical').length;
    const fertilizers = chemicalDocs.filter(doc => doc.type === 'Fertilizer').length;

    const stats = {
      totalChemicals: chemicalDocs.length,
      withHazardClasses,
      chemicals,
      fertilizers,
      uploadDate: new Date()
    };

    console.log(`📈 Upload Statistics:`, stats);

    return NextResponse.json({
      success: true,
      message: 'Chemicals reference data uploaded successfully',
      stats
    });

  } catch (error: any) {
    console.error('❌ Error uploading chemicals reference:', error);
    return NextResponse.json(
      { error: 'Failed to upload chemicals reference data', details: error.message },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint to check current reference data status
 */
export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('sds-inventory');
    const chemicalsRefCollection = db.collection('chemicalsReference');

    const total = await chemicalsRefCollection.countDocuments();
    const withHazard = await chemicalsRefCollection.countDocuments({ 
      hazardClasses: { $ne: '' } 
    });

    const sample = await chemicalsRefCollection.find({}).limit(5).toArray();

    return NextResponse.json({
      total,
      withHazardClasses: withHazard,
      sampleData: sample
    });

  } catch (error: any) {
    console.error('Error checking reference data:', error);
    return NextResponse.json(
      { error: 'Failed to check reference data', details: error.message },
      { status: 500 }
    );
  }
}
