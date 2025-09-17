// frontend/src/hooks/useAuth.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginService, logout as logoutService, getToken } from '../services/auth';
import { UserCreate, Token } from '../types';

interface AuthContextType {
  user: string | null;
  token: string | null;
  login: (credentials: UserCreate) => Promise<Token>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = getToken();
    if (savedToken) {
      setToken(savedToken);
      setUser('test@test.com');  // Mock; real: api.get('/users/me').then(r => setUser(r.data.email))
    }
  }, []);

  const login = async (credentials: UserCreate): Promise<Token> => {
    const response = await loginService(credentials);
    setToken(response.access_token);
    setUser(credentials.email);
    navigate('/dashboard');
    return response;
  };

  const logout = () => {
    logoutService();
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!token
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export {};  // Module marker