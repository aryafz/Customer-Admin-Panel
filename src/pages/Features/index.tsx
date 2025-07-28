import React, { useEffect, useState } from 'react';
import { Container, Table, TableHead, TableRow, TableCell, TableBody, Button, Alert } from '@mui/material';
import api from '../../data/httpClient';
import { useCurrentSite } from '../../auth/CurrentSiteContext';

interface Feature {
  id: string;
  code: string;
  name: string;
  description?: string;
  isActive: boolean;
}

interface SiteFeature {
  id: string;
  featureId: string;
  isActive: boolean;
}

const FeaturesPage: React.FC = () => {
  const { siteId } = useCurrentSite();
  const [features, setFeatures] = useState<Feature[]>([]);
  const [siteFeatures, setSiteFeatures] = useState<SiteFeature[]>([]);

  useEffect(() => {
    api.get('/features').then((res) => setFeatures(res.data?.data ?? res.data ?? []));
  }, []);

  useEffect(() => {
    if (!siteId) return;
    api.get('/site-features').then((res) => setSiteFeatures(res.data?.data ?? res.data ?? []));
  }, [siteId]);

  if (!siteId) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="info">Please select a site first.</Alert>
      </Container>
    );
  }

  const addFeature = async (featureId: string) => {
    await api.post('/site-features', { featureId, isActive: true });
    const { data } = await api.get('/site-features');
    setSiteFeatures(data?.data ?? data ?? []);
  };

  const removeFeature = async (id: string) => {
    await api.delete(`/site-features/${id}`);
    const { data } = await api.get('/site-features');
    setSiteFeatures(data?.data ?? data ?? []);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Code</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Status</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {features.map((f) => {
            const sf = siteFeatures.find((s) => s.featureId === f.id);
            return (
              <TableRow key={f.id}>
                <TableCell>{f.code}</TableCell>
                <TableCell>{f.name}</TableCell>
                <TableCell>{f.description}</TableCell>
                <TableCell>{sf ? (sf.isActive ? 'Active' : 'Inactive') : 'N/A'}</TableCell>
                <TableCell>
                  {sf ? (
                    <Button size="small" onClick={() => removeFeature(sf.id)}>Remove</Button>
                  ) : (
                    <Button size="small" onClick={() => addFeature(f.id)}>Add</Button>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Container>
  );
};

export default FeaturesPage;
