import { Card, CardContent } from "@/components/ui/card";
import { FallenHero } from "@/types/fallen-hero";
import { Instagram } from "lucide-react";

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
      <CardContent className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
          
          {/* Biography Section */}
          <div className="md:col-span-2 space-y-2 bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-gray-700 mb-2">ביוגרפיה</h3>
            <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">{hero.biography}</p>
          </div>
          
          {/* Instagram Link */}
          {hero.instagramLink && (
            <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-gray-700 mb-1">עמוד הנצחה</h3>
              <a 
                href={hero.instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-md transition-colors duration-200"
              >
                <Instagram size={24} className="text-blue-600" />
                <span className="font-medium">צפייה בעמוד ההנצחה</span>
              </a>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}