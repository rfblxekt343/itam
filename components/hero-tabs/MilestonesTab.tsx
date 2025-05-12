// import Image from "next/image";
import Osher from "../../components/extraHeroes/Osher";
import YoavDaniel from "../../components/extraHeroes/YoavDaniel";
import { Card, CardContent } from "@/components/ui/card";
import { FallenHero } from "@/types/fallen-hero";
import { MdCalendarToday } from "react-icons/md"; // Calendar icon from react-icons
import Image from "next/image";
interface MilestonesTabProps {
  hero: FallenHero;
}

export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString("he-IL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function MilestonesTab({ hero }: MilestonesTabProps) {
  if (!hero.eventTitle && !hero.eventDate && !hero.eventDescription &&
    !hero.eventTitle2 && !hero.eventDate2 && !hero.eventDescription2 &&
    !hero.eventTitle3 && !hero.eventDate3 && !hero.eventDescription3) {
    return <p className="text-gray-700 text-center py-4">טרם הוזן מידע לעמוד זה</p>;
  }
  console.log("Full hero data:", JSON.stringify(hero, null, 2));
  console.log("Event 2 data:", {
    title: hero.eventTitle2,
    date: hero.eventDate2,
    description: hero.eventDescription2
  });

  console.log("Event 3 data:", {
    title: hero.eventTitle3,
    date: hero.eventDate3,
    description: hero.eventDescription3
  });

  return (
    <>
    
      {/* First Event */}
      {(hero.eventTitle || hero.eventDate || hero.eventDescription) && (
        <Card className="shadow-lg rounded-2xl overflow-hidden mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col gap-6">
              {/* Header section with date and title */}
              <div className="flex flex-col items-center justify-center gap-4 border-b border-gray-200 pb-4">
                {hero.eventTitle && <div className="text-2xl font-bold text-gray-800">{hero.eventTitle}</div>}
                {/* Date section with calendar icon */}
                {hero.eventDate && <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-gray-700 font-medium">
                  <MdCalendarToday size={20} /> {/* Calendar icon */}
                  <span>{formatDate(hero.eventDate)}</span>
                </div>}
              </div>

              {/* Event Description - Centered with multiple approaches */}
              {hero.eventDescription && (
                <div className="w-full flex justify-center">
                  <p className="text-gray-700 leading-relaxed text-center" style={{ maxWidth: "800px" }}>
                    {hero.eventDescription}
                  </p>
                </div>
              )}
              {hero.fullName === "רון אפשטיין" &&
                <Image
                  src={`/images/heroes/רון אפשטיין/photo3.jpeg`}
                  alt={`תמונה של ${hero.fullName}`}
                  className="w-full h-auto object-cover"
                  width={1920}  // You can replace this with the actual width you need
                  height={1080}
                />
              }
            </div>
          </CardContent>
        </Card>
      )}

      {/* Second Event */}
      {(hero.eventTitle2 || hero.eventDate2 || hero.eventDescription2) && (
        <Card className="shadow-lg rounded-2xl overflow-hidden mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col gap-6">
              {/* Header section with date and title */}
              <div className="flex flex-col items-center justify-center gap-4 border-b border-gray-200 pb-4">
                {hero.eventTitle2 && <div className="text-2xl font-bold text-gray-800">{hero.eventTitle2}</div>}
                {/* Date section with calendar icon */}
                {hero.eventDate2 && <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-gray-700 font-medium">
                  <MdCalendarToday size={20} /> {/* Calendar icon */}
                  <span>{formatDate(hero.eventDate2)}</span>
                </div>}
              </div>

              {/* Event Description - Centered with multiple approaches */}
              {hero.eventDescription2 && (
                <div className="w-full flex justify-center">
                  <p className="text-gray-700 leading-relaxed text-center" style={{ maxWidth: "800px" }}>
                    {hero.eventDescription2}
                  </p>
                </div>
              )}
              {hero.fullName === "רון אפשטיין" &&
                <Image
                  src={`/images/heroes/רון אפשטיין/zofim.jpeg`}
                  alt={`תמונה של ${hero.fullName}`}
                  className="w-full h-auto object-cover"
                  width={1920}  // You can replace this with the actual width you need
                  height={1080}
                />
              }
            </div>
          </CardContent>
        </Card>
      )}
       {hero.fullName === "יואב דניאל" && <YoavDaniel/>}

      {/* Third Event */}
      {(hero.eventTitle3 || hero.eventDate3 || hero.eventDescription3) && (
        <Card className="shadow-lg rounded-2xl overflow-hidden mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col gap-6">
              {/* Header section with date and title */}
              <div className="flex flex-col items-center justify-center gap-4 border-b border-gray-200 pb-4">
                {hero.eventTitle3 && <div className="text-2xl font-bold text-gray-800">{hero.eventTitle3}</div>}
                {/* Date section with calendar icon */}
                {hero.eventDate3 && <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-gray-700 font-medium">
                  <MdCalendarToday size={20} /> {/* Calendar icon */}
                  <span>{formatDate(hero.eventDate3)}</span>
                </div>}
              </div>

              {/* Event Description - Centered with multiple approaches */}
              {hero.eventDescription3 && (
                <div className="w-full flex justify-center">
                  <p className="text-gray-700 leading-relaxed text-center" style={{ maxWidth: "800px" }}>
                    {hero.eventDescription3}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {hero.fullName === "אושר (שמחה) ברזילי" && <Osher />}
     
      {hero.fullName === "רז מזרחי" && <video
        src={`/videos/heroes/${hero.fullName}/video.mp4`}
        controls
        className="w-full h-auto"
      />}
    </>
  );
}