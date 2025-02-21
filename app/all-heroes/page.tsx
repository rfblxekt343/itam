import { prisma } from '@/lib/prisma';
import Link from 'next/link';


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
      <h1 className="text-lime-600 text-4xl font-extrabold text-center mb-8 text-gray-800">
        הגיבורים
      </h1>
 

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {heroes.map((hero) => (
          <Link
            href={`/hero/${encodeURIComponent(hero.fullName)}`}
            key={hero.id}
            className="block transform transition-transform duration-300 hover:scale-105"
          >
            <div className="bg-lime-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {hero.fullName}
                </h2>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>{hero.rank}</p>
                  <p>{hero.unit}</p>
                </div>
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
