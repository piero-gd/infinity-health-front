import { FaFacebookF, FaTwitter, FaPinterestP, FaApplePay, FaGooglePay, FaCcVisa, FaCcMastercard, FaCcAmex } from 'react-icons/fa';
import { SiPaytm } from 'react-icons/si';
import { RiLockPasswordLine } from "react-icons/ri";

interface ShareOptionsProps {
    productId: number | string;
}

export const ShareOptions: React.FC<ShareOptionsProps> = ({ productId }) => {
  
  const getShareUrl = (platform: string) => {
    const productUrl = `${window.location.origin}/product/${productId}`;
    const shareText = `¡Mira este producto en Infinity Health!`;
    
    switch(platform) {
      case 'facebook':
        return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`;
      case 'twitter':
        return `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(productUrl)}`;
      case 'pinterest':
        const mediaUrl = 'https://via.placeholder.com/800'; 
        return `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(productUrl)}&media=${encodeURIComponent(mediaUrl)}&description=${encodeURIComponent(shareText)}`;
      default:
        return productUrl;
    }
  };

  const shareOptions = [
    { 
      icon: FaFacebookF, 
      label: 'Facebook', 
      color: 'hover:bg-blue-100 text-blue-600',
      onClick: () => {
        const url = getShareUrl('facebook');
        window.open(url, '_blank', 'width=600,height=400');
      }
    },
    { 
      icon: FaTwitter, 
      label: 'Twitter', 
      color: 'hover:bg-blue-50 text-blue-400',
      onClick: () => {
        const url = getShareUrl('twitter');
        window.open(url, '_blank', 'width=600,height=400');
      }
    },
    { 
      icon: FaPinterestP, 
      label: 'Pinterest', 
      color: 'hover:bg-red-50 text-red-600',
      onClick: () => {
        const url = getShareUrl('pinterest');
        window.open(url, '_blank', 'width=750,height=600');
      }
    }
  ];
  
  const payIcons = [
    { icon: FaApplePay, label: 'Apple Pay', color: 'text-blue-600' },
    { icon: FaGooglePay, label: 'Google Pay', color: 'text-blue-400' },
    { icon: SiPaytm, label: 'Paytm', color: 'text-gray-600' },
    { icon: FaCcVisa, label: 'Visa', color: 'text-gray-600' },
    { icon: FaCcMastercard, label: 'Mastercard', color: 'text-gray-600' },
    { icon: FaCcAmex, label: 'Amex', color: 'text-gray-600' },
  ];
  
  return (
    <div className="xl:px-4 px-0 md:px-6">

     {/*MÉTODOS DE PAGOS*/}
     <div className=" py-3 justify-between pt-4  p-4 bg-white rounded-lg">
      <h4 className="font-medium text-gray-900 flex items-center gap-2 pb-4"> <RiLockPasswordLine className=" text-[var(--color-primary)]" size={20}/> Pagos seguros con:</h4>
        <div className="flex xl:gap-3 gap-1 grid grid-cols-6 xl:grid-cols-6 lg:grid-cols-6 md:grid-cols-6">
          {payIcons.map(({ icon: Icon, color }) => (
            <button
              className={`px-3 py-2 rounded-sm border-2 border-gray-300  bg-gray-50  hover:bg-gray-100 transition-colors ${color}`}
            >
                <Icon className="text-[var(--color-primary)] md:size-6 xl:size-10 size-7 mx-auto"/>
           
            </button>
          ))}
        </div>
      </div>

      
      <div className="flex items-center gap-4 p-4 pt-5">
        <h4 className="text-sm font-medium text-gray-900">Compartir</h4>
        <div className="flex gap-2">
          {shareOptions.map(({ icon: Icon, label, color }) => (
            <button
              key={label}
              className={`p-2 rounded-md hover:bg-gray-100 transition-colors ${color}`}
              aria-label={`Compartir en ${label}`}
            >
              <Icon size={20} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};