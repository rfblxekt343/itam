// app/heroes/page.js
import { prisma } from '@/lib/prisma';
import ClientHeroesPage from '../../components/HeroesDisplay';

// Server component to fetch heroes data
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

// Main page component (server component)
export default async function AllHeroesPage() {
  const heroes = await getHeroes();
  return <ClientHeroesPage heroes={heroes} />;
}