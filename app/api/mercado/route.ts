import { NextResponse } from 'next/server';

// LISTA COMPLETA DE SÍMBOLOS - ACTUALIZADA
const FINANCIAL_SYMBOLS = {
  crypto: [
    { symbol: 'DOT-USD', name: 'Polkadot', desc: 'Blockchain de interoperabilidad. Potencial alto si DeFi crece.' },
    { symbol: 'ETH-USD', name: 'Ethereum', desc: 'Líder en smart contracts. Base de DeFi y NFTs.' },
    { symbol: 'ADA-USD', name: 'Cardano', desc: 'Blockchain PoS académica. Desarrollo lento pero sólido.' },
  ],
  tech: [
    { symbol: 'GOOGL', name: 'Alphabet (Google)', desc: 'Domina búsqueda y YouTube. Fuerte en IA con Gemini.' },
    { symbol: 'MSFT', name: 'Microsoft', desc: 'Azure crece fuerte. Inversión en OpenAI es estratégica.' },
    { symbol: 'AMZN', name: 'Amazon', desc: 'AWS líder en cloud. E-commerce sigue dominante.' },
    { symbol: 'NVDA', name: 'NVIDIA', desc: 'Monopolio de GPUs para IA. Demanda insaciable.' },
    { symbol: 'AMD', name: 'AMD', desc: 'Competidor de Intel/NVIDIA. Ganando market share.' },
    { symbol: 'TSLA', name: 'Tesla', desc: 'EVs + energía + robotaxis + IA. Alta volatilidad.' },
    { symbol: 'AAPL', name: 'Apple', desc: 'Ecosistema premium. Servicios crecen vs hardware.' },
    { symbol: 'ADBE', name: 'Adobe', desc: 'Creatividad + IA generativa. Firefly prometedor.' },
    { symbol: 'TSM', name: 'Taiwan Semiconductor', desc: 'Fabrica chips para todos. Riesgo geopolítico.' },
  ],
  finance: [
    { symbol: 'JPM', name: 'JPMorgan Chase', desc: 'Banco más grande USA. Excelente gestión.' },
    { symbol: 'V', name: 'Visa', desc: 'Duopolio de pagos global. Cashless trend favorece.' },
    { symbol: 'AXP', name: 'American Express', desc: 'Tarjetas premium. Cliente de alto valor.' },
    { symbol: 'BRK-B', name: 'Berkshire Hathaway', desc: 'Warren Buffett. Diversificación automática.' },
    { symbol: 'B', name: 'Barnes Group', desc: 'Industrial diversificado. Aeroespacial y manufactura.' },
  ],
  healthcare: [
    { symbol: 'UNH', name: 'UnitedHealth', desc: 'Mayor aseguradora USA. Optum crece fuerte.' },
    { symbol: 'ABBV', name: 'AbbVie', desc: 'Farmacéutica sólida. Transición post-Humira exitosa.' },
    { symbol: 'CRSP', name: 'CRISPR Therapeutics', desc: 'Edición genética revolucionaria. Alto riesgo/recompensa.' },
  ],
  consumer: [
    { symbol: 'KO', name: 'Coca-Cola', desc: 'Dividend King 60+ años. Defensiva en recesiones.' },
    { symbol: 'PG', name: 'Procter & Gamble', desc: 'Productos esenciales. Pricing power demostrado.' },
    { symbol: 'PEP', name: 'PepsiCo', desc: 'Bebidas + Frito-Lay. Más diversificada que KO.' },
  ],
  energy: [
    { symbol: 'AES', name: 'AES Corporation', desc: 'Transición agresiva a renovables. Crecimiento en LatAm.' },
    { symbol: 'XLE', name: 'Energy Select ETF', desc: 'Sector energético USA completo. Cíclico con petróleo.' },
  ],
  telecom: [
    { symbol: 'T', name: 'AT&T', desc: 'Alto dividendo ~6%. Deuda siendo reducida agresivamente.' },
  ],
  argentina: [
    { symbol: 'GLOB', name: 'Globant', desc: 'Tech argentina global. Servicios de IA en expansión.' },
    { symbol: 'YPF', name: 'YPF', desc: 'Vaca Muerta es el futuro. Riesgo político argentino.' },
    { symbol: 'BMA', name: 'Banco Macro', desc: 'Banco argentino líder. Beneficia si economía mejora.' },
  ],
  etfs: [
    { symbol: 'SPY', name: 'S&P 500 ETF', desc: 'Top 500 USA. Diversificación total en una compra.' },
    { symbol: 'QQQ', name: 'NASDAQ 100', desc: 'Top 100 tech. Mayor exposición a crecimiento.' },
    { symbol: 'XLK', name: 'Tech Select', desc: 'Sector tecnológico concentrado. AAPL/MSFT dominan.' },
    { symbol: 'XLV', name: 'Healthcare Select', desc: 'Sector salud USA. Defensivo y en crecimiento.' },
    { symbol: 'DIA', name: 'Dow Jones ETF', desc: '30 blue chips industriales. Menos volátil.' },
    { symbol: 'GLD', name: 'Gold ETF', desc: 'Oro físico. Cobertura contra inflación y crisis.' },
    { symbol: 'CIBR', name: 'Cybersecurity ETF', desc: 'Empresas de ciberseguridad. Demanda estructural.' },
    { symbol: 'SMH', name: 'Semiconductor ETF', desc: 'Fabricantes de chips. Volátil pero esencial.' },
    { symbol: 'SLV', name: 'Silver ETF', desc: 'Plata física. Más volátil que oro, uso industrial.' },
    { symbol: 'EWZ', name: 'Brazil ETF', desc: 'Mercado brasileño completo. Proxy LatAm.' },
    { symbol: 'ICLN', name: 'Clean Energy ETF', desc: 'Energías limpias global. Tendencia a largo plazo.' },
    { symbol: 'IBIT', name: 'iShares Bitcoin ETF', desc: 'Bitcoin spot de BlackRock. Exposición regulada.' },
  ],
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const tipo = searchParams.get('tipo') || 'laboral';
  const cv = searchParams.get('cv') || '';

  if (tipo === 'laboral') {
    return await buscarEmpleosExperto(cv);
  } else if (tipo === 'financiero') {
    return await obtenerDatosFinancieros();
  }

  return NextResponse.json({ error: 'Tipo no válido' }, { status: 400 });
}

async function buscarEmpleosExperto(cvText: string) {
  const empleos: any[] = [];

  const searchQueries = [
    'machine learning engineer',
    'ai engineer',
    'data scientist',
    'mlops engineer',
    'data engineer',
    'analytics engineer',
    'business intelligence',
    'data analyst senior',
    'automation engineer',
    'rpa developer',
    'python developer data',
    'etl developer',
    'power platform',
    'tableau developer',
  ];

  const cvKeywords = cvText.toLowerCase();
  const priorityKeywords: string[] = [];

  if (cvKeywords.includes('python')) priorityKeywords.push('python');
  if (cvKeywords.includes('sql')) priorityKeywords.push('sql');
  if (cvKeywords.includes('machine learning') || cvKeywords.includes('ml')) priorityKeywords.push('machine learning');
  if (cvKeywords.includes('power bi')) priorityKeywords.push('power bi');
  if (cvKeywords.includes('tableau')) priorityKeywords.push('tableau');
  if (cvKeywords.includes('aws')) priorityKeywords.push('aws');
  if (cvKeywords.includes('azure')) priorityKeywords.push('azure');
  if (cvKeywords.includes('automation')) priorityKeywords.push('automation');

  for (const query of searchQueries.slice(0, 8)) {
    try {
      const response = await fetch(
        `https://remotive.com/api/remote-jobs?search=${encodeURIComponent(query)}&limit=15`,
        { next: { revalidate: 1800 } }
      );

      if (response.ok) {
        const data = await response.json();
        for (const job of data.jobs || []) {
          const location = (job.candidate_required_location || '').toLowerCase();
          const title = (job.title || '').toLowerCase();
          const salary = job.salary || '';

          const validLocation =
            location.includes('argentina') ||
            location.includes('latam') ||
            location.includes('latin') ||
            location.includes('worldwide') ||
            location.includes('anywhere') ||
            location.includes('americas') ||
            location.includes('south america') ||
            location === '' ||
            location.includes('remote');

          if (!validLocation) continue;

          let matchScore = 0;
          const fullText = `${job.title} ${job.description || ''}`.toLowerCase();

          if (fullText.includes('machine learning') || fullText.includes(' ml ') || fullText.includes(' ai ')) matchScore += 30;
          if (fullText.includes('automation')) matchScore += 25;
          if (fullText.includes('data engineer')) matchScore += 20;
          if (fullText.includes('data scientist')) matchScore += 20;
          if (fullText.includes('python')) matchScore += 15;
          if (fullText.includes('senior') || fullText.includes('lead') || fullText.includes('principal')) matchScore += 15;
          if (fullText.includes('$') || salary) matchScore += 10;

          for (const kw of priorityKeywords) {
            if (fullText.includes(kw)) matchScore += 20;
          }

          let nivel = 'Mid';
          if (title.includes('senior') || title.includes('sr.') || title.includes('lead')) nivel = 'Senior';
          if (title.includes('principal') || title.includes('staff') || title.includes('director')) nivel = 'Principal';
          if (title.includes('junior') || title.includes('jr.') || title.includes('entry')) nivel = 'Junior';

          let salarioMin = 0;
          const salaryMatch = salary.match(/\$?([\d,]+)/);
          if (salaryMatch) {
            salarioMin = parseInt(salaryMatch[1].replace(/,/g, ''));
          }

          if (salarioMin < 2500 && salary !== '' && !salary.toLowerCase().includes('competitive')) {
            continue;
          }

          const tags: string[] = [];
          const techKeywords = ['Python', 'SQL', 'Power BI', 'Tableau', 'Machine Learning', 'AI', 'AWS', 'Azure', 'GCP', 'Spark', 'Airflow', 'dbt', 'Snowflake', 'TensorFlow', 'PyTorch', 'LLM', 'GPT', 'n8n', 'Zapier'];
          for (const kw of techKeywords) {
            if (fullText.includes(kw.toLowerCase())) tags.push(kw);
          }

          empleos.push({
            titulo: job.title || 'Sin título',
            empresa: job.company_name || 'Empresa confidencial',
            ubicacion: job.candidate_required_location || 'Remoto Global',
            url: job.url || '',
            fecha: job.publication_date?.slice(0, 10) || '',
            categoria: job.category || 'Data/AI',
            tipo: job.job_type || 'Full-time',
            salario: salary || '$2,500+ USD/mes (estimado)',
            tags: tags.slice(0, 6),
            nivel,
            match: matchScore,
          });
        }
      }
    } catch (error) {
      console.error(`Error buscando ${query}:`, error);
    }
  }

  try {
    const response = await fetch('https://www.arbeitnow.com/api/job-board-api', {
      next: { revalidate: 1800 },
    });

    if (response.ok) {
      const data = await response.json();
      for (const job of data.data || []) {
        const title = (job.title || '').toLowerCase();
        const isRelevant =
          title.includes('data') ||
          title.includes('machine learning') ||
          title.includes('ai ') ||
          title.includes('automation') ||
          title.includes('python') ||
          title.includes('analytics');

        if (isRelevant && job.remote) {
          const tags: string[] = [];
          if (title.includes('python')) tags.push('Python');
          if (title.includes('data')) tags.push('Data');
          if (title.includes('machine') || title.includes('ml')) tags.push('ML');

          empleos.push({
            titulo: job.title || 'Sin título',
            empresa: job.company_name || 'Empresa confidencial',
            ubicacion: 'Remoto',
            url: job.url || '',
            fecha: job.created_at?.slice(0, 10) || '',
            categoria: 'Data/AI',
            tipo: 'Full-time',
            salario: '$2,500+ USD/mes',
            tags,
            nivel: 'Mid',
            match: 50,
          });
        }
      }
    }
  } catch (error) {
    console.error('Error con Arbeitnow:', error);
  }

  const urlsVistas = new Set<string>();
  const empleosUnicos = empleos
    .filter((emp) => {
      if (!emp.url || urlsVistas.has(emp.url)) return false;
      urlsVistas.add(emp.url);
      return true;
    })
    .sort((a, b) => b.match - a.match)
    .slice(0, 30);

  return NextResponse.json({
    empleos: empleosUnicos,
    total: empleosUnicos.length,
    filtros: {
      salarioMinimo: '$2,500 USD/mes',
      enfoque: 'Data Analytics → IA/Automation',
      ubicacion: 'Remoto (Argentina/LATAM/Worldwide)',
    },
    cvAnalizado: cvText ? true : false,
  });
}

async function obtenerDatosFinancieros() {
  const allSymbols = [
    ...FINANCIAL_SYMBOLS.crypto,
    ...FINANCIAL_SYMBOLS.tech,
    ...FINANCIAL_SYMBOLS.finance,
    ...FINANCIAL_SYMBOLS.healthcare,
    ...FINANCIAL_SYMBOLS.consumer,
    ...FINANCIAL_SYMBOLS.energy,
    ...FINANCIAL_SYMBOLS.telecom,
    ...FINANCIAL_SYMBOLS.argentina,
    ...FINANCIAL_SYMBOLS.etfs,
  ];

  const activos: any[] = [];

  // Procesar en paralelo para mayor velocidad
  const promises = allSymbols.map(async (item) => {
    try {
      const response = await fetch(
        `https://query1.finance.yahoo.com/v8/finance/chart/${item.symbol}?interval=1d&range=1mo`,
        {
          next: { revalidate: 300 },
          headers: { 'User-Agent': 'Mozilla/5.0' },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const result = data.chart?.result?.[0];

        if (result) {
          const quotes = result.indicators?.quote?.[0];
          const closes = quotes?.close?.filter((c: number | null) => c !== null) || [];

          if (closes.length >= 2) {
            const precioActual = closes[closes.length - 1];
            const precioAyer = closes[closes.length - 2];
            const precioSemana = closes.length >= 5 ? closes[closes.length - 5] : closes[0];
            const precioMes = closes[0];

            const cambioDiario = ((precioActual - precioAyer) / precioAyer) * 100;
            const cambioSemanal = ((precioActual - precioSemana) / precioSemana) * 100;
            const cambioMensual = ((precioActual - precioMes) / precioMes) * 100;

            let sector = 'Otros';
            for (const [key, symbols] of Object.entries(FINANCIAL_SYMBOLS)) {
              if (symbols.some((s: any) => s.symbol === item.symbol)) {
                sector = key.charAt(0).toUpperCase() + key.slice(1);
                break;
              }
            }

            const volatilidad = Math.abs(cambioSemanal);
            let riesgo = 'Medio';
            if (sector === 'Crypto' || volatilidad > 10) riesgo = 'Alto';
            if (sector === 'Consumer' || (sector === 'Etfs' && !item.symbol.includes('IBIT')) || volatilidad < 3) riesgo = 'Bajo';

            const recomendacion = generarRecomendacion(cambioDiario, cambioSemanal, cambioMensual, sector, riesgo);

            return {
              simbolo: item.symbol.replace('-USD', ''),
              nombre: item.name,
              sector,
              descripcion: item.desc,
              precio: precioActual,
              cambio: cambioDiario,
              cambioSemanal,
              cambioMensual,
              riesgo,
              horizonte: 'Mediano plazo (6-24 meses)',
              recomendacion,
            };
          }
        }
      }
    } catch (error) {
      console.error(`Error obteniendo ${item.symbol}:`, error);
    }
    return null;
  });

  const results = await Promise.all(promises);
  const validActivos = results.filter((a) => a !== null);

  return NextResponse.json({
    activos: validActivos,
    actualizacion: new Date().toISOString(),
    resumen: {
      total: validActivos.length,
      positivos: validActivos.filter((a: any) => a.cambio > 0).length,
      negativos: validActivos.filter((a: any) => a.cambio < 0).length,
    },
    disclaimer: 'Análisis informativo. No es asesoría financiera. DYOR - Do Your Own Research.',
  });
}

function generarRecomendacion(
  diario: number,
  semanal: number,
  mensual: number,
  sector: string,
  riesgo: string
): { tipo: string; texto: string; accion: string } {

  const tendencia = (diario + semanal * 2 + mensual * 3) / 6;

  if (mensual > 25 && semanal > 12) {
    return {
      tipo: 'precaucion',
      accion: '⚠️ TOMAR GANANCIAS',
      texto: `Rally del ${mensual.toFixed(0)}% mensual. Vender 25-30% para asegurar profit. Subir stop-loss.`,
    };
  }

  if (mensual > 15 && semanal > 8) {
    return {
      tipo: 'precaucion',
      accion: '📊 REDUCIR POSICIÓN',
      texto: `Subida fuerte ${mensual.toFixed(0)}% mes. Considerar tomar ganancias parciales (15-20%).`,
    };
  }

  if (mensual < -25 && semanal < -12) {
    return {
      tipo: 'alerta',
      accion: '🔴 NO COMPRAR - ESPERAR',
      texto: `Caída del ${Math.abs(mensual).toFixed(0)}% mensual. Cuchillo cayendo. Esperar señales de reversión.`,
    };
  }

  if (mensual < -15 && semanal < -8) {
    return {
      tipo: 'alerta',
      accion: '⏸️ ESPERAR SOPORTE',
      texto: `Corrección fuerte. No atrapar. Esperar volumen de capitulación y soporte técnico.`,
    };
  }

  if (mensual < -12 && semanal > 3 && diario > 1) {
    return {
      tipo: 'oportunidad',
      accion: '🟢 COMPRA DCA',
      texto: `Rebote técnico después de caída. Iniciar DCA si fundamentos son sólidos. 25% ahora.`,
    };
  }

  if (mensual < -8 && semanal > 0) {
    return {
      tipo: 'oportunidad',
      accion: '🔍 EVALUAR ENTRADA',
      texto: `Estabilizando después de corrección. Investigar causa. Si OK, iniciar posición pequeña.`,
    };
  }

  if (tendencia > 8 && tendencia < 18) {
    return {
      tipo: 'positivo',
      accion: '📈 MANTENER',
      texto: `Tendencia alcista saludable. Mantener 100%. Agregar solo en pullbacks de 5-8%.`,
    };
  }

  if (tendencia > 3 && tendencia <= 8) {
    return {
      tipo: 'positivo',
      accion: '✅ ACUMULAR',
      texto: `Momentum positivo moderado. Buen momento para DCA mensual. Mantener plan.`,
    };
  }

  if (tendencia >= -3 && tendencia <= 3) {
    return {
      tipo: 'neutral',
      accion: '➡️ DCA REGULAR',
      texto: `Consolidación lateral. Ideal para DCA sistemático. No perseguir ni vender por pánico.`,
    };
  }

  if (tendencia > -8 && tendencia < -3) {
    return {
      tipo: 'oportunidad',
      accion: '🎯 OPORTUNIDAD',
      texto: `Corrección leve. Si fundamentos intactos, aumentar posición gradualmente.`,
    };
  }

  if (riesgo === 'Alto') {
    return {
      tipo: 'neutral',
      accion: '⚡ POSICIÓN ESPECULATIVA',
      texto: `Activo volátil. Solo capital que puedas perder (max 5% portfolio). Stop-loss obligatorio.`,
    };
  }

  if (riesgo === 'Bajo') {
    return {
      tipo: 'positivo',
      accion: '🛡️ CORE HOLDING',
      texto: `Activo defensivo. Ideal para base del portfolio. DCA mensual recomendado.`,
    };
  }

  return {
    tipo: 'neutral',
    accion: '📊 MONITOREAR',
    texto: `Sin señal clara. Mantener en watchlist. Esperar mejor punto de entrada.`,
  };
}
