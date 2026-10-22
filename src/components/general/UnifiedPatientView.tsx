import React, { useState } from 'react';
import { PatientRecord, MedicationItem, DiagnosticOrder } from '../../types';
import { mockGeneralPatient, mockActiveMedications, mockDiagnosticOrders } from '../../data/mockData';

interface UnifiedPatientViewProps {
  patient?: PatientRecord;
  onNavigateToBilling?: () => void;
  onNavigateToCrm?: () => void;
}

export const UnifiedPatientView: React.FC<UnifiedPatientViewProps> = ({
  patient = mockGeneralPatient,
  onNavigateToBilling,
  onNavigateToCrm
}) => {
  const [soapTab, setSoapTab] = useState<'subjective' | 'objective' | 'assessment' | 'plan'>('subjective');
  const [subjectiveNote, setSubjectiveNote] = useState(patient.chiefComplaint || '');
  const [examNormalAll, setExamNormalAll] = useState(false);
  const [examState, setExamState] = useState({
    heent: 'Normocephalic, PERRLA',
    chest: 'Clear bilaterally',
    cvs: 'S1 S2 heard, no murmurs',
    abdomen: 'Soft, non-tender, benign',
    neuro: 'No pedal edema; 10g Semmes-Weinstein monofilament test intact bilaterally.'
  });

  const [diagnoses, setDiagnoses] = useState([
    { code: 'E11.9', name: 'Type 2 diabetes mellitus without complications', type: 'Primary Diagnosis • Chronic Condition' },
    { code: 'I10', name: 'Essential (primary) hypertension', type: 'Secondary Diagnosis • Stable on Lisinopril' }
  ]);
  const [searchDiag, setSearchDiag] = useState('');

  const [meds, setMeds] = useState<MedicationItem[]>(mockActiveMedications);
  const [newDrugInput, setNewDrugInput] = useState('');

  const [labOrders, setLabOrders] = useState<DiagnosticOrder[]>(mockDiagnosticOrders);
  const [signedToast, setSignedToast] = useState(false);
  const [whatsAppToast, setWhatsAppToast] = useState(false);
  const [dicomModal, setDicomModal] = useState(false);
  const [voiceRecording, setVoiceRecording] = useState(false);

  const handleAddDiagnosis = (code: string, name: string) => {
    if (!diagnoses.some(d => d.code === code)) {
      setDiagnoses([...diagnoses, { code, name, type: 'Added Diagnosis' }]);
      setSearchDiag('');
    }
  };

  const handleRemoveDiagnosis = (code: string) => {
    setDiagnoses(diagnoses.filter(d => d.code !== code));
  };

  const handleAddMedication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDrugInput.trim()) return;
    const newMed: MedicationItem = {
      id: `med-${Date.now()}`,
      name: newDrugInput.trim(),
      dosage: '1 Tab OD',
      frequency: 'Once Daily with water',
      duration: '30 Days',
      refills: 1,
      route: 'Oral',
      isNew: true,
      status: 'Active',
      since: 'Today'
    };
    setMeds([...meds, newMed]);
    setNewDrugInput('');
  };

  const handleRemoveMedication = (id: string) => {
    setMeds(meds.filter(m => m.id !== id));
  };

  const handleSignAndDispatch = () => {
    setSignedToast(true);
    setTimeout(() => setSignedToast(false), 3500);
  };

  const handleWhatsAppDispatch = () => {
    setWhatsAppToast(true);
    setTimeout(() => setWhatsAppToast(false), 3500);
  };

  const handleNormalAll = () => {
    setExamNormalAll(!examNormalAll);
    if (!examNormalAll) {
      setExamState({
        heent: 'Normocephalic, atraumatic, PERRLA, throat clear',
        chest: 'Vesicular breath sounds clear bilaterally, no wheeze/crackles',
        cvs: 'Regular rate and rhythm, S1/S2 present, no murmurs/rubs',
        abdomen: 'Soft, non-distended, non-tender, active bowel sounds',
        neuro: 'Cranial nerves II-XII intact, DTRs 2+ symmetric, gait normal'
      });
    }
  };

  const toggleVoiceRecording = () => {
    setVoiceRecording(!voiceRecording);
    if (!voiceRecording) {
      setTimeout(() => {
        setSubjectiveNote(prev => prev + ' [Dictation]: Patient has maintained daily fasting capillary sugars around 110-125 mg/dL. No nocturnal hypoglycemia symptoms.');
        setVoiceRecording(false);
      }, 2500);
    }
  };

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Top Patient Header & Triage Bar */}
      <section className="bg-white border-b border-slate-200 px-4 py-3 mb-3 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2">
          {/* Patient Photo & Primary Identifiers */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                className="w-12 h-12 rounded-lg object-cover shadow-sm ring-1 ring-slate-200"
                alt={patient.name}
                src={patient.avatar}
              />
              <span className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-xs">
                <span className="material-symbols-outlined text-teal-700 text-[15px] block">verified_user</span>
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg font-bold text-slate-900 tracking-tight">{patient.name}</h1>
                <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                  {patient.age}y {patient.gender}
                </span>
                <span className="font-mono text-xs font-bold bg-teal-50 text-teal-800 px-2 py-0.5 rounded border border-teal-200/50">
                  {patient.uhid}
                </span>
                <span className="text-xs text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                  DOB: {patient.dob}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-1 text-xs text-slate-500 flex-wrap">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-rose-600">water_drop</span>
                  Blood: <strong className="text-slate-800">{patient.bloodGroup}</strong>
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-teal-700">call</span>
                  {patient.phone}
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-slate-400">health_and_safety</span>
                  {patient.insurancePayer} (<span className="font-mono font-semibold text-slate-700">{patient.insurancePolicyId}</span>)
                </span>
              </div>
            </div>
          </div>

          {/* Header Patient Actions */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button 
              onClick={() => window.print()}
              className="flex items-center gap-1 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded border border-slate-200 shadow-xs transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              <span>Print Sheet</span>
            </button>
            <button 
              onClick={() => alert('Referral modal: Select specialist (Cardiology, Endocrinology, Ophthalmology, Podiatry).')}
              className="flex items-center gap-1 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded border border-slate-200 shadow-xs transition-colors"
            >
              <span className="material-symbols-outlined text-[16px] text-slate-500">transfer_within_a_station</span>
              <span>Refer</span>
            </button>
            <button 
              onClick={() => setSoapTab('plan')}
              className="flex items-center gap-1 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded border border-slate-200 shadow-xs transition-colors"
            >
              <span className="material-symbols-outlined text-[16px] text-teal-700">science</span>
              <span>Order Labs</span>
            </button>
            <button 
              onClick={() => alert('IPD Admission Request submitted for Vance, Robert (Internal Medicine Ward). Bed management notified.')}
              className="flex items-center gap-1 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-800 font-semibold text-xs rounded border border-rose-200 shadow-xs transition-colors"
            >
              <span className="material-symbols-outlined text-[16px] text-rose-600">hotel</span>
              <span>Admit IPD</span>
            </button>
            <button 
              onClick={handleSignAndDispatch}
              className="flex items-center gap-1 px-3.5 py-1.5 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded shadow-xs transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              <span>Finish Encounter</span>
            </button>
          </div>
        </div>

        {/* Clinical Alerts & Triage Vitals Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200/60">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 px-2.5 py-1 bg-rose-100 text-rose-800 text-xs rounded font-bold border border-rose-200">
              <span className="material-symbols-outlined text-[15px]">dangerous</span>
              <span>ALLERGY: Penicillin, Sulfonamides (Severe Anaphylaxis)</span>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 bg-amber-100/70 text-amber-900 text-xs rounded font-semibold border border-amber-200">
              <span className="material-symbols-outlined text-[15px] text-amber-700">warning</span>
              <span>Type 2 Diabetes (6y) • Stage 1 HTN</span>
            </div>
          </div>

          {/* Vitals Ribbon */}
          <div className="flex items-center gap-3 text-xs text-slate-600 flex-wrap">
            <span className="font-mono text-teal-800 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-ping"></span>
              Triage ({patient.vitals.recordedTime}):
            </span>
            <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded shadow-xs border border-slate-200">
              <span>BP:</span>
              <strong className="font-mono text-rose-600">{patient.vitals.bp}</strong>
              <span className="text-[10px] text-rose-600 font-medium">Pre-HTN</span>
            </div>
            <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded shadow-xs border border-slate-200">
              <span>HR:</span>
              <strong className="font-mono text-slate-900">{patient.vitals.hr}</strong>
              <span className="text-[10px] text-slate-500">bpm</span>
            </div>
            <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded shadow-xs border border-slate-200">
              <span>SpO₂:</span>
              <strong className="font-mono text-teal-700 font-bold">{patient.vitals.spo2}%</strong>
            </div>
            <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded shadow-xs border border-slate-200">
              <span>Temp:</span>
              <strong className="font-mono text-slate-900">{patient.vitals.temp}</strong>
            </div>
            <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded shadow-xs border border-slate-200">
              <span>BMI:</span>
              <strong className="font-mono text-slate-700">{patient.vitals.bmi}</strong>
              <span className="text-[10px] text-slate-400">kg/m²</span>
            </div>
            <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded shadow-xs border border-slate-200">
              <span>RBS:</span>
              <strong className="font-mono text-rose-600 font-semibold">{patient.vitals.rbs}</strong>
              <span className="text-[10px] text-slate-400">mg/dL</span>
            </div>
          </div>
        </div>
      </section>

      {/* High-Density Three-Column Workstation Layout */}
      <div className="grid grid-cols-12 gap-3 px-4">
        {/* COLUMN 1: Longitudinal Timeline, Vitals & Lab Trends (3 / 12) */}
        <div className="col-span-12 xl:col-span-3 flex flex-col gap-3">
          {/* Diagnostic Lab Trends & Sparklines */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-teal-700">monitoring</span>
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Diagnostic Lab Trends</h2>
              </div>
              <span className="text-[10px] bg-teal-50 text-teal-800 font-bold px-1.5 py-0.5 rounded">Past 12M</span>
            </div>

            {/* HbA1c Card with Sparkline */}
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/60 mb-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">HbA1c Level</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-base font-bold text-slate-900">7.0%</span>
                  <span className="text-xs text-rose-600 font-semibold flex items-center">
                    <span className="material-symbols-outlined text-[14px]">arrow_upward</span> +0.2
                  </span>
                </div>
              </div>
              {/* Inline Sparkline SVG */}
              <div className="mt-1 flex items-center justify-between gap-2">
                <svg className="w-full h-8 text-teal-600 overflow-visible" fill="none" viewBox="0 0 160 30">
                  <path d="M 10 22 L 60 12 L 110 20 L 150 14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2"></path>
                  <circle className="fill-white stroke-teal-600" cx="10" cy="22" r="3.5" strokeWidth="2"></circle>
                  <circle className="fill-white stroke-teal-600" cx="60" cy="12" r="3.5" strokeWidth="2"></circle>
                  <circle className="fill-white stroke-teal-600" cx="110" cy="20" r="3.5" strokeWidth="2"></circle>
                  <circle className="fill-teal-600 stroke-white" cx="150" cy="14" r="4.5" strokeWidth="1.5"></circle>
                </svg>
              </div>
              <div className="flex justify-between font-mono text-[10px] text-slate-500 mt-1">
                <span>Jan '24: 7.1%</span>
                <span>Jul '24: 6.8%</span>
                <span className="font-semibold text-slate-800">Today: 7.0%</span>
              </div>
            </div>

            {/* Biomarker Matrix */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-slate-50 p-2 rounded border border-slate-200/60">
                <div className="text-[11px] text-slate-500 font-medium">Kidney eGFR</div>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-sm font-bold text-slate-900 font-mono">88</span>
                  <span className="text-[10px] text-slate-400">mL/min</span>
                </div>
                <span className="text-[10px] text-teal-700 font-semibold">Stage G2 (Mild)</span>
              </div>
              <div className="bg-slate-50 p-2 rounded border border-slate-200/60">
                <div className="text-[11px] text-slate-500 font-medium">Lipid / LDL-C</div>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-sm font-bold text-rose-600 font-mono">118</span>
                  <span className="text-[10px] text-slate-400">mg/dL</span>
                </div>
                <span className="text-[10px] text-rose-600 font-semibold">Borderline High</span>
              </div>
            </div>
          </div>

          {/* Active Medications List */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-teal-700">pill</span>
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Active Medications</h2>
              </div>
              <span className="font-mono text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-bold">
                {meds.length} Current
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              {meds.map((med) => (
                <div key={med.id} className="bg-slate-50 p-2 rounded-lg border border-slate-200/60 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
                      <span>{med.name}</span>
                      {med.isNew && (
                        <span className="text-[9px] bg-teal-600 text-white font-bold px-1 rounded uppercase">New</span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500">{med.dosage} • {med.frequency}</div>
                  </div>
                  <span className="text-[10px] bg-teal-50 text-teal-800 font-semibold px-1.5 py-0.5 rounded border border-teal-200/50">
                    Rx Active
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Past Clinical Encounters Timeline */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-teal-700">history</span>
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Past Clinical Encounters</h2>
              </div>
              <button 
                onClick={() => alert('Full longitudinal encounter record (14 visits) from 2021-2024.')}
                className="text-[11px] text-teal-700 font-semibold hover:underline"
              >
                View All (14)
              </button>
            </div>

            <div className="flex flex-col gap-2 relative before:absolute before:top-2 before:bottom-2 before:left-3 before:w-0.5 before:bg-slate-200">
              <div className="flex gap-2.5 items-start relative pl-1">
                <span className="w-4 h-4 rounded-full bg-teal-700 flex items-center justify-center text-white text-[10px] font-bold z-10 mt-0.5 shadow-xs">•</span>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200/60 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-900">Acute Bronchitis</span>
                    <span className="font-mono text-[10px] text-slate-500">12-Oct-2024</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5">Dr. Sarah Jenkins • Resolved with Azithromycin & inhaler.</p>
                </div>
              </div>

              <div className="flex gap-2.5 items-start relative pl-1">
                <span className="w-4 h-4 rounded-full bg-slate-300 flex items-center justify-center text-slate-700 text-[10px] font-bold z-10 mt-0.5">•</span>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200/60 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-900">Routine Diabetic Review</span>
                    <span className="font-mono text-[10px] text-slate-500">04-Jul-2024</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5">Dr. Sarah Jenkins • HbA1c was 6.8%. Diet adherence high.</p>
                </div>
              </div>

              <div className="flex gap-2.5 items-start relative pl-1">
                <span className="w-4 h-4 rounded-full bg-slate-300 flex items-center justify-center text-slate-700 text-[10px] font-bold z-10 mt-0.5">•</span>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200/60 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-900">Right Ankle Sprain</span>
                    <span className="font-mono text-[10px] text-slate-500">19-Jan-2024</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5">OPD Ortho • X-ray negative for fracture. Crepe bandage given.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Uploaded Radiology & Lab Documents */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-teal-700">folder_open</span>
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Lab & Imaging Files</h2>
              </div>
              <button 
                onClick={() => alert('File upload drawer: select PDF/DICOM files from disk.')}
                className="text-[11px] text-teal-700 font-semibold flex items-center gap-0.5 hover:underline"
              >
                <span className="material-symbols-outlined text-[13px]">upload_file</span> Upload
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div 
                onClick={() => alert('PDF Viewer: HbA1c Glycated Hemoglobin automated lab report (Analyzed by Cobas Integra 400).')}
                className="p-2 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200/60 cursor-pointer transition-all flex flex-col justify-between"
              >
                <div className="flex items-center gap-1.5 text-rose-600">
                  <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                  <span className="text-xs font-semibold text-slate-800 truncate">HbA1c_Oct24.pdf</span>
                </div>
                <div className="flex items-center justify-between mt-2 text-[10px] text-slate-500 font-mono">
                  <span>120 KB</span>
                  <span className="text-teal-700 font-bold">Preview</span>
                </div>
              </div>

              <div 
                onClick={() => setDicomModal(true)}
                className="p-2 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200/60 cursor-pointer transition-all flex flex-col justify-between"
              >
                <div className="flex items-center gap-1.5 text-indigo-600">
                  <span className="material-symbols-outlined text-[18px]">radiology</span>
                  <span className="text-xs font-semibold text-slate-800 truncate">Chest_PA_Ray.dcm</span>
                </div>
                <div className="flex items-center justify-between mt-2 text-[10px] text-slate-500 font-mono">
                  <span>4.2 MB</span>
                  <span className="text-teal-700 font-bold">DICOM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMN 2: Center Active SOAP Workspace (5 / 12) */}
        <div className="col-span-12 xl:col-span-5 flex flex-col gap-3">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col gap-3.5">
            {/* Header Toolbar & Protocol Selector */}
            <div className="flex items-center justify-between pb-2 bg-slate-50 p-2 rounded-lg border border-slate-200/60">
              <div className="flex items-center gap-1.5">
                <span className="px-2.5 py-1 bg-teal-700 text-white font-bold text-xs rounded shadow-xs">
                  Active Encounter Note
                </span>
                <span className="px-2 py-1 bg-slate-200 text-slate-800 font-mono text-xs rounded font-semibold">
                  OPD-104
                </span>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-[11px] text-slate-500 font-semibold">Protocol:</label>
                <select className="bg-white text-xs text-slate-800 px-2 py-1 rounded border border-slate-200 focus:outline-none">
                  <option>Diabetes Follow-up Protocol</option>
                  <option>Upper Respiratory Infection</option>
                  <option>Hypertension Annual Review</option>
                  <option>Comprehensive Adult Physical</option>
                </select>
              </div>
            </div>

            {/* SOAP Segment Tabs Navigation */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-semibold">
              <button
                onClick={() => setSoapTab('subjective')}
                className={`flex-1 py-1 px-2 rounded-md transition-all text-center ${
                  soapTab === 'subjective' ? 'bg-white text-teal-800 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Subjective
              </button>
              <button
                onClick={() => setSoapTab('objective')}
                className={`flex-1 py-1 px-2 rounded-md transition-all text-center ${
                  soapTab === 'objective' ? 'bg-white text-teal-800 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Objective
              </button>
              <button
                onClick={() => setSoapTab('assessment')}
                className={`flex-1 py-1 px-2 rounded-md transition-all text-center ${
                  soapTab === 'assessment' ? 'bg-white text-teal-800 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Assessment (ICD-10)
              </button>
              <button
                onClick={() => setSoapTab('plan')}
                className={`flex-1 py-1 px-2 rounded-md transition-all text-center ${
                  soapTab === 'plan' ? 'bg-white text-teal-800 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Plan & Orders
              </button>
            </div>

            {/* 1. SUBJECTIVE SECTION */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-teal-800 font-bold uppercase tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">record_voice_over</span>
                  1. Subjective (Chief Complaint & HPI)
                </span>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => setSubjectiveNote(prev => prev + '\n.hpi: Polyuria, polydipsia, fatigue reported.')}
                    className="font-mono text-[10px] bg-teal-50 text-teal-800 border border-teal-200 px-1.5 py-0.5 rounded hover:bg-teal-100"
                  >
                    .hpi
                  </button>
                  <button 
                    onClick={() => setSubjectiveNote(prev => prev + '\n.ros: Denies chest pain, palpitations, or orthopnea.')}
                    className="font-mono text-[10px] bg-teal-50 text-teal-800 border border-teal-200 px-1.5 py-0.5 rounded hover:bg-teal-100"
                  >
                    .ros
                  </button>
                </div>
              </div>
              <textarea
                value={subjectiveNote}
                onChange={(e) => setSubjectiveNote(e.target.value)}
                rows={3}
                className="w-full bg-slate-50 p-2.5 text-xs text-slate-800 rounded-lg border border-slate-200 focus:bg-white focus:border-teal-600 focus:ring-1 focus:ring-teal-600 focus:outline-none transition-all leading-relaxed"
                placeholder="Enter subjective symptoms, onset, duration, patient reports..."
              />
            </div>

            {/* 2. OBJECTIVE SECTION (Physical Exam Matrix) */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-teal-800 font-bold uppercase tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">stethoscope</span>
                  2. Objective (Physical Examination Checklist)
                </span>
                <button 
                  onClick={handleNormalAll}
                  className="text-xs text-teal-700 hover:underline font-semibold"
                >
                  {examNormalAll ? 'Reset Exam' : '+ Normal All'}
                </button>
              </div>

              {/* Structured Examination Grid */}
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200/60 text-xs">
                <div className="flex items-center justify-between p-1.5 bg-white rounded border border-slate-200 shadow-2xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-teal-600"></span>
                    <span className="font-semibold text-slate-800">HEENT</span>
                  </div>
                  <span className="text-[11px] text-slate-500 truncate max-w-[130px]">{examState.heent}</span>
                </div>

                <div className="flex items-center justify-between p-1.5 bg-white rounded border border-slate-200 shadow-2xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-teal-600"></span>
                    <span className="font-semibold text-slate-800">Chest/Lungs</span>
                  </div>
                  <span className="text-[11px] text-slate-500 truncate max-w-[130px]">{examState.chest}</span>
                </div>

                <div className="flex items-center justify-between p-1.5 bg-white rounded border border-slate-200 shadow-2xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-teal-600"></span>
                    <span className="font-semibold text-slate-800">CVS</span>
                  </div>
                  <span className="text-[11px] text-slate-500 truncate max-w-[130px]">{examState.cvs}</span>
                </div>

                <div className="flex items-center justify-between p-1.5 bg-white rounded border border-slate-200 shadow-2xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-teal-600"></span>
                    <span className="font-semibold text-slate-800">Abdomen</span>
                  </div>
                  <span className="text-[11px] text-slate-500 truncate max-w-[130px]">{examState.abdomen}</span>
                </div>

                <div className="flex items-center justify-between p-1.5 bg-white rounded border border-slate-200 shadow-2xs col-span-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-teal-600"></span>
                    <span className="font-semibold text-slate-800">Extremities & Neuro</span>
                  </div>
                  <span className="text-[11px] text-slate-500 truncate max-w-xs">{examState.neuro}</span>
                </div>
              </div>
            </div>

            {/* 3. ASSESSMENT & ICD-10 DIAGNOSES */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-teal-800 font-bold uppercase tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">diagnosis</span>
                  3. Assessment (ICD-10 Clinical Diagnosis)
                </span>
                <span className="text-[11px] text-slate-500 font-mono font-medium">{diagnoses.length} Coded</span>
              </div>

              {/* ICD-10 Search */}
              <div className="relative">
                <span className="material-symbols-outlined absolute left-2.5 top-2 text-[16px] text-slate-400">search</span>
                <input
                  type="text"
                  value={searchDiag}
                  onChange={(e) => setSearchDiag(e.target.value)}
                  placeholder="Search ICD-10 by name or code (e.g., E11.9, I10, E78.5)..."
                  className="w-full pl-8 pr-3 py-1.5 bg-slate-50 text-xs text-slate-800 rounded-lg border border-slate-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-600"
                />
                {searchDiag.trim() && (
                  <div className="absolute top-8 left-0 right-0 bg-white border border-slate-200 rounded-lg shadow-lg z-20 p-1 text-xs">
                    <div 
                      onClick={() => handleAddDiagnosis('E78.5', 'Hyperlipidemia, unspecified')}
                      className="p-1.5 hover:bg-teal-50 cursor-pointer rounded flex items-center justify-between"
                    >
                      <span className="font-mono font-bold text-teal-800">E78.5</span>
                      <span>Hyperlipidemia, unspecified</span>
                    </div>
                    <div 
                      onClick={() => handleAddDiagnosis('Z79.4', 'Long term (current) use of insulin')}
                      className="p-1.5 hover:bg-teal-50 cursor-pointer rounded flex items-center justify-between"
                    >
                      <span className="font-mono font-bold text-teal-800">Z79.4</span>
                      <span>Long term use of insulin</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Assigned Diagnosis Chips */}
              <div className="flex flex-col gap-1.5">
                {diagnoses.map((diag) => (
                  <div key={diag.code} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-200/60">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs bg-teal-700 text-white font-bold px-1.5 py-0.5 rounded">
                        {diag.code}
                      </span>
                      <div>
                        <div className="text-xs font-semibold text-slate-900">{diag.name}</div>
                        <div className="text-[10px] text-slate-500">{diag.type}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveDiagnosis(diag.code)}
                      className="text-slate-400 hover:text-rose-600 p-1 rounded"
                    >
                      <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Macro Hotkeys Ribbon */}
            <div className="flex items-center justify-between pt-2 bg-slate-50 p-2 rounded-lg border border-slate-200/60 text-[11px] text-slate-600">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px] text-teal-700">keyboard</span>
                <span>Hotkeys:</span>
                <kbd className="font-mono text-[10px] px-1 bg-white rounded border border-slate-200 text-slate-700">F2: Sign</kbd>
                <kbd className="font-mono text-[10px] px-1 bg-white rounded border border-slate-200 text-slate-700">F4: Add Rx</kbd>
                <kbd className="font-mono text-[10px] px-1 bg-white rounded border border-slate-200 text-slate-700">F7: Labs</kbd>
              </div>
              <span className="text-[10px] text-teal-700 font-semibold">Draft Auto-Saved 1m ago</span>
            </div>
          </div>
        </div>

        {/* COLUMN 3: Smart Rx Builder, Diagnostics & Plan (4 / 12) */}
        <div className="col-span-12 xl:col-span-4 flex flex-col gap-3">
          {/* Smart e-Prescription Composer */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-col gap-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-teal-700">medication_liquid</span>
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Smart e-Prescription Composer</h2>
              </div>
              <span className="font-mono text-xs bg-teal-50 text-teal-800 px-2 py-0.5 rounded font-bold border border-teal-200/50">
                Rx #7842
              </span>
            </div>

            {/* Drug Interaction Safety Alert Banner */}
            <div className="flex items-center gap-2 p-2 bg-emerald-50 text-slate-800 rounded-lg border border-emerald-200">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 flex-shrink-0 animate-pulse"></span>
              <div className="flex-1 text-xs">
                <div className="font-bold text-emerald-900">🟢 CDS Engine: Clean Interaction Check</div>
                <div className="text-[11px] text-emerald-800/80">No contraindications or cross-allergenicity found for Vance, R.</div>
              </div>
            </div>

            {/* Fast-Add Medication Input */}
            <form onSubmit={handleAddMedication} className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-2.5 text-[16px] text-slate-400">add_circle</span>
              <input
                type="text"
                value={newDrugInput}
                onChange={(e) => setNewDrugInput(e.target.value)}
                placeholder="Type drug name / generic salt to add (e.g. Atorvastatin 20mg)..."
                className="w-full pl-8 pr-12 py-1.5 bg-slate-50 text-xs text-slate-800 rounded-lg border border-slate-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-600"
              />
              <span className="absolute right-2 font-mono text-[10px] text-slate-500 bg-slate-200 px-1 py-0.5 rounded">F4</span>
            </form>

            {/* Prescribed Items List */}
            <div className="flex flex-col gap-1.5">
              {meds.map((med) => (
                <div key={med.id} className="p-2 bg-slate-50 rounded-lg border border-slate-200/60 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-slate-900">{med.name}</span>
                      <span className="text-[10px] bg-slate-200 text-slate-600 px-1 rounded">{med.route}</span>
                      {med.isNew && (
                        <span className="text-[9px] bg-teal-600 text-white font-bold px-1 rounded">NEW</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-700">{med.duration}</span>
                      <button
                        onClick={() => handleRemoveMedication(med.id)}
                        className="text-slate-400 hover:text-rose-600"
                        title="Delete drug"
                      >
                        <span className="material-symbols-outlined text-[15px]">delete</span>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-slate-500 text-[11px]">
                    <span>Dosage: <strong>{med.dosage}</strong> ({med.frequency})</span>
                    <span className="font-mono text-[10px] bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-700">
                      Refills: {med.refills}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Diagnostic Orders & Follow-up Panel */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-col gap-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-teal-700">biotech</span>
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Diagnostic Orders (Next Encounter)</h2>
              </div>
              <button 
                onClick={() => {
                  const newLab: DiagnosticOrder = {
                    id: `lab-${Date.now()}`,
                    name: 'Fasting Lipid Profile (Complete)',
                    category: 'Lipids',
                    status: 'Routine',
                    selected: true
                  };
                  setLabOrders([...labOrders, newLab]);
                }}
                className="text-xs text-teal-700 font-semibold hover:underline"
              >
                + Add Lab
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              {labOrders.map((lab) => (
                <label key={lab.id} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-200/60 cursor-pointer text-xs">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={lab.selected}
                      onChange={() => {
                        setLabOrders(labOrders.map(l => l.id === lab.id ? { ...l, selected: !l.selected } : l));
                      }}
                      className="w-3.5 h-3.5 text-teal-600 rounded border-slate-300 focus:ring-teal-600"
                    />
                    <span className="font-medium text-slate-800">{lab.name}</span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                    {lab.status}
                  </span>
                </label>
              ))}
            </div>

            {/* Follow-up Scheduling & Instructions */}
            <div className="flex flex-col gap-1.5 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">Follow-up Appointment</span>
                <span className="text-[11px] bg-teal-50 text-teal-800 font-bold px-2 py-0.5 rounded border border-teal-200/50">
                  In 4 Weeks (15-Dec-2024)
                </span>
              </div>
              <div>
                <label className="text-[11px] text-slate-500 font-medium">Patient Dietary & Lifestyle Instructions</label>
                <input
                  type="text"
                  defaultValue="Low glycemic diet reinforcement provided. Hydrate adequately with Empagliflozin start."
                  className="w-full mt-1 p-2 bg-slate-50 text-xs text-slate-800 rounded-lg border border-slate-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-600"
                />
              </div>
            </div>

            {/* Dispatch & Sign Action Buttons */}
            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={handleSignAndDispatch}
                className="w-full flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 text-white py-2.5 px-3 rounded-lg text-xs font-bold shadow-xs transition-all active:scale-98"
              >
                <span className="material-symbols-outlined text-[18px]">draw</span>
                <span>Digitally Sign & Dispatch to Pharmacy (Rx #7842)</span>
              </button>

              <button
                onClick={handleWhatsAppDispatch}
                className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 py-2 px-3 rounded-lg text-xs font-semibold border border-slate-200 transition-all"
              >
                <span className="material-symbols-outlined text-[18px] text-emerald-600">chat</span>
                <span>WhatsApp Rx & Lab Slips to Patient (+1 555-392-8812)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Shift Helper Toolbar */}
      <div className="fixed bottom-9 right-8 z-30 flex items-center gap-2">
        <div className="bg-slate-900 text-white px-4 py-2 rounded-xl shadow-xl flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
            <span>Doctor Workstation Sync: <strong>Enc #4928 Active</strong></span>
          </div>
          <div className="h-4 w-px bg-slate-700"></div>
          <button 
            onClick={toggleVoiceRecording}
            className={`hover:text-teal-300 flex items-center gap-1 font-semibold ${
              voiceRecording ? 'text-rose-400 animate-pulse' : 'text-teal-400'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">mic</span>
            {voiceRecording ? 'Listening...' : 'Voice Dictate'}
          </button>
          <div className="h-4 w-px bg-slate-700"></div>
          <button 
            onClick={() => alert('Doctor workstation locked. Enter clinical PIN to resume session.')}
            className="text-slate-300 hover:text-white flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">lock_reset</span> Lock Station
          </button>
        </div>
      </div>

      {/* Signed Confirmation Toast */}
      {signedToast && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 bg-teal-800 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in duration-200">
          <span className="material-symbols-outlined text-teal-300 text-[22px]">verified</span>
          <div>
            <h4 className="font-bold text-xs">Encounter Note Signed Digitally</h4>
            <p className="text-[11px] text-teal-100">Rx #7842 dispatched to Hospital Pharmacy POS & Billing queue.</p>
          </div>
        </div>
      )}

      {/* WhatsApp Toast */}
      {whatsAppToast && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 bg-emerald-800 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in duration-200">
          <span className="material-symbols-outlined text-emerald-300 text-[22px]">send</span>
          <div>
            <h4 className="font-bold text-xs">WhatsApp Message Sent</h4>
            <p className="text-[11px] text-emerald-100">Encrypted digital prescription PDF & lab requisition delivered to +1 555-392-8812.</p>
          </div>
        </div>
      )}

      {/* DICOM Viewer Modal */}
      {dicomModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-700 rounded-2xl max-w-2xl w-full p-4 text-white">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-teal-400">radiology</span>
                <span className="font-bold text-sm">DICOM Viewer - Chest_PA_Ray.dcm</span>
                <span className="text-xs bg-slate-800 px-2 py-0.5 rounded text-slate-300">Vance, Robert</span>
              </div>
              <button onClick={() => setDicomModal(false)} className="text-slate-400 hover:text-white">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="my-4 bg-black rounded-lg overflow-hidden flex items-center justify-center h-80 relative">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtybwCTyGSxF6tgcxA4xuLw9u0pZIqZDuCn_fTztN9Oy3gKOB8KYtNJwaf-C3tjXZZ9k77CI3CGNxn-uZkEtiJhQNhSbgBctazRXxUt7GMRF0CvBr6DOIgTpjXkMrUu1y34tnkf0Hvne_Ee2u1u5PUyzog41q1H8GsRfL3mZcnySEsD2ujHUm74zMIsC4tnYr2hEyHxf-yRB-aRWGgd8Dh5wacWYKFFKbc5O0BVmks-QUfOT3niE8"
                alt="Radiograph PA"
                className="h-full object-contain filter contrast-125"
              />
              <div className="absolute top-2 left-2 bg-black/60 px-2 py-1 rounded text-[10px] font-mono">
                kVp: 120 • Exposure: 3.2 mAs • Matrix: 2048x2048
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Impression: Normal lung volumes, clear costophrenic angles, cardiothoracic ratio normal.</span>
              <button 
                onClick={() => setDicomModal(false)}
                className="px-3 py-1 bg-teal-600 hover:bg-teal-700 text-white rounded font-semibold"
              >
                Close Viewer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
