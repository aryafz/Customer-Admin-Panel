import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Container, TextField, Button, Alert } from '@mui/material';
import api from '../../data/httpClient';
import { useCurrentSite } from '../../auth/CurrentSiteContext';

interface SiteForm {
  name: string;
  slug: string;
}

const SitePage: React.FC = () => {
  const { siteId } = useCurrentSite();
  const { register, handleSubmit, reset } = useForm<SiteForm>();

  useEffect(() => {
    if (!siteId) return;
    api.get(`/sites/${siteId}`).then((res) => reset(res.data));
  }, [siteId, reset]);

  if (!siteId) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="info">Please select a site first.</Alert>
      </Container>
    );
  }

  const onSubmit = async (data: SiteForm) => {
    await api.put(`/sites/${siteId}`, data);
    alert('Saved');
  };

  return (
    <Container sx={{ mt: 4 }} maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField label="Name" fullWidth margin="normal" {...register('name', { required: true })} />
        <TextField label="Slug" fullWidth margin="normal" {...register('slug', { required: true, pattern: /^[a-z0-9-]+$/ })} />
        <Button variant="contained" type="submit">
          Save
        </Button>
      </form>
    </Container>
  );
};

export default SitePage;
