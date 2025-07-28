import React from 'react';
import { Typography, Container } from '@mui/material';

const Dashboard: React.FC = () => {
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
