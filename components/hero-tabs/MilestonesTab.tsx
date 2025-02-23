import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { FallenHero } from "@/types/fallen-hero";

interface MilestonesTabProps {
  hero: FallenHero;
}

export function MilestonesTab({ hero }: MilestonesTabProps) {
  return (
    <>
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
                    width={600}
                    height={400}
                    layout="responsive"
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
      {hero.fullName === "אריאל שלום" && (
        <div className="bg-gray-100 p-5 rounded-xl shadow-sm col-span-1 md:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800">📸 תמונה או סרטון</h3>
          <a
            href="/documents/heroes/אושר ברזילי/document.docx"
            download
            className="inline-block mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            📄 הורד מסמך Word
          </a>

        </div>
      )}

    </>

  );
}
