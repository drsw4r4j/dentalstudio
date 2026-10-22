import React, { useState } from 'react';
import { initialChatMessages } from '../../data/mockData';
import { ChatMessage } from '../../types';

export const CrmEngagement: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialChatMessages);
  const [inputText, setInputText] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('Diabetic Care Refill Prompt (WhatsApp HSM Verified)');
  const [messageTemplateText, setMessageTemplateText] = useState(
    'Dear {{patient_name}}, this is a clinical reminder from {{doctor_name}} at Docplix MetroCare. Your 30-day prescription for {{medicine_list}} is scheduled to conclude in 3 days.\n\nTo ensure uninterrupted therapeutic adherence, tap below to confirm home delivery from our in-hospital pharmacy or book a refill review.'
  );
  const [activePatientChat, setActivePatientChat] = useState('vance');
  const [sendSuccessToast, setSendSuccessToast] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'doctor',
      senderName: 'Dr. Sarah Jenkins (You)',
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Sent'
    };

    setMessages([...messages, newMsg]);
    setInputText('');

    // Simulate patient auto response after 2 seconds
    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'patient',
        senderName: 'Robert Vance (Patient)',
        text: 'Received! Thank you doctor, I appreciate the quick response.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, replyMsg]);
    }, 2000);
  };

  const insertSnippet = (snippet: string) => {
    setInputText(snippet);
  };

  const insertMergeTag = (tag: string) => {
    setMessageTemplateText(prev => prev + ` {{${tag}}}`);
  };

  const handleSaveCadence = () => {
    setSendSuccessToast(true);
    setTimeout(() => setSendSuccessToast(false), 3000);
  };

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Top Banner */}
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal-700 flex items-center justify-center text-white shadow-xs">
            <span className="material-symbols-outlined text-[20px]">mark_chat_unread</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900">Patient CRM & Automated Messaging</h2>
              <span className="bg-teal-50 text-teal-800 text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1 border border-teal-200/50">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse"></span>
                Meta Cloud WhatsApp API v19.0: Active
              </span>
            </div>
            <span className="text-[11px] text-slate-500">
              Omnichannel Outreach • Care Journey Automation • Two-way Secure Patient Desk
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => alert('Webhook API Endpoint: https://api.docplix.io/v1/webhook/whatsapp\nVerify Token: dpx_sec_99410')}
            className="bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[15px] text-slate-400">api</span>
            <span>Configure Webhook API</span>
          </button>
          <button 
            onClick={() => alert('Downloading CRM Campaign Delivery & Open Rate Analytics (.CSV)...')}
            className="bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[15px] text-slate-400">file_download</span>
            <span>Export Analytics</span>
          </button>
          <button 
            onClick={() => alert('Launch Targeted Camp: Select cohort (Diabetic, Hypertensive, Geriatric).')}
            className="bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg shadow-xs flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">campaign</span>
            <span>Broadcast Health Camp</span>
          </button>
        </div>
      </div>

      {/* 5 KPI Metric Cards */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="text-[10px] uppercase font-bold">Total Patient Base</span>
            <span className="material-symbols-outlined text-[18px] text-teal-700">groups</span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono text-slate-900">14,820</span>
            <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded">+412 MoM</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px] text-teal-600">verified_user</span>
            <span>Opted-in WhatsApp: 94.6%</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="text-[10px] uppercase font-bold">Delivery & Read Rate</span>
            <span className="material-symbols-outlined text-[18px] text-teal-700">done_all</span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono text-slate-900">98.4%</span>
            <span className="font-mono text-[10px] text-slate-400">1,240 sent/wk</span>
          </div>
          <div className="mt-2 w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div className="bg-teal-600 h-full rounded-full" style={{ width: '98.4%' }}></div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-indigo-700 text-xs">
            <span className="text-[10px] uppercase font-bold">Show-Up Conversion</span>
            <span className="material-symbols-outlined text-[18px] text-indigo-600">event_available</span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono text-indigo-700">91.2%</span>
            <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded">↑ +6.8%</span>
          </div>
          <span className="mt-2 text-[11px] text-slate-500">Via 24h interactive reminders</span>
        </div>

        <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-teal-800 text-xs">
            <span className="text-[10px] uppercase font-bold">Rx Refill Conversion</span>
            <span className="material-symbols-outlined text-[18px] text-teal-700">prescriptions</span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono text-teal-900">64.5%</span>
            <span className="text-[10px] text-slate-400 font-medium">Chronic Care</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
            <span>Pharmacy ERP sync</span>
            <span className="font-semibold text-teal-700">312 refills</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="text-[10px] uppercase font-bold">Patient CSAT / NPS</span>
            <span className="material-symbols-outlined text-[18px] text-amber-500">star</span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold font-mono text-slate-900">4.8</span>
              <span className="text-xs text-slate-400">/ 5.0</span>
            </div>
            <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">NPS +74</span>
          </div>
          <span className="mt-2 text-[11px] text-slate-500">94 verified reviews this month</span>
        </div>
      </div>

      {/* Main CRM Grid: Left Workflows & Preview (6 Cols) & Right Inbox & Reviews (6 Cols) */}
      <div className="px-4 pb-6 grid grid-cols-1 xl:grid-cols-12 gap-4">
        {/* Left Column (6 / 12) */}
        <div className="xl:col-span-6 flex flex-col gap-4">
          {/* Automated Health Journeys */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
            <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-teal-700">route</span>
                <h3 className="font-bold text-slate-900 text-xs">Automated Health Journeys (Live Workflows)</h3>
              </div>
              <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded font-mono">
                5 Active Tracks
              </span>
            </div>

            <div className="p-3 flex flex-col gap-2">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[18px]">notifications_active</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900">24-Hour Prior Appointment Reminder</span>
                      <span className="bg-teal-700 text-white text-[9px] px-1.5 py-0.2 rounded font-bold uppercase">Auto</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      WhatsApp template with dual interactive buttons ('Confirm Slot' / 'Reschedule OPD').
                    </p>
                    <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-400">
                      <span className="text-teal-700 font-semibold">48 scheduled today</span>
                      <span>•</span>
                      <span>Avg reply: 4.2 min</span>
                      <span>•</span>
                      <span>WhatsApp & SMS Fallback</span>
                    </div>
                  </div>
                </div>
                <button className="p-1 text-slate-400 hover:text-slate-600 rounded">
                  <span className="material-symbols-outlined text-[18px]">tune</span>
                </button>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900">Post-Consult Care & Rx Timetable</span>
                      <span className="bg-teal-50 text-teal-800 text-[9px] px-1.5 py-0.2 rounded font-bold uppercase">2h Post-Visit</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Transmits watermarked digital PDF Rx, dosage calendar, and doctor notes directly to patient WhatsApp.
                    </p>
                    <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-400">
                      <span className="text-slate-700 font-medium">32 dispatched today</span>
                      <span>•</span>
                      <span>100% encryption compliant</span>
                    </div>
                  </div>
                </div>
                <button className="p-1 text-slate-400 hover:text-slate-600 rounded">
                  <span className="material-symbols-outlined text-[18px]">tune</span>
                </button>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[18px]">medication</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900">Chronic Disease 30-Day Refill Reminder</span>
                      <span className="bg-indigo-600 text-white text-[9px] px-1.5 py-0.2 rounded font-bold uppercase">Smart Nudge</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Triggers dynamically for Diabetic and Hypertensive cohorts when ERP stock indicates 3 days remain.
                    </p>
                    <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-400">
                      <span className="text-teal-700 font-semibold">18 sent today</span>
                      <span>•</span>
                      <span className="text-slate-700">11 instant refills generated</span>
                    </div>
                  </div>
                </div>
                <button className="p-1 text-slate-400 hover:text-slate-600 rounded">
                  <span className="material-symbols-outlined text-[18px]">tune</span>
                </button>
              </div>
            </div>
          </div>

          {/* Template Message Composer & Live WhatsApp Handset Preview */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
            <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-teal-700">edit_note</span>
                <h3 className="font-bold text-slate-900 text-xs">Template Message Composer & Live Meta Preview</h3>
              </div>
              <span className="font-mono text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded">
                tpl_chronic_refill_v2
              </span>
            </div>

            <div className="p-4 grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-7 flex flex-col gap-2.5 text-xs">
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Selected Campaign Template</label>
                  <select
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                    className="w-full bg-slate-50 text-xs text-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-200 focus:outline-none"
                  >
                    <option>Diabetic Care Refill Prompt (WhatsApp HSM Verified)</option>
                    <option>Post-Consultation PDF Rx Push</option>
                    <option>24H Appointment Attendance Nudge</option>
                    <option>Pediatric MMR Vaccination Due</option>
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[10px] uppercase font-bold text-slate-500">Message Copy (With Merge Tags)</label>
                    <span className="text-[10px] text-teal-700 font-semibold">Meta Template Approved</span>
                  </div>
                  <textarea
                    value={messageTemplateText}
                    onChange={(e) => setMessageTemplateText(e.target.value)}
                    rows={4}
                    className="w-full bg-slate-50 p-2.5 text-xs text-slate-800 rounded-lg border border-slate-200 focus:bg-white focus:outline-none leading-relaxed font-sans resize-none"
                  />
                </div>

                {/* Merge Tags */}
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Active Merge Tags</span>
                  <div className="flex flex-wrap gap-1">
                    {['patient_name', 'doctor_name', 'medicine_list', 'clinic_link'].map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => insertMergeTag(tag)}
                        className="bg-teal-50 text-teal-800 font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-teal-200/50 hover:bg-teal-100 transition-colors"
                      >
                        {`{{${tag}}}`}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-[11px] text-slate-400">Characters: {messageTemplateText.length} / 1024</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => alert('Test message dispatched to Dr. Jenkins registered phone (+1 555-019-2811).')}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold text-xs"
                    >
                      Test Send
                    </button>
                    <button
                      onClick={handleSaveCadence}
                      className="px-3 py-1.5 bg-teal-700 hover:bg-teal-800 text-white rounded-lg font-semibold text-xs shadow-xs"
                    >
                      Save & Sync
                    </button>
                  </div>
                </div>
              </div>

              {/* Live WhatsApp Handset Preview */}
              <div className="md:col-span-5 flex flex-col items-center">
                <span className="text-[10px] uppercase font-bold text-slate-500 self-start mb-1.5">
                  Live WhatsApp Handset Preview
                </span>
                <div className="w-full max-w-[240px] bg-[#111b21] rounded-2xl p-2.5 shadow-md flex flex-col text-[#e9edef]">
                  <div className="flex items-center justify-between px-1 text-[10px] text-[#8696a0]">
                    <span>9:41</span>
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[11px]">signal_cellular_alt</span>
                      <span className="material-symbols-outlined text-[11px]">wifi</span>
                      <span className="material-symbols-outlined text-[11px]">battery_full</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 py-1 px-1 bg-[#202c33] rounded-t-lg mt-1">
                    <div className="w-5 h-5 rounded-full bg-teal-600 flex items-center justify-center text-white text-[10px]">
                      <span className="material-symbols-outlined text-[12px]">local_hospital</span>
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <div className="flex items-center gap-1 leading-tight">
                        <span className="text-[10px] font-bold text-[#e9edef] truncate">Docplix Health</span>
                        <span className="material-symbols-outlined text-[11px] text-[#00a884]">verified</span>
                      </div>
                      <span className="text-[8px] text-[#8696a0]">Official Business Account</span>
                    </div>
                  </div>

                  <div className="bg-[#0b141a] p-2 flex flex-col gap-2 rounded-b-lg">
                    <div className="bg-[#005c4b] text-[#e9edef] p-2 rounded-lg text-[10px] leading-relaxed flex flex-col gap-1 shadow-xs">
                      <div className="flex items-center gap-1 text-[9px] text-[#8696a0]">
                        <span className="material-symbols-outlined text-[10px]">lock</span>
                        <span>Docplix Clinical Delivery</span>
                      </div>
                      <p>
                        Dear <span className="bg-black/20 px-1 rounded text-[#53bdeb]">Robert Vance</span>, this is a clinical reminder from <span className="bg-black/20 px-1 rounded text-[#53bdeb]">Dr. Sarah Jenkins</span>.
                      </p>
                      <p>
                        Your 30-day prescription for <span className="bg-black/20 px-1 rounded text-[#53bdeb]">Metformin, Lisinopril</span> concludes in 3 days.
                      </p>
                      <div className="flex justify-end items-center gap-1 text-[8px] text-[#8696a0] mt-0.5">
                        <span>11:38 AM</span>
                        <span className="material-symbols-outlined text-[11px] text-[#53bdeb]">done_all</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <button 
                        onClick={() => alert('Refill reservation simulated via WhatsApp API hook.')}
                        className="w-full py-1 bg-[#202c33] hover:bg-[#2a3942] text-[#00a884] font-bold text-[9px] rounded flex items-center justify-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[11px]">local_pharmacy</span>
                        <span>Re-order 30-Day Refill</span>
                      </button>
                      <button 
                        onClick={() => alert('Appointment booking simulator initialized.')}
                        className="w-full py-1 bg-[#202c33] hover:bg-[#2a3942] text-[#00a884] font-bold text-[9px] rounded flex items-center justify-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[11px]">calendar_month</span>
                        <span>Book Follow-up Review</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (6 / 12): Inbox & Reviews */}
        <div className="xl:col-span-6 flex flex-col gap-4">
          {/* Two-Way Patient Care Inbox */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
            <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-teal-700">chat</span>
                <h3 className="font-bold text-slate-900 text-xs">Two-Way Patient Care Inbox • OPD Desk</h3>
              </div>
              <span className="text-[10px] bg-teal-50 text-teal-800 font-bold px-2 py-0.5 rounded">
                3 Unread Alerts
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 min-h-[460px]">
              {/* Chat Thread Roster */}
              <div className="md:col-span-4 bg-slate-50/50 border-r border-slate-200 flex flex-col">
                <div className="p-2 border-b border-slate-100">
                  <input
                    type="text"
                    placeholder="Filter patient chats..."
                    className="w-full pl-2 pr-2 py-1 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none"
                  />
                </div>
                <div className="flex flex-col overflow-y-auto">
                  <div
                    onClick={() => setActivePatientChat('vance')}
                    className={`p-2.5 flex items-start gap-2 cursor-pointer transition-colors border-b border-slate-100 ${
                      activePatientChat === 'vance' ? 'bg-teal-50/80 border-l-4 border-l-teal-700' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 text-xs flex items-center justify-center font-bold shrink-0">
                      RV
                    </div>
                    <div className="flex flex-col min-w-0 flex-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 truncate">Robert Vance</span>
                        <span className="text-[10px] text-slate-400">11:40 AM</span>
                      </div>
                      <span className="text-[10px] text-slate-400">UHID #MC-984210</span>
                      <p className="text-[11px] text-slate-600 truncate mt-0.5">Thanks doctor, started the new medicine...</p>
                    </div>
                  </div>

                  <div
                    onClick={() => setActivePatientChat('rostova')}
                    className={`p-2.5 flex items-start gap-2 cursor-pointer transition-colors border-b border-slate-100 ${
                      activePatientChat === 'rostova' ? 'bg-teal-50/80 border-l-4 border-l-teal-700' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-800 text-xs flex items-center justify-center font-bold shrink-0">
                      ER
                    </div>
                    <div className="flex flex-col min-w-0 flex-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 truncate">Elena Rostova</span>
                        <span className="text-[10px] text-slate-400">10:15 AM</span>
                      </div>
                      <span className="text-[10px] text-slate-400">UHID #MC-773192</span>
                      <p className="text-[11px] text-slate-700 font-semibold truncate mt-0.5">Can I take Lisinopril after food?</p>
                    </div>
                  </div>

                  <div
                    onClick={() => setActivePatientChat('miller')}
                    className={`p-2.5 flex items-start gap-2 cursor-pointer transition-colors border-b border-slate-100 ${
                      activePatientChat === 'miller' ? 'bg-teal-50/80 border-l-4 border-l-teal-700' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 text-xs flex items-center justify-center font-bold shrink-0">
                      DM
                    </div>
                    <div className="flex flex-col min-w-0 flex-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 truncate">David Miller</span>
                        <span className="text-[10px] text-slate-400">09:22 AM</span>
                      </div>
                      <span className="text-[10px] text-slate-400">UHID #MC-514002</span>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">Confirming my slot for tomorrow 11:30 AM.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Active Conversation Pane */}
              <div className="md:col-span-8 flex flex-col justify-between bg-white">
                <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center">
                      RV
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">Robert Vance (58y / M)</span>
                        <span className="bg-teal-50 text-teal-800 text-[10px] px-1.5 py-0.2 rounded font-bold">Type 2 DM • HTN</span>
                      </div>
                      <span className="text-[10px] text-slate-400">UHID: #MC-984210 • Primary: Dr. Sarah Jenkins</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => alert('Opening full EHR chart for Vance, Robert')} className="p-1 text-slate-400 hover:text-slate-700 rounded" title="Open Full Chart">
                      <span className="material-symbols-outlined text-[18px]">clinical_notes</span>
                    </button>
                    <button onClick={() => alert('Dialing +1 (555) 392-8812...')} className="p-1 text-slate-400 hover:text-slate-700 rounded" title="Call Patient">
                      <span className="material-symbols-outlined text-[18px]">call</span>
                    </button>
                  </div>
                </div>

                {/* Message Flow */}
                <div className="p-4 flex flex-col gap-3 overflow-y-auto max-h-72 text-xs">
                  <div className="self-center bg-slate-100 px-2.5 py-0.5 rounded text-slate-500 text-[10px] font-mono">
                    Today, 11:32 AM • Automated Refill Campaign Triggered
                  </div>

                  {messages.map((m) => {
                    const isDoctor = m.sender === 'doctor';
                    const isBot = m.sender === 'bot';
                    return (
                      <div
                        key={m.id}
                        className={`flex flex-col gap-1 max-w-[85%] ${
                          isDoctor ? 'self-end' : 'self-start'
                        }`}
                      >
                        <div
                          className={`p-3 rounded-xl leading-relaxed ${
                            isDoctor
                              ? 'bg-teal-700 text-white rounded-br-none shadow-xs'
                              : isBot
                              ? 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200'
                              : 'bg-indigo-50 text-indigo-950 rounded-tl-none border border-indigo-200'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-4 text-[10px] font-bold mb-1 opacity-80">
                            <span>{m.senderName}</span>
                            <span>{m.timestamp}</span>
                          </div>
                          <p>{m.text}</p>
                          {m.status && (
                            <div className="flex justify-end items-center gap-1 text-[9px] mt-1 opacity-75 font-mono">
                              <span className="material-symbols-outlined text-[12px]">done_all</span>
                              <span>{m.status}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  <div className="p-2 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between text-[11px] text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-indigo-600 text-[16px]">smart_toy</span>
                      <span>Suggested Action: Dispatch pharmacy refill bill to Robert.</span>
                    </span>
                    <button 
                      onClick={() => alert('Refill order #REF-881 ($42.00) created & dispatched.')}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-0.5 rounded font-semibold text-xs"
                    >
                      Create Refill Order ($42.00)
                    </button>
                  </div>
                </div>

                {/* Snippets & Input Box */}
                <div className="p-3 bg-slate-50 border-t border-slate-200 flex flex-col gap-2">
                  <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 shrink-0">Snippets:</span>
                    <button 
                      onClick={() => insertSnippet('Yes, take with breakfast with a full glass of water.')}
                      className="px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-700 hover:bg-slate-100 whitespace-nowrap text-[11px]"
                    >
                      "Yes, take with breakfast"
                    </button>
                    <button 
                      onClick={() => insertSnippet('Please submit your current home BP reading before refilling.')}
                      className="px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-700 hover:bg-slate-100 whitespace-nowrap text-[11px]"
                    >
                      "Submit BP reading"
                    </button>
                    <button 
                      onClick={() => insertSnippet('Book a 15-min teleconsultation review slot for next Monday.')}
                      className="px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-700 hover:bg-slate-100 whitespace-nowrap text-[11px]"
                    >
                      "Book Teleconsultation"
                    </button>
                  </div>

                  <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Type verified doctor reply or use /template..."
                      className="flex-1 bg-white text-xs text-slate-800 px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-600"
                    />
                    <button
                      type="submit"
                      className="bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-xs flex items-center gap-1"
                    >
                      <span>Send</span>
                      <span className="material-symbols-outlined text-[15px]">send</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Feedback & CSAT */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 flex flex-col gap-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-500 text-[18px]">reviews</span>
                <h3 className="font-bold text-slate-900">Automated Post-Visit Feedback & NPS Stream</h3>
              </div>
              <span className="text-[11px] text-slate-400">Updated 5 min ago</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60 flex flex-col justify-between gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500">
                    {'★'.repeat(5)}
                  </div>
                  <span className="text-[10px] text-slate-400">Today 10:45 AM</span>
                </div>
                <p className="text-slate-700 italic text-[11px]">
                  "Extremely thorough explanation by Dr. Jenkins on my insulin titration. No waiting time at OPD."
                </p>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-slate-900">P. Sharma (Token 18)</span>
                  <span className="text-teal-800 font-semibold bg-teal-50 px-1 rounded">Punctual</span>
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60 flex flex-col justify-between gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500">
                    {'★'.repeat(5)}
                  </div>
                  <span className="text-[10px] text-slate-400">Yesterday</span>
                </div>
                <p className="text-slate-700 italic text-[11px]">
                  "The automated WhatsApp reminders with quick confirm buttons are fantastic for elderly patients."
                </p>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-slate-900">Anita Roy (OPD-B)</span>
                  <span className="text-indigo-800 font-semibold bg-indigo-50 px-1 rounded">Tech Friendly</span>
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60 flex flex-col justify-between gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500">
                    {'★'.repeat(4)}☆
                  </div>
                  <span className="text-[10px] text-slate-400">Yesterday</span>
                </div>
                <p className="text-slate-700 italic text-[11px]">
                  "Quick billing at counter 2, prescription sent directly to my mobile. Very smooth experience."
                </p>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-slate-900">M. Kenneth</span>
                  <span className="text-teal-800 font-semibold bg-teal-50 px-1 rounded">Quick Billing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {sendSuccessToast && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 bg-teal-800 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in duration-200">
          <span className="material-symbols-outlined text-teal-300 text-[24px]">verified</span>
          <div>
            <h4 className="font-bold text-xs">WhatsApp HSM Template Synced</h4>
            <p className="text-[11px] text-teal-100">Live Meta cadence updated for 14,820 patient cohort.</p>
          </div>
        </div>
      )}
    </div>
  );
};
