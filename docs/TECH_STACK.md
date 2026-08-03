# Documento de Arquitectura & Tech Stack
## Plataforma Web Bontes.cl – Ingeniería Contractual & Claims B2B

**Estatus:** Producción  
**Plataforma:** Cloud Run (Port 3000)  
**Entorno Runtime:** Node.js + Express (Server Side) + Vite React (Client SPA)  

---

### 1. Resumen de Tecnologías Principales

| Capa | Tecnología / Librería | Versión | Propósito |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | React | `^19.0.1` | Biblioteca UI reactiva y basada en componentes. |
| **Lenguaje** | TypeScript | `~5.8.2` | Tipado estático estricto para alta mantenibilidad y seguridad de código. |
| **Bundler / Dev Server** | Vite | `^6.2.3` | Entorno de desarrollo ultrarrápido y empaquetador de producción. |
| **Backend / API Server** | Express | `^4.21.2` | Servidor Node.js para API REST (`/api/leads`, `/api/diagnose`). |
| **Estilos & UI** | Tailwind CSS | `^4.1.14` | Framework utility-first configurado vía `@tailwindcss/vite`. |
| **Iconografía** | Lucide React | `^0.546.0` | Set de íconos vectoriales modernos y livianos. |
| **Animación** | Motion | `^12.23.24` | Transiciones fluidas en diálogos y componentes. |
| **Motor de Compilación Server** | esbuild | `^0.25.0` | Compilación del backend TypeScript a CommonJS bundled (`dist/server.cjs`). |
| **Ejecución en Dev** | tsx | `^4.21.0` | Ejecución directa de `server.ts` en entorno de desarrollo. |

---

### 2. Estructura de Directorios del Proyecto

```
/
├── assets/                          # Archivos gráficos y estáticos
├── docs/                            # Documentación técnica adicional
│   ├── PRD.md                       # Product Requirement Document maestro
│   └── TECH_STACK.md                # Documentación de arquitectura técnica
├── src/                             # Código fuente de la aplicación React
│   ├── components/
│   │   ├── calculator/
│   │   │   └── RoiCalculator.tsx    # Simulador interactivo de Claims y Multas
│   │   ├── common/
│   │   │   ├── BontesLogo.tsx       # Componente de marca/isotipo Bontes
│   │   │   └── ResponsiveDialog.tsx # Modal / Drawer adaptativo para escritorio y mobile
│   │   ├── forms/
│   │   │   └── LeadCaptureForm.tsx  # Formulario de conversión con inyección de métricas
│   │   └── sections/
│   │       ├── CtaBanner.tsx        # Banner de cierre de alta conversión
│   │       ├── FaqSection.tsx       # Acordeón de preguntas frecuentes
│   │       ├── Footer.tsx           # Pie institucional con barra de status corporativo
│   │       ├── Header.tsx           # Encabezado de navegación responsive
│   │       ├── Hero.tsx             # Sección principal (Promesa de Valor B2B)
│   │       ├── MetricsProof.tsx     # Casos de éxito y testimonios demostrados
│   │       ├── PainPoints.tsx       # Matriz de agitación del problema (PAS)
│   │       ├── SclMethodology.tsx   # Explicación Metodológica Protocolo SCL
│   │       ├── ServicesGrid.tsx     # Cuadrícula de servicios especializados
│   │       └── StickyMobileBar.tsx  # Barra flotante de conversión para móviles
│   ├── data/
│   │   └── mockData.ts              # Constantes de servicios, casos de éxito y FAQs
│   ├── App.tsx                      # Componente raíz y orquestador de estado global
│   ├── index.css                    # Entrypoint CSS con importación de Tailwind v4
│   ├── main.tsx                     # Entrypoint de React DOM
│   └── types.ts                     # Interfaces TypeScript compartidas
├── .env.example                     # Variables de entorno declaradas (e.g. GEMINI_API_KEY)
├── index.html                       # Entrypoint HTML con tipografías Google Fonts
├── metadata.json                    # Metadata de la aplicación AI Studio
├── package.json                     # Declaración de dependencias y scripts de construcción
├── PRD.md                           # Product Requirement Document maestro
├── server.ts                        # Servidor Express Full-Stack + Middleware Vite
├── TECH_STACK.md                    # Documento de arquitectura técnica
├── tsconfig.json                    # Configuración del compilador TypeScript
└── vite.config.ts                   # Configuración del empaquetador Vite + Tailwind Plugin
```

---

### 3. Configuración del Servidor y Scripts NPM

Para garantizar la máxima compatibilidad con contenedores Cloud Run y el proxy inverso (Port 3000), `package.json` define la siguiente pipeline:

```json
{
  "scripts": {
    "dev": "tsx server.ts",
    "build": "vite build && esbuild server.ts --bundle --platform=node --format=cjs --packages=external --sourcemap --outfile=dist/server.cjs",
    "start": "node dist/server.cjs",
    "lint": "tsc --noEmit"
  }
}
```

#### Explicación del Flujo de Build:
1. `vite build`: Compila los activos React de `/src` en la carpeta estática `/dist`.
2. `esbuild server.ts ...`: Compila el servidor backend de TypeScript en un único archivo CommonJS optimizado (`dist/server.cjs`), evitando fricciones de imports de ES Modules en tiempo de ejecución Node.
3. `node dist/server.cjs`: Ejecuta el servidor unificado en producción binding a `0.0.0.0:3000`.

---

### 4. Endpoints de la API REST (`server.ts`)

#### `POST /api/leads`
Recibe la información de registro ingresada por el usuario en el formulario `LeadCaptureForm` y las métricas inyectadas desde la calculadora.
- **Entrada:** `JSON` con campos de la empresa, contacto, tipo de proyecto, categoría de reclamo y métricas simuladas.
- **Salida:** `JSON` confirmando el registro con ID único y asignación automática del especialista.

#### `POST /api/diagnose`
Endpoint preparado para diagnósticos asistidos por IA Gemini (`@google/genai` con modelo `gemini-2.5-flash`), con fallback preventivo en caso de variaciones de claves.

---

### 5. Guía de Despliegue y Verificación

1. **Puerto Obligatorio:** El servidor se vincula exclusivamente a `PORT = 3000` y host `0.0.0.0`.
2. **Variables de Entorno:**
   - `GEMINI_API_KEY` (Opcional para análisis asistido).
3. **Verificación de Compilación:**
   Ejecute `npm run lint` y `npm run build` para validar que no existen fallos de sintaxis o tipos.
