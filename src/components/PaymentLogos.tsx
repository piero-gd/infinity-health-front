interface PaymentLogo {
    src: string;
}

interface PaymentLogosProps {
    logos?: PaymentLogo[];
}

const defaultPaymentLogos: PaymentLogo[] = [
    { src: "/img/icons/CAPIN.svg" },
    { src: "/img/icons/WHATSPA.svg" },
    { src: "/img/icons/visa-logo.svg" },
    { src: "/img/icons/Mastercard.svg" },
    { src: "/img/icons/american-eex.svg" },
    { src: "/img/icons/DinersClub.svg" },
];

export default function PaymentLogos({ logos }: PaymentLogosProps) {
    const paymentLogos = logos ?? defaultPaymentLogos;

    return (
        <div className="w-full">
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {paymentLogos.map((logo, index) => (
                    <div key={logo.src + index} className="flex items-center justify-center p-2 border border-gray-300 rounded-lg bg-white">
                        <img 
                            src={logo.src} 
                            className="w-full h-6 object-contain md:h-8" 
                            alt={`Payment method ${index + 1}`} 
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}