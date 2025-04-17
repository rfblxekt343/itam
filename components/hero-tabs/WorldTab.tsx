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

  // Format text content to be more readable
  const formatContent = (content: string) => {
    // Split by commas, periods, or line breaks to create proper paragraphs
    if (!content) return "";
    
    // If content has commas or bullet points, format it as a clean list without bullets
    if (content.includes(",") || content.includes("•")) {
      const items = content
        .split(/[,•]/)
        .map(item => item.trim())
        .filter(item => item.length > 0);
      
      return (
        <div className="space-y-1 mt-2">
          {items.map((item, index) => (
            <p key={index} className="text-gray-700">{item}</p>
          ))}
        </div>
      );
    }
    
    // If there are natural line breaks, preserve them
    if (content.includes("\n")) {
      return (
        <div className="space-y-2 mt-2">
          {content.split("\n").map((paragraph, index) => (
            <p key={index} className="text-gray-700">{paragraph}</p>
          ))}
        </div>
      );
    }
    
    // Default presentation
    return <p className="text-gray-700 mt-2">{content}</p>;
  };

  // Define sections with their properties for dynamic rendering
  const sections = [
    {
      key: "favoriteSongs",
      title: "🎵 שירים שאהב/ה במיוחד",
      content: hero.favoriteSongs,
      className: "col-span-12 md:col-span-6 lg:col-span-4"
    },
    {
      key: "favoriteBooks",
      title: "📚 ספרים משמעותיים",
      content: hero.favoriteBooks,
      className: "col-span-12 md:col-span-6 lg:col-span-4"
    },
    {
      key: "favoriteMovies",
      title: "🎬 סרטים אהובים",
      content: hero.favoriteMovies,
      className: "col-span-12 md:col-span-6 lg:col-span-4"
    },
    {
      key: "favoritePlaces",
      title: "📍 מקומות אהובים",
      content: hero.favoritePlaces,
      className: "col-span-12 md:col-span-6 lg:col-span-4"
    },
    {
      key: "quotes",
      title: "💬 ציטוטים",
      content: hero.quotes,
      className: "col-span-12 md:col-span-12 lg:col-span-8"
    },
    {
      key: "leadingValues",
      title: "🌟 ערכים מובילים",
      content: hero.leadingValues,
      className: "col-span-12 md:col-span-6 lg:col-span-6"
    },
    {
      key: "hobbies",
      title: "🎨 תחביבים וכשרונות",
      content: hero.hobbies,
      className: "col-span-12 md:col-span-6 lg:col-span-6"
    }
  ];

  // Filter out sections with empty content
  const validSections = sections.filter(section => hasContent(section.content));

  return (
    <Card className="shadow-lg rounded-2xl overflow-hidden">
      <CardContent className="p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {validSections.map((section) => (
            <div
              key={section.key}
              className={`bg-gray-50 hover:bg-gray-100 transition-colors duration-200 p-4 rounded-xl shadow-sm ${section.className}`}
              dir="rtl"
            >
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                {section.title}
              </h3>
              <div className="mt-3">
                {section.key === "quotes" ? (
                  <div className="italic text-gray-700">
                    {formatContent(section.content)}
                  </div>
                ) : (
                  formatContent(section.content)
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}