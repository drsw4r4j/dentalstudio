import React, { useState } from 'react';
import { ClinicMode } from '../types';

interface HeaderProps {
  mode: ClinicMode;
  onModeChange: (mode: ClinicMode) => void;
  onOpenSearch: () => void;
  onOpenWalkin: () => void;
  onOpenTriage: () => void;
  onOpenExaminationModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  mode,
  onModeChange,
  onOpenSearch,
  onOpenWalkin,
  onOpenTriage,
  onOpenExaminationModal
}) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [location, setLocation] = useState(
    mode === 'dental' ? 'MetroCare - Dental Wing / Operatory 2' : 'MetroCare - OPD Wing B'
  );

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50 flex items-center justify-between px-4 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      {/* Brand & Suite Switcher */}
      <div className="flex items-center gap-3">
        {mode === 'general' ? (
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onModeChange('general')}>
            <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold shadow-sm shadow-teal-700/20">
              <span className="material-symbols-outlined text-[20px]">health_and_safety</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight text-teal-800 leading-none">Docplix EHR</span>
              <span className="text-[9px] text-slate-500 uppercase tracking-wider font-semibold mt-0.5">CLINICAL WORKSTATION</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onModeChange('dental')}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 text-white flex items-center justify-center shadow-sm shadow-orange-500/25">
              <span className="material-symbols-outlined text-[20px]">dentistry</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight text-slate-900 leading-none">
                Docplix<span className="text-orange-500">.Dental</span>
              </span>
              <span className="text-[8px] text-slate-400 uppercase tracking-wider font-semibold mt-0.5">ORAL & SURGERY SUITE</span>
            </div>
          </div>
        )}

        {/* Vertical divider */}
        <div className="h-6 w-px bg-slate-200 mx-1"></div>

        {/* Suite Mode Switcher Toggle Pill */}
        <div className="hidden md:flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-semibold">
          <button
            onClick={() => onModeChange('general')}
            className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 ${
              mode === 'general'
                ? 'bg-white text-teal-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">vital_signs</span>
            <span>General OPD</span>
          </button>
          <button
            onClick={() => onModeChange('dental')}
            className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 ${
              mode === 'dental'
                ? 'bg-white text-orange-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">dentistry</span>
            <span>Dental Studio</span>
          </button>
        </div>

        {/* Location Dropdown */}
        <div className="hidden lg:flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200 text-xs font-medium text-slate-700">
          <span className="material-symbols-outlined text-[15px] text-slate-400">
            {mode === 'dental' ? 'dentistry' : 'location_on'}
          </span>
          <select 
            value={location} 
            onChange={(e) => setLocation(e.target.value)}
            className="bg-transparent border-0 text-xs font-medium text-slate-700 focus:ring-0 cursor-pointer p-0 pr-4"
          >
            <option value="MetroCare - OPD Wing B">MetroCare - OPD Wing B (Medical)</option>
            <option value="MetroCare - Dental Wing / Operatory 2">MetroCare - Dental Wing / Operatory 2</option>
            <option value="MetroCare - Surgical Day Care">MetroCare - Surgical Day Care</option>
          </select>
        </div>

        {/* Status indicator */}
        <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 bg-teal-50 rounded border border-teal-200/60 text-xs">
          <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse"></span>
          <span className="font-semibold text-teal-800">
            {mode === 'general' ? 'Clinic Active' : 'Chair 1 Active'}
          </span>
          <span className="text-slate-500 font-medium">
            {mode === 'general' ? 'Dr. Sarah Jenkins' : 'Dr. Swaraj'}
          </span>
        </div>
      </div>

      {/* Global Search Bar */}
      <div className="flex-1 max-w-md mx-4">
        <button
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between pl-3 pr-2 py-1.5 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-lg text-xs text-slate-500 transition-all text-left group"
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[17px] text-slate-400 group-hover:text-slate-600">search</span>
            <span className="truncate">Search Patient (Name, UHID, Phone, Tooth #)...</span>
          </div>
          <kbd className="px-1.5 py-0.5 bg-slate-200/80 text-slate-600 font-mono text-[10px] rounded border border-slate-300">
            Ctrl + K
          </kbd>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2">
        {mode === 'dental' && (
          <button
            onClick={onOpenExaminationModal}
            className="flex items-center gap-1 bg-orange-500 text-white font-semibold text-xs px-2.5 py-1.5 rounded-md hover:bg-orange-600 transition-colors shadow-xs"
            title="Open Interactive 32-Tooth Odontogram Chart"
          >
            <span className="material-symbols-outlined text-[16px]">dentistry</span>
            <span className="hidden sm:inline">Add Dental Exam</span>
          </button>
        )}

        <button
          onClick={onOpenWalkin}
          className="flex items-center gap-1 bg-teal-700 text-white font-semibold text-xs px-2.5 py-1.5 rounded-md hover:bg-teal-800 transition-colors shadow-xs"
        >
          <span className="material-symbols-outlined text-[16px]">person_add</span>
          <span className="hidden lg:inline">+ New Walk-in</span>
        </button>

        <button
          onClick={onOpenTriage}
          className="flex items-center gap-1 bg-rose-50 text-rose-700 font-semibold text-xs px-2.5 py-1.5 rounded-md border border-rose-200 hover:bg-rose-100 transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">emergency</span>
          <span className="hidden 2xl:inline">⚡ Triage</span>
        </button>

        {/* Notifications */}
        <button 
          className="relative p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
          title="3 System Alerts"
          onClick={() => alert('Clinical Alerts:\n1. Robert Vance: Penicillin Anaphylaxis Flag\n2. Operatory 2: Suction line flush completed\n3. Pharmacy: 3M Filtek Z250 below reorder threshold')}
        >
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          <span className="absolute top-1 right-1 w-4 h-4 bg-rose-600 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
            3
          </span>
        </button>

        <div className="h-6 w-px bg-slate-200"></div>

        {/* Doctor Avatar Profile */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-50 transition-colors focus:outline-none"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-teal-600/30"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcD4MwPD83PSlI5O2O7lFQ3fWI7KYSutc7NbEzc5cyyP_FVYLUfVBJR2bux1o5L1DAzfXlmW-tn2BEHTTSAR8D4jN7XS0LFHRDm60CEUK5LX4hyjI7e_Karmfv-MQ4TIBTmuz1JxMGjOcZB6spzfxQ9dTogGFUGGfa5UmhIoLLshwNRbu4-cj-nZe9AzILjRmyMg0fNih2Dj-OwCxqCZCGHHNz4xXMB10tcIsKh2E9Wxx_h0b5MiU"
            />
            <div className="hidden sm:flex flex-col text-left">
              <div className="flex items-center gap-1 leading-tight">
                <span className="text-xs font-bold text-slate-800">
                  {mode === 'general' ? 'Dr. S. Jenkins' : 'Dr. Swaraj'}
                </span>
                <span className="material-symbols-outlined text-[13px] text-teal-600">verified</span>
              </div>
              <span className="text-[10px] text-slate-500 leading-none">
                {mode === 'general' ? 'Int. Medicine' : 'BDS, MDS Oral Surg'}
              </span>
            </div>
            <span className="material-symbols-outlined text-[16px] text-slate-400">expand_more</span>
          </button>

          {/* Profile Dropdown */}
          {profileOpen && (
            <div className="absolute right-0 top-12 w-72 bg-white border border-slate-200 rounded-xl shadow-xl p-4 z-50 text-xs">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <img
                  alt="Doctor"
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-teal-500/20"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcD4MwPD83PSlI5O2O7lFQ3fWI7KYSutc7NbEzc5cyyP_FVYLUfVBJR2bux1o5L1DAzfXlmW-tn2BEHTTSAR8D4jN7XS0LFHRDm60CEUK5LX4hyjI7e_Karmfv-MQ4TIBTmuz1JxMGjOcZB6spzfxQ9dTogGFUGGfa5UmhIoLLshwNRbu4-cj-nZe9AzILjRmyMg0fNih2Dj-OwCxqCZCGHHNz4xXMB10tcIsKh2E9Wxx_h0b5MiU"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {mode === 'general' ? 'Dr. Sarah Jenkins' : 'Dr. Swaraj'}
                  </h4>
                  <p className="text-[11px] text-teal-700 font-medium">Senior Clinical Attending</p>
                  <p className="text-[10px] text-slate-400">Licence: #MD-77129-EU</p>
                </div>
              </div>
              <div className="py-2 space-y-1">
                <div className="text-slate-600 flex items-center justify-between py-1">
                  <span>Current Shift Time:</span>
                  <strong className="text-slate-900 font-mono">04h 32m</strong>
                </div>
                <div className="text-slate-600 flex items-center justify-between py-1">
                  <span>Station Protocol:</span>
                  <strong className="text-teal-700">NABH / HIPAA Active</strong>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-100 flex gap-2">
                <button
                  onClick={() => {
                    onModeChange(mode === 'general' ? 'dental' : 'general');
                    setProfileOpen(false);
                  }}
                  className="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 rounded text-center text-slate-700 font-semibold"
                >
                  Switch Suite
                </button>
                <button
                  onClick={() => setProfileOpen(false)}
                  className="flex-1 py-1.5 bg-teal-700 hover:bg-teal-800 text-white rounded text-center font-semibold"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
