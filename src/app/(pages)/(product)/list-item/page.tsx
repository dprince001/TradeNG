"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import TopNavbar from "@/app/components/layout/TopNavbar";
import IphoneImage from "@/app/assets/images/IphoneImage.png";
import BottomNavbar from "@/app/components/layout/BottomNavbar";
import PublishListing from "@/app/components/list-items/PublishListing";
import PricingAndDelivery from "@/app/components/list-items/PricingAndDelivery";
import AddItemSuccess from "@/app/components/list-items/AddItemSuccess";
import ItemDetailsComponent from "@/app/components/list-items/ItemDetailsComponent";
import AddPhotosComponent from "@/app/components/list-items/AddPhotosComponent";
import AddItemComponent from "@/app/components/list-items/AddItemComponent";

export default function ListItemPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);

  const [itemName, setItemName] = useState("Wall Console");
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

  const [category, setCategory] = useState("Furniture");
  const [condition, setCondition] = useState("Like New");
  const [defect, setDefect] = useState("None");
  const [brand, setBrand] = useState("Premium Woodcraft");
  const [description, setDescription] = useState(
    "Beautiful mid-century modern wall console. Perfect condition, made from solid walnut with brass accents. Mounting hardware included.",
  );

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
      } else if (step === 3) {
        setStep(1);
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
          <AddItemComponent
            itemName={itemName}
            setItemName={setItemName}
            category={category}
            setCategory={setCategory}
            condition={condition}
            setCondition={setCondition}
            defect={defect}
            setDefect={setDefect}
            brand={brand}
            setBrand={setBrand}
            description={description}
            setDescription={setDescription}
            setStep={setStep}
          />
        )}

        {/* STEP 2: Item Details with Category pills */}
        {step === 2 && (
          <ItemDetailsComponent
            itemName={itemName}
            setItemName={setItemName}
            category={category}
            condition={condition}
            defect={defect}
            brand={brand}
            description={description}
            setStep={setStep}
            setCategory={setCategory}
            setCondition={setCondition}
            setDefect={setDefect}
            setBrand={setBrand}
            setDescription={setDescription}
          />
        )}

        {/* STEP 3 & 4: Pricing & Delivery details */}
        {(step === 3 || step === 4) && (
          <PricingAndDelivery
            price={price}
            setPrice={setPrice}
            negotiable={negotiable}
            setNegotiable={setNegotiable}
            deliveryOption={deliveryOption}
            setDeliveryOption={setDeliveryOption}
            pickupAddress={pickupAddress}
            setPickupAddress={setPickupAddress}
            showDeliveryDropdown={showDeliveryDropdown}
            setShowDeliveryDropdown={setShowDeliveryDropdown}
            step={step}
            setStep={setStep}
          />
        )}

        {/* STEP 5: Add Photos */}
        {step === 5 && (
          <AddPhotosComponent
            photos={photos}
            removePhoto={removePhoto}
            fileInputRef={fileInputRef}
            handlePhotoUpload={handlePhotoUpload}
            setStep={setStep}
          />
        )}

        {/* STEP 6: Review & Publish Your Listing */}
        {step === 6 && (
          <PublishListing
            itemName={itemName}
            condition={condition}
            price={price}
            negotiable={negotiable}
            deliveryOption={deliveryOption}
            description={description}
            photos={photos}
            setStep={setStep}
            activePhotoIndex={activePhotoIndex}
            setActivePhotoIndex={setActivePhotoIndex}
            handlePhotoUpload={handlePhotoUpload}
            removePhoto={removePhoto}
          />
        )}

        {/* STEP 7: Success State */}
        {step === 7 && (
          <AddItemSuccess
            itemName={itemName}
            onReset={() => {
              setItemName("Wall Console");
              setCategory("Furniture");
              setCondition("Like New");
              setDefect("None");
              setBrand("Premium Woodcraft");
              setDescription(
                "Beautiful mid-century modern wall console. Perfect condition, made from solid walnut with brass accents. Mounting hardware included.",
              );
              setPrice("380");
              setNegotiable(true);
              setDeliveryOption("Pickup");
              setPickupAddress("12 Broad Street, Lagos");
              setPhotos([IphoneImage.src, IphoneImage.src]);
              setActivePhotoIndex(0);
              setStep(1);
            }}
          />
        )}
      </div>

      {/* ── Bottom Navigation Bar (Visible in step 1, 2, 6) ── */}
      {(step === 1 || step === 2 || step === 6) && <BottomNavbar />}
    </div>
  );
}
