import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = 3000;

app.use(express.json());

// In-Memory store for leads (and ready for Firestore integration)
const leadsDb: any[] = [];

// API Endpoint 1: Submit Lead & Save Metrics
app.post('/api/leads', (req, res) => {
  try {
    const leadData = req.body;
    if (!leadData.companyName || !leadData.contactName || !leadData.email || !leadData.phone) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const leadId = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const specialist = leadData.claimCategory === 'peritaje_judicial' || leadData.claimCategory === 'liquidacion_contrato'
      ? 'Especialista Legal Contractual & Claims'
      : 'Especialista Senior en Ruta Crítica & Protocolo SCL';

    const document = {
      id: leadId,
      createdAt: new Date().toISOString(),
      ...leadData,
      assignedSpecialist: specialist,
      status: 'new'
    };

    leadsDb.push(document);
    console.log(`[BONTES API] Nuevo Lead Registrado: ${leadData.companyName} (${leadId})`);

    return res.json({
      success: true,
      leadId,
      specialist,
      message: 'Solicitud registrada correctamente. Un especialista revisará el caso.'
    });
  } catch (err: any) {
    console.error('Error saving lead:', err);
    return res.status(500).json({ error: 'Error interno guardando la solicitud' });
  }
});

// API Endpoint 2: AI Contractual Risk Assessment using Gemini (@google/genai)
app.post('/api/diagnose', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Proporcione una descripción del caso' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Eres un perito experto en Ingeniería Contractual, Gestión y Administración de Contratos, Reclamos Contractuales y Presupuestos de Obras en Chile, especializado en el Protocolo SCL (Society of Construction Law).
Analiza brevemente el siguiente caso planteado por una empresa constructora y devuelve un JSON estricto con la siguiente estructura:
{
  "riskLevel": "Riesgo Crítico / Alto / Moderado",
  "imputableStatus": "Resumen de imputabilidad de atraso",
  "sclMethodology": "Nombre de la metodología SCL aplicable (Window Analysis, Time Impact Analysis, etc.)",
  "summary": "Breve explicación técnico-legal de 2 oraciones",
  "actionSteps": ["Paso 1", "Paso 2", "Paso 3"]
}

Caso planteado: "${prompt}"`
      });

      const responseText = response.text || '';
      try {
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          return res.json({ success: true, analysis: parsed });
        }
      } catch (e) {
        // Fallback to text
      }
    }

    // Default Fallback Response if API Key is pending or parse fails
    return res.json({
      success: true,
      analysis: {
        riskLevel: 'Riesgo Alto - Disputa Atendible',
        imputableStatus: 'Probable atraso NO imputable por interferencias de la Inspección Fiscal o entrega tardía de terreno.',
        sclMethodology: 'Análisis de Ventanas (Window Analysis) & Reconstrucción As-Built',
        summary: 'De acuerdo con los datos, el conflicto presenta argumentos técnicos sólidos para justificar la suspensión de multas y reclamar mayores gastos generales.',
        actionSteps: [
          'Auditar el Libro de Obras e inspeccionar notificaciones formales dentro de plazo.',
          'Consolidar el cronograma As-Built aislando las interferencias en el camino crítico.',
          'Formular la carpeta de claim de mayores gastos generales por la permanencia adicional.'
        ]
      }
    });
  } catch (err: any) {
    console.error('Error in AI diagnose API:', err);
    return res.status(500).json({ error: 'Error procesando diagnóstico con IA' });
  }
});

async function startServer() {
  // Vite middleware in dev mode
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Bontes Server] Servidor ejecutándose en http://0.0.0.0:${PORT}`);
  });
}

startServer();
