import React, { useState, useMemo } from 'react';
import { CalculatorMetrics } from '../../types';
import { ShieldAlert, TrendingUp, DollarSign, Calculator, CheckCircle2, ArrowRight, Sparkles, Scale } from 'lucide-react';

interface RoiCalculatorProps {
  onApplyToForm: (metrics: CalculatorMetrics) => void;
}

const UF_VALUE_CLP = 40000; // Value of 1 UF in CLP for estimation

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onApplyToForm }) => {
  // Slider states
  const [projectAmountMillions, setProjectAmountMillions] = useState<number>(1200); // Default 1,200M CLP ($1.2B)
  const [delayDays, setDelayDays] = useState<number>(25); // Default 25 days
  const [dailyGGThousands, setDailyGGThousands] = useState<number>(1800); // Default 1.8M CLP / day
  const [projectType, setProjectType] = useState<string>('mop_vial');

  // Math Calculations Engine
  const metrics = useMemo<CalculatorMetrics>(() => {
    const projectAmountCLP = projectAmountMillions * 1000000;
    const dailyGGCLP = dailyGGThousands * 1000;

    // Liquidated damages / Fine calculation: Standard Chilean contract penalty is 1 per mil (0.1%) per day of delay
    const dailyPenaltyRate = projectType === 'mop_vial' ? 0.001 : 0.0008;
    const estimatedDailyFine = Math.min(projectAmountCLP * dailyPenaltyRate, 12000000); // capped daily fine
    const maxPenaltyCap = projectAmountCLP * 0.10; // Capped at 10% of total contract

    const grossFineCLP = Math.min(estimatedDailyFine * delayDays, maxPenaltyCap);

    // Probability of fine mitigation based on SCL protocol analysis (typically 85% - 95% mitigable)
    const calculatedMitigationCLP = grossFineCLP * 0.90;

    // Claimable Extended Overhead (Gastos Generales por Mayor Permanencia)
    // Formula: Daily GG * Delay Days * 0.85 (Direct & Site Overhead factor)
    const calculatedClaimableGGCLP = dailyGGCLP * delayDays * 0.85;

    // Total Utility Protected
    const totalProtectedCLP = calculatedMitigationCLP + calculatedClaimableGGCLP;
    const totalProtectedUF = Math.round(totalProtectedCLP / UF_VALUE_CLP);

    // Risk Level Assessment
    let riskLevel: 'Crítico' | 'Alto' | 'Moderado' = 'Moderado';
    if (delayDays >= 60 || totalProtectedCLP > 800000000) {
      riskLevel = 'Crítico';
    } else if (delayDays >= 30 || totalProtectedCLP > 300000000) {
      riskLevel = 'Alto';
    }

    return {
      projectAmountCLP,
      delayDays,
      dailyGGCLP,
      projectType,
      calculatedMitigationCLP,
      calculatedClaimableGGCLP,
      totalProtectedCLP,
      totalProtectedUF,
      riskLevel
    };
  }, [projectAmountMillions, delayDays, dailyGGThousands, projectType]);

  const formatCLP = (val: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0
    }).format(val);
  };

  const projectTypeLabels: Record<string, string> = {
    mop_vial: 'Obra Pública MOP / Concesión Vial',
    edificacion: 'Edificación Privada / Comercio',
    serviu: 'Servicios de Vivienda SERVIU (DS 236)',
    mineria: 'Proyecto Minero e Industrial EPCM'
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-[#E2E8F0] overflow-hidden" id="calculadora">
      {/* Header Banner */}
      <div className="relative bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] p-5 sm:p-7 text-white overflow-hidden">
        {/* Engineering Pattern Overlay */}
        <img
          src="/images/hero_engineering_bg.png"
          alt="Engineering pattern overlay"
          className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none mix-blend-luminosity"
        />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
              Calculadora de Claims & Protección de Utilidad
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
              Estime de inmediato las multas por retrasos no imputables que su constructora puede mitigar y los mayores gastos generales a reclamar.
            </p>
          </div>

          <div className="shrink-0 bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/10 text-right">
            <span className="text-xs text-slate-300 uppercase tracking-widest block font-medium">Nivel de Riesgo Contrato</span>
            <span
              className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold uppercase ${metrics.riskLevel === 'Crítico'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                : metrics.riskLevel === 'Alto'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}
            >
              Riesgo {metrics.riskLevel}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#E2E8F0]">
        {/* Sliders Controls Area (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 space-y-7 bg-[#FAFBFD]">
          {/* Tipo de Proyecto */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#475569] mb-2">
              Tipo de Proyecto / Mandante
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {Object.entries(projectTypeLabels).map(([key, label]) => (
                <button
                  key={key}
                  id={`btn-calc-project-${key}`}
                  type="button"
                  onClick={() => setProjectType(key)}
                  className={`p-3 text-left rounded-xl text-xs font-semibold transition-all border ${projectType === key
                    ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-md'
                    : 'bg-white text-[#475569] border-[#E2E8F0] hover:border-[#CBD5E1]'
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Slider 1: Monto del Proyecto */}
          <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#E2E8F0] shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-[#0F172A] flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-[#C5A880]" /> Monto Total del Proyecto / Obra
              </span>
              <span className="text-base font-black text-[#0F172A] font-mono bg-[#F1F5F9] px-2.5 py-1 rounded-lg border border-[#E2E8F0]">
                ${(projectAmountMillions).toFixed(0)}M CLP
              </span>
            </div>
            <input
              type="range"
              id="slider-calc-project-amount"
              min={10}
              max={2000}
              step={10}
              value={projectAmountMillions}
              onChange={(e) => setProjectAmountMillions(Number(e.target.value))}
              className="w-full h-2 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#C5A880]"
            />
            <div className="flex justify-between text-[11px] text-[#64748B] mt-1.5">
              <span>$10M CLP</span>
              <span>$1.000M CLP</span>
              <span>$2.000M+ CLP</span>
            </div>
          </div>

          {/* Slider 2: Días de Atraso en Disputa */}
          <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#E2E8F0] shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-[#0F172A] flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-[#C5A880]" /> Días de Atraso No Imputable (Disputa)
              </span>
              <span className="text-base font-black text-[#0F172A] font-mono bg-[#F1F5F9] px-2.5 py-1 rounded-lg border border-[#E2E8F0]">
                {delayDays} Días
              </span>
            </div>
            <input
              type="range"
              id="slider-calc-delay-days"
              min={10}
              max={180}
              step={5}
              value={delayDays}
              onChange={(e) => setDelayDays(Number(e.target.value))}
              className="w-full h-2 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#C5A880]"
            />
            <div className="flex justify-between text-[11px] text-[#64748B] mt-1.5">
              <span>10 Días</span>
              <span>90 Días</span>
              <span>180+ Días</span>
            </div>
          </div>

          {/* Slider 3: Gastos Generales Diarios */}
          <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#E2E8F0] shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-[#0F172A] flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-[#C5A880]" /> Gastos Generales Diarios Estimados (GG)
              </span>
              <span className="text-base font-black text-[#0F172A] font-mono bg-[#F1F5F9] px-2.5 py-1 rounded-lg border border-[#E2E8F0]">
                ${(dailyGGThousands / 1000).toFixed(2)}M /día
              </span>
            </div>
            <input
              type="range"
              id="slider-calc-daily-overhead"
              min={300}
              max={12000}
              step={100}
              value={dailyGGThousands}
              onChange={(e) => setDailyGGThousands(Number(e.target.value))}
              className="w-full h-2 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#C5A880]"
            />
            <div className="flex justify-between text-[11px] text-[#64748B] mt-1.5">
              <span>$300K /día</span>
              <span>$5M /día</span>
              <span>$12M /día</span>
            </div>
          </div>
        </div>

        {/* Live Calculation Results (5 cols) */}
        <div className="lg:col-span-5 p-6 sm:p-8 bg-[#0F172A] text-white flex flex-col justify-between relative">
          <div className="bg-white text-[#0F172A] p-6 rounded-xl shadow-2xl relative">
            <div className="absolute -top-3 left-6 bg-[#C5A880] px-3 py-0.5 text-[10px] font-bold text-white uppercase tracking-widest rounded-sm">
              Diagnóstico de Recuperación
            </div>

            <h4 className="text-xs font-bold uppercase tracking-wider text-[#64748B] mb-4 pt-1 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C5A880]" /> Estimación Financiera SCL Protocol
            </h4>

            {/* Metrics Display Grid */}
            <div className="space-y-4">
              {/* Mitigación de Multas */}
              <div className="p-4 bg-[#F8FAFC] border-l-4 border-[#C5A880] rounded-r-lg">
                <div className="flex justify-between text-[11px] font-bold uppercase text-[#475569] tracking-wide">
                  <span>Multas Potenciales Mitigables</span>
                  <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold">~90% Eximible</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-[#0F172A] font-mono mt-1">
                  {formatCLP(metrics.calculatedMitigationCLP)}
                </div>
                <div className="text-[10px] text-[#64748B] mt-0.5">
                  Protección contra retenciones de multa por atraso no imputable.
                </div>
              </div>

              {/* Gastos Generales Reclamables */}
              <div className="p-4 bg-[#F8FAFC] border-l-4 border-[#0F172A] rounded-r-lg">
                <div className="flex justify-between text-[11px] font-bold uppercase text-[#475569] tracking-wide">
                  <span>Gastos Generales Reclamables</span>
                  <span className="text-[#9B7E54] bg-[#C5A880]/15 px-1.5 py-0.5 rounded font-bold">SCL Protocol</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-[#0F172A] font-mono mt-1">
                  {formatCLP(metrics.calculatedClaimableGGCLP)}
                </div>
                <div className="text-[10px] text-[#64748B] mt-0.5">
                  Compensación por mayor permanencia en obra y costos fijos de faena.
                </div>
              </div>

              {/* Utilidad Protegida Total Banner */}
              <div className="p-4 rounded-xl bg-[#0F172A] text-white shadow-md border border-[#C5A880]/40">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4B992] block">
                  Total Utilidad a Proteger / Recuperar
                </span>
                <div className="text-2xl sm:text-3xl font-black font-mono text-white mt-1">
                  {formatCLP(metrics.totalProtectedCLP)}
                </div>
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/10 text-xs text-slate-300">
                  <Scale className="w-4 h-4 text-[#C5A880]" />
                  <span>Equivalente estimado: <strong className="text-white font-mono font-bold">~{metrics.totalProtectedUF.toLocaleString('es-CL')} UF</strong></span>
                </div>
              </div>
            </div>

            {/* Action Trigger */}
            <div className="mt-5 pt-4 border-t border-[#E2E8F0]">
              <button
                id="btn-calc-request-peritaje"
                onClick={() => onApplyToForm(metrics)}
                className="w-full py-4 bg-[#0F172A] text-white font-bold uppercase text-xs tracking-widest hover:bg-black transition-colors rounded-lg cursor-pointer flex items-center justify-center gap-2 group shadow-md"
              >
                <span>Congelar y Solicitar Peritaje Express</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#C5A880]" />
              </button>
              <p className="text-[10px] text-center text-[#64748B] mt-2 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Diagnóstico inicial confidencial sin compromiso. Respuesta en menos de 24hrs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
