// Navigation functionality
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.getAttribute('data-section');
            navigateTo(targetSection);
        });
    });

    // Handle hash changes (browser back/forward)
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.slice(1) || 'intro';
        navigateTo(hash, false);
    });

    // Check initial hash
    const initialHash = window.location.hash.slice(1);
    if (initialHash) {
        navigateTo(initialHash, false);
    }

    // Add scroll animations
    addScrollAnimations();
});

// Navigate to a specific section
function navigateTo(sectionId, updateHash = true) {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    // Update active states
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        }
    });

    sections.forEach(section => {
        section.classList.remove('active');
        if (section.id === sectionId) {
            section.classList.add('active');
        }
    });

    // Update URL hash
    if (updateHash) {
        history.pushState(null, null, `#${sectionId}`);
    }

    // Scroll to top of content
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Add intersection observer for scroll animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe timeline items
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
    });

    // Observe cards
    document.querySelectorAll('.intro-card, .security-card, .practice-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.05}s`;
        observer.observe(card);
    });
}

// Add CSS for animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .timeline-item,
    .intro-card,
    .security-card,
    .practice-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }

    .timeline-item.animate-in,
    .intro-card.animate-in,
    .security-card.animate-in,
    .practice-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }

    /* Hover effects for interactive elements */
    .timeline-item:hover .timeline-marker {
        transform: scale(1.1);
        background-color: var(--accent-blue);
        color: white;
    }

    .timeline-marker {
        transition: all 0.3s ease;
    }

    .tdd-step:hover {
        transform: translateY(-4px);
        transition: transform 0.3s ease;
    }

    .tip-item:hover {
        transform: translateX(8px);
        transition: transform 0.3s ease;
    }

    .tip-item:hover .tip-number {
        opacity: 1;
    }

    /* Code snippet hover effect */
    .code-snippet:hover {
        background-color: var(--bg-primary);
    }

    /* Review actions hover */
    .review-actions span:hover {
        transform: scale(1.1);
    }

    /* Permission item hover */
    .permission-item:hover {
        transform: translateX(4px);
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(animationStyles);

// Mobile menu toggle (for responsive design)
function toggleMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('open');
}

// Add mobile menu button if needed
function setupMobileMenu() {
    if (window.innerWidth <= 768) {
        if (!document.querySelector('.mobile-menu-btn')) {
            const menuBtn = document.createElement('button');
            menuBtn.className = 'mobile-menu-btn';
            menuBtn.innerHTML = '☰';
            menuBtn.onclick = toggleMobileMenu;
            menuBtn.style.cssText = `
                position: fixed;
                top: 1rem;
                left: 1rem;
                z-index: 200;
                background: var(--bg-secondary);
                border: 1px solid var(--border-color);
                color: var(--text-primary);
                padding: 0.5rem 0.75rem;
                border-radius: 8px;
                font-size: 1.25rem;
                cursor: pointer;
            `;
            document.body.appendChild(menuBtn);
        }
    }
}

// Check on load and resize
window.addEventListener('load', setupMobileMenu);
window.addEventListener('resize', setupMobileMenu);

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            document.querySelector('.sidebar').classList.remove('open');
        }
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    const sections = ['intro', 'pasos', 'seguridad', 'practicas', 'documentacion', 'errores'];
    const currentSection = document.querySelector('.section.active').id;
    const currentIndex = sections.indexOf(currentSection);

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        if (currentIndex < sections.length - 1) {
            navigateTo(sections[currentIndex + 1]);
        }
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        if (currentIndex > 0) {
            navigateTo(sections[currentIndex - 1]);
        }
    }
});

console.log('🚀 Guía de Vibe Coding cargada correctamente');

// ==========================================
// Chat Widget Functionality
// ==========================================

// Estado para la función secreta de mercado
let mercadoState = {
    active: false,
    waitingFor: null // 'tipo' o null
};

function toggleChat() {
    const widget = document.getElementById('chat-widget');
    widget.classList.toggle('open');

    if (widget.classList.contains('open')) {
        document.getElementById('chat-input').focus();
    }
}

function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();

    if (!message) return;

    // Add user message
    addChatMessage(message, 'user');
    input.value = '';

    // Check if we're in mercado flow
    if (mercadoState.active && mercadoState.waitingFor === 'tipo') {
        handleMercadoSelection(message);
        return;
    }

    // Check for secret word "mercado"
    if (message.toLowerCase() === 'mercado') {
        activateMercadoSecreto();
        return;
    }

    // Normal bot response
    setTimeout(() => {
        const response = getBotResponse(message);
        addChatMessage(response, 'bot');
    }, 800);
}

function addChatMessage(text, sender) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;

    const avatar = sender === 'bot' ? '🤖' : '👤';
    const time = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

    messageDiv.innerHTML = `
        <span class="message-avatar">${avatar}</span>
        <div class="message-content">
            <p>${escapeHtml(text)}</p>
            <span class="message-time">${time}</span>
        </div>
    `;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function handleChatKeypress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// ==========================================
// FUNCIÓN SECRETA: MERCADO
// ==========================================

function activateMercadoSecreto() {
    mercadoState.active = true;
    mercadoState.waitingFor = 'tipo';

    setTimeout(() => {
        addChatMessageHTML('bot', `
            <strong>🔮 ¡Descubriste la función secreta!</strong><br><br>
            ¿Qué tipo de mercado te interesa?<br><br>
            <button class="mercado-btn" onclick="handleMercadoSelection('1')">📈 1. Financiero</button>
            <button class="mercado-btn" onclick="handleMercadoSelection('2')">💼 2. Laboral</button>
        `);
        addMercadoStyles();
    }, 500);
}

function handleMercadoSelection(selection) {
    const sel = selection.toLowerCase().trim();

    if (sel === '1' || sel.includes('financiero')) {
        mercadoState.active = false;
        mercadoState.waitingFor = null;
        addChatMessage('Financiero', 'user');
        fetchMercadoFinanciero();
    } else if (sel === '2' || sel.includes('laboral')) {
        mercadoState.active = false;
        mercadoState.waitingFor = null;
        addChatMessage('Laboral', 'user');
        fetchMercadoLaboral();
    } else {
        addChatMessage('❌ Por favor, escribe 1 o 2, o "financiero" / "laboral"', 'bot');
    }
}

function addChatMessageHTML(sender, html) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;

    const avatar = sender === 'bot' ? '🤖' : '👤';
    const time = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

    messageDiv.innerHTML = `
        <span class="message-avatar">${avatar}</span>
        <div class="message-content">
            <div>${html}</div>
            <span class="message-time">${time}</span>
        </div>
    `;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function addMercadoStyles() {
    if (document.getElementById('mercado-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'mercado-styles';
    styles.textContent = `
        .mercado-btn {
            display: block;
            width: 100%;
            padding: 10px 15px;
            margin: 5px 0;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border: none;
            border-radius: 8px;
            color: white;
            font-size: 14px;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .mercado-btn:hover {
            transform: scale(1.02);
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }
        .mercado-loading {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .mercado-spinner {
            width: 20px;
            height: 20px;
            border: 3px solid #ffffff33;
            border-top-color: #667eea;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        .mercado-download-btn {
            display: inline-block;
            padding: 12px 20px;
            margin-top: 10px;
            background: linear-gradient(135deg, #11998e, #38ef7d);
            border: none;
            border-radius: 8px;
            color: #1a1a2e;
            font-size: 14px;
            font-weight: bold;
            cursor: pointer;
            text-decoration: none;
            transition: transform 0.2s;
        }
        .mercado-download-btn:hover {
            transform: scale(1.05);
        }
    `;
    document.head.appendChild(styles);
}

// MERCADO FINANCIERO - Acciones y ETFs
// Usando Finnhub API - Obtené tu API key gratis en: https://finnhub.io/
// Dejá FINNHUB_API_KEY vacío para usar datos de demostración
const FINNHUB_API_KEY = ''; // Poné tu key acá para datos en tiempo real

const STOCK_DATA = [
    { simbolo: 'AAPL', nombre: 'Apple Inc.', categoria: 'Acción' },
    { simbolo: 'MSFT', nombre: 'Microsoft Corporation', categoria: 'Acción' },
    { simbolo: 'GOOGL', nombre: 'Alphabet Inc.', categoria: 'Acción' },
    { simbolo: 'AMZN', nombre: 'Amazon.com Inc.', categoria: 'Acción' },
    { simbolo: 'TSLA', nombre: 'Tesla Inc.', categoria: 'Acción' },
    { simbolo: 'NVDA', nombre: 'NVIDIA Corporation', categoria: 'Acción' },
    { simbolo: 'META', nombre: 'Meta Platforms Inc.', categoria: 'Acción' },
    { simbolo: 'SPY', nombre: 'SPDR S&P 500 ETF', categoria: 'ETF' },
    { simbolo: 'QQQ', nombre: 'Invesco QQQ Trust', categoria: 'ETF' },
    { simbolo: 'DIA', nombre: 'SPDR Dow Jones ETF', categoria: 'ETF' }
];

async function fetchMercadoFinanciero() {
    addChatMessageHTML('bot', `
        <div class="mercado-loading">
            <div class="mercado-spinner"></div>
            <span>Obteniendo datos de acciones y ETFs...</span>
        </div>
    `);

    try {
        const stockData = await fetchStockData();

        if (stockData.length === 0) {
            addChatMessage('❌ No se pudieron obtener datos. Intenta de nuevo.', 'bot');
            return;
        }

        const html = generateFinancieroHTML(stockData);
        downloadHTML(html, 'mercado_financiero');

        const esDemo = !FINNHUB_API_KEY;
        addChatMessageHTML('bot', `
            <strong>✅ ¡Reporte generado!</strong><br><br>
            📊 Se analizaron ${stockData.length} activos (acciones y ETFs)<br>
            🔥 ${stockData.filter(d => Math.abs(d.cambio) > 2).length} oportunidades detectadas (cambio > 2%)<br>
            ${esDemo ? '<br>⚠️ <em>Datos de demostración. Para datos en tiempo real, obtené una API key gratis en finnhub.io</em>' : ''}<br><br>
            <em>El archivo se descargó automáticamente.</em>
        `);
    } catch (error) {
        console.error('Error:', error);
        addChatMessage('❌ Error al obtener datos. Intenta de nuevo más tarde.', 'bot');
    }
}

async function fetchStockData() {
    // Si hay API key, intentar obtener datos reales de Finnhub
    if (FINNHUB_API_KEY) {
        try {
            const results = [];
            for (const stock of STOCK_DATA) {
                const url = `https://finnhub.io/api/v1/quote?symbol=${stock.simbolo}&token=${FINNHUB_API_KEY}`;
                const response = await fetch(url);
                const data = await response.json();

                if (data && data.c) { // c = current price
                    const precio = data.c;
                    const cambio = data.dp || 0; // dp = percent change

                    results.push({
                        simbolo: stock.simbolo,
                        nombre: stock.nombre,
                        precio: precio,
                        cambio: cambio,
                        tipo: cambio > 0 ? '📈 SUBIDA' : '📉 BAJADA',
                        categoria: stock.categoria
                    });
                }
            }
            if (results.length > 0) return results;
        } catch (e) {
            console.warn('Error con Finnhub API, usando datos de demostración:', e);
        }
    }

    // Datos de demostración con variación aleatoria realista
    return STOCK_DATA.map(stock => {
        // Precios base aproximados (enero 2025)
        const preciosBase = {
            'AAPL': 185, 'MSFT': 420, 'GOOGL': 175, 'AMZN': 190,
            'TSLA': 245, 'NVDA': 480, 'META': 550,
            'SPY': 590, 'QQQ': 510, 'DIA': 425
        };

        const precioBase = preciosBase[stock.simbolo] || 100;
        // Variación aleatoria de -5% a +5%
        const variacion = (Math.random() - 0.5) * 10;
        const precio = precioBase * (1 + variacion / 100);
        // Cambio diario aleatorio de -4% a +4%
        const cambio = (Math.random() - 0.5) * 8;

        return {
            simbolo: stock.simbolo,
            nombre: stock.nombre,
            precio: precio,
            cambio: cambio,
            tipo: cambio > 0 ? '📈 SUBIDA' : '📉 BAJADA',
            categoria: stock.categoria
        };
    });
}

function generateFinancieroHTML(datos) {
    const fecha = new Date().toLocaleString('es-ES');
    const oportunidades = datos.filter(d => Math.abs(d.cambio) > 2);

    let html = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Oportunidades del Mercado - ${fecha}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            color: #eee;
            min-height: 100vh;
            padding: 20px;
        }
        .container { max-width: 1200px; margin: 0 auto; }
        .header {
            background: linear-gradient(135deg, #667eea, #764ba2);
            padding: 30px;
            border-radius: 15px;
            margin-bottom: 30px;
            text-align: center;
        }
        .header h1 { font-size: 2.5em; margin-bottom: 10px; }
        .stats {
            display: flex;
            justify-content: center;
            gap: 40px;
            margin: 20px 0;
            flex-wrap: wrap;
        }
        .stat {
            text-align: center;
            background: #ffffff11;
            padding: 20px 30px;
            border-radius: 10px;
        }
        .stat-value { font-size: 2em; font-weight: bold; color: #667eea; }
        .section-title {
            font-size: 1.5em;
            margin: 30px 0 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #667eea;
        }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
        .card {
            background: #16213e;
            padding: 20px;
            border-radius: 12px;
            border-left: 4px solid #667eea;
        }
        .card.subida { border-left-color: #00ff88; }
        .card.bajada { border-left-color: #ff4757; }
        .card.oportunidad { box-shadow: 0 0 20px rgba(102, 126, 234, 0.3); }
        .simbolo { font-size: 1.4em; font-weight: bold; }
        .nombre { font-size: 0.9em; opacity: 0.7; margin-top: 2px; }
        .categoria {
            display: inline-block;
            background: #667eea33;
            padding: 3px 10px;
            border-radius: 20px;
            font-size: 0.75em;
            margin-top: 8px;
        }
        .precio { font-size: 1.8em; font-weight: bold; margin: 10px 0; }
        .cambio { font-size: 1.2em; font-weight: bold; }
        .positivo { color: #00ff88; }
        .negativo { color: #ff4757; }
        .badge {
            display: inline-block;
            background: linear-gradient(135deg, #f093fb, #f5576c);
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 0.8em;
            margin-top: 10px;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding: 20px;
            opacity: 0.7;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📈 Mercado Financiero - Acciones & ETFs</h1>
            <p>Generado: ${fecha}</p>
        </div>
        <div class="stats">
            <div class="stat">
                <div class="stat-value">${datos.length}</div>
                <div class="stat-label">Activos analizados</div>
            </div>
            <div class="stat">
                <div class="stat-value">${oportunidades.length}</div>
                <div class="stat-label">Oportunidades (>2%)</div>
            </div>
            <div class="stat">
                <div class="stat-value">${datos.filter(d => d.cambio > 0).length}</div>
                <div class="stat-label">En subida</div>
            </div>
        </div>`;

    if (oportunidades.length > 0) {
        html += `<h2 class="section-title">🔥 Oportunidades Detectadas</h2><div class="grid">`;
        oportunidades.forEach(op => {
            const clase = op.cambio > 0 ? 'subida' : 'bajada';
            const claseColor = op.cambio > 0 ? 'positivo' : 'negativo';
            const signo = op.cambio > 0 ? '+' : '';
            html += `
                <div class="card ${clase} oportunidad">
                    <div class="simbolo">${op.simbolo}</div>
                    <div class="nombre">${op.nombre}</div>
                    <span class="categoria">${op.categoria}</span>
                    <div class="precio">$${op.precio.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                    <div class="cambio ${claseColor}">${signo}${op.cambio.toFixed(2)}%</div>
                    <span class="badge">🔥 OPORTUNIDAD</span>
                </div>`;
        });
        html += `</div>`;
    }

    html += `<h2 class="section-title">📊 Todos los Activos</h2><div class="grid">`;
    datos.forEach(op => {
        const clase = op.cambio > 0 ? 'subida' : 'bajada';
        const claseColor = op.cambio > 0 ? 'positivo' : 'negativo';
        const signo = op.cambio > 0 ? '+' : '';
        html += `
            <div class="card ${clase}">
                <div class="simbolo">${op.simbolo}</div>
                <div class="nombre">${op.nombre}</div>
                <span class="categoria">${op.categoria}</span>
                <div class="precio">$${op.precio.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                <div class="cambio ${claseColor}">${signo}${op.cambio.toFixed(2)}%</div>
            </div>`;
    });
    html += `</div>`;

    html += `
        <div class="footer">
            <p>📈 Datos de Yahoo Finance</p>
            <p>⚠️ Este reporte es informativo. No constituye asesoría financiera.</p>
        </div>
    </div>
</body>
</html>`;

    return html;
}

// MERCADO LABORAL - Búsqueda de empleos en IA, Automatización y Vibe Coding
const JOB_SEARCH_TERMS = [
    'AI engineer',
    'prompt engineer',
    'automation',
    'machine learning',
    'LLM',
    'artificial intelligence',
    'AI developer',
    'process automation',
    'RPA developer',
    'AI consultant',
    'chatbot developer',
    'NLP engineer'
];

const FREELANCE_PLATFORMS = [
    { name: 'Upwork', url: 'https://www.upwork.com/nx/search/jobs/?q=AI%20automation&sort=recency', icon: '💼' },
    { name: 'Freelancer', url: 'https://www.freelancer.com/jobs/artificial-intelligence/', icon: '🌐' },
    { name: 'Toptal', url: 'https://www.toptal.com/ai', icon: '⭐' },
    { name: 'Fiverr', url: 'https://www.fiverr.com/categories/programming-tech/ai-coding', icon: '🎯' },
    { name: 'We Work Remotely', url: 'https://weworkremotely.com/categories/remote-ai-jobs', icon: '🏠' }
];

async function fetchMercadoLaboral() {
    addChatMessageHTML('bot', `
        <div class="mercado-loading">
            <div class="mercado-spinner"></div>
            <span>Buscando empleos de IA, Automatización y Vibe Coding...</span>
        </div>
    `);

    try {
        const empleos = await fetchEmpleos();
        const html = generateLaboralHTML(empleos);
        downloadHTML(html, 'empleos_ia_automation');

        const categorias = [...new Set(empleos.map(e => e.categoria))];

        addChatMessageHTML('bot', `
            <strong>✅ ¡Reporte generado!</strong><br><br>
            💼 Se encontraron <strong>${empleos.length}</strong> ofertas de trabajo<br>
            🤖 Categorías: ${categorias.slice(0, 4).join(', ')}<br>
            🌎 Ubicación: Remoto / Worldwide / LATAM<br><br>
            <strong>🔍 Términos buscados:</strong><br>
            AI, Prompt Engineer, Automation, ML, LLM, RPA, Chatbot<br><br>
            <em>El archivo se descargó automáticamente.</em>
        `);
    } catch (error) {
        console.error('Error:', error);
        addChatMessage('❌ Error al buscar empleos. Intenta de nuevo más tarde.', 'bot');
    }
}

async function fetchEmpleos() {
    const empleosMap = new Map(); // Usar Map para evitar duplicados por URL

    // Búsquedas en paralelo con múltiples términos
    const searchPromises = [];

    // Remotive API - múltiples búsquedas
    const remotiveTerms = ['AI', 'automation', 'machine learning', 'prompt engineer', 'LLM'];
    for (const term of remotiveTerms) {
        searchPromises.push(fetchRemotiveJobs(term));
    }

    // Arbeitnow API - empleos tech remotos
    searchPromises.push(fetchArbeitnowJobs());

    // Ejecutar todas las búsquedas en paralelo
    const results = await Promise.allSettled(searchPromises);

    // Combinar resultados
    results.forEach(result => {
        if (result.status === 'fulfilled' && result.value) {
            result.value.forEach(job => {
                if (!empleosMap.has(job.url)) {
                    empleosMap.set(job.url, job);
                }
            });
        }
    });

    // Convertir a array y ordenar por fecha
    let empleos = Array.from(empleosMap.values());
    empleos.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

    // Si hay pocos resultados de APIs, agregar datos de demostración
    if (empleos.length < 5) {
        const demoJobs = generateDemoJobs();
        demoJobs.forEach(job => {
            if (!empleosMap.has(job.url)) {
                empleos.push(job);
            }
        });
    }

    return empleos.slice(0, 30);
}

async function fetchRemotiveJobs(searchTerm) {
    const empleos = [];
    try {
        const response = await fetch(`https://remotive.com/api/remote-jobs?search=${encodeURIComponent(searchTerm)}&limit=15`);
        const data = await response.json();

        if (data.jobs) {
            data.jobs.forEach(job => {
                const location = (job.candidate_required_location || '').toLowerCase();
                const title = (job.title || '').toLowerCase();
                const tags = (job.tags || []).join(' ').toLowerCase();

                // Filtrar por ubicación compatible
                const locationOk = location.includes('argentina') ||
                    location.includes('latam') ||
                    location.includes('latin america') ||
                    location.includes('worldwide') ||
                    location.includes('anywhere') ||
                    location.includes('south america') ||
                    location.includes('remote') ||
                    location === '';

                // Filtrar por relevancia (AI, automation, etc.)
                const isRelevant = title.includes('ai') ||
                    title.includes('automation') ||
                    title.includes('machine learning') ||
                    title.includes('prompt') ||
                    title.includes('llm') ||
                    title.includes('nlp') ||
                    title.includes('chatbot') ||
                    title.includes('artificial') ||
                    title.includes('rpa') ||
                    tags.includes('ai') ||
                    tags.includes('automation') ||
                    tags.includes('machine-learning');

                if (locationOk) {
                    empleos.push({
                        titulo: job.title,
                        empresa: job.company_name,
                        ubicacion: job.candidate_required_location || 'Remoto Worldwide',
                        url: job.url,
                        fecha: job.publication_date ? job.publication_date.slice(0, 10) : new Date().toISOString().slice(0, 10),
                        categoria: job.category || 'Tech',
                        tipo: job.job_type || 'Full-time',
                        salario: job.salary || 'No especificado',
                        tags: job.tags || [],
                        fuente: 'Remotive',
                        relevante: isRelevant
                    });
                }
            });
        }
    } catch (e) {
        console.warn('Error Remotive:', e);
    }
    return empleos;
}

async function fetchArbeitnowJobs() {
    const empleos = [];
    try {
        const response = await fetch('https://www.arbeitnow.com/api/job-board-api?page=1');
        const data = await response.json();

        if (data.data) {
            data.data.forEach(job => {
                const title = (job.title || '').toLowerCase();
                const description = (job.description || '').toLowerCase();
                const tags = (job.tags || []).join(' ').toLowerCase();

                // Filtrar solo trabajos remotos y relevantes
                const isRemote = job.remote === true ||
                    (job.location || '').toLowerCase().includes('remote');

                const isRelevant = title.includes('ai') ||
                    title.includes('automation') ||
                    title.includes('machine learning') ||
                    title.includes('data') ||
                    title.includes('engineer') ||
                    title.includes('developer') ||
                    description.includes('artificial intelligence') ||
                    description.includes('automation') ||
                    tags.includes('ai') ||
                    tags.includes('python');

                if (isRemote && isRelevant) {
                    empleos.push({
                        titulo: job.title,
                        empresa: job.company_name,
                        ubicacion: job.remote ? 'Remoto' : (job.location || 'No especificado'),
                        url: job.url,
                        fecha: job.created_at ? job.created_at.slice(0, 10) : new Date().toISOString().slice(0, 10),
                        categoria: tags.includes('ai') ? 'AI/ML' : 'Software Development',
                        tipo: 'Full-time',
                        salario: 'No especificado',
                        tags: job.tags || [],
                        fuente: 'Arbeitnow',
                        relevante: true
                    });
                }
            });
        }
    } catch (e) {
        console.warn('Error Arbeitnow:', e);
    }
    return empleos;
}

function generateDemoJobs() {
    // Trabajos de demostración cuando las APIs no devuelven suficientes resultados
    const demoJobs = [
        {
            titulo: 'AI Prompt Engineer',
            empresa: 'TechStartup AI',
            ubicacion: 'Remoto Worldwide',
            url: 'https://www.linkedin.com/jobs/search/?keywords=prompt%20engineer&f_WT=2',
            fecha: new Date().toISOString().slice(0, 10),
            categoria: 'AI/ML',
            tipo: 'Full-time / Freelance',
            salario: '$60k - $120k USD',
            tags: ['AI', 'Prompt Engineering', 'LLM'],
            fuente: 'LinkedIn (Demo)',
            relevante: true
        },
        {
            titulo: 'Automation Developer (RPA/AI)',
            empresa: 'Process Automation Co.',
            ubicacion: 'Remoto LATAM',
            url: 'https://www.upwork.com/nx/search/jobs/?q=RPA%20automation',
            fecha: new Date().toISOString().slice(0, 10),
            categoria: 'Automation',
            tipo: 'Contract',
            salario: '$40 - $80/hora',
            tags: ['RPA', 'UiPath', 'Automation'],
            fuente: 'Upwork (Demo)',
            relevante: true
        },
        {
            titulo: 'LLM/ChatGPT Integration Developer',
            empresa: 'AI Solutions Inc.',
            ubicacion: 'Remoto Worldwide',
            url: 'https://weworkremotely.com/categories/remote-ai-jobs',
            fecha: new Date().toISOString().slice(0, 10),
            categoria: 'AI/ML',
            tipo: 'Full-time',
            salario: '$80k - $150k USD',
            tags: ['LLM', 'ChatGPT', 'API Integration'],
            fuente: 'WWR (Demo)',
            relevante: true
        },
        {
            titulo: 'AI Chatbot Developer',
            empresa: 'Conversational AI Lab',
            ubicacion: 'Remoto',
            url: 'https://www.freelancer.com/jobs/chatbot/',
            fecha: new Date().toISOString().slice(0, 10),
            categoria: 'AI/ML',
            tipo: 'Freelance',
            salario: '$30 - $60/hora',
            tags: ['Chatbot', 'NLP', 'Python'],
            fuente: 'Freelancer (Demo)',
            relevante: true
        },
        {
            titulo: 'Machine Learning Engineer',
            empresa: 'Data Science Corp',
            ubicacion: 'Remoto Worldwide',
            url: 'https://remotive.com/remote-jobs/machine-learning',
            fecha: new Date().toISOString().slice(0, 10),
            categoria: 'AI/ML',
            tipo: 'Full-time',
            salario: '$100k - $180k USD',
            tags: ['ML', 'Python', 'TensorFlow'],
            fuente: 'Remotive (Demo)',
            relevante: true
        },
        {
            titulo: 'AI Process Automation Consultant',
            empresa: 'Digital Transformation LLC',
            ubicacion: 'Remoto LATAM',
            url: 'https://www.toptal.com/ai',
            fecha: new Date().toISOString().slice(0, 10),
            categoria: 'Consulting',
            tipo: 'Contract',
            salario: '$50 - $100/hora',
            tags: ['AI', 'Consulting', 'Process Automation'],
            fuente: 'Toptal (Demo)',
            relevante: true
        }
    ];
    return demoJobs;
}

function generateLaboralHTML(empleos) {
    const fecha = new Date().toLocaleString('es-ES');
    const relevantes = empleos.filter(e => e.relevante);
    const categorias = [...new Set(empleos.map(e => e.categoria))];
    const fuentes = [...new Set(empleos.map(e => e.fuente))];

    let html = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Empleos IA & Automatización - ${fecha}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            background: linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0f2027 100%);
            color: #eee;
            min-height: 100vh;
            padding: 20px;
        }
        .container { max-width: 1100px; margin: 0 auto; }
        .header {
            background: linear-gradient(135deg, #667eea, #764ba2);
            padding: 40px;
            border-radius: 20px;
            margin-bottom: 30px;
            text-align: center;
            color: white;
            box-shadow: 0 10px 40px rgba(102, 126, 234, 0.3);
        }
        .header h1 { font-size: 2.5em; margin-bottom: 10px; }
        .header p { opacity: 0.9; }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            margin: 30px 0;
        }
        .stat-card {
            background: linear-gradient(135deg, #1e1e3f, #2d2d5a);
            padding: 25px;
            border-radius: 15px;
            text-align: center;
            border: 1px solid #ffffff15;
        }
        .stat-value { font-size: 2.5em; font-weight: bold; background: linear-gradient(135deg, #667eea, #f093fb); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .stat-label { font-size: 0.9em; opacity: 0.7; margin-top: 5px; }
        .section-title {
            font-size: 1.5em;
            margin: 40px 0 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #667eea;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .filters {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin: 20px 0;
        }
        .filter-tag {
            background: rgba(102, 126, 234, 0.2);
            color: #a5b4fc;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.85em;
            border: 1px solid rgba(102, 126, 234, 0.3);
        }
        .platforms-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 15px;
            margin-bottom: 30px;
        }
        .platform-card {
            background: linear-gradient(135deg, #1e1e3f, #2d2d5a);
            padding: 20px;
            border-radius: 12px;
            text-align: center;
            text-decoration: none;
            color: #eee;
            border: 1px solid #ffffff15;
            transition: all 0.3s;
        }
        .platform-card:hover {
            transform: translateY(-5px);
            border-color: #667eea;
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.2);
        }
        .platform-icon { font-size: 2em; margin-bottom: 10px; }
        .platform-name { font-weight: 600; }
        .jobs-grid {
            display: grid;
            gap: 20px;
        }
        .job-card {
            background: linear-gradient(135deg, #1e1e3f, #252550);
            padding: 25px;
            border-radius: 15px;
            border-left: 4px solid #667eea;
            transition: all 0.3s;
            position: relative;
        }
        .job-card:hover {
            transform: translateX(10px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .job-card.relevante { border-left-color: #38ef7d; }
        .job-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 15px;
        }
        .empresa { color: #667eea; font-size: 0.9em; margin-bottom: 5px; }
        .titulo { font-size: 1.3em; font-weight: bold; margin-bottom: 5px; color: #fff; }
        .job-meta {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            font-size: 0.85em;
            opacity: 0.8;
            margin: 15px 0;
        }
        .job-meta span {
            display: flex;
            align-items: center;
            gap: 5px;
        }
        .salary {
            background: linear-gradient(135deg, #11998e, #38ef7d);
            color: #1a1a2e;
            padding: 5px 12px;
            border-radius: 20px;
            font-weight: 600;
            font-size: 0.85em;
        }
        .tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin: 15px 0;
        }
        .tag {
            background: rgba(102, 126, 234, 0.15);
            color: #a5b4fc;
            padding: 4px 10px;
            border-radius: 12px;
            font-size: 0.75em;
        }
        .job-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 15px;
            padding-top: 15px;
            border-top: 1px solid #ffffff10;
        }
        .fuente {
            font-size: 0.8em;
            opacity: 0.6;
        }
        .btn {
            display: inline-block;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 12px 25px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s;
        }
        .btn:hover {
            transform: scale(1.05);
            box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
        }
        .relevante-badge {
            position: absolute;
            top: 15px;
            right: 15px;
            background: linear-gradient(135deg, #38ef7d, #11998e);
            color: #1a1a2e;
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 0.7em;
            font-weight: 600;
        }
        .tips-section {
            background: linear-gradient(135deg, #1e1e3f, #2d2d5a);
            padding: 30px;
            border-radius: 15px;
            margin-top: 40px;
            border: 1px solid #ffffff15;
        }
        .tips-section h3 { margin-bottom: 20px; color: #667eea; }
        .tips-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
        }
        .tip-item {
            display: flex;
            gap: 10px;
            padding: 15px;
            background: rgba(255,255,255,0.05);
            border-radius: 10px;
        }
        .tip-icon { font-size: 1.5em; }
        .tip-text { font-size: 0.9em; opacity: 0.9; }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding: 30px;
            opacity: 0.7;
        }
        @media (max-width: 768px) {
            .stats-grid { grid-template-columns: repeat(2, 1fr); }
            .platforms-grid { grid-template-columns: repeat(2, 1fr); }
            .tips-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🤖 Empleos en IA & Automatización</h1>
            <p>Oportunidades remotas en Inteligencia Artificial, Prompt Engineering, Automatización y Vibe Coding</p>
            <p style="margin-top: 15px; font-size: 0.9em;">📅 Generado: ${fecha}</p>
        </div>

        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-value">${empleos.length}</div>
                <div class="stat-label">Ofertas totales</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${relevantes.length}</div>
                <div class="stat-label">Altamente relevantes</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${categorias.length}</div>
                <div class="stat-label">Categorías</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${fuentes.length}</div>
                <div class="stat-label">Fuentes</div>
            </div>
        </div>

        <div class="filters">
            <span class="filter-tag">🤖 AI Engineer</span>
            <span class="filter-tag">💬 Prompt Engineer</span>
            <span class="filter-tag">⚡ Automation</span>
            <span class="filter-tag">🧠 Machine Learning</span>
            <span class="filter-tag">🔗 LLM</span>
            <span class="filter-tag">🤖 Chatbot</span>
            <span class="filter-tag">🔄 RPA</span>
            <span class="filter-tag">🌎 Remoto</span>
        </div>

        <h2 class="section-title">🌐 Plataformas Freelance Recomendadas</h2>
        <div class="platforms-grid">
            ${FREELANCE_PLATFORMS.map(p => `
                <a href="${p.url}" target="_blank" class="platform-card">
                    <div class="platform-icon">${p.icon}</div>
                    <div class="platform-name">${p.name}</div>
                </a>
            `).join('')}
        </div>

        <h2 class="section-title">💼 Ofertas de Trabajo (${empleos.length})</h2>
        <div class="jobs-grid">`;

    if (empleos.length > 0) {
        empleos.forEach(emp => {
            const tagsHtml = (emp.tags || []).slice(0, 5).map(t => `<span class="tag">${t}</span>`).join('');
            html += `
            <div class="job-card ${emp.relevante ? 'relevante' : ''}">
                ${emp.relevante ? '<span class="relevante-badge">⭐ Relevante</span>' : ''}
                <div class="job-header">
                    <div>
                        <div class="empresa">🏢 ${emp.empresa}</div>
                        <div class="titulo">${emp.titulo}</div>
                    </div>
                    ${emp.salario && emp.salario !== 'No especificado' ? `<span class="salary">💰 ${emp.salario}</span>` : ''}
                </div>
                <div class="job-meta">
                    <span>📍 ${emp.ubicacion}</span>
                    <span>📅 ${emp.fecha}</span>
                    <span>🏷️ ${emp.categoria}</span>
                    <span>⏰ ${emp.tipo}</span>
                </div>
                ${tagsHtml ? `<div class="tags">${tagsHtml}</div>` : ''}
                <div class="job-footer">
                    <span class="fuente">Fuente: ${emp.fuente}</span>
                    <a href="${emp.url}" target="_blank" class="btn">Ver oferta →</a>
                </div>
            </div>`;
        });
    } else {
        html += `
            <div style="text-align: center; padding: 60px; background: #16213e; border-radius: 15px;">
                <h2>😔 No se encontraron empleos</h2>
                <p>Intenta más tarde o visita las plataformas freelance directamente.</p>
            </div>`;
    }

    html += `
        </div>

        <div class="tips-section">
            <h3>💡 Tips para conseguir trabajo en IA/Automatización</h3>
            <div class="tips-grid">
                <div class="tip-item">
                    <span class="tip-icon">📚</span>
                    <span class="tip-text">Aprende herramientas como LangChain, OpenAI API, y frameworks de automatización (UiPath, n8n)</span>
                </div>
                <div class="tip-item">
                    <span class="tip-icon">🎯</span>
                    <span class="tip-text">Crea un portfolio con proyectos de chatbots, automatizaciones o integraciones con LLMs</span>
                </div>
                <div class="tip-item">
                    <span class="tip-icon">📝</span>
                    <span class="tip-text">Domina el arte del Prompt Engineering - es una de las habilidades más buscadas</span>
                </div>
                <div class="tip-item">
                    <span class="tip-icon">🌐</span>
                    <span class="tip-text">Mantén tu perfil de LinkedIn actualizado con keywords: AI, LLM, Automation, Prompt Engineering</span>
                </div>
            </div>
        </div>

        <div class="footer">
            <p>💼 Datos de: Remotive, Arbeitnow, y plataformas freelance</p>
            <p>🔍 Búsqueda: AI, Prompt Engineer, Automation, ML, LLM, RPA, Chatbot</p>
            <p style="margin-top: 10px;">⚠️ Algunas ofertas pueden ser de demostración. Verifica siempre en la fuente original.</p>
        </div>
    </div>
</body>
</html>`;

    return html;
}

// Descargar HTML
function downloadHTML(html, prefix) {
    const fecha = new Date().toISOString().slice(0, 19).replace(/[:-]/g, '').replace('T', '_');
    const filename = `${prefix}_${fecha}.html`;

    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Bot responses with comprehensive Vibe Coding best practices
function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();

    // Priority responses (checked first, more specific)
    const priorityResponses = [
        // Buenas prácticas generales
        {
            keywords: ['buenas practicas', 'buenas prácticas', 'mejores practicas', 'best practices'],
            response: '📚 Las 6 buenas prácticas clave de Vibe Coding son: 1) Empieza con tests (TDD), 2) Revisa todo el código generado, 3) Itera en pequeños pasos, 4) Documenta decisiones importantes, 5) Mantén el sandbox activo, 6) Aprende de cada iteración. ¿Quieres que profundice en alguna?'
        },
        // Prompts efectivos
        {
            keywords: ['prompt', 'prompts', 'escribir prompt', 'buen prompt'],
            response: '📝 Para escribir prompts efectivos: 1) Sé específico sobre inputs y outputs esperados, 2) Menciona el manejo de errores que necesitas, 3) Indica el estilo de código preferido. Ejemplo malo: "Haz un login". Ejemplo bueno: "Crea una función de login que valide email y contraseña, retorne un JWT token, y maneje errores de credenciales inválidas".'
        },
        // Revisión de código
        {
            keywords: ['revisar codigo', 'revisar código', 'revision', 'revisión', 'code review'],
            response: '🔍 La revisión de código es esencial. Sigue estos 4 pasos: 1) Entiende la lógica del código generado, 2) Verifica que no haya vulnerabilidades de seguridad, 3) Ejecuta los tests para confirmar funcionamiento, 4) Prueba manualmente los casos edge. Nunca integres código sin revisarlo primero.'
        },
        // Documentación
        {
            keywords: ['documentacion', 'documentación', 'documentar', 'readme', 'docs'],
            response: '📚 La documentación continua es clave. Pide a Claude que documente mientras desarrolla. Asegúrate de tener: README actualizado, comentarios en código complejo, documentación de API, y guías de contribución si trabajas en equipo.'
        },
        // Iteración
        {
            keywords: ['iterar', 'iteracion', 'iteración', 'iteraciones', 'ciclo'],
            response: '🔄 La iteración es fundamental en Vibe Coding. El ciclo es: Probar → Identificar mejoras → Implementar → Repetir. Trabaja en incrementos pequeños, recopila feedback constantemente, prioriza mejoras, documenta cambios y mantén versiones estables.'
        },
        // MVP
        {
            keywords: ['mvp', 'minimo viable', 'mínimo viable', 'prototipo'],
            response: '🎨 Para el prototipo/MVP: Enfócate en las características principales primero. Comienza con lo esencial (ej: una lista básica antes de añadir recordatorios). Implementa funcionalidades core, mantén el código simple, y prueba cada componente antes de avanzar.'
        },
        // Idea inicial
        {
            keywords: ['idea', 'empezar', 'comenzar', 'inicio', 'proyecto nuevo'],
            response: '💡 Para empezar un proyecto: 1) Define claramente qué problema quieres resolver, 2) Describe tu visión en términos simples, 3) Identifica tu audiencia objetivo, 4) Lista las funcionalidades clave. Ejemplo: "Quiero una app para gestionar tareas con recordatorios".'
        },
        // Permisos
        {
            keywords: ['permiso', 'permisos', 'aprobar', 'autorizar'],
            response: '🔐 Sobre permisos: Los niveles son - SEGURO (lectura de archivos, búsquedas), PRECAUCIÓN (escritura, instalación de dependencias), REVISAR (comandos de sistema, operaciones de red). Siempre lee y entiende cada permiso antes de aprobarlo.'
        },
        // Comandos
        {
            keywords: ['comando', 'comandos', 'terminal', 'ejecutar'],
            response: '👁️ Antes de ejecutar comandos: 1) Lee cada comando completo antes de aprobar, 2) Verifica que los paths sean correctos, 3) Entiende qué cambios se realizarán. Tienes opciones de Aprobar, Rechazar o Modificar cada comando propuesto.'
        },
        // Errores comunes
        {
            keywords: ['error', 'errores', 'problema', 'problemas', 'falla', 'fallo'],
            response: '⚠️ Errores comunes en Vibe Coding: 1) No revisar el código generado, 2) Prompts vagos o ambiguos, 3) Ignorar los tests, 4) Desactivar el sandbox sin entender las implicaciones, 5) No documentar decisiones. ¡Evítalos siguiendo las buenas prácticas!'
        },
        // Refactoring
        {
            keywords: ['refactor', 'refactorizar', 'mejorar codigo', 'mejorar código', 'limpiar'],
            response: '🔵 El refactoring es la fase 3 del TDD. Después de que tus tests pasen (Green), mejora el código sin romper los tests. Claude puede proponer refactorizaciones seguras. Recuerda: primero funciona, luego mejora.'
        },
        // Edge cases
        {
            keywords: ['edge case', 'casos limite', 'casos límite', 'casos borde'],
            response: '🧪 Claude puede ayudarte a identificar edge cases. Pídele que genere casos de prueba para: valores nulos, strings vacíos, números negativos, listas vacías, caracteres especiales, y límites de memoria o tiempo.'
        }
    ];

    // Check priority responses first
    for (const item of priorityResponses) {
        for (const keyword of item.keywords) {
            if (lowerMessage.includes(keyword)) {
                return item.response;
            }
        }
    }

    // Basic responses
    const basicResponses = {
        'hola': '¡Hola! 👋 Soy el asistente de Vibe Coding. Puedo ayudarte con buenas prácticas, TDD, prompts efectivos, seguridad y más. ¿Qué te gustaría saber?',
        'hello': '¡Hola! 👋 Soy el asistente de Vibe Coding. Puedo ayudarte con buenas prácticas, TDD, prompts efectivos, seguridad y más. ¿Qué te gustaría saber?',
        'hi': '¡Hola! 👋 Soy el asistente de Vibe Coding. Puedo ayudarte con buenas prácticas, TDD, prompts efectivos, seguridad y más. ¿Qué te gustaría saber?',
        'vibe coding': '🚀 Vibe Coding es un enfoque de desarrollo donde colaboras con IA para crear software. Describes lo que quieres en lenguaje natural y la IA te ayuda a construirlo. Las claves son: prompts claros, revisión de código, TDD, y mantener la seguridad.',
        'prd': '📄 Un PRD (Product Requirements Document) define los requisitos de tu app. Incluye: descripción del producto, user stories, requisitos técnicos y criterios de aceptación. Pide a Claude: "Ayúdame a crear un PRD para mi app con estas funcionalidades..."',
        'seguridad': '🔒 La seguridad en Vibe Coding incluye: 1) Revisar permisos antes de aprobarlos, 2) Leer cada comando antes de ejecutar, 3) Mantener el sandbox activo, 4) Nunca compartir credenciales en prompts. ¿Quieres saber más sobre algún aspecto?',
        'sandbox': '📦 El sandbox es un entorno aislado que protege tu sistema. Restricciones: no accede fuera del proyecto, comandos destructivos requieren confirmación. Permitido: lectura/escritura en el proyecto, tests, builds. ¡Nunca lo desactives sin entender los riesgos!',
        'tdd': '🧪 TDD (Test-Driven Development) tiene 3 fases: 🔴 RED - Escribe un test que falle, 🟢 GREEN - Implementa el código mínimo para pasar el test, 🔵 REFACTOR - Mejora el código sin romper tests. Claude puede generar tests y sugerir mejoras.',
        'test': '✅ Los tests son fundamentales. Claude puede: generar casos edge cases, sugerir tests para cobertura completa, identificar código sin testear, y proponer refactorizaciones seguras. Siempre ejecuta los tests antes de integrar código.',
        'gracias': '¡De nada! 😊 Recuerda las 6 prácticas clave: tests primero, revisar código, iterar pequeño, documentar, sandbox activo, y aprender siempre. ¿Algo más en lo que pueda ayudarte?',
        'ayuda': '🆘 Puedo ayudarte con: • Buenas prácticas de Vibe Coding • TDD y testing • Prompts efectivos • Revisión de código • Seguridad y permisos • PRD y documentación • Iteración y MVP. ¡Pregúntame lo que necesites!',
        'claude': '🤖 Claude es tu colaborador de IA para crear apps. Para aprovecharlo: usa prompts específicos, revisa siempre el código generado, pídele tests, y mantén las políticas de seguridad. Es una herramienta poderosa cuando se usa responsablemente.',
        'que puedes hacer': '🆘 Puedo responder sobre: • Buenas prácticas de Vibe Coding • TDD (Test-Driven Development) • Cómo escribir prompts efectivos • Revisión de código • Seguridad y sandbox • Crear PRD • Documentación • Iteración y MVP. ¡Pregunta lo que necesites!',
        'menu': '📋 Las secciones de la guía son: 1) Introducción - Qué es Vibe Coding, 2) Crear Apps con Claude - Los 4 pasos, 3) Uso Seguro - Permisos y sandbox, 4) Buenas Prácticas - TDD, prompts, revisión. Usa el menú lateral para navegar.'
    };

    // Check basic responses
    for (const [keyword, response] of Object.entries(basicResponses)) {
        if (lowerMessage.includes(keyword)) {
            return response;
        }
    }

    // Default responses with helpful suggestions
    const defaultResponses = [
        '🤔 No tengo información específica sobre eso, pero puedo ayudarte con: buenas prácticas, TDD, prompts efectivos, seguridad, o documentación. ¿Qué te interesa?',
        '💡 Prueba preguntarme sobre: "buenas prácticas", "cómo escribir prompts", "TDD", "revisar código", o "seguridad". ¡Estoy aquí para ayudarte!',
        '📚 Te sugiero explorar las secciones de la guía. Mientras tanto, puedo ayudarte con temas de Vibe Coding. Prueba preguntar: "¿cuáles son las buenas prácticas?"',
        '🎯 Para mejor ayudarte, pregúntame sobre: prompts efectivos, TDD, revisión de código, seguridad, sandbox, PRD, o iteración. ¿Cuál te interesa?'
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// Close chat when clicking outside
document.addEventListener('click', (e) => {
    const widget = document.getElementById('chat-widget');
    if (widget && !widget.contains(e.target) && widget.classList.contains('open')) {
        widget.classList.remove('open');
    }
});

// Prevent closing when clicking inside the chat
document.getElementById('chat-widget')?.addEventListener('click', (e) => {
    e.stopPropagation();
});
