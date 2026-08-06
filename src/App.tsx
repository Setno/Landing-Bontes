import React, { useState } from 'react';
import { CalculatorMetrics } from './types';
import { Header } from './components/sections/Header';
import { Hero } from './components/sections/Hero';
import { PainPoints } from './components/sections/PainPoints';
import { RoiCalculator } from './components/calculator/RoiCalculator';
import { ServicesGrid } from './components/sections/ServicesGrid';
import { MetricsProof } from './components/sections/MetricsProof';
import { FaqSection } from './components/sections/FaqSection';
import { CtaBanner } from './components/sections/CtaBanner';
import { Footer } from './components/sections/Footer';
import { StickyMobileBar } from './components/sections/StickyMobileBar';
import { ResponsiveDialog } from './components/common/ResponsiveDialog';
import { LeadCaptureForm } from './components/forms/LeadCaptureForm';
import { Calculator } from 'lucide-react';

export default function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedMetrics, setSelectedMetrics] = useState<CalculatorMetrics | null>(null);

  const handleOpenForm = (metrics?: CalculatorMetrics) => {
    if (metrics) {
      setSelectedMetrics(metrics);
    }
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleScrollToCalculator = () => {
    const el = document.getElementById('calculadora');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] selection:bg-[#C5A880]/30 selection:text-[#0F172A]">
      {/* Top Banner Alert Bar */}
      <div className="bg-[#0F172A] text-white py-2 px-4 text-center text-xs font-medium border-b border-[#C5A880]/20 flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#C5A880] animate-pulse shrink-0" />
        <span>
          <strong>Atención Constructoras MOP & Concesiones:</strong> Auditoría de plazos en 48 horas bajo Protocolo SCL.
        </span>
        <button
          onClick={() => handleOpenForm()}
          className="hidden sm:inline-block ml-2 text-[#D4B992] hover:text-white underline font-bold cursor-pointer"
        >
          Agendar Evaluación &rarr;
        </button>
      </div>

      {/* Navigation Header */}
      <Header
        onOpenForm={() => handleOpenForm()}
        onScrollToCalculator={handleScrollToCalculator}
      />

      {/* Main Page Narrative - Streamlined & Compact */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenForm={() => handleOpenForm()}
          onScrollToCalculator={handleScrollToCalculator}
        />

        {/* Agitación del Problema (The Pain Grid - PAS Architecture) */}
        <PainPoints
          onOpenForm={() => handleOpenForm()}
          onScrollToCalculator={handleScrollToCalculator}
        />

        {/* Interactive Funnel Core: ROI & Claims Calculator */}
        <section className="py-10 sm:py-16 bg-[#F1F5F9] border-b border-[#CBD5E1]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] font-heading tracking-tight">
                Cuantifique la Utilidad y Gastos Generales a Proteger
              </h2>
              <p className="text-xs sm:text-sm text-[#475569]">
                Ajuste los valores de su obra para estimar de inmediato el monto que puede eximirse de multas por atraso no imputable y reclamar por mayor permanencia.
              </p>
            </div>

            <RoiCalculator
              onApplyToForm={(metrics) => handleOpenForm(metrics)}
            />
          </div>
        </section>

        {/* Services Showcase */}
        <ServicesGrid
          onOpenForm={() => handleOpenForm()}
        />

        {/* Social Proof, Real Chilean Case Studies */}
        <MetricsProof
          onOpenForm={() => handleOpenForm()}
        />

        {/* Frequently Asked Questions */}
        <FaqSection
          onOpenForm={() => handleOpenForm()}
        />

        {/* Urgency Closing CTA */}
        <CtaBanner
          onOpenForm={() => handleOpenForm()}
          onScrollToCalculator={handleScrollToCalculator}
        />
      </main>

      {/* Institutional Footer */}
      <Footer />

      {/* Mobile Bottom Floating Conversion Bar (< 768px) */}
      <StickyMobileBar
        onOpenForm={() => handleOpenForm()}
        onScrollToCalculator={handleScrollToCalculator}
      />

      {/* Responsive Lead Capture Modal / Mobile Vaul Drawer */}
      <ResponsiveDialog
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        title="Solicitud de Diagnóstico Técnico Confidencial"
        subtitle={
          selectedMetrics
            ? `Valores inyectados desde calculadora (${selectedMetrics.delayDays} días | $${(selectedMetrics.totalProtectedCLP / 1000000).toFixed(1)}M CLP)`
            : 'Un perito de ruta crítica revisará la carpeta de su proyecto en < 48 horas.'
        }
      >
        <LeadCaptureForm
          prefilledMetrics={selectedMetrics}
          onSuccess={() => {
            // Optional callback after submit
          }}
        />
      </ResponsiveDialog>
    </div>
  );
}
