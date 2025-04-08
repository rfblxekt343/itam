// utils/imageUtils.ts (or your preferred location)
import fs from 'fs';
import path from 'path';

/**
 * Lists image files within a specific hero's image directory.
 * Ensures the function runs only on the server-side.
 *
 * @param baseImagesDir - The absolute path to the base directory on the server
 * containing all hero image folders (e.g., path.resolve('./public/images/heroes')).
 * @param heroFolderName - The name of the specific hero's folder (e.g., hero.fullName).
 * @param webPathPrefix - The URL prefix for accessing these images from the web (e.g., '/images/heroes').
 * @returns An array of web-accessible image URLs, or an empty array if the directory doesn't exist or is empty.
 */
export function getHeroImagePaths(
    baseImagesDir: string,
    heroFolderName: string,
    webPathPrefix: string
  ): string[] {

  // Basic check to prevent accidental client-side execution (fs is server-only)
  if (typeof window !== 'undefined') {
      console.error("getHeroImagePaths should only be called on the server.");
      return [];
  }

  const heroDirPath = path.join(baseImagesDir, heroFolderName);
  // Ensure consistent URL path separators
  const heroWebPath = `${webPathPrefix}/${heroFolderName}`.replace(/\\/g, '/');

  try {
    // Check if the directory exists first
    if (!fs.existsSync(heroDirPath)) {
      console.warn(`Directory not found: ${heroDirPath}`);
      return []; // Return empty array if directory doesn't exist
    }

    // Read all entries (files and subdirectories) in the hero's directory synchronously
    // Use readdir for async operation in real applications if performance is critical
    const directoryEntries: string[] = fs.readdirSync(heroDirPath);

    const imageFiles: string[] = directoryEntries
      .filter((fileName: string) => {
        const filePath = path.join(heroDirPath, fileName);
        try {
          // Check if it's a file and has a common image extension
          // Add other checks like file size if needed
          return fs.statSync(filePath).isFile() && /\.(jpe?g|png|gif|webp|svg)$/i.test(fileName);
        } catch (statError) {
            // Handle error if file disappears between readdir and statSync, or permissions issue
            console.error(`Error stating file ${filePath}:`, statError);
            return false;
        }
      })
      // Map file names to their full web-accessible URL paths
      .map((fileName: string) => `${heroWebPath}/${fileName}`);

    return imageFiles;

  } catch (error) {
    // Log other potential errors (e.g., permissions issues)
    console.error(`Error reading directory ${heroDirPath}:`, error instanceof Error ? error.message : error);
    // Depending on requirements, you might re-throw the error or return empty
    // throw error; // Option: re-throw if you want the calling code to handle it
    return []; // Option: return empty array on error
  }
}