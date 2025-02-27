import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';

async function getHeroes() {
  try {
    const heroes = await prisma.hero.findMany({
      select: {
        id: true,
        fullName: true,
        rank: true,
        unit: true,
      },
      orderBy: {
        fullName: 'asc',
      },
    });
    return heroes;
  } catch (error) {
    console.error('Error fetching heroes:', error);
    return [];
  }
}

export default async function AllHeroesPage() {
  const heroes = await getHeroes();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-lime-600 text-3xl md:text-4xl font-extrabold text-center mb-6 text-gray-800">
        הגיבורים
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {heroes.map((hero) => (
          <Link
            href={`/hero/${encodeURIComponent(hero.fullName)}`}
            key={hero.id}
            className="block transform transition-transform duration-300 hover:scale-105"
          >
            <div className="bg-lime-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden p-4 text-center">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                {hero.fullName}
              </h2>
              <div className="flex justify-center">
                <Image
                  src={`/images/heroes/${hero.fullName}/photo1.jpeg`}
                  alt={hero.fullName}
                  width={200}
                  height={200}
                  className="rounded-lg object-cover w-full max-w-[200px] h-auto"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {heroes.length === 0 && (
        <div className="text-center text-gray-600 mt-12 text-lg">
          לא נמצאו גיבורים במערכת
        </div>
      )}
    </div>
  );
}
