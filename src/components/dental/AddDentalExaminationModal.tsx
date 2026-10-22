import React, { useState } from 'react';

interface AddDentalExaminationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (examData: any) => void;
}

export const AddDentalExaminationModal: React.FC<AddDentalExaminationModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  if (!isOpen) return null;

  const [notation, setNotation] = useState<'universal' | 'fdi'>('universal');
  const [activeMarker, setActiveMarker] = useState<string>('caries');
  const [selectedTooth, setSelectedTooth] = useState<number>(3);
  const [doctorNotes, setDoctorNotes] = useState(
    'Deep cavitation on Tooth #3 extending to pulp horns. Severe thermal sensitivity lingering > 20s. Advised immediate multi-visit RCT followed by core build-up and monolithic zirconia crown.'
  );

  // Upper Maxillary: 1 to 16
  const upperTeeth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  // Lower Mandibular: 32 down to 17
  const lowerTeeth = [32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17];

  const universalToFdi: Record<number, number> = {
    1: 18, 2: 17, 3: 16, 4: 15, 5: 14, 6: 13, 7: 12, 8: 11,
    9: 21, 10: 22, 11: 23, 12: 24, 13: 25, 14: 26, 15: 27, 16: 28,
    17: 38, 18: 37, 19: 36, 20: 35, 21: 34, 22: 33, 23: 32, 24: 31,
    25: 41, 26: 42, 27: 43, 28: 44, 29: 45, 30: 46, 31: 47, 32: 48,
  };

  // State of teeth markers: map tooth -> pathology
  const [teethMarkers, setTeethMarkers] = useState<Record<number, string>>({
    3: 'caries',
    14: 'composite',
    19: 'crown',
    30: 'rct',
  });

  const pathologyMarkers = [
    { id: 'caries', label: 'Caries / Cavity', color: 'bg-rose-500 text-white', border: 'border-rose-600', fill: '#ef4444' },
    { id: 'fracture', label: 'Fracture / Crack', color: 'bg-orange-500 text-white', border: 'border-orange-600', fill: '#f97316' },
    { id: 'pocket', label: 'Perio Pocket', color: 'bg-purple-600 text-white', border: 'border-purple-700', fill: '#9333ea' },
    { id: 'bop', label: 'BOP (Bleeding)', color: 'bg-red-700 text-white', border: 'border-red-800', fill: '#b91c1c' },
    { id: 'inflammation', label: 'Inflammation', color: 'bg-pink-500 text-white', border: 'border-pink-600', fill: '#ec4899' },
    { id: 'composite', label: 'Composite Resin', color: 'bg-blue-500 text-white', border: 'border-blue-600', fill: '#3b82f6' },
    { id: 'amalgam', label: 'Amalgam Restoration', color: 'bg-slate-600 text-white', border: 'border-slate-700', fill: '#475569' },
    { id: 'rct', label: 'RCT Treated', color: 'bg-violet-600 text-white', border: 'border-violet-700', fill: '#7c3aed' },
    { id: 'crown', label: 'Crown / Cap', color: 'bg-amber-500 text-white', border: 'border-amber-600', fill: '#f59e0b' },
    { id: 'missing', label: 'Missing / Extract', color: 'bg-zinc-400 text-slate-900', border: 'border-zinc-500', fill: '#a1a1aa' },
  ];

  const [chiefComplaints, setChiefComplaints] = useState<string[]>([
    'Severe Throbbing Toothache',
    'Cold & Heat Sensitivity',
  ]);

  const [investigations, setInvestigations] = useState<string[]>([
    'Periapical IOPA X-Ray (Tooth #3)',
    'Electric Pulp Test (EPT)',
  ]);

  const handleToggleComplaint = (tag: string) => {
    setChiefComplaints((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleToggleInvestigation = (inv: string) => {
    setInvestigations((prev) =>
      prev.includes(inv) ? prev.filter((i) => i !== inv) : [...prev, inv]
    );
  };

  const handleToothClick = (toothNum: number) => {
    setSelectedTooth(toothNum);
    // Apply currently active marker
    setTeethMarkers((prev) => ({
      ...prev,
      [toothNum]: activeMarker,
    }));
  };

  const handleClearTooth = (toothNum: number) => {
    setTeethMarkers((prev) => {
      const copy = { ...prev };
      delete copy[toothNum];
      return copy;
    });
  };

  const handleSave = () => {
    if (onSave) {
      onSave({
        teethMarkers,
        chiefComplaints,
        investigations,
        doctorNotes,
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-6xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in duration-200">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-orange-50/50 via-white to-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center shadow-sm shadow-orange-600/30">
              <span className="material-symbols-outlined text-[22px]">dentistry</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">
                  Add New Dental Examination & Odontogram Mapping
                </h2>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 border border-orange-200">
                  Swaraj Dental Studio
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Patient: <span className="font-bold text-slate-700">Eleanor Vance</span> (#DENT-984210) • 36y / F • Operatory 2
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notation toggle */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-semibold">
              <button
                type="button"
                onClick={() => setNotation('universal')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  notation === 'universal'
                    ? 'bg-white text-orange-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Universal (1-32)
              </button>
              <button
                type="button"
                onClick={() => setNotation('fdi')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  notation === 'fdi'
                    ? 'bg-white text-orange-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                FDI (11-48)
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* 10 Oral Pathology Markers Palette */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-orange-600 text-[16px]">palette</span>
                Select Pathology Marker to Paint Teeth:
              </span>
              <span className="text-[11px] text-slate-400">
                Active: <strong className="text-slate-700 uppercase">{activeMarker}</strong>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
              {pathologyMarkers.map((marker) => {
                const isSelected = activeMarker === marker.id;
                return (
                  <button
                    type="button"
                    key={marker.id}
                    onClick={() => setActiveMarker(marker.id)}
                    className={`px-2 py-2 rounded-xl text-[11px] font-bold text-center border transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                      isSelected
                        ? `${marker.color} ring-2 ring-offset-1 ring-slate-800 scale-102 shadow-sm`
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/50 shadow-xs"
                      style={{ backgroundColor: marker.fill }}
                    />
                    <span className="truncate w-full">{marker.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 16 Maxillary & 16 Mandibular Teeth Horizontal Chart */}
          <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200 space-y-5">
            {/* Upper Arch */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider px-2 mb-2">
                <span>Maxillary Teeth (Upper Right: 1-8)</span>
                <span>Upper Left: 9-16</span>
              </div>
              <div className="grid grid-cols-8 sm:grid-cols-16 gap-1.5">
                {upperTeeth.map((num) => {
                  const markerId = teethMarkers[num];
                  const marker = pathologyMarkers.find((m) => m.id === markerId);
                  const isSelected = selectedTooth === num;
                  const displayNum = notation === 'universal' ? num : universalToFdi[num];

                  return (
                    <div
                      key={num}
                      onClick={() => handleToothClick(num)}
                      className={`flex flex-col items-center justify-between p-2 rounded-xl transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-orange-50 border-2 border-orange-500 shadow-md scale-105'
                          : marker
                          ? 'bg-white border-2 border-slate-300 shadow-xs'
                          : 'bg-white hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      <span className="text-[11px] font-bold font-mono text-slate-800">
                        {displayNum}
                      </span>

                      {/* SVG Tooth Illustration */}
                      <svg className="w-7 h-10 my-1" viewBox="0 0 24 36" fill="none">
                        <path
                          d="M4 14 C4 6, 8 2, 12 2 C16 2, 20 6, 20 14 C20 18, 18 20, 12 20 C6 20, 4 18, 4 14 Z"
                          fill={marker ? marker.fill : '#f8fafc'}
                          stroke={isSelected ? '#ea580c' : '#94a3b8'}
                          strokeWidth="1.2"
                        />
                        {/* 5-Surface Segment Division */}
                        <circle cx="12" cy="11" r="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.8" />
                        <path
                          d="M6 20 L8 34 C9 36, 11 36, 11 32 L11 20 M13 20 L13 32 C13 36, 15 36, 16 34 L18 20"
                          stroke={isSelected ? '#ea580c' : '#cbd5e1'}
                          strokeWidth="1.2"
                          strokeLinecap="round"
                        />
                      </svg>

                      <span className="text-[9px] font-bold font-mono text-slate-500 uppercase truncate max-w-full">
                        {marker ? marker.id.substring(0, 3) : 'OK'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Midline divider */}
            <div className="relative flex items-center justify-center my-2">
              <div className="w-full border-t border-slate-300 border-dashed" />
              <span className="absolute bg-slate-100 px-3 py-0.5 rounded text-[10px] font-bold text-slate-400 uppercase tracking-widest border border-slate-200">
                Occlusal Bite Plane
              </span>
            </div>

            {/* Lower Arch */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider px-2 mb-2">
                <span>Mandibular Teeth (Lower Right: 32-25)</span>
                <span>Lower Left: 24-17</span>
              </div>
              <div className="grid grid-cols-8 sm:grid-cols-16 gap-1.5">
                {lowerTeeth.map((num) => {
                  const markerId = teethMarkers[num];
                  const marker = pathologyMarkers.find((m) => m.id === markerId);
                  const isSelected = selectedTooth === num;
                  const displayNum = notation === 'universal' ? num : universalToFdi[num];

                  return (
                    <div
                      key={num}
                      onClick={() => handleToothClick(num)}
                      className={`flex flex-col items-center justify-between p-2 rounded-xl transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-orange-50 border-2 border-orange-500 shadow-md scale-105'
                          : marker
                          ? 'bg-white border-2 border-slate-300 shadow-xs'
                          : 'bg-white hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      <span className="text-[11px] font-bold font-mono text-slate-800">
                        {displayNum}
                      </span>

                      {/* SVG Tooth Illustration (Roots Down) */}
                      <svg className="w-7 h-10 my-1" viewBox="0 0 24 36" fill="none">
                        <path
                          d="M4 16 C4 24, 8 28, 12 28 C16 28, 20 24, 20 16 C20 12, 18 10, 12 10 C6 10, 4 12, 4 16 Z"
                          fill={marker ? marker.fill : '#f8fafc'}
                          stroke={isSelected ? '#ea580c' : '#94a3b8'}
                          strokeWidth="1.2"
                        />
                        <circle cx="12" cy="19" r="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.8" />
                        <path
                          d="M6 10 L8 2 C9 0, 11 0, 11 4 L11 10 M13 10 L13 4 C13 0, 15 0, 16 2 L18 10"
                          stroke={isSelected ? '#ea580c' : '#cbd5e1'}
                          strokeWidth="1.2"
                          strokeLinecap="round"
                        />
                      </svg>

                      <span className="text-[9px] font-bold font-mono text-slate-500 uppercase truncate max-w-full">
                        {marker ? marker.id.substring(0, 3) : 'OK'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Clinical Complaints & Diagnostic Investigation Orders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Chief Complaints */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Chief Dental Complaints & Symptoms
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Severe Throbbing Toothache',
                  'Cold & Heat Sensitivity',
                  'Food Impaction in Cavity',
                  'Bleeding When Brushing',
                  'Broken Cusp / Restoration',
                  'Swelling / Gum Abscess',
                  'Aesthetic Discoloration',
                ].map((tag) => {
                  const active = chiefComplaints.includes(tag);
                  return (
                    <button
                      type="button"
                      key={tag}
                      onClick={() => handleToggleComplaint(tag)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        active
                          ? 'bg-orange-600 text-white shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Diagnostic Orders */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Chairside Investigations Required
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Periapical IOPA X-Ray (Tooth #3)',
                  'Full Mouth OPG Panoramic',
                  'Cone Beam CT (CBCT 3D)',
                  'Electric Pulp Test (EPT)',
                  'Periodontal Probing Matrix',
                  'Intraoral Color STL Scan',
                ].map((inv) => {
                  const active = investigations.includes(inv);
                  return (
                    <button
                      type="button"
                      key={inv}
                      onClick={() => handleToggleInvestigation(inv)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        active
                          ? 'bg-purple-600 text-white shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {inv}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Doctor Notes */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Clinical Findings & Encounter Summary
            </label>
            <textarea
              rows={3}
              value={doctorNotes}
              onChange={(e) => setDoctorNotes(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="text-xs text-slate-500 font-medium">
            Tagged <strong className="text-slate-800">{Object.keys(teethMarkers).length} teeth</strong> with clinical conditions
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md shadow-orange-600/25 flex items-center gap-1.5 transition-all cursor-pointer active:scale-98"
            >
              <span className="material-symbols-outlined text-[18px]">check</span>
              <span>Save Examination & Update Dental EHR</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
