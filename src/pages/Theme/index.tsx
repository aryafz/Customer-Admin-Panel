import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, Alert } from '@mui/material';
import api from '../../data/httpClient';
import { useCurrentSite } from '../../auth/CurrentSiteContext';

interface Theme {
  id: string;
  code: string;
  name: string;
  description?: string;
  isActive: boolean;
}

const ThemePage: React.FC = () => {
  const { siteId } = useCurrentSite();
  const [themes, setThemes] = useState<Theme[]>([]);
  const [activeTheme, setActiveTheme] = useState<string>('');

  useEffect(() => {
    api.get('/themes').then((res) => setThemes(res.data?.data ?? res.data ?? []));
  }, []);

  useEffect(() => {
    if (!siteId) return;
    api.get('/site-themes', { params: { 'filter[isActive]': true } }).then((res) => {
      const th = (res.data?.data ?? res.data ?? [])[0];
      if (th) setActiveTheme(th.themeId);
    });
  }, [siteId]);

  if (!siteId) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="info">Please select a site first.</Alert>
      </Container>
    );
  }

  const changeTheme = async (themeId: string) => {
    await api.post('/site-themes', { themeId, isActive: true });
    setActiveTheme(themeId);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={2}>
        {themes.map((t) => (
          <Grid item xs={12} sm={6} md={4} key={t.id}>
            <Card variant={activeTheme === t.id ? 'outlined' : undefined}>
              <CardContent>
                <Typography variant="h6">{t.name}</Typography>
                <Typography variant="body2" gutterBottom>
                  {t.description}
                </Typography>
                <Button variant="contained" onClick={() => changeTheme(t.id)}>
                  Activate
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ThemePage;
