import React, { createContext, useContext, useState } from 'react';

interface CurrentSiteContextProps {
  siteId: string | null;
  setSiteId: (id: string) => void;
}

const CurrentSiteContext = createContext<CurrentSiteContextProps | undefined>(undefined);

export const CurrentSiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteId, setSiteId] = useState<string | null>(null);

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
