import React from 'react';
import { formatINR, formatDateDMY } from '../utils/format';
import { useSettings } from '../hooks/useSettings';

export default function PaymentReceipt({ payment, settings = {}, lang = 'ta' }) {
  if (!payment) return null;

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

  const isIn = payment.direction === 'in';
  const voucherTitleTa = isIn ? 'வரவு ரசீது' : 'பற்று / செலவு ரசீது';
  const voucherTitleEn = isIn ? 'RECEIPT VOUCHER (COLLECTION IN)' : 'PAYMENT VOUCHER (CASH OUT)';

  const rawDate = payment.payment_date || payment.created_at;
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

  const amountVal = Number(payment.amount || 0);
  const allocations = payment.allocations || [];

  return (
    <div
      className="payment-receipt-template font-serif text-black bg-white p-3 max-w-[142mm] mx-auto border-[2.5px] border-[#0e6037] relative select-none shadow-sm"
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

        {/* Voucher Title Badge */}
        <div className="text-center my-1.5">
          <div className={`inline-block px-4 py-1 rounded text-white font-black text-xs tracking-wider uppercase shadow-xs ${
            isIn ? 'bg-[#0e6037]' : 'bg-[#991b1b]'
          }`}>
            <span>{voucherTitleTa}</span>
            <span className="text-[10px] ml-2 opacity-90 font-sans">({voucherTitleEn})</span>
          </div>
        </div>

        {/* Receipt Key Metadata Grid */}
        <div className="border border-[#0e6037] rounded p-2 text-xs font-semibold leading-relaxed space-y-1 bg-slate-50/50">
          <div className="flex justify-between items-center border-b border-gray-200 pb-1">
            <div>
              <span className="text-slate-600">ரசீது எண்: </span>
              <strong className="font-mono text-sm text-slate-900 font-black">{payment.receipt_no}</strong>
            </div>
            <div>
              <span className="text-slate-600">தேதி: </span>
              <strong className="font-mono text-slate-900">{formattedDate}</strong>
            </div>
          </div>

          <div className="pt-0.5 flex justify-between items-start">
            <div>
              <span className="text-slate-600">{isIn ? 'பெறப்பட்டது (From): ' : 'வழங்கப்பட்டது (To): '}</span>
              <span className="font-bold text-sm text-slate-900">{payment.party_name || '—'}</span>
              {payment.party_place && (
                <span className="text-slate-600 text-[11px] ml-1">({payment.party_place})</span>
              )}
            </div>
            {payment.party_phone && (
              <div className="text-right text-[11px] text-slate-600">
                Cell: <span className="font-mono font-bold text-slate-900">{payment.party_phone}</span>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center text-[11px] pt-0.5">
            <div>
              <span className="text-slate-600">செலுத்தும் முறை: </span>
              <strong className="text-slate-800">{payment.payment_method_name || 'ரொக்கம் (Cash)'}</strong>
            </div>
            <div>
              <span className="text-slate-600">வகை: </span>
              <span className="font-mono text-slate-700 capitalize">{payment.allocation_mode || 'on_account'}</span>
            </div>
          </div>

          {payment.notes && (
            <div className="text-[11px] text-slate-700 pt-0.5 italic">
              குறிப்பு: {payment.notes}
            </div>
          )}
        </div>

        {/* Allocations Table if specific bills/purchases are settled */}
        {allocations.length > 0 && (
          <div className="border border-[#0e6037] rounded overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#0e6037] text-white text-[10px] uppercase font-bold">
                <tr>
                  <th className="py-1 px-2 border-r border-emerald-800">வ.எண்</th>
                  <th className="py-1 px-2 border-r border-emerald-800">ஆவண எண் (Doc Ref)</th>
                  <th className="py-1 px-2 text-right">செலுத்திய தொகை</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {allocations.map((a, idx) => (
                  <tr key={a.id || idx}>
                    <td className="py-1 px-2 text-center font-mono text-[11px] border-r border-gray-200">{idx + 1}</td>
                    <td className="py-1 px-2 font-mono font-bold text-slate-800 border-r border-gray-200">
                      {a.doc_no || a.purchase_doc_no || `Ref #${a.bill_id || a.purchase_id}`}
                    </td>
                    <td className="py-1 px-2 text-right font-mono font-bold text-slate-900">
                      {formatINR(a.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Big Highlight Amount Box */}
        <div className="border-2 border-[#0e6037] rounded p-2.5 bg-emerald-50/40 flex items-center justify-between">
          <div>
            <div className="text-[10.5px] uppercase font-bold text-[#0e6037]">
              {isIn ? 'பெறப்பட்ட மொத்த தொகை (Total Received)' : 'வழங்கப்பட்ட மொத்த தொகை (Total Paid)'}
            </div>
            <div className="text-[11px] text-slate-600 italic">
              Indian Rupees (INR)
            </div>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black font-mono text-slate-900">
              {formatINR(amountVal)}
            </span>
          </div>
        </div>

        {/* Signatures Strip */}
        <div className="pt-8 pb-1 flex justify-between items-end text-xs font-bold text-slate-800">
          <div className="text-center border-t border-slate-400 pt-1 w-36">
            <span>{isIn ? 'செலுத்தியவர் கையொப்பம்' : 'பெற்றவர் கையொப்பம்'}</span>
            <div className="text-[9px] font-normal text-slate-500">Signature</div>
          </div>
          <div className="text-center border-t border-slate-400 pt-1 w-44">
            <span>அங்கீகரிக்கப்பட்ட கையொப்பம்</span>
            <div className="text-[9px] font-normal text-slate-500">Authorized Signature / Seal</div>
          </div>
        </div>

        {/* Bottom Terms */}
       
      </div>
    </div>
  );
}
