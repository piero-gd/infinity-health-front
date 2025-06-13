

import { TrendingUp, Package } from 'lucide-react';
import { ImStatsDots } from "react-icons/im";
import { TfiStatsUp } from "react-icons/tfi";
import { MdPeopleAlt } from "react-icons/md";




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
      icon: ImStatsDots,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      trend: "+12.5%",
      trendColor: "text-blue-600"
    },
    {
      title: "Total de Compras",
      value: `S/ ${userStats.commissions.toLocaleString('es-PE')}`,
      icon: Package,
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
      trend: "+12.5%",
      trendColor: "text-yellow-600"
    },
    {
      title: "Comisiones por Red",
      value: `S/ ${userStats.activeRoutines.toLocaleString('es-PE')}`,
      icon: TfiStatsUp,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      trend: "+12.5%",
      trendColor: "text-green-600"
    },
    {
      title: "Bonos Red",
      value: `S/ ${userStats.completedWorkouts.toLocaleString('es-PE')}`,
      icon: MdPeopleAlt,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      trend: "+12.5%",
      trendColor: "text-purple-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
  );
}