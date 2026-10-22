import React, { useState } from 'react';
import { initialDentalChatMessages } from '../../data/mockData';
import { ChatMessage } from '../../types';

export const DentalCrmRecall: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialDentalChatMessages);
  const [inputText, setInputText] = useState('');
  const [activeWorkflow, setActiveWorkflow] = useState<'scaling' | 'post-op' | 'open-pipeline' | 'aligner'>('post-op');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'doctor',
      senderName: 'Dr. Sarah Jenkins (You)',
      text: inputText,
      timestamp: 'Just now',
      status: 'Sent • Delivered',
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    // Simulate patient automated reply after 2 seconds
    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: `reply-${Date.now()}`,
        sender: 'patient',
        senderName: 'Eleanor Vance',
        text: 'Thank you doctor! Will take the medicine after dinner and keep you posted.',
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, replyMsg]);
    }, 2000);
  };

  const handleUseCanned = (text: string) => {
    setInputText(text);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="material-symbols-outlined text-orange-600 text-[20px]">mark_chat_unread</span>
            Dental Patient CRM & Recall Automation
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Meta Cloud WhatsApp API, 6-Month hygiene recalls, 24h post-op checks, and $42.8k unaccepted treatment plan recovery
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            WhatsApp Business API: Verified
          </span>
        </div>
      </div>

      {/* 4 Care Recall Journeys Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => setActiveWorkflow('post-op')}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
            activeWorkflow === 'post-op'
              ? 'border-orange-500 bg-orange-50/50 shadow-xs ring-1 ring-orange-300'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[18px]">healing</span>
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-200/80 text-orange-900">
              Active Trigger
            </span>
          </div>
          <h4 className="text-xs font-bold text-slate-900">24h Post-Op Nudge</h4>
          <p className="text-[11px] text-slate-500 mt-1">
            Probes extraction/RCT tenderness (VAS 1-5 scale) + ice compress reminders
          </p>
          <div className="text-[10px] font-bold text-emerald-600 mt-2">
            96% Response Rate
          </div>
        </button>

        <button
          onClick={() => setActiveWorkflow('scaling')}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
            activeWorkflow === 'scaling'
              ? 'border-orange-500 bg-orange-50/50 shadow-xs ring-1 ring-orange-300'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[18px]">autorenew</span>
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-800">
              Hygiene
            </span>
          </div>
          <h4 className="text-xs font-bold text-slate-900">6-Month Scaling Recall</h4>
          <p className="text-[11px] text-slate-500 mt-1">
            Automated reminder sent at 180 days with 1-tap booking link for ultrasonic cleanup
          </p>
          <div className="text-[10px] font-bold text-slate-500 mt-2">
            32 Due this week
          </div>
        </button>

        <button
          onClick={() => setActiveWorkflow('open-pipeline')}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
            activeWorkflow === 'open-pipeline'
              ? 'border-orange-500 bg-orange-50/50 shadow-xs ring-1 ring-orange-300'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[18px]">monetization_on</span>
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
              $42.8k Unaccepted
            </span>
          </div>
          <h4 className="text-xs font-bold text-slate-900">Open Treatment Plan</h4>
          <p className="text-[11px] text-slate-500 mt-1">
            Nudges unaccepted crowns/implants before cavity or fracture progression
          </p>
          <div className="text-[10px] font-bold text-purple-700 mt-2">
            18 High-Value Patients
          </div>
        </button>

        <button
          onClick={() => setActiveWorkflow('aligner')}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
            activeWorkflow === 'aligner'
              ? 'border-orange-500 bg-orange-50/50 shadow-xs ring-1 ring-orange-300'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[18px]">aspect_ratio</span>
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
              Ortho Cadence
            </span>
          </div>
          <h4 className="text-xs font-bold text-slate-900">Aligner Tray Switch</h4>
          <p className="text-[11px] text-slate-500 mt-1">
            Bi-weekly cadence alerts prompting chewies & seating verification photo
          </p>
          <div className="text-[10px] font-bold text-blue-700 mt-2">
            14 Active Patients
          </div>
        </button>
      </div>

      {/* Main Communication Grid: 2-Way Chat + Handset Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Doctor 2-Way Clinical Chat Terminal */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-700 font-bold flex items-center justify-center text-sm border border-orange-200">
                  EV
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Eleanor Vance • Patient WhatsApp Channel
                  </h3>
                  <div className="text-[11px] text-slate-500">
                    +91 98765 43210 • Active Procedure: Tooth #3 RCT
                  </div>
                </div>
              </div>

              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                Online (WhatsApp)
              </span>
            </div>

            {/* Chat Stream */}
            <div className="space-y-3 max-h-80 overflow-y-auto p-2 bg-slate-50 rounded-xl border border-slate-200/80 mb-4">
              {messages.map((m) => {
                const isDoctor = m.sender === 'doctor';
                const isBot = m.sender === 'bot';

                return (
                  <div
                    key={m.id}
                    className={`flex flex-col ${isDoctor ? 'items-end' : 'items-start'}`}
                  >
                    <div className="text-[10px] text-slate-400 mb-0.5 px-1 font-semibold">
                      {m.senderName} • {m.timestamp}
                    </div>
                    <div
                      className={`max-w-md p-3 rounded-2xl text-xs leading-relaxed ${
                        isDoctor
                          ? 'bg-orange-600 text-white rounded-br-xs'
                          : isBot
                          ? 'bg-white border border-slate-200 text-slate-800 rounded-bl-xs shadow-xs'
                          : 'bg-white border border-orange-200 text-slate-800 rounded-bl-xs shadow-xs'
                      }`}
                    >
                      {m.text}
                    </div>
                    {m.status && (
                      <span className="text-[9px] text-slate-400 mt-0.5 px-1">{m.status}</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Canned Clinical Responses */}
            <div className="mb-3">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                Quick Dental Replies:
              </span>
              <div className="flex flex-wrap gap-1.5 text-xs">
                <button
                  type="button"
                  onClick={() => handleUseCanned('Please keep chewing on the opposite side until your crown is cemented.')}
                  className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] transition-colors cursor-pointer"
                >
                  "Chew on opposite side"
                </button>
                <button
                  type="button"
                  onClick={() => handleUseCanned('Take Tab. Ketorolac 10mg every 6 hours if the throbbing returns.')}
                  className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] transition-colors cursor-pointer"
                >
                  "Ketorolac dosage advice"
                </button>
                <button
                  type="button"
                  onClick={() => handleUseCanned('Your permanent E-max zirconia crown will be ready next Tuesday 11:00 AM.')}
                  className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] transition-colors cursor-pointer"
                >
                  "Crown readiness ETA"
                </button>
              </div>
            </div>
          </div>

          {/* Chat Composer Form */}
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type clinical WhatsApp message to Eleanor Vance..."
              className="flex-1 px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[17px]">send</span>
              <span>Send</span>
            </button>
          </form>
        </div>

        {/* Right 1 Col: Live Handset WhatsApp Simulator */}
        <div className="bg-slate-900 rounded-2xl p-4 text-white shadow-xl flex flex-col justify-between max-w-sm mx-auto w-full">
          <div>
            {/* Phone Top Notch */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono px-2 pb-2 border-b border-slate-800">
              <span>9:41 AM</span>
              <div className="w-16 h-3.5 bg-slate-800 rounded-full" />
              <span>5G • 100%</span>
            </div>

            {/* WhatsApp Header */}
            <div className="flex items-center gap-2.5 py-3 border-b border-slate-800">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center font-bold text-xs text-white">
                SD
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1">
                  <span>Swaraj Dental Studio</span>
                  <span className="material-symbols-outlined text-emerald-400 text-[14px]">
                    verified
                  </span>
                </div>
                <div className="text-[10px] text-emerald-400 font-medium">Verified Business Account</div>
              </div>
            </div>

            {/* Live Message Bubble in Phone */}
            <div className="py-4 space-y-3">
              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-xs space-y-1.5">
                <span className="font-bold text-orange-400 block text-[11px]">
                  🦷 Post-Procedure Care Check
                </span>
                <p className="text-[11px] text-slate-200 leading-relaxed">
                  Hi Eleanor, Dr. Sarah Jenkins completed Phase 1 for Tooth #3 today.
                  Please tap your current comfort level below so our team can adjust your medication:
                </p>
                <div className="pt-2 flex flex-col gap-1.5">
                  <div className="p-1.5 rounded bg-slate-700/80 text-center text-[10px] font-bold text-emerald-300">
                    🟢 1 - Completely Comfortable
                  </div>
                  <div className="p-1.5 rounded bg-slate-700/80 text-center text-[10px] font-bold text-amber-300">
                    🟡 2 - Mild Tender to Pressure
                  </div>
                  <div className="p-1.5 rounded bg-slate-700/80 text-center text-[10px] font-bold text-rose-300">
                    🔴 3+ - Throbbing Pain / Call Doctor
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-[10px] text-slate-500 font-mono pt-2 border-t border-slate-800">
            Powered by Docplix Meta Cloud WhatsApp API
          </div>
        </div>
      </div>
    </div>
  );
};
