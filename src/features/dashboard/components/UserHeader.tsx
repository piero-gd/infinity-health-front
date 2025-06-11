
import { CalendarDaysIcon } from '@heroicons/react/24/outline';

interface UserData {
  name: string;
  email: string;
  memberSince: string;
  avatar: string;
}

interface UserHeaderProps {
  userData: UserData;
}

export default function UserHeader({ userData }: UserHeaderProps) {
  return (
    <div className="pt-4 px-6 -mt-6 mb-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center space-x-4">
          {/* Avatar con borde gradiente */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-t from-[var(--color-btn-gradient-top)] to-[var(--color-btn-gradient-bottom)] p-0.5">
            <div className="w-full h-full rounded-full overflow-hidden">
              <img
                src={userData.avatar}
                alt="Avatar del usuario"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              ¡Bienvenido, {userData.name}!
            </h1>
            <p className="text-gray-600">
              Miembro desde {userData.memberSince}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <CalendarDaysIcon className="h-4 w-4" />
          <span>{new Date().toLocaleDateString('es-ES', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
      </div>
    </div>
  );
}