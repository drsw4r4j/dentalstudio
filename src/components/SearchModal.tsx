import React, { useState, useEffect } from 'react';
import { PatientRecord } from '../types';
import { mockGeneralPatient, mockDentalPatient, initialQueueTokens } from '../data/mockData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPatient: (patient: PatientRecord) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectPatient,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const allPatients: PatientRecord[] = [
    mockGeneralPatient,
    mockDentalPatient,
    {
      id: 'pt-marcus-brody',
      name: 'Marcus Brody',
      age: 48,
      gender: 'M',
      uhid: '#MC-972108',
      dob: '22-Aug-1976',
      phone: '+1 (555) 234-9981',
      bloodGroup: 'A+ve',
      insurancePayer: 'Aetna Open Choice',
      insurancePolicyId: '#AET-99018',
      allergies: ['Penicillin Allergy'],
      chronicConditions: ['Hypertension', 'Impacted Wisdom #38'],
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcD4MwPD83PSlI5O2O7lFQ3fWI7KYSutc7NbEzc5cyyP_FVYLUfVBJR2bux1o5L1DAzfXlmW-tn2BEHTTSAR8D4jN7XS0LFHRDm60CEUK5LX4hyjI7e_Karmfv-MQ4TIBTmuz1JxMGjOcZB6spzfxQ9dTogGFUGGfa5UmhIoLLshwNRbu4-cj-nZe9AzILjRmyMg0fNih2Dj-OwCxqCZCGHHNz4xXMB10tcIsKh2E9Wxx_h0b5MiU',
      vitals: {
        bp: '142/92',
        bpStatus: 'High',
        hr: 88,
        spo2: 97,
        temp: '98.6°F',
        bmi: 26.2,
        rbs: 110,
      },
      activeOpdRoom: 'Room 104 / Chair 1',
      chiefComplaint: 'Chest discomfort & palpitations / Tooth #38 extraction'
    },
    {
      id: 'pt-elena-rostova',
      name: 'Elena Rostova',
      age: 32,
      gender: 'F',
      uhid: '#MC-984301',
      dob: '12-Mar-1992',
      phone: '+1 (555) 774-1209',
      bloodGroup: 'O+ve',
      insurancePayer: 'UnitedHealth PPO',
      insurancePolicyId: '#UHC-44912',
      allergies: ['No Known Drug Allergies (NKDA)'],
      chronicConditions: ['Hypothyroidism'],
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqIKef-hOJP9LstdGrStiTL-HrxR_p-EfPvsdDYNUp0KGkzOFiOA1phgJncJzD_znDEaDW4dEeRAV-7I0lVB0m7UbVr8cYVJk7G0EBiYjnvatfP3Irp0lS6aQ5spbTWRbjHLwksVpBrvqYd-_MDo1n2q4FdhdxUWNB0_r0Z8_rU4ZY0S1xcXfC5PpvTbV_XRkSJGLjIyIC1tO3XvpPonNim_HkgbdzXMCIkx243ovCbpdZ487PUhc',
      vitals: {
        bp: '118/76',
        bpStatus: 'Normal',
        hr: 68,
        spo2: 99,
        temp: '98.2°F',
        bmi: 21.5,
        rbs: 89
      },
      activeOpdRoom: 'Waiting Lounge',
      chiefComplaint: 'Routine follow-up on thyroid profile'
    }
  ];

  const filtered = allPatients.filter(p => {
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.uhid.toLowerCase().includes(q) ||
      p.phone.includes(q) ||
      (p.chiefComplaint && p.chiefComplaint.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-start justify-center pt-20 px-4">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search header */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <span className="material-symbols-outlined text-teal-700 text-[22px]">search</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type patient name, UHID (#MC-984210), phone number, or tooth #..."
            className="w-full text-sm bg-transparent border-0 focus:ring-0 text-slate-800 placeholder-slate-400 focus:outline-none"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Quick filters */}
        <div className="px-4 py-2 bg-slate-50/70 border-b border-slate-100 flex items-center gap-2 text-[11px] text-slate-500 overflow-x-auto">
          <span className="font-semibold text-slate-400 uppercase">Quick Jump:</span>
          <button onClick={() => setQuery('Robert')} className="px-2 py-0.5 rounded bg-white border border-slate-200 hover:border-teal-500">Robert Vance</button>
          <button onClick={() => setQuery('Eleanor')} className="px-2 py-0.5 rounded bg-white border border-slate-200 hover:border-teal-500">Eleanor Vance (Dental)</button>
          <button onClick={() => setQuery('Brody')} className="px-2 py-0.5 rounded bg-white border border-slate-200 hover:border-teal-500">Marcus Brody</button>
          <button onClick={() => setQuery('984210')} className="px-2 py-0.5 rounded bg-white border border-slate-200 hover:border-teal-500">#984210</button>
        </div>

        {/* Patient list results */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-slate-100">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              <span className="material-symbols-outlined text-3xl mb-1 text-slate-300">person_off</span>
              <p>No matching patient records found.</p>
            </div>
          ) : (
            filtered.map((pt) => (
              <div
                key={pt.id}
                onClick={() => {
                  onSelectPatient(pt);
                  onClose();
                }}
                className="p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={pt.avatar}
                    alt={pt.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200 ring-2 ring-slate-100"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-slate-900 group-hover:text-teal-700 transition-colors">
                        {pt.name}
                      </h4>
                      <span className="text-[11px] font-medium bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                        {pt.age}y {pt.gender}
                      </span>
                      <span className="font-mono text-[11px] text-teal-700 font-semibold bg-teal-50 px-1.5 py-0.5 rounded">
                        {pt.uhid}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <span>{pt.phone}</span>
                      <span>•</span>
                      <span>{pt.insurancePayer}</span>
                      <span>•</span>
                      <span className="text-slate-600 truncate max-w-xs">{pt.chiefComplaint}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {pt.allergies.length > 0 && (
                    <span className="text-[10px] bg-rose-50 text-rose-700 px-2 py-0.5 rounded font-bold border border-rose-200">
                      Allergy Alert
                    </span>
                  )}
                  <button className="px-2.5 py-1 text-xs font-semibold bg-teal-700 text-white rounded-md shadow-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    Open Chart
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <span>Press <kbd className="px-1 bg-white border border-slate-200 rounded text-slate-600 font-mono">ESC</kbd> to close</span>
            <span>•</span>
            <span>Press <kbd className="px-1 bg-white border border-slate-200 rounded text-slate-600 font-mono">↑</kbd> <kbd className="px-1 bg-white border border-slate-200 rounded text-slate-600 font-mono">↓</kbd> to navigate</span>
          </div>
          <span className="font-medium text-slate-500">Live Hospital EHR Index</span>
        </div>
      </div>
    </div>
  );
};
