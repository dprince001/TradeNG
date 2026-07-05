"use client";

import React from "react";

interface ImageCarouselProps {
  photos: string[];
  activePhotoIndex: number;
  setActivePhotoIndex: React.Dispatch<React.SetStateAction<number>>;
  aspectRatio?: string;
}

const ImageCarousel = ({
  photos,
  activePhotoIndex,
  setActivePhotoIndex,
  aspectRatio = "aspect-[4/3]",
}: ImageCarouselProps) => {
  return (
    <div className={`relative ${aspectRatio} bg-gray-100 w-full overflow-hidden`}>
      {photos?.length > 0 ? (
        <>
          <img
            src={photos[activePhotoIndex]}
            alt="Listing Preview"
            className="w-full h-full object-cover"
          />

          {photos?.length > 1 && (
            <>
              <button
                type="button"
                onClick={() =>
                  setActivePhotoIndex((prev) =>
                    prev === 0 ? photos.length - 1 : prev - 1,
                  )
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1D1E20" strokeWidth="2.5">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() =>
                  setActivePhotoIndex((prev) =>
                    prev === photos.length - 1 ? 0 : prev + 1,
                  )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1D1E20" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </>
          )}

          {/* Dots */}
          <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/20 px-2 py-1 rounded-full backdrop-blur-[2px]">
            {photos.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActivePhotoIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  i === activePhotoIndex ? "bg-primary w-3" : "bg-white/60 w-1.5"
                }`}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-text-secondary text-xs">
          No photo uploaded
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;