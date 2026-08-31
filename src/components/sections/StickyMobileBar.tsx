import React from 'react';
import { ShieldCheck, MessageSquare, Calculator } from 'lucide-react';

interface StickyMobileBarProps {
  onOpenForm: () => void;
  onScrollToCalculator: () => void;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({
  onOpenForm,
  onScrollToCalculator
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0F172A]/95 backdrop-blur-md p-3 border-t border-[#C5A880]/30 shadow-2xl animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center gap-2">
        <button
          onClick={onScrollToCalculator}
          className="p-3 rounded-xl bg-[#1E293B] text-white border border-[#CBD5E1]/20 flex items-center justify-center shrink-0"
          title="Calculadora ROI"
        >
          <Calculator className="w-5 h-5 text-[#C5A880]" />
        </button>

        <button
          onClick={onOpenForm}
          className="flex-1 py-3 px-4 rounded-xl gold-gradient text-[#0F172A] font-bold text-xs uppercase tracking-wider hover:brightness-105 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Agendar Diagnóstico Express</span>
        </button>

        <a
          href="https://wa.me/56948030734?text=Hola%20Bontes,%20quisiera%20agendar%20un%20diagn%C3%B3stico%20expres%20para%20mi%20empresa."
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm"
          title="WhatsApp Directo"
        >
          <MessageSquare className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
};
