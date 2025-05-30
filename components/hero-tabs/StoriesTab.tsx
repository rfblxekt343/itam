import { Card, CardContent } from "@/components/ui/card";
import { FallenHero } from "@/types/fallen-hero";
import Image from "next/image";
import IdoBroyer from "@/components/extraHeroes/IdoBroyer";

interface StoriesTabProps {
  hero: FallenHero;
  imagePaths: string[];
}

export function StoriesTab({ hero, imagePaths }: StoriesTabProps) {
  const stories = hero.stories || [];


  // Filter images that contain "stories" in their path
  const storyImages = imagePaths.filter(path => path.includes("stories"));

  return (
    <div className="space-y-4">

      {stories.length > 0 ? (
        stories.map((story, index) => (
          <Card key={index} className="shadow-md rounded-xl overflow-hidden border border-gray-100">
            <CardContent className="p-3 sm:p-6">
              <div className="space-y-3 sm:space-y-4" dir="rtl">
                {hero.fullName === "אושר (שמחה) ברזילי" && index === 0 && (
                  <div className="w-full flex justify-center mb-3">
                    <Image
                      src={`/images/heroes/${encodeURIComponent(hero.fullName)}/photo18.jpeg`}
                      alt={`תמונה של ${hero.fullName}`}
                      width={200}
                      height={200}
                      className="rounded-lg object-cover w-full max-w-xs h-auto shadow-sm"
                    />
                  </div>
                )}

                {(story.tellerName || story.relation) && (
                  <div className="text-right mb-2 sm:mb-3">
                    {story.tellerName && story.relation && (
                      <p className="font-semibold text-sm sm:text-base text-gray-700">
                        <span className="text-gray-900">{story.tellerName}</span> • <span className="text-gray-700">{story.relation}</span>
                      </p>
                    )}

                    {story.tellerName && !story.relation && (
                      <p className="font-semibold text-sm sm:text-base text-gray-900">{story.tellerName}</p>
                    )}

                    {!story.tellerName && story.relation && (
                      <p className="font-semibold text-sm sm:text-base text-gray-700">{story.relation}</p>
                    )}
                  </div>
                )}

                {story.content && (
                  <div className="bg-gray-50 p-3 sm:p-6 rounded-lg shadow-inner">
                    {story.content.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
                {hero.fullName === "עידו ברויר" && (
                  <IdoBroyer imagePaths={imagePaths} />
                )}
                { index === 1 && hero.fullName === "אליאב עמרם אביטבול" && (
                  <div className="flex justify-center w-full">

                    <a
                      href="https://www.facebook.com/672812327/posts/10162051372352328/?mibextid=rS40aB7S9Ucbxw6v"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                     לחצו לצפייה
                    </a>
                  </div>
                )
              }

              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="text-center py-6 text-gray-500">לא נמצאו סיפורים</div>
      )}


      {/* Display story images if any exist */}
      {storyImages.length > 0 && (
        <Card className="shadow-md rounded-xl overflow-hidden border border-gray-100">
          <CardContent className="p-3 sm:p-6">
            <div className="grid grid-cols-1 gap-3">
              {storyImages.map((imagePath, index) => (
                <div key={index} className="w-full">
                  <Image
                    src={imagePath}
                    alt={`תמונת סיפור של ${hero.fullName}`}
                    width={600}
                    height={400}
                    className="rounded-lg object-cover w-full h-auto shadow-sm"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

    </div>
  );
}