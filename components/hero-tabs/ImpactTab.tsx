import { Card, CardContent } from "@/components/ui/card";
import { FallenHero } from "@/types/fallen-hero";

interface ImpactTabProps {
  hero: FallenHero;
}

export function ImpactTab({ hero }: ImpactTabProps) {
  // Debug logging to help troubleshoot
  console.log("Impact story data:", {
    impactStory: hero.impactStory,
    impactStoryTeller: hero.impactStoryTeller,
    impactStoryRelation: hero.impactStoryRelation,
    additionalImpactStory: hero.additionalImpactStory,
    additionalimpactStoryTeller: hero.additionalimpactStoryTeller,
    additionalimpactStoryRelation: hero.additionalimpactStoryRelation
  });

  // Helper function to check if a story section has content
  const hasStoryContent = (story: string | undefined, teller: string | undefined, relation: string | undefined): boolean => {
    return (!!story && story.trim() !== "") || 
           (!!teller && teller.trim() !== "") || 
           (!!relation && relation.trim() !== "");
  };

  // Check if the API transformation created impactStories array instead of individual fields
  // This matches how the API is transforming impact stories in the code you provided
  if (hero.hasOwnProperty('impactStories') && Array.isArray((hero as any).impactStories)) {
    const impactStories = (hero as any).impactStories;
    
    if (!impactStories || impactStories.length === 0) {
      return <div className="text-center py-8 text-gray-500">אין סיפורי השפעה</div>;
    }

    return (
      <div className="space-y-8">
        {impactStories.map((story: any, index: number) => (
          <Card key={index} className="shadow-lg rounded-2xl overflow-hidden">
            <CardContent className="p-8">
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-800 border-b pb-2">
                  {index === 0 ? "סיפור השפעה" : "סיפור השפעה נוסף"}
                </h2>
                
                {story.content && story.content.trim() !== "" && (
                  <div className="bg-gray-100 p-5 rounded-xl shadow-sm">
                    <p className="text-gray-700 whitespace-pre-line">{story.content}</p>
                  </div>
                )}
                
                <div className="flex flex-col md:flex-row gap-4">
                  {story.tellerName && story.tellerName.trim() !== "" && (
                    <div className="bg-gray-100 p-5 rounded-xl shadow-sm flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">שם המספר</h3>
                      <p className="text-gray-700">{story.tellerName}</p>
                    </div>
                  )}
                  
                  {story.relation && story.relation.trim() !== "" && (
                    <div className="bg-gray-100 p-5 rounded-xl shadow-sm flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">קשר לחלל</h3>
                      <p className="text-gray-700">{story.relation}</p>
                    </div>
                  )}
                </div>
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
    <div className="space-y-8">
      {hasFirstStory && (
        <Card className="shadow-lg rounded-2xl overflow-hidden">
          <CardContent className="p-8">
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 border-b pb-2">סיפור השפעה</h2>
              
              {hero.impactStory && hero.impactStory.trim() !== "" && (
                <div className="bg-gray-100 p-5 rounded-xl shadow-sm">
                  <p className="text-gray-700 whitespace-pre-line">{hero.impactStory}</p>
                </div>
              )}
              
              <div className="flex flex-col md:flex-row gap-4">
                {hero.impactStoryTeller && hero.impactStoryTeller.trim() !== "" && (
                  <div className="bg-gray-100 p-5 rounded-xl shadow-sm flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">שם המספר</h3>
                    <p className="text-gray-700">{hero.impactStoryTeller}</p>
                  </div>
                )}
                
                {hero.impactStoryRelation && hero.impactStoryRelation.trim() !== "" && (
                  <div className="bg-gray-100 p-5 rounded-xl shadow-sm flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">קשר לחלל</h3>
                    <p className="text-gray-700">{hero.impactStoryRelation}</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {hasSecondStory && (
        <Card className="shadow-lg rounded-2xl overflow-hidden">
          <CardContent className="p-8">
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 border-b pb-2">סיפור השפעה נוסף</h2>
              
              {hero.additionalImpactStory && hero.additionalImpactStory.trim() !== "" && (
                <div className="bg-gray-100 p-5 rounded-xl shadow-sm">
                  <p className="text-gray-700 whitespace-pre-line">{hero.additionalImpactStory}</p>
                </div>
              )}
              
              <div className="flex flex-col md:flex-row gap-4">
                {hero.additionalimpactStoryTeller && hero.additionalimpactStoryTeller.trim() !== "" && (
                  <div className="bg-gray-100 p-5 rounded-xl shadow-sm flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">שם המספר</h3>
                    <p className="text-gray-700">{hero.additionalimpactStoryTeller}</p>
                  </div>
                )}
                
                {hero.additionalimpactStoryRelation && hero.additionalimpactStoryRelation.trim() !== "" && (
                  <div className="bg-gray-100 p-5 rounded-xl shadow-sm flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">קשר לחלל</h3>
                    <p className="text-gray-700">{hero.additionalimpactStoryRelation}</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}