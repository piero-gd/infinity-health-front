import React from "react";
import type { ProductAd } from "../data/exerciseProducts";

interface Props {
  product: ProductAd;
}

const ProductAdBox: React.FC<Props> = ({ product }) => (
  <aside
    className="
      bg-gradient-to-b from-[#232323] to-[#1798e0]
      rounded-l-3xl shadow-xl pt-8 pb-6 px-6 w-64 flex flex-col items-center
      text-white z-30 relative
    "
    style={{ minHeight: 220 }}
  >
    <div className="h-2 mb-2 flex justify-center">
      <img
        src={product.image}
        alt={product.id}
        className="object-contain w-full h-full drop-shadow-lg absolute -top-10 left-1/2 -translate-x-1/2"
        style={{ maxHeight: 90 }}
      />
    </div>
    <div className="text-base font-semibold text-center mb-4 mt-8">{product.description}</div>
    <a
      href={product.buttonUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-auto bg-white text-[var(--color-primary)] font-semibold rounded-full px-6 py-2 flex items-center gap-2 shadow hover:bg-blue-50 transition"
    >
      {product.buttonLabel}
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    </a>
  </aside>
);

export default ProductAdBox;