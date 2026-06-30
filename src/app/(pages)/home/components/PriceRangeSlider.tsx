import { useState } from "react";

const PriceRangeSlider = () => {
  const [value, setValue] = useState(30);
  const pct = value;

  const trackStyle = {
    background: `linear-gradient(to right, #FF4304 0%, #FF4304 ${pct}%, #F3F4F6 ${pct}%, #F3F4F6 100%)`,
  };

  return (
    <div>
      <div className="flex justify-between text-xs text-[#6B7280] mb-3">
        <span>₦0</span>

        <span>₦1,000,000</span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="price-slider w-full cursor-pointer"
        style={trackStyle as React.CSSProperties}
      />
    </div>
  );
};

export default PriceRangeSlider;
