import React, { useState, useEffect } from 'react';
import { mockOperatoryChairs } from '../../data/mockData';
import { playHospitalChime } from '../../utils/audio';

interface DentalOperatoryQueueProps {
  onOpenExaminationModal: () => void;
  onNavigateToChart: () => void;
}

export const DentalOperatoryQueue: React.FC<DentalOperatoryQueueProps> = ({
  onOpenExaminationModal,
  onNavigateToChart,
}) => {
  const [chairs, setChairs] = useState(mockOperatoryChairs);
  const [elapsedMarcus, setElapsedMarcus] = useState(24 * 60 + 18);
  const [vasPainScore, setVasPainScore] = useState<number>(7);
  const [complaintSelected, setComplaintSelected] = useState<string>('Severe Throbbing Pain');
  const [walkinName, setWalkinName] = useState<string>('');
  const [walkinPhone, setWalkinPhone] = useState<string>('');
  const [chimePlaying, setChimePlaying] = useState<boolean>(false);
  const [walkinSuccess, setWalkinSuccess] = useState<string | null>(null);

  // Ticking stopwatch for Chair 1 procedure
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedMarcus((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatStopwatch = (totalSecs: number) => {
    const m = Math.floor(totalSecs / 60);
    const s = totalSecs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSeatPatient = (chairId: string) => {
    setChairs((prev) =>
      prev.map((c) => {
        if (c.id === chairId) {
          return {
            ...c,
            status: 'IN USE' as const,
            currentPatient: {
              name: 'Eleanor Vance',
              uhid: '#DENT-984210',
              tooth: '#3 (FDI 16)',
              procedureName: 'Root Canal Therapy (MB/DB/Palatal Canals)',
              elapsedSeconds: 0,
              estimatedMinutes: 45,
            },
          };
        }
        return c;
      })
    );
  };

  const handleCompleteProcedure = (chairId: string) => {
    setChairs((prev) =>
      prev.map((c) => {
        if (c.id === chairId) {
          return {
            ...c,
            status: 'TURNOVER' as const,
            currentPatient: undefined,
            turnoverDetails: {
              action: 'Enzymatic line flush & UV Disinfection',
              minutesRemaining: 10,
            },
          };
        }
        return c;
      })
    );
  };

  const handleBroadcastChime = (token: string, room: string) => {
    setChimePlaying(true);
    playHospitalChime();
    setTimeout(() => setChimePlaying(false), 2000);
  };

  const handleRegisterWalkin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walkinName) return;
    const newToken = `D-${Math.floor(Math.random() * 20 + 10)}`;
    setWalkinSuccess(`Assigned Token ${newToken} • Priority Triage Level: ${vasPainScore >= 7 ? 'STAT URGENT' : 'Routine'}`);
    setWalkinName('');
    setWalkinPhone('');
    setTimeout(() => setWalkinSuccess(null), 4000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner & Audio Broadcast Control */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-lg font-bold text-slate-900">
              Operatory Fleet & Surgical Chair Telemetry
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time chair occupancy, chairside gas pressures (N2O/O2), and active surgical countdowns
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => handleBroadcastChime('D-02', 'Operatory 1')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              chimePlaying
                ? 'bg-amber-600 text-white animate-pulse'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
            }`}
          >
            <span className="material-symbols-outlined text-[17px]">volume_up</span>
            <span>{chimePlaying ? 'Broadcasting Chime...' : 'PA System Chime'}</span>
          </button>

          <button
            onClick={onOpenExaminationModal}
            className="px-3.5 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[17px]">add_circle</span>
            <span>+ New Exam</span>
          </button>
        </div>
      </div>

      {/* 4-Chair Fleet Grid (Matches Images 13 & 14) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {chairs.map((chair) => {
          const isInUse = chair.status === 'IN USE';
          const isReady = chair.status === 'READY';
          const isTurnover = chair.status === 'TURNOVER';

          return (
            <div
              key={chair.id}
              className={`rounded-xl border bg-white shadow-xs p-5 transition-all flex flex-col justify-between ${
                isInUse
                  ? 'border-orange-300 ring-1 ring-orange-200'
                  : isReady
                  ? 'border-emerald-300'
                  : 'border-slate-200'
              }`}
            >
              <div>
                {/* Chair Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm ${
                        isInUse
                          ? 'bg-orange-100 text-orange-700'
                          : isReady
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        airline_seat_recline_extra
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{chair.name}</h3>
                      <div className="text-[11px] text-slate-500 font-mono">
                        {chair.operatoryCode} • {chair.chairType}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase border ${
                      isInUse
                        ? 'bg-orange-100 text-orange-800 border-orange-300 animate-pulse'
                        : isReady
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : isTurnover
                        ? 'bg-amber-100 text-amber-800 border-amber-300'
                        : 'bg-slate-100 text-slate-700 border-slate-300'
                    }`}
                  >
                    {chair.status}
                  </span>
                </div>

                {/* Chair Body based on status */}
                {isInUse && chair.currentPatient && (
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-orange-50/60 border border-orange-200/80">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-900">
                          {chair.currentPatient.name}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white font-bold text-slate-700 border border-slate-200">
                          {chair.currentPatient.uhid}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-orange-950">
                        {chair.currentPatient.procedureName}
                      </div>
                      <div className="text-[11px] text-slate-600 mt-1">
                        Surgeon: <span className="font-semibold">{chair.assignedDoctor}</span>
                      </div>
                    </div>

                    {/* Procedure Live Stopwatch & Telemetry */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-lg bg-slate-900 text-white flex flex-col justify-center">
                        <span className="text-[10px] text-slate-400 uppercase font-mono">Elapsed Surgery Time</span>
                        <div className="text-xl font-mono font-bold text-orange-400 mt-0.5">
                          {chair.id === 'chair-1' ? formatStopwatch(elapsedMarcus) : '12:45'}
                        </div>
                        <span className="text-[10px] text-slate-400">
                          Est: {chair.currentPatient.estimatedMinutes} mins total
                        </span>
                      </div>

                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex flex-col justify-center">
                        <span className="text-[10px] text-slate-500 uppercase font-bold">Gas Manifold</span>
                        <div className="text-xs font-mono font-bold text-slate-800 mt-0.5">
                          N2O: 30% | O2: 70%
                        </div>
                        <span className="text-[10px] text-emerald-600 font-semibold">Pressure 55 PSI OK</span>
                      </div>
                    </div>
                  </div>
                )}

                {isReady && (
                  <div className="space-y-3 py-2">
                    <div className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-200 text-xs">
                      <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-emerald-600 text-[16px]">verified</span>
                        <span>Autoclaved Tray Set #B-40 Prepared</span>
                      </div>
                      <p className="text-[11px] text-emerald-800 mt-1">
                        Assigned Clinician: {chair.assignedDoctor}
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase font-bold">Next Queued Patient</span>
                        <div className="font-bold text-slate-900">Eleanor Vance (Token D-01)</div>
                      </div>
                      <button
                        onClick={onNavigateToChart}
                        className="text-orange-600 hover:text-orange-700 font-bold text-xs"
                      >
                        Inspect Chart
                      </button>
                    </div>
                  </div>
                )}

                {isTurnover && (
                  <div className="space-y-3 py-2">
                    <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200 text-xs space-y-1">
                      <div className="font-bold text-amber-900 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-amber-600 text-[16px] animate-spin">
                          autorenew
                        </span>
                        <span>Sterilization Cycle in Progress</span>
                      </div>
                      <p className="text-[11px] text-amber-800">
                        {chair.turnoverDetails?.action}
                      </p>
                      <div className="text-[10px] font-mono text-amber-700 font-bold pt-1">
                        Estimated Ready in: ~{chair.turnoverDetails?.minutesRemaining} mins
                      </div>
                    </div>
                  </div>
                )}

                {chair.status === 'IDLE' && (
                  <div className="space-y-2 py-4 text-center text-xs text-slate-500">
                    <span className="material-symbols-outlined text-[28px] text-slate-300">
                      snooze
                    </span>
                    <div>Chair Available for Emergency Walk-in</div>
                    <div className="text-[10px] text-slate-400">{chair.nextAppointment}</div>
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 mt-4">
                {isInUse && (
                  <>
                    <button
                      onClick={() => handleCompleteProcedure(chair.id)}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[15px]">check</span>
                      <span>Finish Procedure</span>
                    </button>
                    <button
                      onClick={() => setElapsedMarcus((prev) => prev + 15 * 60)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
                    >
                      +15m Extend
                    </button>
                  </>
                )}

                {isReady && (
                  <button
                    onClick={() => handleSeatPatient(chair.id)}
                    className="w-full py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">chair</span>
                    <span>Seat Eleanor Vance (Token D-01)</span>
                  </button>
                )}

                {isTurnover && (
                  <button
                    onClick={() => {
                      setChairs((prev) =>
                        prev.map((c) => (c.id === chair.id ? { ...c, status: 'READY' as const } : c))
                      );
                    }}
                    className="w-full py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    Bypass & Mark Ready
                  </button>
                )}

                {chair.status === 'IDLE' && (
                  <button
                    onClick={() => handleSeatPatient(chair.id)}
                    className="w-full py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                  >
                    Assign Urgent Walk-In
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Express Dental Walk-In Intake & Visual VAS Pain Triage */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-orange-600 text-[18px]">bolt</span>
              30-Second Express Dental Walk-in & Visual VAS Pain Triage
            </h3>
            <p className="text-[11px] text-slate-500">
              Instantly assign urgent walk-ins to operatory queues with validated Visual Analogue Scale (0-10)
            </p>
          </div>

          <span className="text-xs font-bold text-slate-500 font-mono">
            OPD Station 2
          </span>
        </div>

        {walkinSuccess && (
          <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-600 text-[18px]">check_circle</span>
            <span>{walkinSuccess}</span>
          </div>
        )}

        <form onSubmit={handleRegisterWalkin} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Patient Info */}
          <div className="space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Patient Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={walkinName}
                onChange={(e) => setWalkinName(e.target.value)}
                placeholder="e.g. Ramesh Kulkarni"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Phone Number (WhatsApp for Recalls)
              </label>
              <input
                type="tel"
                value={walkinPhone}
                onChange={(e) => setWalkinPhone(e.target.value)}
                placeholder="+91 98200 12345"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Chief Complaint Chips */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Chief Dental Symptom
            </label>
            <div className="flex flex-wrap gap-1.5">
              {[
                'Severe Throbbing Pain',
                'Broken Crown / Cusp',
                'Bleeding Gums / Swelling',
                'Lost Filling / Sensitivity',
                'Wisdom Tooth Impaction',
                'Loose Denture / Implant',
              ].map((chip) => (
                <button
                  type="button"
                  key={chip}
                  onClick={() => setComplaintSelected(chip)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    complaintSelected === chip
                      ? 'bg-orange-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* VAS Pain Slider & Submission */}
          <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-800">
                  VAS Pain Scale (0 to 10)
                </label>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded font-mono ${
                    vasPainScore >= 8
                      ? 'bg-rose-100 text-rose-800'
                      : vasPainScore >= 5
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {vasPainScore} / 10 • {vasPainScore >= 8 ? 'CRITICAL' : vasPainScore >= 5 ? 'MODERATE' : 'MILD'}
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="10"
                value={vasPainScore}
                onChange={(e) => setVasPainScore(parseInt(e.target.value))}
                className="w-full accent-orange-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1">
                <span>0 No Pain</span>
                <span>5 Moderate</span>
                <span>10 Unbearable</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-orange-600/20 transition-all cursor-pointer active:scale-98"
            >
              <span className="material-symbols-outlined text-[17px]">confirmation_number</span>
              <span>Dispense Token & Enqueue</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
