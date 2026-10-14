import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { listParties, getUnpaidDocuments } from '../api/parties';
import { listPaymentMethods, createPayment, listPayments } from '../api/payments';
import { formatINR, formatDateDMY, todayISO } from '../utils/format';

export default function Payments() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [parties, setParties] = useState([]);
  const [methods, setMethods] = useState([]);
  const [history, setHistory] = useState([]);
  const [historyFilter, setHistoryFilter] = useState('all'); // 'all' | 'in' | 'out'
  const [direction, setDirection] = useState('in');
  const [partyId, setPartyId] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(todayISO());
  const [methodId, setMethodId] = useState('');
  const [mode, setMode] = useState('auto');
  const [notes, setNotes] = useState('');
  const [unpaid, setUnpaid] = useState({ bills: [], purchases: [] });
  const [manualAlloc, setManualAlloc] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    listParties().then(setParties);
    listPaymentMethods().then(setMethods);
  }, []);

  function loadHistory(filt = historyFilter) {
    const params = {};
    if (filt && filt !== 'all') {
      params.direction = filt;
    }
    listPayments(params).then(setHistory);
  }

  useEffect(() => {
    loadHistory(historyFilter);
  }, [historyFilter]);

  useEffect(() => {
    if (!partyId) {
      setUnpaid({ bills: [], purchases: [] });
      return;
    }
    getUnpaidDocuments(partyId).then(setUnpaid);
    setManualAlloc({});
  }, [partyId]);

  const relevantDocs =
    direction === 'in'
      ? unpaid.bills.filter((b) => true)
      : [...unpaid.bills, ...unpaid.purchases];

  function toggleManual(doc, checked) {
    setManualAlloc((m) => {
      const next = { ...m };
      const key = `${doc.doc_type}-${doc.id}`;
      if (checked) {
        next[key] = { ...doc, alloc_amount: doc.balance_due };
      } else {
        delete next[key];
      }
      return next;
    });
  }

  function setManualAmount(key, value) {
    setManualAlloc((m) => ({ ...m, [key]: { ...m[key], alloc_amount: value } }));
  }

  async function handleSave() {
    if (!partyId || !amount) return;
    setSaving(true);
    try {
      const payload = {
        direction,
        party_id: Number(partyId),
        payment_date: date,
        amount: Number(amount),
        payment_method_id: methodId || null,
        allocation_mode: mode,
        notes,
      };
      if (mode === 'manual') {
        payload.allocations = Object.values(manualAlloc).map((d) => ({
          bill_id: d.doc_type === 'bill' ? d.id : null,
          purchase_id: d.doc_type === 'purchase' ? d.id : null,
          amount: Number(d.alloc_amount) || 0,
        }));
      }
      const res = await createPayment(payload);
      setAmount('');
      setPartyId('');
      setNotes('');
      loadHistory(historyFilter);
      if (res?.id) {
        navigate(`/print/payment/${res.id}`);
      }
    } catch (err) {
      alert(err?.response?.data?.error || 'Failed');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">{t('nav.payments')}</h1>

      <div className="card space-y-3">
        <div className="flex gap-2">
          <button
            className={direction === 'in' ? 'btn-primary' : 'btn-secondary'}
            onClick={() => setDirection('in')}
          >
            {t('payments.direction_in')}
          </button>
          <button
            className={direction === 'out' ? 'btn-primary' : 'btn-secondary'}
            onClick={() => setDirection('out')}
          >
            {t('payments.direction_out')}
          </button>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <label className="label">{t('common.party')}</label>
            <select className="input" value={partyId} onChange={(e) => setPartyId(e.target.value)}>
              <option value="">—</option>
              {parties
                .filter((p) => (direction === 'in' ? p.type !== 'supplier' : p.type !== 'customer'))
                .map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({formatINR(p.balance)})
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="label">{t('common.date')}</label>
            <input type="date" className="input" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div>
            <label className="label">{t('common.amount')}</label>
            <input type="number" step="0.01" className="input" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
          <div>
            <label className="label">{t('common.method')}</label>
            <select className="input" value={methodId} onChange={(e) => setMethodId(e.target.value)}>
              <option value="">—</option>
              {methods.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name_ta}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="label">Allocation</label>
          <div className="flex gap-2">
            {['auto', 'manual', 'on_account'].map((m) => (
              <button key={m} className={mode === m ? 'btn-primary' : 'btn-secondary'} onClick={() => setMode(m)}>
                {t(`payments.allocation_${m}`)}
              </button>
            ))}
          </div>
        </div>

        {mode === 'manual' && partyId && (
          <div className="border rounded-md p-3">
            <h4 className="font-medium mb-2">{t('payments.unpaid_docs')}</h4>
            <table className="data-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Doc</th>
                  <th>{t('common.date')}</th>
                  <th>{t('billing.balance_due')}</th>
                  <th>Allocate</th>
                </tr>
              </thead>
              <tbody>
                {relevantDocs.map((doc) => {
                  const key = `${doc.doc_type}-${doc.id}`;
                  const checked = !!manualAlloc[key];
                  return (
                    <tr key={key}>
                      <td>
                        <input type="checkbox" checked={checked} onChange={(e) => toggleManual(doc, e.target.checked)} />
                      </td>
                      <td>{doc.doc_no}</td>
                      <td>{formatDateDMY(doc.doc_date)}</td>
                      <td>{formatINR(doc.balance_due)}</td>
                      <td>
                        {checked && (
                          <input
                            className="input w-28"
                            type="number"
                            step="0.01"
                            value={manualAlloc[key].alloc_amount}
                            onChange={(e) => setManualAmount(key, e.target.value)}
                          />
                        )}
                      </td>
                    </tr>
                  );
                })}
                {relevantDocs.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center text-gray-400 py-2">
                      —
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        <textarea className="input" placeholder={t('billing.notes')} value={notes} onChange={(e) => setNotes(e.target.value)} />

        <button className="btn-primary" onClick={handleSave} disabled={saving}>
          {t('common.save')}
        </button>
      </div>

      <div className="card space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-gray-100">
          <h3 className="font-bold text-gray-800 text-base">{t('payments.receipt')} வரலாறு (History)</h3>
          
          {/* Section Filter for In/Out */}
          <div className="inline-flex p-0.5 bg-gray-100 rounded-lg border border-gray-200 text-xs">
            <button
              type="button"
              className={`px-3 py-1 rounded-md font-bold transition-all ${
                historyFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setHistoryFilter('all')}
            >
              அனைத்தும் (All)
            </button>
            <button
              type="button"
              className={`px-3 py-1 rounded-md font-bold transition-all flex items-center gap-1 ${
                historyFilter === 'in'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setHistoryFilter('in')}
            >
              <span>📥</span>
              <span>உள்ளே வருவது (வரவு)</span>
            </button>
            <button
              type="button"
              className={`px-3 py-1 rounded-md font-bold transition-all flex items-center gap-1 ${
                historyFilter === 'out'
                  ? 'bg-rose-700 text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setHistoryFilter('out')}
            >
              <span>📤</span>
              <span>வெளியே போவது (பற்று)</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>{t('payments.receipt')}</th>
                <th>வகை (Direction)</th>
                <th>{t('common.date')}</th>
                <th>{t('common.party')}</th>
                <th>{t('common.amount')}</th>
                <th>{t('common.method')}</th>
                <th className="text-center">{t('common.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h) => {
                const isIn = h.direction === 'in';
                return (
                  <tr key={h.id}>
                    <td className="font-mono font-bold text-slate-800">{h.receipt_no}</td>
                    <td>
                      <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                        isIn ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {isIn ? 'உள்ளே (வரவு)' : 'வெளியே (பற்று)'}
                      </span>
                    </td>
                    <td>{formatDateDMY(h.payment_date)}</td>
                    <td className="font-bold text-gray-900">{h.party_name}</td>
                    <td className={`font-mono font-bold ${isIn ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {formatINR(h.amount)}
                    </td>
                    <td>{h.payment_method_name}</td>
                    <td className="text-center whitespace-nowrap py-2 px-3">
                      <button
                        className="p-1.5 text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 rounded transition-colors inline-flex items-center justify-center"
                        onClick={() => navigate(`/print/payment/${h.id}`)}
                        title="ரசீது அச்சிடு (Print Receipt)"
                        type="button"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 002-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                );
              })}
              {history.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center text-gray-400 py-4">
                    — பதிவுகள் எதுவும் இல்லை —
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
