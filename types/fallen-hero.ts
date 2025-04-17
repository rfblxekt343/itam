export interface FallenHero {
  id: string;
  timestamp: string;
  email: string;
  fullName: string;
  lastName?: string;
  gender: string;
  birthDate: string;
  age: number;
  city: string;
  biography?: string;
  instagramLink?: string;
  rank: string;
  unit: string;
  role: string;
  fallLocation: string;
  fallDate?: string; // renamed from dateOfFalling to match schema
  specialTraining: string;
  operations: string;
  commendations?: string;

  // existing properties
  dateOfFalling?: string; // Add this property


  // Individual story fields to match schema
  story1Title?: string;
  story1Content?: string;
  story1TellerName?: string;
  story1Relation?: string;

  story2Title?: string;
  story2Content?: string;
  story2TellerName?: string;
  story2Relation?: string;

  story3Title?: string;
  story3Content?: string;
  story3TellerName?: string;
  story3Relation?: string;

  story4Title?: string;
  story4Content?: string;
  story4TellerName?: string;
  story4Relation?: string;

  story5Title?: string;
  story5Content?: string;
  story5TellerName?: string;
  story5Relation?: string;

  // Stories array for application usage
  stories?: {
    title?: string;
    content: string;
    tellerName?: string;
    relation?: string;
  }[];

  // Event details

  eventDate: string;
  eventTitle: string;
  eventDescription: string;
  eventMedia: string;

  eventDate2?: string;
  eventTitle2?: string;
  eventDescription2?: string;
  eventMedia2?: string;

  eventDate3?: string;
  eventTitle3?: string;
  eventDescription3?: string;
  eventMedia3?: string;

  // Personal preferences
  favoriteSongs: string;
  favoriteBooks: string;
  favoriteMovies: string;
  favoritePlaces: string;
  quotes: string;
  leadingValues: string;
  hobbies: string;

  // Impact stories
  impactStory?: string;
  impactStoryTeller?: string;
  impactStoryRelation?: string;

  additionalImpactStory?: string;
  additionalImpactStoryTeller?: string; // Fixed capitalization
  additionalImpactStoryRelation?: string; // Fixed capitalization

  // Contact information
  contactFullName?: string;
  contactEmail?: string;
  contactPhone?: string;



  version: number;
}