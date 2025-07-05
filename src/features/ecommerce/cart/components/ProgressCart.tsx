import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { CiWallet } from "react-icons/ci";
import { TbTruckDelivery } from "react-icons/tb";
import type { ProgressCartProps, Step } from '../types';

const ProgressCart: React.FC<ProgressCartProps> = ({ 
  currentStep, 
  className = '' 
}) => {
  const steps: Step[] = [
    {
      id: 1,
      title: 'Carrito',
      icon: (
        <FaShoppingCart className="text-xl md:text-base xl:text-lg" />
      )
    },
    {
      id: 2,
      title: 'Entrega',
      icon: (
        <TbTruckDelivery className="text-xl md:text-base xl:text-lg" />
      )
    },
    {
      id: 3,
      title: 'Pago',
      icon: (
        <CiWallet className="text-xl md:text-base xl:text-lg" />
      )
    }
  ];

  const getStepStatus = (stepId: number) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'pending';
  };

  const getStepClasses = (stepId: number) => {
    const status = getStepStatus(stepId);
    const baseClasses = 'w-12 h-12 xl:w-13 xl:h-13 md:w-10 md:h-10 rounded-full flex items-center justify-center border-4 transition-all duration-300 shadow-lg md:shadow-none';
    
    switch (status) {
      case 'completed':
        return `${baseClasses} bg-[var(--color-primary)] border-[var(--color-primary)] text-white`;
      case 'current':
        return `${baseClasses} bg-white border-[var(--color-primary)] text-black`;
      case 'pending':
        return `${baseClasses} bg-white border-gray-200 text-gray-400`;
      default:
        return baseClasses;
    }
  };

  const getTitleClasses = (stepId: number) => {
    const status = getStepStatus(stepId);
    const baseClasses = 'text-xs xl:text-sm mt-1 md:mt-1 transition-all duration-300 text-center w-20 xl:whitespace-nowrap';
    
    switch (status) {
      case 'completed':
      case 'current':
        return `${baseClasses} text-[var(--color-primary)] font-medium`;
      case 'pending':
        return `${baseClasses} text-gray-400`;
      default:
        return baseClasses;
    }
  };

  return (
    <div className={`w-full flex justify-center ${className}`}>
      {/* Mobile & Desktop Version - Centered */}
      <div className="w-full max-w-3xl xl:px-10 px-20">
        <div className="relative">
          {/* Progress Line Background - Dashed */}
          <div className="absolute top-6 left-12 right-12 h-0.5 border-t-2 border-dashed border-gray-300"></div>
          
          {/* Steps Container */}
          <div className="flex justify-between relative">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center relative z-10">
                {/* Step Circle */}
                <div className={getStepClasses(step.id)}>
                  {step.icon}
                </div>
                
                {/* Step Title */}
                <span className={getTitleClasses(step.id)}>
                  {step.title}
                </span>
                
                {/* Progress Line for Completed Steps */}
                {getStepStatus(step.id) === 'completed' && index < steps.length - 1 && (
                  <div className="absolute top-6 left-12 right-0 h-0.5 bg-[var(--color-primary)] z-0"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressCart;