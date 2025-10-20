import React from "react";

interface RangeProps {
  steps: string[];
}

const Range: React.FC<RangeProps> = ({ steps }) => {
  const [value, setValue] = React.useState(25);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value));
  };

  return (
    <div className="w-full max-w-xs">
      <input
        type="range"
        min={0}
        max="100"
        value={value}
        onChange={handleChange}
        className="range range-primary"
        step={100 / (steps.length - 1)}
      />
      <div className="flex justify-between px-2.5 mt-2 text-xs">
        {steps.map((step, index) => (
          <span className="relative" key={step + index + "|"}>
            |
            <span
              key={step + index}
              className="absolute -left-5 top-5 text-center "
            >
              {step}
            </span>
          </span>
        ))}
      </div>
      <div className="flex justify-center mt-2 text-xs h-7"></div>
    </div>
  );
};

export default Range;
