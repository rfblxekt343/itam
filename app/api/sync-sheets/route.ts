// app/api/sync-sheets/route.ts
import { NextResponse } from 'next/server'
import { googleSheetsSync } from '../../../utils/google-sheets-sync'

export async function POST() {
  try {
    await googleSheetsSync.syncGoogleSheetsData();
    return NextResponse.json({ message: 'Sync process completed successfully' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error in sync handler:', error);
    return NextResponse.json(
      { message: 'Error during sync process', error: errorMessage },
      { status: 500 }
    );
  }
}