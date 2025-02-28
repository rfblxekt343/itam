import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FallenHero } from "@/types/fallen-hero";
import { useEffect, useState } from "react";

interface GalleryTabProps {
  hero: FallenHero;
}

export function GalleryTab({ hero }: GalleryTabProps) {
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    if (hero.fullName) {
      const folderPath = `/images/heroes/${hero.fullName}`;
      const images = [
        `${folderPath}/photo1.jpeg`,
        `${folderPath}/photo2.jpeg`,
        `${folderPath}/photo3.jpeg`,
        `${folderPath}/photo4.jpeg`,
        `${folderPath}/photo5.jpeg`,
        `${folderPath}/photo6.jpeg`,
        `${folderPath}/photo7.jpeg`,
        `${folderPath}/photo8.jpeg`,
        `${folderPath}/photo9.jpeg`,
        `${folderPath}/photo10.jpeg`,
        `${folderPath}/photo11.jpeg`,
        `${folderPath}/photo12.jpeg`,
        `${folderPath}/photo13.jpeg`,
        `${folderPath}/photo14.jpeg`,
        `${folderPath}/photo15.jpeg`,
        `${folderPath}/photo16.jpeg`,
        `${folderPath}/photo17.jpeg`,
        `${folderPath}/photo1.jpeg`,
      ];
      setPhotoUrls(images);
    }
  }, [hero]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === photoUrls.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? photoUrls.length - 1 : prevIndex - 1
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left
      nextSlide();
    }
    if (touchStart - touchEnd < -75) {
      // Swipe right
      prevSlide();
    }
  };

  if (photoUrls.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-gray-500 text-center">אין תמונות זמינות</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-2 sm:p-4">
        <div className="relative w-full">
          {/* Main Image Container */}
          <div 
            className="relative aspect-[4/3] w-full overflow-hidden rounded-lg"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="absolute w-full h-full transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {photoUrls.map((url, index) => (
                <div 
                  key={index}
                  className="absolute top-0 left-0 w-full h-full"
                  style={{ left: `${index * 100}%` }}
                >
                  <Image
                    src={url}
                    alt={hero.fullName}
                    className="w-full h-full object-contain bg-black/5"
                    width={800}  // Adjust to fit your design
                    height={600} // Adjust to fit your design
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons - Hidden on mobile, visible on hover for larger screens */}
          <div className="hidden sm:flex absolute inset-0 items-center justify-between p-2 opacity-0 hover:opacity-100 transition-opacity">
            <button
              className="rounded-full p-2 bg-white/80 hover:bg-white transition-colors shadow-lg"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              className="rounded-full p-2 bg-white/80 hover:bg-white transition-colors shadow-lg"
              onClick={nextSlide}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Indicators */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {photoUrls.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  currentIndex === index 
                    ? 'bg-white shadow-lg' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default GalleryTab;
