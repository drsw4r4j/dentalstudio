import React, { useState, useEffect } from 'react';
import { ClinicMode } from '../types';

interface FooterProps {
  mode: ClinicMode;
  activePatientName?: string;
  activePatientUhid?: string;
  activeRoom?: string;
}

export const Footer: React.FC<FooterProps> = ({ 
  mode, 
  activePatientName, 
  activePatientUhid, 
  activeRoom 
}) => {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-US', {
          hour12: true,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-7 bg-white border-t border-slate-200 z-50 flex items-center justify-between px-4 text-xs select-none">
      <div className="flex items-center gap-3 text-slate-600 font-medium">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse"></span>
          <span>Sync: Real-time Cloud {mode === 'dental' ? '99.99%' : '99.98%'}</span>
        </div>
        <div className="h-3 w-px bg-slate-200"></div>
        <div className="flex items-center gap-1 text-slate-700">
          <span className="material-symbols-outlined text-[13px] text-teal-700">
            {mode === 'dental' ? 'chair' : 'meeting_room'}
          </span>
          <span>
            {mode === 'dental' ? 'Current Chair: ' : 'Active OPD: '}
            <strong className="text-teal-800 font-semibold">
              {mode === 'dental' ? 'Operatory 2 (A-dec 500)' : 'Room 104'}
            </strong>
          </span>
        </div>
        <div className="h-3 w-px bg-slate-200 hidden sm:block"></div>
        <div className="hidden sm:flex items-center gap-1 text-slate-700">
          <span className="material-symbols-outlined text-[13px] text-indigo-600">record_voice_over</span>
          <span>
            {mode === 'dental' ? 'Next Up: ' : 'Calling: '}
            <strong className="text-indigo-700 font-semibold">
              {mode === 'dental' ? 'Token D-14 (R. Gupta - Crown Prep #46)' : 'Token 24 (P. Sharma)'}
            </strong>
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 text-slate-500 font-mono text-[11px]">
        <span>{mode === 'dental' ? 'Docplix-DENT v4.2.1-OMS' : 'EHR v4.2.1-PROD'}</span>
        <div className="h-3 w-px bg-slate-200"></div>
        <span className="text-slate-800 font-semibold">{timeStr || '11:42:18 AM'}</span>
      </div>
    </footer>
  );
};
