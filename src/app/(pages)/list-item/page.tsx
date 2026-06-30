"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import TopNavbar from "@/app/components/layout/TopNavbar";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import StarIcon from "@/app/assets/svgs/home/StarIcon";
import LoveIcon from "@/app/assets/svgs/home/LoveIcon";
import IphoneImage from "@/app/assets/images/IphoneImage.png";
import BottomNavbar from "@/app/components/layout/BottomNavbar";

export default function ListItemPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);

  // Form states
  const [itemName, setItemName] = useState("Wall Console");
  const [category, setCategory] = useState("Furniture");
  const [condition, setCondition] = useState("Like New");
  const [defect, setDefect] = useState("None");
  const [brand, setBrand] = useState("Premium Woodcraft");
  const [description, setDescription] = useState(
    "Beautiful mid-century modern wall console. Perfect condition, made from solid walnut with brass accents. Mounting hardware included.",
  );

  const [price, setPrice] = useState("380");
  const [negotiable, setNegotiable] = useState(true);
  const [deliveryOption, setDeliveryOption] = useState("Pickup");
  const [pickupAddress, setPickupAddress] = useState("12 Broad Street, Lagos");

  // Custom mock initial photos (matching step 5 mockups)
  const [photos, setPhotos] = useState<string[]>([
    IphoneImage.src,
    IphoneImage.src,
  ]);

  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [showDeliveryDropdown, setShowDeliveryDropdown] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // File input ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle Photo Upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newUrls = filesArray.map((file) => URL.createObjectURL(file));
      setPhotos((prev) => [...prev, ...newUrls]);
    }
  };

  // Remove Photo
  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    if (activePhotoIndex >= photos.length - 1 && activePhotoIndex > 0) {
      setActivePhotoIndex(photos.length - 2);
    }
  };

  // Top Nav Back Action
  const handleBack = () => {
    if (step > 1) {
      // If we are in delivery expanded state (step 4), collapse it and stay on pricing step (step 3)
      if (step === 4) {
        setShowDeliveryDropdown(false);
        setStep(3);
      } else {
        setStep((prev) => prev - 1);
      }
    } else {
      router.push("/");
    }
  };

  // Top Nav Titles
  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "List Item";
      case 2:
        return "Item details";
      case 3:
      case 4:
        return "Pricing";
      case 5:
        return "Photos";
      case 6:
        return "Review & List";
      default:
        return "Success";
    }
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col relative select-none">
      {/* ── Top Header Navigation ── */}
      {step <= 6 && (
        <TopNavbar
          title={getStepTitle()}
          onBack={handleBack}
          rightElement={
            <span className="text-xs text-text-secondary font-medium">
              {step <= 2
                ? "1/4"
                : step <= 4
                  ? "2/4"
                  : step === 5
                    ? "3/4"
                    : "4/4"}
            </span>
          }
        />
      )}

      {/* ── Main Step Container ── */}
      <div className="flex-1 flex flex-col overflow-y-auto px-5 pt-6 pb-24">
        {/* STEP 1: Describe Item */}
        {step === 1 && (
          <div className="flex-1 flex flex-col gap-6">
            <div>
              <h2 className="text-[#1D1E20] text-xl font-bold leading-tight">
                Describe your Item
              </h2>
              <p className="text-text-secondary text-xs mt-1 leading-relaxed">
                Complete your item details to make it easier for buyers to find
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <Input
                label="Item Name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="Enter item name"
              />

              {/* Category selector triggering step 2 */}
              <div className="flex flex-col gap-1.5 w-full">
                <label className="text-sm font-medium text-text-primary">
                  Category
                </label>
                <button
                  onClick={() => setStep(2)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-text-primary bg-white text-left flex justify-between items-center transition-all hover:border-gray-300"
                >
                  <span
                    className={category ? "text-text-primary" : "text-gray-400"}
                  >
                    {category || "Select Category"}
                  </span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1D1E20"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              </div>

              <div className="flex flex-col gap-1.5 w-full">
                <label className="text-sm font-medium text-text-primary">
                  Condition
                </label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-text-primary bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                >
                  <option value="New">New</option>
                  <option value="Like New">Like New</option>
                  <option value="Used">Used</option>
                  <option value="For Parts">For Parts</option>
                </select>
              </div>

              <Input
                label="Any defect? If yes, please state."
                value={defect}
                onChange={(e) => setDefect(e.target.value)}
                placeholder="Describe any defects"
              />

              <Input
                label="Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Brand or manufacturer"
              />

              <div className="flex flex-col gap-1.5 w-full">
                <label className="text-sm font-medium text-text-primary">
                  Please describe the item in details, to allow buyers make
                  informed choice.
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your item..."
                  rows={4}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-text-primary placeholder-gray-400 bg-white transition-all focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 resize-none"
                />
              </div>
            </div>

            <div className="mt-auto pt-6">
              <Button onClick={() => setStep(3)} fullWidth variant="primary">
                Next
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: Item Details with Category pills */}
        {step === 2 && (
          <div className="flex-1 flex flex-col gap-6">
            <div>
              <h2 className="text-[#1D1E20] text-xl font-bold leading-tight">
                Describe your Item
              </h2>
              <p className="text-text-secondary text-xs mt-1 leading-relaxed">
                Complete your item details to make it easier for buyers to find
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <Input
                label="Item Name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="Enter item name"
                className="border-primary ring-1 ring-primary/10"
              />

              {/* Category Selector with expanded pills */}
              <div className="flex flex-col gap-1.5 w-full">
                <label className="text-sm font-medium text-text-primary">
                  Category
                </label>
                <div
                  onClick={() => setStep(1)}
                  className="w-full border border-primary rounded-lg px-4 py-3 text-sm text-text-primary bg-white flex justify-between items-center cursor-pointer hover:bg-gray-50/45 transition-colors"
                >
                  <span className="font-semibold text-primary">{category}</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FF4304"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                </div>

                {/* Pills container */}
                <div className="mt-2.5">
                  <span className="text-xs font-semibold text-text-secondary block mb-2">
                    Pills / Gadgets
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {["Gadgets", "Furniture", "Fashion", "Electronic"].map(
                      (cat) => {
                        const selected = category === cat;
                        return (
                          <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                              selected
                                ? "bg-[#FFF5F3] text-primary border border-primary/20 shadow-sm"
                                : "bg-[#F5F6FA] text-[#1D1E20] border border-transparent hover:bg-gray-100"
                            }`}
                          >
                            {cat}
                          </button>
                        );
                      },
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 w-full">
                <label className="text-sm font-medium text-text-primary">
                  Condition
                </label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-text-primary bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                >
                  <option value="New">New</option>
                  <option value="Like New">Like New</option>
                  <option value="Used">Used</option>
                  <option value="For Parts">For Parts</option>
                </select>
              </div>

              <Input
                label="Any defect? If yes, please state."
                value={defect}
                onChange={(e) => setDefect(e.target.value)}
                placeholder="Describe any defects"
              />

              <Input
                label="Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Brand or manufacturer"
              />

              <div className="flex flex-col gap-1.5 w-full">
                <label className="text-sm font-medium text-text-primary">
                  Please describe the item in details, to allow buyers make
                  informed choice.
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your item..."
                  rows={4}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-text-primary placeholder-gray-400 bg-white transition-all focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 resize-none"
                />
              </div>
            </div>

            <div className="mt-auto pt-6">
              <Button onClick={() => setStep(3)} fullWidth variant="primary">
                Next
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3 & 4: Pricing & Delivery details */}
        {(step === 3 || step === 4) && (
          <div className="flex-1 flex flex-col gap-6">
            <div>
              <h2 className="text-[#1D1E20] text-xl font-bold leading-tight">
                Set Your Price & Delivery details
              </h2>
              <p className="text-text-secondary text-xs mt-1 leading-relaxed">
                What&apos;s the cost of your item and what are your delivery
                options
              </p>
            </div>

            <div className="flex flex-col gap-5">
              {/* Item Price */}
              <div className="flex flex-col gap-1.5 w-full">
                <label className="text-sm font-medium text-text-primary">
                  Item Price (₦)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">
                    ₦
                  </span>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0.00"
                    className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-3 text-sm text-text-primary placeholder-gray-400 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                  />
                </div>
              </div>

              {/* Price Negotiation Toggle */}
              <div className="flex items-center justify-between py-2 border-b border-gray-50/50">
                <span className="text-sm font-medium text-text-primary">
                  Allow price negotiation?
                </span>
                <button
                  onClick={() => setNegotiable(!negotiable)}
                  className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${
                    negotiable ? "bg-primary" : "bg-gray-200"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                      negotiable ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Delivery Options Custom Selector */}
              <div className="flex flex-col gap-1.5 w-full relative">
                <label className="text-sm font-medium text-text-primary">
                  Delivery options
                </label>
                <button
                  onClick={() => {
                    setShowDeliveryDropdown(!showDeliveryDropdown);
                    setStep(showDeliveryDropdown ? 3 : 4);
                  }}
                  className={`w-full border rounded-lg px-4 py-3 text-sm text-text-primary bg-white text-left flex justify-between items-center transition-all ${
                    step === 4
                      ? "border-primary"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span className="font-medium">{deliveryOption}</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={step === 4 ? "#FF4304" : "#1D1E20"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform duration-200 ${step === 4 ? "rotate-180" : ""}`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {/* Custom Dropdown (Step 4 state) */}
                {step === 4 && (
                  <div className="w-full bg-white border border-gray-150 rounded-xl mt-1.5 shadow-lg z-10 overflow-hidden divide-y divide-gray-50">
                    {["Self delivery", "Pickup", "Home delivery"].map(
                      (option) => {
                        const isSelected = deliveryOption === option;
                        return (
                          <button
                            key={option}
                            onClick={() => {
                              setDeliveryOption(option);
                              setShowDeliveryDropdown(false);
                              setStep(3);
                            }}
                            className={`w-full text-left px-4 py-3.5 text-xs font-medium transition-all flex items-center justify-between ${
                              isSelected
                                ? "bg-[#FFF5F3] text-primary"
                                : "text-[#374151] hover:bg-gray-50"
                            }`}
                          >
                            <span>{option}</span>
                            {isSelected && (
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#FF4304"
                                strokeWidth="2.5"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            )}
                          </button>
                        );
                      },
                    )}
                  </div>
                )}
              </div>

              {/* Pickup Address (If Pickup is chosen) */}
              {(deliveryOption === "Pickup" ||
                deliveryOption === "Home delivery") && (
                <div className="flex flex-col gap-1.5 w-full">
                  <label className="text-sm font-medium text-text-primary">
                    Pickup address
                  </label>
                  <textarea
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    placeholder="Enter pickup address"
                    rows={3}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-text-primary placeholder-gray-400 bg-white transition-all focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 resize-none"
                  />
                </div>
              )}
            </div>

            <div className="mt-auto pt-6">
              <Button
                onClick={() => {
                  setShowDeliveryDropdown(false);
                  setStep(5);
                }}
                fullWidth
                variant="primary"
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* STEP 5: Add Photos */}
        {step === 5 && (
          <div className="flex-1 flex flex-col gap-6">
            <div>
              <h2 className="text-[#1D1E20] text-xl font-bold leading-tight">
                Add Photos
              </h2>
              <p className="text-text-secondary text-xs mt-1 leading-relaxed">
                Great photos help your item sell faster! Upload images from
                different angles.
              </p>
            </div>

            {/* Dotted Upload Box */}
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

            {/* Uploaded Thumbnails Grid */}
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

                  {/* Add more photo grid card */}
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
                onClick={() => setStep(6)}
                disabled={photos.length === 0}
                fullWidth
                variant="primary"
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* STEP 6: Review & Publish Your Listing */}
        {step === 6 && (
          <div className="flex-1 flex flex-col gap-6 pb-4">
            <div>
              <h2 className="text-[#1D1E20] text-xl font-bold leading-tight">
                Review & Publish Your Listing
              </h2>
              <p className="text-text-secondary text-xs mt-1 leading-relaxed">
                Complete your item details to make it easier for buyers to find
              </p>
            </div>

            {/* Listing Preview Card */}
            <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.04)] bg-white flex flex-col">
              {/* Image Carousel */}
              <div className="relative aspect-[4/3] bg-gray-100 w-full overflow-hidden">
                {photos.length > 0 ? (
                  <>
                    <img
                      src={photos[activePhotoIndex]}
                      alt="Listing Preview"
                      className="w-full h-full object-cover"
                    />

                    {/* Carousel Nav arrows if > 1 photo */}
                    {photos.length > 1 && (
                      <>
                        <button
                          onClick={() =>
                            setActivePhotoIndex((prev) =>
                              prev === 0 ? photos.length - 1 : prev - 1,
                            )
                          }
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md transition-colors"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#1D1E20"
                            strokeWidth="2.5"
                          >
                            <polyline points="15 18 9 12 15 6" />
                          </svg>
                        </button>
                        <button
                          onClick={() =>
                            setActivePhotoIndex((prev) =>
                              prev === photos.length - 1 ? 0 : prev + 1,
                            )
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md transition-colors"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#1D1E20"
                            strokeWidth="2.5"
                          >
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </button>
                      </>
                    )}

                    {/* Page Indicator Dots */}
                    <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/20 px-2 py-1 rounded-full backdrop-blur-[2px]">
                      {photos.map((_, i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                            i === activePhotoIndex
                              ? "bg-primary w-3"
                              : "bg-white/60"
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

                {/* Love Button */}
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
                >
                  <LoveIcon liked={isLiked} />
                </button>
              </div>

              {/* Card details */}
              <div className="p-5 flex flex-col gap-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-[#1D1E20] text-base font-bold tracking-tight">
                      {itemName || "Untitled Item"}
                    </h3>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-primary text-white leading-tight uppercase tracking-wider">
                      {condition}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-primary text-lg font-extrabold">
                      ${price}
                    </span>
                    {negotiable && (
                      <span className="text-text-secondary text-[10px] font-medium bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                        Negotiable
                      </span>
                    )}
                  </div>

                  <span className="text-[#8F959E] text-[10px] block mt-1.5 flex items-center gap-1">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    Lagos, Nigeria ({deliveryOption})
                  </span>
                </div>

                <p className="text-[#374151] text-xs leading-[1.65] font-light">
                  {description || "No description provided."}
                </p>

                {/* Seller Section */}
                <div className="flex items-center justify-between bg-white rounded-xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#E5E7EB] flex items-center justify-center overflow-hidden font-bold text-xs text-text-primary">
                      S
                    </div>
                    <div>
                      <span className="text-xs font-bold block text-[#1D1E20]">
                        Samson
                      </span>
                      <span className="text-[9px] text-text-secondary font-medium">
                        Verified Seller
                      </span>
                    </div>
                  </div>

                  <button className="flex items-center gap-1 text-primary text-xs font-bold hover:translate-x-0.5 transition-transform">
                    Contact seller
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </button>
                </div>

                {/* Seller's Review Card */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-text-primary">
                      Seller&apos;s Review
                    </h4>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-text-primary">
                      <StarIcon size={12} />
                      <span>99+ reviews</span>
                    </div>
                  </div>

                  <div className="bg-[#FFF5F3] rounded-xl p-4 text-[11px] border border-primary/5 flex flex-col gap-1.5">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((starIndex) => (
                        <svg
                          key={starIndex}
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="#FF4304"
                          stroke="#FF4304"
                          strokeWidth="1"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                      <span className="font-bold text-[10px] text-primary ml-1">
                        (5/5)
                      </span>
                    </div>

                    <p className="font-bold text-[#1D1E20]">Sofia L.</p>
                    <p className="text-[#374151] leading-[1.6]">
                      &ldquo;Looks brand new! The fabric feels fresh and crisp.
                      Can&apos;t believe I got this for half the price.&rdquo;
                    </p>
                    <span className="text-text-secondary text-[9px] mt-1 block">
                      July 28, 2026
                    </span>
                  </div>

                  <button className="w-full text-center text-primary text-xs font-semibold py-1.5 hover:underline">
                    See all reviews
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-6">
              <Button onClick={() => setStep(7)} fullWidth variant="primary">
                Publish Listing
              </Button>
            </div>
          </div>
        )}

        {/* STEP 7: Success State */}
        {step === 7 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-6 py-12">
            <div className="w-20 h-20 rounded-full bg-[#FFF5F3] border border-primary/10 flex items-center justify-center animate-bounce">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FF4304"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-[#1D1E20] text-2xl font-extrabold tracking-tight">
                Listing Published!
              </h2>
              <p className="text-text-secondary text-sm px-6 leading-relaxed">
                Your item &ldquo;{itemName}&rdquo; is now active and visible to
                shoppers on TradeNG.
              </p>
            </div>

            <div className="w-full max-w-xs flex flex-col gap-3 mt-6">
              <Button
                variant="primary"
                onClick={() => router.push("/")}
                fullWidth
              >
                Go to Homepage
              </Button>

              <Button
                variant="outline"
                className="text-primary border-primary hover:bg-[#FFF5F3]/40"
                onClick={() => {
                  // Reset states and go back to step 1
                  setItemName("Wall Console");
                  setCategory("Furniture");
                  setCondition("Like New");
                  setPrice("380");
                  setNegotiable(true);
                  setStep(1);
                }}
                fullWidth
              >
                Create Another Listing
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* ── Bottom Navigation Bar (Visible in step 1, 2, 6) ── */}
      {(step === 1 || step === 2 || step === 6) && <BottomNavbar />}
    </div>
  );
}
