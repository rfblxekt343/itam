import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { FallenHero } from "@/types/fallen-hero";
import { useEffect, useState, useCallback } from "react";

interface GalleryTabProps {
  hero: FallenHero;
}

export function GalleryTab({ hero }: GalleryTabProps) {
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
   
    if (hero.fullName) {
      setIsLoading(true);
      const folderPath = `/images/heroes/${hero.fullName}`;
      const images = Array.from({ length: hero.photosNumber }, (_, i) => 
        `${folderPath}/photo${i + 1}.jpeg`
      );
      setPhotoUrls(images);
      setCurrentIndex(0);
    }
  }, [hero]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === photoUrls.length - 1 ? 0 : prevIndex + 1
    );
  }, [photoUrls.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? photoUrls.length - 1 : prevIndex - 1
    );
  }, [photoUrls.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStart - touchEnd;
    const minSwipeDistance = 50; // Reduced threshold for easier swiping

    if (swipeDistance > minSwipeDistance) {
      nextSlide(); // Swipe left
    } else if (swipeDistance < -minSwipeDistance) {
      prevSlide(); // Swipe right
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [nextSlide, prevSlide, isFullscreen]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
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
    <>
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardContent className="p-0 overflow-hidden rounded-lg">
          {/* Gallery Container */}
          <div className="relative w-full">
            {/* Loading Indicator */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 z-10">
                <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
              </div>
            )}

            {/* Main Image Container */}
            <div 
              className="relative aspect-[4/3] w-full overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {photoUrls.map((url, index) => (
                <div 
                  key={index}
                  className={`absolute top-0 left-0 w-full h-full transition-opacity duration-300 ${
                    currentIndex === index ? 'opacity-100 z-1' : 'opacity-0 z-0'
                  }`}
                >
                  <Image
                    src={url}
                    alt={`${hero.fullName || 'Hero'} photo ${index + 1}`}
                    className="w-full h-full object-contain bg-black/5"
                    width={800}
                    height={600}
                    priority={index === currentIndex}
                    onLoad={handleImageLoad}
                  />
                </div>
              ))}
            </div>

            {/* Fullscreen Button */}
            <button 
              className="absolute top-2 right-2 rounded-full p-2 bg-black/40 hover:bg-black/60 text-white z-20 transition-colors"
              onClick={toggleFullscreen}
              aria-label="Toggle fullscreen"
            >
              <ZoomIn className="h-5 w-5" />
            </button>

            {/* Navigation Buttons - Always visible on mobile with larger touch targets */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-2 sm:px-4">
              <button
                className="rounded-full p-2 sm:p-3 bg-black/40 hover:bg-black/60 text-white transition-colors"
                onClick={prevSlide}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                className="rounded-full p-2 sm:p-3 bg-black/40 hover:bg-black/60 text-white transition-colors"
                onClick={nextSlide}
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-2 left-2 bg-black/50 text-white text-sm px-2 py-1 rounded-full">
              {currentIndex + 1} / {photoUrls.length}
            </div>

            {/* Indicators - Simplified for mobile */}
            <div className="absolute bottom-2 right-2 left-12 flex justify-center">
              <div className="flex space-x-1 overflow-x-auto px-2 py-1 bg-black/40 rounded-full">
                {photoUrls.length <= 10 && photoUrls.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                      currentIndex === index 
                        ? 'bg-white' 
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
                
                {photoUrls.length > 10 && (
                  <>
                    {/* Show 5 indicators around the current one */}
                    {Array.from({ length: Math.min(5, photoUrls.length) }, (_, i) => {
                      const idx = (currentIndex + i - 2 + photoUrls.length) % photoUrls.length;
                      return (
                        <button
                          key={idx}
                          className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                            currentIndex === idx 
                              ? 'bg-white' 
                              : 'bg-white/50 hover:bg-white/75'
                          }`}
                          onClick={() => setCurrentIndex(idx)}
                          aria-label={`Go to image ${idx + 1}`}
                        />
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          onClick={toggleFullscreen}
        >
          <div className="relative w-full h-full">
            <Image
              src={photoUrls[currentIndex]}
              alt={`${hero.fullName || 'Hero'} photo ${currentIndex + 1}`}
              className="w-full h-full object-contain"
              fill
              priority
            />
            
            <button 
              className="absolute top-4 right-4 rounded-full p-3 bg-black/60 text-white"
              onClick={toggleFullscreen}
              aria-label="Exit fullscreen"
            >
              <span className="text-2xl">×</span>
            </button>
            
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-4">
              <button
                className="rounded-full p-4 bg-black/60 text-white"
                onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              <button
                className="rounded-full p-4 bg-black/60 text-white"
                onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                aria-label="Next image"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </div>
            
            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full">
              {currentIndex + 1} / {photoUrls.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default GalleryTab;