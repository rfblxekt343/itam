import { Card, CardContent } from "@/components/ui/card";
import { FallenHero } from "@/types/fallen-hero";

interface ServiceTabProps {
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
      colSpan: "col-span-1"
    },
    {
      key: "unit",
      title: "יחידה",
      content: hero.unit,
      colSpan: "col-span-1"
    },
    {
      key: "role",
      title: "תפקיד",
      content: hero.role,
      colSpan: "col-span-1"
    },
    {
      key: "fallLocation",
      title: "מקום/אירוע הנפילה",
      content: hero.fallLocation,
      colSpan: "col-span-1"
    },
    {
      key: "dateOfFalling",
      title: "תאריך הפילה",
      content: formatDate(hero.dateOfFalling),
      colSpan: "col-span-1"
    },
    {
      key: "commendations",
      title: "צל&quot;שים והוכרות",
      content: hero.commendations,
      colSpan: "col-span-1"
    }
  ];

  // Filter out sections with empty content
  const validSections = sections.filter(section => hasContent(section.content));

  return (
    <Card className="bg-white shadow-lg rounded-2xl overflow-hidden">
      <CardContent className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {validSections.map((section) => (
            <div 
              key={section.key}
              className={`bg-gray-50 p-4 rounded-lg shadow-sm ${section.colSpan}`}
            >
              <h3 className="text-lg font-bold text-gray-700 mb-1">{section.title}</h3>
              <p className="text-gray-900">{section.key === "dateOfFalling" ? section.content : section.content}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
