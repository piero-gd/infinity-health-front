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
            <div className="grid grid-cols-6 lg:grid-cols-3 xl:grid-cols-6 md:grid-cols-6 gap-3 justify-center mx-auto">
                {paymentLogos.map((logo, index) => (
                    <div key={logo.src + index} className="w-14 h-10 p-2 border border-gray-300 lg:justify-between rounded-lg bg-white">
                        <img src={logo.src} className="w-full h-full p-0.6 md:scale-105" />
                    </div>
                ))}
            </div>
        </div>
    );
}