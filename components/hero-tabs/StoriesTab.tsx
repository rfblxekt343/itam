import { Card, CardContent } from "@/components/ui/card";
import { FallenHero } from "@/types/fallen-hero";

interface StoriesTabProps {
  hero: FallenHero;
}

export function StoriesTab({ hero }: StoriesTabProps) {
  console.log("Raw hero data:", hero); // Debug: Log entire hero object

  const stories = hero.stories || [];

  console.log("Filtered stories array:", stories); // Debug: Log stories after filtering

  return (
    <div className="space-y-8" >
      {stories.length > 0 ? (
        stories.map((story, index) => {
          return (
            <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-200" >
              <CardContent className="p-8">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-600 pt-4 border-t border-gray-100"  dir="rtl">
                  {story.tellerName && (
                    <span className="font-bold text-gray-800">
                      {story.tellerName}
                    </span>
                  )}
                  {story.tellerName && story.relation && (
                    <span className="hidden sm:inline">•</span>
                  )}
                  {story.relation && (
                    <span className="text-gray-600">
                      {story.relation}
                    </span>
                  )}
                </div>
                <div className="space-y-6">
                  <p className="whitespace-pre-line text-gray-900 leading-relaxed text-lg" dir="rtl">
                    {story.content}
                  </p>


                </div>
              </CardContent>
            </Card>
          );
        })
      ) : (
        <div className="text-center p-8 text-gray-500">לא נמצאו סיפורים</div>
      )}
    </div>
  );
}
