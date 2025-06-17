import UserHeader from '../components/UserHeader';
import StatsCards from '../components/StatsCards';
import ClickeableServices from '../components/ClickeableServices';
import TemporalProductCard from '../components/TemporalProductCard';
import NutritionalPlan from '../components/NutritionalPlan';
import { mockUserData, mockUserStats } from '../data/mockDataUser';
import ClientProgress from '../components/ClientProgress';

interface DashboardPageProps {
    userData:   typeof mockUserData;
    userStats: typeof mockUserStats;
}

export default function DashboardPage({ 
  userData = mockUserData, 
  userStats = mockUserStats 
}: DashboardPageProps) {

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* SECCIÓN PRINCIPAL */}
        <div className="mb-4 bg-exercises-wallpaper-long rounded-2xl shadow-sm border border-gray-100 p-15 ">
          <UserHeader userData={userData} />
          <StatsCards userStats={userStats} />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* SECCIÓN PRODUCTOS - 4/6 del ancho */}
          <div className="w-full lg:w-2/3 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">  
            <TemporalProductCard />
          </div>

          {/* SECCIÓN PLAN NUTRICIONAL - 2/6 del ancho */}
          <div className="w-full lg:w-1/3 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">  
            <NutritionalPlan />
          </div>
        </div>

        {/* SECCIÓN SERVICIOS*/}
        <div className="flex flex-col lg:flex-row gap-6 mt-4">
          {/* SECCIÓN Clickeable - 60% del ancho */}
          <div className="w-full lg:w-[55%] mb-6">  
            <ClickeableServices />
          </div>
          {/* SECCIÓN Progreso - 40% del ancho */}
          <div className="w-full lg:w-[45%] mb-6">  
            <ClientProgress />
          </div>
        </div>
      </div>
    </div>
  );
}