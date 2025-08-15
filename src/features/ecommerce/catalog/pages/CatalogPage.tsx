import Header from '../components/Header';
import FilterTop from '../components/FilterTop';
import { FilterSidebar } from '../components/FilterSidebar';
import ProductList from '../components/ProductList';
import { useFiltersStore } from '../stores/useFiltersStore';

export default function CatalogPage() {
  useFiltersStore();

  // Limpiar filtros al desmontar o al iniciar (opcional)
  // useEffect(() => {
  //   return () => resetFilters();
  // }, [resetFilters]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="xl:block hidden w-full">
        <Header />
      </div>

      {/* Contenido principal */}
      <div className="px-2 mx-auto py-3">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar de categorías */}
          <aside className="xl:block hidden w-full xl:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-4">
              <FilterSidebar />
            </div>
          </aside>

          {/* Contenido principal */}
          <div className="w-full xl:w-3/4">
            {/* Filtro superior */}
            <div className="w-full">
              <FilterTop />
            </div>
            
            {/* Lista de productos */}
            <div className="mt-0">
              <ProductList />
            </div>
            
            {/* Botón de cargar más */}
            {/*<div className="mt-8 flex justify-center">
              <ButtonLoader />
            </div>*/}
          </div>
        </div>
      </div>
    </div>
  );
}