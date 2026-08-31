import React from 'react';
import { BontesLogo } from '../common/BontesLogo';
import { MapPin, Phone, Mail, Instagram, ExternalLink, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B132B] text-slate-300 pt-16 pb-24 md:pb-12 border-t border-[#1E293B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#1E293B]">

          {/* Brand Info & Instagram Card (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <BontesLogo variant="dark" size="lg" />
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Firma especializada en Gestión y Administración de Contratos, Reclamos Contractuales, Presupuestos de Obras y Blindaje Técnico-Legal para constructoras y proyectos de ingeniería en Chile.
            </p>

            {/* Instagram Social Feature Card */}
            <div className="pt-2">
              <a
                href="https://www.instagram.com/bontes.cl/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Perfil de Instagram @bontes.cl"
                className="group block p-3 rounded-xl bg-[#131D38]/80 hover:bg-[#182344] border border-[#C5A880]/30 hover:border-[#C5A880] transition-all duration-300 shadow-md hover:shadow-[#C5A880]/10 max-w-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] p-0.5 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <div className="w-full h-full bg-[#0B132B] rounded-[6px] flex items-center justify-center">
                      <Instagram className="w-4 h-4 text-[#E2E8F0] group-hover:text-white transition-colors" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white group-hover:text-[#D4B992] transition-colors font-mono">
                        @bontes.cl
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#C5A880] group-hover:translate-x-0.5 transition-transform">
                        <span>Ver perfil</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate">
                      Instagram Oficial Bontes Chile
                    </p>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-[#1E293B] text-[10px] text-slate-400 flex items-center justify-between">
                  <span>Casos & Criterios Contractuales</span>
                  <span className="text-[#94A3B8]">#ConstrucciónChile</span>
                </div>
              </a>
            </div>
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
              <li>• Gestión y Administración de Contratos</li>
              <li>• Reclamos Contractuales & Claims (SCL)</li>
              <li>• Presupuestos de Obras & Control de Costos</li>
              <li>• Ampliaciones de Plazo & Gastos Generales</li>
              <li>• Delay Analysis As-Built vs. Planned</li>
              <li>• Peritajes Técnicos e Informes Periciales</li>
              <li>• Rescate y Auditoría de Boletas de Garantía</li>
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
                  <span className="text-[11px] text-slate-400">Cobertura en todo Chile</span>
                </span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Mail className="w-4 h-4 text-[#C5A880] shrink-0" />
                <a href="mailto:contacto@bontes.cl" className="hover:text-white transition-colors font-mono">
                  contacto@bontes.cl
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                <a href="tel:+56948030737" className="hover:text-white transition-colors font-mono">
                  +56 9 4803 0737
                </a>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Instagram className="w-4 h-4 text-[#C5A880] shrink-0" />
                <a
                  href="https://www.instagram.com/bontes.cl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors font-mono"
                >
                  @bontes.cl
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Bontes.cl — Gestión de Contratos, Reclamos Contractuales & Presupuestos de Obras. Todos los derechos reservados.
            <span className="sr-only">Representante Legal / Titular: Sergio Gerardo Bontes Tamayo</span>
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
          <span>Chile | Obras Civiles & Edificación</span>
        </div>
        <div className="flex flex-wrap gap-4 justify-center sm:justify-end text-slate-300">
          <span className="hover:text-[#C5A880] transition-colors">Gestión de Contratos</span>
          <span className="hover:text-[#C5A880] transition-colors">Presupuestos de Obras</span>
          <span className="hover:text-[#C5A880] transition-colors">Reclamos Contractuales</span>
        </div>
      </div>
    </footer>
  );
};
