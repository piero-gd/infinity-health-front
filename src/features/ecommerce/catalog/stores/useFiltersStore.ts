import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { Category } from '../index';

interface FiltersState {
  // Filtros actuales
  selectedCategory: string;
  selectedSort: string;
  minPrice: number;
  maxPrice: number;
  selectedProduct: string;
  selectedMerchandising: string;
  selectedObjective: string;
  selectedFormat: string;
  searchQuery: string;

  // Acciones para actualizar filtros
  setCategory: (category: string) => void;
  setSort: (sort: string) => void;
  setPriceRange: (min: number, max: number) => void;
  setProduct: (product: string) => void;
  setMerchandising: (merch: string) => void;
  setObjective: (objective: string) => void;
  setFormat: (format: string) => void;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
}

// Valores iniciales
const initialState = {
  selectedCategory: 'all',
  selectedSort: '',
  minPrice: 0,
  maxPrice: 1000,
  selectedProduct: '',
  selectedMerchandising: '',
  selectedObjective: '',
  selectedFormat: '',
  searchQuery: '',
};

// Crear store con persistencia
export const useFiltersStore = create<FiltersState>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        setCategory: (category) => set({ selectedCategory: category }),
        setSort: (sort) => set({ selectedSort: sort }),
        setPriceRange: (min, max) => set({ minPrice: min, maxPrice: max }),
        setProduct: (product) => set({ selectedProduct: product }),
        setMerchandising: (merch) => set({ selectedMerchandising: merch }),
        setObjective: (objective) => set({ selectedObjective: objective }),
        setFormat: (format) => set({ selectedFormat: format }),
        setSearchQuery: (query) => set({ searchQuery: query }),
        
        resetFilters: () => set(initialState),
      }),
      { name: 'filters-storage' } // Nombre para localStorage
    )
  )
);