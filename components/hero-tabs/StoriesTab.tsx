import { Card, CardContent } from "@/components/ui/card";
import { FallenHero } from "@/types/fallen-hero";

interface StoriesTabProps {
  hero: FallenHero;
}

export function StoriesTab({ hero }: StoriesTabProps) {
  const stories = hero.stories || [];

  return (
    <div className="space-y-6">
      {stories.length > 0 ? (
        stories.map((story, index) => (
          <Card key={index} className="shadow-md rounded-xl overflow-hidden border border-gray-100">
            <CardContent className="p-6">
              <div className="space-y-4" dir="rtl">
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
                
                {story.content && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 whitespace-pre-line leading-relaxed">{story.content}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="text-center py-8 text-gray-500">לא נמצאו סיפורים</div>
      )}
    </div>
  );
}