import { NextResponse } from 'next/server';
import { readDataStore, writeDataStore } from '@/lib/data-store';

export async function GET() {
  try {
    // Try to read the data store
    const data = await readDataStore();
    
    // Try to write to the data store
    await writeDataStore(data);
    
    return NextResponse.json({ 
      success: true,
      message: 'Successfully connected to JSONBin.io',
      binId: process.env.NEXT_PUBLIC_JSONBIN_BIN_ID,
      apiKey: process.env.JSONBIN_API_KEY ? 'Set' : 'Not Set'
    });
  } catch (error) {
    console.error('Connection test failed:', error);
    return NextResponse.json({ 
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      binId: process.env.NEXT_PUBLIC_JSONBIN_BIN_ID,
      apiKey: process.env.JSONBIN_API_KEY ? 'Set' : 'Not Set'
    }, { status: 500 });
  }
} 