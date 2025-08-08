import UserHeader from '../components/UserHeader';
import StatsCards from '../components/StatsCards';
import ClickeableServices from '../components/ClickeableServices';
import NutritionalPlan from '../components/NutritionalPlan';
import { mockUserData, mockUserStats } from '../data/mockDataUser';
import ClientProgress from '../components/ClientProgress';
import SliderProductDashboard from '../components/SliderProductDashboard';

export default function DashboardPage() {

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* SECCIÓN PRINCIPAL */}
        <div className="mb-4 bg-exercises-wallpaper-long rounded-2xl shadow-sm border border-gray-100 p-15 ">
          <UserHeader userData={mockUserData} />
          <StatsCards userStats={mockUserStats} />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* SECCIÓN PRODUCTOS - 4/6 del ancho */}
          <div className="w-full lg:w-2/3 bg-white rounded-2xl shadow-sm border border-gray-100 px-5 pt-3 pb-5">  
            <SliderProductDashboard />
          </div>

          {/* SECCIÓN PLAN NUTRICIONAL - 2/6 del ancho */}
          <div className="w-full lg:w-1/3 bg-white rounded-2xl shadow-sm border border-gray-100 pt-3 p-4">  
            <NutritionalPlan />
          </div>
        </div>

        {/* SECCIÓN SERVICIOS*/}
        <div className="flex flex-col lg:flex-row gap-6 mt-4">
          {/* SECCIÓN Clickeable - 60% del ancho */}
          <div className="w-full lg:w-[57%] xl:w-[54%]">  
            <ClickeableServices />
          </div>
          {/* SECCIÓN Progreso - 40% del ancho */}
          <div className="w-full lg:w-[43%] xl:w-[46%] mb-3">  
            <ClientProgress />
          </div>
        </div>
      </div>
    </div>
  );
}