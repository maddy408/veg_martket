import React from 'react';
import { formatINR, formatDateDMY } from '../utils/format';
import { useSettings } from '../hooks/useSettings';
import { GOD_AMMAN_BASE64, GOD_MAADASAMY_BASE64 } from './godImages';

export default function SurandaiInvoice({ bill, settings = {}, isCommissionView, lang = 'ta', paperFormat = 'afx' }) {
  if (!bill) return null;

  // Retrieve global settings from SettingsContext or localStorage
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

  // Merge explicitly passed settings with global settings
  const effectiveSettings = { ...(globalSettings || {}), ...(settings || {}) };

  // Decide format based on bill_type or user toggle
  const isCommission = isCommissionView !== undefined 
    ? isCommissionView 
    : bill.bill_type === 'commission';

  // Parse phone numbers dynamically from settings
  let phones = [];
  try {
    const rawPhones = effectiveSettings.phone_numbers;
    if (rawPhones) {
      if (typeof rawPhones === 'string') {
        const trimmed = rawPhones.trim();
        if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
          phones = JSON.parse(trimmed);
        } else {
          phones = trimmed.split(/[,/|;\n]+/).map((s) => s.trim()).filter(Boolean);
        }
      } else if (Array.isArray(rawPhones)) {
        phones = rawPhones;
      }
    }
  } catch (e) {
    phones = [];
  }

  if (!phones || phones.length === 0) {
    [effectiveSettings.phone, effectiveSettings.phone_1, effectiveSettings.phone_2, effectiveSettings.phone_3, effectiveSettings.mobile]
      .filter(Boolean)
      .forEach((p) => phones.push(p));
  }

  const hasConfiguredSettings = Boolean(
    effectiveSettings.company_name_ta ||
    effectiveSettings.company_name_en ||
    effectiveSettings.proprietor_name ||
    effectiveSettings.phone_numbers
  );

  if (!phones || phones.length === 0) {
    phones = hasConfiguredSettings ? [] : ['9659580845', '9488103983', '9789767576'];
  }

  const phone1 = phones[0] || '';
  const phone2 = phones[1] || '';
  const phone3 = phones[2] || '';

  const shopNo1 = effectiveSettings.shop_number || (hasConfiguredSettings ? '' : '14');
  const shopNo2 = effectiveSettings.shop_number_2 || (hasConfiguredSettings ? '' : '15');
  const companyNameTa = effectiveSettings.company_name_ta || effectiveSettings.company_name || effectiveSettings.shop_name || 'ஸ்ரீ பவானி காய்கனி கமிஷன் வியாபாரம்';
  const companyNameEn = effectiveSettings.company_name_en || effectiveSettings.company_name || '';
  const displayName = lang === 'en' ? (companyNameEn || companyNameTa) : (companyNameTa || companyNameEn);
  const address = effectiveSettings.address_line1 || (hasConfiguredSettings ? '' : 'தினசரி மார்க்கெட்');
  const location = effectiveSettings.address_line2 || (hasConfiguredSettings ? '' : 'சுரண்டை.');
  const proprietor = effectiveSettings.proprietor_name || effectiveSettings.owner_name || (hasConfiguredSettings ? '' : 'பவானி சங்கர்');
  const god1 = effectiveSettings.god_name_1 !== undefined && effectiveSettings.god_name_1 !== null ? effectiveSettings.god_name_1 : 'ஸ்ரீ பவானி அம்மன் துணை';
  const god2 = effectiveSettings.god_name_2 !== undefined && effectiveSettings.god_name_2 !== null ? effectiveSettings.god_name_2 : 'ஸ்ரீ பொட்டல் மாடசாமி';
  const brandLogo = effectiveSettings.logo_brand !== undefined && effectiveSettings.logo_brand !== null ? effectiveSettings.logo_brand : 'VTC';
  const footerNote = effectiveSettings.footer_note || 'நன்றி! மீண்டும் வருக! • Thank You! Visit Again!';

  const customerName = bill.party_name || bill.walkin_name || bill.customer_name || '';
  const billNo = bill.bill_no || (bill.id ? `B-${bill.id}` : '—');
  
  // Format Date as DD.MM.YYYY
  const rawDate = bill.bill_date || bill.created_at || bill.invoice_date;
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

  // Consistent 2-decimal Indian formatting for all amounts
  const formatIndian = (num) => Number(num || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // Final bill total display formatter: 40 for 40.00, 40.30 for 40.30
  const formatBillTotal = (num) => {
    const val = Number(num || 0);
    if (val % 1 === 0) {
      return val.toLocaleString('en-IN');
    }
    return val.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // Calculations
  const itemsTotal = Number(bill.items_total !== undefined ? bill.items_total : (bill.subtotal !== undefined ? bill.subtotal : 0));
  const discountVal = Number(bill.discount_amount || bill.discount || 0);
  const prevBal = Number(bill.previous_balance !== undefined ? bill.previous_balance : (bill.prev_balance !== undefined ? bill.prev_balance : 0));
  const todayBillTotal = Math.max(0, itemsTotal - discountVal);
  const paidVal = Number(bill.paid_amount || 0);
  const munPartru = prevBal;
  const varavu = paidVal;

  const commissionVal = Number(bill.commission_amount || 0);
  const commissionMode = bill.commission_mode || (bill.commission_percent !== null && bill.commission_percent !== undefined ? 'percentage' : 'fixed');
  const patthuVal = Number(bill.patthu_amount || 0);
  const cooliVal = Number(bill.cooli_amount || 0);
  const vadagaiVal = Number(bill.vadagai_amount || 0);
  const otherDeductionVal = Number(bill.other_deduction_amount || 0);
  const totalDeductionsVal = commissionVal + patthuVal + cooliVal + vadagaiVal + otherDeductionVal;
  const netTotalVal = itemsTotal - totalDeductionsVal;

  const rawLines = bill.lines || bill.items || [];
  const isCompact = rawLines.length > 7;
  const isSlip = paperFormat === 'slip';

  return (
    <div
      className={`surandai-bhavani-template font-sans text-black bg-white select-none shadow-sm flex flex-col mx-auto relative border-2 border-[#0e6037] ${
        isSlip
          ? 'max-w-[76mm] w-full p-2 text-[10px]'
          : 'max-w-[140mm] w-full min-h-[196mm] p-2 text-xs'
      }`}
      style={{
        minHeight: isSlip ? 'auto' : paperFormat === 'a4' ? '280mm' : '196mm',
        pageBreakInside: 'avoid',
        breakInside: 'avoid',
      }}
    >
      <div className="flex flex-col flex-1 h-full min-h-full">

        {/* 1. Top Contact Bar with Center Sacred Inscription (Zero Overlap Guaranteed) */}
        <div className="grid grid-cols-[28%_44%_28%] items-start pb-0.5 text-[11px] font-bold text-slate-900 leading-tight">
          {/* Left: Proprietor & Phone 1 */}
          <div className="text-left leading-tight">
            <div>{proprietor} :</div>
            {phone1 && <div className="font-mono font-bold tracking-tight text-[11px]">{phone1}</div>}
          </div>

          {/* Center: Sacred "உ" & God 1 & God 2 */}
          <div className="text-center">
            <div className="text-[11px] font-black text-slate-900 leading-none">உ</div>
            <div className="text-[10px] font-bold text-[#0e6037] tracking-wide mt-0.5 whitespace-nowrap">{god1}</div>
            <div className="text-[9.5px] font-bold text-[#0e6037] tracking-wide mt-0.5 whitespace-nowrap">{god2}</div>
          </div>

          {/* Right: Cell Phones */}
          <div className="text-right">
            <div>Cell : <span className="font-mono font-bold">{phone2}</span></div>
            {phone3 && <div className="font-mono font-bold text-[10px]">{phone3}</div>}
          </div>
        </div>

        {/* 2. Badges, Deity Icons & Center Brand Banner */}
        <div className={`flex items-center justify-between px-1 ${isCompact || isSlip ? 'my-0.5' : 'my-1'}`}>
          {/* Left Shop No Badge */}
          <div className={`border-2 border-[#0e6037] rounded overflow-hidden text-center shrink-0 shadow-xs ${isCompact || isSlip ? 'w-10' : 'w-14'}`}>
            <div className="bg-[#0e6037] text-white text-[8px] font-bold py-0.5 px-1 leading-none whitespace-nowrap">
              கடை எண்
            </div>
            <div className={`font-black text-red-600 leading-none font-sans ${isCompact || isSlip ? 'text-base py-0.5' : 'text-xl py-0.5'}`}>
              {shopNo1}
            </div>
          </div>

          {/* Left Deity Photo (Amman) */}
          <div className="flex justify-center items-center px-1 shrink-0">
            <img
              src={GOD_AMMAN_BASE64}
              alt="ஸ்ரீ பவானி அம்மன்"
              className={`${isCompact || isSlip ? 'h-10 max-w-[34px]' : 'h-14 max-w-[44px]'} w-auto object-contain`}
            />
          </div>

          {/* Center Brand Title & Oval Logo */}
          <div className="text-center flex-1 px-1 min-w-0">
            <div className="my-0.5 inline-block">
              <span
                className={`inline-block bg-white text-[#6b0505] border-[2.5px] border-[#6b0505] font-serif font-black rounded-full tracking-wider leading-tight shadow-xs ${isCompact || isSlip ? 'text-sm px-3 py-0' : 'text-base px-4 py-0.5'}`}
                style={{ fontWeight: 900, WebkitTextStroke: '0.35px #6b0505' }}
              >
                {brandLogo}
              </span>
            </div>
          </div>

          {/* Right Deity Photo (Maadasamy) */}
          <div className="flex justify-center items-center px-1 shrink-0">
            <img
              src={GOD_MAADASAMY_BASE64}
              alt="ஸ்ரீ பொட்டல் மாடசாமி"
              className={`${isCompact || isSlip ? 'h-10 max-w-[34px]' : 'h-14 max-w-[44px]'} w-auto object-contain`}
            />
          </div>

          {/* Right Shop No Badge */}
          <div className={`border-2 border-[#0e6037] rounded overflow-hidden text-center shrink-0 shadow-xs ${isCompact || isSlip ? 'w-10' : 'w-14'}`}>
            <div className="bg-[#0e6037] text-white text-[8px] font-bold py-0.5 px-1 leading-none whitespace-nowrap">
              கடை எண்
            </div>
            <div className={`font-black text-red-600 leading-none font-sans ${isCompact || isSlip ? 'text-base py-0.5' : 'text-xl py-0.5'}`}>
              {shopNo2}
            </div>
          </div>
        </div>

        {/* 3. Main Shop Name & Address */}
        <div className="text-center mt-0.5 mb-1">
          <h1
            className="text-xl font-black text-[#6b0505] tracking-wide font-sans leading-tight"
            style={{ fontWeight: 900, WebkitTextStroke: '0.45px #6b0505' }}
          >
            {displayName || companyNameTa}
          </h1>
          {(address || location) && (
            <div className="text-xs font-bold text-[#0e6037] tracking-wider leading-tight mt-0.5">
              {[address, location].filter(Boolean).join(', ')}
            </div>
          )}
        </div>

        {/* 4. Customer & Bill No / Date Line (No bottom line) */}
        <div className="py-1 px-1 my-0.5 flex justify-between items-center text-xs font-bold">
          <div className="flex-1 truncate pr-2">
            <span className="text-[#0e6037]">உயர்திரு : </span>
            <span className="font-black text-slate-900 px-0.5">
              {customerName || 'வாடிக்கையாளர்'}
            </span>
          </div>
          <div className="text-right shrink-0 flex items-center gap-1.5 font-bold text-xs text-slate-900">
            {isCommission ? (
              <span>தேதி : <strong className="font-mono text-slate-900">{formattedDate}</strong></span>
            ) : (
              <>
                <span>பில்: <strong className="font-mono text-slate-900">{billNo}</strong></span>
                <span>•</span>
                <span>தேதி: <strong className="font-mono text-slate-900">{formattedDate}</strong></span>
              </>
            )}
          </div>
        </div>

        {/* 5. Mandi Items Table: விலை, பொருள் விபரம், எடை, பை, தொகை */}
        <table className="w-full border-collapse text-xs border border-[#0e6037] table-fixed">
          <thead>
            <tr className={`${isCommission ? 'bg-white' : 'bg-[#e6f4ea]'} text-[#0e6037] border-b border-[#0e6037] text-center font-bold`}>
              <th className={`border-r border-[#0e6037] py-1 px-1 w-[15%] ${isCommission ? 'text-center' : 'text-right pr-2'}`}>{lang === 'en' ? 'Rate' : 'விலை'}</th>
              <th className={`border-r border-[#0e6037] py-1 px-1.5 w-[37%] ${isCommission ? 'text-center' : 'text-left pl-2'}`}>{lang === 'en' ? 'Item' : 'பொருள் விபரம்'}</th>
              <th className={`border-r border-[#0e6037] py-1 px-1 w-[18%] ${isCommission ? 'text-center' : 'text-right pr-2'}`}>{lang === 'en' ? 'Weight' : 'எடை'}</th>
              <th className="border-r border-[#0e6037] py-1 px-1 w-[10%] text-center">{lang === 'en' ? 'Bag' : 'பை'}</th>
              <th className="py-1 px-1 w-[20%] text-center">{lang === 'en' ? 'Amount' : 'தொகை'}</th>
            </tr>
          </thead>
          <tbody>
            {rawLines.map((l, index) => {
              const itemName = l.item_name_ta || l.item_name_en || l.item_name || '';
              const rateVal = Number(l.rate || 0);
              const weightNum = parseFloat(l.weight !== undefined && l.weight !== null ? l.weight : (l.qty || 0));
              const weightDisplay = weightNum > 0 ? weightNum.toFixed(2) : '—';
              const bagNum = (l.bag_count !== null && l.bag_count !== undefined && l.bag_count !== '')
                ? Number(l.bag_count)
                : (Number(l.nos) > 0 ? Number(l.nos) : (Number(l.bags) > 0 ? Number(l.bags) : 0));
              const bagDisplay = bagNum > 0 ? bagNum : '';
              const amountVal = l.amount !== undefined ? Number(l.amount) : (l.line_total !== undefined ? Number(l.line_total) : 0);

              let bagWeightsArray = [];
              if (Array.isArray(l.bag_weights)) {
                bagWeightsArray = l.bag_weights;
              } else if (typeof l.bag_weights === 'string' && l.bag_weights.trim() !== '') {
                try {
                  const parsed = JSON.parse(l.bag_weights);
                  if (Array.isArray(parsed)) bagWeightsArray = parsed;
                } catch (e) {}
              }
              const validBagWeights = bagWeightsArray
                .map((w) => (w !== '' && w !== null && !isNaN(Number(w)) ? Number(w) : null))
                .filter((w) => w !== null && w > 0);

              const weightBreakdownStr = validBagWeights.length > 1
                ? validBagWeights.map((w) => (w % 1 === 0 ? w.toString() : w.toFixed(2).replace(/\.?0+$/, ''))).join(' + ')
                : '';

              return (
                <tr key={l.id || l.key || index} className="font-medium align-top">
                  <td className={`border-r border-[#0e6037] ${isCompact ? 'py-0.5 px-1' : 'py-1 px-1'} ${isCommission ? 'text-center' : 'text-right pr-2'} font-mono font-bold text-xs align-top`}>
                    {rateVal > 0 ? rateVal.toFixed(2) : '—'}
                  </td>
                  <td className={`border-r border-[#0e6037] ${isCompact ? 'py-0.5 px-1' : 'py-1 px-1.5'} text-left align-top pl-2`}>
                    <div className="font-bold text-xs text-slate-900 leading-snug break-words">
                      {itemName}
                    </div>
                    {weightBreakdownStr && (
                      <div className="font-mono font-bold text-[11px] text-slate-800 tracking-wide mt-0.5 leading-tight whitespace-normal break-words">
                        {weightBreakdownStr}
                      </div>
                    )}
                  </td>
                  <td className={`border-r border-[#0e6037] ${isCompact ? 'py-0.5 px-1' : 'py-1 px-1'} ${isCommission ? 'text-center' : 'text-right pr-2'} font-mono font-bold text-xs align-top`}>
                    {weightDisplay}
                  </td>
                  <td className={`border-r border-[#0e6037] ${isCompact ? 'py-0.5 px-1' : 'py-1 px-1'} text-center font-mono font-bold text-xs text-slate-800 align-top`}>
                    {bagDisplay || ''}
                  </td>
                  <td className={`${isCompact ? 'py-0.5 px-2' : 'py-1 px-2.5'} text-right font-mono font-bold text-xs text-slate-900 align-top`}>
                    {amountVal > 0 ? formatIndian(amountVal) : '—'}
                  </td>
                </tr>
              );
            })}

            {/* In Commission mode: extend the vertical columns down to create the authentic Mandi bill book look */}
            {isCommission && (
              <tr style={{ height: `${Math.max(50, 160 - (rawLines.length * 24))}px` }}>
                <td className="border-r border-[#0e6037]"></td>
                <td className="border-r border-[#0e6037]"></td>
                <td className="border-r border-[#0e6037]"></td>
                <td className="border-r border-[#0e6037]"></td>
                <td></td>
              </tr>
            )}

            {/* 6. Totals & Deductions Breakdown */}
            {isCommission ? (
              <>
                {/* 1. விற்பனை தொகை : (Sales Total) */}
                <tr className="border-t border-[#0e6037] font-bold">
                  <td className="border-r border-[#0e6037]"></td>
                  <td colSpan={3} className="border-r border-[#0e6037] py-0.5 px-3 text-right font-bold text-xs text-slate-800 whitespace-nowrap">
                    {lang === 'en' ? 'Sales Total :' : 'விற்பனை தொகை :'}
                  </td>
                  <td className="py-0.5 px-2.5 text-right font-mono font-bold text-xs text-slate-900">
                    {formatIndian(itemsTotal)}
                  </td>
                </tr>

                {/* 2. Expense / Commission Detail Rows (Centered) */}
                {/* கமிஷன் (No percentage display) */}
                <tr className="font-bold">
                  <td className="border-r border-[#0e6037]"></td>
                  <td colSpan={2} className="border-r border-[#0e6037] py-0.5 px-2.5 text-left font-bold text-xs text-red-700 whitespace-nowrap">
                    {lang === 'en' ? 'Commission :' : 'கமிஷன் :'}
                  </td>
                  <td className="border-r border-[#0e6037] py-0.5 px-2 text-right font-mono font-bold text-xs text-slate-900">
                    {formatIndian(commissionVal)}
                  </td>
                  <td></td>
                </tr>

                {/* பற்று (if present) */}
                {patthuVal > 0 && (
                  <tr className="font-bold">
                    <td className="border-r border-[#0e6037]"></td>
                    <td colSpan={2} className="border-r border-[#0e6037] py-0.5 px-2.5 text-left font-bold text-xs text-red-700 whitespace-nowrap">
                      {lang === 'en' ? 'Patthu :' : 'பற்று :'}
                    </td>
                    <td className="border-r border-[#0e6037] py-0.5 px-2 text-right font-mono font-bold text-xs text-slate-900">
                      {formatIndian(patthuVal)}
                    </td>
                    <td></td>
                  </tr>
                )}

                {/* கூலி */}
                <tr className="font-bold">
                  <td className="border-r border-[#0e6037]"></td>
                  <td colSpan={2} className="border-r border-[#0e6037] py-0.5 px-2.5 text-left font-bold text-xs text-red-700 whitespace-nowrap">
                    {lang === 'en' ? 'Cooli :' : 'கூலி :'}
                  </td>
                  <td className="border-r border-[#0e6037] py-0.5 px-2 text-right font-mono font-bold text-xs text-slate-900">
                    {formatIndian(cooliVal)}
                  </td>
                  <td></td>
                </tr>

                {/* வாடகை */}
                <tr className="font-bold">
                  <td className="border-r border-[#0e6037]"></td>
                  <td colSpan={2} className="border-r border-[#0e6037] py-0.5 px-2.5 text-left font-bold text-xs text-red-700 whitespace-nowrap">
                    {lang === 'en' ? 'Vadagai :' : 'வாடகை :'}
                  </td>
                  <td className="border-r border-[#0e6037] py-0.5 px-2 text-right font-mono font-bold text-xs text-slate-900">
                    {formatIndian(vadagaiVal)}
                  </td>
                  <td></td>
                </tr>

                {/* 3. கழிவுகள் மொத்தம் : (No line above) */}
                <tr className="font-bold text-red-700">
                  <td className="border-r border-[#0e6037]"></td>
                  <td colSpan={3} className="border-r border-[#0e6037] py-0.5 px-3 text-right font-bold text-xs text-red-700 whitespace-nowrap">
                    {lang === 'en' ? 'Total Deductions :' : 'கழிவுகள் மொத்தம் :'}
                  </td>
                  <td className="py-0.5 px-2.5 text-right font-mono font-bold text-xs text-red-700">
                    (-) {formatIndian(totalDeductionsVal)}
                  </td>
                </tr>

                {/* 4. மொத்தம் ரூ = (Final Net Total) */}
                <tr className="border-t-2 border-[#0e6037] font-black">
                  <td className="border-r border-[#0e6037]"></td>
                  <td colSpan={3} className="border-r border-[#0e6037] py-1 px-3 text-right font-black text-sm text-[#0e6037] whitespace-nowrap">
                    {lang === 'en' ? 'Net Total :' : 'மொத்தம் ரூ ='}
                  </td>
                  <td className="py-1 px-2.5 text-right font-mono font-black text-sm text-[#0e6037]">
                    {formatIndian(netTotalVal)}
                  </td>
                </tr>
              </>
            ) : (
              /* Normal Bill Table Bottom Row: மொத்தம் */
              <>
                {discountVal > 0 && (
                  <tr className="border-t border-[#0e6037] text-rose-700 font-bold bg-rose-50/40">
                    <td className="border-r border-[#0e6037] py-1 px-3 text-right text-xs" colSpan={4}>
                      {lang === 'en' ? 'Discount :' : 'தள்ளுபடி :'}
                    </td>
                    <td className="py-1 px-2.5 text-right font-mono font-bold text-xs">
                      (-) {formatIndian(discountVal)}
                    </td>
                  </tr>
                )}
                {/* 1. மொத்தம் (Total) */}
                <tr className="font-black bg-[#e6f4ea] border-t-2 border-[#0e6037]">
                  <td className="border-r border-[#0e6037] py-1.5 px-3 text-right font-black text-sm text-[#0e6037]" colSpan={4}>
                    {lang === 'en' ? 'Total :' : 'மொத்தம் :'}
                  </td>
                  <td className="py-1.5 px-2.5 text-right font-mono font-black text-sm text-[#0e6037]">
                    {formatIndian(todayBillTotal)}
                  </td>
                </tr>

                {/* Mandi Account Summary Rows directly attached inside the table box (No gap) */}
                <tr className="border-t border-[#0e6037] bg-white">
                  <td colSpan={5} className="p-1.5">
                    <div className="grid grid-cols-12 gap-y-0.5 items-center font-bold text-xs">
                      <div className="col-span-5 text-right pr-2 text-slate-800">
                        {lang === 'en' ? 'Previous Balance' : 'முன் பற்று'}
                      </div>
                      <div className="col-span-1 text-center font-mono">:</div>
                      <div className="col-span-6 text-right font-mono font-bold pr-2.5 text-slate-900">
                        {formatIndian(munPartru)}
                      </div>

                      <div className="col-span-5 text-right pr-2 text-slate-800">
                        {lang === 'en' ? 'Received' : 'வரவு'}
                      </div>
                      <div className="col-span-1 text-center font-mono">:</div>
                      <div className="col-span-6 text-right font-mono font-bold pr-2.5 text-slate-900">
                        {formatIndian(varavu)}
                      </div>

                      <div className="col-span-5 text-right pr-2 text-sm text-[#0e6037] font-black pt-1 border-t border-[#0e6037]">
                        {lang === 'en' ? 'Total Due' : 'மொத்த பற்று'}
                      </div>
                      <div className="col-span-1 text-center font-mono text-sm text-[#0e6037] font-black pt-1 border-t border-[#0e6037]">
                        :
                      </div>
                      <div className="col-span-6 text-right font-mono font-black text-sm text-[#0e6037] pr-2.5 pt-1 border-t border-[#0e6037]">
                        {formatIndian(todayBillTotal + munPartru - varavu)}
                      </div>
                    </div>
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>

        {/* Bottom Section */}
        {isCommission ? (
          /* Commission Bill Bottom: Clean rounded stamp/seal outline box at bottom-left */
          <div className="pt-2 pb-0.5">
            <div className="w-28 h-7 border border-gray-300 rounded-md" />
          </div>
        ) : (
          bill.notes && (
            <div className="mt-1 text-[10px] text-gray-600 italic px-1">
              {lang === 'en' ? 'Notes:' : 'குறிப்பு:'} {bill.notes}
            </div>
          )
        )}

      </div>
    </div>
  );
}
