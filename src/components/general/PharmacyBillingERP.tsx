import React, { useState } from 'react';
import { PharmacyStockItem } from '../../types';
import { mockPharmacyStock } from '../../data/mockData';
import { playScannerBeep } from '../../utils/audio';

export const PharmacyBillingERP: React.FC = () => {
  const [stockItems, setStockItems] = useState<PharmacyStockItem[]>(mockPharmacyStock);
  const [barcodeValue, setBarcodeValue] = useState('08901239018274');
  const [scannerMatched, setScannerMatched] = useState(false);
  const [paymentMode, setPaymentMode] = useState<'upi' | 'card' | 'cash' | 'wallet'>('upi');
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [activePatientRx, setActivePatientRx] = useState('vance');
  const [discountApplied, setDiscountApplied] = useState(true);

  const handleVerifyBarcode = () => {
    playScannerBeep();
    setScannerMatched(true);
    setTimeout(() => setScannerMatched(false), 3000);
  };

  const updateQuantity = (id: string, qty: number) => {
    setStockItems(stockItems.map(item => item.id === id ? { ...item, prescribedQuantity: Math.max(1, qty) } : item));
  };

  const handleCompletePayment = () => {
    playScannerBeep();
    setPaymentCompleted(true);
    setTimeout(() => setPaymentCompleted(false), 4000);
  };

  const rxSubtotal = stockItems.reduce((acc, curr) => acc + curr.prescribedQuantity * curr.unitPrice, 0) + 6.50;
  const consultationFee = 85.00;
  const labFee = 45.00;
  const grossSubtotal = rxSubtotal + consultationFee + labFee;
  const discount = discountApplied ? 11.50 : 0;
  const tax = 5.75;
  const totalPayable = grossSubtotal - discount + tax;
  const insurerCoverage = totalPayable * 0.8;
  const patientCoPay = totalPayable * 0.2;

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Top Operational Context Strip */}
      <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 shadow-xs flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">ERP Hub</span>
            <span className="material-symbols-outlined text-[13px] text-slate-400">chevron_right</span>
            <span className="font-bold text-teal-800">POS Billing & Dispensary Terminal</span>
            <span className="inline-flex items-center gap-1 ml-2 px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-mono text-[10px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-ping"></span>
              Terminal #02 (Live POS Active)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-slate-500 text-[11px]">GSTIN: 07AAAAC1203Q1Z8</span>
            <div className="h-3 w-px bg-slate-200"></div>
            <button 
              onClick={() => alert('Drug inventory synced with central hospital warehouse.')}
              className="inline-flex items-center gap-1 text-teal-700 hover:text-teal-900 font-semibold text-xs"
            >
              <span className="material-symbols-outlined text-[15px]">sync</span>
              Sync Drug Inventory
            </button>
          </div>
        </div>

        {/* 4 KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 pt-1">
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-[10px] uppercase font-bold">Today's Collections</span>
              <span className="material-symbols-outlined text-[18px] text-teal-700">account_balance_wallet</span>
            </div>
            <div className="flex items-baseline gap-2 my-0.5">
              <span className="text-xl font-bold font-mono text-slate-900">$6,420.50</span>
              <span className="text-[11px] font-bold text-teal-700">+14.2%</span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-100 font-mono">
              <span>Cash: $1,280</span>
              <span>Card: $4,140</span>
              <span>TPA: $1,000</span>
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-indigo-700">
              <span className="text-[10px] uppercase font-bold">Active Prescriptions</span>
              <span className="material-symbols-outlined text-[18px] text-indigo-600">prescriptions</span>
            </div>
            <div className="flex items-baseline gap-2 my-0.5">
              <span className="text-xl font-bold font-mono text-indigo-700">7 Pending</span>
              <span className="text-xs text-slate-500">in dispensary</span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-600">
              <span className="bg-teal-50 text-teal-800 px-1.5 py-0.5 rounded font-semibold text-[10px]">
                3 Ready for Pickup
              </span>
              <span className="font-mono text-slate-400">Avg: 4.2 min</span>
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-rose-700">
              <span className="text-[10px] uppercase font-bold">Low Stock Alerts</span>
              <span className="material-symbols-outlined text-[18px] text-rose-600">notification_important</span>
            </div>
            <div className="flex items-baseline gap-2 my-0.5">
              <span className="text-xl font-bold font-mono text-rose-600">4 Critical</span>
              <span className="text-xs text-slate-500">below reorder bar</span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span className="text-rose-600 truncate max-w-[130px]">Atorvastatin, Glargine</span>
              <button onClick={() => alert('Auto Purchase Orders dispatched to SunPharma.')} className="text-teal-700 underline font-semibold">Auto-PO</button>
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-[10px] uppercase font-bold">Insurance Claims Review</span>
              <span className="material-symbols-outlined text-[18px] text-slate-400">verified_user</span>
            </div>
            <div className="flex items-baseline gap-2 my-0.5">
              <span className="text-xl font-bold font-mono text-slate-900">$1,840.00</span>
              <span className="text-xs text-slate-500">2 Claims</span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-600">
              <span className="text-slate-500">BlueCross & MediCare</span>
              <span className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-mono font-bold text-[10px]">Pre-Auth OK</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Split Layout: Dispensing (7 Cols) & Invoice POS (5 Cols) */}
      <div className="p-4 grid grid-cols-1 xl:grid-cols-12 gap-4">
        {/* LEFT PANEL: Prescriptions & Drug Dispensing Console (7 / 12) */}
        <div className="xl:col-span-7 flex flex-col gap-4">
          {/* Patient Encounter Selector */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-teal-700">local_pharmacy</span>
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Incoming OPD Electronic Prescriptions
                </span>
              </div>
              <span className="font-mono text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                Shift: Dr. S. Jenkins (OPD-B)
              </span>
            </div>

            {/* Target Patient Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div
                onClick={() => setActivePatientRx('vance')}
                className={`p-3 rounded-xl cursor-pointer transition-all border flex flex-col justify-between ${
                  activePatientRx === 'vance'
                    ? 'bg-teal-50/60 border-teal-500 shadow-xs'
                    : 'bg-white hover:bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">Robert Vance</span>
                  <span className="text-[9px] bg-teal-700 text-white px-1.5 py-0.5 rounded font-bold uppercase">
                    ACTIVE
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  UHID: <span className="font-mono font-semibold text-slate-700">#MC-984210</span> | 58y M
                </div>
                <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-100 text-[10px] text-slate-500">
                  <span>Rx #7842 (3 Drugs + Consumables)</span>
                  <span className="text-teal-700 font-bold font-mono">11:35 AM</span>
                </div>
              </div>

              <div
                onClick={() => setActivePatientRx('sharma')}
                className={`p-3 rounded-xl cursor-pointer transition-all border flex flex-col justify-between ${
                  activePatientRx === 'sharma'
                    ? 'bg-teal-50/60 border-teal-500 shadow-xs'
                    : 'bg-white hover:bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">Ananya Sharma</span>
                  <span className="text-[9px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-bold uppercase">
                    WAITING
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  UHID: <span className="font-mono font-semibold text-slate-700">#MC-984218</span> | 32y F
                </div>
                <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-100 text-[10px] text-slate-500">
                  <span>Rx #7843 (Dr. A. Verma)</span>
                  <span className="text-slate-600 font-mono">11:38 AM</span>
                </div>
              </div>

              <div
                onClick={() => setActivePatientRx('kowalski')}
                className={`p-3 rounded-xl cursor-pointer transition-all border flex flex-col justify-between ${
                  activePatientRx === 'kowalski'
                    ? 'bg-teal-50/60 border-teal-500 shadow-xs'
                    : 'bg-white hover:bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">James Kowalski</span>
                  <span className="text-[9px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-bold uppercase">
                    TOKEN 26
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  UHID: <span className="font-mono font-semibold text-slate-700">#MC-984192</span> | 71y M
                </div>
                <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-100 text-[10px] text-slate-500">
                  <span>Rx #7840 (Geriatric)</span>
                  <span className="text-slate-600 font-mono">11:22 AM</span>
                </div>
              </div>
            </div>

            {/* Real-Time Barcode Scanner Hotbar */}
            <div className="mt-3 bg-slate-50 p-2 rounded-xl border border-slate-200 flex items-center gap-2">
              <span className="material-symbols-outlined text-teal-700 text-[20px] pl-1">barcode_scanner</span>
              <input
                type="text"
                value={barcodeValue}
                onChange={(e) => setBarcodeValue(e.target.value)}
                placeholder="Scan medicine barcode (UPC / GS1 Datamatrix) to auto-verify batch..."
                className="w-full bg-white text-xs text-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-600 font-mono"
              />
              <button
                onClick={handleVerifyBarcode}
                className="bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 shrink-0 shadow-xs"
              >
                <span className="material-symbols-outlined text-[16px]">qr_code_scanner</span>
                <span>Verify Drug</span>
              </button>
            </div>

            {scannerMatched && (
              <div className="mt-2 p-2 bg-emerald-50 border border-emerald-300 rounded-lg text-emerald-900 text-xs flex items-center justify-between animate-in fade-in duration-150">
                <span className="flex items-center gap-1 font-bold">
                  <span className="material-symbols-outlined text-[16px] text-emerald-700">verified</span>
                  Barcode Match: Tab. Metformin 500mg ER (#B-2024-91) Verified in Rack R-04-A
                </span>
                <span className="font-mono text-[10px]">FEFO Expiry: Passed (08/2026)</span>
              </div>
            )}
          </div>

          {/* Prescribed Drug Dispensing Grid & Verification Matrix */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
            <div className="bg-slate-100/80 px-4 py-2.5 flex items-center justify-between border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900">Dispensing Verification Checklist</span>
                <span className="font-mono text-[10px] bg-slate-200 px-2 py-0.5 rounded font-bold text-slate-700">
                  {stockItems.length}/{stockItems.length} Matched
                </span>
              </div>
              <div className="flex items-center gap-3 text-slate-500 text-xs">
                <span className="inline-flex items-center gap-1 text-teal-800 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-teal-600"></span> FEFO Auto-Selected
                </span>
                <span>Expiry Check Passed</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-bold border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-2">Medicine / Formulation</th>
                    <th className="px-2 py-2">Batch & Expiry</th>
                    <th className="px-2 py-2">Stock</th>
                    <th className="px-2 py-2">Prescribed</th>
                    <th className="px-2 py-2 text-right">Unit $</th>
                    <th className="px-4 py-2 text-right">Line Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {stockItems.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-[18px] text-teal-700 mt-0.5">check_circle</span>
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-900">{item.medicineName}</span>
                            <span className="text-[10px] text-slate-400">Brand: {item.brand} | Salt: {item.salt}</span>
                            <span className="font-mono text-[10px] text-slate-600">{item.sig}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-2 py-3 align-top font-mono text-[11px]">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900">{item.batchNumber}</span>
                          <span className="text-slate-500">Exp: {item.expiry}</span>
                          <span className="text-teal-700 font-medium text-[10px]">{item.rackLocation}</span>
                        </div>
                      </td>
                      <td className="px-2 py-3 align-top font-mono text-slate-600">
                        <span className={item.isCriticalLow ? 'text-rose-600 font-bold' : ''}>
                          {item.currentStock} {item.unit}
                        </span>
                      </td>
                      <td className="px-2 py-3 align-top">
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            min="1"
                            max="10"
                            value={item.prescribedQuantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10) || 1)}
                            className="w-12 text-center bg-slate-100 rounded border-0 font-mono text-xs font-bold py-1 text-slate-800"
                          />
                          <span className="text-slate-400 text-[10px]">pack</span>
                        </div>
                      </td>
                      <td className="px-2 py-3 align-top text-right font-mono text-slate-700">
                        ${item.unitPrice.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 align-top text-right font-mono font-bold text-slate-900">
                        ${(item.prescribedQuantity * item.unitPrice).toFixed(2)}
                      </td>
                    </tr>
                  ))}

                  {/* Clinical Consumables */}
                  <tr className="bg-slate-50/70">
                    <td colSpan={3} className="px-4 py-2 font-medium text-slate-700">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-slate-400">vaccines</span>
                        <span>OPD Consumables: BD Syringes 5ml (2 units @ $1.00) + Alcohol Swabs (Box @ $4.50)</span>
                      </div>
                    </td>
                    <td className="px-2 py-2 font-mono text-slate-500">Pack</td>
                    <td className="px-2 py-2 text-right font-mono text-slate-400">-</td>
                    <td className="px-4 py-2 text-right font-mono font-bold text-slate-900">$6.50</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Generic Optimizer Tray */}
            <div className="bg-slate-50 p-3 border-t border-slate-200 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-teal-800 font-bold">
                  <span className="material-symbols-outlined text-[16px]">science</span>
                  <span>SALT FORMULATION & GENERIC OPTIMIZER</span>
                </div>
                <span className="text-[10px] text-slate-500">Matched with National Formulary</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-teal-50 text-teal-800 font-mono text-[10px] font-bold">
                    Generic Available
                  </span>
                  <span>Substitute Jardiance 10mg with <strong>Generic Empagliflozin (Cipla)</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-teal-700 font-bold">Save $21.00 (-47%)</span>
                  <button 
                    onClick={() => alert('Generic recommendation sent to Dr. Sarah Jenkins for E-Sign approval.')}
                    className="bg-slate-100 hover:bg-slate-200 text-teal-800 font-bold px-2 py-1 rounded text-xs transition-colors"
                  >
                    Suggest to Doctor
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Inventory Alert Bar */}
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">warning</span>
              </div>
              <div className="flex flex-col text-xs">
                <span className="font-bold text-slate-900">Auto-Requisition #REQ-902 Prepared</span>
                <span className="text-slate-500">Atorvastatin 20mg (Batch A-77) dropped below buffer (6 boxes left). Supplier: SunPharma.</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => alert('PO #REQ-902: 40 boxes Atorvastatin 20mg ($320.00).')}
                className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
              >
                View PO
              </button>
              <button 
                onClick={() => alert('Purchase Order dispatched to SunPharma Corp.')}
                className="px-3 py-1 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold"
              >
                Dispatch to Vendor
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Unified POS Bill, Insurance Split & Multi-Terminal Payment (5 / 12) */}
        <div className="xl:col-span-5 flex flex-col gap-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
            {/* Receipt Header */}
            <div className="bg-slate-50 p-4 border-b border-slate-200 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-900">Tax Invoice & Cash Bill</span>
                <span className="font-mono text-xs font-bold text-teal-800">#INV-2024-8841</span>
              </div>
              <div className="text-right text-[11px] text-slate-500">
                <div>Date: <strong className="text-slate-800">18-Nov-2024</strong></div>
                <div>Counter: <strong className="text-slate-800">#2 (Alex Wong)</strong></div>
              </div>
            </div>

            {/* Bill Lines */}
            <div className="p-4 flex flex-col gap-2 text-xs">
              <div className="flex items-center justify-between py-1">
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-800">OPD Specialist Consultation</span>
                  <span className="text-[10px] text-slate-400">Dr. Sarah Jenkins (Int. Medicine - Complex Level 3)</span>
                </div>
                <span className="font-mono font-semibold text-slate-800">${consultationFee.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between py-1 bg-slate-50 px-2 rounded">
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-800">Pharmacy Dispensing ({stockItems.length} Rx lines + Consumables)</span>
                  <span className="text-[10px] text-slate-400">Metformin, Lisinopril, Jardiance + BD Syringes</span>
                </div>
                <span className="font-mono font-semibold text-slate-800">${rxSubtotal.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-800">Diagnostic Pathology Orders</span>
                  <span className="text-[10px] text-slate-400">HbA1c Glycated Hemoglobin + Fasting Renal Panel</span>
                </div>
                <span className="font-mono font-semibold text-slate-800">${labFee.toFixed(2)}</span>
              </div>

              <div className="my-1 h-px bg-slate-200"></div>

              {/* Subtotal & Discount */}
              <div className="flex items-center justify-between text-slate-600">
                <span>Gross Subtotal</span>
                <span className="font-mono font-semibold text-slate-900">${grossSubtotal.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between text-teal-800 font-medium">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">loyalty</span>
                  <span>Senior Citizen Care Discount (10% on Rx)</span>
                </div>
                <span className="font-mono font-bold">-${discount.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between text-slate-500">
                <span>Applicable CGST / SGST (Combined 5%)</span>
                <span className="font-mono">+${tax.toFixed(2)}</span>
              </div>

              {/* Total Payable */}
              <div className="bg-slate-100 p-3 rounded-xl flex items-center justify-between mt-1">
                <span className="text-sm font-bold text-slate-900">Total Bill Payable</span>
                <span className="text-xl font-bold font-mono text-teal-900">${totalPayable.toFixed(2)}</span>
              </div>
            </div>

            {/* Insurance Payer & Co-Pay Split Box */}
            <div className="mx-4 p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <span className="material-symbols-outlined text-[16px] text-indigo-600">health_and_safety</span>
                  <span>Insurance Payer: BlueCross PPO</span>
                </div>
                <span className="font-mono text-[10px] bg-teal-50 text-teal-800 font-bold px-2 py-0.5 rounded border border-teal-200/50">
                  Pre-Auth: #BC-77291-A
                </span>
              </div>

              {/* Coverage Ratio Bar */}
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden flex">
                <div className="bg-teal-600 h-full" style={{ width: '80%' }} title="Insurance: 80%"></div>
                <div className="bg-indigo-600 h-full" style={{ width: '20%' }} title="Patient: 20%"></div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center pt-1 text-xs">
                <div className="bg-white p-2 rounded-lg border border-slate-200/70">
                  <span className="text-[10px] text-slate-400 block">Covered by Insurer (80%)</span>
                  <span className="text-sm font-bold font-mono text-teal-800">${insurerCoverage.toFixed(2)}</span>
                </div>
                <div className="bg-white p-2 rounded-lg border border-slate-200/70">
                  <span className="text-[10px] text-slate-400 block">Patient Co-Pay Due (20%)</span>
                  <span className="text-sm font-bold font-mono text-indigo-700">${patientCoPay.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Settle Co-Pay Section */}
            <div className="p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">Settle Patient Co-Pay (${patientCoPay.toFixed(2)})</span>
                <span className="text-slate-400 text-[11px]">Select Mode</span>
              </div>

              {/* Payment Tabs */}
              <div className="grid grid-cols-4 gap-1 bg-slate-100 p-1 rounded-lg text-center text-xs font-semibold">
                {(['upi', 'card', 'cash', 'wallet'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setPaymentMode(mode)}
                    className={`py-1.5 rounded-md transition-all flex items-center justify-center gap-1 ${
                      paymentMode === mode
                        ? 'bg-white text-teal-800 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      {mode === 'upi' ? 'qr_code_2' : mode === 'card' ? 'credit_card' : mode === 'cash' ? 'payments' : 'wallet'}
                    </span>
                    <span className="uppercase">{mode}</span>
                  </button>
                ))}
              </div>

              {/* Dynamic QR Pay Box Container */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center gap-3">
                {/* Simulated QR Code SVG */}
                <div className="w-20 h-20 bg-white p-2 rounded-lg border border-slate-200 shadow-xs flex items-center justify-center shrink-0">
                  <svg className="w-full h-full text-slate-900" fill="currentColor" viewBox="0 0 100 100">
                    <rect fill="none" height="28" rx="2" stroke="currentColor" strokeWidth="5" width="28" x="6" y="6"></rect>
                    <rect height="12" width="12" x="14" y="14"></rect>
                    <rect fill="none" height="28" rx="2" stroke="currentColor" strokeWidth="5" width="28" x="66" y="6"></rect>
                    <rect height="12" width="12" x="74" y="14"></rect>
                    <rect fill="none" height="28" rx="2" stroke="currentColor" strokeWidth="5" width="28" x="6" y="66"></rect>
                    <rect height="12" width="12" x="14" y="74"></rect>
                    <rect height="8" width="8" x="42" y="10"></rect>
                    <rect height="14" width="6" x="52" y="18"></rect>
                    <rect height="8" width="16" x="42" y="38"></rect>
                    <rect height="6" width="12" x="68" y="42"></rect>
                    <rect height="18" width="8" x="40" y="52"></rect>
                    <rect height="6" width="10" x="52" y="58"></rect>
                    <rect height="8" width="14" x="65" y="65"></rect>
                    <rect height="18" width="8" x="85" y="55"></rect>
                    <rect height="10" width="12" x="45" y="82"></rect>
                  </svg>
                </div>

                <div className="flex flex-col justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Dynamic Counter QR</span>
                    <h4 className="font-bold text-slate-900 text-sm">Scan to Pay: ${patientCoPay.toFixed(2)}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Apple Pay, Google Pay, BHIM UPI & Credit Apps.</p>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2 text-teal-700 font-mono text-[11px] font-bold">
                    <span className="w-2 h-2 rounded-full bg-teal-600 animate-ping"></span>
                    Awaiting Payer Confirmation...
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 mt-1">
                <button
                  onClick={handleCompletePayment}
                  className="w-full bg-teal-700 hover:bg-teal-800 text-white py-2.5 px-4 rounded-xl text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">print</span>
                  <span>Complete Payment & Print GST Bill [Enter]</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => alert(`WhatsApp bill dispatch triggered to +1 555-392-8812 with invoice PDF.`)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-200"
                  >
                    <span className="material-symbols-outlined text-[16px] text-emerald-600">chat</span>
                    <span>WhatsApp Bill & Rx</span>
                  </button>
                  <button
                    onClick={() => alert('Invoice #INV-2024-8841 moved to Held Invoices tray.')}
                    className="bg-slate-50 hover:bg-slate-100 text-slate-600 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-200"
                  >
                    <span className="material-symbols-outlined text-[16px]">pause_circle</span>
                    <span>Hold Invoice (F8)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {paymentCompleted && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 bg-teal-800 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in duration-200">
          <span className="material-symbols-outlined text-teal-300 text-[24px]">task_alt</span>
          <div>
            <h4 className="font-bold text-xs">Payment Cleared: ${patientCoPay.toFixed(2)}</h4>
            <p className="text-[11px] text-teal-100">Tax Invoice #INV-2024-8841 generated. Ledger updated.</p>
          </div>
        </div>
      )}
    </div>
  );
};
