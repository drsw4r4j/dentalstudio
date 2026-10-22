import React, { useState } from 'react';
import { 
  mockDentalPatient, 
  mockTreatmentPhases, 
  mockPeriodontalData 
} from '../../data/mockData';
import { TreatmentPhase } from '../../types';

interface DentalChartEHRProps {
  onOpenExaminationModal: () => void;
  onOpenScheduleOperatory: () => void;
}

export const DentalChartEHR: React.FC<DentalChartEHRProps> = ({
  onOpenExaminationModal,
  onOpenScheduleOperatory,
}) => {
  const [activeTab, setActiveTab] = useState<'odontogram' | 'perio' | 'treatment-plan' | 'radiographs' | 'dental-rx'>('odontogram');
  const [selectedTooth, setSelectedTooth] = useState<number>(3); // Universal #3 (Upper Right First Molar)
  const [treatmentPhases, setTreatmentPhases] = useState<TreatmentPhase[]>(mockTreatmentPhases);
  const [activeNumbering, setActiveNumbering] = useState<'universal' | 'fdi'>('universal');
  const [planApproved, setPlanApproved] = useState(false);

  // Tooth 1-16 (Upper) and 32-17 (Lower)
  const upperTeeth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  const lowerTeeth = [32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17];

  // Universal to FDI map
  const universalToFdi: Record<number, number> = {
    1: 18, 2: 17, 3: 16, 4: 15, 5: 14, 6: 13, 7: 12, 8: 11,
    9: 21, 10: 22, 11: 23, 12: 24, 13: 25, 14: 26, 15: 27, 16: 28,
    17: 38, 18: 37, 19: 36, 20: 35, 21: 34, 22: 33, 23: 32, 24: 31,
    25: 41, 26: 42, 27: 43, 28: 44, 29: 45, 30: 46, 31: 47, 32: 48,
  };

  // Conditions mock mapping for visualization
  const toothConditions: Record<number, { condition: string; color: string; bg: string; surfaces?: string }> = {
    3: { condition: 'Caries + Pulpitis (Active)', color: 'text-rose-600', bg: 'bg-rose-50 border-rose-300', surfaces: 'MOD' },
    14: { condition: 'Composite Resin', color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200', surfaces: 'O' },
    19: { condition: 'Zirconia Crown (PFZ)', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' },
    30: { condition: 'RCT Completed + Post', color: 'text-purple-600', bg: 'bg-purple-50 border-purple-200' },
  };

  const totalCost = treatmentPhases.reduce((acc, p) => acc + p.cost, 0);
  const insuranceDeltaCover = 1280.00;
  const patientEstimatedDue = Math.max(0, totalCost - insuranceDeltaCover);

  return (
    <div className="space-y-5 pb-12">
      {/* Patient Header Banner (Matches Image 9) */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img
                src={mockDentalPatient.avatar}
                alt={mockDentalPatient.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-orange-500 shadow-sm"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg font-bold text-slate-900">{mockDentalPatient.name}</h1>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  {mockDentalPatient.uhid}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 font-semibold border border-orange-200">
                  Active Chair: Operatory 2 (A-dec 500)
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 flex-wrap">
                <span>36y / Female</span>
                <span>•</span>
                <span>DOB: 08-Sep-1988</span>
                <span>•</span>
                <span className="font-semibold text-slate-700">Payer: Delta Dental Premier PPO (#DPA-8422-V)</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Allergy alert box */}
            <div className="px-3 py-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-rose-600 text-[18px]">warning</span>
              <div>
                <span className="font-bold">ALLERGY WARNING:</span>
                <span className="ml-1 font-medium">Latex, Amoxicillin (Severe Anaphylaxis)</span>
              </div>
            </div>

            <button
              onClick={onOpenExaminationModal}
              className="px-3.5 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[17px]">add_circle</span>
              <span>+ Add Examination</span>
            </button>
          </div>
        </div>

        {/* Dental Diagnostic Scoreboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-3 border-t border-slate-100 text-xs">
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">DMFT Index</span>
            <div className="text-base font-bold text-slate-900 mt-0.5">04 Score</div>
            <div className="text-[10px] text-slate-500">D: 1 • M: 0 • F: 3</div>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Plaque Score (O'Leary)</span>
            <div className="text-base font-bold text-emerald-600 mt-0.5">18% (Good)</div>
            <div className="text-[10px] text-slate-500">Optimal target &lt; 20%</div>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Bleeding on Probing (BOP)</span>
            <div className="text-base font-bold text-rose-600 mt-0.5">12% Positive</div>
            <div className="text-[10px] text-slate-500">Localized UR Sextant (Tooth #3)</div>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">CAMBRA Caries Risk</span>
            <div className="text-base font-bold text-amber-600 mt-0.5">Moderate Risk</div>
            <div className="text-[10px] text-slate-500">Rec: 5,000ppm NaF paste</div>
          </div>
        </div>
      </div>

      {/* Primary Charting Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-3 rounded-t-xl">
        <div className="flex items-center gap-1 overflow-x-auto py-1">
          <button
            onClick={() => setActiveTab('odontogram')}
            className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'odontogram'
                ? 'bg-orange-50 text-orange-700 border-b-2 border-orange-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-[17px]">dentistry</span>
            <span>32-Tooth Odontogram</span>
          </button>

          <button
            onClick={() => setActiveTab('perio')}
            className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'perio'
                ? 'bg-orange-50 text-orange-700 border-b-2 border-orange-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-[17px]">straighten</span>
            <span>6-Point Perio Matrix</span>
          </button>

          <button
            onClick={() => setActiveTab('treatment-plan')}
            className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'treatment-plan'
                ? 'bg-orange-50 text-orange-700 border-b-2 border-orange-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-[17px]">assignment_turned_in</span>
            <span>3-Phase Treatment Plan</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-orange-100 text-orange-800">
              $2,050
            </span>
          </button>

          <button
            onClick={() => setActiveTab('radiographs')}
            className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'radiographs'
                ? 'bg-orange-50 text-orange-700 border-b-2 border-orange-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-[17px]">radiology</span>
            <span>X-Rays & DICOM Viewer</span>
          </button>

          <button
            onClick={() => setActiveTab('dental-rx')}
            className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'dental-rx'
                ? 'bg-orange-50 text-orange-700 border-b-2 border-orange-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-[17px]">prescriptions</span>
            <span>Dental Rx & Post-Op Regimen</span>
          </button>
        </div>

        {/* Numbering system switcher */}
        <div className="hidden sm:flex items-center gap-1 text-[11px] font-semibold bg-slate-100 p-1 rounded-lg">
          <span className="text-slate-500 mr-1 text-[10px] uppercase">Notation:</span>
          <button
            onClick={() => setActiveNumbering('universal')}
            className={`px-2 py-0.5 rounded transition-all ${
              activeNumbering === 'universal'
                ? 'bg-white text-orange-600 shadow-xs'
                : 'text-slate-600'
            }`}
          >
            Universal (1-32)
          </button>
          <button
            onClick={() => setActiveNumbering('fdi')}
            className={`px-2 py-0.5 rounded transition-all ${
              activeNumbering === 'fdi'
                ? 'bg-white text-orange-600 shadow-xs'
                : 'text-slate-600'
            }`}
          >
            FDI (11-48)
          </button>
        </div>
      </div>

      {/* Tab 1: Odontogram (Adult 32-Tooth Interactive Chart) */}
      {activeTab === 'odontogram' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Odontogram Canvas (2 Cols) */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Full Permanent Dentition Odontogram
                </h3>
                <p className="text-[11px] text-slate-500">
                  Select a tooth to view surface pathology (MODBL), endodontic state, and restoration history
                </p>
              </div>

              {/* Status color chips legend */}
              <div className="flex items-center gap-2 flex-wrap text-[10px] font-bold">
                <span className="flex items-center gap-1 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-200 border border-slate-400" />
                  Sound
                </span>
                <span className="flex items-center gap-1 text-rose-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  Caries
                </span>
                <span className="flex items-center gap-1 text-blue-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  Composite
                </span>
                <span className="flex items-center gap-1 text-purple-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                  RCT
                </span>
                <span className="flex items-center gap-1 text-amber-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  Crown
                </span>
              </div>
            </div>

            {/* Maxillary Arch (Upper Teeth 1 - 16) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider px-1">
                <span>Maxillary Arch (Upper Right 1-8)</span>
                <span>(Upper Left 9-16)</span>
              </div>
              <div className="grid grid-cols-8 sm:grid-cols-16 gap-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                {upperTeeth.map((num) => {
                  const cond = toothConditions[num];
                  const isSelected = selectedTooth === num;
                  const displayNum = activeNumbering === 'universal' ? num : universalToFdi[num];
                  return (
                    <button
                      key={num}
                      onClick={() => setSelectedTooth(num)}
                      className={`flex flex-col items-center justify-between p-1.5 rounded-lg transition-all cursor-pointer ${
                        isSelected
                          ? 'ring-2 ring-orange-500 bg-orange-50 shadow-sm'
                          : cond
                          ? cond.bg
                          : 'bg-white hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      <span className="text-[11px] font-bold font-mono text-slate-800">
                        {displayNum}
                      </span>
                      {/* Stylized Tooth SVG */}
                      <svg className="w-6 h-9 my-1" viewBox="0 0 24 36" fill="none">
                        {/* Crown */}
                        <path
                          d="M4 14 C4 6, 8 2, 12 2 C16 2, 20 6, 20 14 C20 18, 18 20, 12 20 C6 20, 4 18, 4 14 Z"
                          fill={cond ? (num === 3 ? '#ef4444' : num === 14 ? '#3b82f6' : '#f59e0b') : '#f1f5f9'}
                          stroke={isSelected ? '#ea580c' : '#94a3b8'}
                          strokeWidth="1.2"
                        />
                        {/* Surface division crosshair */}
                        <circle cx="12" cy="11" r="3" fill={num === 3 ? '#991b1b' : '#ffffff'} stroke="#cbd5e1" strokeWidth="0.8" />
                        {/* Root */}
                        <path
                          d="M6 20 L8 34 C9 36, 11 36, 11 32 L11 20 M13 20 L13 32 C13 36, 15 36, 16 34 L18 20"
                          stroke={isSelected ? '#ea580c' : '#cbd5e1'}
                          strokeWidth="1.2"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="text-[9px] font-bold text-slate-400">
                        {num === 3 ? 'MOD' : num === 14 ? 'O' : ''}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Occlusal Plane separator bar */}
            <div className="relative flex items-center justify-center my-3">
              <div className="w-full border-t border-dashed border-slate-300" />
              <span className="absolute bg-white px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Occlusal Plane Line
              </span>
            </div>

            {/* Mandibular Arch (Lower Teeth 32 - 17) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider px-1">
                <span>Mandibular Arch (Lower Right 32-25)</span>
                <span>(Lower Left 24-17)</span>
              </div>
              <div className="grid grid-cols-8 sm:grid-cols-16 gap-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                {lowerTeeth.map((num) => {
                  const cond = toothConditions[num];
                  const isSelected = selectedTooth === num;
                  const displayNum = activeNumbering === 'universal' ? num : universalToFdi[num];
                  return (
                    <button
                      key={num}
                      onClick={() => setSelectedTooth(num)}
                      className={`flex flex-col items-center justify-between p-1.5 rounded-lg transition-all cursor-pointer ${
                        isSelected
                          ? 'ring-2 ring-orange-500 bg-orange-50 shadow-sm'
                          : cond
                          ? cond.bg
                          : 'bg-white hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      <span className="text-[11px] font-bold font-mono text-slate-800">
                        {displayNum}
                      </span>
                      {/* Stylized Tooth SVG (Roots Pointing Downward) */}
                      <svg className="w-6 h-9 my-1" viewBox="0 0 24 36" fill="none">
                        {/* Crown */}
                        <path
                          d="M4 16 C4 24, 8 28, 12 28 C16 28, 20 24, 20 16 C20 12, 18 10, 12 10 C6 10, 4 12, 4 16 Z"
                          fill={cond ? (num === 19 ? '#f59e0b' : num === 30 ? '#a855f7' : '#3b82f6') : '#f1f5f9'}
                          stroke={isSelected ? '#ea580c' : '#94a3b8'}
                          strokeWidth="1.2"
                        />
                        <circle cx="12" cy="19" r="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.8" />
                        {/* Root upwards */}
                        <path
                          d="M6 10 L8 2 C9 0, 11 0, 11 4 L11 10 M13 10 L13 4 C13 0, 15 0, 16 2 L18 10"
                          stroke={isSelected ? '#ea580c' : '#cbd5e1'}
                          strokeWidth="1.2"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="text-[9px] font-bold text-slate-400">
                        {num === 19 ? 'CRN' : num === 30 ? 'RCT' : ''}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Tooth Specific Inspector & Pathology Detail Card (1 Col) */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-700 font-bold font-mono text-sm flex items-center justify-center">
                  #{selectedTooth}
                </span>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    {selectedTooth === 3 ? 'Maxillary Right 1st Molar' : `Tooth #${selectedTooth}`}
                  </h4>
                  <span className="text-[10px] text-slate-500 font-mono">
                    FDI Notation: {universalToFdi[selectedTooth]} • Quad 1
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                Pulp Involved
              </span>
            </div>

            {/* 5-Surface MODBL Status Map */}
            <div>
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-2">
                5-Surface Anatomical Inspection
              </span>
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono font-bold">
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-sans">Mesial (M)</span>
                  <span className="text-rose-600">Caries (3.2mm)</span>
                </div>
                <div className="p-2 rounded bg-rose-50 border border-rose-300">
                  <span className="text-[10px] text-rose-400 block font-sans">Occlusal (O)</span>
                  <span className="text-rose-700">Deep Cavitation</span>
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-sans">Distal (D)</span>
                  <span className="text-rose-600">Incipient</span>
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-200 col-span-1.5">
                  <span className="text-[10px] text-slate-400 block font-sans">Buccal (B)</span>
                  <span className="text-slate-700">Sound</span>
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-200 col-span-1.5">
                  <span className="text-[10px] text-slate-400 block font-sans">Lingual / Palatal (L)</span>
                  <span className="text-slate-700">Sound</span>
                </div>
              </div>
            </div>

            {/* Clinical Findings & Diagnosis */}
            <div className="space-y-2 text-xs">
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                Clinical Diagnosis & Vitality Tests
              </span>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Endo Vitality (Cold Test):</span>
                  <span className="font-bold text-rose-600">Severe Lingering Pain (22s)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Percussion Test:</span>
                  <span className="font-bold text-amber-700">Positive (+) Tender</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Probing Depth:</span>
                  <span className="font-bold text-slate-800">5mm Mesiobuccal with BOP</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Working Diagnosis:</span>
                  <span className="font-bold text-rose-700">Symptomatic Irreversible Pulpitis</span>
                </div>
              </div>
            </div>

            {/* Immediate Action Buttons */}
            <div className="pt-2 space-y-2">
              <button
                onClick={onOpenScheduleOperatory}
                className="w-full py-2.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[17px]">chair</span>
                <span>Stage Tooth #3 for Root Canal (Chair 2)</span>
              </button>
              <button
                onClick={onOpenExaminationModal}
                className="w-full py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
              >
                Modify Tooth Pathology Markers
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: 6-Point Periodontal Matrix */}
      {activeTab === 'perio' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Periodontal Probing Depth Matrix (6-Point Assessment)
              </h3>
              <p className="text-[11px] text-slate-500">
                Distobuccal, Midbuccal, Mesiobuccal, Distolingual, Midlingual, Mesiolingual depths with Bleeding on Probing (BOP)
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                &le; 3mm Healthy
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 font-semibold">
                4mm Pocket
              </span>
              <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 font-semibold">
                &ge; 5mm Severe / BOP
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold uppercase text-[10px]">
                <tr>
                  <th className="py-2.5 px-3">Tooth #</th>
                  <th className="py-2.5 px-2">FDI</th>
                  <th className="py-2.5 px-2 text-center">Distobuccal</th>
                  <th className="py-2.5 px-2 text-center">Midbuccal</th>
                  <th className="py-2.5 px-2 text-center">Mesiobuccal</th>
                  <th className="py-2.5 px-2 text-center">Distolingual</th>
                  <th className="py-2.5 px-2 text-center">Midlingual</th>
                  <th className="py-2.5 px-2 text-center">Mesiolingual</th>
                  <th className="py-2.5 px-2 text-center">Furcation</th>
                  <th className="py-2.5 px-3 text-center">BOP Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {mockPeriodontalData.map((row) => (
                  <tr key={row.toothNumber} className="hover:bg-slate-50">
                    <td className="py-3 px-3 font-bold text-slate-900">{row.toothNumber}</td>
                    <td className="py-3 px-2 text-slate-500">{row.fdiNumber}</td>
                    <td className={`py-3 px-2 text-center ${row.distobuccal.includes('*') ? 'text-rose-600 font-bold bg-rose-50/50' : 'text-slate-700'}`}>
                      {row.distobuccal}
                    </td>
                    <td className="py-3 px-2 text-center text-slate-700">{row.midbuccal}</td>
                    <td className={`py-3 px-2 text-center ${row.mesiobuccal.includes('*') ? 'text-rose-600 font-bold bg-rose-50/50' : 'text-slate-700'}`}>
                      {row.mesiobuccal}
                    </td>
                    <td className={`py-3 px-2 text-center ${row.distolingual.includes('*') ? 'text-rose-600 font-bold bg-rose-50/50' : 'text-slate-700'}`}>
                      {row.distolingual}
                    </td>
                    <td className="py-3 px-2 text-center text-slate-700">{row.midlingual}</td>
                    <td className={`py-3 px-2 text-center ${row.mesiolingual.includes('*') ? 'text-rose-600 font-bold bg-rose-50/50' : 'text-slate-700'}`}>
                      {row.mesiolingual}
                    </td>
                    <td className="py-3 px-2 text-center text-slate-600 font-sans">{row.furcation}</td>
                    <td className="py-3 px-3 text-center font-sans">
                      {row.isBleeding ? (
                        <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold">
                          BOP (+) Active
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px]">
                          Negative
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: 3-Phase Comprehensive Treatment Plan */}
      {activeTab === 'treatment-plan' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Phased Clinical Treatment Plan
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Sequenced by urgency, prosthetic requirement, and periodontal stabilization
                  </p>
                </div>
                <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-200">
                  Dr. Sarah Jenkins, DDS
                </span>
              </div>

              <div className="space-y-3">
                {treatmentPhases.map((phase) => (
                  <div
                    key={phase.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-orange-50/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-orange-600 text-white font-bold text-xs flex items-center justify-center">
                          {phase.phaseNumber}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">{phase.title}</h4>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                          {phase.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 max-w-xl">{phase.description}</p>
                      <div className="text-[10px] text-slate-500 flex items-center gap-2 pt-1">
                        <span className="font-semibold text-orange-700">{phase.statusText}</span>
                        <span>•</span>
                        <span>{phase.estDuration}</span>
                      </div>
                    </div>

                    <div className="text-right sm:border-l sm:border-slate-200 sm:pl-4 min-w-[110px]">
                      <div className="text-base font-bold font-mono text-slate-900">
                        ${phase.cost.toFixed(2)}
                      </div>
                      <span className="text-[10px] text-emerald-600 font-semibold block">
                        Delta PPO Covered
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Financial Breakdown & Consent Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
              Insurance & Financial Estimate
            </h4>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Total Clinical Fee:</span>
                <span className="font-mono font-bold text-slate-900">${totalCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>Delta Dental Premier PPO (Est):</span>
                <span className="font-mono font-bold">-${insuranceDeltaCover.toFixed(2)}</span>
              </div>
              <div className="border-t border-slate-200 pt-2 flex justify-between text-sm font-bold text-slate-900">
                <span>Patient Estimated Co-Pay:</span>
                <span className="text-orange-600 font-mono">${patientEstimatedDue.toFixed(2)}</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-orange-50 border border-orange-200 text-xs text-orange-900 space-y-1">
              <span className="font-bold block">Patient Informed Consent:</span>
              <p className="text-[11px] text-orange-800">
                Eleanor Vance consented to Phase 1 Root Canal Therapy and pre-authorized electronic signature on file.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => setPlanApproved(!planApproved)}
                className={`w-full py-2.5 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  planApproved
                    ? 'bg-emerald-600 text-white'
                    : 'bg-orange-600 hover:bg-orange-700 text-white shadow-xs'
                }`}
              >
                <span className="material-symbols-outlined text-[17px]">
                  {planApproved ? 'check_circle' : 'draw'}
                </span>
                <span>{planApproved ? 'Plan Approved & Signed' : 'Authorize & Sign Treatment Plan'}</span>
              </button>

              <button
                onClick={onOpenScheduleOperatory}
                className="w-full py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
              >
                Schedule Next Stage (Phase 2 Prep)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Digital Radiographs & DICOM Viewer */}
      {activeTab === 'radiographs' && (
        <div className="bg-slate-900 rounded-xl p-5 text-white shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-orange-400 text-[18px]">radiology</span>
                Periapical Digital Radiograph — Tooth #3 (FDI 16)
              </h3>
              <p className="text-[11px] text-slate-400">
                Taken today 08:45 AM • Sensor: Dexis Platinum • Exposure: 0.12s • Resolution: 20 lp/mm
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <button className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium">
                Invert Contrast
              </button>
              <button className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium">
                Measure Apex (21.5mm)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 bg-black rounded-lg border border-slate-800 overflow-hidden relative flex items-center justify-center p-4 min-h-[320px]">
              {/* Radiograph Mock Simulation Display */}
              <div className="relative text-center">
                <div className="w-72 h-80 bg-gradient-to-b from-slate-900 via-slate-800 to-black rounded border border-slate-700 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl">
                  {/* Bone trabeculae texture simulation */}
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:8px_8px]" />
                  
                  {/* Stylized radiograph tooth with periapical lesion */}
                  <svg className="w-48 h-64 relative z-10" viewBox="0 0 100 140">
                    {/* Alveolar Bone Crest */}
                    <path d="M0 60 Q50 65 100 60 L100 140 L0 140 Z" fill="#1e293b" opacity="0.8" />
                    {/* Molar Crown with radiolucent cavity */}
                    <path d="M25 55 C25 25 35 15 50 15 C65 15 75 25 75 55 Z" fill="#94a3b8" />
                    <circle cx="50" cy="30" r="10" fill="#0f172a" />
                    {/* Pulp Chamber */}
                    <path d="M42 35 L40 60 L60 60 L58 35 Z" fill="#0f172a" />
                    {/* Roots */}
                    <path d="M30 55 C30 90 35 110 38 115" stroke="#94a3b8" strokeWidth="8" strokeLinecap="round" />
                    <path d="M70 55 C70 90 65 110 62 115" stroke="#94a3b8" strokeWidth="8" strokeLinecap="round" />
                    {/* Root Canal Lines */}
                    <path d="M38 60 L38 112" stroke="#0f172a" strokeWidth="2" />
                    <path d="M62 60 L62 112" stroke="#0f172a" strokeWidth="2" />
                    {/* Periapical Radiolucency (Abcess / Granuloma) */}
                    <circle cx="38" cy="118" r="9" fill="#020617" opacity="0.9" stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" />
                  </svg>

                  <div className="absolute bottom-2 left-3 text-[10px] text-slate-400 font-mono">
                    Apical Radiolucency: ~4.5mm Dia
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/60 rounded-lg p-4 space-y-3 text-xs">
              <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider block">
                Radiographic Findings
              </span>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start gap-1.5">
                  <span className="material-symbols-outlined text-rose-400 text-[16px] shrink-0">emergency</span>
                  <span>Deep occlusal caries encroaching mesial pulp horn of Tooth #3.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="material-symbols-outlined text-amber-400 text-[16px] shrink-0">radio_button_checked</span>
                  <span>Widening of periodontal ligament (PDL) space around mesiobuccal root apex.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="material-symbols-outlined text-emerald-400 text-[16px] shrink-0">check_circle</span>
                  <span>Root morphology: 3 canals identified (MB1, DB, Palatal). MB2 suspected.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Dental Rx Composer */}
      {activeTab === 'dental-rx' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Targeted Dental Pharmacotherapy & Post-Op Regimen
              </h3>
              <p className="text-[11px] text-slate-500">
                Customized for Eleanor Vance • Note: Penicillin/Amoxicillin allergy strictly avoided
              </p>
            </div>
            <span className="px-2.5 py-1 rounded bg-rose-100 text-rose-800 font-bold text-xs">
              CDS Allergy Guard: Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5 text-xs">
              <div className="flex justify-between font-bold text-slate-900">
                <span>Tab. Ketorolac 10mg</span>
                <span className="text-orange-600">NSAID Analgesic</span>
              </div>
              <p className="text-[11px] text-slate-600">
                Sig: 1 tab PO q6h PRN for acute throbbing pain (Max 5 days)
              </p>
              <div className="text-[10px] text-slate-400 font-mono">Qty: 10 Tabs • Dispense at POS</div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5 text-xs">
              <div className="flex justify-between font-bold text-slate-900">
                <span>Chlorhexidine Gluconate 0.2%</span>
                <span className="text-teal-600">Oral Rinse</span>
              </div>
              <p className="text-[11px] text-slate-600">
                Sig: Rinse 15mL twice daily for 30s after brushing. Do not swallow.
              </p>
              <div className="text-[10px] text-slate-400 font-mono">Qty: 200mL Bottle</div>
            </div>

            <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-1.5 text-xs">
              <div className="flex justify-between font-bold text-slate-900">
                <span>Cap. Clindamycin 300mg</span>
                <span className="text-emerald-700">Penicillin Safe</span>
              </div>
              <p className="text-[11px] text-slate-600">
                Sig: 1 cap PO q8h with a full glass of water for 5 days.
              </p>
              <div className="text-[10px] text-emerald-800 font-semibold">Safe for Amoxicillin Anaphylaxis</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
