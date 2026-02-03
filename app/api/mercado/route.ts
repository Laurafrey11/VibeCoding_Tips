import { NextResponse } from 'next/server';

// Símbolos específicos del usuario
const FINANCIAL_SYMBOLS = {
  crypto: ['DOT-USD', 'ETH-USD', 'ADA-USD'],
  tech: ['GOOGL', 'MSFT', 'AMZN', 'NVDA', 'AMD', 'TSLA', 'AAPL', 'ADBE', 'TSM'],
  finance: ['JPM', 'V', 'AXP', 'BRK-B'],
  healthcare: ['UNH', 'ABBV', 'CRSP'],
  consumer: ['KO', 'PG', 'PEP'],
  energy: ['AES', 'XLE', 'YPF'],
  telecom: ['T'],
  argentina: ['GLOB', 'YPF'],
  etfs: ['SPY', 'QQQ', 'XLK', 'XLV', 'DIA', 'GLD', 'CIBR', 'SMH', 'SLV', 'EWZ', 'ICLN', 'IBIT'],
};

const SYMBOL_INFO: Record<string, { name: string; sector: string; description: string }> = {
  'DOT-USD': { name: 'Polkadot', sector: 'Crypto', description: 'Blockchain de interoperabilidad entre cadenas' },
  'ETH-USD': { name: 'Ethereum', sector: 'Crypto', description: 'Plataforma líder de smart contracts' },
  'ADA-USD': { name: 'Cardano', sector: 'Crypto', description: 'Blockchain proof-of-stake de tercera generación' },
  'GOOGL': { name: 'Alphabet (Google)', sector: 'Tech', description: 'Gigante tecnológico, líder en IA y búsqueda' },
  'MSFT': { name: 'Microsoft', sector: 'Tech', description: 'Líder en cloud (Azure) y software empresarial' },
  'AMZN': { name: 'Amazon', sector: 'Tech', description: 'E-commerce y cloud computing (AWS)' },
  'NVDA': { name: 'NVIDIA', sector: 'Tech', description: 'Líder en GPUs para IA y gaming' },
  'AMD': { name: 'AMD', sector: 'Tech', description: 'Procesadores y GPUs, competidor de Intel/NVIDIA' },
  'TSLA': { name: 'Tesla', sector: 'Tech', description: 'Vehículos eléctricos y energía renovable' },
  'AAPL': { name: 'Apple', sector: 'Tech', description: 'Hardware premium y ecosistema de servicios' },
  'ADBE': { name: 'Adobe', sector: 'Tech', description: 'Software creativo y marketing digital' },
  'TSM': { name: 'Taiwan Semiconductor', sector: 'Tech', description: 'Mayor fabricante de chips del mundo' },
  'JPM': { name: 'JPMorgan Chase', sector: 'Finance', description: 'Banco de inversión más grande de EE.UU.' },
  'V': { name: 'Visa', sector: 'Finance', description: 'Red de pagos global' },
  'AXP': { name: 'American Express', sector: 'Finance', description: 'Servicios financieros y tarjetas premium' },
  'BRK-B': { name: 'Berkshire Hathaway', sector: 'Finance', description: 'Conglomerado de Warren Buffett' },
  'UNH': { name: 'UnitedHealth', sector: 'Healthcare', description: 'Mayor aseguradora de salud de EE.UU.' },
  'ABBV': { name: 'AbbVie', sector: 'Healthcare', description: 'Farmacéutica especializada en inmunología' },
  'CRSP': { name: 'CRISPR Therapeutics', sector: 'Healthcare', description: 'Líder en edición genética CRISPR' },
  'KO': { name: 'Coca-Cola', sector: 'Consumer', description: 'Gigante de bebidas con dividendos estables' },
  'PG': { name: 'Procter & Gamble', sector: 'Consumer', description: 'Productos de consumo masivo' },
  'PEP': { name: 'PepsiCo', sector: 'Consumer', description: 'Bebidas y snacks global' },
  'AES': { name: 'AES Corporation', sector: 'Energy', description: 'Energía renovable y utilities' },
  'XLE': { name: 'Energy Select ETF', sector: 'Energy', description: 'ETF del sector energético' },
  'YPF': { name: 'YPF', sector: 'Argentina', description: 'Petrolera argentina, exposición a Vaca Muerta' },
  'T': { name: 'AT&T', sector: 'Telecom', description: 'Telecomunicaciones con alto dividendo' },
  'GLOB': { name: 'Globant', sector: 'Argentina', description: 'Empresa argentina de tecnología y software' },
  'SPY': { name: 'S&P 500 ETF', sector: 'ETF', description: 'Replica el índice S&P 500, diversificación total' },
  'QQQ': { name: 'NASDAQ 100 ETF', sector: 'ETF', description: 'Top 100 empresas tech del NASDAQ' },
  'XLK': { name: 'Technology Select ETF', sector: 'ETF', description: 'Sector tecnológico concentrado' },
  'XLV': { name: 'Health Care ETF', sector: 'ETF', description: 'Sector salud diversificado' },
  'DIA': { name: 'Dow Jones ETF', sector: 'ETF', description: 'Las 30 empresas del Dow Jones' },
  'GLD': { name: 'Gold ETF', sector: 'ETF', description: 'Oro físico, cobertura contra inflación' },
  'CIBR': { name: 'Cybersecurity ETF', sector: 'ETF', description: 'Empresas de ciberseguridad' },
  'SMH': { name: 'Semiconductor ETF', sector: 'ETF', description: 'Fabricantes de semiconductores' },
  'SLV': { name: 'Silver ETF', sector: 'ETF', description: 'Plata física, más volátil que oro' },
  'EWZ': { name: 'Brazil ETF', sector: 'ETF', description: 'Mercado brasileño, exposición LATAM' },
  'ICLN': { name: 'Clean Energy ETF', sector: 'ETF', description: 'Energías limpias global' },
  'IBIT': { name: 'iShares Bitcoin ETF', sector: 'ETF', description: 'Bitcoin spot ETF de BlackRock' },
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const tipo = searchParams.get('tipo') || 'laboral';

  if (tipo === 'laboral') {
    return await buscarEmpleos();
  } else if (tipo === 'financiero') {
    return await obtenerDatosFinancieros();
  }

  return NextResponse.json({ error: 'Tipo no válido' }, { status: 400 });
}

async function buscarEmpleos() {
  const empleos: any[] = [];
  const keywords = [
    'data analyst',
    'data analytics',
    'business intelligence',
    'power bi',
    'tableau',
    'sql analyst',
    'automation',
    'process automation',
    'rpa',
    'machine learning',
    'ai engineer',
    'artificial intelligence',
    'python developer',
    'data engineer',
    'etl developer',
  ];

  // API de Remotive
  for (const keyword of keywords.slice(0, 5)) {
    try {
      const response = await fetch(
        `https://remotive.com/api/remote-jobs?search=${encodeURIComponent(keyword)}&limit=10`,
        { next: { revalidate: 3600 } }
      );

      if (response.ok) {
        const data = await response.json();
        for (const job of data.jobs || []) {
          const location = (job.candidate_required_location || '').toLowerCase();
          const salary = job.salary || '';

          // Filtrar por ubicación LATAM/Worldwide
          const validLocation =
            location.includes('argentina') ||
            location.includes('latam') ||
            location.includes('latin america') ||
            location.includes('worldwide') ||
            location.includes('anywhere') ||
            location.includes('south america') ||
            location.includes('remote');

          if (validLocation) {
            // Intentar extraer salario mínimo
            let salarioMin = 0;
            const salaryMatch = salary.match(/\$?([\d,]+)/);
            if (salaryMatch) {
              salarioMin = parseInt(salaryMatch[1].replace(',', ''));
            }

            // Solo incluir si el salario es >= 2500 o no está especificado
            if (salarioMin >= 2500 || salary === '' || salary.toLowerCase().includes('competitive')) {
              empleos.push({
                titulo: job.title || 'Sin título',
                empresa: job.company_name || 'Empresa no especificada',
                ubicacion: job.candidate_required_location || 'Remoto',
                url: job.url || '',
                fecha: job.publication_date?.slice(0, 10) || '',
                categoria: job.category || 'Data/AI',
                tipo: job.job_type || 'Full-time',
                salario: salary || '$2,500+ USD/mes',
                tags: extractTags(job.title + ' ' + (job.description || '')),
              });
            }
          }
        }
      }
    } catch (error) {
      console.error(`Error buscando ${keyword}:`, error);
    }
  }

  // Eliminar duplicados
  const urlsVistas = new Set<string>();
  const empleosUnicos = empleos.filter((emp) => {
    if (urlsVistas.has(emp.url)) return false;
    urlsVistas.add(emp.url);
    return true;
  });

  // Ordenar por relevancia (priorizar IA/Automation)
  empleosUnicos.sort((a, b) => {
    const aScore = getRelevanceScore(a.titulo);
    const bScore = getRelevanceScore(b.titulo);
    return bScore - aScore;
  });

  return NextResponse.json({
    empleos: empleosUnicos.slice(0, 25),
    filtros: {
      salarioMinimo: '$2,500 USD/mes',
      enfoque: 'Data Analytics → IA/Automation',
      ubicacion: 'Remoto (LATAM/Worldwide)'
    }
  });
}

function extractTags(text: string): string[] {
  const tags: string[] = [];
  const keywords = ['Python', 'SQL', 'Power BI', 'Tableau', 'Machine Learning', 'AI', 'Automation', 'RPA', 'ETL', 'AWS', 'Azure', 'GPT', 'LLM'];

  for (const kw of keywords) {
    if (text.toLowerCase().includes(kw.toLowerCase())) {
      tags.push(kw);
    }
  }
  return tags.slice(0, 5);
}

function getRelevanceScore(title: string): number {
  const t = title.toLowerCase();
  let score = 0;

  if (t.includes('ai') || t.includes('artificial intelligence')) score += 10;
  if (t.includes('machine learning') || t.includes('ml')) score += 9;
  if (t.includes('automation')) score += 8;
  if (t.includes('data engineer')) score += 7;
  if (t.includes('data analyst')) score += 6;
  if (t.includes('python')) score += 5;
  if (t.includes('senior') || t.includes('lead')) score += 3;

  return score;
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

  // Eliminar duplicados
  const uniqueSymbols = [...new Set(allSymbols)];

  const activos: any[] = [];

  // Usar Yahoo Finance API (sin autenticación)
  for (const symbol of uniqueSymbols) {
    try {
      const response = await fetch(
        `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=5d`,
        {
          next: { revalidate: 300 },
          headers: {
            'User-Agent': 'Mozilla/5.0'
          }
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
            const precioAnterior = closes[closes.length - 2];
            const cambio = ((precioActual - precioAnterior) / precioAnterior) * 100;

            const info = SYMBOL_INFO[symbol] || {
              name: symbol,
              sector: 'Otros',
              description: ''
            };

            activos.push({
              simbolo: symbol.replace('-USD', ''),
              nombre: info.name,
              sector: info.sector,
              descripcion: info.description,
              precio: precioActual,
              cambio: cambio,
              recomendacion: getRecomendacion(cambio, info.sector),
            });
          }
        }
      }
    } catch (error) {
      console.error(`Error obteniendo ${symbol}:`, error);
    }
  }

  // Ordenar por sector
  const sectores = ['Crypto', 'Tech', 'Finance', 'Healthcare', 'Consumer', 'Energy', 'Argentina', 'ETF'];
  activos.sort((a, b) => {
    const aIdx = sectores.indexOf(a.sector);
    const bIdx = sectores.indexOf(b.sector);
    return aIdx - bIdx;
  });

  return NextResponse.json({
    activos,
    actualizacion: new Date().toISOString(),
    disclaimer: 'Este análisis es informativo. No constituye asesoría financiera. Investiga antes de invertir.'
  });
}

function getRecomendacion(cambio: number, sector: string): { tipo: string; texto: string } {
  if (cambio > 5) {
    return {
      tipo: 'precaucion',
      texto: '⚠️ Subida fuerte. Considerar tomar ganancias parciales.'
    };
  } else if (cambio > 2) {
    return {
      tipo: 'positivo',
      texto: '📈 Momentum positivo. Mantener posición.'
    };
  } else if (cambio > -2) {
    return {
      tipo: 'neutral',
      texto: '➡️ Estable. Bueno para acumular gradualmente.'
    };
  } else if (cambio > -5) {
    return {
      tipo: 'oportunidad',
      texto: '🔍 Posible oportunidad de compra si fundamentos son sólidos.'
    };
  } else {
    return {
      tipo: 'alerta',
      texto: '🔴 Caída significativa. Investigar causa antes de actuar.'
    };
  }
}
