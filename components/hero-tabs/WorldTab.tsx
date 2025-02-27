import { Card, CardContent } from "@/components/ui/card";
import { FallenHero } from "@/types/fallen-hero";

interface WorldTabProps {
  hero: FallenHero;
}

export function WorldTab({ hero }: WorldTabProps) {
  // Helper function to check if a string has actual content
  const hasContent = (value: string | undefined): boolean => {
    return !!value && value.trim() !== "";
  };

  // Define sections with their properties for dynamic rendering
  const sections = [
    {
      key: "favoriteSongs",
      title: "🎵 שירים שאהב/ה במיוחד",
      content: hero.favoriteSongs,
      colSpan: "col-span-1"
    },
    {
      key: "favoriteBooks",
      title: "📚 ספרים משמעותיים עבורה",
      content: hero.favoriteBooks,
      colSpan: "col-span-1"
    },
    {
      key: "favoriteMovies",
      title: "🎬 סרטים אהובים",
      content: hero.favoriteMovies,
      colSpan: "col-span-1"
    },
    {
      key: "favoritePlaces",
      title: "📍 מקומות אהובים ומשמעותיים",
      content: hero.favoritePlaces,
      colSpan: "col-span-1"
    },
    {
      key: "quotes",
      title: "💬 ציטוטים",
      content: hero.quotes,
      colSpan: "col-span-1 md:col-span-2"
    },
    {
      key: "leadingValues",
      title: "🌟 ערכים מובילים",
      content: hero.leadingValues,
      colSpan: "col-span-1"
    },
    {
      key: "hobbies",
      title: "🎨 תחביבים וכשרונות",
      content: hero.hobbies,
      colSpan: "col-span-1"
    }
  ];

  // Filter out sections with empty content
  const validSections = sections.filter(section => hasContent(section.content));

  return (
    <Card className="shadow-lg rounded-2xl overflow-hidden">
      <CardContent className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {validSections.map((section) => (
            <div 
              key={section.key}
              className={`bg-gray-100 p-5 rounded-xl shadow-sm ${section.colSpan}`}
            >
              <h3 className="text-lg font-semibold text-gray-800">{section.title}</h3>
              <p className="text-gray-700">{section.key === "quotes" ? <span className="italic">{section.content}</span> : section.content}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}