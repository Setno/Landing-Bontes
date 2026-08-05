import React, { useState } from 'react';
import { AlertTriangle, TrendingDown, ShieldAlert, ArrowRight, DollarSign, Clock, FileWarning, Scale, CheckCircle2 } from 'lucide-react';

interface PainPointsProps {
  onOpenForm: () => void;
  onScrollToCalculator: () => void;
}

export const PainPoints: React.FC<PainPointsProps> = ({ onOpenForm, onScrollToCalculator }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const painScenarios = [
    {
      title: 'Multas por Atrasos No Imputables (Liquidated Damages)',
      icon: Clock,
      question: '¿Su mandante le pretende aplicar multas diarias por retrasos causados por entregas tardías de terreno, RFI sin responder o interferencias de terceros?',
      problem: 'Las Inspecciones Fiscales (IF) o Mandantes Privados aplican descuentos automáticos en los estados de pago mensuales sin considerar la ruta crítica real.',
      impact: 'Pérdida inmediata de liquidez, retención indebida de utilidades y daño al historial de cumplimiento de la constructora.',
      solution: 'Reconstrucción forense del programa Gantt As-Built (Protocolo SCL). Aislamos cada evento disruptivo y demostramos que la ruta crítica estuvo bloqueada por el mandante.'
    },
    {
      title: 'Aumentos de Obra & Gastos Generales No Pagados',
      icon: TrendingDown,
      question: '¿Ha tenido que mantener su infraestructura y personal en faena por más tiempo del contractual sin recibir compensación por mayor permanencia?',
      problem: 'Modificaciones de proyecto ejecutadas bajo "órdenes de palabra" o resoluciones tardías que obligan a extender el plazo de obra a costo de la constructora.',
      impact: 'Devoramiento del margen de utilidad por acumulación de gastos generales fijos (arriendos de maquinaria, supervisión, seguros y garantías).',
      solution: 'Cuantificación matemática exacta del costo diario de permanencia directos e indirectos, formulando la reclamación de mayores gastos generales.'
    },
    {
      title: 'Parálisis por Cobro de Boletas de Garantía',
      icon: FileWarning,
      question: '¿Se encuentra amenazado por el cobro intempestivo de boletas de fiel cumplimiento o retenciones de avance?',
      problem: 'Mandantes intransigentes que amenazan con ejecutar garantías bancarias al finalizar o rescindir un contrato en disputa.',
      impact: 'Afectación grave de las líneas de crédito bancarias de la empresa constructora y parálisis operativa en otros proyectos.',
      solution: 'Medidas cautelares y prejudiciales preventivas ante tribunales + dossier de subsanación técnica para congelar la ejecución de garantías.'
    },
    {
      title: 'Asimetría de Poder con Grandes Mandantes y el Estado',
      icon: Scale,
      question: '¿Siente que la Inspección Fiscal del MOP / SERVIU o la gran minera impone condiciones unilaterales que su empresa no puede rebatir solo con abogados?',
      problem: 'La abogacía tradicional sin conocimiento de ingeniería de rutas críticas falla al intentar discutir aspectos técnicos de avance en obra.',
      impact: 'Falta de respaldo probatorio sólido en las mesas de negociación o ante la Contraloría General de la República (CGR).',
      solution: 'Equipo multidisciplinario (Ingenieros Civiles expertos en Primavera P6 + Abogados de la Construcción) que nivelan la mesa de negociación.'
    }
  ];

  return (
    <section id="dolores" className="py-10 sm:py-16 bg-white border-y border-[#E2E8F0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-heading tracking-tight">
            ¿Reconoce estos puntos de dolor financiero en sus proyectos de construcción?
          </h2>
          <p className="text-xs sm:text-sm text-[#475569]">
            En la industria de la edificación y las obras civiles en Chile, la mayoría de las pérdidas de utilidad no ocurren por errores de faena, sino por una <strong className="text-[#0F172A]">gestión defensiva ineficaz de los contratos</strong>.
          </p>
        </div>

        {/* Interactive Pain Grid Selector */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Navigation Buttons (4 cols) */}
          <div className="lg:col-span-4 space-y-2.5">
            {painScenarios.map((scenario, index) => {
              const IconComp = scenario.icon;
              const isActive = activeTab === index;
              return (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`w-full p-3.5 sm:p-4.5 rounded-xl text-left transition-all border flex items-start gap-3 cursor-pointer ${
                    isActive
                      ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-md'
                      : 'bg-[#F8FAFC] text-[#0F172A] border-[#E2E8F0] hover:border-[#CBD5E1] hover:bg-white'
                  }`}
                >
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0 ${
                      isActive ? 'gold-gradient text-[#0F172A]' : 'bg-[#E2E8F0] text-[#475569]'
                    }`}
                  >
                    <IconComp className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h3 className={`text-xs sm:text-sm font-bold font-heading ${isActive ? 'text-white' : 'text-[#0F172A]'}`}>
                      {scenario.title}
                    </h3>
                    <p className={`text-[11px] sm:text-xs mt-0.5 line-clamp-1 ${isActive ? 'text-slate-300' : 'text-[#64748B]'}`}>
                      {scenario.question}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Breakdown Card (8 cols) */}
          <div className="lg:col-span-8 bg-[#F8FAFC] rounded-2xl p-5 sm:p-8 border border-[#CBD5E1] shadow-lg space-y-5 relative">
            <div className="border-b border-[#E2E8F0] pb-3">
              <h3 className="text-sm sm:text-base font-bold text-[#0F172A]">
                {painScenarios[activeTab].title}
              </h3>
            </div>

            {/* Question Callout */}
            <div className="p-4 rounded-xl bg-white border border-[#CBD5E1] shadow-sm">
              <p className="text-base font-bold text-[#0F172A] italic">
                "{painScenarios[activeTab].question}"
              </p>
            </div>

            {/* PAS Split: Problema vs Impacto vs Solución */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Problema */}
              <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] space-y-2">
                <div className="text-xs font-bold uppercase text-rose-700 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" /> 1. El Problema
                </div>
                <p className="text-xs text-[#475569] leading-relaxed">
                  {painScenarios[activeTab].problem}
                </p>
              </div>

              {/* Impacto / Agitación */}
              <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] space-y-2">
                <div className="text-xs font-bold uppercase text-amber-700 flex items-center gap-1.5">
                  <TrendingDown className="w-4 h-4" /> 2. Impacto Financiero
                </div>
                <p className="text-xs text-[#475569] leading-relaxed">
                  {painScenarios[activeTab].impact}
                </p>
              </div>

              {/* Solución Bontes */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white border border-[#C5A880]/30 space-y-2">
                <div className="text-xs font-bold uppercase text-[#D4B992] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A880]" /> 3. Solución Bontes
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {painScenarios[activeTab].solution}
                </p>
              </div>
            </div>

            {/* Action buttons inside card */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E2E8F0]">
              <span className="text-xs text-[#64748B]">
                ¿Su proyecto actual padece este conflicto?
              </span>
              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  onClick={onScrollToCalculator}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white hover:bg-[#F1F5F9] text-[#0F172A] text-xs font-bold border border-[#CBD5E1] transition-all flex items-center justify-center gap-1.5"
                >
                  <DollarSign className="w-4 h-4 text-[#C5A880]" />
                  <span>Simular Reclamación</span>
                </button>

                <button
                  onClick={onOpenForm}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl gold-gradient text-[#0F172A] text-xs font-bold hover:brightness-105 transition-all shadow-md flex items-center justify-center gap-1.5"
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>Evaluar Mi Caso Ahora</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
