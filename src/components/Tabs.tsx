import React from "react";

export interface TabOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  options: TabOption[];
  selectedValue: string;
  onChange: (value: string) => void;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({ options, selectedValue, onChange, className = "" }) => {
  return (
    <div className={`flex gap-4 justify-center mb-8 ${className}`}>
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`
            flex items-center gap-2 px-6 py-2 rounded-full border text-base font-semibold transition
            ${selectedValue === opt.value
              ? "text-white shadow"
              : "bg-white text-gray-500 border-gray-200 hover:bg-gray-100"}
          `}
          style={
            selectedValue === opt.value
              ? { background: "var(--gradient-primary)" }
              : undefined
          }
          type="button"
        >
          {opt.label}
          {opt.icon && <span className="text-lg">{opt.icon}</span>}
        </button>
      ))}
    </div>
  );
};

export default Tabs;