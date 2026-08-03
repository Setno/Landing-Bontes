import React, { useState, useEffect } from 'react';
import { BontesLogo } from '../common/BontesLogo';
import { Phone, MessageSquare, Menu, X, ArrowRight, ShieldCheck, Calculator } from 'lucide-react';

interface HeaderProps {
  onOpenForm: () => void;
  onScrollToCalculator: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenForm, onScrollToCalculator }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Calculadora', href: '#calculadora' },
    { label: 'Casos de Éxito', href: '#casos' },
    { label: 'FAQ', href: '#faq' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-[#E2E8F0]'
          : 'bg-[#F8FAFC]/90 backdrop-blur-sm py-4 border-b border-[#E2E8F0]/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#inicio" className="flex items-center">
          <BontesLogo size="md" />
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-semibold uppercase tracking-widest text-[#475569] hover:text-[#0F172A] transition-colors py-1 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C5A880] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right Action Controls */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onScrollToCalculator}
            className="px-4 py-2 bg-white text-[#0F172A] border border-[#E2E8F0] text-xs font-bold uppercase tracking-wider hover:bg-[#F1F5F9] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Calculator className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Calculadora</span>
          </button>

          <button
            onClick={onOpenForm}
            className="px-6 py-2.5 bg-[#0F172A] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#1e293b] transition-all flex items-center gap-2 cursor-pointer shadow-md"
          >
            <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
            <span>Contacto Directo</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl text-[#0F172A] hover:bg-[#E2E8F0]/50 transition-colors"
          aria-label="Abrir menú"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E2E8F0] shadow-xl px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-semibold text-[#0F172A] hover:bg-[#F1F5F9]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-[#E2E8F0] space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onScrollToCalculator();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-[#0F172A] text-white text-xs font-bold flex items-center justify-center gap-2"
            >
              <Calculator className="w-4 h-4 text-[#C5A880]" />
              <span>Simular Reclamación (Calculadora)</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenForm();
              }}
              className="w-full py-2.5 px-4 rounded-xl gold-gradient text-[#0F172A] text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Agendar Diagnóstico Express</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
