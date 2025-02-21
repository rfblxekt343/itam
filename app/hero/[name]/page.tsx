// app/hero/[name]/page.tsx
import { Suspense } from 'react';
import { HeroContent } from './HeroContent';
import { LoadingSpinner } from '@/components/LoadingSpinner';

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

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HeroContent params={{ name }} />
    </Suspense>
  );
}
