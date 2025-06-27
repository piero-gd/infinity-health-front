import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { CiWallet } from "react-icons/ci";
import { AiOutlineLike } from "react-icons/ai";
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
        <FaShoppingCart className="text-xl md:text-base xl:text-2xl" />
      )
    },
    {
      id: 2,
      title: 'Checkout',
      icon: (
        <CiWallet className="text-xl md:text-base xl:text-2xl" />
      )
    },
    {
      id: 3,
      title: 'Pedido\ncompletado',
      icon: (
        <AiOutlineLike className="text-xl md:text-base xl:text-2xl" />
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
    const baseClasses = 'w-12 h-12 xl:w-16 xl:h-16 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 shadow-lg md:shadow-none';
    
    switch (status) {
      case 'completed':
        return `${baseClasses} bg-[var(--color-primary)] border-[var(--color-primary)] text-white`;
      case 'current':
        return `${baseClasses} bg-white border-[var(--color-primary)] text-[var(--color-primary)]`;
      case 'pending':
        return `${baseClasses} bg-white border-gray-200 text-gray-400`;
      default:
        return baseClasses;
    }
  };

  const getConnectorClasses = (stepId: number) => {
    const isCompleted = stepId < currentStep;
    return `w-8 h-0.5 mx-0 xl:w-12 xl:h-0.5 transition-all duration-300 ${
      isCompleted ? 'bg-var(--color-primary)' : 'bg-gray-200'
    }`;
  };

  const getTitleClasses = (stepId: number) => {
    const status = getStepStatus(stepId);
    const baseClasses = 'text-xs xl:text-lg mt-1 md:mt-1 transition-all duration-300 text-center w-20 xl:whitespace-nowrap';
    
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
    <>
      {/* Mobile Version - Centered */}
      <div className={`md:hidden w-full max-w-sm mx-auto px-20 ${className}`}>
        <div className="relative">
          {/* Progress Line Background */}
          <div className="absolute top-6 left-8 right-8 h-0.5 bg-gray-200"></div>
          
          {/* Steps Container */}
          <div className="flex justify-between items-start relative px-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center relative z-10">
                {/* Step Circle */}
                <div className={getStepClasses(step.id)}>
                  {step.icon}
                </div>
                
                {/* Step Title */}
                <span className= {getTitleClasses(step.id) } hidden style={{whiteSpace: 'pre-line'}}>
                  {step.title}
                </span>
                
                {/* Progress Line for Completed Steps */}
                {getStepStatus(step.id) === 'completed' && index < steps.length - 1 && (
                  <div className="absolute top-6 left-6 w-full h-0.5 bg-[var(--color-primary)] z-0" 
                       style={{width: 'calc(100vw / 3)'}}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Version - Left Aligned */}
      <div className={`hidden md:block w-fit ${className}`}>
        <div className="relative items-left">
          <div className="flex">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={getStepClasses(step.id)}>
                    {step.icon}
                  </div>
                  <span className={getTitleClasses(step.id)}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={getConnectorClasses(step.id + 1)} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgressCart;