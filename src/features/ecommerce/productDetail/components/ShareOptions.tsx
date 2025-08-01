import { FaFacebookF } from 'react-icons/fa';
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineInstagram } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa6";
import PaymentLogos from '../../../../components/PaymentLogos';

interface ShareOptionsProps {
    slug: string;
}

export const ShareOptions: React.FC<ShareOptionsProps> = ({ slug }) => {
  
  const getShareUrl = (platform: string) => {
    const productUrl = `${window.location.origin}/product/${slug}`;
    const shareText = `¡Mira este producto en Infinity Health!`;
    
    switch(platform) {
      case 'facebook':
        return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`;
      case 'instagram':
        return `https://www.instagram.com/?url=${encodeURIComponent(productUrl)}`;
      case 'whatsapp':
        return `https://wa.me/?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(productUrl)}`;
      default:
        return productUrl;
    }
  };

  const shareOptions = [
    { 
      icon: FaFacebookF, 
      label: 'Facebook', 
      color: 'text-gray-500',
      onClick: () => {
        const url = getShareUrl('facebook');
        window.open(url, '_blank', 'width=600,height=400');
      }
    },
    { 
      icon: AiOutlineInstagram, 
      label: 'Instagram', 
      color: 'text-gray-500',
      onClick: () => {
        const url = getShareUrl('twitter');
        window.open(url, '_blank', 'width=600,height=400');
      }
    },
    { 
      icon: FaWhatsapp, 
      label: 'Whatsapp', 
      color: 'text-gray-500',
      onClick: () => {
        const url = getShareUrl('pinterest');
        window.open(url, '_blank', 'width=750,height=600');
      }
    }
  ];
  
  return (
    <div className="xl:px-5 px-0 md:px-6">

     {/*MÉTODOS DE PAGOS*/}
     <div className=" py-3  justify-between pt-4 pb-4 p-4 bg-white rounded-lg">
      <h4 className="font-medium text-gray-900 flex items-center gap-2 pb-4"> <RiLockPasswordLine className=" text-[var(--color-primary)]" size={20}/> Pagos seguros con:</h4>
        <div className="w-full">
           <PaymentLogos />
        </div>
      </div>

      
      <div className="flex items-center gap-4 p-4 pt-5">
        <h4 className="text-sm font-medium text-gray-900">Compartir</h4>
        <div className="flex gap-1">
          {shareOptions.map(({ icon: Icon, label, color }) => (
            <button
              key={label}
              className={`p-1 transition-colors ${color}`}
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