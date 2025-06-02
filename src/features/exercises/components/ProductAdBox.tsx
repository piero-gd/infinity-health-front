import React from "react";
import type { ProductAd } from "../data/exerciseProducts";

interface Props {
  product: ProductAd;
}

const ProductAdBox: React.FC<Props> = ({ product }) => (
  <aside
    className="
      bg-gradient-to-b from-[#232323] to-[#1798e0]
      rounded-l-[48px] shadow-xl pt-12 pb-6 pl-6 pr-2 w-50 flex flex-col items-start
      text-white z-30 relative
    "
    style={{ minHeight: 200 }}
  >
    <div className="h-2 mb-2 flex justify-center">
      <img
        src={product.image}
        alt={product.id}
        className="object-contain w-full h-full drop-shadow-lg absolute -top-14 left-1/2 -translate-x-1/2"
        style={{ maxHeight: 120 }}
      />
    </div>
    <h2 className="text-sm font-semibold text-left mb-4">{product.introText}</h2>
    <div className="text-sm font-normal text-left mb-4">{product.name}</div>
    <a
      href={product.buttonUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-auto bg-white text-[var(--color-primary)] font-semibold rounded-full px-4 py-1.5 flex items-center gap-2 shadow hover:bg-blue-50 transition text-sm"
    >
      {product.buttonLabel}
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    </a>
  </aside>
);

export default ProductAdBox;