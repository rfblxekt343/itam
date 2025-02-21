import React from 'react';

const ImageCarousel: React.FC = () => {
  return (
    <div className="relative overflow-hidden w-full h-[400px]">
      <div className="absolute top-0 left-0 w-full h-full animate-slide">
        <div className="flex w-full">
          {/* Row 1 */}
          <div className="flex-shrink-0 w-full flex">
            <div className="w-[33.33%] h-full bg-cover bg-center" style={{ backgroundImage: "url('/logo.png')" }}></div>
            <div className="w-[33.33%] h-full bg-cover bg-center" style={{ backgroundImage: "url('/logo.png')" }}></div>
            <div className="w-[33.33%] h-full bg-cover bg-center" style={{ backgroundImage: "url('/logo.png')" }}></div>
          </div>

          {/* Row 2 */}
          <div className="flex-shrink-0 w-full flex">
            <div className="w-[33.33%] h-full bg-cover bg-center" style={{ backgroundImage: "url('/logo.png')" }}></div>
            <div className="w-[33.33%] h-full bg-cover bg-center" style={{ backgroundImage: "url('/logo.png')" }}></div>
            <div className="w-[33.33%] h-full bg-cover bg-center" style={{ backgroundImage: "url('/logo.png')" }}></div>
          </div>

          {/* Row 3 */}
          <div className="flex-shrink-0 w-full flex">
            <div className="w-[33.33%] h-full bg-cover bg-center" style={{ backgroundImage: "url('/logo.png')" }}></div>
            <div className="w-[33.33%] h-full bg-cover bg-center" style={{ backgroundImage: "url('/logo.png')" }}></div>
            <div className="w-[33.33%] h-full bg-cover bg-center" style={{ backgroundImage: "url('/logo.png')" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
