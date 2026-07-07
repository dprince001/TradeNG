import React from "react";
import Button from "../Button";

type AddPhotosComponentProps = {
  photos: string[];
  removePhoto: (index: number) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handlePhotoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setStep: (step: number) => void;
};

const AddPhotosComponent = ({
  photos,
  removePhoto,
  fileInputRef,
  handlePhotoUpload,
  setStep,
}: AddPhotosComponentProps) => {
  return (
    <div className="flex-1 flex flex-col gap-6">
      <div>
        <h2 className="text-[#1D1E20] text-xl font-bold leading-tight">
          Add Photos
        </h2>
        <p className="text-text-secondary text-xs mt-1 leading-relaxed">
          Great photos help your item sell faster! Upload images from different
          angles.
        </p>
      </div>

      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-gray-200 hover:border-primary/40 rounded-2xl py-8 px-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-gray-50/20 group"
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          multiple
          accept="image/*"
          onChange={handlePhotoUpload}
        />

        <div className="w-12 h-12 rounded-full bg-[#FFF5F3] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FF4304"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </div>

        <span className="text-xs font-semibold text-text-primary text-center">
          Choose a file or drag & drop it here
        </span>
        <span className="text-[10px] text-text-secondary mt-1 text-center">
          JPEG, PNG formats, up to 5MB
        </span>

        <button className="mt-4 px-5 py-2 text-xs font-semibold border border-gray-200 rounded-lg bg-white text-text-primary shadow-sm hover:bg-gray-50 transition-colors">
          Browse File
        </button>
      </div>

      {photos.length > 0 && (
        <div className="flex flex-col gap-2.5">
          <span className="text-xs font-bold text-text-primary">
            Uploaded Photos ({photos.length})
          </span>
          <div className="grid grid-cols-3 gap-3">
            {photos.map((url, i) => (
              <div
                key={i}
                className="relative aspect-square rounded-xl overflow-hidden bg-gray-150 border border-gray-100 group"
              >
                <img
                  src={url}
                  alt={`Upload ${i}`}
                  className="w-full h-full object-cover"
                />

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removePhoto(i);
                  }}
                  className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#1d1e20] text-white flex items-center justify-center hover:bg-black transition-colors shadow-sm"
                  aria-label="Remove photo"
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            ))}

            <button
              onClick={() => fileInputRef.current?.click()}
              className="aspect-square rounded-xl border border-dashed border-gray-300 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gray-50 transition-colors"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#8F959E"
                strokeWidth="2"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className="mt-auto pt-6">
        <Button
          onClick={() => setStep(4)}
          disabled={photos.length === 0}
          fullWidth
          variant="primary"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default AddPhotosComponent;
