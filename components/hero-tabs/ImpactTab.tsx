import { Card, CardContent } from "@/components/ui/card";
import { FallenHero } from "@/types/fallen-hero";

// Define interface for impact story structure
interface ImpactStory {
  content?: string;
  tellerName?: string;
  relation?: string;
}

interface ImpactTabProps {
  hero: FallenHero;
}

// Extended hero type that might include impactStories array
interface ExtendedFallenHero extends FallenHero {
  impactStories?: ImpactStory[];
}

export function ImpactTab({ hero }: ImpactTabProps) {
  // Helper function to check if a story section has content
  const hasStoryContent = (story: string | undefined, teller: string | undefined, relation: string | undefined): boolean => {
    return (!!story && story.trim() !== "") || 
           (!!teller && teller.trim() !== "") || 
           (!!relation && relation.trim() !== "");
  };

  // Check if the API transformation created impactStories array instead of individual fields
  if (hero.hasOwnProperty('impactStories') && Array.isArray((hero as ExtendedFallenHero).impactStories)) {
    const impactStories = (hero as ExtendedFallenHero).impactStories;
    
    if (!impactStories || impactStories.length === 0) {
      return <div className="text-center py-8 text-gray-500">אין סיפורי השפעה</div>;
    }

    return (
      <div className="space-y-6">
        {impactStories.map((story: ImpactStory, index: number) => (
          <Card key={index} className="shadow-md rounded-xl overflow-hidden border border-gray-100">
            <CardContent className="p-6">
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-gray-800 mb-2">
                  {index === 0 ? "סיפור השפעה" : "סיפור השפעה נוסף"}
                </h2>
                
                {(story.tellerName || story.relation) && (
                  <div className="text-right mb-3">
                    {story.tellerName && story.relation && (
                      <p className="font-semibold text-gray-700">{story.tellerName} • {story.relation}</p>
                    )}
                    
                    {story.tellerName && !story.relation && (
                      <p className="font-semibold text-gray-700">{story.tellerName}</p>
                    )}
                    
                    {!story.tellerName && story.relation && (
                      <p className="font-semibold text-gray-700">{story.relation}</p>
                    )}
                  </div>
                )}
                
                {story.content && story.content.trim() !== "" && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 whitespace-pre-line leading-relaxed">{story.content}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Fallback to original implementation if using separate fields
  // Check if each story section has content
  const hasFirstStory = hasStoryContent(hero.impactStory, hero.impactStoryTeller, hero.impactStoryRelation);
  const hasSecondStory = hasStoryContent(hero.additionalImpactStory, hero.additionalimpactStoryTeller, hero.additionalimpactStoryRelation);

  if (!hasFirstStory && !hasSecondStory) {
    return <div className="text-center py-8 text-gray-500">אין סיפורי השפעה</div>;
  }

  return (
    <div className="space-y-6">
      {hasFirstStory && (
        <Card className="shadow-md rounded-xl overflow-hidden border border-gray-100">
          <CardContent className="p-6">
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-800 mb-2">סיפור השפעה</h2>
              
              {(hero.impactStoryTeller || hero.impactStoryRelation) && (
                <div className="text-right mb-3">
                  {hero.impactStoryTeller && hero.impactStoryRelation && (
                    <p className="font-semibold text-gray-700">{hero.impactStoryTeller} • {hero.impactStoryRelation}</p>
                  )}
                  
                  {hero.impactStoryTeller && !hero.impactStoryRelation && (
                    <p className="font-semibold text-gray-700">{hero.impactStoryTeller}</p>
                  )}
                  
                  {!hero.impactStoryTeller && hero.impactStoryRelation && (
                    <p className="font-semibold text-gray-700">{hero.impactStoryRelation}</p>
                  )}
                </div>
              )}
              
              {hero.impactStory && hero.impactStory.trim() !== "" && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">{hero.impactStory}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
      
      {hasSecondStory && (
        <Card className="shadow-md rounded-xl overflow-hidden border border-gray-100">
          <CardContent className="p-6">
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-800 mb-2">סיפור השפעה נוסף</h2>
              
              {(hero.additionalimpactStoryTeller || hero.additionalimpactStoryRelation) && (
                <div className="text-right mb-3">
                  {hero.additionalimpactStoryTeller && hero.additionalimpactStoryRelation && (
                    <p className="font-semibold text-gray-700">{hero.additionalimpactStoryTeller} • {hero.additionalimpactStoryRelation}</p>
                  )}
                  
                  {hero.additionalimpactStoryTeller && !hero.additionalimpactStoryRelation && (
                    <p className="font-semibold text-gray-700">{hero.additionalimpactStoryTeller}</p>
                  )}
                  
                  {!hero.additionalimpactStoryTeller && hero.additionalimpactStoryRelation && (
                    <p className="font-semibold text-gray-700">{hero.additionalimpactStoryRelation}</p>
                  )}
                </div>
              )}
              
              {hero.additionalImpactStory && hero.additionalImpactStory.trim() !== "" && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">{hero.additionalImpactStory}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}