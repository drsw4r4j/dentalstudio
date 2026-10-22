import React from 'react';
import { ClinicMode, GeneralModuleId, DentalModuleId } from '../types';

interface SidebarProps {
  mode: ClinicMode;
  generalTab: GeneralModuleId;
  dentalTab: DentalModuleId;
  onSelectGeneralTab: (tab: GeneralModuleId) => void;
  onSelectDentalTab: (tab: DentalModuleId) => void;
  onOpenExaminationModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  mode,
  generalTab,
  dentalTab,
  onSelectGeneralTab,
  onSelectDentalTab,
  onOpenExaminationModal,
}) => {
  return (
    <aside className="fixed left-0 top-16 bottom-7 w-64 bg-white border-r border-slate-200 z-40 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.02)]">
      <div className="flex flex-col py-2 overflow-y-auto">
        <div className="px-4 py-1.5 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 uppercase tracking-wider font-bold">
            {mode === 'general' ? 'Clinical Modules' : 'Dental Workstation'}
          </span>
          <span className="text-[9px] px-1.5 py-0.5 rounded font-mono font-bold bg-slate-100 text-slate-600">
            {mode === 'general' ? 'OPD-B' : 'SURG-02'}
          </span>
        </div>

        {/* General Mode Navigation */}
        {mode === 'general' ? (
          <nav className="flex flex-col gap-1 px-2 mt-1">
            <button
              onClick={() => onSelectGeneralTab('patients')}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all text-left ${
                generalTab === 'patients'
                  ? 'bg-teal-700 text-white font-semibold border-l-4 border-teal-900 shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">vital_signs</span>
              <div className="flex flex-col leading-tight min-w-0">
                <span className="text-xs font-semibold truncate">Unified Patient View</span>
                <span className={`text-[10px] truncate ${generalTab === 'patients' ? 'text-teal-100' : 'text-slate-400'}`}>
                  Live Chart & Encounter
                </span>
              </div>
            </button>

            <button
              onClick={() => onSelectGeneralTab('queue')}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all text-left ${
                generalTab === 'queue'
                  ? 'bg-teal-700 text-white font-semibold border-l-4 border-teal-900 shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">schedule</span>
              <div className="flex flex-col leading-tight min-w-0">
                <span className="text-xs font-semibold truncate">Queue & Scheduling</span>
                <span className={`text-[10px] truncate ${generalTab === 'queue' ? 'text-teal-100' : 'text-slate-400'}`}>
                  Token Queue & Calendar
                </span>
              </div>
            </button>

            <button
              onClick={() => onSelectGeneralTab('billing-pharmacy')}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all text-left ${
                generalTab === 'billing-pharmacy'
                  ? 'bg-teal-700 text-white font-semibold border-l-4 border-teal-900 shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">medication</span>
              <div className="flex flex-col leading-tight min-w-0">
                <span className="text-xs font-semibold truncate">Pharmacy & Billing ERP</span>
                <span className={`text-[10px] truncate ${generalTab === 'billing-pharmacy' ? 'text-teal-100' : 'text-slate-400'}`}>
                  POS & Claim Settlements
                </span>
              </div>
            </button>

            <button
              onClick={() => onSelectGeneralTab('crm')}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all text-left ${
                generalTab === 'crm'
                  ? 'bg-teal-700 text-white font-semibold border-l-4 border-teal-900 shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">mark_chat_unread</span>
              <div className="flex flex-col leading-tight min-w-0">
                <span className="text-xs font-semibold truncate">CRM & Engagement</span>
                <span className={`text-[10px] truncate ${generalTab === 'crm' ? 'text-teal-100' : 'text-slate-400'}`}>
                  WhatsApp & Refill Alerts
                </span>
              </div>
            </button>
          </nav>
        ) : (
          /* Dental Mode Navigation */
          <nav className="flex flex-col gap-1 px-2 mt-1">
            <button
              onClick={() => onSelectDentalTab('dashboard')}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all text-left ${
                dentalTab === 'dashboard'
                  ? 'bg-orange-600 text-white font-semibold border-l-4 border-orange-800 shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">dashboard</span>
              <div className="flex flex-col leading-tight min-w-0">
                <span className="text-xs font-semibold truncate">Executive Dashboard</span>
                <span className={`text-[10px] truncate ${dentalTab === 'dashboard' ? 'text-orange-100' : 'text-slate-400'}`}>
                  Analytics & OPDs Overview
                </span>
              </div>
            </button>

            <button
              onClick={() => onSelectDentalTab('dental-chart')}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all text-left ${
                dentalTab === 'dental-chart'
                  ? 'bg-orange-600 text-white font-semibold border-l-4 border-orange-800 shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">dentistry</span>
              <div className="flex flex-col leading-tight min-w-0">
                <span className="text-xs font-semibold truncate">Dental Chart & Patient EHR</span>
                <span className={`text-[10px] truncate ${dentalTab === 'dental-chart' ? 'text-orange-100' : 'text-slate-400'}`}>
                  Odontogram, Perio & Tx Plan
                </span>
              </div>
            </button>

            <button
              onClick={() => onSelectDentalTab('operatory-queue')}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all text-left ${
                dentalTab === 'operatory-queue'
                  ? 'bg-orange-600 text-white font-semibold border-l-4 border-orange-800 shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">event_seat</span>
              <div className="flex flex-col leading-tight min-w-0">
                <span className="text-xs font-semibold truncate">Operatory & Queue Schedule</span>
                <span className={`text-[10px] truncate ${dentalTab === 'operatory-queue' ? 'text-orange-100' : 'text-slate-400'}`}>
                  Dental Chairs & Workflow
                </span>
              </div>
            </button>

            <button
              onClick={() => onSelectDentalTab('dental-material-pos')}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all text-left ${
                dentalTab === 'dental-material-pos'
                  ? 'bg-orange-600 text-white font-semibold border-l-4 border-orange-800 shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">inventory_2</span>
              <div className="flex flex-col leading-tight min-w-0">
                <span className="text-xs font-semibold truncate">Dental Material & Lab Billing</span>
                <span className={`text-[10px] truncate ${dentalTab === 'dental-material-pos' ? 'text-orange-100' : 'text-slate-400'}`}>
                  Labs, Implants & POS ERP
                </span>
              </div>
            </button>

            <button
              onClick={() => onSelectDentalTab('dental-crm')}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all text-left ${
                dentalTab === 'dental-crm'
                  ? 'bg-orange-600 text-white font-semibold border-l-4 border-orange-800 shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">cycle</span>
              <div className="flex flex-col leading-tight min-w-0">
                <span className="text-xs font-semibold truncate">Patient Dental CRM & Recall</span>
                <span className={`text-[10px] truncate ${dentalTab === 'dental-crm' ? 'text-orange-100' : 'text-slate-400'}`}>
                  6-Mo Scaling & Post-Op
                </span>
              </div>
            </button>
          </nav>
        )}

        {/* Action Button for 32-Tooth Full Odontogram Modal */}
        <div className="p-3 mx-2 mt-4 bg-orange-50/70 border border-orange-200/80 rounded-xl">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="material-symbols-outlined text-orange-600 text-[18px]">dentistry</span>
            <span className="text-xs font-bold text-orange-900">Interactive Odontogram</span>
          </div>
          <p className="text-[11px] text-orange-800/80 leading-relaxed mb-2.5">
            Full 32-tooth anatomical chart with 10 diagnostic conditions and surface selection.
          </p>
          <button
            onClick={onOpenExaminationModal}
            className="w-full py-1.5 px-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[15px]">add_circle</span>
            <span>Open Tooth Chart</span>
          </button>
        </div>
      </div>

      {/* Bottom Shift Summary Card */}
      <div className="p-3 m-2 bg-slate-50 border border-slate-200/70 rounded-xl">
        <div className="flex items-center justify-between text-slate-500 mb-1">
          <span className="text-[10px] uppercase font-bold tracking-wider">
            {mode === 'general' ? 'Shift Summary' : 'Operatory 2 Load'}
          </span>
          <span className="text-[11px] font-mono font-bold text-teal-700">
            {mode === 'general' ? '04h 32m' : '05h 15m'}
          </span>
        </div>
        <div className="flex items-center justify-between text-slate-900">
          <span className="text-xs text-slate-600 font-medium">
            {mode === 'general' ? 'Encountered' : 'Procedures Done'}
          </span>
          <span className="text-xs font-bold font-mono">
            {mode === 'general' ? '18 / 32' : '9 / 14'}
          </span>
        </div>
        <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              mode === 'general' ? 'bg-teal-600' : 'bg-orange-500'
            }`}
            style={{ width: mode === 'general' ? '56%' : '64%' }}
          ></div>
        </div>
      </div>
    </aside>
  );
};
