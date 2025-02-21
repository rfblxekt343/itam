import { Card, CardContent } from "@/components/ui/card";
import { FallenHero } from "@/types/fallen-hero";

interface ServiceTabProps {
  hero: FallenHero;
}

export function ServiceTab({ hero }: ServiceTabProps) {
  return (
    <Card className="bg-white shadow-lg">
      <CardContent className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-gray-700 mb-1">דרגה</h3>
            <p className="text-gray-900">{hero.rank}</p>
          </div>

          <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-gray-700 mb-1">יחידה</h3>
            <p className="text-gray-900">{hero.unit}</p>
          </div>

          <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-gray-700 mb-1">תפקיד</h3>
            <p className="text-gray-900">{hero.role}</p>
          </div>

          <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-gray-700 mb-1">מקום/אירוע הנפילה</h3>
            <p className="text-gray-900">{hero.fallLocation}</p>
          </div>

          <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-gray-700 mb-1">תאריך הפילה</h3>
            <p className="text-gray-900">{hero.dateOfFalling}</p>
          </div>

          <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-gray-700 mb-1">צל&quot;שים והוכרות</h3>

            <p className="text-gray-900">{hero.commendations}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}