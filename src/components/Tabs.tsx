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
    <div className={`flex justify-center mb-8 ${className}`}>
      {/* Contenedor interno para centrado */}
      <div className="flex overflow-x-auto pb-3 gap-2 px-2 sm:gap-4 md:gap-8 lg:gap-12">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`
              flex items-center gap-2 px-2 py-1 rounded-full border text-xs font-medium transition
              sm:px-3 sm:py-2 sm:text-sm
              md:px-4 md:py-2 md:text-base
              lg:px-5 lg:py-2 lg:text-base
              ${selectedValue === opt.value
                ? "text-white shadow-md border-2 border-white bg-gradient-to-t from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)]"
                : "bg-white text-gray-500 border-gray-200 hover:bg-gray-100"}
            `}
            type="button"
          >
            {opt.label}
            {/* Mostrar iconos solo en pantallas medianas y grandes */}
            <span className="hidden md:inline lg:text-base">{opt.icon}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;