import client from './client';
import { cleanTamilItem } from '../utils/format';

function sanitizeTopItems(items) {
  if (!Array.isArray(items)) return items;
  return items.map((it) => {
    const clean = cleanTamilItem(it.item_name_ta, it.item_name_en);
    const pureTa = clean && clean.includes(' / ') ? clean.split(' / ')[0] : clean;
    return {
      ...it,
      item_name_ta: pureTa || it.item_name_ta,
    };
  });
}

export const dashboardSummary = () =>
  client.get('/dashboard/summary').then((r) => {
    const data = r.data || {};
    if (data.top_items_month) {
      data.top_items_month = sanitizeTopItems(data.top_items_month);
    }
    return data;
  });

export const dailySalesReport = (params) => client.get('/reports/daily-sales', { params }).then((r) => r.data);
export const itemWiseSalesReport = (params) => client.get('/reports/item-wise-sales', { params }).then((r) => r.data);
export const topItemsReport = (params) => client.get('/reports/top-items', { params }).then((r) => r.data);
export const partyOutstandingReport = (params) => client.get('/reports/party-outstanding', { params }).then((r) => r.data);
export const commissionReport = (params) => client.get('/reports/commission', { params }).then((r) => r.data);
export const paymentCollectionReport = (params) => client.get('/reports/payment-collection', { params }).then((r) => r.data);
export const purchaseReport = (params) => client.get('/reports/purchases', { params }).then((r) => r.data);
export const profitReport = (params) => client.get('/reports/profit', { params }).then((r) => r.data);
export const billWiseProfitReport = (params) => client.get('/reports/bill-wise-profit', { params }).then((r) => r.data);
