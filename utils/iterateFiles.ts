import * as fs from 'fs';
import * as path from 'path';

async function iterateFiles(directory: string): Promise<void> {
  try {
    const files = await fs.promises.readdir(directory);

    for (const file of files) {
      const fullPath = path.join(directory, file);
      const stats = await fs.promises.stat(fullPath);

      if (stats.isFile()) {
        console.log(`File: ${fullPath}`);
      } 
      
    //   else if (stats.isDirectory()) {
    //     console.log(`Directory: ${fullPath}`);
    //     // Recursively iterate over subdirectories
    //     await iterateFiles(fullPath);
    //   }
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error reading directory: ${error.message}`);
    } else {
      console.error('Error reading directory: Unknown error');
    }
  }
}

// Example usage
const directoryPath = path.join(__dirname, 'your-directory-name');
iterateFiles(directoryPath);
