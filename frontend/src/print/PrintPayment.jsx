import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPayment } from '../api/payments';
import PaymentReceipt from '../components/PaymentReceipt';

export default function PrintPayment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    getPayment(id)
      .then((res) => {
        if (res) {
          setPayment(res.payment || res);
        }
      })
      .catch((err) => {
        console.error('Failed to load payment receipt:', err);
      });
  }, [id]);

  // Auto trigger print dialog once ready
  useEffect(() => {
    if (payment) {
      const timer = setTimeout(() => {
        window.print();
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [payment]);

  if (!payment) return <div className="p-8 text-center text-gray-500 font-bold">Loading Receipt...</div>;

  return (
    <div className="print-page-wrapper min-h-screen bg-slate-100 pb-12 print:p-0 print:m-0 print:bg-white print:min-h-0">
      <style>{`
        @page {
          size: A5 portrait;
          margin: 3mm;
        }
        @media print {
          html, body {
            height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
            background: #ffffff !important;
          }
          .no-print {
            display: none !important;
          }
          .print-page-wrapper {
            background: #ffffff !important;
            padding: 0 !important;
            margin: 0 !important;
            min-height: 0 !important;
            height: auto !important;
          }
          .print-container {
            padding: 0 !important;
            margin: 0 auto !important;
            max-width: 100% !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          .payment-receipt-template {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            margin: 0 auto !important;
            box-shadow: none !important;
            max-height: 98vh !important;
          }
        }
      `}</style>

      {/* Top Action Bar (Hidden on print) */}
      <div className="no-print sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm p-3 mb-6">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-3 text-sm">
          <button
            className="bg-slate-800 hover:bg-slate-900 text-white font-bold px-3.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 shadow transition-all"
            onClick={() => window.history.length > 1 ? navigate(-1) : navigate('/payments')}
            title="Return to previous page"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>பின்செல்க (Back)</span>
          </button>

          <button
            className="bg-blue-900 hover:bg-blue-950 text-white font-bold px-5 py-1.5 rounded-lg text-sm flex items-center gap-1.5 shadow"
            onClick={() => window.print()}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 002-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            <span>Print Receipt</span>
          </button>
        </div>
      </div>

      <div className="print-container max-w-xl mx-auto px-4">
        <PaymentReceipt payment={payment} />
      </div>
    </div>
  );
}
