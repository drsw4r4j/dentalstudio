import React, { useState } from 'react';
import { QueueToken } from '../../types';
import { initialQueueTokens } from '../../data/mockData';
import { playHospitalChime } from '../../utils/audio';

interface QueueSchedulingProps {
  onStartConsultation?: (token: QueueToken) => void;
}

export const QueueScheduling: React.FC<QueueSchedulingProps> = ({
  onStartConsultation
}) => {
  const [tokens, setTokens] = useState<QueueToken[]>(initialQueueTokens);
  const [activeToken, setActiveToken] = useState<QueueToken>(initialQueueTokens[0]);
  const [filter, setFilter] = useState<'All' | 'Waiting' | 'Vitals Pending' | 'In-Consult' | 'Completed'>('All');
  const [provider, setProvider] = useState('jenkins');
  const [chimeEnabled, setChimeEnabled] = useState(true);
  const [announcementToast, setAnnouncementToast] = useState<{ visible: boolean; message: string }>({
    visible: false,
    message: ''
  });

  // Express walk-in intake states
  const [phoneInput, setPhoneInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [ageInput, setAgeInput] = useState('45');
  const [genderInput, setGenderInput] = useState('M');
  const [visitTypeInput, setVisitTypeInput] = useState('walkin');
  const [complaintInput, setComplaintInput] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchRoster, setSearchRoster] = useState('');

  const quickTags = ['Fever', 'Follow-up', 'Prescription Refill', 'Wound Care', 'Hypertension'];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
      setComplaintInput(prev => prev.replace(tag, '').replace(/,\s*,/g, ',').replace(/^,\s*|,\s*$/g, ''));
    } else {
      setSelectedTags([...selectedTags, tag]);
      setComplaintInput(prev => (prev ? `${prev}, ${tag}` : tag));
    }
  };

  const triggerAnnounce = (tok: QueueToken = activeToken) => {
    if (chimeEnabled) {
      playHospitalChime();
    }
    setAnnouncementToast({
      visible: true,
      message: `Calling Token #${tok.tokenNumber} (${tok.patientName}) to OPD Room 104`
    });
    setTimeout(() => {
      setAnnouncementToast({ visible: false, message: '' });
    }, 3800);
  };

  const handleCallToken = (tok: QueueToken) => {
    setActiveToken(tok);
    triggerAnnounce(tok);
  };

  const handleNewWalkIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;

    const nextNum = `A-${tokens.length + 24}`;
    const newToken: QueueToken = {
      id: `tok-${Date.now()}`,
      tokenNumber: nextNum,
      patientName: nameInput.trim(),
      age: parseInt(ageInput, 10) || 40,
      gender: genderInput === 'M' ? 'Male' : genderInput === 'F' ? 'Female' : 'Other',
      uhid: `#MC-${Math.floor(100000 + Math.random() * 900000)}`,
      phone: phoneInput.trim(),
      arrivalTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      waitTime: 'Just arrived',
      triagePriority: 'Routine / Green',
      chiefComplaint: complaintInput.trim() || 'General OPD Consultation',
      assignedDoctor: 'Dr. Sarah Jenkins',
      vitalsStatus: 'Pending Intake Desk'
    };

    setTokens([newToken, ...tokens]);

    // Show confirmation
    setAnnouncementToast({
      visible: true,
      message: `Token #${nextNum} Generated for ${nameInput} (Enqueued to OPD Room 104)`
    });
    setTimeout(() => {
      setAnnouncementToast({ visible: false, message: '' });
    }, 3500);

    // Reset form
    setNameInput('');
    setPhoneInput('');
    setComplaintInput('');
    setSelectedTags([]);
  };

  const filteredTokens = tokens.filter(tok => {
    if (searchRoster) {
      const q = searchRoster.toLowerCase();
      if (!tok.patientName.toLowerCase().includes(q) && !tok.tokenNumber.toLowerCase().includes(q) && !tok.uhid.toLowerCase().includes(q)) {
        return false;
      }
    }
    if (filter === 'Waiting') return tok.waitTime.includes('min') || tok.waitTime.includes('ago');
    if (filter === 'Vitals Pending') return tok.vitalsStatus.toLowerCase().includes('pending');
    if (filter === 'In-Consult') return tok.isCalling;
    if (filter === 'Completed') return tok.vitalsStatus.toLowerCase().includes('complete');
    return true;
  });

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Command Ribbon & Clinic Station Bar */}
      <section className="bg-white px-4 py-3 border-b border-slate-200 shadow-xs flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Provider Switcher & Session Filter */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200/60">
              <span className="material-symbols-outlined text-[16px] text-teal-700">clinical_notes</span>
              <span className="text-[11px] font-bold uppercase text-slate-500 tracking-wider">Workstation Provider</span>
            </div>
            <div className="relative">
              <select
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                className="bg-slate-50 text-slate-900 text-xs font-semibold pl-3 pr-8 py-1.5 rounded-lg border border-slate-200 focus:outline-none cursor-pointer"
              >
                <option value="jenkins">Dr. Sarah Jenkins (Internal Medicine - Room 104)</option>
                <option value="rivera">Dr. Mark Rivera (Cardiology - Room 108)</option>
                <option value="desai">Dr. Anita Desai (Pediatrics - Room 102)</option>
              </select>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-700">
              <span className="material-symbols-outlined text-[15px] text-slate-400">calendar_today</span>
              <span className="font-semibold">Today, Monday Nov 18, 2024</span>
              <span className="text-slate-300">•</span>
              <span className="text-teal-700 font-semibold bg-teal-50 px-1.5 py-0.5 rounded">
                Morning Session (08:30 AM - 01:30 PM)
              </span>
            </div>
          </div>

          {/* Action Hotkeys & Queue Sound Status */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setChimeEnabled(!chimeEnabled)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border ${
                chimeEnabled
                  ? 'bg-teal-50 text-teal-800 border-teal-200'
                  : 'bg-slate-100 text-slate-600 border-slate-200'
              }`}
            >
              <span className="material-symbols-outlined text-[16px] text-teal-700">
                {chimeEnabled ? 'volume_up' : 'volume_off'}
              </span>
              <span>PA Chime: {chimeEnabled ? 'Active' : 'Muted'}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              <span>Print Slip Ledger</span>
            </button>
          </div>
        </div>

        {/* Queue KPI Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5 pt-1">
          {/* Total Registered */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-[11px] font-bold uppercase tracking-wider">Total Registered Today</span>
              <span className="material-symbols-outlined text-[16px] text-slate-400">how_to_reg</span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-slate-900 font-mono">42</span>
              <span className="text-xs text-slate-500">Patients</span>
            </div>
            <div className="w-full bg-slate-200 h-1 rounded-full mt-2 overflow-hidden">
              <div className="bg-teal-600 h-full rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>

          {/* In Waiting Lounge */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 flex flex-col justify-between">
            <div className="flex items-center justify-between text-indigo-700">
              <span className="text-[11px] font-bold uppercase tracking-wider">In Waiting Lounge</span>
              <span className="material-symbols-outlined text-[16px] text-indigo-600">hourglass_top</span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-indigo-700 font-mono">9</span>
              <span className="text-xs text-slate-500">Avg wait: <strong className="text-slate-800">14 mins</strong></span>
            </div>
            <div className="w-full bg-slate-200 h-1 rounded-full mt-2 overflow-hidden">
              <div className="bg-indigo-600 h-full rounded-full" style={{ width: '28%' }}></div>
            </div>
          </div>

          {/* Currently In Consultation */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 flex flex-col justify-between">
            <div className="flex items-center justify-between text-teal-800">
              <span className="text-[11px] font-bold uppercase tracking-wider">In Consultation</span>
              <span className="material-symbols-outlined text-[16px] text-teal-700">stethoscope</span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-teal-800 font-mono">3</span>
              <span className="text-xs text-slate-500">Active Rooms</span>
            </div>
            <div className="w-full bg-slate-200 h-1 rounded-full mt-2 overflow-hidden">
              <div className="bg-teal-700 h-full rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>

          {/* Completed Encounters */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-[11px] font-bold uppercase tracking-wider">Completed Encounters</span>
              <span className="material-symbols-outlined text-[16px] text-slate-400">task_alt</span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-slate-900 font-mono">28</span>
              <span className="text-xs text-slate-500">66.7% shift quota</span>
            </div>
            <div className="w-full bg-slate-200 h-1 rounded-full mt-2 overflow-hidden">
              <div className="bg-slate-600 h-full rounded-full" style={{ width: '66%' }}></div>
            </div>
          </div>

          {/* No-Shows / Cancelled */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 flex flex-col justify-between">
            <div className="flex items-center justify-between text-rose-700">
              <span className="text-[11px] font-bold uppercase tracking-wider">No-Shows / Cancelled</span>
              <span className="material-symbols-outlined text-[16px] text-rose-600">event_busy</span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-slate-900 font-mono">2</span>
              <span className="text-xs text-slate-500">Late drop: 4.7%</span>
            </div>
            <div className="w-full bg-slate-200 h-1 rounded-full mt-2 overflow-hidden">
              <div className="bg-rose-600 h-full rounded-full" style={{ width: '5%' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Split View: Left Queue Board (7 Cols) & Right Intake & Schedule (5 Cols) */}
      <div className="p-4 grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
        {/* LEFT PANE: Real-Time Queue Board (7 / 12) */}
        <div className="xl:col-span-7 flex flex-col gap-4">
          {/* Filter Navigation */}
          <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              {(['All', 'Waiting', 'Vitals Pending', 'In-Consult', 'Completed'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    filter === tab
                      ? 'bg-teal-700 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5 px-2">
              <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse"></span>
              <span className="text-[11px] font-mono font-bold text-teal-800">SOCKET #L-104 LIVE</span>
            </div>
          </div>

          {/* Now Calling Hero Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-teal-600"></div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] uppercase bg-teal-700 text-white tracking-wider font-bold">
                  Active Encounter Calling
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <span className="material-symbols-outlined text-[14px]">timer</span>
                  Called 1m 40s ago
                </span>
              </div>

              {/* PA Announcement Trigger */}
              <button
                onClick={() => triggerAnnounce(activeToken)}
                className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-3 py-1.5 rounded-lg shadow-xs transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">campaign</span>
                <span>📢 Announce Token #{activeToken.tokenNumber} in Waiting Area</span>
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                {/* Large Token Badge */}
                <div className="flex flex-col items-center justify-center bg-teal-700 text-white px-3 py-2 rounded-xl min-w-[76px] text-center shadow-xs">
                  <span className="text-[9px] uppercase font-bold text-teal-200">Token</span>
                  <span className="text-2xl font-bold font-mono tracking-tight leading-none mt-0.5">
                    {activeToken.tokenNumber}
                  </span>
                  <span className="text-[10px] text-teal-200 mt-1">Room 104</span>
                </div>

                {/* Patient Profile & Chief Complaint */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-base font-bold text-slate-900">{activeToken.patientName}</span>
                    <span className="text-xs text-slate-500">{activeToken.age}y / {activeToken.gender}</span>
                    <span className="font-mono text-xs px-1.5 py-0.5 bg-slate-200 text-slate-700 rounded font-semibold">
                      UHID: {activeToken.uhid}
                    </span>
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-900 rounded text-xs font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                      {activeToken.triagePriority}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <span className="text-xs text-slate-500 font-semibold">Chief Complaint:</span>
                    <span className="text-xs text-rose-600 font-semibold">{activeToken.chiefComplaint}</span>
                  </div>

                  {/* Vitals Snapshot */}
                  <div className="flex items-center gap-2 mt-2 text-xs text-slate-600 flex-wrap">
                    <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-mono">BP: <strong>142/92</strong></span>
                    <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-mono">HR: <strong>88 bpm</strong></span>
                    <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-mono">SpO2: <strong>97%</strong></span>
                    <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-mono">Temp: <strong>98.6°F</strong></span>
                    <span className="text-teal-700 font-semibold flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span>
                      Vitals Recorded (Station 1)
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-row md:flex-col gap-1.5 w-full md:w-auto shrink-0 justify-end">
                <button
                  onClick={() => onStartConsultation && onStartConsultation(activeToken)}
                  className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs px-3 py-2 rounded-lg transition-colors shadow-xs"
                >
                  <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                  <span>Start Consultation</span>
                </button>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => triggerAnnounce(activeToken)}
                    className="flex-1 flex items-center justify-center gap-1 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs px-2.5 py-1.5 rounded-lg transition-colors"
                  >
                    <span className="material-symbols-outlined text-[14px]">replay</span>
                    <span>Recall</span>
                  </button>
                  <button
                    onClick={() => alert(`Sending ${activeToken.patientName} to Triage Station for emergency evaluation.`)}
                    className="flex-1 flex items-center justify-center gap-1 bg-slate-200 hover:bg-rose-100 hover:text-rose-800 text-slate-800 font-semibold text-xs px-2.5 py-1.5 rounded-lg transition-colors"
                  >
                    <span className="material-symbols-outlined text-[14px]">medical_services</span>
                    <span>Triage</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Tokens Waiting Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
            <div className="p-3 flex items-center justify-between bg-slate-50 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900">Upcoming Tokens Waiting</span>
                <span className="px-2 py-0.5 bg-slate-200 text-slate-600 rounded font-mono text-[10px]">
                  Sorted by Triage Score + Arrival
                </span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={searchRoster}
                  onChange={(e) => setSearchRoster(e.target.value)}
                  placeholder="Filter roster..."
                  className="bg-white text-xs text-slate-800 pl-7 pr-2 py-1 rounded-lg border border-slate-200 focus:outline-none w-44"
                />
                <span className="material-symbols-outlined text-[14px] text-slate-400 absolute left-2 top-2">filter_alt</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100/80 text-slate-500 uppercase tracking-wider text-[11px] font-bold">
                    <th className="py-2.5 px-3">Token</th>
                    <th className="py-2.5 px-3">Patient Information</th>
                    <th className="py-2.5 px-3">Arrival / Wait</th>
                    <th className="py-2.5 px-3">Triage Priority</th>
                    <th className="py-2.5 px-3">Assigned MD</th>
                    <th className="py-2.5 px-3">Vitals Status</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredTokens.map((tok) => {
                    const isUrgent = tok.triagePriority === 'URGENT RED';
                    return (
                      <tr 
                        key={tok.id} 
                        className={`hover:bg-slate-50/80 transition-colors ${
                          isUrgent ? 'bg-rose-50/40' : ''
                        }`}
                      >
                        <td className="py-2 px-3 font-mono font-bold text-teal-800">
                          <span className={`px-2 py-0.5 rounded ${isUrgent ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-800'}`}>
                            #{tok.tokenNumber}
                          </span>
                        </td>
                        <td className="py-2 px-3">
                          <div className="flex flex-col">
                            <span className="font-semibold text-slate-900">{tok.patientName}</span>
                            <span className="text-[10px] text-slate-400 font-mono">{tok.age}y {tok.gender} • {tok.uhid}</span>
                          </div>
                        </td>
                        <td className="py-2 px-3">
                          <div className="flex flex-col">
                            <span className="font-medium text-slate-800">{tok.arrivalTime}</span>
                            <span className={`text-[10px] ${isUrgent ? 'text-rose-600 font-bold' : 'text-slate-500'}`}>
                              Wait: {tok.waitTime}
                            </span>
                          </div>
                        </td>
                        <td className="py-2 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            isUrgent 
                              ? 'bg-rose-100 text-rose-800 border border-rose-200' 
                              : tok.triagePriority.includes('Amber')
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            {tok.triagePriority}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-slate-600">{tok.assignedDoctor}</td>
                        <td className="py-2 px-3">
                          <span className={`text-[11px] font-medium ${
                            tok.vitalsStatus.includes('Checked') || tok.vitalsStatus.includes('Complete')
                              ? 'text-teal-700 flex items-center gap-0.5'
                              : 'text-amber-700'
                          }`}>
                            {tok.vitalsStatus}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-right">
                          <button
                            onClick={() => handleCallToken(tok)}
                            className={`px-2.5 py-1 rounded text-xs font-semibold shadow-xs transition-colors ${
                              isUrgent
                                ? 'bg-rose-600 hover:bg-rose-700 text-white'
                                : 'bg-teal-700 hover:bg-teal-800 text-white'
                            }`}
                          >
                            {isUrgent ? '⚡ Fast-Track' : 'Call Next'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-500">
              <span>Showing {filteredTokens.length} active tokens in buffer</span>
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <span>[F5: Refresh]</span>
                <span>•</span>
                <span>[Spacebar: Call Next]</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANE: Fast Intake & Schedule Grid (5 / 12) */}
        <div className="xl:col-span-5 flex flex-col gap-4">
          {/* Express 30-Second Walk-In Intake Form */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-[18px]">person_add</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-xs">Fast Walk-In Registration</h3>
                  <p className="text-[10px] text-slate-400">Rapid 30-Second Express Intake Desk</p>
                </div>
              </div>
              <span className="px-2 py-0.5 bg-teal-50 text-teal-800 font-mono text-[10px] font-bold rounded">
                TOKEN DISPENSER
              </span>
            </div>

            <form onSubmit={handleNewWalkIn} className="flex flex-col gap-2.5 mt-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    placeholder="98765 43210"
                    required
                    className="w-full bg-slate-50 text-xs text-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-600"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Patient Full Name</label>
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="e.g. Ramesh Chandra"
                    required
                    className="w-full bg-slate-50 text-xs text-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Age</label>
                  <input
                    type="number"
                    value={ageInput}
                    onChange={(e) => setAgeInput(e.target.value)}
                    min="1"
                    max="120"
                    className="w-full bg-slate-50 text-xs text-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-200 focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Gender</label>
                  <select
                    value={genderInput}
                    onChange={(e) => setGenderInput(e.target.value)}
                    className="w-full bg-slate-50 text-xs text-slate-800 px-2 py-1.5 rounded-lg border border-slate-200 focus:bg-white focus:outline-none"
                  >
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Visit Type</label>
                  <select
                    value={visitTypeInput}
                    onChange={(e) => setVisitTypeInput(e.target.value)}
                    className="w-full bg-slate-50 text-xs text-slate-800 px-2 py-1.5 rounded-lg border border-slate-200 focus:bg-white focus:outline-none font-semibold text-teal-800"
                  >
                    <option value="walkin">Walk-In</option>
                    <option value="vip">VIP Fast-track</option>
                    <option value="tele">Teleconsult</option>
                  </select>
                </div>
              </div>

              {/* Chief Complaint & Tags */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] uppercase font-bold text-slate-500">Chief Complaint Quick Tags</label>
                  <span className="text-[10px] text-slate-400 font-mono">Click to attach</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {quickTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                        selectedTags.includes(tag)
                          ? 'bg-teal-700 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={complaintInput}
                  onChange={(e) => setComplaintInput(e.target.value)}
                  placeholder="Or enter specific symptom / notes..."
                  className="w-full mt-1 bg-slate-50 text-xs text-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-200 focus:bg-white focus:outline-none"
                />
              </div>

              {/* Physician Station */}
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Assign Physician Station</label>
                <select className="w-full bg-slate-50 text-xs text-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-200 focus:bg-white focus:outline-none">
                  <option>Dr. Sarah Jenkins - OPD Room 104 (Internal Medicine)</option>
                  <option>Dr. Mark Rivera - OPD Room 108 (Cardiology)</option>
                  <option>Dr. Anita Desai - OPD Room 102 (Pediatrics)</option>
                </select>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 text-white py-2 rounded-lg text-xs font-bold shadow-xs transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">confirmation_number</span>
                  <span>+ Generate Token Slip & Enqueue</span>
                </button>
                <button
                  type="reset"
                  onClick={() => {
                    setNameInput('');
                    setPhoneInput('');
                    setComplaintInput('');
                    setSelectedTags([]);
                  }}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-semibold"
                >
                  Clear
                </button>
              </div>
            </form>
          </div>

          {/* OPD Schedule Timeline Grid */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col gap-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-indigo-600 text-[18px]">calendar_view_day</span>
                <h3 className="font-bold text-slate-900 text-xs">OPD Schedule Timeline Grid</h3>
              </div>
              <span className="font-mono text-[10px] text-slate-500">Dr. Jenkins • 15m Slots</span>
            </div>

            <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-teal-600"></span> In-Room
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-indigo-600"></span> Confirmed
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-slate-300"></span> Walk-in Buffer
              </span>
            </div>

            <div className="flex flex-col gap-1.5 text-xs">
              <div className="flex items-center gap-2 p-1.5 rounded-lg bg-teal-50 border border-teal-200/50">
                <span className="font-mono font-bold text-teal-800 w-16">10:00 AM</span>
                <div className="flex-1 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">Marcus Brody (#A-24)</span>
                    <span className="px-1.5 py-0.5 bg-teal-700 text-white rounded text-[9px] font-bold">Active</span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-500">10:00 - 10:15 AM</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-50 border border-slate-200/60 hover:bg-slate-100 transition-colors">
                <span className="font-mono font-semibold text-slate-600 w-16">10:15 AM</span>
                <div className="flex-1 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-800">Elena Rostova</span>
                    <span className="px-1.5 py-0.5 bg-indigo-50 text-indigo-700 rounded text-[9px] font-bold">Confirmed</span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-500">10:15 - 10:30 AM</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-50 border border-slate-200/60 hover:bg-slate-100 transition-colors">
                <span className="font-mono font-semibold text-slate-600 w-16">10:30 AM</span>
                <div className="flex-1 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-800">David K. Miller</span>
                    <span className="px-1.5 py-0.5 bg-amber-50 text-amber-800 rounded text-[9px] font-bold">Walk-in Queued</span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-500">10:30 - 10:45 AM</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-100/70 border border-dashed border-slate-300">
                <span className="font-mono font-semibold text-slate-500 w-16">10:45 AM</span>
                <div className="flex-1 flex items-center justify-between">
                  <span className="text-slate-500 italic text-[11px]">[Reserved Walk-in Buffer Slot]</span>
                  <button 
                    onClick={() => alert('Slot 10:45 AM held for next urgent intake.')}
                    className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-semibold text-teal-700 hover:bg-teal-50"
                  >
                    Hold Slot
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-50 border border-slate-200/60 hover:bg-slate-100 transition-colors">
                <span className="font-mono font-semibold text-slate-600 w-16">11:00 AM</span>
                <div className="flex-1 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-800">Suresh K. Verma</span>
                    <span className="px-1.5 py-0.5 bg-indigo-50 text-indigo-700 rounded text-[9px] font-bold">Follow-up</span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-500">11:00 - 11:15 AM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Wait Time Analytics & Surge Velocity Widget */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-teal-700 text-[18px]">insights</span>
                <h3 className="font-bold text-slate-900 text-xs">OPD Wait Time & Surge Velocity</h3>
              </div>
              <span className="font-mono text-[10px] text-slate-500">Live Shift Sensor</span>
            </div>

            <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-200/60 mt-2">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-slate-500">Peak Waiting Surge</span>
                <span className="text-sm font-bold text-slate-900 mt-0.5">11:00 AM - 12:15 PM</span>
                <span className="text-[11px] text-rose-600 font-semibold mt-0.5">Estimated queue duration +8 mins</span>
              </div>
              {/* Surge Bar visualization */}
              <div className="flex items-end gap-1.5 h-10 px-2">
                <div className="w-3 bg-teal-400 rounded-t h-4" title="09:00 AM"></div>
                <div className="w-3 bg-teal-500 rounded-t h-6" title="10:00 AM"></div>
                <div className="w-3 bg-teal-700 rounded-t h-10 shadow-xs" title="11:00 AM (Peak)"></div>
                <div className="w-3 bg-teal-600 rounded-t h-8" title="12:00 PM"></div>
                <div className="w-3 bg-teal-300 rounded-t h-3" title="01:00 PM"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PA Announcement Toast */}
      {announcementToast.visible && (
        <div className="fixed bottom-12 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom duration-200">
          <span className="material-symbols-outlined text-teal-400 text-[24px]">campaign</span>
          <div>
            <h4 className="font-bold text-xs">Public Address Broadcast</h4>
            <p className="text-xs text-slate-200">{announcementToast.message}</p>
          </div>
        </div>
      )}
    </div>
  );
};
