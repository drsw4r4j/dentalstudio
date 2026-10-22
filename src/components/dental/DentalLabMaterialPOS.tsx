import React, { useState } from 'react';
import { 
  mockDentalLabOrders, 
  mockDentalMaterials 
} from '../../data/mockData';
import { playBarcodeBeep } from '../../utils/audio';

interface DentalLabMaterialPOSProps {
  onOpenExaminationModal: () => void;
}

export const DentalLabMaterialPOS: React.FC<DentalLabMaterialPOSProps> = ({
  onOpenExaminationModal,
}) => {
  const [activeTab, setActiveTab] = useState<'lab-tracker' | 'stock-ledger' | 'ada-pos'>('ada-pos');
  const [labOrders, setLabOrders] = useState(mockDentalLabOrders);
  const [materials, setMaterials] = useState(mockDentalMaterials);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [barcodeScanned, setBarcodeScanned] = useState<string | null>(null);

  // ADA billing items for Eleanor Vance
  const billingItems = [
    { code: 'D3330', desc: 'Endodontic therapy, molar (Tooth #3)', fee: 720.00, insCovered: 576.00, ptCopay: 144.00 },
    { code: 'D2950', desc: 'Core build-up, including any pins', fee: 240.00, insCovered: 192.00, ptCopay: 48.00 },
    { code: 'D0220', desc: 'Intraoral - periapical first image', fee: 45.00, insCovered: 45.00, ptCopay: 0.00 },
    { code: 'D2740', desc: 'Crown - porcelain/ceramic (E-max CAD/CAM)', fee: 980.00, insCovered: 467.00, ptCopay: 513.00 },
  ];

  const grossTotal = billingItems.reduce((acc, i) => acc + i.fee, 0);
  const totalInsCoverage = billingItems.reduce((acc, i) => acc + i.insCovered, 0);
  const patientNetDue = billingItems.reduce((acc, i) => acc + i.ptCopay, 0);

  const handleSimulateScan = (lot: string) => {
    playBarcodeBeep();
    setBarcodeScanned(lot);
    setTimeout(() => setBarcodeScanned(null), 3000);
  };

  const handleProcessSettlement = () => {
    playBarcodeBeep();
    setPaymentSuccess(true);
    setTimeout(() => setPaymentSuccess(false), 5000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="material-symbols-outlined text-orange-600 text-[20px]">point_of_sale</span>
            Dental Practice ERP: CAD/CAM Labs, FEFO Ledger & ADA Billing
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            End-to-end prosthetic lab tracking, sterile chairside lot tracking, and ADA itemized claim co-pay settlements
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenExaminationModal}
            className="px-3.5 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-[17px]">add_circle</span>
            <span>+ Add Examination</span>
          </button>
        </div>
      </div>

      {/* Navigation Pills */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('ada-pos')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'ada-pos'
              ? 'bg-orange-600 text-white shadow-xs'
              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          <span className="material-symbols-outlined text-[17px]">receipt_long</span>
          <span>ADA Billing & Delta Dental Split</span>
        </button>

        <button
          onClick={() => setActiveTab('lab-tracker')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'lab-tracker'
              ? 'bg-orange-600 text-white shadow-xs'
              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          <span className="material-symbols-outlined text-[17px]">biotech</span>
          <span>External Lab & STL Tracker</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-purple-100 text-purple-800">
            {labOrders.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('stock-ledger')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'stock-ledger'
              ? 'bg-orange-600 text-white shadow-xs'
              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          <span className="material-symbols-outlined text-[17px]">inventory</span>
          <span>FEFO Chairside Sterile Stock</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-rose-100 text-rose-800">
            2 Alerts
          </span>
        </button>
      </div>

      {/* View 1: ADA POS Billing & Delta Dental Insurance Split */}
      {activeTab === 'ada-pos' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
              <div>
                <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider">
                  Encounter #DNT-2026-904
                </span>
                <h3 className="text-sm font-bold text-slate-900">
                  Itemized ADA Procedure Billing — Eleanor Vance
                </h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 block">Payer Carrier:</span>
                <span className="text-xs font-bold text-slate-800">Delta Dental Premier PPO (80/50 Split)</span>
              </div>
            </div>

            {paymentSuccess && (
              <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2 animate-bounce">
                <span className="material-symbols-outlined text-emerald-600 text-[20px]">task_alt</span>
                <span>
                  Payment Settled! $705.00 received via Dynamic UPI/PPO Co-Pay. Receipt sent to patient's WhatsApp.
                </span>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="py-2.5 px-3">ADA Code</th>
                    <th className="py-2.5 px-3">Clinical Description</th>
                    <th className="py-2.5 px-3 text-right">Gross Fee</th>
                    <th className="py-2.5 px-3 text-right text-emerald-700">Delta Dental (PPO)</th>
                    <th className="py-2.5 px-3 text-right text-orange-700">Patient Due</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {billingItems.map((item) => (
                    <tr key={item.code} className="hover:bg-slate-50">
                      <td className="py-3 px-3 font-mono font-bold text-slate-900">{item.code}</td>
                      <td className="py-3 px-3 text-slate-700">{item.desc}</td>
                      <td className="py-3 px-3 text-right font-mono">${item.fee.toFixed(2)}</td>
                      <td className="py-3 px-3 text-right font-mono font-semibold text-emerald-600">
                        -${item.insCovered.toFixed(2)}
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-orange-600">
                        ${item.ptCopay.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Total ADA Gross Fees:</span>
                <span className="font-mono font-bold">${grossTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Total Delta Dental PPO Pre-Authorized Settlement:</span>
                <span className="font-mono">-${totalInsCoverage.toFixed(2)}</span>
              </div>
              <div className="border-t border-slate-200 pt-2 flex justify-between text-base font-bold text-slate-900">
                <span>Net Balance Payable by Patient:</span>
                <span className="text-orange-600 font-mono font-black">${patientNetDue.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Terminal & Dynamic QR Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Instant POS Checkout
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Terminal #02
                </span>
              </div>

              {/* Dynamic QR Code Simulation */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center flex flex-col items-center">
                <div className="w-40 h-40 bg-white p-2 rounded-lg border border-slate-300 shadow-inner flex items-center justify-center">
                  <svg className="w-36 h-36" viewBox="0 0 100 100" fill="none">
                    <rect width="100" height="100" fill="white" />
                    <rect x="10" y="10" width="28" height="28" fill="#1e293b" />
                    <rect x="16" y="16" width="16" height="16" fill="white" />
                    <rect x="20" y="20" width="8" height="8" fill="#ea580c" />
                    
                    <rect x="62" y="10" width="28" height="28" fill="#1e293b" />
                    <rect x="68" y="16" width="16" height="16" fill="white" />
                    <rect x="72" y="20" width="8" height="8" fill="#ea580c" />

                    <rect x="10" y="62" width="28" height="28" fill="#1e293b" />
                    <rect x="16" y="68" width="16" height="16" fill="white" />
                    <rect x="20" y="72" width="8" height="8" fill="#ea580c" />

                    {/* QR Matrix Dots */}
                    <rect x="44" y="12" width="6" height="6" fill="#1e293b" />
                    <rect x="52" y="20" width="6" height="6" fill="#1e293b" />
                    <rect x="44" y="32" width="6" height="6" fill="#1e293b" />
                    <rect x="52" y="44" width="6" height="6" fill="#1e293b" />
                    <rect x="22" y="44" width="6" height="6" fill="#1e293b" />
                    <rect x="32" y="52" width="6" height="6" fill="#1e293b" />
                    <rect x="62" y="62" width="6" height="6" fill="#1e293b" />
                    <rect x="74" y="74" width="6" height="6" fill="#1e293b" />
                    <rect x="84" y="62" width="6" height="6" fill="#1e293b" />
                    <rect x="74" y="52" width="6" height="6" fill="#1e293b" />
                  </svg>
                </div>
                <span className="text-[11px] font-mono font-bold text-slate-800 mt-2">
                  Scan to Pay $705.00
                </span>
                <span className="text-[10px] text-slate-400">
                  Docplix Pay UPI • Apple Pay • Delta Co-Pay
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={handleProcessSettlement}
                className="w-full py-2.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-orange-600/25 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[17px]">credit_card</span>
                <span>Record $705.00 & Print Dental Receipt</span>
              </button>

              <button
                onClick={() => playBarcodeBeep()}
                className="w-full py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">qr_code_scanner</span>
                <span>Test Barcode Scanner Audio</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View 2: External CAD/CAM Lab Tracker */}
      {activeTab === 'lab-tracker' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Digital Lab Logistics & 3D Intraoral STL Pipeline
              </h3>
              <p className="text-[11px] text-slate-500">
                Trios 4 / MedIT intraoral scan sync with Apex Dental Lab & in-house milling machines
              </p>
            </div>

            <button
              onClick={() => alert('Trios 4 STL Scanner connected: Ready to import digital impression.')}
              className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">cloud_upload</span>
              <span>+ Push New 3D STL Scan</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {labOrders.map((order) => (
              <div
                key={order.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-purple-300 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                    {order.rxNumber}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {order.status}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-900">{order.patientName}</h4>
                  <div className="text-[11px] text-slate-600 font-medium mt-0.5">
                    {order.toothTarget}
                  </div>
                  <div className="text-[10px] text-purple-700 font-semibold mt-0.5">
                    Shade: {order.materialShade}
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 border-t border-slate-200/80 pt-2 space-y-1">
                  <div className="flex justify-between">
                    <span>Lab:</span>
                    <span className="font-semibold text-slate-700">{order.labPartner}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Impression:</span>
                    <span className="font-mono text-slate-700">{order.impressionType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Due:</span>
                    <span className="font-bold text-orange-600">{order.dueTime}</span>
                  </div>
                </div>

                <button
                  onClick={() => alert(`Marked Rx ${order.rxNumber} as received & transferred to Sterilization Autoclave.`)}
                  className="w-full py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] transition-colors cursor-pointer"
                >
                  Confirm Lab Intake & Sterilize
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View 3: FEFO Sterile Chairside Inventory Ledger */}
      {activeTab === 'stock-ledger' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                FEFO (First-Expired, First-Out) Chairside Sterile Ledger
              </h3>
              <p className="text-[11px] text-slate-500">
                Traceable implant serial numbers, bone graft lot IDs, and expiration thresholds
              </p>
            </div>

            {barcodeScanned && (
              <span className="px-3 py-1 rounded bg-emerald-100 text-emerald-800 font-mono text-xs font-bold animate-pulse">
                Scanned: {barcodeScanned}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {materials.map((mat) => (
              <div
                key={mat.id}
                className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                  mat.isCritical
                    ? 'border-rose-300 bg-rose-50/40 ring-1 ring-rose-200'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      {mat.category}
                    </span>
                    <span
                      className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${
                        mat.isCritical
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {mat.stockCount} {mat.stockUnit}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900">{mat.name}</h4>
                  <p className="text-[11px] text-slate-500 mt-1">{mat.description}</p>

                  <div className="mt-3 p-2 rounded bg-slate-50 border border-slate-200/60 text-[10px] font-mono text-slate-600 space-y-0.5">
                    <div>{mat.lotNumber}</div>
                    <div className="text-orange-600 font-semibold">{mat.expiryDate}</div>
                  </div>

                  {mat.criticalMessage && (
                    <div className="mt-2 text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-1 rounded">
                      {mat.criticalMessage}
                    </div>
                  )}
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100">
                  <button
                    onClick={() => handleSimulateScan(mat.lotNumber)}
                    className="w-full py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[15px]">qr_code_scanner</span>
                    <span>Verify Scan</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
