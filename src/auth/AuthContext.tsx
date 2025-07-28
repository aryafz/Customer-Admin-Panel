import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: string;
  email: string;
  role: string;
}

interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const tokenKey = import.meta.env.VITE_AUTH_STORAGE_KEY || 'saas_customer_token';
const apiUrl = import.meta.env.VITE_API_URL;
const tokenResponseKey = import.meta.env.VITE_TOKEN_KEY || 'access_token';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem(tokenKey);
    if (token) {
      axios
        .get(`${apiUrl}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch(() => {
          localStorage.removeItem(tokenKey);
        });
    }
  }, []);

  const login = async (email: string, password: string) => {
    const { data } = await axios.post(`${apiUrl}/auth/login`, { email, password });
    const token = data[tokenResponseKey];
    localStorage.setItem(tokenKey, token);
    const me = await axios.get(`${apiUrl}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(me.data);
  };

  const logout = () => {
    localStorage.removeItem(tokenKey);
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
