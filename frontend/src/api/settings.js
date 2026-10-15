import client from './client';
import { isMojibake } from '../utils/format';

function sanitizeSettings(data) {
  if (!data || typeof data !== 'object') return data;
  const res = { ...data };
  if (isMojibake(res.company_name_ta) || res.company_name_ta?.includes('?')) {
    res.company_name_ta = 'ஸ்ரீ பவானி காய்கனி கமிஷன் வியாபாரம்';
  }
  if (isMojibake(res.company_tagline)) {
    res.company_tagline = 'காய்கனி கமிஷன் வியாபாரம்';
  }
  if (isMojibake(res.proprietor_name)) {
    res.proprietor_name = 'பவானி சங்கர்';
  }
  return res;
}

export const getSettings = () => client.get('/settings').then((r) => sanitizeSettings(r.data));
export const updateSettings = (payload) => client.put('/settings', payload).then((r) => r.data);
export const getSequences = () => client.get('/settings/sequences').then((r) => r.data);
export const updateSequence = (id, payload) => client.put(`/settings/sequences/${id}`, payload).then((r) => r.data);

export const listUsers = () => client.get('/users').then((r) => r.data);
export const createUser = (payload) => client.post('/users', payload).then((r) => r.data);
export const updateUser = (id, payload) => client.put(`/users/${id}`, payload).then((r) => r.data);

export const getAuditLog = () => client.get('/audit-log').then((r) => r.data);

