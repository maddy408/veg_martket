import React from 'react';
import { formatINR, formatDateDMY, cleanTamilItem } from '../utils/format';
import { useSettings } from '../hooks/useSettings';

export default function PurchaseInvoice({ purchase, settings = {}, lang = 'ta' }) {
  if (!purchase) return null;

  let globalSettings = {};
  try {
    const hook = useSettings?.();
    if (hook && hook.settings) {
      globalSettings = hook.settings;
    }
  } catch (e) {}
  if (!globalSettings || Object.keys(globalSettings).length === 0) {
    try {
      const cached = localStorage.getItem('veg_pos_settings');
      if (cached) globalSettings = JSON.parse(cached);
    } catch (e) {}
  }

  const effectiveSettings = { ...globalSettings, ...settings };
  let phones = effectiveSettings.phones || [];
  if ((!phones || phones.length === 0) && effectiveSettings.phone_numbers) {
    try {
      if (typeof effectiveSettings.phone_numbers === 'string') {
        phones = effectiveSettings.phone_numbers.startsWith('[')
          ? JSON.parse(effectiveSettings.phone_numbers)
          : effectiveSettings.phone_numbers.split(',').map((s) => s.trim());
      } else if (Array.isArray(effectiveSettings.phone_numbers)) {
        phones = effectiveSettings.phone_numbers;
      }
    } catch (e) {}
  }
  if (!phones || phones.length === 0) {
    phones = ['9659580845', '9488103983', '9789767576'];
  }

  const phone1 = phones[0] || '';
  const phone2 = phones[1] || '';
  const phone3 = phones[2] || '';

  const shopNo1 = effectiveSettings.shop_number || '14';
  const shopNo2 = effectiveSettings.shop_number_2 || '15';
  const companyNameTa = effectiveSettings.company_name_ta || effectiveSettings.company_name || 'ஸ்ரீ பவானி காய்கனி கமிஷன் வியாபாரம்';
  const companyNameEn = effectiveSettings.company_name_en || '';
  const displayName = lang === 'en' ? (companyNameEn || companyNameTa) : companyNameTa;
  const address = effectiveSettings.address_line1 || 'தினசரி மார்க்கெட்';
  const location = effectiveSettings.address_line2 || 'சுரண்டை.';
  const proprietor = effectiveSettings.proprietor_name || effectiveSettings.owner_name || 'பவானி சங்கர்';
  const god1 = effectiveSettings.god_name_1 || 'ஸ்ரீ பவானி அம்மன் துணை';
  const god2 = effectiveSettings.god_name_2 || 'ஸ்ரீ பொட்டல் மாடசாமி';
  const brandLogo = effectiveSettings.logo_brand || 'VTC';

  const rawDate = purchase.purchase_date || purchase.created_at;
  let formattedDate = '';
  if (rawDate) {
    const d = new Date(rawDate.length <= 10 ? rawDate + 'T00:00:00' : rawDate);
    if (!Number.isNaN(d.getTime())) {
      const dd = String(d.getDate()).padStart(2, '0');
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const yyyy = d.getFullYear();
      formattedDate = `${dd}.${mm}.${yyyy}`;
    } else {
      formattedDate = rawDate;
    }
  }

  const lines = purchase.lines || [];
  const itemsTotal = Number(purchase.items_total || 0);
  const discountVal = Number(purchase.discount_amount || 0);
  const totalVal = Number(purchase.total || 0);
  const paidVal = Number(purchase.paid_amount || 0);
  const balanceDueVal = Number(purchase.balance_due || 0);

  return (
    <div
      className="purchase-invoice-template font-serif text-black bg-white p-3 max-w-[142mm] mx-auto border-[2.5px] border-[#0e6037] relative select-none shadow-sm"
      style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}
    >
      <div className="border border-[#0e6037] p-2 space-y-2">

        {/* Top Contact Bar & Deity Name with 'உ' matching Image 2 */}
        <div className="relative pb-0.5 min-h-[46px]">
          {/* Left Contact */}
          <div className="absolute left-0 top-2.5 text-left text-[10.5px] font-bold text-[#0e6037] leading-tight flex items-center gap-1.5">
            <span>{proprietor} :</span>
            <span className="font-sans font-bold text-[11px] tracking-normal">{phone1}</span>
          </div>

          {/* Center: 'உ' and Deity names - exactly 50% centered */}
          <div className="w-full text-center font-bold text-[#0e6037] leading-tight">
            <div className="text-xs font-black text-[#0e6037] leading-none mb-0.5">உ</div>
            <div className="text-[#0e6037] font-bold text-[10.5px] leading-tight">{god1}</div>
            <div className="text-[#0e6037] font-bold text-[9.5px] leading-tight mt-0.5">{god2}</div>
          </div>

          {/* Right Contact */}
          <div className="absolute right-0 top-2.5 text-right text-[10.5px] font-bold text-[#0e6037] leading-tight">
            <div className="flex justify-end items-center gap-1.5">
              <span>Cell :</span>
              <span className="font-sans font-bold text-[11px] tracking-normal">{phone2}</span>
            </div>
            {phone3 && (
              <div className="flex justify-end">
                <span className="font-sans font-bold text-[11px] tracking-normal">{phone3}</span>
              </div>
            )}
          </div>
        </div>

        {/* Deity Pictures, Shop Numbers & Center VTC Logo */}
        <div className="relative flex items-center justify-between my-0.5 px-1 min-h-[58px]">
          
          {/* Left Shop No Box & Deity Photo */}
          <div className="flex items-center gap-1.5 z-10">
            <div className="border-2 border-[#0e6037] rounded overflow-hidden text-center w-11 shadow-xs">
              <div className="bg-[#0e6037] text-white text-[8px] font-bold py-0.5 leading-none">
                கடை எண்
              </div>
              <div className="text-xl font-black text-red-600 py-0.5 leading-none font-sans">
                {shopNo1}
              </div>
            </div>

            <div className="flex justify-center items-center">
              <img
                src="/images/god-amman.png"
                alt="ஸ்ரீ பவானி அம்மன்"
                className="h-14 w-auto max-w-[45px] object-contain"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          </div>

          {/* Center Red Oval VTC Logo - EXACT 50% CENTER */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none">
            <span className="inline-block bg-[#dc2626] text-white font-serif font-black text-2xl px-5 py-1 rounded-full tracking-wider shadow-sm border-2 border-red-700 leading-tight">
              {brandLogo}
            </span>
          </div>

          {/* Right Deity Photo & Shop No Box */}
          <div className="flex items-center gap-1.5 z-10">
            <div className="flex justify-center items-center">
              <img
                src="/images/god-maadasamy.png"
                alt="ஸ்ரீ பொட்டல் மாடசாமி"
                className="h-14 w-auto max-w-[45px] object-contain"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>

            <div className="border-2 border-[#0e6037] rounded overflow-hidden text-center w-11 shadow-xs">
              <div className="bg-[#0e6037] text-white text-[8px] font-bold py-0.5 leading-none">
                கடை எண்
              </div>
              <div className="text-xl font-black text-red-600 py-0.5 leading-none font-sans">
                {shopNo2}
              </div>
            </div>
          </div>

        </div>

        {/* Main Shop Name */}
        <div className="text-center">
          <h1 className="text-xl font-black text-red-600 tracking-wide font-sans leading-tight">
            {displayName}
          </h1>
          {(address || location) && (
            <div className="text-xs font-bold text-[#0e6037] tracking-wider leading-tight">
              {[address, location].filter(Boolean).join(', ')}
            </div>
          )}
        </div>

        {/* Title Badge */}
        <div className="text-center my-1.5">
          <div className="inline-block px-4 py-1 rounded bg-[#0e6037] text-white font-black text-xs tracking-wider uppercase shadow-xs">
            <span>கொள்முதல் பட்டியல் (PURCHASE INWARD VOUCHER)</span>
          </div>
        </div>

        {/* Purchase Metadata Grid */}
        <div className="border border-[#0e6037] rounded p-2 text-xs font-semibold leading-relaxed space-y-1 bg-slate-50/50">
          <div className="flex justify-between items-center border-b border-gray-200 pb-1">
            <div>
              <span className="text-slate-600">கொள்முதல் எண்: </span>
              <strong className="font-mono text-sm text-slate-900 font-black">{purchase.purchase_no}</strong>
            </div>
            <div>
              <span className="text-slate-600">தேதி: </span>
              <strong className="font-mono text-slate-900">{formattedDate}</strong>
            </div>
          </div>

          <div className="pt-0.5 flex justify-between items-start">
            <div>
              <span className="text-slate-600">விவசாயி / விற்பனையாளர்: </span>
              <span className="font-bold text-sm text-slate-900">{purchase.party_name || '—'}</span>
              {purchase.party_place && (
                <span className="text-slate-600 text-[11px] ml-1">({purchase.party_place})</span>
              )}
            </div>
            {purchase.party_phone && (
              <div className="text-right text-[11px] text-slate-600">
                Cell: <span className="font-mono font-bold text-slate-900">{purchase.party_phone}</span>
              </div>
            )}
          </div>
        </div>

        {/* Purchase Item Lines Table */}
        <div className="border border-[#0e6037] rounded overflow-hidden text-xs">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#0e6037] text-white text-[10.5px] font-bold">
              <tr>
                <th className="py-1 px-2 border-r border-emerald-800 w-8 text-center">வ.எண்</th>
                <th className="py-1 px-2 border-r border-emerald-800">பொருள் விவரம்</th>
                <th className="py-1 px-2 border-r border-emerald-800 text-center w-14">பை</th>
                <th className="py-1 px-2 border-r border-emerald-800 text-right w-16">எடை / அளவு</th>
                <th className="py-1 px-2 border-r border-emerald-800 text-right w-16">விலை</th>
                <th className="py-1 px-2 text-right w-20">தொகை</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 font-medium">
              {lines.map((l, idx) => (
                <tr key={l.id || idx}>
                  <td className="py-1.5 px-2 text-center font-mono text-[11px] border-r border-gray-200">{idx + 1}</td>
                  <td className="py-1.5 px-2 font-bold text-slate-900 border-r border-gray-200">
                    {cleanTamilItem(l.name_ta || l.item_name_ta, l.name_en || l.item_name_en)}
                  </td>
                  <td className="py-1.5 px-2 text-center font-mono border-r border-gray-200">
                    {Number(l.nos) > 0 ? Number(l.nos) : ''}
                  </td>
                  <td className="py-1.5 px-2 text-right font-mono border-r border-gray-200">
                    {Number(l.weight || 0).toFixed(2)}
                  </td>
                  <td className="py-1.5 px-2 text-right font-mono border-r border-gray-200">
                    {Number(l.rate || 0).toFixed(2)}
                  </td>
                  <td className="py-1.5 px-2 text-right font-mono font-bold text-slate-900">
                    {formatINR(l.amount)}
                  </td>
                </tr>
              ))}
              {lines.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-3 text-center text-gray-400 italic">
                    — உருப்படிகள் இல்லை —
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Totals Summary Box */}
        <div className="border border-[#0e6037] rounded p-2 bg-slate-50/70 text-xs space-y-1 font-semibold">
          <div className="flex justify-between items-center text-slate-700">
            <span>மொத்த உருப்படிகள் தொகை (Subtotal):</span>
            <span className="font-mono font-bold text-slate-900">{formatINR(itemsTotal)}</span>
          </div>

          {discountVal > 0 && (
            <div className="flex justify-between items-center text-rose-700">
              <span>தள்ளுபடி (Discount):</span>
              <span className="font-mono font-bold">− {formatINR(discountVal)}</span>
            </div>
          )}

          <div className="flex justify-between items-center pt-1 border-t border-gray-200 font-black text-sm">
            <span className="text-[#0e6037]">நிகர கொள்முதல் மொத்தம் (Net Total):</span>
            <span className="font-mono text-base text-[#0e6037]">{formatINR(totalVal)}</span>
          </div>

          <div className="flex justify-between items-center pt-1 border-t border-gray-200 text-[11.5px]">
            <span className="text-emerald-800">செலுத்திய தொகை (Paid):</span>
            <span className="font-mono font-bold text-emerald-800">{formatINR(paidVal)}</span>
          </div>

          <div className="flex justify-between items-center text-[11.5px]">
            <span className={balanceDueVal > 0 ? 'text-rose-700 font-bold' : 'text-slate-600'}>
              பாக்கித் தொகை (Balance Due):
            </span>
            <span className={`font-mono font-bold ${balanceDueVal > 0 ? 'text-rose-700' : 'text-slate-900'}`}>
              {formatINR(balanceDueVal)}
            </span>
          </div>
        </div>

        {/* Signatures Strip */}
        <div className="pt-8 pb-1 flex justify-between items-end text-xs font-bold text-slate-800">
          <div className="text-center border-t border-slate-400 pt-1 w-40">
            <span>பொருட்கள் வழங்கியவர் கையொப்பம்</span>
            <div className="text-[9px] font-normal text-slate-500">Supplier Signature</div>
          </div>
          <div className="text-center border-t border-slate-400 pt-1 w-44">
            <span>சரிபார்த்தவர் கையொப்பம்</span>
            <div className="text-[9px] font-normal text-slate-500">Authorized Receiver / Seal</div>
          </div>
        </div>
        

        {/* Bottom Terms */}

        
       
      </div>
    </div>
  );

}
