import { Card, CardContent } from "@/components/ui/card";
import { FallenHero } from "@/types/fallen-hero";

interface ServiceTabProps {
  hero: FallenHero;
}
function formatDate(dateString: string): string {
  // Check if the date is already in DD/MM/YYYY format
  if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) {
    // If it's already in the desired format, return it as is
    return dateString;
  }
  
  try {
    // Try to parse the ISO string
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return "תאריך לא תקין"; // "Invalid date" in Hebrew
    }
    
    // Add one day to the date
    date.setUTCDate(date.getUTCDate() + 1);
    
    // Format the date using the Israeli locale
    return date.toLocaleDateString("he-IL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: 'UTC',
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "תאריך לא תקין"; // "Invalid date" in Hebrew
  }
}

export function ServiceTab({ hero }: ServiceTabProps) {
  // Helper function to check if a string has actual content
  const hasContent = (value: string | undefined): boolean => {
    return !!value && value.trim() !== "";
  };

  // Define sections with their properties for dynamic rendering
  const sections = [
    {
      key: "rank",
      title: "דרגה",
      content: hero.rank,
      className: "col-span-12 md:col-span-6 lg:col-span-4"
    },
    {
      key: "unit",
      title: "יחידה",
      content: hero.unit,
      className: "col-span-12 md:col-span-6 lg:col-span-4"
    },
    {
      key: "role",
      title: "תפקיד",
      content: hero.role,
      className: "col-span-12 md:col-span-6 lg:col-span-4"
    },
    {
      key: "fallLocation",
      title: "מקום/אירוע הנפילה",
      content: hero.fallLocation,
      className: "col-span-12 md:col-span-6 lg:col-span-4"
    },
    {
      key: "dateOfFalling",
      title: "תאריך נפילה",
      content: formatDate(hero.dateOfFalling),
      className: "col-span-12 md:col-span-6 lg:col-span-4"
    },
    {
      key: "commendations",
      title: 'צל"שים והוקרות',
      content: hero.commendations,
      className: "col-span-12 md:col-span-6 lg:col-span-4"
    }
  ];

  // Filter out sections with empty content
  const validSections = sections.filter(section => hasContent(section.content));

  return (
    <Card className="bg-white shadow-lg rounded-2xl overflow-hidden">
      <CardContent className="p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {validSections.map((section) => (
            <div
              key={section.key}
              className={`bg-gray-50 p-4 rounded-lg shadow-sm ${section.className}`}
              dir="rtl"
            >
              <h3 className="text-lg font-bold text-gray-700 mb-1 text-right">
                {section.title}
              </h3>
              <p className="text-gray-900 text-right">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}