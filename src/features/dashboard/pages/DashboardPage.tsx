import UserHeader from '../components/UserHeader';
import StatsCards from '../components/StatsCards';
import LinkeableServices from '../components/LinkeableServices';

const userData = {
  name: "Jemima Jange",
  email: "jemimajange@email.com",
  memberSince: "Enero 2024",
  avatar: "/img/mujer.png"
};

const userStats = {
  balance: 1250.00,
  commissions: 325.50,
  activeRoutines: 3,
  completedWorkouts: 47
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* SECCIÓN PRINCIPAL */}
        <div className="mb-4 bg-white rounded-2xl shadow-sm border border-gray-100 p-15">
          <UserHeader userData={userData} />
          <StatsCards userStats={userStats} />
        </div>

        {/* SECCIÓN SERVICIOS*/}
        <div className="mb-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-14">  
        <LinkeableServices />
        </div>
      </div>
    </div>
  );
}