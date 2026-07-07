"use client";

import React from "react";
import Button from "../Button";
import { Controller, useFormContext } from "react-hook-form";
import { ListingFormValues } from "@/app/(pages)/(product)/list-item/page";
import Input from "../Input";

interface AddItemComponentProps {
  categoriesData: any;
  setStep: (value: number) => void;
}

const AddItemComponent = ({ categoriesData, setStep }: AddItemComponentProps) => {
  const {
    register,
    control,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext<ListingFormValues>();

  const categoryOptions =
    categoriesData?.categories?.map((item: any) => ({
      label: item?.name,
      value: item?._id ?? item?.id,
    })) ?? [];

  const handleNext = async () => {
    const valid = await trigger(["item_name", "category_id", "condition", "description"]);
    if (valid) setStep(2);
  };

  return (
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
          placeholder="Enter item name"
          error={errors.item_name?.message}
          {...register("item_name")}
        />

        <Controller
          control={control}
          name="category_id"
          render={({ field }) => (
            <Input
              type="select"
              label="Category"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              options={categoryOptions}
              error={errors.category_id?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="condition"
          render={({ field }) => (
            <Input
              type="select"
              label="Condition"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              options={[
                { label: "New", value: "NEW" },
                { label: "Like New", value: "LIKE_NEW" },
                { label: "Used", value: "USED" },
                { label: "For Parts", value: "FOR_PARTS" },
              ]}
              error={errors.condition?.message}
            />
          )}
        />

        <Input
          label="Any defect? If yes, please state."
          placeholder="Describe any defects"
          error={errors.defect_description?.message}
          {...register("defect_description")}
        />

        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-sm font-medium text-text-primary">
            Please describe the item in details, to allow buyers make informed choice.
          </label>
          <textarea
            {...register("description")}
            placeholder="Describe your item..."
            rows={4}
            className={`w-full border rounded-lg px-4 py-3 text-sm text-text-primary placeholder-gray-400 bg-white transition-all focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 resize-none ${
              errors.description ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-gray-200"
            }`}
          />
          {errors.description && (
            <span className="text-xs text-red-500 font-medium">{errors.description.message}</span>
          )}
        </div>
      </div>

      <div className="mt-auto pt-6">
        <Button type="button" onClick={handleNext} fullWidth variant="primary">
          Next
        </Button>
      </div>
    </div>
  );
};

export default AddItemComponent;
