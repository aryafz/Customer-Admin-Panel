import React from 'react';
import { Typography, Container, Alert } from '@mui/material';
import { useCurrentSite } from '../auth/CurrentSiteContext';

const Dashboard: React.FC = () => {
  const { siteId } = useCurrentSite();

  if (!siteId) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="info">Please select a site first.</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4 }}>
        Dashboard
      </Typography>
      <Typography>Welcome to the Customer Admin Panel.</Typography>
    </Container>
  );
};

export default Dashboard;
