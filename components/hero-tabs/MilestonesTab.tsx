import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { FallenHero } from "@/types/fallen-hero";

interface MilestonesTabProps {
  hero: FallenHero;
}

export function MilestonesTab({ hero }: MilestonesTabProps) {
  return (
    <Card className="shadow-lg rounded-2xl overflow-hidden">
      <CardContent className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Event Date */}
          <div className="bg-gray-100 p-5 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800">📅 תאריך האירוע</h3>
            <p className="text-gray-700">{hero.eventDate}</p>
          </div>

          {/* Event Title */}
          <div className="bg-gray-100 p-5 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800">🏅 כותרת האירוע</h3>
            <p className="text-gray-700">{hero.eventTitle}</p>
          </div>

          {/* Event Description */}
          <div className="bg-gray-100 p-5 rounded-xl shadow-sm col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-800">📖 תיאור</h3>
            <p className="text-gray-700 leading-relaxed">{hero.eventDescription}</p>
          </div>

          {/* Event Media */}
          {hero.eventMedia && (
            <div className="bg-gray-100 p-5 rounded-xl shadow-sm col-span-1 md:col-span-2">
              <h3 className="text-lg font-semibold text-gray-800">📸 תמונה או סרטון</h3>
              {hero.eventMedia.match(/\.(jpeg|jpg|gif|png)$/) ? (
                <Image
                  src={hero.eventMedia}
                  alt="Event media"
                  className="rounded-lg shadow-md mt-2"
                  width={600} // You can adjust the width and height as needed
                  height={400} // Adjust the height accordingly
                  layout="responsive" // This will help maintain the aspect ratio
                />
              ) : hero.eventMedia.includes("youtube") || hero.eventMedia.includes("mp4") ? (
                <video controls className="rounded-lg shadow-md mt-2 w-full">
                  <source src={hero.eventMedia} type="video/mp4" />
                  הדפדפן שלך אינו תומך בניגון וידאו.
                </video>
              ) : (
                <p className="text-gray-700">{hero.eventMedia}</p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
