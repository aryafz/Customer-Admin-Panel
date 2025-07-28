import React, { createContext, useContext, useState, useEffect } from 'react';
import { setTenantId } from '../data/httpClient';

interface CurrentSiteContextProps {
  siteId: string | null;
  setSiteId: (id: string) => void;
}

const CurrentSiteContext = createContext<CurrentSiteContextProps | undefined>(undefined);

const STORAGE_KEY = 'saas_current_site';

export const CurrentSiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteId, setSiteIdState] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setSiteIdState(saved);
      setTenantId(saved);
    }
  }, []);

  const setSiteId = (id: string) => {
    setSiteIdState(id);
    localStorage.setItem(STORAGE_KEY, id);
    setTenantId(id);
  };

  return (
    <CurrentSiteContext.Provider value={{ siteId, setSiteId }}>
      {children}
    </CurrentSiteContext.Provider>
  );
};

export const useCurrentSite = () => {
  const ctx = useContext(CurrentSiteContext);
  if (!ctx) throw new Error('useCurrentSite must be used within CurrentSiteProvider');
  return ctx;
};
