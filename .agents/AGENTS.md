# Reglas y Contexto del Proyecto: Landing Bontes

Este archivo documenta las instrucciones, estructura de trabajo y decisiones técnicas del proyecto para que los agentes de IA (y desarrolladores) tengan el contexto necesario en futuras sesiones.

## 1. Flujo de Trabajo y Despliegue (Deployment)
- **Repositorio y Rama Principal:** El código fuente se encuentra alojado en GitHub. Todos los cambios deben subirse a la rama `main`.
- **Despliegue Automático:** Cualquier cambio subido a `main` desencadena automáticamente un flujo de GitHub Actions (`deploy.yml`) que compila la aplicación (`npm run build`) y sube el contenido de la carpeta `/dist` mediante FTP a cPanel.
- **Manejo de Imágenes y Archivos Binarios:** 
  - Las imágenes se almacenan en `public/images/`.
  - **IMPORTANTE:** El agente de IA actual tiene restricciones técnicas que le impiden subir archivos binarios (como imágenes `.png`, `.jpg`, `.webp`) a GitHub de forma automatizada mediante la API. 
  - **Acción Manual Requerida:** Toda nueva imagen generada o modificada localmente debe ser subida manualmente por el usuario directamente al repositorio en GitHub (arrastrando los archivos a la carpeta `public/images/` desde la interfaz web) para que el despliegue automático las reconozca.

## 2. Estructura y Stack Tecnológico
- **Frontend:** React 18, Vite, TypeScript, Tailwind CSS.
- **Backend:** Servidor Node.js integrado con `esbuild` (`server.ts`) para servir la aplicación estática y manejar endpoints de la API (ej. registro de leads y notificaciones de EmailJS/Firebase).
- **Ejecución Local:** Se debe utilizar `npm run dev` para iniciar el entorno de desarrollo local.

## 3. Directrices de Diseño y Contenido
- **Estética:** Diseño corporativo, sobrio y elegante (colores oscuros `#0F172A`, detalles en dorado/beige `#C5A880`).
- **Footer:** No se deben incluir direcciones físicas ficticias (como calles o números) en el pie de página. Solo se debe indicar "Santiago" y los medios de contacto (email y teléfono).
- **Enfoque:** La comunicación debe ser formal, técnica y dirigida a ingenieros y empresas del rubro de la construcción en Chile, enfocada en la metodología SCL Protocol y resolución de controversias (Claims).

## 4. Gestión de Archivos
- Modificaciones en componentes UI se realizan en `src/components/`.
- La información de servicios y casos de éxito se centraliza en `src/data/mockData.ts`.
- Los estilos globales y configuración de colores de la marca están en `tailwind.config.js` y `src/index.css`.

## 5. Seguridad y Variables de Entorno
- **EmailJS y Firebase:** Las credenciales (API Keys) viven en el cliente y son públicas. Para asegurar que la compilación en GitHub Actions funcione correctamente, `deploy.yml` inyecta dinámicamente el archivo `.env`.
- **Restricciones de Dominio (Vital):** Las claves públicas están restringidas al dominio en la consola de Google Cloud (`bontes.cl`, `localhost`) y en el Dashboard de EmailJS ("Allowed Origins").
- **Reglas de Firestore:** La colección `mensajes_contacto` tiene reglas de seguridad configuradas para permitir solo escrituras (`allow create: if true;`) y bloquear las lecturas externas (`allow read: if false;`), previniendo filtraciones de datos.
- **Git y MCP:** Como el directorio local de trabajo puede no estar sincronizado con Git, los commits automatizados deben realizarse a través del servidor MCP de GitHub hacia el repositorio `Setno/Landing-Bontes`.
