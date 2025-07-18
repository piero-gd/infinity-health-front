import { FaCheck } from "react-icons/fa6";

export default function NavBarAd() {
    return (
        <div className="w-full bg-[var(--color-primary)] text-white text-center py-3 px-4 z-50">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm font-medium">
          <FaCheck className="inline" /> <b>Envíos gratis </b>a partir de $100.00
          </p>
        </div>
      </div>
    );
}