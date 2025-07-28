import React, { useEffect, useState } from 'react';
import { MenuItem, Select } from '@mui/material';
import api from '../data/httpClient';
import { useCurrentSite } from '../auth/CurrentSiteContext';

interface Site {
  id: string;
  name: string;
}

const SiteSelector: React.FC = () => {
  const [sites, setSites] = useState<Site[]>([]);
  const { siteId, setSiteId } = useCurrentSite();

  useEffect(() => {
    api
      .get('/sites', { params: { page: 1, limit: 100 } })
      .then((res) => setSites(res.data?.data ?? res.data ?? []));
  }, []);

  return (
    <Select
      size="small"
      onChange={(e) => setSiteId(e.target.value)}
      value={siteId || ''}
      displayEmpty
    >
      <MenuItem value="" disabled>
        Select site
      </MenuItem>
      {sites.map((s) => (
        <MenuItem key={s.id} value={s.id}>
          {s.name}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SiteSelector;
