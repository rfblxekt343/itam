import { Card, CardContent } from "@/components/ui/card";
import { FallenHero } from "@/types/fallen-hero";
import { Instagram } from "lucide-react";
import Image from "next/image";

interface InfoTabProps {
  hero: FallenHero;
}

export function InfoTab({ hero }: InfoTabProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
  };



  return (
    <Card className="bg-white shadow-lg">
      <CardContent className="p-4 md:p-8">
        {/* Hero Image - Added at the top */}
        <div className="mb-6 flex justify-center">

          <div className="relative w-40 h-40 md:w-48 md:h-48 overflow-hidden rounded-lg shadow-md">
            <Image
              src={`/images/heroes/${hero.fullName}/photo1.jpeg`}
              alt={`תמונה של ${hero.fullName}`}
              className="w-full h-auto object-cover"
              width={1920}  // You can replace this with the actual width you need
              height={1080}
            />
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8" dir="rtl">
          {/* Info Fields */}
          <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-gray-700 mb-1">שם מלא</h3>
            <p className="text-gray-900">{hero.fullName}</p>
          </div>

          <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-gray-700 mb-1">מגדר</h3>
            <p className="text-gray-900">{hero.gender}</p>
          </div>

          <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-gray-700 mb-1">תאריך לידה</h3>
            <p className="text-gray-900">{formatDate(hero.birthDate)}</p>
          </div>

          <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-gray-700 mb-1">גיל</h3>
            <p className="text-gray-900">{hero.age}</p>
          </div>

          <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-gray-700 mb-1">עיר מגורים</h3>
            <p className="text-gray-900">{hero.city}</p>
          </div>

          {/* Instagram Link */}
          {hero.instagramLink && (
            <div className="bg-gray-50 p-5 rounded-xl shadow-md flex flex-col items-center text-center space-y-3">
              <h3 className="text-lg font-semibold text-gray-800">
                {hero.gender === "זכר" ? "לעמוד האינסטגרם לזכרו" : "לעמוד האינסטגרם לזכרה"}
              </h3>

              <a
                href={hero.instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-blue-200 hover:text-blue-800"
              >
                <Instagram size={28} className="text-blue-600" />
                <span className="font-medium">לצפייה בפרופיל</span>
              </a>
            </div>

          )}

          {/* Biography Section */}
          <div className="md:col-span-2 space-y-2 bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-gray-700 mb-2">{hero.gender === "נקבה" ? "עליה" : "עליו"}</h3>
            <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">{hero.biography}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}