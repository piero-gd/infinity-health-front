import {
  CurrencyDollarIcon,
  ChartBarIcon,
  HeartIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline';

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
      title: "Saldo Disponible",
      value: `$${userStats.balance.toLocaleString('es-PE', { minimumFractionDigits: 2 })}`,
      icon: CurrencyDollarIcon,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      trend: "+12.5% vs mes anterior",
      trendColor: "text-green-600"
    },
    {
      title: "Comisiones",
      value: `$${userStats.commissions.toLocaleString('es-PE', { minimumFractionDigits: 2 })}`,
      icon: ChartBarIcon,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      trend: "Este mes",
      trendColor: "text-blue-600"
    },
    {
      title: "Rutinas Activas",
      value: userStats.activeRoutines.toString(),
      icon: HeartIcon,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      trend: "En progreso",
      trendColor: "text-purple-600"
    },
    {
      title: "Entrenamientos",
      value: userStats.completedWorkouts.toString(),
      icon: TrophyIcon,
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      trend: "Completados",
      trendColor: "text-orange-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
              <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
            </div>
          </div>
          <div className={`mt-4 flex items-center text-sm ${stat.trendColor}`}>
            <span>{stat.trend}</span>
          </div>
        </div>
      ))}
    </div>
  );
}