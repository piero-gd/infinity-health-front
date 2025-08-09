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
    <div className={`relative w-full mb-8 overflow-hidden ${className}`}>
      <div 
        className="flex overflow-x-auto xl:justify-center xl:items-center pb-3 -mx-4 px-4 gap-2 sm:gap-4 md:gap-8 lg:gap-12 no-scrollbar"
        style={{
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`
              flex-shrink-0 flex items-center gap-3 px-3 py-2 rounded-full border text-base font-medium transition whitespace-nowrap
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
            <span className="inline text-base">{opt.icon}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;