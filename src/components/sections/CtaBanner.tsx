import React from 'react';
import { ShieldCheck, ArrowRight, MessageSquare, Phone } from 'lucide-react';

interface CtaBannerProps {
  onOpenForm: () => void;
  onScrollToCalculator: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOpenForm, onScrollToCalculator }) => {
  return (
    <section className="py-16 bg-[#0F172A] text-white relative overflow-hidden border-t border-[#C5A880]/30">
      {/* Background Decorative Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A]" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A880]/20 text-[#D4B992] text-xs font-bold tracking-wider uppercase border border-[#C5A880]/30">
          <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
          <span>Protección de Flujo de Caja Inmediata</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight text-white max-w-4xl mx-auto">
          No arriesgue el patrimonio de su constructora por falta de sustento técnico-legal.
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Evalúe su contrato, detenga multas injustificadas y reclame sus mayores gastos generales con la metodología irrefutable del Protocolo SCL.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            onClick={onOpenForm}
            className="w-full sm:w-auto py-4 px-8 rounded-xl gold-gradient text-[#0F172A] font-bold text-sm sm:text-base hover:brightness-105 active:scale-[0.99] transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>Agendar Diagnóstico Técnico Confidencial</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onScrollToCalculator}
            className="w-full sm:w-auto py-4 px-7 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
          >
            <span>Simular Calculadora de Claims</span>
          </button>
        </div>

        <div className="pt-4 flex flex-wrap justify-center items-center gap-6 text-xs text-slate-400">
          <span>Respuesta Personalizada </span>
          <span>•</span>
          <span>Resguardo de Secreto Profesional</span>
          <span>•</span>
          <span>Atención Especializada en Chile</span>
        </div>
      </div>
    </section>
  );
};
