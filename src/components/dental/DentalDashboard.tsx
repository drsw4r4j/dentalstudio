import React, { useState } from 'react';
import { mockDentalLabOrders } from '../../data/mockData';

interface DentalDashboardProps {
  onNavigateToChart: () => void;
  onNavigateToOperatory: () => void;
  onNavigateToLabPOS: () => void;
  onOpenExaminationModal: () => void;
}

export const DentalDashboard: React.FC<DentalDashboardProps> = ({
  onNavigateToChart,
  onNavigateToOperatory,
  onNavigateToLabPOS,
  onOpenExaminationModal,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'in-chair' | 'completed'>('all');

  const todayPatients = [
    {
      id: 'pt-1',
      token: 'D-01',
      name: 'Eleanor Vance',
      age: '36y / F',
      uhid: '#DENT-984210',
      procedure: 'RCT Tooth #3 (Visit 1) + Build-up',
      doctor: 'Dr. Sarah Jenkins',
      chair: 'Operatory 2 (A-dec 500)',
      time: '09:00 AM',
      status: 'In Chair',
      statusColor: 'bg-orange-100 text-orange-800 border-orange-300',
      fee: '₹4,500',
    },
    {
      id: 'pt-2',
      token: 'D-02',
      name: 'Marcus Brody',
      age: '48y / M',
      uhid: '#DPX-88204',
      procedure: 'Surgical Extraction #38 (Impacted)',
      doctor: 'Dr. Sarah Jenkins',
      chair: 'Operatory 1',
      time: '09:30 AM',
      status: 'In Chair',
      statusColor: 'bg-orange-100 text-orange-800 border-orange-300',
      fee: '₹6,200',
    },
    {
      id: 'pt-3',
      token: 'D-03',
      name: 'Aarav Patel',
      age: '24y / M',
      uhid: '#DENT-10492',
      procedure: 'Ultrasonic Scaling & Polishing',
      doctor: 'Dr. Rahul Sharma',
      chair: 'Operatory 3',
      time: '10:00 AM',
      status: 'Completed',
      statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      fee: '₹1,800',
    },
    {
      id: 'pt-4',
      token: 'D-04',
      name: 'Sunita Rao',
      age: '52y / F',
      uhid: '#DENT-98124',
      procedure: 'Zirconia Crown Delivery #19 (Try-in)',
      doctor: 'Dr. Sarah Jenkins',
      chair: 'Operatory 2',
      time: '10:45 AM',
      status: 'Waiting',
      statusColor: 'bg-blue-100 text-blue-800 border-blue-300',
      fee: '₹9,500',
    },
    {
      id: 'pt-5',
      token: 'D-05',
      name: 'Devraj Kapoor',
      age: '41y / M',
      uhid: '#DENT-11982',
      procedure: 'Straumann Implant Stage II Uncovery',
      doctor: 'Surg. Dr. Rao',
      chair: 'Surg Suite C',
      time: '11:15 AM',
      status: 'Waiting',
      statusColor: 'bg-blue-100 text-blue-800 border-blue-300',
      fee: '₹28,000',
    },
  ];

  const filteredPatients = todayPatients.filter((p) => {
    if (selectedFilter === 'in-chair') return p.status === 'In Chair';
    if (selectedFilter === 'completed') return p.status === 'Completed';
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner / Studio Welcome */}
      <div className="bg-gradient-to-r from-slate-900 via-orange-950 to-slate-900 rounded-2xl p-6 text-white shadow-lg border border-orange-900/40 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.18)_0,transparent_70%)] pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-orange-500/20 text-orange-300 border border-orange-500/30 uppercase tracking-wider">
                Swaraj Dental Studio • Operatory HQ
              </span>
              <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                All 4 Operatory Chairs Live
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              Oral Surgery & Dental Clinical Dashboard
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Real-time monitoring of patient flow, operative procedures, odontogram charting, CAD/CAM lab logistics, and daily dental collections.
            </p>
          </div>

          <div className="flex items-center flex-wrap gap-2.5">
            <button
              onClick={onOpenExaminationModal}
              className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs transition-all shadow-md shadow-orange-600/30 flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span>+ Add Dental Examination</span>
            </button>
            <button
              onClick={onNavigateToChart}
              className="px-3.5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">dentistry</span>
              <span>Open Eleanor Vance Chart</span>
            </button>
            <button
              onClick={onNavigateToOperatory}
              className="px-3.5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">airline_seat_recline_extra</span>
              <span>Chairs Fleet</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Metrics Matrix (Matches Image 18) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-orange-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider">Today's Revenue</span>
            <span className="material-symbols-outlined text-orange-500 text-[18px]">payments</span>
          </div>
          <div className="text-xl font-bold text-slate-900">₹2,10,300</div>
          <div className="text-[10px] text-emerald-600 font-semibold mt-1 flex items-center gap-0.5">
            <span className="material-symbols-outlined text-[12px]">trending_up</span>
            +14.2% vs last Friday
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-orange-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider">Dental OPDs</span>
            <span className="material-symbols-outlined text-teal-600 text-[18px]">group</span>
          </div>
          <div className="text-xl font-bold text-slate-900">24 Patients</div>
          <div className="text-[10px] text-slate-500 font-medium mt-1">
            16 Done • 5 Active • 3 Next
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-orange-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider">Active Chairs</span>
            <span className="material-symbols-outlined text-blue-600 text-[18px]">event_seat</span>
          </div>
          <div className="text-xl font-bold text-slate-900">4 / 4 Operatories</div>
          <div className="text-[10px] text-amber-600 font-semibold mt-1">
            Avg Turnaround: 7.2 min
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-orange-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider">Lab Cases</span>
            <span className="material-symbols-outlined text-purple-600 text-[18px]">biotech</span>
          </div>
          <div className="text-xl font-bold text-slate-900">7 Active Orders</div>
          <div className="text-[10px] text-purple-700 font-semibold mt-1">
            2 Due for Try-in today
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-orange-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider">Recall Nudge</span>
            <span className="material-symbols-outlined text-emerald-600 text-[18px]">autorenew</span>
          </div>
          <div className="text-xl font-bold text-slate-900">84% Converted</div>
          <div className="text-[10px] text-emerald-700 font-semibold mt-1">
            32 Scaling Recalls sent
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-orange-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider">Sterile Stock</span>
            <span className="material-symbols-outlined text-rose-500 text-[18px]">sanitizer</span>
          </div>
          <div className="text-xl font-bold text-slate-900">Autoclave Pass</div>
          <div className="text-[10px] text-slate-500 font-medium mt-1">
            Cycle #892 Validated (134°C)
          </div>
        </div>
      </div>

      {/* Main Split: Today's Patient Queue & Clinical Workflow + Lab Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Today's Dental OPD Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-orange-600 text-[18px]">recent_patient</span>
                Today's Dental Patient Roster & Procedures
              </h2>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Live chair status, planned interventions, and immediate chart access
              </p>
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-semibold">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  selectedFilter === 'all'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All (24)
              </button>
              <button
                onClick={() => setSelectedFilter('in-chair')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  selectedFilter === 'in-chair'
                    ? 'bg-white text-orange-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                In Chair (2)
              </button>
              <button
                onClick={() => setSelectedFilter('completed')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  selectedFilter === 'completed'
                    ? 'bg-white text-emerald-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Completed (16)
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-2.5 px-4">Token & Patient</th>
                  <th className="py-2.5 px-3">Procedure & Tooth</th>
                  <th className="py-2.5 px-3">Operatory Chair</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Estimate</th>
                  <th className="py-2.5 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredPatients.map((pt) => (
                  <tr key={pt.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 font-bold font-mono text-[11px] text-slate-700 flex items-center justify-center">
                          {pt.token}
                        </span>
                        <div>
                          <div className="font-bold text-slate-900 text-xs">{pt.name}</div>
                          <div className="text-[10px] text-slate-500 font-mono">
                            {pt.uhid} • {pt.age}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="text-slate-800 font-semibold">{pt.procedure}</div>
                      <div className="text-[10px] text-slate-500">{pt.doctor}</div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-1 text-[11px] text-slate-700 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        {pt.chair}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border ${pt.statusColor}`}
                      >
                        {pt.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-slate-800">
                      {pt.fee}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={onNavigateToChart}
                          title="Open Odontogram Chart"
                          className="px-2 py-1 rounded-md bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[13px]">dentistry</span>
                          Chart
                        </button>
                        <button
                          onClick={onNavigateToLabPOS}
                          title="Generate POS Invoice"
                          className="p-1 rounded-md hover:bg-slate-100 text-slate-600 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[16px]">receipt_long</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <span>Showing 5 of 24 scheduled encounters today</span>
            <button
              onClick={onNavigateToOperatory}
              className="text-orange-600 hover:text-orange-700 font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>View Full Operatory Timeline</span>
              <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Right Column (1 Col): Lab Logistics & Fast Actions */}
        <div className="space-y-6">
          {/* Active Lab Cases Mini Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-purple-600 text-[16px]">precision_manufacturing</span>
                Inbound Lab Cases (CAD/CAM)
              </h3>
              <button
                onClick={onNavigateToLabPOS}
                className="text-[11px] text-purple-700 font-bold hover:underline"
              >
                Track All
              </button>
            </div>

            <div className="space-y-3">
              {mockDentalLabOrders.slice(0, 3).map((order) => (
                <div
                  key={order.id}
                  className="p-3 rounded-lg border border-slate-200 bg-slate-50/60 hover:bg-purple-50/40 transition-colors text-xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900">{order.patientName}</span>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-purple-100 text-purple-800">
                      {order.rxNumber}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-700 font-medium">{order.toothTarget}</div>
                  <div className="text-[10px] text-slate-500 mt-1 flex items-center justify-between">
                    <span>{order.labPartner}</span>
                    <span className="font-semibold text-orange-600">{order.dueTime}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between pt-2 border-t border-slate-200/60 text-[10px]">
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {order.status}
                    </span>
                    <span className="text-slate-400 font-mono">{order.courierDetail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Clinical Tool shortcuts */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-orange-500 text-[16px]">build</span>
              Clinical Quick Launch
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={onOpenExaminationModal}
                className="p-2.5 rounded-lg border border-orange-200 bg-orange-50/70 hover:bg-orange-100 text-orange-800 font-bold flex flex-col items-center justify-center gap-1 text-center transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">dentistry</span>
                <span>Oral Exam</span>
              </button>
              <button
                onClick={onNavigateToChart}
                className="p-2.5 rounded-lg border border-teal-200 bg-teal-50/70 hover:bg-teal-100 text-teal-800 font-bold flex flex-col items-center justify-center gap-1 text-center transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">view_in_ar</span>
                <span>Odontogram</span>
              </button>
              <button
                onClick={onNavigateToOperatory}
                className="p-2.5 rounded-lg border border-blue-200 bg-blue-50/70 hover:bg-blue-100 text-blue-800 font-bold flex flex-col items-center justify-center gap-1 text-center transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">timer</span>
                <span>Chair Timers</span>
              </button>
              <button
                onClick={onNavigateToLabPOS}
                className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold flex flex-col items-center justify-center gap-1 text-center transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">point_of_sale</span>
                <span>ADA Billing</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
