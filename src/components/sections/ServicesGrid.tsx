import React, { useState } from 'react';
import { BONTES_SERVICES } from '../../data/mockData';
import { ServiceItem } from '../../types';
import { ResponsiveDialog } from '../common/ResponsiveDialog';
import { ClockAlert, ShieldCheck, Gavel, Building2, FileCheck2, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ServicesGridProps {
  onOpenForm: () => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onOpenForm }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ClockAlert': return <ClockAlert className="w-6 h-6 text-[#C5A880]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-[#C5A880]" />;
      case 'Gavel': return <Gavel className="w-6 h-6 text-[#C5A880]" />;
      case 'Building2': return <Building2 className="w-6 h-6 text-[#C5A880]" />;
      case 'FileCheck2': return <FileCheck2 className="w-6 h-6 text-[#C5A880]" />;
      default: return <ShieldCheck className="w-6 h-6 text-[#C5A880]" />;
    }
  };

  return (
    <section id="servicios" className="py-12 sm:py-16 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] font-heading tracking-tight">
            Ingeniería Contractual, Claims & Blindaje Legal-Técnico
          </h2>
          <p className="text-xs sm:text-sm text-[#475569]">
            Soluciones metodológicas irrefutables diseñadas para defender la utilidad y el flujo de caja en proyectos de infraestructura, edificación y minería.
          </p>
        </div>

        {/* Grid Cards (3 cols + 2 cols layout) */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {BONTES_SERVICES.map((service, index) => (
            <div
              key={service.id}
              className={`bg-white rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 overflow-hidden ${index >= 3 ? 'hidden md:flex' : 'flex'
                }`}
            >
              <div>
                {/* Photographic Service Header */}
                {service.imageUrl && (
                  <div className="relative h-40 w-full overflow-hidden bg-slate-900">
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 w-10 h-10 rounded-xl bg-[#0F172A]/90 backdrop-blur-md flex items-center justify-center shadow-md border border-white/10">
                      {getIcon(service.iconName)}
                    </div>
                  </div>
                )}

                <div className="p-5 sm:p-6 space-y-3">
                  {!service.imageUrl && (
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#0F172A] flex items-center justify-center shadow-md mb-2">
                      {getIcon(service.iconName)}
                    </div>
                  )}

                  <h3 className="text-lg sm:text-xl font-bold font-heading text-[#0F172A] group-hover:text-[#9B7E54] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                    {service.shortDesc}
                  </p>

                  {/* Key Deliverables Bullet Preview */}
                  <div className="pt-2 border-t border-[#F1F5F9] space-y-1">
                    {service.deliverables.slice(0, 2).map((del, i) => (
                      <div key={i} className="text-[11px] sm:text-xs text-[#0F172A] flex items-start gap-1.5 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{del}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-5 sm:p-6 pt-0 border-t border-[#E2E8F0] flex items-center justify-between mt-auto">
                <button
                  onClick={() => setSelectedService(service)}
                  className="text-xs font-bold text-[#0F172A] hover:text-[#9B7E54] flex items-center gap-1 transition-colors cursor-pointer mt-4"
                >
                  <span>Ver Alcance Técnico</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={onOpenForm}
                  className="p-2 rounded-lg bg-[#F8FAFC] hover:bg-[#0F172A] hover:text-white text-[#0F172A] transition-colors border border-[#CBD5E1] mt-4"
                  title="Solicitar asesoría en este servicio"
                >
                  <ShieldCheck className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Callout Card for Custom Special Advisory */}
          <div className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] rounded-2xl p-6 sm:p-7 text-white shadow-xl border border-[#C5A880]/40 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl gold-gradient text-[#0F172A] flex items-center justify-center font-bold font-heading text-lg">
                B
              </div>
              <h3 className="text-xl font-bold font-heading text-white">
                ¿Requiere una Estrategia Contractual a Medida?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Evaluamos tu caso.
              </p>
            </div>

            <div className="mt-6">
              <button
                onClick={onOpenForm}
                className="w-full py-3 px-4 rounded-xl gold-gradient text-[#0F172A] font-bold text-xs hover:brightness-105 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Solicitar Auditoría Express</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Service Detail Responsive Modal / Drawer */}
      <ResponsiveDialog
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        title={selectedService?.title}
        subtitle="Alcance Metodológico & Entregables Técnicos"
      >
        {selectedService && (
          <div className="space-y-6">
            <p className="text-sm text-[#475569] leading-relaxed">
              {selectedService.fullDesc}
            </p>

            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#9B7E54]">Impacto en el ROI del ROI:</span>
              <p className="text-sm font-bold text-[#0F172A]">
                {selectedService.roiImpact}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A] mb-3">
                Entregables e Informes Periciales Incluidos:
              </h4>
              <ul className="space-y-2">
                {selectedService.deliverables.map((item, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-[#475569] flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="font-medium text-[#0F172A]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A] mb-2">
                Tipos de Obra Aplicables:
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedService.applicableTo.map((app, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-full bg-[#0F172A]/5 text-[#0F172A] text-xs font-semibold border border-[#0F172A]/10">
                    {app}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E2E8F0] flex gap-3">
              <button
                onClick={() => {
                  setSelectedService(null);
                  onOpenForm();
                }}
                className="w-full py-3.5 px-6 rounded-xl gold-gradient text-[#0F172A] font-bold text-sm hover:brightness-105 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Solicitar este Servicio</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </ResponsiveDialog>
    </section>
  );
};
