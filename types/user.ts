export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface UserContextType extends UserState {
  login: (user: User) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}
