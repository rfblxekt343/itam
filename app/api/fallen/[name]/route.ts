import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface RouteSegment {
  params: {
    name: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function GET(
  req: NextRequest,
  { params }: RouteSegment
) {
  try {
    const { name } = params;
    
    if (!name || name === 'undefined' || name === 'null') {
      return NextResponse.json(
        { error: 'Invalid hero ID' },
        { status: 400 }
      );
    }

    const decodedId = decodeURIComponent(name);
    const normalizedId = decodedId.replace(/-/g, ' ').trim();

    const query = {
      where: {
        fullName: {
          equals: normalizedId,
          mode: 'insensitive' as const
        }
      }
    };

    const hero = await prisma.hero.findFirst(query);

    if (!hero) {
      return NextResponse.json(
        { error: 'Hero not found' },
        { status: 404 }
      );
    }

    const transformedHero = {
      id: hero.id,
      firstName: hero.fullName.split(' ')[0],
      lastName: hero.lastName || hero.fullName.split(' ').slice(1).join(' '),
      fullName: hero.fullName,
      gender: hero.gender,
      birthDate: hero.birthDate,
      rank: hero.rank,
      unit: hero.unit,
      role: hero.role,
      dateOfFalling: hero.fallDate,
      age: hero.age,
      city: hero.city,
      biography: hero.biography,
      instagramLink: hero.instagramLink,
      specialTraining: hero.specialTraining,
      operations: hero.operations,
      commendations: hero.commendations,
    
      stories: [
        hero.story1Content && {
          title: hero.story1Title || "",
          content: hero.story1Content,
          tellerName: hero.story1TellerName,
          relation: hero.story1Relation
        },
        hero.story2Content && {
          title: hero.story2Title || "",
          content: hero.story2Content,
          tellerName: hero.story2TellerName,
          relation: hero.story2Relation
        },
        hero.story3Content && {
          title: hero.story3Title || "",
          content: hero.story3Content,
          tellerName: hero.story3TellerName,
          relation: hero.story3Relation
        },
        hero.story4Content && {
          title: hero.story4Title || "",
          content: hero.story4Content,
          tellerName: hero.story4TellerName,
          relation: hero.story4Relation
        },
        hero.story5Content && {
          title: hero.story5Title || "",
          content: hero.story5Content,
          tellerName: hero.story5TellerName,
          relation: hero.story5Relation
        }
      ].filter(Boolean),
    
      impactStories: [
        hero.impactStory && {
          content: hero.impactStory,
          tellerName: hero.impactStoryTeller,
          relation: hero.impactStoryRelation
        },
        hero.additionalImpactStory && {
          content: hero.additionalImpactStory,
          tellerName: null,
          relation: null
        }
      ].filter(Boolean),
    
      contact: hero.contactFullName ? {
        fullName: hero.contactFullName,
        email: hero.contactEmail,
        phone: hero.contactPhone
      } : null,
    
      photos: hero.photos,
      eventMedia: hero.eventMedia
    };

    return NextResponse.json(transformedHero);
    
  } catch (error) {
    console.error('Detailed error in /api/fallen/[id]:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      params
    });

    if (error instanceof Error) {
      if (error.message.includes('Prisma')) {
        return NextResponse.json(
          { error: 'Database error', details: error.message },
          { status: 500 }
        );
      }
      
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}