import { useState } from 'react';
import type { 
  UseAmbassadorValidationProps, 
  UseAmbassadorValidationReturn 
} from '../types';

export const useAmbassadorValidation = ({
  onApplyPromoCode,
}: UseAmbassadorValidationProps): UseAmbassadorValidationReturn => {
  const [promoCode, setPromoCode] = useState('');
  const [isAmbassador, setIsAmbassador] = useState(false);
  const [validationMessage, setValidationMessage] = useState<{ text: string; type: 'success' | 'error' | null }>({ text: '', type: null });

  const handlePromoCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();

    //API
    


    if (code === 'EMBAJADOR') {
      setIsAmbassador(true);
      setValidationMessage({
        text: '¡Código de Embajador aplicado!\nPrecios especiales activados.',
        type: 'success'
      });
    } else {
      setIsAmbassador(false);
      if (code) {
        setValidationMessage({
          text: 'Código no válido. Intenta con otro código.',
          type: 'error'
        });
        onApplyPromoCode(code);
      } else {
        setValidationMessage({ text: '', type: null });
      }
    }
  };

  return {
    isAmbassador,
    promoCode,
    setPromoCode,
    handlePromoCodeSubmit,
    validationMessage,
  };
};
