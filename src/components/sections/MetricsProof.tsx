import React, { useState } from 'react';
import { BONTES_CASE_STUDIES } from '../../data/mockData';
import { CheckCircle2, ChevronRight, ArrowRight } from 'lucide-react';

interface MetricsProofProps {
  onOpenForm: () => void;
}

export const MetricsProof: React.FC<MetricsProofProps> = ({ onOpenForm }) => {
  const [activeCaseIndex, setActiveCaseIndex] = useState<number>(0);
  const currentCase = BONTES_CASE_STUDIES[activeCaseIndex];

  return (
    <section id="casos" className="py-12 sm:py-16 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] font-heading tracking-tight">
            Resultados Tangibles en Protección de Flujo de Caja
          </h2>
          <p className="text-xs sm:text-sm text-[#475569]">
            Más de 100 proyectos de alta complejidad respaldados en Chile. Conozca cómo hemos eximido multas e impulsado el pago de mayores gastos generales.
          </p>
        </div>

        {/* Case Studies Interactive Showcase */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Case Navigation Tabs (4 cols) */}
          <div className="lg:col-span-4 space-y-3 flex flex-col justify-center">
            {BONTES_CASE_STUDIES.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveCaseIndex(idx)}
                className={`w-full p-4 sm:p-5 rounded-2xl text-left transition-all border flex flex-col justify-between cursor-pointer ${
                  activeCaseIndex === idx
                    ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-lg scale-[1.02]'
                    : 'bg-white text-[#0F172A] border-[#E2E8F0] hover:border-[#CBD5E1]'
                }`}
              >
                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded ${
                    activeCaseIndex === idx
                      ? 'bg-[#C5A880]/20 text-[#D4B992]'
                      : 'bg-[#F1F5F9] text-[#64748B]'
                  }`}>
                    {item.clientCategory}
                  </span>
                  <h3 className={`text-sm font-bold font-heading mt-2 ${activeCaseIndex === idx ? 'text-white' : 'text-[#0F172A]'}`}>
                    {item.title}
                  </h3>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs font-mono pt-2 border-t border-white/10">
                  <span className={activeCaseIndex === idx ? 'text-[#D4B992]' : 'text-[#9B7E54]'}>
                    {item.recoveredAmount}
                  </span>
                  <ChevronRight className={`w-4 h-4 ${activeCaseIndex === idx ? 'text-[#C5A880]' : 'text-[#94A3B8]'}`} />
                </div>
              </button>
            ))}
          </div>

          {/* Active Case Study Detail Card (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E2E8F0] shadow-xl flex flex-col justify-between overflow-hidden">
            <div>
              {/* Project High Resolution Banner */}
              {currentCase.imageUrl && (
                <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-900">
                  <img
                    key={currentCase.id}
                    src={currentCase.imageUrl}
                    alt={currentCase.title}
                    className="w-full h-full object-cover animate-fade-in transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-[#C5A880] text-[#0F172A] inline-block mb-1.5 shadow">
                      {currentCase.clientCategory}
                    </span>
                    <h3 className="text-base sm:text-xl font-bold font-heading leading-tight drop-shadow-md">
                      {currentCase.title}
                    </h3>
                  </div>
                </div>
              )}

              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2E8F0] pb-4">
                  <div>
                    <span className="text-xs font-bold uppercase text-[#9B7E54]">Categoría de Conflicto:</span>
                    <h4 className="text-base font-bold text-[#0F172A]">{currentCase.conflictType}</h4>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-mono text-xs font-bold border border-emerald-200">
                    {currentCase.recoveredAmount}
                  </span>
                </div>

                {/* Grid Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                    <span className="text-[10px] uppercase font-bold text-[#64748B] block">Monto en Disputa</span>
                    <span className="text-sm font-bold text-[#0F172A] font-mono">{currentCase.amountInDispute}</span>
                  </div>
                  <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                    <span className="text-[10px] uppercase font-bold text-[#64748B] block">Duración Proceso</span>
                    <span className="text-sm font-bold text-[#0F172A]">{currentCase.timeframe}</span>
                  </div>
                  <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] col-span-2 sm:col-span-1">
                    <span className="text-[10px] uppercase font-bold text-[#64748B] block">Metodología Aplicada</span>
                    <span className="text-xs font-bold text-[#9B7E54]">{currentCase.methodology}</span>
                  </div>
                </div>

                {/* Summary text */}
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  {currentCase.summary}
                </p>

                {/* Outcomes Bullet List */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold uppercase text-[#0F172A]">Resultados Clave Obtenidos:</span>
                  <div className="space-y-1.5">
                    {currentCase.keyOutcomes.map((outcome, i) => (
                      <div key={i} className="text-xs sm:text-sm text-[#0F172A] font-medium flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 pt-0 flex justify-end">
              <button
                onClick={onOpenForm}
                className="py-3 px-6 rounded-xl gold-gradient text-[#0F172A] font-bold text-xs sm:text-sm hover:brightness-105 transition-all shadow-md flex items-center gap-2 cursor-pointer mt-4"
              >
                <span>Evaluar Caso Similar en Mi Empresa</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
