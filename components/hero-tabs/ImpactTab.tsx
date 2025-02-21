import { Card, CardContent } from "@/components/ui/card";
import { FallenHero } from "@/types/fallen-hero";

interface ImpactTabProps {
  hero: FallenHero;
}

export function ImpactTab({ hero }: ImpactTabProps) {
  return (
    <Card className="shadow-lg rounded-2xl overflow-hidden">
      <CardContent className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Favorite Songs */}
          <div className="bg-gray-100 p-5 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800">🎵 שירים שאהב/ה במיוחד</h3>
            <p className="text-gray-700">{hero.favoriteSongs}</p>
          </div>

          {/* Favorite Books */}
          <div className="bg-gray-100 p-5 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800">📚 ספרים משמעותיים עבורה</h3>
            <p className="text-gray-700">{hero.favoriteBooks}</p>
          </div>

          {/* Favorite Movies */}
          <div className="bg-gray-100 p-5 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800">🎬 סרטים אהובים</h3>
            <p className="text-gray-700">{hero.favoriteMovies}</p>
          </div>

          {/* Favorite Places */}
          <div className="bg-gray-100 p-5 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800">📍 מקומות אהובים ומשמעותיים</h3>
            <p className="text-gray-700">{hero.favoritePlaces}</p>
          </div>

          {/* Quotes */}
          <div className="bg-gray-100 p-5 rounded-xl shadow-sm col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-800">💬 ציטוטים</h3>
            <p className="text-gray-700 italic">&quot;{hero.quotes}&quot;</p>
          </div>

          {/* Leading Values */}
          <div className="bg-gray-100 p-5 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800">🌟 ערכים מובילים</h3>
            <p className="text-gray-700">{hero.leadingValues}</p>
          </div>

          {/* Hobbies & Talents */}
          <div className="bg-gray-100 p-5 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800">🎨 תחביבים וכשרונות</h3>
            <p className="text-gray-700">{hero.hobbies}</p>
          </div>

          {/* Impact Story */}
          {hero.impactStory && (
            <div className="bg-blue-50 p-5 rounded-xl shadow-md col-span-1 md:col-span-2">
              <h3 className="text-lg font-semibold text-blue-800">🌍 סיפור השפעה</h3>
              <p className="text-gray-700">{hero.impactStory}</p>
              <p className="text-sm text-gray-600">👤 מספר: {hero.impactStoryTeller}</p>
              <p className="text-sm text-gray-600">🔗 קשר לחלל: {hero.impactStoryRelation}</p>
            </div>
          )}

          {/* Additional Impact Story */}
          {hero.additionalImpactStory && (
            <div className="bg-blue-50 p-5 rounded-xl shadow-md col-span-1 md:col-span-2">
              <h3 className="text-lg font-semibold text-blue-800">🌍 סיפור השפעה נוסף</h3>
              <p className="text-gray-700">{hero.additionalImpactStory}</p>
              <p className="text-sm text-gray-600">👤 מספר: {hero.additionalimpactStoryTeller}</p>
              <p className="text-sm text-gray-600">🔗 קשר לחלל: {hero.additionalimpactStoryRelation}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
