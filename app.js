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
    const sections = ['intro', 'pasos', 'seguridad', 'practicas'];
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
const STOCK_SYMBOLS = [
    // Acciones populares
    'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'NVDA', 'META',
    // ETFs populares
    'SPY', 'QQQ', 'VTI', 'IWM', 'DIA'
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
            addChatMessage('❌ No se pudieron obtener datos. La API puede estar temporalmente no disponible.', 'bot');
            return;
        }

        const html = generateFinancieroHTML(stockData);
        downloadHTML(html, 'mercado_financiero');

        addChatMessageHTML('bot', `
            <strong>✅ ¡Reporte generado!</strong><br><br>
            📊 Se analizaron ${stockData.length} activos (acciones y ETFs)<br>
            🔥 ${stockData.filter(d => Math.abs(d.cambio) > 2).length} oportunidades detectadas (cambio > 2%)<br><br>
            <em>El archivo se descargó automáticamente.</em>
        `);
    } catch (error) {
        console.error('Error:', error);
        addChatMessage('❌ Error al obtener datos. Intenta de nuevo más tarde.', 'bot');
    }
}

async function fetchStockData() {
    const symbols = STOCK_SYMBOLS.join(',');
    const yahooUrl = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols}`;
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(yahooUrl)}`;

    const response = await fetch(proxyUrl);
    const data = await response.json();

    if (!data.quoteResponse || !data.quoteResponse.result) {
        throw new Error('Respuesta inválida de Yahoo Finance');
    }

    return data.quoteResponse.result.map(stock => ({
        simbolo: stock.symbol,
        nombre: stock.shortName || stock.longName || stock.symbol,
        precio: stock.regularMarketPrice,
        cambio: stock.regularMarketChangePercent || 0,
        tipo: (stock.regularMarketChangePercent || 0) > 0 ? '📈 SUBIDA' : '📉 BAJADA',
        marketCap: stock.marketCap,
        categoria: stock.quoteType === 'ETF' ? 'ETF' : 'Acción'
    }));
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

// MERCADO LABORAL
async function fetchMercadoLaboral() {
    addChatMessageHTML('bot', `
        <div class="mercado-loading">
            <div class="mercado-spinner"></div>
            <span>Buscando empleos remotos en Argentina...</span>
        </div>
    `);

    try {
        const empleos = await fetchEmpleos();
        const html = generateLaboralHTML(empleos);
        downloadHTML(html, 'empleos_remotos');

        addChatMessageHTML('bot', `
            <strong>✅ ¡Reporte generado!</strong><br><br>
            💼 Se encontraron ${empleos.length} ofertas de trabajo<br>
            🔍 Búsqueda: Automation Process | Remoto | Argentina/LATAM<br><br>
            <em>El archivo se descargó automáticamente.</em>
        `);
    } catch (error) {
        console.error('Error:', error);
        addChatMessage('❌ Error al buscar empleos. Intenta de nuevo más tarde.', 'bot');
    }
}

async function fetchEmpleos() {
    const empleos = [];

    try {
        // Remotive API
        const response = await fetch('https://remotive.com/api/remote-jobs?search=automation%20process&limit=20');
        const data = await response.json();

        data.jobs.forEach(job => {
            const location = (job.candidate_required_location || '').toLowerCase();
            if (location.includes('argentina') || location.includes('latam') ||
                location.includes('latin america') || location.includes('worldwide') ||
                location.includes('anywhere') || location.includes('south america')) {
                empleos.push({
                    titulo: job.title,
                    empresa: job.company_name,
                    ubicacion: job.candidate_required_location || 'Remoto',
                    url: job.url,
                    fecha: job.publication_date ? job.publication_date.slice(0, 10) : '',
                    categoria: job.category || 'Tech',
                    tipo: job.job_type || 'Full-time',
                    logo: job.company_logo
                });
            }
        });
    } catch (e) {
        console.error('Error Remotive:', e);
    }

    return empleos.slice(0, 15);
}

function generateLaboralHTML(empleos) {
    const fecha = new Date().toLocaleString('es-ES');

    let html = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Empleos Remotos - Automation Process - ${fecha}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            background: linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%);
            color: #eee;
            min-height: 100vh;
            padding: 20px;
        }
        .container { max-width: 900px; margin: 0 auto; }
        .header {
            background: linear-gradient(135deg, #11998e, #38ef7d);
            padding: 30px;
            border-radius: 15px;
            margin-bottom: 30px;
            text-align: center;
            color: #1a1a2e;
        }
        .header h1 { font-size: 2em; margin-bottom: 10px; }
        .filters {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin: 20px 0;
            flex-wrap: wrap;
        }
        .filter-tag {
            background: #38ef7d33;
            color: #38ef7d;
            padding: 8px 16px;
            border-radius: 20px;
        }
        .stat {
            text-align: center;
            background: #ffffff11;
            padding: 20px;
            border-radius: 10px;
            margin: 20px auto;
            max-width: 200px;
        }
        .stat-value { font-size: 2.5em; font-weight: bold; color: #38ef7d; }
        .job-card {
            background: #16213e;
            padding: 25px;
            border-radius: 12px;
            border-left: 4px solid #38ef7d;
            margin-bottom: 15px;
            transition: transform 0.3s;
        }
        .job-card:hover { transform: translateX(10px); }
        .empresa { color: #38ef7d; font-size: 0.95em; margin-bottom: 5px; }
        .titulo { font-size: 1.3em; font-weight: bold; margin-bottom: 10px; }
        .detalles {
            display: flex;
            gap: 20px;
            font-size: 0.9em;
            opacity: 0.8;
            flex-wrap: wrap;
            margin: 15px 0;
        }
        .btn {
            display: inline-block;
            background: linear-gradient(135deg, #11998e, #38ef7d);
            color: #1a1a2e;
            padding: 12px 25px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: bold;
        }
        .btn:hover { transform: scale(1.05); }
        .no-results {
            text-align: center;
            padding: 60px;
            background: #16213e;
            border-radius: 15px;
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
            <h1>💼 Empleos Remotos</h1>
            <p>Automation Process | Argentina / LATAM</p>
            <p style="margin-top: 10px;">Generado: ${fecha}</p>
        </div>
        <div class="filters">
            <span class="filter-tag">🔍 Automation Process</span>
            <span class="filter-tag">🌎 Remoto</span>
            <span class="filter-tag">🇦🇷 Argentina / LATAM</span>
        </div>
        <div class="stat">
            <div class="stat-value">${empleos.length}</div>
            <div>Ofertas encontradas</div>
        </div>`;

    if (empleos.length > 0) {
        empleos.forEach(emp => {
            html += `
                <div class="job-card">
                    <div class="empresa">🏢 ${emp.empresa}</div>
                    <div class="titulo">${emp.titulo}</div>
                    <div class="detalles">
                        <span>📍 ${emp.ubicacion}</span>
                        <span>📅 ${emp.fecha}</span>
                        <span>🏷️ ${emp.categoria}</span>
                    </div>
                    <a href="${emp.url}" target="_blank" class="btn">Ver oferta →</a>
                </div>`;
        });
    } else {
        html += `
            <div class="no-results">
                <h2>😔 No se encontraron empleos</h2>
                <p>No hay ofertas con estos filtros en este momento.</p>
            </div>`;
    }

    html += `
        <div class="footer">
            <p>💼 Datos de Remotive API</p>
            <p>Búsqueda: Automation Process | Remoto | Argentina/LATAM</p>
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
