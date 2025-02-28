// In the API endpoint: /app/api/search/route.ts
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')

    if (!query) {
      return NextResponse.json({ results: [] })
    }

    // Search for heroes where the query is a substring of their fullName (case-insensitive)
    const heroes = await prisma.hero.findMany({
      where: {
        fullName: {
          contains: query, // Check if query is contained anywhere in fullName
          mode: 'insensitive', // Case insensitive search
        },
      },
      select: {
        id: true,
        fullName: true,
        unit: true,
        role: true,
        city: true,
        fallLocation: true,
        specialTraining: true,
        operations: true,
      },
    })

    // Map heroes to results matching the SearchResult interface
    const results = heroes.map(hero => ({
      id: hero.id,
      name: hero.fullName,
      slug: encodeURIComponent(hero.fullName.trim()) // Use the fullName for the slug
    }))

    return NextResponse.json({ results })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}
