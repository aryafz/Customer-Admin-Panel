import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import SiteSelector from './SiteSelector';
import { setTenantId } from '../data/httpClient';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const handleSiteChange = (id: string) => {
    setTenantId(id);
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Customer Panel
          </Typography>
          <SiteSelector onChange={handleSiteChange} />
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 2 }}>{children}</Box>
    </Box>
  );
};

export default Layout;
