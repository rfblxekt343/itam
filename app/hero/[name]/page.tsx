// app/hero/[name]/page.tsx
import { Suspense } from 'react';
import path from 'path'; // Import path for resolving directory
import { HeroContent } from './HeroContent';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { getHeroImagePaths } from '@/utils/imageUtils';

const BASE_IMAGES_DIR = path.resolve(process.cwd(), 'public/images/heroes');
const WEB_PATH_PREFIX = '/images/heroes'; 

interface PageProps {
  params: { name: string };
}

export default async function HeroPage({ params }: PageProps) {
  const name = await params.name;

  if (!name || name === 'undefined') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-8">
        <div className="text-2xl font-semibold text-red-600 mb-4">
          שם לא תקין
        </div>
        <div className="text-gray-600">
          אנא בדוק את הקישור ונסה שוב
        </div>
      </div>
    );
  }
  let heroImageUrls: string[] = [];

  try {
    // Decode the name ONLY for finding the folder on the server
    const decodedName = decodeURIComponent(name);
    //console.log(`[Server Component] Fetching images for hero: ${decodedName}`);

    // --- Call your actual utility function ---
    heroImageUrls = getHeroImagePaths(
        BASE_IMAGES_DIR,
        decodedName,    // Use decoded name for file system lookup
        WEB_PATH_PREFIX // Use web prefix to build URLs
    );
    //console.log(`[Server Component] Found ${heroImageUrls.length} images for ${decodedName}. URLs:`, heroImageUrls);

  } catch {
    //console.error(`[Server Component] Failed to get hero images for ${decodeURIComponent(name)}`);
    // Keep heroImageUrls as [] on error, so GalleryTab shows "No images"
  }
  //console.log(`[Server Component] Hero image URLs:`, heroImageUrls);
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HeroContent params={{ name }} initialImagePaths={heroImageUrls} />
    </Suspense>
  );
}