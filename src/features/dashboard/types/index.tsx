export interface UserData {
    name: string;
    email: string;
    memberSince: string;
    avatar: string;
  }
  
  export interface UserStats {
    balance: number;
    commissions: number;
    activeRoutines: number;
    completedWorkouts: number;
  }
  
  export interface Service {
    id: number;
    title: string;
    description: string;
    icon: React.ElementType;
    textColor: string;
    bgColor: string;
    color: string;
    link: string;
  }