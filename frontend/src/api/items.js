import client from './client';
import { cleanTamilItem } from '../utils/format';

function sanitizeItem(it) {
  if (!it || typeof it !== 'object') return it;
  const clean = cleanTamilItem(it.name_ta, it.name_en);
  const pureTa = clean && clean.includes(' / ') ? clean.split(' / ')[0] : clean;
  return {
    ...it,
    name_ta: pureTa || it.name_ta,
  };
}

export const listItems = (params = {}) =>
  client.get('/items', { params }).then((r) => (Array.isArray(r.data) ? r.data.map(sanitizeItem) : r.data));

export const getItem = (id) => client.get(`/items/${id}`).then((r) => sanitizeItem(r.data));
export const createItem = (payload) => client.post('/items', payload).then((r) => r.data);
export const updateItem = (id, payload) => client.put(`/items/${id}`, payload).then((r) => r.data);
export const deleteItem = (id) => client.delete(`/items/${id}`).then((r) => r.data);

