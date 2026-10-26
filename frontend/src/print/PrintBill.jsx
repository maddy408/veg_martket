import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { getBillPrint } from '../api/bills';
import SurandaiInvoice from '../components/SurandaiInvoice';
import './printBill.css';

export default function PrintBill() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [payload, setPayload] = useState(null);
  const [error, setError] = useState(null);
  const [formatMode, setFormatMode] = useState(null); // 'commission' | 'normal' | null
  const [language, setLanguage] = useState(params.get('lang') || 'ta');
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    const forcedLang = params.get('lang');
    getBillPrint(id)
      .then((res) => {
        setPayload(res);
        if (forcedLang) {
          setLanguage(forcedLang);
        } else if (res && res.settings && res.settings.invoice_language) {
          setLanguage(res.settings.invoice_language);
        }
      })
      .catch((err) => {
        console.error('Failed to load bill:', err);
        setError(err.response?.data?.error || 'Failed to load invoice');
      });
  }, [id, params]);

  // Automatically trigger print dialog when invoice is ready
  useEffect(() => {
    if (payload) {
      const runPrint = () => {
        const timer = setTimeout(() => {
          window.print();
        }, 400);
        return () => clearTimeout(timer);
      };
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(runPrint);
      } else {
        runPrint();
      }
    }
  }, [payload]);

  if (error) {
    return (
      <div className="p-8 text-center text-red-600 font-bold">
        <div>{error}</div>
        <button
          className="mt-4 bg-slate-800 text-white font-bold px-4 py-2 rounded-lg text-xs"
          onClick={() => navigate('/invoices')}
        >
          Return to Invoices
        </button>
      </div>
    );
  }

  if (!payload) return <div className="p-8 text-center text-gray-500 font-bold">Loading Invoice...</div>;

  const { bill, settings } = payload;
  const paperFormat = params.get('format') || settings.default_print_format || 'afx';
  const modeParam = params.get('mode');
  const activeIsCommission = formatMode !== null 
    ? formatMode === 'commission' 
    : (modeParam ? modeParam === 'commission' : bill.bill_type === 'commission');

  return (
    <div className="print-page-wrapper min-h-screen bg-slate-100 pb-12 print:p-0 print:m-0 print:bg-white print:min-h-0 print:h-auto">
      {/* Dynamic Overrides only when switching away from default AFX 120mm x 200mm */}
      {paperFormat !== 'afx' && (
        <style>{`
          @page {
            size: ${paperFormat === 'a4' ? 'A4 portrait' : paperFormat === 'slip' ? '80mm auto' : 'A5 portrait'};
            margin: ${paperFormat === 'slip' ? '0' : '3mm'};
          }
          @media print {
            html, body, .print-page-wrapper, .print-container {
              width: ${paperFormat === 'a4' ? '210mm' : paperFormat === 'slip' ? '80mm' : '148mm'} !important;
              min-width: ${paperFormat === 'a4' ? '210mm' : paperFormat === 'slip' ? '80mm' : '148mm'} !important;
              max-width: ${paperFormat === 'a4' ? '210mm' : paperFormat === 'slip' ? '80mm' : '148mm'} !important;
              display: block !important;
              height: auto !important;
              min-height: 0 !important;
            }
            .surandai-bhavani-template {
              width: ${paperFormat === 'a4' ? '190mm' : paperFormat === 'slip' ? '76mm' : '142mm'} !important;
              min-width: ${paperFormat === 'a4' ? '190mm' : paperFormat === 'slip' ? '76mm' : '142mm'} !important;
              max-width: ${paperFormat === 'a4' ? '190mm' : paperFormat === 'slip' ? '76mm' : '142mm'} !important;
              min-height: auto !important;
              height: auto !important;
              display: block !important;
            }
          }
        `}</style>
      )}

      {/* Top Action & Mode Selector Bar (Hidden on Print) */}
      <div className="no-print sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm p-3 mb-6">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3 text-sm">
          
          {/* Back Button */}
          <button
            className="bg-slate-800 hover:bg-slate-900 text-white font-bold px-3.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 shadow transition-all"
            onClick={() => window.history.length > 1 ? navigate(-1) : navigate('/invoices')}
            title="Return to previous page"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>பின்செல்க (Back)</span>
          </button>

          {/* Format Mode Selector */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-700 text-xs">பில் வடிவம்:</span>
            <button
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeIsCommission 
                  ? 'bg-blue-900 text-white shadow' 
                  : 'bg-gray-100 text-gray-700 border hover:bg-gray-200'
              }`}
              onClick={() => setFormatMode('commission')}
            >
              கமிஷன் பில் (Commission)
            </button>
            <button
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                !activeIsCommission 
                  ? 'bg-blue-900 text-white shadow' 
                  : 'bg-gray-100 text-gray-700 border hover:bg-gray-200'
              }`}
              onClick={() => setFormatMode('normal')}
            >
              சாதாரண பில் (Normal)
            </button>
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-1.5">
            <button
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                language === 'ta' ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-700 border'
              }`}
              onClick={() => setLanguage('ta')}
            >
              தமிழ்
            </button>
            <button
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                language === 'en' ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-700 border'
              }`}
              onClick={() => setLanguage('en')}
            >
              English
            </button>
          </div>

          {/* Paper Size Selector */}
          <div className="flex items-center gap-1.5">
            {['afx', 'a5', 'slip', 'a4'].map((f) => (
              <button
                key={f}
                className={`px-2.5 py-1 rounded-lg text-xs uppercase font-bold transition-all ${
                  f === paperFormat ? 'bg-slate-900 text-white shadow' : 'bg-gray-100 text-gray-700 border hover:bg-gray-200'
                }`}
                onClick={() => setParams({ format: f })}
              >
                {f === 'afx' ? 'AFX (120×200)' : f === 'a5' ? 'A5' : f === 'slip' ? 'Slip' : 'A4'}
              </button>
            ))}
            {paperFormat === 'afx' && (
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-[#0e6037] border border-emerald-300">
                120 mm × 200 mm
              </span>
            )}
          </div>

          {/* Action Group: Print Guide & Print Button */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 shadow-xs transition-all"
              onClick={() => setShowGuide(!showGuide)}
              title="Windows Printer Driver & Chrome Settings Guide"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>அச்சு வழிகாட்டி (Guide)</span>
            </button>

            <button
              className="bg-blue-900 hover:bg-blue-950 text-white font-bold px-5 py-1.5 rounded-lg text-sm flex items-center gap-1.5 shadow"
              onClick={() => window.print()}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 002-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print Bill
            </button>
          </div>
        </div>

        {/* Windows & Chrome Print Setup Guide Dropdown */}
        {showGuide && (
          <div className="max-w-5xl mx-auto mt-3 p-4 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 shadow-inner">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200 mb-2.5">
              <span className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                🖨️ Windows Chrome Print Setup for Custom AFX Paper (120 mm × 200 mm)
              </span>
              <button
                className="text-gray-500 hover:text-black font-bold px-2 py-0.5 rounded bg-white border"
                onClick={() => setShowGuide(false)}
              >
                ✕ Close
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <div className="font-bold text-[#0e6037] mb-1">1. Chrome Print Dialog</div>
                <ul className="list-disc list-inside space-y-1 text-slate-700">
                  <li><strong>Destination:</strong> Your Printer or <em>Save as PDF</em></li>
                  <li><strong>Paper size:</strong> AFX (or 120 × 200 mm)</li>
                  <li><strong>Margins:</strong> None (CSS margin is 0)</li>
                  <li><strong>Scale:</strong> Default (100%)</li>
                  <li><strong>Options:</strong> Enable <em>Background graphics</em>, disable <em>Headers & footers</em></li>
                </ul>
              </div>

              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <div className="font-bold text-blue-900 mb-1">2. Windows Driver Custom Paper</div>
                <p className="mb-1 text-slate-600">If "AFX" is missing in Chrome printer paper list:</p>
                <ol className="list-decimal list-inside space-y-1 text-slate-700">
                  <li>Open <code>Win + R</code> &gt; <code>control printers</code></li>
                  <li>Select printer &gt; click <strong>Print server properties</strong></li>
                  <li>Check <em>Create a new form</em> &gt; Name: <code>AFX</code></li>
                  <li>Width: <strong>12.00 cm</strong>, Height: <strong>20.00 cm</strong></li>
                  <li>Margins: 0.00 cm &gt; Click <strong>Save Form</strong></li>
                  <li>In Printing Preferences, set default paper to <strong>AFX</strong></li>
                </ol>
              </div>

              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <div className="font-bold text-amber-800 mb-1">3. Fallback (If Driver Rejects Custom Size)</div>
                <p className="mb-1 text-slate-600">Some budget printers do not allow custom forms:</p>
                <ul className="list-disc list-inside space-y-1 text-slate-700">
                  <li><strong>Save as PDF:</strong> Select "Save as PDF" in Chrome dialog. Chrome generates an exact 120×200 mm PDF document.</li>
                  <li><strong>A5 Preset:</strong> Click the "A5" format button above (A5 is 148×210 mm, very close to 120×200 mm).</li>
                  <li><strong>Acrobat:</strong> Open the PDF in Adobe Acrobat and choose <em>Actual Size</em>.</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Print Container */}
      <div className="print-container max-w-xl mx-auto px-4 flex justify-center print:block print:p-0 print:m-0 print:w-full">
        <SurandaiInvoice
          bill={bill}
          settings={settings}
          isCommissionView={activeIsCommission}
          lang={language}
          paperFormat={paperFormat}
        />
      </div>
    </div>
  );
}
