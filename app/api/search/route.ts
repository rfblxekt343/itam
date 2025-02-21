// app/api/search/route.ts

import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')

    if (!query) {
      return NextResponse.json({ results: [] })
    }

    const heroes = await prisma.hero.findMany({
      where: {
        OR: [
          { fullName: { contains: query, mode: 'insensitive' } },
          { unit: { contains: query, mode: 'insensitive' } },
          { role: { contains: query, mode: 'insensitive' } },
          { city: { contains: query, mode: 'insensitive' } },
          { fallLocation: { contains: query, mode: 'insensitive' } },
          { specialTraining: { contains: query, mode: 'insensitive' } },
          { operations: { contains: query, mode: 'insensitive' } },
        ],
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

    // Transform the data to match the SearchResult interface
    const results = heroes.map(hero => ({
      id: hero.id,
      name: hero.fullName,
      unit: hero.unit,
      rank: hero.role, // Mapping role to rank as per your interface
      city: hero.city,
      placeOfFalling: hero.fallLocation,
      specialTraining: [hero.specialTraining], // Converting to array as per interface
      operations: [hero.operations], // Converting to array as per interface
      slug: hero.fullName.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-\u0590-\u05FF]+/g, '')
    }))

    return NextResponse.json({ results })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}