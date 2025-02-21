// utils/google-sheets-sync.ts
import { google } from 'googleapis';
import { PrismaClient } from '@prisma/client';
import path from 'path';

const prisma = new PrismaClient();

class GoogleSheetsSync {
  private auth;
  private sheets;

  constructor() {
    this.auth = new google.auth.GoogleAuth({
      keyFile: path.join(process.cwd(), 'credentials.json'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    this.sheets = google.sheets({ version: 'v4', auth: this.auth });
  }

  private transformRowToFallenData(row: string[]) {
    return {
      firstName: row[0],
      lastName: row[1],
      gender: row[2],
      birthDate: new Date(row[3]),
      age: parseInt(row[4], 10),
      city: row[5],
      biography: row[6],
      name: `${row[0]} ${row[1]}`,
      rank: row[7],
      unit: row[8],
      dateOfFalling: new Date(row[9]),
      placeOfFalling: row[10],
      hometown: row[11],
      slug: `${row[0]}-${row[1]}`.toLowerCase().replace(/\s+/g, '-'),
      values: row[12] ? row[12].split(',').map(v => v.trim()) : [],
      quotes: row[13] ? row[13].split(',').map(v => v.trim()) : [],
      hobbies: row[14] ? row[14].split(',').map(v => v.trim()) : [],
    };
  }

  async getSheetInfo(spreadsheetId: string) {
    try {
      const response = await this.sheets.spreadsheets.get({
        spreadsheetId,
      });
      return response.data.sheets;
    } catch (error) {
      console.error('Error getting sheet info:', error);
      throw error;
    }
  }

  async syncGoogleSheetsData() {
    try {
      const spreadsheetId = process.env.GOOGLE_SHEET_ID;
      if (!spreadsheetId) {
        throw new Error('GOOGLE_SHEET_ID not found in environment variables');
      }

      // First, get the sheet info
      const sheets = await this.getSheetInfo(spreadsheetId);
      console.log('Available sheets:', sheets?.map(sheet => sheet.properties?.title));

      // Get the first sheet name or use a specific one
      const sheetName = sheets?.[0]?.properties?.title;
      if (!sheetName) {
        throw new Error('No sheets found in the spreadsheet');
      }

      const range = `${sheetName}!A2:Z`;
      console.log('Using range:', range);

      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
      });

      const rows = response.data.values as string[][];
      
      if (!rows || rows.length === 0) {
        console.log('No data found.');
        return;
      }

      console.log(`Found ${rows.length} rows to process`);

      for (const row of rows) {
        if (row.length < 15) {  // Basic validation
          console.log('Skipping invalid row:', row);
          continue;
        }

        const fallenData = this.transformRowToFallenData(row);
        console.log(`Processing: ${fallenData.name}`);

        await prisma.fallen.upsert({
          where: {
            slug: fallenData.slug,
          },
          update: fallenData,
          create: fallenData,
        });
      }

      console.log('Data sync completed successfully.');
    } catch (error) {
      console.error('Error syncing data:', error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }
}

export const googleSheetsSync = new GoogleSheetsSync();