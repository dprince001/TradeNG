import React from "react";
import Button from "../Button";
import Input from "../Input";

interface AddItemComponentProps {
  itemName: string;
  setItemName: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  condition: string;
  setCondition: (value: string) => void;
  defect: string;
  setDefect: (value: string) => void;
  brand: string;
  setBrand: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  setStep: (value: number) => void;
}

const AddItemComponent = ({
  itemName,
  setItemName,
  category,
  condition,
  defect,
  brand,
  description,
  setStep,
  setCategory,
  setCondition,
  setDefect,
  setBrand,
  setDescription,
}: AddItemComponentProps) => {
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
            <span className={category ? "text-text-primary" : "text-gray-400"}>
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
            Please describe the item in details, to allow buyers make informed
            choice.
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
  );
};

export default AddItemComponent;
