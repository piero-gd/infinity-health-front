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
        <FaShoppingCart />
      )
    },
    {
      id: 2,
      title: 'Checkout',
      icon: (
        <CiWallet />
      )
    },
    {
      id: 3,
      title: 'Pedido completado',
      icon: (
        <AiOutlineLike />
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
    const baseClasses = 'w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 text-xs';
    
    switch (status) {
      case 'completed':
        return `${baseClasses} bg-blue-500 border-blue-500 text-white`;
      case 'current':
        return `${baseClasses} bg-white border-blue-500 text-blue-500`;
      case 'pending':
        return `${baseClasses} bg-white border-gray-200 text-gray-400`;
      default:
        return baseClasses;
    }
  };

  const getConnectorClasses = (stepId: number) => {
    const isCompleted = stepId < currentStep;
    return `w-6 h-0.5 mx-0 transition-all duration-300 ${
      isCompleted ? 'bg-blue-500' : 'bg-gray-200'
    }`;
  };

  const getTitleClasses = (stepId: number) => {
    const status = getStepStatus(stepId);
    const baseClasses = 'text-xs mt-1 transition-all duration-300 text-center w-20';
    
    switch (status) {
      case 'completed':
      case 'current':
        return `${baseClasses} text-blue-600 font-medium`;
      case 'pending':
        return `${baseClasses} text-gray-400`;
      default:
        return baseClasses;
    }
  };

  return (
    <div className={`w-fit ${className}`}>
      <div className="relative items-left">
        <div className="flex ">
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
  );
};

export default ProgressCart;