import React, { useMemo } from "react";

interface RangeProps {
  steps: string[];
  setFormData: (data: { name: string; value: string }) => void;
  name: string;
  label?: string;
  required?: boolean;
}

const Range: React.FC<RangeProps> = ({
  steps,
  setFormData,
  name,
  label,
  required = false,
}) => {
  const [value, setValue] = React.useState(0);

  const stepSize = useMemo(() => {
    return steps.length > 1
      ? Math.floor((100 / (steps.length - 1)) * 1000) / 1000
      : 100;
  }, [steps.length]);

  const valueToStep = useMemo(() => {
    const valuetostep: Record<number, string> = {};
    for (let i = 0; i < steps.length; i++) {
      valuetostep[i * stepSize] = steps[i];
    }
    return valuetostep;
  }, [steps, stepSize]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = Number(event.target.value);
    setValue(numValue);
    setFormData({
      name: name,
      value: valueToStep[numValue] || steps[steps.length - 1],
    });
  };

  const inputTransform = useMemo(() => {
    return `translateX(${50 / steps.length}%)`;
  }, [steps.length]);

  const inputWidth = useMemo(() => {
    return `${100 - 100 / (steps.length + 1)}%`;
  }, [steps.length]);

  const inputStyle = useMemo(() => {
    return {
      transform: inputTransform,
      width: inputWidth,
    };
  }, [inputTransform, inputWidth]);

  return (
    <div className=" space-y-2">
      <div className="text-sm font-semibold text-primary opacity-80">
        {label || "Sévérité de la douleur"}
        {required && <span className="text-error ml-1">*</span>}
      </div>
      <div className="w-full max-w-md">
        <input
          type="range"
          name={name}
          min={0}
          max={100}
          value={value}
          onChange={(e) => {
            handleChange(e);
          }}
          className="range range-primary range-sm"
          style={inputStyle}
          step={stepSize}
          required={required}
        />
        <div className="flex justify-between text-xs opacity-70 mt-3 px-0.5">
          {steps.map((step, index) => (
            <div
              key={step + index}
              className="flex flex-col items-center flex-1"
            >
              <span className="text-xs">|</span>
              <span className="text-xs mt-1 text-center">{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Range;
