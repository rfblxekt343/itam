import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function AdiDanan() {
    const basePath = `/videos/heroes/עדי דנן/video`; // Update this path
    const videoExtension = ".mp4"; // Update extension if needed
    const videoCount = 5;
    
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? videoCount - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === videoCount - 1 ? 0 : prevIndex + 1
        );
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-4xl">
           
                
                <div className="relative bg-white rounded-lg shadow-2xl overflow-hidden">
                    {/* Video Display */}
                    <div className="relative aspect-video bg-black">
                        <video
                            key={currentIndex}
                            controls
                            className="w-full h-full"
                            src={`${basePath}${currentIndex + 1}${videoExtension}`}
                        >
                            Your browser does not support the video tag.
                        </video>
                        
                        {/* Navigation Arrows */}
                        <button
                            onClick={goToPrevious}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition"
                            aria-label="Previous video"
                        >
                            <ChevronLeft size={32} />
                        </button>
                        
                        <button
                            onClick={goToNext}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition"
                            aria-label="Next video"
                        >
                            <ChevronRight size={32} />
                        </button>
                    </div>
                    
              
                    
                    
                    {/* Dot Indicators */}
                    <div className="flex justify-center gap-2 py-4 bg-white">
                        {Array.from({ length: videoCount }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => goToSlide(i)}
                                className={`w-3 h-3 rounded-full transition ${
                                    i === currentIndex 
                                        ? 'bg-blue-600 w-8' 
                                        : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                                aria-label={`Go to video ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}