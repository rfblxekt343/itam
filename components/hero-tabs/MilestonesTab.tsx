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
  const ddmmyyyyPattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  if (ddmmyyyyPattern.test(isoString)) {
    // It's already in the right format, so just return it
    return isoString;
  }
  const date = new Date(isoString);
  // Check if date is valid
  if (isNaN(date.getTime())) {
    console.warn("Invalid date:", isoString);
    return "תאריך לא תקין";
  }
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
    return <p className="text-gray-700 text-center py-4" dir="rtl">טרם הוזן מידע לעמוד זה</p>;
  }

  return (
    <div dir="rtl" className="w-full">
      {/* First Event */}
      {(hero.eventTitle || hero.eventDate || hero.eventDescription) && (
        <Card className="shadow-lg rounded-2xl overflow-hidden mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col gap-6">
              {/* Header section with date and title */}
              <div className="flex flex-col items-center justify-center gap-4 border-b border-gray-200 pb-4">
                {hero.eventTitle && <div className="text-2xl font-bold text-gray-800 text-right w-full">{hero.eventTitle}</div>}
                {/* Date section with calendar icon */}
                {hero.eventDate && <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-gray-700 font-medium">
                  <MdCalendarToday size={20} />
                  <span>{formatDate(hero.eventDate)}</span>
                </div>}
              </div>

              {/* Event Description */}
              {hero.eventDescription && (
                <div className="w-full flex justify-center">
                  <p className="text-gray-700 leading-relaxed text-right" style={{ maxWidth: "800px" }}>
                    {hero.eventDescription}
                  </p>
                </div>
              )}
              {hero.fullName === "רון אפשטיין" &&
                <Image
                  src={`/images/heroes/רון אפשטיין/photo3.jpeg`}
                  alt={`תמונה של ${hero.fullName}`}
                  className="w-full h-auto object-cover"
                  width={1920}
                  height={1080}
                />
              }
              {
                hero.fullName === "הדר מרים כהן" && (
                  <div className="flex justify-center w-full">
                    <video
                      src={`/videos/heroes/הדר מאיר כהן/hadar.mov`}
                      controls
                      className="w-full max-w-md h-auto rounded-lg shadow-md"
                      style={{ aspectRatio: "16/9" }}
                    />
                  </div>
                )
              }
              {
                hero.fullName === "אליאב עמרם אביטבול" && (
                  <div className="flex justify-center w-full">

                    <a
                      href="https://drive.google.com/drive/folders/1lL4m6e3Eo9LDn8tAv0qvbgxoYS8L5eYd"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      קישור לסרטונים
                    </a>
                  </div>
                )
              }
              {
                hero.fullName === "אורי ג׳רבי" && (
                    <Image
                  src={`/images/heroes/אורי ג׳רבי/milestone.jpeg`}
                  alt={`תמונה של ${hero.fullName}`}
                  className="w-full h-auto object-cover"
                  width={1920}
                  height={1080}
                />
                )
              }
              {
                hero.fullName === "אלמוג סרוסי" && (
                    <Image
                  src={`/images/heroes/אלמוג סרוסי/milestone.jpeg`}
                  alt={`תמונה של ${hero.fullName}`}
                  className="w-full h-auto object-cover"
                  width={1920}
                  height={1080}
                />
                )
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
              <div className="flex flex-col items-center justify-center gap-4 border-b border-gray-200 pb-4">
                {hero.eventTitle2 && <div className="text-2xl font-bold text-gray-800 text-right w-full">{hero.eventTitle2}</div>}
                {hero.eventDate2 && <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-gray-700 font-medium">
                  <MdCalendarToday size={20} />
                  <span>{formatDate(hero.eventDate2)}</span>
                </div>}
              </div>
              {hero.eventDescription2 && (
                <div className="w-full flex justify-center">
                  <p className="text-gray-700 leading-relaxed text-right" style={{ maxWidth: "800px" }}>
                    {hero.eventDescription2}
                  </p>
                </div>
              )}
              {hero.fullName === "רון אפשטיין" &&
                <Image
                  src={`/images/heroes/רון אפשטיין/zofim.jpeg`}
                  alt={`תמונה של ${hero.fullName}`}
                  className="w-full h-auto object-cover"
                  width={1920}
                  height={1080}
                />
              }
              {
                hero.fullName === "הדר מרים כהן" && (
                  <div className="flex justify-center w-full">
                    <Image
                      src={`/images/heroes/הדר מרים כהן/batmizva.jpeg`}
                      alt={`תמונה של ${hero.fullName}`}
                      className="w-full max-w-md h-auto object-cover rounded-lg shadow-md"
                      width={1920}
                      height={1080}
                      style={{ aspectRatio: "16/9" }}
                    />
                  </div>
                )
              }
               {
                hero.fullName === "אלמוג סרוסי" && (
                  <div className="flex justify-center w-full">
                    <video
                      src={`/videos/heroes/אלמוג סרוסי/milestone.mov`}
                      controls
                      className="w-full max-w-md h-auto rounded-lg shadow-md"
                      style={{ aspectRatio: "16/9" }}
                    />
                  </div>
                )
              }
            </div>
          </CardContent>
        </Card>
      )}

      {hero.fullName === "יואב דניאל" && <YoavDaniel />}

      {/* Third Event */}
      {(hero.eventTitle3 || hero.eventDate3 || hero.eventDescription3) && (
        <Card className="shadow-lg rounded-2xl overflow-hidden mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center justify-center gap-4 border-b border-gray-200 pb-4">
                {hero.eventTitle3 && <div className="text-2xl font-bold text-gray-800 text-right w-full">{hero.eventTitle3}</div>}
                {hero.eventDate3 && <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-gray-700 font-medium">
                  <MdCalendarToday size={20} />
                  <span>{formatDate(hero.eventDate3)}</span>
                </div>}
              </div>
              {hero.eventDescription3 && (
                <div className="w-full flex justify-center">
                  <p className="text-gray-700 leading-relaxed text-right" style={{ maxWidth: "800px" }}>
                    {hero.eventDescription3}
                  </p>
                </div>
              )}
              {
                hero.fullName === "הדר מרים כהן" && (
                  <div className="flex justify-center w-full">
                    <Image
                      src={`/images/heroes/הדר מרים כהן/tafkidhadar.jpeg`}
                      alt={`תמונה של ${hero.fullName}`}
                      className="w-full max-w-md h-auto object-cover rounded-lg shadow-md"
                      width={1920}
                      height={1080}

                    />
                  </div>
                )
              }
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
    </div>
  );
}