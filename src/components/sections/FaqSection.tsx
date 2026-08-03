import React, { useState } from 'react';
import { BONTES_FAQS } from '../../data/mockData';
import { HelpCircle, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

interface FaqSectionProps {
  onOpenForm: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenForm }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-12 sm:py-16 bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] font-heading tracking-tight">
            Respuestas Clave en Ingeniería Contractual & Claims
          </h2>
          <p className="text-xs sm:text-sm text-[#475569]">
            Aclare sus dudas respecto a normativas MOP, arbitrajes de construcción y la aplicación del Protocolo SCL.
          </p>
        </div>

        {/* Accordion List */}
        <div className="mt-8 space-y-3">
          {BONTES_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden transition-all ${
                  idx >= 3 ? 'hidden md:block' : 'block'
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left font-bold text-[#0F172A] flex items-center justify-between gap-4 hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-heading">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-[#F1F5F9] flex items-center justify-center shrink-0 text-[#0F172A] transition-transform ${isOpen ? 'rotate-180 bg-[#0F172A] text-white' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 text-xs sm:text-sm text-[#475569] leading-relaxed border-t border-[#F1F5F9] pt-4 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center p-6 bg-white rounded-2xl border border-[#CBD5E1] shadow-md space-y-3">
          <h3 className="text-lg font-bold text-[#0F172A] font-heading">
            ¿Su inquietud específica no aparece en la lista?
          </h3>
          <p className="text-xs sm:text-sm text-[#475569]">
            Nuestros peritos realizan evaluaciones preliminares de contratos y carpetas de obra en menos de 48 horas.
          </p>
          <button
            onClick={onOpenForm}
            className="py-3 px-6 rounded-xl gold-gradient text-[#0F172A] font-bold text-xs sm:text-sm hover:brightness-105 transition-all shadow-md inline-flex items-center gap-2 cursor-pointer mt-1"
          >
            <span>Consultar con un Especialista</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
