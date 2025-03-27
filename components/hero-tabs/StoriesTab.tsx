import { Card, CardContent } from "@/components/ui/card";
import { FallenHero } from "@/types/fallen-hero";
import Image from "next/image";

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
                {hero.fullName === "אושר (שמחה) ברזילי" && index === 0 && (
                  <div className="w-full flex justify-center mb-4">
                    <Image
                      src={`/images/heroes/${encodeURIComponent(hero.fullName)}/photo18.jpeg`}
                      alt={`תמונה של ${hero.fullName}`}
                      width={200}
                      height={200}
                      className="rounded-lg object-cover shadow-sm"
                    />
                  </div>
                )}
                
                {(story.tellerName || story.relation) && (
                  <div className="text-right mb-3">
                    {story.tellerName && story.relation && (
                      <p className="font-semibold text-gray-700">
                        <span className="text-gray-900">{story.tellerName}</span> • <span className="text-gray-700">{story.relation}</span>
                      </p>
                    )}
                    
                    {story.tellerName && !story.relation && (
                      <p className="font-semibold text-gray-900">{story.tellerName}</p>
                    )}
                    
                    {!story.tellerName && story.relation && (
                      <p className="font-semibold text-gray-700">{story.relation}</p>
                    )}
                  </div>
                )}
                
                {story.content && (
                  <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
                    {story.content.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="text-gray-700 leading-relaxed mb-4 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
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