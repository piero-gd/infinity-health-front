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
        <div>
            <div className="flex flex-wrap justify-start gap-2">
                {paymentLogos.map((logo, index) => (
                    <div key={logo.src + index} className="w-12 h-8 p-1.5 border border-gray-300 rounded-lg bg-white flex-shrink-0">
                        <img 
                            src={logo.src} 
                            className="w-full h-full object-contain" 
                            alt={`Payment method ${index + 1}`} 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}