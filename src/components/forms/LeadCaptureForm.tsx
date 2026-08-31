import React, { useState, useEffect } from 'react';
import { LeadDocument, CalculatorMetrics } from '../../types';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Building2,
  User,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  Briefcase,
  Clock,
  ShieldAlert,
  Scale,
  FileCheck2
} from 'lucide-react';
import { db } from '../../firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import emailjs from '@emailjs/browser';

interface LeadCaptureFormProps {
  prefilledMetrics?: CalculatorMetrics | null;
  onSuccess?: () => void;
}

interface ConflictOption {
  id: LeadDocument['claimCategory'];
  title: string;
  subtitle: string;
  icon: React.ElementType;
  badge?: string;
}

const CONFLICT_OPTIONS: ConflictOption[] = [
  {
    id: 'aumento_obra_no_pagado',
    title: 'Obras Adicionales no Pagadas',
    subtitle: 'Cobro de mayores gastos generales y cambios de alcance ($20M - $30M+).',
    icon: Briefcase,
    badge: 'Alta Demanda'
  },
  {
    id: 'multas_atraso',
    title: 'Multas por Atrasos de la ITO',
    subtitle: 'Interferencias no imputables y atrasos atribuibles al mandante.',
    icon: Clock
  },
  {
    id: 'liquidacion_contrato',
    title: 'Riesgo de Boleta de Garantía',
    subtitle: 'Amenaza de cobro indebido o liquidación unilateral de obra.',
    icon: ShieldAlert
  },
  {
    id: 'peritaje_judicial',
    title: 'Peritaje / Arbitraje Contractual',
    subtitle: 'Informe forense bajo Protocolo SCL para panel técnico o juicio.',
    icon: Scale
  }
];

export const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({
  prefilledMetrics,
  onSuccess
}) => {
  const [step, setStep] = useState<1 | 2>(prefilledMetrics ? 2 : 1);
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    claimCategory: (prefilledMetrics ? 'aumento_obra_no_pagado' : 'aumento_obra_no_pagado') as LeadDocument['claimCategory'],
    description: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [assignedSpecialist, setAssignedSpecialist] = useState<string>('Especialista Senior en Ruta Crítica & Protocolo SCL');

  // Si se inyectan métricas posteriormente, pasar directo a paso 2
  useEffect(() => {
    if (prefilledMetrics) {
      setStep(2);
    }
  }, [prefilledMetrics]);

  const handleSelectCategory = (categoryId: LeadDocument['claimCategory']) => {
    setFormData(prev => ({ ...prev, claimCategory: categoryId }));
    setErrorMsg(null);
    setStep(2);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.contactName || !formData.phone) {
      setErrorMsg('Por favor ingresa tu nombre y teléfono WhatsApp (*).');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    const claimCategoryLabels: Record<string, string> = {
      multas_atraso: 'Impugnación de Multas por Atraso No Imputable',
      aumento_obra_no_pagado: 'Cobro de Mayores Gastos Generales y Aumentos de Obra',
      liquidacion_contrato: 'Liquidación de Contrato & Rescate de Boletas',
      peritaje_judicial: 'Peritaje Técnico para Arbitraje / Tribunal',
      asesoria_preventiva: 'Asesoría Contractual Preventiva de Licitación u Obra'
    };

    const specialist = formData.claimCategory === 'peritaje_judicial' || formData.claimCategory === 'liquidacion_contrato'
      ? 'Especialista Legal Contractual & Claims'
      : 'Especialista Senior en Ruta Crítica & Protocolo SCL';
    setAssignedSpecialist(specialist);

    let detallesDiagnostico = `FORMULARIO RÁPIDO 2 PASOS:\n`;
    detallesDiagnostico += `Contacto: ${formData.contactName}\n`;
    detallesDiagnostico += `Teléfono WhatsApp: ${formData.phone}\n`;
    detallesDiagnostico += `Empresa: ${formData.companyName || 'No especificada (Contacto directo)'}\n`;
    if (formData.email) detallesDiagnostico += `Email: ${formData.email}\n`;
    detallesDiagnostico += `Motivo Principal: ${claimCategoryLabels[formData.claimCategory] || formData.claimCategory}\n`;

    if (prefilledMetrics) {
      detallesDiagnostico += `\nMÉTRICAS DE LA CALCULADORA:\n`;
      detallesDiagnostico += `- Monto Proyecto: $${(prefilledMetrics.projectAmountCLP / 1000000).toFixed(1)}M CLP\n`;
      detallesDiagnostico += `- Días de Atraso: ${prefilledMetrics.delayDays} días\n`;
      detallesDiagnostico += `- GG Diarios: $${(prefilledMetrics.dailyGGCLP / 1000).toFixed(0)}K CLP/día\n`;
      detallesDiagnostico += `- Multas Mitigadas (90%): ${formatCLP(prefilledMetrics.calculatedMitigationCLP)} CLP\n`;
      detallesDiagnostico += `- GG Reclamables (SCL): ${formatCLP(prefilledMetrics.calculatedClaimableGGCLP)} CLP\n`;
      detallesDiagnostico += `- Total Protegido: ${formatCLP(prefilledMetrics.totalProtectedCLP)} CLP (~${prefilledMetrics.totalProtectedUF.toLocaleString('es-CL')} UF)\n`;
    }

    const ahora = new Date();
    const timestampId = ahora.getFullYear().toString() +
      (ahora.getMonth() + 1).toString().padStart(2, '0') +
      ahora.getDate().toString().padStart(2, '0') + "_" +
      ahora.getHours().toString().padStart(2, '0') +
      ahora.getMinutes().toString().padStart(2, '0') + "_" +
      ahora.getSeconds().toString().padStart(2, '0');
    const customId = `DIAGNOSTICO_${timestampId}`;

    try {
      // 1. Guardar en Firestore
      if (db) {
        await setDoc(doc(db, "mensajes_contacto", customId), {
          nombre: formData.contactName,
          telefono: formData.phone,
          email: formData.email || 'No proporcionado',
          proyecto: formData.companyName || 'Contacto Rápido Web',
          detalles: detallesDiagnostico,
          diagnostico: {
            necesidad: claimCategoryLabels[formData.claimCategory] || formData.claimCategory,
            magnitud: prefilledMetrics ? `${formatCLP(prefilledMetrics.totalProtectedCLP)} CLP` : 'No especificada',
            fuente: 'Landing Page V2 (Baja Fricción)'
          },
          estado: 'nuevo',
          created_at: serverTimestamp()
        });
      }

      // 2. Enviar por EmailJS si está configurado
      try {
        const pubKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

        if (pubKey && serviceId && templateId) {
          emailjs.init(pubKey);
          await emailjs.send(serviceId, templateId, {
            nombre: formData.contactName,
            telefono: formData.phone,
            email: formData.email || 'contacto@bontes.cl',
            proyecto: formData.companyName || 'Lead Web',
            detalles: detallesDiagnostico,
            to_email: "contacto@bontes.cl"
          });
        }
      } catch (emailError) {
        console.warn("EmailJS omitido:", emailError);
      }

      setSubmitted(true);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      console.error('Error al guardar solicitud:', err);
      setErrorMsg('Ocurrió un error al enviar. Por favor intente nuevamente o escríbanos por WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const formatCLP = (val: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0
    }).format(val);
  };

  const selectedCategoryObj = CONFLICT_OPTIONS.find(c => c.id === formData.claimCategory);

  // Pantalla de Confirmación de Éxito
  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-6 sm:p-8 text-center space-y-6 animate-in fade-in zoom-in duration-300">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            Solicitud Recibida con Éxito
          </span>
          <h3 className="text-2xl font-bold font-heading text-[#0F172A] mt-2">
            Evaluación Técnica Asignada
          </h3>
          <p className="text-sm text-[#475569] max-w-md mx-auto mt-1">
            Un perito de ruta crítica de Bontes.cl revisará tu caso en menos de 24-48 horas hábiles:
          </p>
        </div>

        {/* Specialist Card */}
        <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-left max-w-md mx-auto flex items-center gap-4">
          <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center text-[#0F172A] font-bold font-heading text-lg shrink-0">
            SB
          </div>
          <div>
            <div className="text-xs text-[#9B7E54] font-bold uppercase">Perito Asignado</div>
            <div className="text-sm font-bold text-[#0F172A]">{assignedSpecialist}</div>
            <div className="text-xs text-[#64748B]">Tiempo de respuesta estimado: &lt; 24h</div>
          </div>
        </div>

        <div className="pt-2 flex flex-col gap-3 justify-center">
          <a
            href={`https://wa.me/56948030737?text=${encodeURIComponent(
              `Hola Bontes, envié una solicitud de diagnóstico técnico para ${formData.companyName || formData.contactName} (${selectedCategoryObj?.title || 'Contrato'}). Quisiera agilizar la revisión.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
          >
            <MessageSquare className="w-5 h-5" /> Iniciar Conversación Inmediata en WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Metric Callout Badge if prefilled */}
      {prefilledMetrics && (
        <div className="p-3.5 rounded-xl bg-[#0F172A] text-white flex items-center justify-between border border-[#C5A880]/30 shadow-sm">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C5A880] shrink-0" />
            <div>
              <div className="text-[10px] text-[#D4B992] font-bold uppercase tracking-wider">Cálculo de Calculadora Vinculado</div>
              <div className="text-sm font-bold font-mono text-[#EAB308]">
                {formatCLP(prefilledMetrics.totalProtectedCLP)} CLP a Rescatar
              </div>
            </div>
          </div>
          <span className="text-xs bg-[#C5A880]/20 text-[#D4B992] px-2.5 py-1 rounded-full font-bold">
            {prefilledMetrics.delayDays} Días
          </span>
        </div>
      )}

      {/* Barra de Progreso de 2 Pasos */}
      <div className="flex items-center justify-between px-1 pb-1 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2">
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
            step === 1 ? 'bg-[#0F172A] text-white' : 'bg-emerald-600 text-white'
          }`}>
            {step === 2 ? '✓' : '1'}
          </span>
          <span className={`text-xs font-bold ${step === 1 ? 'text-[#0F172A]' : 'text-[#64748B]'}`}>
            1. Situación de Obra
          </span>
        </div>
        <div className="h-[2px] w-8 bg-[#CBD5E1]" />
        <div className="flex items-center gap-2">
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
            step === 2 ? 'bg-[#0F172A] text-white' : 'bg-[#E2E8F0] text-[#64748B]'
          }`}>
            2
          </span>
          <span className={`text-xs font-bold ${step === 2 ? 'text-[#0F172A]' : 'text-[#64748B]'}`}>
            2. Contacto Confidencial
          </span>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PASO 1: SELECCIÓN RÁPIDA DE 1 TOQUE (0 FRICCIÓN) */}
      {/* ========================================================================= */}
      {step === 1 && (
        <div className="space-y-3 animate-in fade-in duration-200">
          <div className="text-left pb-1">
            <h4 className="text-sm font-bold text-[#0F172A]">
              ¿Cuál es la situación principal en tu proyecto o contrato?
            </h4>
            <p className="text-xs text-[#64748B]">
              Selecciona una opción con 1 toque para adaptar el análisis pericial:
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {CONFLICT_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              const isSelected = formData.claimCategory === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelectCategory(opt.id)}
                  className={`w-full p-3.5 rounded-xl text-left border transition-all cursor-pointer flex items-center gap-3 group relative ${
                    isSelected
                      ? 'border-[#EAB308] bg-[#FEFCE8] shadow-sm ring-2 ring-[#EAB308]/20'
                      : 'border-[#CBD5E1] bg-white hover:border-[#0F172A] hover:bg-[#F8FAFC]'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-[#EAB308] text-[#0F172A]'
                      : 'bg-[#F1F5F9] text-[#0F172A] group-hover:bg-[#0F172A] group-hover:text-white'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#0F172A] leading-tight">
                        {opt.title}
                      </span>
                      {opt.badge && (
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#EAB308]/20 text-[#854D0E]">
                          {opt.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#64748B] mt-0.5 line-clamp-1">
                      {opt.subtitle}
                    </p>
                  </div>

                  <ArrowRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#0F172A] group-hover:translate-x-0.5 transition-all shrink-0" />
                </button>
              );
            })}
          </div>

          <p className="text-[11px] text-center text-[#64748B] pt-2 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
            Respaldo metodológico bajo estándar mundial Protocolo SCL.
          </p>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PASO 2: DATOS MÍNIMOS DE CONTACTO (RÁPIDO Y PRECISO) */}
      {/* ========================================================================= */}
      {step === 2 && (
        <form onSubmit={handleSubmit} className="space-y-3.5 animate-in fade-in duration-200">
          {/* Motivo seleccionado (Chip con opción de cambiar) */}
          <div className="p-2.5 rounded-lg bg-[#F1F5F9] border border-[#E2E8F0] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-[#0F172A] font-semibold truncate">
              <FileCheck2 className="w-4 h-4 text-[#EAB308] shrink-0" />
              <span className="truncate">Motivo: <strong>{selectedCategoryObj?.title}</strong></span>
            </div>
            {!prefilledMetrics && (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-[#9B7E54] hover:text-[#0F172A] font-bold underline shrink-0 ml-2 cursor-pointer text-[11px]"
              >
                Cambiar
              </button>
            )}
          </div>

          {/* Nombre */}
          <div>
            <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-[#C5A880]" /> Nombre y Apellido *
            </label>
            <input
              type="text"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              placeholder="Ej: Carlos San Martín"
              required
              autoFocus
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] focus:border-[#0F172A] focus:ring-2 focus:ring-[#0F172A]/10 text-sm text-[#0F172A] outline-none transition-all bg-[#F8FAFC]"
            />
          </div>

          {/* WhatsApp / Teléfono */}
          <div>
            <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-[#C5A880]" /> Teléfono WhatsApp (Para enviar diagnóstico) *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+56 9 4803 0737"
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] focus:border-[#0F172A] focus:ring-2 focus:ring-[#0F172A]/10 text-sm text-[#0F172A] outline-none transition-all bg-[#F8FAFC]"
            />
          </div>

          {/* Empresa / Cargo (Fila compacta) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-[#94A3B8]" /> Empresa / Constructora
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Ej: Constructora Valko"
                className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] focus:border-[#0F172A] focus:ring-2 focus:ring-[#0F172A]/10 text-xs text-[#0F172A] outline-none transition-all bg-[#F8FAFC]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-[#94A3B8]" /> Email (Opcional)
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="carlos@constructora.cl"
                className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] focus:border-[#0F172A] focus:ring-2 focus:ring-[#0F172A]/10 text-xs text-[#0F172A] outline-none transition-all bg-[#F8FAFC]"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 rounded-xl gold-gradient text-[#0F172A] font-bold text-sm sm:text-base hover:brightness-105 active:scale-[0.99] transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-[#0F172A] border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Solicitar Diagnóstico Confidencial en 48h</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-between mt-2.5 px-1">
              {!prefilledMetrics && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-[#64748B] hover:text-[#0F172A] flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Volver al paso 1
                </button>
              )}
              <p className="text-[11px] text-[#64748B] flex items-center gap-1 ml-auto">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                Confidencialidad amparada bajo secreto profesional.
              </p>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
