import React from 'react';
import { BontesLogo } from '../common/BontesLogo';
import { MapPin, Phone, Mail, MessageSquare, Shield, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B132B] text-slate-300 pt-16 pb-24 md:pb-12 border-t border-[#1E293B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#1E293B]">

          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <BontesLogo variant="dark" size="lg" />
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mt-3">
              Firma especializada en Ingeniería Contractual, Gestión de Claims y Blindaje Legal-Técnico para constructoras, contratistas y obras civiles en Chile.
            </p>
          </div>

          {/* Quick Nav (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-heading">
              Navegación
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#inicio" className="hover:text-white transition-colors">Inicio</a></li>
              <li><a href="#servicios" className="hover:text-white transition-colors">Servicios</a></li>
              <li><a href="#calculadora" className="hover:text-white transition-colors">Calculadora Claims</a></li>
              <li><a href="#casos" className="hover:text-white transition-colors">Casos de Éxito</a></li>
              <li><a href="#nosotros" className="hover:text-white transition-colors">Nosotros</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Preguntas Frecuentes</a></li>
            </ul>
          </div>

          {/* Specializations (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-heading">
              Especialidades
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>• Reclamaciones MOP (Reglamento DS 75)</li>
              <li>• Delay Analysis As-Built vs. Planned</li>
              <li>• Defensa de Multas & Retenciones</li>
              <li>• Arbitrajes Complejos CAM Santiago</li>
              <li>• Rescate de Boletas de Garantía</li>
              <li>• Asesoría Contractual Preventiva</li>
            </ul>
          </div>

          {/* Offices & Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-heading">
              Oficinas & Contacto
            </h4>

            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-200 block">Santiago</strong>
                </span>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <Mail className="w-4 h-4 text-[#C5A880] shrink-0" />
                <a href="mailto:contacto@bontes.cl" className="hover:text-white transition-colors font-mono">
                  contacto@bontes.cl
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span className="font-mono">+56 2 2987 6543</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Bontes.cl — Ingeniería Contractual & Peritaje Legal-Técnico. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-4">
            <a href="#inicio" className="hover:text-slate-300 transition-colors">Términos de Servicio</a>
            <span>•</span>
            <a href="#inicio" className="hover:text-slate-300 transition-colors">Política de Confidencialidad</a>
          </div>
        </div>

      </div>

      {/* Corporate Status Bar */}
      <div className="mt-8 border-t border-[#1E293B] bg-[#080E21] py-3 px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between text-[10px] font-bold text-[#94A3B8] uppercase tracking-[0.2em] gap-3">
        <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
          <span>SCL Protocol Certified</span>
          <span>•</span>
          <span>Chile | Obras Civiles & Minería</span>
        </div>
        <div className="flex flex-wrap gap-4 justify-center sm:justify-end text-slate-300">
          <span className="hover:text-[#C5A880] transition-colors">Asesoría Preventiva</span>
          <span className="hover:text-[#C5A880] transition-colors">Peritaje Judicial</span>
          <span className="hover:text-[#C5A880] transition-colors">Delay Analysis</span>
        </div>
      </div>
    </footer>
  );
};
