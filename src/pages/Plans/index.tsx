import React, { useEffect, useState } from 'react';
import { Container, Table, TableHead, TableRow, TableCell, TableBody, Button, Alert } from '@mui/material';
import api from '../../data/httpClient';
import { useCurrentSite } from '../../auth/CurrentSiteContext';

interface Plan {
  id: string;
  code: string;
  name: string;
  priceCents: number;
  currency: string;
  isActive: boolean;
}

const PlansPage: React.FC = () => {
  const { siteId } = useCurrentSite();
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    api.get('/plans').then((res) => setPlans(res.data?.data ?? res.data ?? []));
  }, []);

  if (!siteId) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="info">Please select a site first.</Alert>
      </Container>
    );
  }

  const upgrade = async (planId: string) => {
    await api.post('/site-plans', { planId, isActive: true });
    alert('Plan updated');
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Code</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Active</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {plans.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.code}</TableCell>
              <TableCell>{p.name}</TableCell>
              <TableCell>
                {p.priceCents} {p.currency}
              </TableCell>
              <TableCell>{p.isActive ? 'Yes' : 'No'}</TableCell>
              <TableCell>
                <Button size="small" variant="contained" onClick={() => upgrade(p.id)}>
                  Select
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default PlansPage;
