import React from 'react';
import { Calculator, ArrowRight, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenForm: () => void;
  onScrollToCalculator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenForm, onScrollToCalculator }) => {
  return (
    <section id="inicio" className="relative pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden bg-[#F8FAFC]">
      {/* Background Subtle Corporate Architectural Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      {/* Decorative Gold Accent Blob */}
      <div className="absolute top-1/4 right-5 w-96 h-96 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: PRD Copy & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.1] text-[#0F172A] font-heading">
              No permita que un reclamo mal presentado{' '}
              <span className="text-[#C5A880] underline decoration-[#C5A880]/30 decoration-2">
                devore la utilidad
              </span>{' '}
              de su constructora.
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-xl font-normal">
              Protegemos su flujo de caja en <strong className="text-[#0F172A]">gestión de contratos, presupuestos y reclamos contractuales</strong> mediante análisis forense de ruta crítica (<strong className="text-[#0F172A]">SCL Protocol</strong>) y peritajes técnicos en Chile.
            </p>

            {/* Key Metric Indicators */}
            <div className="grid grid-cols-3 gap-6 sm:gap-8 border-t border-[#E2E8F0] pt-6 my-6">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-[#0F172A] font-mono">95%</div>
                <div className="text-[10px] uppercase font-bold text-[#C5A880] tracking-wider mt-0.5">Tasa de Éxito</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-[#0F172A] font-mono">15+</div>
                <div className="text-[10px] uppercase font-bold text-[#C5A880] tracking-wider mt-0.5">Años de Pericia</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-[#0F172A] font-mono">100+</div>
                <div className="text-[10px] uppercase font-bold text-[#C5A880] tracking-wider mt-0.5">Casos Resueltos</div>
              </div>
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                id="btn-hero-evaluar-caso"
                onClick={onOpenForm}
                className="px-8 py-4 bg-[#C5A880] text-[#0F172A] font-bold uppercase text-xs sm:text-sm tracking-widest hover:bg-[#b59870] transition-colors flex items-center justify-center gap-3 cursor-pointer shadow-md"
              >
                <span>Evaluar Mi Caso</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="btn-hero-simular-reclamacion"
                onClick={onScrollToCalculator}
                className="px-8 py-4 bg-white border border-[#E2E8F0] text-[#0F172A] font-bold uppercase text-xs sm:text-sm tracking-widest hover:bg-[#F1F5F9] transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-[#C5A880]" />
                <span>Simular Reclamación</span>
              </button>
            </div>

            {/* Value Guarantees */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#475569]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Gestión y Administración Contractual</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Reclamos & Análisis As-Built (SCL Protocol)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Calculator / Risk Card (5 cols - Hidden on Mobile to shorten scroll) */}
          <div className="hidden lg:block lg:col-span-5 bg-[#0F172A] p-6 sm:p-10 rounded-2xl shadow-2xl relative">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl relative">
              <div className="absolute -top-3 left-6 bg-[#C5A880] px-4 py-1 text-[10px] font-bold text-white uppercase tracking-widest rounded-sm">
                Calculadora de Riesgo
              </div>

              <h2 className="text-xl font-bold font-heading text-[#0F172A] mb-1 pt-2">Diagnóstico de Recuperación</h2>
              <p className="text-xs text-[#64748B] mb-6">Ajuste parámetros para simular la protección de su flujo de caja.</p>

              <div className="space-y-5">
                {/* Simulated Stat Preview 1 */}
                <div className="p-4 bg-[#F8FAFC] border-l-4 border-[#C5A880] rounded-r-lg">
                  <div className="text-[10px] text-[#475569] font-bold uppercase tracking-wider mb-1">Multas Mitigables Estimadas</div>
                  <div className="text-xl font-bold text-[#0F172A] font-mono">8.450 UF (~$325M CLP)</div>
                </div>

                {/* Simulated Stat Preview 2 */}
                <div className="p-4 bg-[#F8FAFC] border-l-4 border-[#0F172A] rounded-r-lg">
                  <div className="text-[10px] text-[#475569] font-bold uppercase tracking-wider mb-1">Gastos Generales Reclamables</div>
                  <div className="text-xl font-bold text-[#0F172A] font-mono">$145.000.000 CLP</div>
                </div>

                <div className="p-3 bg-[#0F172A]/5 border border-[#0F172A]/10 rounded-lg text-xs space-y-1">
                  <div className="flex justify-between font-bold text-[#0F172A]">
                    <span>Metodología Aplicable:</span>
                    <span className="text-[#9B7E54]">SCL Protocol</span>
                  </div>
                  <div className="text-[11px] text-[#64748B]">Window Analysis & Reconstrucción As-Built</div>
                </div>

                <button
                  id="btn-hero-tarjeta-simulador"
                  onClick={onScrollToCalculator}
                  className="w-full py-4 bg-[#0F172A] text-white font-bold uppercase text-xs tracking-widest hover:bg-black transition-colors rounded-lg cursor-pointer flex items-center justify-center gap-2 shadow-md"
                >
                  <Calculator className="w-4 h-4 text-[#C5A880]" />
                  <span>Abrir Simulador Completo</span>
                </button>

                <p className="text-[10px] text-center text-[#94A3B8] leading-tight">
                  Resultados basados en estimaciones tipo y análisis estándar de gastos generales diarios.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
