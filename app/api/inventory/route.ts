import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('sds-inventory');
    
    // Get the latest inventory data
    const chemicals = await db
      .collection('chemicals')
      .find({})
      .sort({ updatedAt: -1 })
      .toArray();

    if (chemicals.length === 0) {
      return NextResponse.json(
        { error: 'No hay datos de inventario. Por favor sube un archivo Excel primero.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      chemicals: chemicals,
      lastUpdate: chemicals[0]?.updatedAt || new Date(),
      totalChemicals: chemicals.length
    });

  } catch (error) {
    console.error('Error fetching inventory:', error);
    return NextResponse.json(
      { error: 'Error al obtener el inventario' },
      { status: 500 }
    );
  }
}
