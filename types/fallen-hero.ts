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
  biography: string;
  instagramLink?: string;
  rank: string;
  unit: string;
  role: string;
  fallLocation: string;
  specialTraining: string;
  operations: string;
  commendations?: string;
  dateOfFalling?:string
  
  // Stories
  // Stories array
  
  stories: {
    title?:string;
    content: string;
    tellerName?: string;
    relation?: string;
  }[];

  
  
  // Event details
  photos: string;
  eventDate: string;
  eventTitle: string;
  eventDescription: string;
  eventMedia: string;
  
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
  additionalimpactStoryTeller?: string;
  additionalimpactStoryRelation?: string;
  
  
  // Contact information
  contactFullName?: string;
  contactEmail?: string;
  contactPhone?: string;

  photosNumber:number;
  
  version: number;
}