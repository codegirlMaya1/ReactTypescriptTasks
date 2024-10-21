import React, { createContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
  user: string | null;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  const validatePassword = (password: string): boolean => {
    const regex = /^[a-zA-Z0-9]{4,}$/;
    return regex.test(password);
  };

  const login = (username: string, password: string) => {
    if (validatePassword(password)) {
      setIsAuthenticated(true);
      setUser(username);
    } else {
      alert('Password must be greater than 3 alphanumeric characters.');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};
