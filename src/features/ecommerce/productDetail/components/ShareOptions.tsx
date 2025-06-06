import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaPinterestP } from "react-icons/fa6"
import { FaApplePay } from "react-icons/fa6";
import { FaGooglePay } from "react-icons/fa";
import { SiPaytm } from "react-icons/si";

export const ShareOptions: React.FC = () => {

    const shareOptions = [
        { icon: FaFacebookF, label: 'Facebook', color: 'text-blue-600' },
        { icon: FaTwitter, label: 'Twitter', color: 'text-blue-400' },
        { icon: FaPinterestP, label: 'Pinterest', color: 'text-gray-600' }
      ];
    
    const payIcons = [
        { icon: FaApplePay, label: 'Apple Pay', color: 'text-blue-600' },
        { icon: FaGooglePay, label: 'Google Pay', color: 'text-blue-400' },
        { icon: SiPaytm, label: 'Paytm', color: 'text-gray-600' }
      ];
    
    return (
        <div>
            <div className="flex items-center gap-4 pt-2">
      <span className="text-sm font-medium text-gray-700">Compartir</span>
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
      <div>
        <div className="flex gap-2">
        {payIcons.map(({ icon: Icon, label, color }) => (
            <button
            key={label}
            className={`p-2 rounded-md hover:bg-gray-100 transition-colors ${color}`}
            aria-label={`Pagar con ${label}`}
            >
            <Icon size={20} />
            </button>
        ))}
        </div>
        </div>
        </div>
    );
};