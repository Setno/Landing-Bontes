# Documento de Requerimientos de Producto (PRD) Maestro
## Rediseño Estratégico & Landing Page B2B de Alta Conversión – Bontes.cl

**Versión:** 2.0.0  
**Fecha:** 2026  
**Estatus:** Producción / Desplegado  
**Empresa:** Bontes.cl – Ingeniería Contractual & Gestión de Claims  

---

### 1. Resumen Ejecutivo & Visión del Producto

#### 1.1 Visión
Bontes.cl es la firma consultora líder en Chile especializada en **Ingeniería Contractual, Gestión de Claims y Blindaje Legal-Técnico** para empresas constructoras, contratistas y firmas de obras civiles (MOP, SERVIU, Minería y Concesiones).

El objetivo estratégico central del producto web es consolidar un **Motor de Generación de Leads B2B (Lead Generation Engine)** optimizado bajo la metodología narrativa **PAS (Problem - Agitation - Solution)**. La plataforma está estructurada para convertir a ejecutivos de decisión (Gerentes Generales, Directores de Obra y Jefes de Contratos) en clientes mediante un flujo comprimido, prioritario y directo a la acción.

#### 1.2 Objetivos de Negocio
1. **Atraer & Capturar Leads Calificados:** Empresas constructoras que enfrentan multas por atraso no imputable o mayores gastos generales no pagados.
2. **Generar Valor Inmediato Interactivo:** Proveer una **Calculadora Simuladora de Claims y Multas** que cuantifica en segundos el monto proyectado a eximir o reclamar.
3. **Posicionar Autoridad Metodológica:** Demonstrar solvencia mediante el uso irrefutable del **Protocolo SCL (Society of Construction Law)** y análisis de ruta crítica.
4. **Optimización UI/UX Compilada:** Garantizar una experiencia ágil de baja fricción, respuesta rápida en móviles y navegación comprimida.

---

### 2. Perfil del Usuario & Buyer Persona

| Atributo | Detalle |
| :--- | :--- |
| **Audiencia Objetivo** | Gerentes Generales, Gerentes de Operaciones, Directores de Proyecto, Abogados In-House y Jefes de Oficina Técnica en constructoras chilenas. |
| **Dolores Principales** | Multas diarias exorbitantes de la Inspección Fiscal, atrasos causados por el mandante (RFIs no respondidas, terrenos tardíos), cobro inminente de boletas de garantía, retención injustificada de aumentos de obra. |
| **Objetivo del Usuario** | Detener multas, recuperar flujo de caja y fundamentar reclamos con pruebas de ingeniería matemática irrefutables ante mandantes públicos o privados. |

---

### 3. Arquitectura de Información & Embudo PAS

La Landing Page utiliza un flujo optimizado sin elementos redundantes ni distractores:

1. **Top Alert Bar:** Notificación urgente dirigida a constructoras MOP & Concesiones con auditoría de plazos en 48 horas.
2. **Header Nivel Institucional:** Navegación ligera e intuitiva (`Inicio`, `Servicios`, `Metodología SCL`, `Calculadora`, `Casos de Éxito`, `FAQ`) con acceso directo al modal de diagnóstico.
3. **Hero Section (Problema / Solución):**
   - Titular principal centrado en blindaje de caja y exención de multas por atraso no imputable.
   - Indicadores de autoridad en tiempo real (100% éxito técnico, +$45.000M CLP respaldados, < 48h diagnóstico).
   - CTAs duales: Agendar Diagnóstico Confidencial & Simular Calculadora de Claims.
4. **Pain Points Grid (Agitación PAS):** Matriz interactiva de pérdidas financieras comunes en obras civiles (Multas MOP, Gastos Generales sin liquidar, Boletas de Garantía en riesgo, Aumentos de Obra no reconocidos).
5. **Calculadora Simuladora de Claims (Core Interactivo):**
   - Parámetros ajustables: Monto de Obra (CLP), Días de Atraso en Disputa, Gasto General Diario (CLP) y Tipo de Proyecto (MOP Vial, SERVIU, Edificación, Minería/Industrial).
   - Cálculo dinámico: Ahorro por Multas Eximidas (mitigadas al 85-90%) + Reclamo de Gastos Generales por Permanencia (con factor de riesgo del 80%).
   - Conversión automática a UF y nivel de riesgo (Crítico, Alto, Moderado).
   - Inyección directa de valores al formulario de captura.
6. **Servicios de Alta Especialización:**
   - Reclamaciones y Claims bajo Protocolo SCL.
   - Blindaje Preventivo y Gestión de Libro de Obras.
   - Peritaje Técnico de Ruta Crítica y Cronograma As-Built.
   - Liquidación de Contratos y Rescate de Garantías.
   - Defensa de Aumentos de Obra y Modificaciones de Contrato.
7. **Metodología Protocolo SCL & Matriz Comparativa:**
   - 4 Etapas: Levantamiento As-Built $\rightarrow$ Aislamiento de Ruta Crítica $\rightarrow$ Cuantificación GG $\rightarrow$ Dossier Irrefutable.
   - Tabla comparativa entre Reclamo Tradicional Informal vs. Protocolo BONTES (SCL).
8. **Prueba Social & Casos de Éxito:**
   - Demostración de casos chilenos reales de recuperación de caja (MOP Vial, Concesiones, Minería).
   - Testimonios de Gerentes y Ejecutivos de Obra.
9. **Preguntas Frecuentes (FAQ):** Acordeón de respuestas clave en normativas de construcción y claims.
10. **CTA Banner Final & Footer Corporate Status Bar:** Cierre de alta conversión con indicador de estado de servidores y resguardo de secreto profesional.
11. **Barra Flotante Móvil (Sticky Mobile Bar):** Barra fija en dispositivos móviles (< 768px) para agilizar conversión instantánea.

---

### 4. Modelo de Datos del Lead

Las solicitudes capturadas generan documentos estructurados según la siguiente interfaz TypeScript:

```typescript
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
```

---

### 5. Criterios de Aceptación & Verificación

- [x] **Reducción de Scroll:** Se eliminaron las secciones redundantes (*Asistente IA*, *Nosotros/Equipo*, *Menciones CAM*).
- [x] **Compresión Mobile:** Espaciados y tarjetas optimizados para pantalla móvil (`py-12 sm:py-16`, fuentes ajustadas).
- [x] **Calculadora Interactiva Operativa:** Ajuste en vivo de parámetros sin recargas de página.
- [x] **Formulario de Diagnóstico Funcional:** Envío mediante API REST con fallback seguro local y descarga de ficha.
- [x] **Compilación Limpia:** Build y linter ejecutados sin advertencias ni errores.
