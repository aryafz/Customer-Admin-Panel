import React, { useEffect, useState } from 'react';
import { MenuItem, Select } from '@mui/material';
import api from '../data/httpClient';

interface Site {
  id: string;
  name: string;
}

const SiteSelector: React.FC<{ onChange: (id: string) => void }> = ({ onChange }) => {
  const [sites, setSites] = useState<Site[]>([]);

  useEffect(() => {
    api.get('/sites').then((res) => setSites(res.data));
  }, []);

  return (
    <Select size="small" onChange={(e) => onChange(e.target.value)} defaultValue="">
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
