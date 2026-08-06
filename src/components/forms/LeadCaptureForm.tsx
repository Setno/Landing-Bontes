import React, { useState } from 'react';
import { LeadDocument, CalculatorMetrics } from '../../types';
import { Send, CheckCircle2, AlertCircle, FileText, Download, Building2, User, Mail, Phone, ShieldCheck, Sparkles, MessageSquare } from 'lucide-react';
import { db } from '../../firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import emailjs from '@emailjs/browser';

interface LeadCaptureFormProps {
  prefilledMetrics?: CalculatorMetrics | null;
  onSuccess?: () => void;
}

export const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({
  prefilledMetrics,
  onSuccess
}) => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    role: '',
    email: '',
    phone: '',
    projectType: prefilledMetrics?.projectType || 'mop_vial',
    claimCategory: 'multas_atraso' as LeadDocument['claimCategory'],
    description: ''
  });

  const [loading, useState] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [assignedSpecialist, setAssignedSpecialist] = useState<string>('Especialista Senior en Ruta Crítica & Protocolo SCL');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.contactName || !formData.email || !formData.phone) {
      setErrorMsg('Por favor complete todos los campos requeridos (*).');
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

    const projectTypeLabels: Record<string, string> = {
      mop_vial: 'Obra Pública MOP / Concesión Vial',
      edificacion: 'Edificación Privada / Comercio',
      serviu: 'Servicios de Vivienda SERVIU (DS 236)',
      mineria: 'Proyecto Minero e Industrial EPCM'
    };

    const specialist = formData.claimCategory === 'peritaje_judicial' || formData.claimCategory === 'liquidacion_contrato'
      ? 'Especialista Legal Contractual & Claims'
      : 'Especialista Senior en Ruta Crítica & Protocolo SCL';
    setAssignedSpecialist(specialist);

    let detallesDiagnostico = `FORMULARIO DE CONTACTO:\n`;
    detallesDiagnostico += `Empresa: ${formData.companyName}\n`;
    detallesDiagnostico += `Contacto: ${formData.contactName}\n`;
    detallesDiagnostico += `Cargo: ${formData.role || 'No especificado'}\n`;
    detallesDiagnostico += `Email: ${formData.email}\n`;
    detallesDiagnostico += `Teléfono: ${formData.phone}\n`;
    detallesDiagnostico += `Categoría de Conflicto: ${claimCategoryLabels[formData.claimCategory] || formData.claimCategory}\n`;
    detallesDiagnostico += `Tipo de Proyecto: ${projectTypeLabels[formData.projectType] || formData.projectType}\n`;

    if (prefilledMetrics) {
      detallesDiagnostico += `\nMÉTRICAS DE LA CALCULADORA:\n`;
      detallesDiagnostico += `- Monto Proyecto: $${(prefilledMetrics.projectAmountCLP / 1000000).toFixed(1)}M CLP\n`;
      detallesDiagnostico += `- Días de Atraso: ${prefilledMetrics.delayDays} días\n`;
      detallesDiagnostico += `- GG Diarios: $${(prefilledMetrics.dailyGGCLP / 1000).toFixed(0)}K CLP/día\n`;
      detallesDiagnostico += `- Multas Mitigadas (90%): ${formatCLP(prefilledMetrics.calculatedMitigationCLP)} CLP\n`;
      detallesDiagnostico += `- GG Reclamables (SCL): ${formatCLP(prefilledMetrics.calculatedClaimableGGCLP)} CLP\n`;
      detallesDiagnostico += `- Total Protegido: ${formatCLP(prefilledMetrics.totalProtectedCLP)} CLP (~${prefilledMetrics.totalProtectedUF.toLocaleString('es-CL')} UF)\n`;
      detallesDiagnostico += `- Nivel de Riesgo: ${prefilledMetrics.riskLevel}\n`;
    }
    
    if (formData.description) {
      detallesDiagnostico += `\nDETALLES ADICIONALES:\n${formData.description.trim()}`;
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
      await setDoc(doc(db, "mensajes_contacto", customId), {
        nombre: formData.contactName,
        email: formData.email,
        telefono: formData.phone,
        proyecto: formData.companyName,
        detalles: detallesDiagnostico,
        diagnostico: {
          perfil: formData.role || 'No especificado',
          industria: projectTypeLabels[formData.projectType] || formData.projectType,
          necesidad: claimCategoryLabels[formData.claimCategory] || formData.claimCategory,
          magnitud: prefilledMetrics ? `${formatCLP(prefilledMetrics.totalProtectedCLP)} CLP` : 'No especificada',
          urgencia: 'No especificada',
          detallesAdicionales: formData.description || ''
        },
        estado: 'nuevo',
        created_at: serverTimestamp()
      });

      // 2. Enviar por EmailJS
      try {
        const pubKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

        if (pubKey && serviceId && templateId) {
          emailjs.init(pubKey);
          await emailjs.send(serviceId, templateId, {
            nombre: formData.contactName,
            email: formData.email,
            telefono: formData.phone,
            proyecto: formData.companyName,
            detalles: detallesDiagnostico,
            to_email: "contacto@bontes.cl"
          });
          console.log("Alerta de correo enviada al equipo exitosamente.");
        } else {
          console.warn("EmailJS omitido: Faltan las claves en el archivo .env");
        }
      } catch (emailError) {
        console.error("Error enviando alerta por correo:", emailError);
      }

      setSubmitted(true);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      console.error('Error al guardar en Firestore:', err);
      setErrorMsg('Ocurrió un error al enviar el formulario. Por favor intente nuevamente.');
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

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-6 sm:p-8 text-center space-y-6">
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
            Hemos registrado su caso y asignado a nuestro especialista de ruta crítica:
          </p>
        </div>

        {/* Specialist Card */}
        <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-left max-w-md mx-auto flex items-center gap-4">
          <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center text-[#0F172A] font-bold font-heading text-lg shrink-0">
            AB
          </div>
          <div>
            <div className="text-xs text-[#9B7E54] font-bold uppercase">Especialista Asignado</div>
            <div className="text-sm font-bold text-[#0F172A]">{assignedSpecialist}</div>
            <div className="text-xs text-[#64748B]">Tiempo de respuesta estimado: &lt; 48 Horas laborables</div>
          </div>
        </div>

        {/* Calculation summary if prefilled */}
        {prefilledMetrics && (
          <div className="p-4 rounded-xl bg-[#0F172A] text-white text-left max-w-md mx-auto space-y-1">
            <div className="text-xs text-[#D4B992] font-semibold uppercase">Resumen de Valores Congelados</div>
            <div className="text-xl font-bold font-mono">
              {formatCLP(prefilledMetrics.totalProtectedCLP)} CLP
            </div>
            <div className="text-xs text-slate-300">
              ({prefilledMetrics.delayDays} días de atraso en disputa | UF ~{prefilledMetrics.totalProtectedUF.toLocaleString('es-CL')})
            </div>
          </div>
        )}

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={`https://wa.me/56967867984?text=${encodeURIComponent(
              `Hola Bontes, envié una solicitud de peritaje para la empresa ${formData.companyName}. Quisiera agilizar la revisión.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-colors"
          >
            <MessageSquare className="w-4 h-4" /> Contacto Directo por WhatsApp
          </a>

          <button
            onClick={() => {
              const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(
                JSON.stringify({ ...formData, metrics: prefilledMetrics }, null, 2)
              )}`;
              const downloadAnchor = document.createElement('a');
              downloadAnchor.setAttribute('href', dataStr);
              downloadAnchor.setAttribute('download', `BONTES_Diagnostico_${formData.companyName || 'Lead'}.json`);
              document.body.appendChild(downloadAnchor);
              downloadAnchor.click();
              downloadAnchor.remove();
            }}
            className="px-6 py-3 rounded-xl bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0F172A] font-bold text-sm border border-[#CBD5E1] flex items-center justify-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4" /> Descargar Ficha de Registro
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Metric Callout Badge if prefilled */}
      {prefilledMetrics && (
        <div className="p-3.5 rounded-xl bg-[#0F172A] text-white flex items-center justify-between border border-[#C5A880]/30 shadow-sm mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C5A880] shrink-0" />
            <div>
              <div className="text-[10px] text-[#D4B992] font-bold uppercase tracking-wider">Valores de Calculadora Inyectados</div>
              <div className="text-sm font-bold font-mono">
                {formatCLP(prefilledMetrics.totalProtectedCLP)} CLP a Proteger
              </div>
            </div>
          </div>
          <span className="text-xs bg-[#C5A880]/20 text-[#D4B992] px-2.5 py-1 rounded-full font-bold">
            {prefilledMetrics.delayDays} Días
          </span>
        </div>
      )}

      {errorMsg && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Nombre Empresa */}
        <div>
          <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1 flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5 text-[#C5A880]" /> Empresa Constructora / Contratista *
          </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Ej: Constructora Valko / Consorcio Vial"
            required
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] focus:border-[#0F172A] focus:ring-2 focus:ring-[#0F172A]/10 text-sm text-[#0F172A] outline-none transition-all bg-[#F8FAFC]"
          />
        </div>

        {/* Nombre Contacto */}
        <div>
          <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1 flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-[#C5A880]" /> Nombre y Apellido *
          </label>
          <input
            type="text"
            name="contactName"
            value={formData.contactName}
            onChange={handleChange}
            placeholder="Ej: Ing. Carlos San Martín"
            required
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] focus:border-[#0F172A] focus:ring-2 focus:ring-[#0F172A]/10 text-sm text-[#0F172A] outline-none transition-all bg-[#F8FAFC]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Cargo */}
        <div>
          <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1">
            Cargo / Rol
          </label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Ej: Gerente de Operaciones"
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] focus:border-[#0F172A] focus:ring-2 focus:ring-[#0F172A]/10 text-sm text-[#0F172A] outline-none transition-all bg-[#F8FAFC]"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1 flex items-center gap-1">
            <Mail className="w-3.5 h-3.5 text-[#C5A880]" /> Email Corporativo *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="carlos@constructora.cl"
            required
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] focus:border-[#0F172A] focus:ring-2 focus:ring-[#0F172A]/10 text-sm text-[#0F172A] outline-none transition-all bg-[#F8FAFC]"
          />
        </div>

        {/* Teléfono / WhatsApp */}
        <div>
          <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1 flex items-center gap-1">
            <Phone className="w-3.5 h-3.5 text-[#C5A880]" /> Teléfono WhatsApp *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+56 9 6786 7984"
            required
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] focus:border-[#0F172A] focus:ring-2 focus:ring-[#0F172A]/10 text-sm text-[#0F172A] outline-none transition-all bg-[#F8FAFC]"
          />
        </div>
      </div>

      {/* Criterio / Tipo de Conflicto */}
      <div>
        <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1">
          Categoría de Conflicto o Servicio Requerido *
        </label>
        <select
          name="claimCategory"
          value={formData.claimCategory}
          onChange={handleChange}
          className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] focus:border-[#0F172A] focus:ring-2 focus:ring-[#0F172A]/10 text-sm text-[#0F172A] outline-none transition-all bg-[#F8FAFC]"
        >
          <option value="multas_atraso">Impugnación de Multas por Atraso No Imputable</option>
          <option value="aumento_obra_no_pagado">Cobro de Mayores Gastos Generales y Aumentos de Obra</option>
          <option value="liquidacion_contrato">Liquidación de Contrato & Rescate de Boletas</option>
          <option value="peritaje_judicial">Peritaje Técnico para Arbitraje / Tribunal</option>
          <option value="asesoria_preventiva">Asesoría Contractual Preventiva de Licitación u Obra</option>
        </select>
      </div>

      {/* Descripción Breve */}
      <div>
        <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1">
          Resumen del Proyecto o Estado de la Disputa (Opcional)
        </label>
        <textarea
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          placeholder="Describa brevemente el mandante (MOP, SERVIU, Minera, Privado), el plazo contractual y la situación actual..."
          className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] focus:border-[#0F172A] focus:ring-2 focus:ring-[#0F172A]/10 text-sm text-[#0F172A] outline-none transition-all bg-[#F8FAFC] resize-none"
        />
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
              <span>Solicitar Diagnóstico Técnico Confidencial</span>
            </>
          )}
        </button>

        <p className="text-[11px] text-center text-[#64748B] mt-2.5 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
          Confidencialidad estricta amparada bajo secreto profesional técnico-legal.
        </p>
      </div>
    </form>
  );
};
