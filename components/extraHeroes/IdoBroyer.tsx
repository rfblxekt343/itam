import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { X, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface IdoBroyerProps {
  imagePaths: string[];
}

export default function IdoBroyer({ imagePaths }: IdoBroyerProps) {
  const [selectedMedia, setSelectedMedia] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const shalevImages = imagePaths.filter(path => path.includes("shalev"));
  console.log(shalevImages);

  const mediaItems = [
    ...shalevImages.map(path => ({ type: 'image', src: path })),
    { type: 'video', src: `/videos/heroes/עידו ברויר/ido.mp4` }
  ];

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying || mediaItems.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % mediaItems.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, mediaItems.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % mediaItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  };

  const nextMedia = () => {
    if (selectedMedia !== null) {
      setSelectedMedia((selectedMedia + 1) % mediaItems.length);
    }
  };

  const prevMedia = () => {
    if (selectedMedia !== null) {
      setSelectedMedia((selectedMedia - 1 + mediaItems.length) % mediaItems.length);
    }
  };

  const handleSlideClick = (index: number) => {
    setCurrentSlide(index);
    setSelectedMedia(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  if (mediaItems.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-dashed border-blue-200">
        <CardContent className="p-8 text-center">
          <div className="text-4xl mb-4">📸</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">אין תמונות של שלו</h3>
          <p className="text-gray-500">תמונות יתווספו בקרוב...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="bg-gradient-to-br from-indigo-50 via-white to-cyan-50 border border-indigo-100 shadow-lg">
        <CardContent className="p-4 sm:p-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <div className="flex flex-col items-center gap-2 px-3 py-1 rounded-full text-indigo-900/80 shadow-sm">
                <span className="text-sm font-semibold text-indigo-900/80 drop-shadow-sm">חוויות ורגעים משותפים של שלו ועידו</span>
                <div >
                  <span className="text-xs text-indigo-500 bg-indigo-100 px-2 py-0.5 rounded-full shadow-sm ml-2 animate-pulse cursor-pointer">
                    לחץ להגדלה
                  </span>
                </div>
              </div>


            </div>
          </div>

          {/* Auto-sliding Carousel */}
          <div className="relative w-full">
            {/* Main Slide Display */}
            <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg group">
              {mediaItems[currentSlide].type === 'image' ? (
                <Image
                  src={mediaItems[currentSlide].src}
                  alt={`תמונה של שלו ${currentSlide + 1}`}
                  fill
                  className="object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
                  onClick={() => setSelectedMedia(currentSlide)}
                />
              ) : (
                <div
                  className="relative w-full h-full cursor-pointer"
                  onClick={() => setSelectedMedia(currentSlide)}
                >
                  <video
                    src={mediaItems[currentSlide].src}
                    className="w-full h-full object-cover"
                    muted
                    loop
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 transition-transform duration-300 group-hover:scale-110">
                      <Play size={32} className="text-white ml-1" />
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full text-white transition-all duration-300 opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full text-white transition-all duration-300 opacity-0 group-hover:opacity-100"
              >
                <ChevronRight size={20} />
              </button>

              {/* Auto-play Toggle */}
              <button
                onClick={toggleAutoPlay}
                className="absolute top-4 right-4 z-10 p-2 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full text-white transition-all duration-300 opacity-0 group-hover:opacity-100"
              >
                {isAutoPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>

              {/* Slide Counter */}
              <div className="absolute bottom-4 left-4 z-10 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
                {currentSlide + 1} / {mediaItems.length}
              </div>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-4 gap-2">
              {mediaItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                      ? 'bg-indigo-600 scale-110'
                      : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                />
              ))}
            </div>

            {/* Thumbnail Grid (Hidden on small screens) */}
            <div className="hidden lg:grid grid-cols-6 gap-2 mt-4">
              {mediaItems.map((media, index) => (
                <div
                  key={index}
                  className={`relative aspect-square cursor-pointer transform transition-all duration-300 hover:scale-105 rounded-lg overflow-hidden ${index === currentSlide ? 'ring-2 ring-indigo-500 ring-offset-2' : ''
                    }`}
                  onClick={() => handleSlideClick(index)}
                >
                  {media.type === 'image' ? (
                    <Image
                      src={media.src}
                      alt={`תמונה קטנה ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="relative w-full h-full bg-gray-200">
                      <video
                        src={media.src}
                        className="w-full h-full object-cover"
                        muted
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play size={16} className="text-white" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fullscreen Modal */}
      {selectedMedia !== null && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Close Button */}
            <button
              onClick={() => setSelectedMedia(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white transition-colors"
            >
              <X size={24} />
            </button>

            {/* Navigation Buttons */}
            {mediaItems.length > 1 && (
              <>
                <button
                  onClick={prevMedia}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextMedia}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white transition-colors"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Media Counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
              {selectedMedia + 1} / {mediaItems.length}
            </div>

            {/* Main Media */}
            <div className="relative max-w-4xl max-h-full w-full h-full">
              {mediaItems[selectedMedia].type === 'image' ? (
                <Image
                  src={mediaItems[selectedMedia].src}
                  alt={`תמונה של שלו ${selectedMedia + 1}`}
                  fill
                  className="object-contain"
                  priority
                />
              ) : (
                <video
                  src={mediaItems[selectedMedia].src}
                  className="w-full h-full object-contain"
                  controls
                  autoPlay
                />
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}