import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: NextRequest,
  { params }: { params: { name: string } }
) {
  try {
    const { name } = params;

    if (!name || name === 'undefined' || name === 'null') {
      return NextResponse.json(
        { error: 'Invalid hero name' },
        { status: 400 }
      );
    }

    const decodedName = decodeURIComponent(name).trim();

    // First try exact match
    let hero = await prisma.hero.findFirst({
      where: {
        fullName: {
          equals: decodedName,
          mode: 'insensitive'
        }
      }
    });

    // If no results, try with contains
    if (!hero) {
      console.log("Exact match not found, trying contains search");
      hero = await prisma.hero.findFirst({
        where: {
          fullName: {
            contains: decodedName,
            mode: 'insensitive'
          }
        }
      });
    }

    // If still no results, try without parentheses
    if (!hero) {
      console.log("Contains search failed, trying without parentheses");

      // Remove parentheses and normalize spaces
      const simplifiedName = decodedName.replace(/\s*\([^)]*\)\s*/g, ' ').trim();

      console.log("Simplified name for search:", simplifiedName);

      hero = await prisma.hero.findFirst({
        where: {
          fullName: {
            contains: simplifiedName,
            mode: 'insensitive'
          }
        }
      });
    }

    // Try to match by first name if all else fails
    if (!hero) {
      console.log("Trying to match by first name only");
      const firstNameOnly = decodedName.split(' ')[0].trim();

      hero = await prisma.hero.findFirst({
        where: {
          fullName: {
            contains: firstNameOnly,
            mode: 'insensitive'
          }
        }
      });
    }

    if (!hero) {
      console.log("Hero not found after all attempts");
      return NextResponse.json(
        { error: 'Hero not found' },
        { status: 404 }
      );
    }

    console.log("hero data", hero)

    // Create a transformed hero that includes a stories array
    const transformedHero = {
      id: hero.id,
      timestamp: hero.timestamp,
      email: hero.email,
      fullName: hero.fullName,
      firstName: hero.fullName.split(' ')[0],
      lastName: hero.lastName || hero.fullName.split(' ').slice(1).join(' '),
      gender: hero.gender,
      birthDate: hero.birthDate,
      age: hero.age,
      city: hero.city,
      biography: hero.biography || '',
      instagramLink: hero.instagramLink || '',
      rank: hero.rank,
      unit: hero.unit,
      role: hero.role,
      fallLocation: hero.fallLocation,
      dateOfFalling: hero.fallDate || '',
      specialTraining: hero.specialTraining,
      operations: hero.operations,
      commendations: hero.commendations || '',

      // Stories array
      stories: [
        hero.story1Content && {
          title: hero.story1Title || '',
          content: hero.story1Content,
          tellerName: hero.story1TellerName,
          relation: hero.story1Relation
        },
        hero.story2Content && {
          title: hero.story2Title || '',
          content: hero.story2Content,
          tellerName: hero.story2TellerName,
          relation: hero.story2Relation
        },
        hero.story3Content && {
          title: hero.story3Title || '',
          content: hero.story3Content,
          tellerName: hero.story3TellerName,
          relation: hero.story3Relation
        },
        hero.story4Content && {
          title: hero.story4Title || '',
          content: hero.story4Content,
          tellerName: hero.story4TellerName,
          relation: hero.story4Relation
        },
        hero.story5Content && {
          title: hero.story5Title || '',
          content: hero.story5Content,
          tellerName: hero.story5TellerName,
          relation: hero.story5Relation
        }
      ].filter(Boolean),

      // Events
      eventDate: hero.eventDate,
      eventTitle: hero.eventTitle,
      eventDescription: hero.eventDescription,
      eventMedia: hero.eventMedia,

      eventDate2: hero.eventDate2 || '',
      eventTitle2: hero.eventTitle2 || '',
      eventDescription2: hero.eventDescription2 || '',
      eventMedia2: hero.eventMedia2 || '',

      eventDate3: hero.eventDate3 || '',
      eventTitle3: hero.eventTitle3 || '',
      eventDescription3: hero.eventDescription3 || '',
      eventMedia3: hero.eventMedia3 || '',

      // Personal preferences
      favoriteSongs: hero.favoriteSongs,
      favoriteBooks: hero.favoriteBooks,
      favoriteMovies: hero.favoriteMovies,
      favoritePlaces: hero.favoritePlaces,
      quotes: hero.quotes,
      leadingValues: hero.leadingValues,
      hobbies: hero.hobbies,

      // Impact stories
      impactStory: hero.impactStory || '',
      impactStoryTeller: hero.impactStoryTeller || '',
      impactStoryRelation: hero.impactStoryRelation || '',
      additionalImpactStory: hero.additionalImpactStory || '',
      additionalImpactStoryTeller: hero.additionalImpactStoryTeller || '',
      additionalImpactStoryRelation: hero.additionalImpactStoryRelation || '',

      // Contact
      contact: hero.contactFullName ? {
        fullName: hero.contactFullName,
        email: hero.contactEmail,
        phone: hero.contactPhone
      } : null,

      photos: hero.photos,
      //eventMedia: hero.eventMedia,
      photosNumber: hero.photosNumber,

      // Version
      version: hero.version
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