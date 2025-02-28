import Image from "next/image";
import Osher from "../../components/extraHeroes/Osher";
import { Card, CardContent } from "@/components/ui/card";
import { FallenHero } from "@/types/fallen-hero";
import { MdCalendarToday } from "react-icons/md"; // Calendar icon from react-icons

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
  return (
    <>
      <Card className="shadow-lg rounded-2xl overflow-hidden">
        <CardContent className="p-8">
          <div className="flex flex-col gap-6">
            {/* Header section with date and title */}
            <div className="flex flex-col items-center justify-center gap-4 border-b border-gray-200 pb-4">
              <div className="text-2xl font-bold text-gray-800">{hero.eventTitle}</div>
              
              {/* Date section with calendar icon */}
              <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-gray-700 font-medium">
                <MdCalendarToday size={20} /> {/* Calendar icon */}
                <span>{formatDate(hero.eventDate)}</span>
              </div>
            </div>
            
            {/* Event Description - Centered with multiple approaches */}
            <div className="w-full flex justify-center">
              <p className="text-gray-700 leading-relaxed text-center" style={{ maxWidth: "800px" }}>
                {hero.eventDescription}
              </p>
            </div>
            
            {/* Event Media */}
            {hero.eventMedia && (
              <div className="mt-4">
                {hero.eventMedia.match(/\.(jpeg|jpg|gif|png)$/) ? (
                  <div className="rounded-lg overflow-hidden shadow-md">
                    <Image
                      src={hero.eventMedia}
                      alt={hero.eventTitle}
                      width={800}
                      height={500}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ) : hero.eventMedia.includes("youtube") || hero.eventMedia.includes("mp4") ? (
                  <div className="rounded-lg overflow-hidden shadow-md">
                    <video controls className="w-full">
                      <source src={hero.eventMedia} type="video/mp4" />
                      הדפדפן שלך אינו תומך בניגון וידאו.
                    </video>
                  </div>
                ) : (
                  <p className="text-gray-700">{hero.eventMedia}</p>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      {hero.fullName === "אושר (שמחה) ברזילי" && <Osher />}
    </>
  );
}
