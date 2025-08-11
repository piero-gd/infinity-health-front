import { TrendingUp } from 'lucide-react';
import { FaSackDollar } from "react-icons/fa6";
import { TbBasketCheck } from "react-icons/tb";
import { HiChartBarSquare } from "react-icons/hi2";
import { MdOutlineVerified } from "react-icons/md";

interface UserStats {
  balance: number;
  commissions: number;
  activeRoutines: number;
  completedWorkouts: number;
}

interface StatsCardsProps {
  userStats: UserStats;
}

export default function StatsCards({ userStats }: StatsCardsProps) {
  const statsData = [
    {
      title: "Ganancias Ventas",
      value: `S/ ${userStats.balance.toLocaleString('es-PE')}`,
      icon: FaSackDollar,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      trend: "+12.5%",
      trendColor: "text-green-600"
    },
    {
      title: "Total de Compras",
      value: `S/ ${userStats.commissions.toLocaleString('es-PE')}`,
      icon: TbBasketCheck,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      trend: "+12.5%",
      trendColor: "text-green-600"
    },
    {
      title: "Comisiones por Red",
      value: `S/ ${userStats.activeRoutines.toLocaleString('es-PE')}`,
      icon: HiChartBarSquare,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      trend: "+12.5%",
      trendColor: "text-green-600"
    },
    {
      title: "Puntos",
      value: `+ ${userStats.completedWorkouts}`,
      icon: MdOutlineVerified,
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      trend: "+12.5%",
      trendColor: "text-green-600"
    }
  ];

  return (
    <>
      {/* Versión móvil con scroll horizontal */}
      <div className="md:hidden overflow-x-auto no-scrollbar pb-2">
        <div className="flex gap-4 w-max pl-6 pr-12">
          {statsData.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md md:shadow-xl border border-gray-100 p-4 w-64 md:w-72 flex-shrink-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-md font-semibold text-gray-600">{stat.title}</p>
                  <h2 className="text-xl font-bold text-black">{stat.value}</h2>
                </div>
                <div className={`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center`}>
                  <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
              </div>
              <div className={`mt-2 hidden md:block flex items-center text-sm ${stat.trendColor}`}>
                <TrendingUp className="mr-1 w-4 h-4" />
                <span>{stat.trend}</span> <span className="text-black font-medium ml-1">Este mes</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Versión desktop - grid normal */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-xl border border-gray-100 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-md font-semibold text-gray-600">{stat.title}</p>
                <h2 className="text-xl font-bold text-black">{stat.value}</h2>
              </div>
              <div className={`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center`}>
                <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
              </div>
            </div>
            <div className={`mt-2 flex items-center text-sm ${stat.trendColor}`}>
              <TrendingUp className="mr-1 w-4 h-4" />
              <span>{stat.trend}</span> <span className="text-black font-medium ml-1">Este mes</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}