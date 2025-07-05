import { TbBolt } from "react-icons/tb";
import { MdOutlineWaterDrop } from "react-icons/md";
import { BiLeaf } from "react-icons/bi";
import { BsStars } from "react-icons/bs";
import { FaFire } from "react-icons/fa";
import { PiBaseballCapLight, PiSquaresFour } from "react-icons/pi";
import React from 'react';

const categoryStyles = [
  { 
    id: 'all', 
    categoria: 'Todos', 
    icon: <PiSquaresFour className="inline-block mr-1" />, 
    className: 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] ' 
  },
  { 
    id: 'energy', 
    categoria: 'Energía', 
    icon: <TbBolt className="inline-block mr-1" />, 
    className: 'bg-blue-100 text-blue-800 border-blue-200 ' 
  },
  { 
    id: 'detox', 
    categoria: 'Detox', 
    icon: <MdOutlineWaterDrop className="inline-block mr-1" />, 
    className: 'bg-green-100 text-green-700 border-green-200 ' 
  },
  { 
    id: 'relax', 
    categoria: 'Relax', 
    icon: <BiLeaf className="inline-block mr-1" />, 
    className: 'bg-purple-100 text-purple-700 border-purple-200 ' 
  },
  { 
    id: 'glow', 
    categoria: 'Glow', 
    icon: <BsStars className="inline-block mr-1" />, 
    className: 'bg-yellow-100 text-yellow-700 border-yellow-200 ' 
  },
  { 
    id: 'power', 
    categoria: 'Power', 
    icon: <FaFire className="inline-block mr-1" />, 
    className: 'bg-orange-100 text-orange-700 border-orange-200 ' 
  },
  { 
    id: 'merch', 
    categoria: 'Merch', 
    icon: <PiBaseballCapLight className="inline-block mr-1" />, 
    className: 'bg-gray-100 text-gray-700 border-gray-200 ' 
  },
];

interface CategoriesTagProps {
  categoryName: string;
  className?: string;
}

export const CategoriesTag: React.FC<CategoriesTagProps> = ({ categoryName, className = '' }) => {
  // Buscar la categoría por nombre 
  const category = categoryStyles.find(
    cat => cat.categoria.toLowerCase() === categoryName.toLowerCase()
  ) || categoryStyles[0]; // Si no encuentra la categoría, usa 'Todos' por defecto

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border-2 ${category.className} ${className}`}>
      {category.icon}
      {category.categoria}
    </span>
  );
};

export default CategoriesTag;