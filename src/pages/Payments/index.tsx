import React, { useEffect, useState } from 'react';
import { Container, Table, TableHead, TableRow, TableCell, TableBody, Alert } from '@mui/material';
import api from '../../data/httpClient';
import { useCurrentSite } from '../../auth/CurrentSiteContext';

interface Payment {
  id: string;
  amountCents: number;
  currency: string;
  status: string;
  invoiceNo?: string;
  createdAt: string;
}

const PaymentsPage: React.FC = () => {
  const { siteId } = useCurrentSite();
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    if (!siteId) return;
    api.get('/payments').then((res) => setPayments(res.data?.data ?? res.data ?? []));
  }, [siteId]);

  if (!siteId) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="info">Please select a site first.</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Invoice</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payments.map((p) => (
            <TableRow key={p.id}>
              <TableCell>
                {p.amountCents} {p.currency}
              </TableCell>
              <TableCell>{p.status}</TableCell>
              <TableCell>{p.invoiceNo}</TableCell>
              <TableCell>{new Date(p.createdAt).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default PaymentsPage;
