"use client";

import { useState, useRef, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import BackButton from "@/app/components/layout/BackButton";
import Container from "@/app/components/layout/Container";
import AppShell from "@/app/components/layout/AppShell";
import PublishListing from "@/app/components/list-items/PublishListing";
import PricingAndDelivery from "@/app/components/list-items/PricingAndDelivery";
import AddItemSuccess from "@/app/components/list-items/AddItemSuccess";
import AddPhotosComponent from "@/app/components/list-items/AddPhotosComponent";
import AddItemComponent from "@/app/components/list-items/AddItemComponent";
import usePost from "@/app/hooks/usePost";
import { useCreateListingMutation, useUpdateListingMutation } from "@/app/redux/api/listingApiSlice";
import { useUploadImagesMutation } from "@/app/redux/api/uploadsApiSlice";
import useGet from "@/app/hooks/useGet";
import { useGetCategoriesQuery } from "@/app/redux/api/categoriesApiSlice";
import { Spinner } from "@/app/components/Loader";

const listingSchema = z.object({
  item_name: z.string().min(1, "Item name is required"),
  category_id: z.string().min(1, "Category is required"),
  condition: z.string().min(1, "Condition is required"),
  defect_description: z.string().optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().min(1, "Price is required"),
  allow_price_negotiation: z.boolean(),
  delivery_options: z.enum(["PICKUP", "SELF_DELIVERY"]),
  pickup_address: z.string().optional(),
  location: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.delivery_options === "PICKUP" && (!data.pickup_address || data.pickup_address.trim() === "")) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Pickup address is required",
      path: ["pickup_address"],
    });
  }
});

export type ListingFormValues = z.infer<typeof listingSchema>;

export default function ListItemPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit"); // present when editing
  const isEditMode = !!editId;

  const { handlePost: createListing, isLoading: createListingLoading } = usePost(useCreateListingMutation);
  const { handlePost: updateListing, isLoading: updateListingLoading } = usePost(useUpdateListingMutation);
  const { handlePost: uploadImages, isLoading: uploadingImages } = usePost(useUploadImagesMutation);
  const { data: categoriesData, isFetching: categoriesLoading } = useGet(useGetCategoriesQuery, "");

  const isPublishing = uploadingImages || createListingLoading || updateListingLoading;

  const [step, setStep] = useState(1);
  const [showDeliveryDropdown, setShowDeliveryDropdown] = useState(false);

  const [photos, setPhotos] = useState<string[]>([]);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>([]); // kept from edit
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const methods = useForm<ListingFormValues>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      item_name: "",
      category_id: "",
      condition: "",
      defect_description: "",
      description: "",
      price: 0,
      allow_price_negotiation: false,
      delivery_options: "PICKUP",
      pickup_address: "",
      location: "",
    },
    mode: "onChange",
  });

  // ── Pre-fill form in edit ────────────────────────────────────────────
  useEffect(() => {
    if (!isEditMode || !editId) return;

    const saved = sessionStorage.getItem(`edit-listing-${editId}`);
    if (!saved) return;

    try {
      const data = JSON.parse(saved);
      methods.reset({
        item_name: data.item_name ?? "",
        category_id: data.category_id ?? "",
        condition: data.condition ?? "",
        defect_description: data.defect_description ?? "",
        description: data.description ?? "",
        price: Number(data.price) || 0,
        allow_price_negotiation: data.allow_price_negotiation ?? false,
        delivery_options: data.delivery_options ?? "PICKUP",
        pickup_address: data.pickup_address ?? "",
        location: data.location ?? "",
      });

      // Pre-load existing images as preview URLs
      if (Array.isArray(data.images) && data.images.length > 0) {
        setPhotos(data.images);
        setExistingImageUrls(data.images);
      }
    } catch (e) {
      console.log(e)
    }
  }, [editId, isEditMode]);

  // ── Photo helpers ────────────────────────────────────────────────────────
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newUrls = filesArray.map((file) => URL.createObjectURL(file));
      setPhotos((prev) => [...prev, ...newUrls]);
      setPhotoFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    setPhotoFiles((prev) => prev.filter((_, i) => i !== index));
    setExistingImageUrls((prev) => prev.filter((_, i) => i !== index));
    if (activePhotoIndex >= photos.length - 1 && activePhotoIndex > 0) {
      setActivePhotoIndex(photos.length - 2);
    }
  };

  // ── Publish / Update ─────────────────────────────────────────────────────
  const handlePublish = async (status: "ACTIVE" | "DRAFT") => {
    const values = methods.getValues();

    // Upload any new photo files
    let uploadedUrls: string[] = [];
    if (photoFiles.length > 0) {
      const formData = new FormData();
      photoFiles.forEach((file) => formData.append("images", file));

      const uploadRes = await uploadImages(formData, { showSuccessToast: false });
      if (!uploadRes?.success) return;

      uploadedUrls = uploadRes.data?.data?.images ?? uploadRes.data?.images ?? [];
    }

    // Merge existing image URLs with any newly uploaded ones
    const finalImages = [
      ...existingImageUrls.filter((url) => photos.includes(url)), // keep non-removed images
      ...uploadedUrls,
    ];

    const body = {
      ...values,
      images: finalImages,
      delivery_options: [values.delivery_options],
      status,
      price: Number(values.price),
    };

    if (isEditMode && editId) {
      const res = await updateListing({ id: editId, ...body });
      if (res?.success) {
        sessionStorage.removeItem(`edit-listing-${editId}`);
        setStep(5);
      }
    } else {
      const res = await createListing(body);
      if (res?.success) {
        setStep(5);
      }
    }
  };

  const handleDraft = () => handlePublish("DRAFT");

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    } else {
      router.back();
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 1: return isEditMode ? "Edit Item" : "List Item";
      case 2: return "Pricing";
      case 3: return "Photos";
      case 4: return "Review & List";
      default: return "Success";
    }
  };

  const handleReset = () => {
    methods.reset();
    setPhotos([]);
    setPhotoFiles([]);
    setExistingImageUrls([]);
    setActivePhotoIndex(0);
    setShowDeliveryDropdown(false);
    setStep(1);
  };

  if (categoriesLoading) return <Spinner />;

  return (
    <FormProvider {...methods}>
      <AppShell showFooter={false} showBottomNav={false}>
      <div className="w-full flex flex-col relative select-none h-full">
        {/* ── Top Header Navigation ── */}
        {step <= 6 && (
          <Container className="max-w-2xl flex items-center gap-3 pt-6 pb-4">
            <BackButton onClick={handleBack} />
            <h1 className="flex-1 text-text-primary font-semibold text-base tracking-wide">
              {getStepTitle()}
            </h1>
            <span className="text-xs text-text-secondary font-medium">
              {step === 1 ? "1/4" : step === 2 ? "2/4" : step === 3 ? "3/4" : "4/4"}
            </span>
          </Container>
        )}

        <Container className="max-w-2xl flex-1 flex flex-col overflow-y-auto py-6">
          {/* STEP 1: Describe Item */}
          {step === 1 && (
            <AddItemComponent
              categoriesData={categoriesData}
              setStep={setStep}
            />
          )}

          {/* STEP 2: Pricing & Delivery */}
          {step === 2 && (
            <PricingAndDelivery
              showDeliveryDropdown={showDeliveryDropdown}
              setShowDeliveryDropdown={setShowDeliveryDropdown}
              step={step}
              setStep={setStep}
            />
          )}

          {/* STEP 3: Add Photos */}
          {step === 3 && (
            <AddPhotosComponent
              photos={photos}
              removePhoto={removePhoto}
              fileInputRef={fileInputRef}
              handlePhotoUpload={handlePhotoUpload}
              setStep={setStep}
            />
          )}

          {/* STEP 4: Review & Publish */}
          {step === 4 && (
            <PublishListing
              photos={photos}
              setStep={setStep}
              activePhotoIndex={activePhotoIndex}
              setActivePhotoIndex={setActivePhotoIndex}
              handlePhotoUpload={handlePhotoUpload}
              removePhoto={removePhoto}
              onPublish={() => handlePublish("ACTIVE")}
              onDraft={handleDraft}
              isPublishing={isPublishing}
            />
          )}

          {/* STEP 5: Success */}
          {step === 5 && (
            <AddItemSuccess
              itemName={methods.watch("item_name")}
              onReset={handleReset}
            />
          )}
        </Container>
      </div>
      </AppShell>
    </FormProvider>
  );
}
