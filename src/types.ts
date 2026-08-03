export interface LeadDocument {
  id?: string;
  createdAt: string;
  companyName: string;
  contactName: string;
  role?: string;
  email: string;
  phone: string;
  projectType: string;
  claimCategory: 'multas_atraso' | 'aumento_obra_no_pagado' | 'liquidacion_contrato' | 'peritaje_judicial' | 'asesoria_preventiva';
  description?: string;
  status: 'new' | 'contacted' | 'qualified' | 'disqualified' | 'won' | 'lost';
  calculatorMetrics?: {
    projectAmountCLP: number;
    delayDays: number;
    dailyGGCLP: number;
    calculatedMitigationCLP: number;
    calculatedClaimableGGCLP: number;
    totalProtectedCLP: number;
    totalProtectedUF: number;
    riskLevel: 'Crítico' | 'Alto' | 'Moderado';
  };
  metadata?: {
    userAgent: string;
    referrer: string;
  };
}

export interface CalculatorMetrics {
  projectAmountCLP: number;
  delayDays: number;
  dailyGGCLP: number;
  projectType: string;
  calculatedMitigationCLP: number;
  calculatedClaimableGGCLP: number;
  totalProtectedCLP: number;
  totalProtectedUF: number;
  riskLevel: 'Crítico' | 'Alto' | 'Moderado';
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  deliverables: string[];
  applicableTo: string[];
  roiImpact: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  clientCategory: string; // e.g., "Constructora Obra Vial MOP"
  conflictType: string;
  amountInDispute: string;
  recoveredAmount: string;
  timeframe: string;
  methodology: string;
  summary: string;
  keyOutcomes: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'claims' | 'contratos' | 'mop_serviu' | 'arbitraje';
}
