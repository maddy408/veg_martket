import React from 'react';
import { formatINR, formatDateDMY, cleanTamilItem } from '../utils/format';
import { useSettings } from '../hooks/useSettings';

export default function SurandaiInvoice({ bill, settings = {}, isCommissionView, lang = 'ta' }) {
  if (!bill) return null;

  // Retrieve global settings from SettingsContext or localStorage
  let globalSettings = {};
  try {
    const hook = useSettings?.();
    if (hook && hook.settings) {
      globalSettings = hook.settings;
    }
  } catch (e) {
    // Graceful fallback outside provider
  }
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

  // Also check individual phone fields if array was empty
  if (!phones || phones.length === 0) {
    [effectiveSettings.phone, effectiveSettings.phone_1, effectiveSettings.phone_2, effectiveSettings.phone_3, effectiveSettings.mobile]
      .filter(Boolean)
      .forEach((p) => phones.push(p));
  }

  // Fallback defaults only if settings have completely never been configured
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
  const god1 = effectiveSettings.god_name_1 || 'ஸ்ரீ பவானி அம்மன் துணை';
  const god2 = effectiveSettings.god_name_2 || 'ஸ்ரீ பொட்டல் மாடசாமி';
  const brandLogo = effectiveSettings.logo_brand || 'VTC';
  const footerNote = effectiveSettings.footer_note || 'நன்றி! மீண்டும் வருக!';
  const gstin = effectiveSettings.gstin || effectiveSettings.gst_no || '';

  const customerName = bill.party_name || bill.walkin_name || bill.customer_name || '';
  const billNo = bill.bill_no || (bill.id ? `B-${bill.id}` : '—');
  
  // Format Date as DD.MM.YYYY matching South Indian physical bills
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

  // Calculations
  const itemsTotal = Number(bill.items_total !== undefined ? bill.items_total : (bill.subtotal !== undefined ? bill.subtotal : 0));
  const discountVal = Number(bill.discount_amount || bill.discount || 0);
  const prevBal = Number(bill.previous_balance !== undefined ? bill.previous_balance : (bill.prev_balance !== undefined ? bill.prev_balance : 0));
  const todayBillTotal = Math.max(0, itemsTotal - discountVal);
  const paidVal = Number(bill.paid_amount || 0);
  const munPartru = prevBal;
  const varavu = paidVal;
  const formatIndian = (num) => Number(num || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const paidForOldBalance = prevBal > 0 ? Math.max(0, Math.min(prevBal, paidVal - todayBillTotal)) : 0;
  const todayDueVal = Math.max(0, todayBillTotal - paidVal);
  const grandTotalVal = Number(bill.grand_total !== undefined ? bill.grand_total : (todayBillTotal + prevBal));
  const balanceDueVal = Number(bill.balance_due !== undefined ? bill.balance_due : (grandTotalVal - paidVal));

  const commissionVal = Number(bill.commission_amount || 0);
  const commissionMode = bill.commission_mode || (bill.commission_percent !== null && bill.commission_percent !== undefined ? 'percentage' : 'fixed');
  const patthuVal = Number(bill.patthu_amount || 0);
  const cooliVal = Number(bill.cooli_amount || 0);
  const vadagaiVal = Number(bill.vadagai_amount || 0);
  const otherDeductionVal = Number(bill.other_deduction_amount || 0);
  const totalDeductionsVal = commissionVal + patthuVal + cooliVal + vadagaiVal + otherDeductionVal;
  const netTotalVal = itemsTotal - totalDeductionsVal;

  // Prepare line items (keep spacer rows only for commission bill)
  const rawLines = bill.lines || bill.items || [];
  const minLines = isCommission ? 6 : 0;
  const lines = [...rawLines];
  while (lines.length < minLines) {
    lines.push({ is_empty: true, key: `empty-${lines.length}` });
  }

  // Split amount into Rupees and Paisa
  function splitRsPaisa(val) {
    if (val === undefined || val === null || val === '' || isNaN(val) || Number(val) === 0) {
      return { rs: '', paisa: '' };
    }
    const num = Number(val);
    const rs = Math.floor(Math.abs(num));
    const paisa = Math.round((Math.abs(num) - rs) * 100);
    const paisaStr = paisa > 0 ? String(paisa).padStart(2, '0') : '00';
    return {
      rs: (num < 0 ? '-' : '') + rs.toString(),
      paisa: paisaStr
    };
  }

  // ==============================================================
  // 1. COMMISSION BILL FORMAT (Exact Mandi Slip Matching User Image)
  // ==============================================================
  if (isCommission) {
    return (
      <div
        className="surandai-bhavani-template font-serif text-black bg-white p-2 w-full max-w-[142mm] mx-auto border-[2.5px] border-[#0e6037] relative select-none shadow-sm box-border"
        style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}
      >
        <div className="border border-[#0e6037] p-1.5 box-border">

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
              <span className="inline-block bg-[#dc2626] text-white font-serif font-black text-lg px-4 py-0.5 rounded-full tracking-wider shadow-sm border border-red-700 leading-tight">
                {brandLogo}
              </span>
            </div>

            {/* Right Deity Photo & Shop No Box */}
            <div className="flex items-center gap-1.5 z-10">
              <div className="flex justify-center items-center">
                <img
                  src="/images/god-maadasamy.png"
                  alt="ஸ்ரீ பொட்டல் மாடசாமி"
                  className="h-14 w-auto max-w-[42px] object-contain"
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
          <div className="text-center mt-0.5 mb-0.5">
            <h1 className="text-xl font-black text-red-600 tracking-wide font-sans leading-tight">
              {displayName || companyNameTa}
            </h1>
            {(address || location) && (
              <div className="text-xs font-bold text-[#0e6037] tracking-wider leading-tight">
                {[address, location].filter(Boolean).join(', ')}
              </div>
            )}
          </div>

          {/* Customer & Date Line (clean, red-marked borders removed, separated by table's top border) */}
          <div className="py-1 px-1 my-0.5 flex justify-between items-center text-xs font-bold">
            <div className="flex-1 truncate">
              <span className="text-[#0e6037]">உயர்திரு : </span>
              <span className="font-bold text-slate-900 px-1">
                {customerName || 'வாடிக்கையாளர்'}
              </span>
            </div>
            <div className="text-right shrink-0 font-bold text-slate-900 text-[11px]">
              <span className="text-[#0e6037]">தேதி : </span>
              <span className="font-mono">{formattedDate}</span>
            </div>
          </div>

          {/* Mandi Items Table matching user slip photo: விலை, பொருள் விபரம், எடை, பை, தொகை */}
          <table className="w-full table-fixed border-collapse text-xs border border-[#0e6037] box-border">
            <thead>
              <tr className="bg-[#e6f4ea] text-[#0e6037] border-b border-[#0e6037] text-center font-bold">
                <th className="border-r border-[#0e6037] py-1.5 px-2 w-[15%] text-right pr-2">விலை</th>
                <th className="border-r border-[#0e6037] py-1.5 px-2 w-[37%] text-left pl-2">பொருள் விபரம்</th>
                <th className="border-r border-[#0e6037] py-1.5 px-1 w-[18%] text-center">எடை</th>
                <th className="border-r border-[#0e6037] py-1.5 px-1 w-[12%] text-center">பை</th>
                <th className="py-1.5 px-2 w-[18%] text-right pr-2">தொகை</th>
              </tr>
            </thead>
            <tbody>
              {lines.map((l, index) => {
                if (l.is_empty) {
                  return (
                    <tr key={`empty-${index}`} className="h-6 border-none" style={{ border: 'none', borderBottom: 'none' }}>
                      <td className="border-r border-[#0e6037] px-2">&nbsp;</td>
                      <td className="border-r border-[#0e6037] px-2">&nbsp;</td>
                      <td className="border-r border-[#0e6037] px-2">&nbsp;</td>
                      <td className="border-r border-[#0e6037] px-2">&nbsp;</td>
                      <td className="px-2">&nbsp;</td>
                    </tr>
                  );
                }

                const cleanItem = cleanTamilItem(l.item_name_ta, l.item_name_en);
                const itemName = isTamil
                  ? (cleanItem.includes(' / ') ? cleanItem.split(' / ')[0] : cleanItem)
                  : (l.item_name_en || cleanItem || l.item_name || '');
                const rateVal = l.rate ? Number(l.rate) : 0;
                const weightNum = parseFloat(l.weight !== undefined && l.weight !== null ? l.weight : (l.qty !== undefined ? l.qty : 0));
                const weightDisplay = weightNum > 0 ? weightNum.toFixed(2) : '—';
                const bagNum = (l.bag_count !== null && l.bag_count !== undefined && l.bag_count !== '')
                  ? Number(l.bag_count)
                  : (parseFloat(l.nos !== undefined && l.nos !== null ? l.nos : (l.bags !== undefined ? l.bags : 0)) || 0);
                const bagDisplay = bagNum > 0 ? bagNum : '';

                const amountVal = l.amount !== undefined ? Number(l.amount) : (l.line_total !== undefined ? Number(l.line_total) : 0);

                return (
                  <tr key={l.id || l.key || index} className="border-none font-medium" style={{ border: 'none', borderBottom: 'none' }}>
                    <td className="border-r border-[#0e6037] py-2 px-2 text-right font-mono font-bold text-xs pr-2">
                      {rateVal > 0 ? rateVal.toFixed(2) : '—'}
                    </td>
                    <td className="border-r border-[#0e6037] py-2 px-2 text-left font-bold text-xs truncate pl-2">
                      {itemName}
                    </td>
                    <td className="border-r border-[#0e6037] py-2 px-1 text-center font-mono font-bold text-xs">
                      {weightDisplay}
                    </td>
                    <td className="border-r border-[#0e6037] py-2 px-1 text-center font-mono font-bold text-xs text-slate-800">
                      {bagDisplay || ''}
                    </td>
                    <td className="py-2 px-2 text-right font-mono font-bold text-xs pr-2">
                      {amountVal > 0 ? amountVal.toFixed(2) : '—'}
                    </td>
                  </tr>
                );
              })}

              {/* If deductions exist, show items subtotal, deductions breakdown, and final net total */}
              {totalDeductionsVal > 0 ? (
                <>
                  {/* Gross Items Subtotal Row - joins black marked vertical line after Col 2 */}
                  <tr className="border-t-2 border-[#0e6037] font-bold bg-[#f7faf8]">
                    <td className="border-r border-[#0e6037]" colSpan={2}></td>
                    <td className="border-r border-[#0e6037] py-1 px-3 text-right font-bold text-xs" colSpan={2}>
                      மொத்தம் &nbsp;:
                    </td>
                    <td className="py-1 px-2 text-right font-mono font-bold text-xs pr-2">
                      {itemsTotal.toFixed(2)}
                    </td>
                  </tr>

                  {/* Commission Mandi Breakdown Rows - joined vertical border after Col 2 */}
                  <tr className="border-none" style={{ border: 'none', borderBottom: 'none' }}>
                    <td className="border-r border-[#0e6037]" colSpan={2}></td>
                    <td className="border-r border-[#0e6037] py-0.5 px-3 text-right font-bold text-red-700 text-xs" colSpan={2}>
                      கமிஷன்
                    </td>
                    <td className="py-0.5 px-2 text-right font-mono font-bold text-xs pr-2">
                      {commissionVal > 0 ? commissionVal.toFixed(2) : '0.00'}
                    </td>
                  </tr>

                  <tr className="border-none" style={{ border: 'none', borderBottom: 'none' }}>
                    <td className="border-r border-[#0e6037]" colSpan={2}></td>
                    <td className="border-r border-[#0e6037] py-0.5 px-3 text-right font-bold text-red-700 text-xs" colSpan={2}>
                      பற்று
                    </td>
                    <td className="py-0.5 px-2 text-right font-mono font-bold text-xs pr-2">
                      {patthuVal > 0 ? patthuVal.toFixed(2) : '0.00'}
                    </td>
                  </tr>

                  <tr className="border-none" style={{ border: 'none', borderBottom: 'none' }}>
                    <td className="border-r border-[#0e6037]" colSpan={2}></td>
                    <td className="border-r border-[#0e6037] py-0.5 px-3 text-right font-bold text-red-700 text-xs" colSpan={2}>
                      கூலி
                    </td>
                    <td className="py-0.5 px-2 text-right font-mono font-bold text-xs pr-2">
                      {cooliVal > 0 ? cooliVal.toFixed(2) : '0.00'}
                    </td>
                  </tr>

                  <tr className="border-none" style={{ border: 'none', borderBottom: 'none' }}>
                    <td className="border-r border-[#0e6037]" colSpan={2}></td>
                    <td className="border-r border-[#0e6037] py-0.5 px-3 text-right font-bold text-red-700 text-xs" colSpan={2}>
                      வாடகை
                    </td>
                    <td className="py-0.5 px-2 text-right font-mono font-bold text-xs pr-2">
                      {vadagaiVal > 0 ? vadagaiVal.toFixed(2) : '0.00'}
                    </td>
                  </tr>

                  {otherDeductionVal > 0 && (
                    <tr className="border-none" style={{ border: 'none', borderBottom: 'none' }}>
                      <td className="border-r border-[#0e6037]" colSpan={2}></td>
                      <td className="border-r border-[#0e6037] py-0.5 px-3 text-right font-bold text-red-700 text-xs" colSpan={2}>
                        இதர கழிவு
                      </td>
                      <td className="py-0.5 px-2 text-right font-mono font-bold text-xs pr-2">
                        {otherDeductionVal.toFixed(2)}
                      </td>
                    </tr>
                  )}

                  {/* Net Grand Total Row (Intermediate 'கழிவுகள் மொத்தம்' removed as requested by red mark) */}
                  <tr className="font-black bg-[#e6f4ea] border-t-2 border-[#0e6037]">
                    <td className="border-r border-[#0e6037]" colSpan={2}></td>
                    <td className="border-r border-[#0e6037] py-1.5 px-3 text-right font-black text-sm text-[#0e6037]" colSpan={2}>
                      மொத்தம் &nbsp;&nbsp;:
                    </td>
                    <td className="py-1.5 px-2 text-right font-mono font-black text-sm text-[#0e6037] pr-2">
                      {netTotalVal.toFixed(2)}
                    </td>
                  </tr>
                </>
              ) : (
                /* No Deductions: Simple Grand Total row matching user photo */
                <tr className="font-black bg-[#e6f4ea] border-t-2 border-[#0e6037]">
                  <td className="border-r border-[#0e6037]" colSpan={2}></td>
                  <td className="border-r border-[#0e6037] py-1.5 px-3 text-right font-black text-sm text-[#0e6037]" colSpan={2}>
                    மொத்தம் &nbsp;&nbsp;:
                  </td>
                  <td className="py-1.5 px-2 text-right font-mono font-black text-sm text-[#0e6037] pr-2">
                    {itemsTotal.toFixed(2)}
                  </td>
                </tr>
              )}
            </tbody>
          </table>


          {/* Footer Section matching user image */}
          <div className="mt-2 flex items-center justify-between text-[9px] gap-2">
            
            {/* Left Empty Box for Seal / Signature */}
            <div className="border border rounded w-36 h-9 min-h-[36px]" />

            {/* Right POS / GST Notes */}
           
          </div>

         

        </div>
      </div>
    );
  }

  // ==============================================================
  // 2. NORMAL BILL FORMAT (Enhanced for Retail / Wholesale)
  // Preserves same sacred temple banner & contacts, clean itemized totals
  // ==============================================================
  return (
    <div
      className="surandai-bhavani-template font-serif text-black bg-white p-2 w-full max-w-[142mm] mx-auto border-[2.5px] border-[#0e6037] relative select-none shadow-sm box-border"
      style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}
    >
      <div className="border border-[#0e6037] p-1.5 box-border">

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
            <span className="inline-block bg-[#dc2626] text-white font-serif font-black text-lg px-4 py-0.5 rounded-full tracking-wider shadow-sm border border-red-700 leading-tight">
              {brandLogo}
            </span>
          </div>

          {/* Right Deity Photo & Shop No Box */}
          <div className="flex items-center gap-1.5 z-10">
            <div className="flex justify-center items-center">
              <img
                src="/images/god-maadasamy.png"
                alt="ஸ்ரீ பொட்டல் மாடசாமி"
                className="h-14 w-auto max-w-[42px] object-contain"
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
        <div className="text-center mt-0.5 mb-0.5">
          <h1 className="text-xl font-black text-red-600 tracking-wide font-sans leading-tight">
            {displayName || companyNameTa}
          </h1>
          {(address || location) && (
            <div className="text-xs font-bold text-[#0e6037] tracking-wider leading-tight">
              {[address, location].filter(Boolean).join(', ')}
            </div>
          )}
        </div>

        {/* Customer & Bill No Bar (clean, red-marked borders removed, separated by table's top border) */}
        <div className="py-1 px-1 my-0.5 flex justify-between items-center text-xs font-bold">
          <div className="flex-1 truncate">
            <span className="text-[#0e6037]">உயர்திரு : </span>
            <span className="font-bold text-slate-900 px-1">
              {customerName || 'வாடிக்கையாளர்'}
            </span>
          </div>
          <div className="text-right shrink-0 flex items-center gap-2 font-bold text-[11px]">
            <div><span className="text-[#0e6037]">பில்:</span> <span className="font-mono">{billNo}</span></div>
            <div>• <span className="text-[#0e6037]">தேதி:</span> <span className="font-mono">{formattedDate}</span></div>
          </div>
        </div>

        {/* Normal Bill Items Table (Order: Rate -> Item -> Kg -> Amount, No Middle Empty Rows) */}
        {/* Normal Bill Items Table matching user slip photo: விலை, பொருள் விபரம், எடை, பை, தொகை */}
        <table className="w-full table-fixed border-collapse text-xs border border-[#0e6037] box-border">
          <thead>
            <tr className="bg-[#e6f4ea] text-[#0e6037] border-b border-[#0e6037] text-center font-bold">
              <th className="border-r border-[#0e6037] py-1.5 px-2 w-[15%] text-right pr-2">விலை</th>
              <th className="border-r border-[#0e6037] py-1.5 px-2 w-[37%] text-left pl-2">பொருள் விபரம்</th>
              <th className="border-r border-[#0e6037] py-1.5 px-1 w-[18%] text-center">எடை</th>
              <th className="border-r border-[#0e6037] py-1.5 px-1 w-[12%] text-center">பை</th>
              <th className="py-1.5 px-2 w-[18%] text-right pr-2">தொகை</th>
            </tr>
          </thead>
          <tbody>
            {lines.map((l, index) => {
              if (l.is_empty) {
                return (
                  <tr key={`empty-${index}`} className="h-6 border-none" style={{ border: 'none', borderBottom: 'none' }}>
                    <td className="border-r border-[#0e6037]">&nbsp;</td>
                    <td className="border-r border-[#0e6037]">&nbsp;</td>
                    <td className="border-r border-[#0e6037]">&nbsp;</td>
                    <td className="border-r border-[#0e6037]">&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                );
              }

              const cleanItem = cleanTamilItem(l.item_name_ta, l.item_name_en);
              const itemName = isTamil
                ? (cleanItem.includes(' / ') ? cleanItem.split(' / ')[0] : cleanItem)
                : (l.item_name_en || cleanItem || l.item_name || '');
              const weightNum = parseFloat(l.weight !== undefined && l.weight !== null ? l.weight : (l.qty || 1));
              const weightDisplay = weightNum > 0 ? weightNum.toFixed(2) : '—';
              const bagNum = (l.bag_count !== null && l.bag_count !== undefined && l.bag_count !== '')
                ? Number(l.bag_count)
                : (parseFloat(l.nos !== undefined && l.nos !== null ? l.nos : (l.bags !== undefined ? l.bags : 0)) || 0);
              const bagDisplay = bagNum > 0 ? bagNum : '';
              const rateVal = Number(l.rate || 0).toFixed(2);
              const amountVal = l.amount !== undefined ? Number(l.amount) : (l.line_total !== undefined ? Number(l.line_total) : 0);

              return (
                <tr key={l.id || l.key || index} className="font-medium hover:bg-transparent border-none" style={{ border: 'none', borderBottom: 'none' }}>
                  <td className="border-r border-[#0e6037] py-1 px-1.5 text-right font-mono font-bold text-xs pr-2">
                    {rateVal}
                  </td>
                  <td className="border-r border-[#0e6037] py-1 px-2 text-left font-bold text-xs truncate pl-2">
                    {itemName}
                  </td>
                  <td className="border-r border-[#0e6037] py-1 px-1 text-center font-mono font-bold text-xs">
                    {weightDisplay}
                  </td>
                  <td className="border-r border-[#0e6037] py-1 px-1 text-center font-mono font-bold text-xs text-slate-800">
                    {bagDisplay || ''}
                  </td>
                  <td className="py-1 px-1.5 text-right font-mono font-bold text-xs pr-2">
                    {amountVal.toFixed(2)}
                  </td>
                </tr>
              );
            })}

            {discountVal > 0 && (
              <tr className="border-t border-[#0e6037] text-red-600 font-bold">
                <td className="border-r border-[#0e6037] py-1 px-3 text-right text-xs" colSpan={4}>
                  தள்ளுபடி &nbsp;:
                </td>
                <td className="py-1 px-2 text-right font-mono font-bold text-xs pr-2">
                  - {discountVal.toFixed(2)}
                </td>
              </tr>
            )}

            <tr className="font-black bg-[#e6f4ea] border-t-2 border-[#0e6037]">
              <td className="border-r border-[#0e6037] py-1.5 px-3 text-right font-black text-sm text-[#0e6037]" colSpan={4}>
                மொத்தம் &nbsp;&nbsp;:
              </td>
              <td className="py-1.5 px-2 text-right font-mono font-black text-sm text-[#0e6037] pr-2">
                {todayBillTotal.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Mandi Balance Summary Box matching user receipt photo: முன் பற்று, வரவு, மொத்த பற்று */}
        <div className="mt-1.5 px-2 py-1 bg-white text-xs">
          <div className="grid grid-cols-12 gap-y-1 items-center font-bold">
            <div className="col-span-5 text-right pr-2 text-slate-800">முன் பற்று:</div>
            <div className="col-span-1 text-center font-mono">:</div>
            <div className="col-span-6 text-right font-mono font-bold pr-2 text-slate-900">
              {munPartru.toFixed(2)}
            </div>

            <div className="col-span-5 text-right pr-2 text-slate-800">வரவு</div>
            <div className="col-span-1 text-center font-mono">:</div>
            <div className="col-span-6 text-right font-mono font-bold pr-2 text-slate-900">
              {varavu.toFixed(2)}
            </div>

            <div className="col-span-5 text-right pr-2 text-sm text-[#0e6037] font-black pt-1 pb-1">
              மொத்த பற்று:
            </div>
            <div className="col-span-1 text-center font-mono text-sm text-[#0e6037] font-black pt-1 pb-1">
              :
            </div>
            <div className="col-span-6 text-right font-mono font-black text-sm text-[#0e6037] pr-2 pt-1 pb-1 border-t border-b border-[#0e6037]">
              {formatIndian((todayBillTotal + munPartru) - varavu)}
            </div>
          </div>
        </div>

        {bill.notes && (
          <div className="mt-1 text-[10px] text-gray-600 italic px-1">
            குறிப்பு: {bill.notes}
          </div>
        )}

        {/* Footer Section */}
        <div className="mt-2 flex items-center justify-between text-[9px] gap-2">
          
          {/* Left Empty Box for Seal / Signature */}
          <div className="border border rounded w-36 h-9 min-h-[36px]" />

          {/* Right POS / GST Notes */}
          <div className="text-right leading-tight text-slate-700">
           
          </div>

        </div>

        {/* Bottom Terms */}
        

      </div>
    </div>
  );
}
