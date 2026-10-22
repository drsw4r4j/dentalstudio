/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ClinicMode, GeneralModuleId, DentalModuleId, PatientRecord } from './types';
import { mockGeneralPatient, mockDentalPatient } from './data/mockData';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { UnifiedPatientView } from './components/general/UnifiedPatientView';
import { QueueScheduling } from './components/general/QueueScheduling';
import { PharmacyBillingERP } from './components/general/PharmacyBillingERP';
import { CrmEngagement } from './components/general/CrmEngagement';
import { DentalDashboard } from './components/dental/DentalDashboard';
import { DentalChartEHR } from './components/dental/DentalChartEHR';
import { DentalOperatoryQueue } from './components/dental/DentalOperatoryQueue';
import { DentalLabMaterialPOS } from './components/dental/DentalLabMaterialPOS';
import { DentalCrmRecall } from './components/dental/DentalCrmRecall';
import { AddDentalExaminationModal } from './components/dental/AddDentalExaminationModal';

export default function App() {
  const [mode, setMode] = useState<ClinicMode>('general');
  const [generalTab, setGeneralTab] = useState<GeneralModuleId>('patients');
  const [dentalTab, setDentalTab] = useState<DentalModuleId>('dashboard');
  const [activePatient, setActivePatient] = useState<PatientRecord>(mockGeneralPatient);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [examinationModalOpen, setExaminationModalOpen] = useState(false);

  // Global Ctrl+K hotkey for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleModeChange = (newMode: ClinicMode) => {
    setMode(newMode);
    if (newMode === 'dental') {
      setActivePatient(mockDentalPatient);
    } else {
      setActivePatient(mockGeneralPatient);
    }
  };

  const handlePatientSelect = (patient: PatientRecord) => {
    setActivePatient(patient);
    if (patient.id.includes('dent') || patient.uhid.includes('DENT')) {
      setMode('dental');
      setDentalTab('dental-chart');
    } else {
      setMode('general');
      setGeneralTab('patients');
    }
    setSearchModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 font-sans flex flex-col selection:bg-teal-500 selection:text-white antialiased">
      {/* Global Clinical Header */}
      <Header
        mode={mode}
        onModeChange={handleModeChange}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenWalkin={() => {
          if (mode === 'general') {
            setGeneralTab('queue');
          } else {
            setDentalTab('operatory-queue');
          }
        }}
        onOpenTriage={() => {
          if (mode === 'general') {
            setGeneralTab('queue');
          } else {
            setDentalTab('operatory-queue');
          }
        }}
        onOpenExaminationModal={() => setExaminationModalOpen(true)}
      />

      {/* Main Workspace Frame */}
      <div className="flex flex-1 pt-16 pb-7">
        {/* Adaptive Clinical Sidebar */}
        <Sidebar
          mode={mode}
          generalTab={generalTab}
          dentalTab={dentalTab}
          onSelectGeneralTab={(tab) => setGeneralTab(tab)}
          onSelectDentalTab={(tab) => setDentalTab(tab)}
          onOpenExaminationModal={() => setExaminationModalOpen(true)}
        />

        {/* Dynamic Main Workspace Content */}
        <main className="flex-1 ml-64 p-6 min-h-[calc(100vh-5.75rem)] overflow-y-auto">
          {mode === 'general' ? (
            <>
              {generalTab === 'patients' && (
                <UnifiedPatientView
                  patient={activePatient}
                  onNavigateToBilling={() => setGeneralTab('billing-pharmacy')}
                  onNavigateToCrm={() => setGeneralTab('crm')}
                />
              )}
              {generalTab === 'queue' && (
                <QueueScheduling
                  onStartConsultation={(token) => {
                    setGeneralTab('patients');
                  }}
                />
              )}
              {generalTab === 'billing-pharmacy' && <PharmacyBillingERP />}
              {generalTab === 'crm' && <CrmEngagement />}
            </>
          ) : (
            <>
              {dentalTab === 'dashboard' && (
                <DentalDashboard
                  onNavigateToChart={() => setDentalTab('dental-chart')}
                  onNavigateToOperatory={() => setDentalTab('operatory-queue')}
                  onNavigateToLabPOS={() => setDentalTab('dental-material-pos')}
                  onOpenExaminationModal={() => setExaminationModalOpen(true)}
                />
              )}
              {dentalTab === 'dental-chart' && (
                <DentalChartEHR
                  onOpenExaminationModal={() => setExaminationModalOpen(true)}
                  onOpenScheduleOperatory={() => setDentalTab('operatory-queue')}
                />
              )}
              {dentalTab === 'operatory-queue' && (
                <DentalOperatoryQueue
                  onOpenExaminationModal={() => setExaminationModalOpen(true)}
                  onNavigateToChart={() => setDentalTab('dental-chart')}
                />
              )}
              {dentalTab === 'dental-material-pos' && (
                <DentalLabMaterialPOS
                  onOpenExaminationModal={() => setExaminationModalOpen(true)}
                />
              )}
              {dentalTab === 'dental-crm' && <DentalCrmRecall />}
            </>
          )}
        </main>
      </div>

      {/* Global Real-Time Footer Status Bar */}
      <Footer
        mode={mode}
        activePatientName={activePatient.name}
        activePatientUhid={activePatient.uhid}
        activeRoom={
          mode === 'general' ? activePatient.activeOpdRoom : 'Operatory 2 (A-dec 500)'
        }
      />

      {/* Universal Patient Search Modal (Ctrl+K) */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectPatient={handlePatientSelect}
      />

      {/* Add New Dental Examination Modal (16 Upper + 16 Lower Teeth) */}
      <AddDentalExaminationModal
        isOpen={examinationModalOpen}
        onClose={() => setExaminationModalOpen(false)}
        onSave={(data) => {
          console.log('Saved Dental Examination:', data);
        }}
      />
    </div>
  );
}
