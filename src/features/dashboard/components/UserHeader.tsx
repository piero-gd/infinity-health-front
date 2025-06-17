import { FiLink2 } from "react-icons/fi";

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
    <div className="pt-4 px-2 -mt-6 mb-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center space-x-2">
          
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Hola, {userData.name} 👋🏼
            </h1>
            <p className="text-gray-600">
              Hoy es un gran día para mejorar tu salud
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <button className="bg-gradient-to-t from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)] hover:from-[var(--color-btn-gradient-bottom)] hover:to-[var(--color-btn-gradient-top)] text-white py-2 px-5 rounded-full shadow-lg text-sm font-medium transition-all flex justify-right gap-2">
          Tu link de referido
          <FiLink2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}