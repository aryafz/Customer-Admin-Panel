import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import SiteSelector from './SiteSelector';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Customer Panel
          </Typography>
          <SiteSelector />
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 2 }}>{children}</Box>
    </Box>
  );
};

export default Layout;
