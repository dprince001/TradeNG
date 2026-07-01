import React from "react";
import Input from "../Input";
import Button from "../Button";

interface ItemDetailsComponentProps {
  itemName: string;
  setItemName: React.Dispatch<React.SetStateAction<string>>;
  category: string;
  condition: string;
  defect: string;
  brand: string;
  description: string;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setCondition: React.Dispatch<React.SetStateAction<string>>;
  setDefect: React.Dispatch<React.SetStateAction<string>>;
  setBrand: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}

const ItemDetailsComponent = ({
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
}: ItemDetailsComponentProps) => {
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
              {["Gadgets", "Furniture", "Fashion", "Electronic"].map((cat) => {
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
              })}
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

export default ItemDetailsComponent;
