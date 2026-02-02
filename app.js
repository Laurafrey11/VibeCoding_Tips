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

    // Check if waiting for financiero option
    if (mercadoState.waitingFor === 'financiero_opcion') {
        const sel = message.toLowerCase();
        if (sel.includes('reporte') || sel === '1') {
            handleFinancieroOption('reporte');
        } else if (sel.includes('consult') || sel === '2') {
            handleFinancieroOption('consultar');
        } else if (sel.includes('asistente') || sel === '3') {
            handleFinancieroOption('asistente');
        } else {
            addChatMessage('Seleccioná una opción: reporte, consultar o asistente', 'bot');
        }
        return;
    }

    // Check if waiting for laboral option
    if (mercadoState.waitingFor === 'laboral_opcion') {
        const sel = message.toLowerCase();
        if (sel.includes('cv') || sel === '1') {
            handleLaboralOption('cv');
        } else if (sel.includes('busqueda') || sel.includes('búsqueda') || sel === '2') {
            handleLaboralOption('busqueda');
        } else if (sel.includes('reporte') || sel === '3') {
            handleLaboralOption('reporte');
        } else {
            addChatMessage('Seleccioná una opción: cv, busqueda o reporte', 'bot');
        }
        return;
    }

    // Check if waiting for job description (CV optimization)
    if (mercadoState.waitingFor === 'cv_descripcion') {
        mercadoState.cvData = mercadoState.cvData || {};
        mercadoState.cvData.descripcionPuesto = message;
        mercadoState.waitingFor = 'cv_contenido';
        addChatMessageHTML('bot', `
            <strong>📄 Ahora pegá tu CV</strong><br><br>
            Copiá y pegá el contenido de tu CV actual.<br><br>
            <em>Tip: Incluí toda la información relevante: experiencia, educación, habilidades, logros.</em>
        `);
        return;
    }

    // Check if waiting for CV content
    if (mercadoState.waitingFor === 'cv_contenido') {
        mercadoState.cvData.cvContenido = message;
        mercadoState.waitingFor = null;
        analizarYOptimizarCV();
        return;
    }

    // Check if waiting for CV to adapt search
    if (mercadoState.waitingFor === 'cv_para_busqueda') {
        mercadoState.waitingFor = null;
        procesarBusquedaLaboral(message);
        return;
    }

    // Check if waiting for skills/experience info (legacy)
    if (mercadoState.waitingFor === 'busqueda_info') {
        procesarBusquedaLaboral(message);
        return;
    }

    // Check if waiting for stock symbol
    if (mercadoState.waitingFor === 'simbolo_accion') {
        mercadoState.waitingFor = null;
        consultarAccion(message);
        return;
    }

    // Check if waiting for investment question
    if (mercadoState.waitingFor === 'pregunta_inversion') {
        procesarPreguntaInversion(message);
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
        addChatMessage('Financiero', 'user');
        mercadoState.waitingFor = 'financiero_opcion';
        setTimeout(() => {
            addChatMessageHTML('bot', `
                <strong>📈 Mercado Financiero</strong><br><br>
                ¿Qué te gustaría hacer?<br><br>
                <button class="mercado-btn" onclick="handleFinancieroOption('reporte')">📊 Generar reporte completo</button>
                <button class="mercado-btn" onclick="handleFinancieroOption('consultar')">🔍 Consultar acción/ETF específico</button>
                <button class="mercado-btn" onclick="handleFinancieroOption('asistente')">🤖 Asistente de inversiones</button>
            `);
        }, 300);
    } else if (sel === '2' || sel.includes('laboral')) {
        mercadoState.waitingFor = 'laboral_opcion';
        addChatMessage('Laboral', 'user');
        setTimeout(() => {
            addChatMessageHTML('bot', `
                <strong>💼 Mercado Laboral - Asesor de Carrera</strong><br><br>
                Soy tu asesor profesional. Seré directo y crítico para ayudarte a ser el candidato ideal.<br><br>
                ¿Qué necesitás?<br><br>
                <button class="mercado-btn" onclick="handleLaboralOption('cv')">📄 Optimización de CV</button>
                <button class="mercado-btn" onclick="handleLaboralOption('busqueda')">🔍 Búsqueda de Ofertas</button>
                <button class="mercado-btn" onclick="handleLaboralOption('reporte')">📊 Generar Reporte de Empleos</button>
            `);
        }, 300);
    } else {
        addChatMessage('❌ Por favor, escribe 1 o 2, o "financiero" / "laboral"', 'bot');
    }
}

function handleFinancieroOption(opcion) {
    if (opcion === 'reporte') {
        mercadoState.active = false;
        mercadoState.waitingFor = null;
        addChatMessage('Generar reporte', 'user');
        fetchMercadoFinanciero();
    } else if (opcion === 'consultar') {
        mercadoState.waitingFor = 'simbolo_accion';
        addChatMessage('Consultar activo', 'user');
        setTimeout(() => {
            addChatMessageHTML('bot', `
                <strong>🔍 Consultar Activo (Acción, ETF o Cripto)</strong><br><br>
                Escribí el símbolo del activo que querés consultar.<br><br>

                <strong>🪙 CRIPTOMONEDAS:</strong><br>
                <code>DOT</code> <code>ETH</code> <code>ADA</code><br><br>

                <strong>💻 TECH:</strong><br>
                <code>AAPL</code> <code>MSFT</code> <code>GOOGL</code> <code>AMZN</code> <code>TSLA</code> <code>NVDA</code> <code>AMD</code> <code>ADBE</code><br><br>

                <strong>🇦🇷 LATAM:</strong><br>
                <code>YPF</code> <code>GLOB</code> <code>CIB</code><br><br>

                <strong>📊 ETFs ÍNDICES:</strong><br>
                <code>SPY</code> <code>QQQ</code> <code>DIA</code><br><br>

                <strong>📈 ETFs SECTORIALES:</strong><br>
                <code>XLK</code> <code>XLV</code> <code>XLE</code> <code>ICLN</code><br><br>

                <strong>🥇 COMMODITIES:</strong><br>
                <code>GLD</code> <code>SLV</code> <code>EWZ</code><br><br>

                <strong>🏢 OTROS:</strong><br>
                <code>V</code> <code>PG</code> <code>UNH</code> <code>ABBV</code> <code>BRK.B</code><br><br>

                <em>Escribí el símbolo (ej: ETH, NVDA, SPY):</em>
            `);
        }, 300);
    } else if (opcion === 'asistente') {
        mercadoState.waitingFor = 'pregunta_inversion';
        addChatMessage('Asistente de inversiones', 'user');
        setTimeout(() => {
            addChatMessageHTML('bot', `
                <strong>🤖 Asistente de Inversiones</strong><br><br>
                Soy tu asistente virtual de mercados. Puedo ayudarte con:<br><br>
                • Análisis de acciones específicas<br>
                • Comparar activos<br>
                • Explicar conceptos de inversión<br>
                • Tendencias del mercado<br><br>
                <strong>Ejemplos de preguntas:</strong><br>
                • "¿Qué opinas de AAPL?"<br>
                • "Compara MSFT vs GOOGL"<br>
                • "¿Es buen momento para comprar tech?"<br>
                • "Análisis de NVDA"<br><br>
                <em>Escribí tu pregunta:</em>
            `);
        }, 300);
    }
}

// ============================================================================
// MÓDULO: MERCADO LABORAL - Búsqueda adaptada al CV
// ============================================================================

/**
 * Diccionarios de keywords para análisis ATS
 */
const LABORAL_CONFIG = {
    hardSkills: [
        'python', 'javascript', 'typescript', 'java', 'sql', 'excel',
        'power bi', 'powerbi', 'tableau', 'looker', 'qlik',
        'react', 'angular', 'vue', 'node', 'nodejs',
        'aws', 'azure', 'gcp', 'docker', 'kubernetes',
        'postgresql', 'mysql', 'mongodb', 'bigquery', 'snowflake', 'redshift',
        'spark', 'hadoop', 'airflow', 'dbt', 'etl',
        'tensorflow', 'pytorch', 'scikit', 'pandas', 'numpy',
        'n8n', 'zapier', 'power automate', 'make', 'integromat',
        'uipath', 'automation anywhere', 'blue prism', 'rpa',
        'figma', 'sketch', 'adobe', 'photoshop',
        'git', 'github', 'jira', 'confluence', 'notion',
        'salesforce', 'hubspot', 'sap', 'oracle',
        'alteryx', 'dax', 'power query', 'm language',
        'api', 'rest', 'graphql', 'html', 'css'
    ],

    softSkills: [
        'liderazgo', 'leadership', 'comunicación', 'communication',
        'trabajo en equipo', 'teamwork', 'gestión', 'management',
        'presentación', 'presentation', 'mentoría', 'mentoring',
        'stakeholder', 'negociación', 'negotiation'
    ],

    metodologias: [
        'agile', 'scrum', 'kanban', 'lean', 'six sigma',
        'design thinking', 'okr', 'kpi', 'pmp', 'itil'
    ],

    certificaciones: {
        'pl-300': 'Power BI Data Analyst',
        'pl-600': 'Power Platform Solution Architect',
        'pl-900': 'Power Platform Fundamentals',
        'dp-600': 'Fabric Analytics Engineer',
        'dp-900': 'Azure Data Fundamentals',
        'az-900': 'Azure Fundamentals',
        'aws certified': 'AWS Certification',
        'pmp': 'Project Management Professional'
    },

    cargos: {
        'Data & Analytics': [
            { titulo: 'Data Analyst', demanda: '🔥 Alta', salario: '$60-100k USD' },
            { titulo: 'BI Analyst', demanda: '🔥 Alta', salario: '$55-90k USD' },
            { titulo: 'Data Scientist', demanda: '🔥🔥 Muy Alta', salario: '$80-150k USD' },
            { titulo: 'Analytics Engineer', demanda: '🔥 Alta', salario: '$70-120k USD' },
            { titulo: 'BI Developer', demanda: '🔥 Alta', salario: '$65-110k USD' }
        ],
        'Power Platform': [
            { titulo: 'Power Platform Developer', demanda: '🔥🔥 Muy Alta', salario: '$70-120k USD' },
            { titulo: 'Power Platform Architect', demanda: '🔥🔥 Muy Alta', salario: '$90-150k USD' },
            { titulo: 'Power BI Developer', demanda: '🔥 Alta', salario: '$65-110k USD' },
            { titulo: 'Power Platform Consultant', demanda: '🔥 Alta', salario: '$75-130k USD' }
        ],
        'Automatización': [
            { titulo: 'Automation Engineer', demanda: '🔥🔥 Muy Alta', salario: '$65-120k USD' },
            { titulo: 'RPA Developer', demanda: '🔥 Alta', salario: '$60-100k USD' },
            { titulo: 'Integration Specialist', demanda: '🔥 Alta', salario: '$60-95k USD' },
            { titulo: 'Process Automation Consultant', demanda: '🔥🔥 Creciente', salario: '$70-115k USD' }
        ],
        'Desarrollo': [
            { titulo: 'Software Engineer', demanda: '🔥🔥 Muy Alta', salario: '$70-150k USD' },
            { titulo: 'Full Stack Developer', demanda: '🔥🔥 Muy Alta', salario: '$60-130k USD' },
            { titulo: 'Backend Developer', demanda: '🔥 Alta', salario: '$65-120k USD' },
            { titulo: 'Frontend Developer', demanda: '🔥 Alta', salario: '$55-110k USD' }
        ],
        'General': [
            { titulo: 'Technical Consultant', demanda: '🔥 Alta', salario: '$60-100k USD' },
            { titulo: 'Business Analyst', demanda: '🔥 Alta', salario: '$55-90k USD' },
            { titulo: 'Project Manager', demanda: '🔥 Alta', salario: '$65-110k USD' }
        ]
    },

    plataformas: {
        remoto: [
            { nombre: 'LinkedIn', url: 'linkedin.com/jobs', tip: 'Filtrar por Remote, activar alertas' },
            { nombre: 'We Work Remotely', url: 'weworkremotely.com', tip: 'Solo 100% remoto' },
            { nombre: 'Remote OK', url: 'remoteok.com', tip: 'Salarios transparentes' },
            { nombre: 'Turing', url: 'turing.com', tip: 'Empresas US, pago en USD' },
            { nombre: 'Toptal', url: 'toptal.com', tip: 'Top 3% freelancers' }
        ],
        latam: [
            { nombre: 'GetOnBoard', url: 'getonboard.com', tip: 'Startups tech LATAM' },
            { nombre: 'Torre', url: 'torre.ai', tip: 'AI matching' },
            { nombre: 'Workana', url: 'workana.com', tip: 'Freelance LATAM' },
            { nombre: 'Computrabajo', url: 'computrabajo.com.ar', tip: 'Alto volumen Argentina' }
        ],
        europa: [
            { nombre: 'LinkedIn EU', url: 'linkedin.com', tip: 'Filtrar por país EU' },
            { nombre: 'Indeed EU', url: 'indeed.es', tip: 'Varía por país' },
            { nombre: 'Glassdoor', url: 'glassdoor.com', tip: 'Reviews y salarios' }
        ],
        microsoft: [
            { nombre: 'Microsoft Careers', url: 'careers.microsoft.com', tip: 'Directo a Microsoft' },
            { nombre: 'LinkedIn Microsoft', url: 'linkedin.com/company/microsoft/jobs', tip: 'Jobs de MS Partners' }
        ]
    }
};

/**
 * Handler principal de opciones laborales
 */
function handleLaboralOption(opcion) {
    switch(opcion) {
        case 'cv':
            iniciarAnalisisCV();
            break;
        case 'busqueda':
            iniciarBusquedaAdaptada();
            break;
        case 'reporte':
            mercadoState.active = false;
            mercadoState.waitingFor = null;
            addChatMessage('Generar reporte de empleos', 'user');
            fetchMercadoLaboral();
            break;
        default:
            addChatMessage('Opción no reconocida', 'bot');
    }
}

/**
 * Inicia el flujo de análisis de CV
 */
function iniciarAnalisisCV() {
    mercadoState.waitingFor = 'cv_descripcion';
    mercadoState.cvData = {};
    addChatMessage('Optimización de CV', 'user');

    setTimeout(() => {
        addChatMessageHTML('bot', `
            <strong>📄 Optimización de CV - Metodología STAR + ATS</strong><br><br>
            Voy a analizar tu CV y darte feedback crítico para:<br>
            • ✅ Pasar filtros ATS<br>
            • ✅ Identificar keywords faltantes<br>
            • ✅ Reescribir logros con metodología STAR<br><br>
            <strong style="color: #ff6b6b;">⚠️ Seré directo - te diré exactamente qué falta.</strong><br><br>
            <strong>Paso 1:</strong> Pegá la descripción del puesto al que querés aplicar.<br>
            <em>(O escribí "general" para un análisis sin puesto específico)</em>
        `);
    }, 300);
}

/**
 * Inicia búsqueda adaptada al CV
 * Si ya hay CV analizado, usa esos datos
 * Si no, pide que pegue el CV primero
 */
function iniciarBusquedaAdaptada() {
    addChatMessage('Búsqueda de Ofertas', 'user');

    // Si ya hay datos de CV previos, usar esos
    if (mercadoState.cvData && mercadoState.cvData.perfilExtraido) {
        setTimeout(() => {
            generarBusquedaPersonalizada(mercadoState.cvData.perfilExtraido);
        }, 300);
        return;
    }

    // Si no hay CV, pedir que lo pegue
    mercadoState.waitingFor = 'cv_para_busqueda';

    setTimeout(() => {
        addChatMessageHTML('bot', `
            <strong>🔍 Búsqueda Adaptada a Tu Perfil</strong><br><br>
            Para darte recomendaciones <strong>personalizadas</strong>, necesito conocer tu perfil.<br><br>
            <strong>Pegá tu CV</strong> (copiá y pegá el texto) y te recomendaré:<br>
            • 🎯 Títulos de cargos exactos para vos<br>
            • 📍 Plataformas donde buscar<br>
            • 💡 Keywords para alertas<br>
            • 💰 Rangos salariales estimados<br><br>
            <em>Pegá tu CV abajo:</em>
        `);
    }, 300);
}

/**
 * Extrae perfil profesional del CV
 */
function extraerPerfilDeCV(cvTexto) {
    const cvLower = cvTexto.toLowerCase();
    const perfil = {
        hardSkills: [],
        softSkills: [],
        metodologias: [],
        certificaciones: [],
        area: 'General',
        nivel: 'Mid-level',
        ubicacion: '',
        ciudadaniaEU: false,
        ingles: false,
        añosExp: 0
    };

    // Extraer hard skills
    LABORAL_CONFIG.hardSkills.forEach(skill => {
        if (cvLower.includes(skill.toLowerCase())) {
            perfil.hardSkills.push(skill);
        }
    });

    // Extraer soft skills
    LABORAL_CONFIG.softSkills.forEach(skill => {
        if (cvLower.includes(skill.toLowerCase())) {
            perfil.softSkills.push(skill);
        }
    });

    // Extraer metodologías
    LABORAL_CONFIG.metodologias.forEach(met => {
        if (cvLower.includes(met.toLowerCase())) {
            perfil.metodologias.push(met);
        }
    });

    // Detectar certificaciones
    Object.keys(LABORAL_CONFIG.certificaciones).forEach(cert => {
        if (cvLower.includes(cert.toLowerCase())) {
            perfil.certificaciones.push(LABORAL_CONFIG.certificaciones[cert]);
        }
    });

    // Detectar área principal
    if (/power platform|power bi|power automate|pl-300|pl-600/i.test(cvTexto)) {
        perfil.area = 'Power Platform';
    } else if (/n8n|zapier|rpa|automation|automatización|uipath/i.test(cvTexto)) {
        perfil.area = 'Automatización';
    } else if (/data analy|bi |business intelligence|tableau|looker|bigquery/i.test(cvTexto)) {
        perfil.area = 'Data & Analytics';
    } else if (/developer|desarrollador|software|full stack|backend|frontend|react|angular/i.test(cvTexto)) {
        perfil.area = 'Desarrollo';
    }

    // Detectar nivel
    if (/senior|sr\.|lead|principal|architect|gerente|manager|director/i.test(cvTexto)) {
        perfil.nivel = 'Senior';
    } else if (/junior|jr\.|trainee|pasante|intern/i.test(cvTexto)) {
        perfil.nivel = 'Junior';
    }

    // Detectar ciudadanía EU
    if (/ciudadanía italiana|ciudadania italiana|italian citizenship|pasaporte italiano|pasaporte europeo/i.test(cvTexto)) {
        perfil.ciudadaniaEU = true;
    }

    // Detectar inglés
    if (/inglés|english|c1|c2|first certificate|toefl|ielts|proficient|fluent|avanzado/i.test(cvTexto)) {
        perfil.ingles = true;
    }

    // Detectar ubicación
    if (/argentina|buenos aires|córdoba|rosario/i.test(cvTexto)) {
        perfil.ubicacion = 'Argentina';
    } else if (/latam|latinoamérica|chile|colombia|méxico/i.test(cvTexto)) {
        perfil.ubicacion = 'LATAM';
    }

    // Estimar años de experiencia (búsqueda de fechas)
    const fechas = cvTexto.match(/20\d{2}/g);
    if (fechas && fechas.length > 0) {
        const años = fechas.map(Number);
        const min = Math.min(...años);
        const max = Math.max(...años);
        perfil.añosExp = max - min;
    }

    return perfil;
}

/**
 * Genera búsqueda personalizada basada en el perfil
 */
function generarBusquedaPersonalizada(perfil) {
    addChatMessageHTML('bot', `
        <div class="mercado-loading">
            <div class="mercado-spinner"></div>
            <span>Analizando tu perfil y generando recomendaciones...</span>
        </div>
    `);

    setTimeout(() => {
        const cargos = LABORAL_CONFIG.cargos[perfil.area] || LABORAL_CONFIG.cargos['General'];

        // Seleccionar plataformas según perfil
        let plataformas = [...LABORAL_CONFIG.plataformas.remoto];

        if (perfil.ubicacion === 'Argentina' || perfil.ubicacion === 'LATAM') {
            plataformas = [...plataformas, ...LABORAL_CONFIG.plataformas.latam];
        }

        if (perfil.ciudadaniaEU) {
            plataformas = [...plataformas, ...LABORAL_CONFIG.plataformas.europa];
        }

        if (perfil.area === 'Power Platform' && perfil.certificaciones.length > 0) {
            plataformas = [...plataformas, ...LABORAL_CONFIG.plataformas.microsoft];
        }

        // Generar HTML de resultados
        let html = `
            <strong>🎯 BÚSQUEDA PERSONALIZADA PARA TU PERFIL</strong><br><br>

            <div style="background: #1a2d4a; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <strong>📋 Tu Perfil Detectado:</strong><br>
                • Área: <strong>${perfil.area}</strong><br>
                • Nivel: <strong>${perfil.nivel}</strong> (~${perfil.añosExp}+ años)<br>
                • Skills principales: <strong>${perfil.hardSkills.slice(0, 5).join(', ')}</strong><br>
                ${perfil.certificaciones.length > 0 ? `• Certificaciones: <strong>${perfil.certificaciones.join(', ')}</strong><br>` : ''}
                ${perfil.ciudadaniaEU ? '• 🇪🇺 <strong>Ciudadanía Europea</strong> - Podés trabajar en EU sin visa<br>' : ''}
                ${perfil.ingles ? '• 🗣️ <strong>Inglés avanzado</strong> - Podés aplicar a roles globales<br>' : ''}
            </div>

            <strong>💼 CARGOS RECOMENDADOS PARA VOS:</strong><br><br>
        `;

        cargos.forEach(cargo => {
            html += `
                <div style="background: #1a3d1a; padding: 10px; border-radius: 6px; margin-bottom: 8px;">
                    <strong>🎯 ${cargo.titulo}</strong><br>
                    <small>Demanda: ${cargo.demanda} | Salario: ${cargo.salario}</small>
                </div>
            `;
        });

        html += `<br><strong>📍 DÓNDE BUSCAR (según tu perfil):</strong><br><br>`;

        // Eliminar duplicados
        const urlsVistas = new Set();
        plataformas.filter(p => {
            if (urlsVistas.has(p.url)) return false;
            urlsVistas.add(p.url);
            return true;
        }).slice(0, 8).forEach(plat => {
            html += `
                <div style="background: #2d2d1a; padding: 10px; border-radius: 6px; margin-bottom: 8px;">
                    <strong>🌐 ${plat.nombre}</strong><br>
                    <a href="https://${plat.url}" target="_blank" style="color: #60a5fa;">${plat.url}</a><br>
                    <small>${plat.tip}</small>
                </div>
            `;
        });

        html += `<br><strong>⚡ KEYWORDS PARA TUS ALERTAS:</strong><br>`;
        html += `<code style="background: #1a1a2e; padding: 8px; display: block; border-radius: 4px; margin: 5px 0;">`;

        const keywords = [
            ...cargos.map(c => c.titulo),
            ...perfil.hardSkills.slice(0, 3)
        ].slice(0, 8);
        html += keywords.join(' | ');
        html += `</code><br><br>`;

        html += `
            <strong>💡 ESTRATEGIA RECOMENDADA:</strong><br>
            • Configurá alertas diarias en LinkedIn con estos títulos<br>
            • Aplicá en las primeras 24-48hs de publicada la oferta<br>
            • Personalizá tu CV para cada aplicación<br>
            ${perfil.ciudadaniaEU ? '• <strong>Usá tu ciudadanía EU</strong> - Filtrá por España, Italia, Alemania<br>' : ''}
            ${perfil.certificaciones.length > 0 ? '• <strong>Destacá tus certificaciones</strong> en el título de LinkedIn<br>' : ''}
            <br>
            <button class="mercado-btn" onclick="handleLaboralOption('cv')">📄 Optimizar mi CV</button>
            <button class="mercado-btn" onclick="handleLaboralOption('reporte')">📊 Ver ofertas actuales</button>
        `;

        addChatMessageHTML('bot', html);
        mercadoState.waitingFor = null;
    }, 1500);
}

/**
 * Analiza CV y genera feedback crítico
 */
async function analizarYOptimizarCV() {
    const { descripcionPuesto, cvContenido } = mercadoState.cvData;

    if (!cvContenido) {
        addChatMessage('❌ No se encontró el CV. Por favor, reiniciá el proceso.', 'bot');
        return;
    }

    addChatMessageHTML('bot', `
        <div class="mercado-loading">
            <div class="mercado-spinner"></div>
            <span>Analizando tu CV con metodología STAR...</span>
        </div>
    `);

    setTimeout(() => {
        // Extraer perfil del CV
        const perfil = extraerPerfilDeCV(cvContenido);
        mercadoState.cvData.perfilExtraido = perfil;

        // Si hay descripción de puesto, calcular match
        let matchScore = null;
        let keywordsFaltantes = [];

        if (descripcionPuesto && descripcionPuesto.toLowerCase() !== 'general') {
            const perfilPuesto = extraerPerfilDeCV(descripcionPuesto);

            // Calcular match
            const skillsPuesto = perfilPuesto.hardSkills;
            const skillsCV = perfil.hardSkills;

            if (skillsPuesto.length > 0) {
                const coincidentes = skillsPuesto.filter(s =>
                    skillsCV.some(cv => cv.toLowerCase().includes(s.toLowerCase()))
                );
                matchScore = Math.round((coincidentes.length / skillsPuesto.length) * 100);
                keywordsFaltantes = skillsPuesto.filter(s =>
                    !skillsCV.some(cv => cv.toLowerCase().includes(s.toLowerCase()))
                );
            }
        }

        // Detectar logros para STAR
        const logros = detectarLogrosEnCV(cvContenido);

        // Generar HTML de resultados
        let html = `<strong>📊 ANÁLISIS CRÍTICO DE TU CV</strong><br><br>`;

        // Match Score si hay puesto
        if (matchScore !== null) {
            const scoreColor = matchScore >= 70 ? '#1a3d1a' : matchScore >= 40 ? '#3d3d1a' : '#3d1a1a';
            const scoreIcon = matchScore >= 70 ? '✅' : matchScore >= 40 ? '⚠️' : '❌';

            html += `
                <div style="background: ${scoreColor}; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                    <strong>🎯 Match ATS: ${matchScore}%</strong><br>
                    ${scoreIcon} ${matchScore >= 70 ? 'Buen match' : matchScore >= 40 ? 'Necesita mejoras' : 'Probablemente rechazado por ATS'}
                </div>
            `;

            if (keywordsFaltantes.length > 0) {
                html += `
                    <strong style="color: #ff6b6b;">❌ KEYWORDS FALTANTES (agregá estos):</strong><br>
                    ${keywordsFaltantes.map(k => `• <strong>${k}</strong>`).join('<br>')}<br><br>
                `;
            }
        }

        // Skills detectadas
        html += `
            <strong style="color: #4ade80;">✅ HARD SKILLS DETECTADAS:</strong><br>
            ${perfil.hardSkills.length > 0 ? perfil.hardSkills.join(', ') : 'Ninguna clara - <strong style="color:#ff6b6b">CRÍTICO</strong>'}<br><br>
        `;

        if (perfil.certificaciones.length > 0) {
            html += `
                <strong style="color: #60a5fa;">🏆 CERTIFICACIONES:</strong><br>
                ${perfil.certificaciones.join(', ')}<br><br>
            `;
        }

        // Críticas directas
        html += `<strong>📝 CRÍTICAS DIRECTAS:</strong><br>`;

        const criticas = generarCriticasCV(cvContenido, perfil);
        criticas.forEach(c => {
            html += `${c}<br>`;
        });

        // Logros STAR
        if (logros.length > 0) {
            html += `<br><strong>🌟 TUS LOGROS EN FORMATO STAR:</strong><br><br>`;

            logros.slice(0, 3).forEach((logro, i) => {
                html += `
                    <div style="background: #1a2d4a; padding: 12px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid #60a5fa;">
                        <strong>Logro ${i + 1}:</strong> "${logro.original}"<br><br>
                        <strong>S</strong>ituación: [Describí el contexto/problema]<br>
                        <strong>T</strong>area: [Tu responsabilidad específica]<br>
                        <strong>A</strong>cción: ${logro.accion}<br>
                        <strong>R</strong>esultado: ${logro.resultado}<br><br>
                        <em style="color: #4ade80;">→ Sugerencia: "${logro.sugerencia}"</em>
                    </div>
                `;
            });
        }

        html += `
            <br><strong>🎯 ACCIONES INMEDIATAS:</strong><br>
            1. Agregá las keywords faltantes de forma natural<br>
            2. Cuantificá TODOS tus logros (%, $, tiempo)<br>
            3. Usá verbos de acción: Lideré, Implementé, Optimicé<br><br>

            <button class="mercado-btn" onclick="handleLaboralOption('busqueda')">🔍 Ver dónde aplicar</button>
            <button class="mercado-btn" onclick="handleLaboralOption('cv')">🔄 Analizar otro puesto</button>
        `;

        addChatMessageHTML('bot', html);
    }, 2000);
}

/**
 * Detecta logros en el CV para formato STAR
 */
function detectarLogrosEnCV(cv) {
    const logros = [];
    const lineas = cv.split(/[\n.]/);

    const patronLogro = /(\d+%|\$[\d,]+|aumenté|reduje|implementé|lideré|desarrollé|creé|optimicé|mejoré|automaticé|diseñé|achieved|increased|reduced|led|developed|created|built)/i;

    lineas.forEach(linea => {
        const l = linea.trim();
        if (patronLogro.test(l) && l.length > 25) {
            const tieneNumeros = /\d+/.test(l);

            logros.push({
                original: l,
                accion: l,
                resultado: tieneNumeros ? 'Cuantificado ✓' : '[FALTA: Agregar métrica]',
                sugerencia: tieneNumeros ? l : l + ', logrando [X% de mejora / $X de ahorro]'
            });
        }
    });

    return logros.slice(0, 5);
}

/**
 * Genera críticas específicas del CV
 */
function generarCriticasCV(cv, perfil) {
    const criticas = [];

    if (!/\d+%/.test(cv)) {
        criticas.push('🔴 <strong>Sin métricas %</strong> - Agregá logros con porcentajes (ej: "Aumenté eficiencia en 30%")');
    }

    if (!/\$[\d,]+/.test(cv) && !/USD|ARS|EUR/i.test(cv)) {
        criticas.push('🟡 <strong>Sin impacto monetario</strong> - Si manejaste presupuestos, incluilos');
    }

    if (cv.length < 800) {
        criticas.push('🟡 <strong>CV muy corto</strong> - Expandí tu experiencia con más detalles');
    }

    if (!/linkedin/i.test(cv)) {
        criticas.push('🟡 <strong>Sin LinkedIn</strong> - Agregá el link a tu perfil');
    }

    if (!/github|portfolio|behance/i.test(cv) && perfil.area !== 'General') {
        criticas.push('🟡 <strong>Sin portfolio/GitHub</strong> - Para roles técnicos es importante');
    }

    if (perfil.hardSkills.length < 3) {
        criticas.push('🔴 <strong>Pocas skills técnicas claras</strong> - Listá tus herramientas explícitamente');
    }

    if (criticas.length === 0) {
        criticas.push('✅ Tu CV tiene buena estructura. Siempre se puede mejorar con más métricas.');
    }

    return criticas;
}

/**
 * Procesa búsqueda laboral desde CV pegado
 */
function procesarBusquedaLaboral(cvTexto) {
    const perfil = extraerPerfilDeCV(cvTexto);
    mercadoState.cvData = mercadoState.cvData || {};
    mercadoState.cvData.perfilExtraido = perfil;
    mercadoState.cvData.cvContenido = cvTexto;

    generarBusquedaPersonalizada(perfil);
}

// Procesar consulta de símbolo específico
async function consultarAccion(simbolo) {
    const sym = simbolo.toUpperCase().trim();

    addChatMessageHTML('bot', `
        <div class="mercado-loading">
            <div class="mercado-spinner"></div>
            <span>Analizando ${sym}...</span>
        </div>
    `);

    try {
        const data = await fetchStockDetail(sym);

        if (!data || data.error) {
            addChatMessageHTML('bot', `
                ❌ No encontré datos para <strong>${sym}</strong>.<br><br>
                Verificá que el símbolo sea correcto. Algunos ejemplos válidos:<br>
                AAPL, MSFT, GOOGL, TSLA, NVDA, SPY, QQQ
            `);
            return;
        }

        const opinion = generateExpertOpinion(data);

        addChatMessageHTML('bot', `
            <div style="background: linear-gradient(135deg, #1e1e3f, #2d2d5a); padding: 15px; border-radius: 12px; border-left: 4px solid ${data.cambio >= 0 ? '#38ef7d' : '#ff6b6b'};">
                <strong style="font-size: 1.2em;">${data.simbolo} - ${data.nombre}</strong><br>
                <span style="opacity: 0.7;">${data.categoria}</span><br><br>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 10px 0;">
                    <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px;">
                        <div style="opacity: 0.7; font-size: 0.8em;">Precio actual</div>
                        <div style="font-size: 1.4em; font-weight: bold;">$${data.precio.toFixed(2)}</div>
                    </div>
                    <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px;">
                        <div style="opacity: 0.7; font-size: 0.8em;">Cambio diario</div>
                        <div style="font-size: 1.4em; font-weight: bold; color: ${data.cambio >= 0 ? '#38ef7d' : '#ff6b6b'};">
                            ${data.cambio >= 0 ? '+' : ''}${data.cambio.toFixed(2)}%
                        </div>
                    </div>
                </div>

                ${data.high && data.low ? `
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 10px 0;">
                    <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px;">
                        <div style="opacity: 0.7; font-size: 0.8em;">Máximo del día</div>
                        <div style="font-weight: bold; color: #38ef7d;">$${data.high.toFixed(2)}</div>
                    </div>
                    <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px;">
                        <div style="opacity: 0.7; font-size: 0.8em;">Mínimo del día</div>
                        <div style="font-weight: bold; color: #ff6b6b;">$${data.low.toFixed(2)}</div>
                    </div>
                </div>
                ` : ''}

                <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.1);">
                    <strong>🧠 Opinión del Experto:</strong><br>
                    <div style="margin-top: 8px; line-height: 1.5;">${opinion}</div>
                </div>

                <div style="margin-top: 15px; display: flex; gap: 10px; flex-wrap: wrap;">
                    <button class="mercado-btn" style="flex: 1; min-width: 120px;" onclick="consultarAccion('${sym}')">🔄 Actualizar</button>
                    <button class="mercado-btn" style="flex: 1; min-width: 120px;" onclick="handleFinancieroOption('consultar')">🔍 Otra acción</button>
                </div>
            </div>
        `);

    } catch (error) {
        console.error('Error consultando acción:', error);
        addChatMessage('❌ Error al obtener datos. Intentá de nuevo.', 'bot');
    }
}

// Obtener datos detallados de una acción
async function fetchStockDetail(simbolo) {
    // Buscar en datos conocidos
    const knownStock = STOCK_DATA.find(s => s.simbolo === simbolo);

    // Si hay API key, usar Finnhub
    if (FINNHUB_API_KEY) {
        try {
            const url = `https://finnhub.io/api/v1/quote?symbol=${simbolo}&token=${FINNHUB_API_KEY}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data && data.c && data.c > 0) {
                return {
                    simbolo: simbolo,
                    nombre: knownStock?.nombre || simbolo,
                    categoria: knownStock?.categoria || 'Acción',
                    precio: data.c,
                    cambio: data.dp || 0,
                    high: data.h,
                    low: data.l,
                    apertura: data.o,
                    cierre_anterior: data.pc
                };
            }
        } catch (e) {
            console.warn('Error Finnhub:', e);
        }
    }

    // Datos de demostración - LISTA MAESTRA COMPLETA
    const preciosDemo = {
        // ═══ CRIPTOMONEDAS ═══
        'DOT': { precio: 7.50, nombre: 'Polkadot', categoria: 'Cripto' },
        'ETH': { precio: 3200, nombre: 'Ethereum', categoria: 'Cripto' },
        'ADA': { precio: 0.65, nombre: 'Cardano', categoria: 'Cripto' },

        // ═══ ACCIONES TECH (Big Tech) ═══
        'AAPL': { precio: 185, nombre: 'Apple Inc.', categoria: 'Tech' },
        'MSFT': { precio: 420, nombre: 'Microsoft Corporation', categoria: 'Tech' },
        'GOOGL': { precio: 175, nombre: 'Alphabet Inc. (Google)', categoria: 'Tech' },
        'AMZN': { precio: 190, nombre: 'Amazon.com Inc.', categoria: 'Tech' },
        'TSLA': { precio: 245, nombre: 'Tesla Inc.', categoria: 'Tech' },
        'NVDA': { precio: 480, nombre: 'NVIDIA Corporation', categoria: 'Tech' },
        'AMD': { precio: 145, nombre: 'Advanced Micro Devices', categoria: 'Tech' },
        'ADBE': { precio: 520, nombre: 'Adobe Inc.', categoria: 'Tech' },

        // ═══ ACCIONES USA (Blue Chips) ═══
        'T': { precio: 17, nombre: 'AT&T Inc.', categoria: 'Telecom' },
        'UNH': { precio: 540, nombre: 'UnitedHealth Group', categoria: 'Healthcare' },
        'PG': { precio: 165, nombre: 'Procter & Gamble', categoria: 'Consumer' },
        'V': { precio: 280, nombre: 'Visa Inc.', categoria: 'Financial' },
        'PEP': { precio: 175, nombre: 'PepsiCo Inc.', categoria: 'Consumer' },
        'ABBV': { precio: 175, nombre: 'AbbVie Inc.', categoria: 'Healthcare' },
        'CRSP': { precio: 55, nombre: 'CRISPR Therapeutics', categoria: 'Biotech' },
        'AES': { precio: 18, nombre: 'AES Corporation', categoria: 'Energy' },

        // ═══ ACCIONES LATAM ═══
        'YPF': { precio: 22, nombre: 'YPF S.A. (Argentina)', categoria: 'Energy LATAM' },
        'GLOB': { precio: 210, nombre: 'Globant S.A. (Argentina)', categoria: 'Tech LATAM' },
        'CIB': { precio: 32, nombre: 'Bancolombia S.A.', categoria: 'Financial LATAM' },

        // ═══ BERKSHIRE ═══
        'BRK.B': { precio: 410, nombre: 'Berkshire Hathaway B', categoria: 'Holding' },
        'BRK.A': { precio: 620000, nombre: 'Berkshire Hathaway A', categoria: 'Holding' },
        'BRK': { precio: 410, nombre: 'Berkshire Hathaway B', categoria: 'Holding' },
        'BBRK': { precio: 410, nombre: 'Berkshire Hathaway B', categoria: 'Holding' },
        'B': { precio: 410, nombre: 'Berkshire Hathaway B', categoria: 'Holding' },

        // ═══ ETFs ÍNDICES ═══
        'SPY': { precio: 590, nombre: 'SPDR S&P 500 ETF', categoria: 'ETF Índice' },
        'QQQ': { precio: 510, nombre: 'Invesco QQQ (Nasdaq 100)', categoria: 'ETF Índice' },
        'DIA': { precio: 425, nombre: 'SPDR Dow Jones ETF', categoria: 'ETF Índice' },

        // ═══ ETFs SECTORIALES ═══
        'XLK': { precio: 210, nombre: 'Technology Select Sector', categoria: 'ETF Tech' },
        'XLV': { precio: 145, nombre: 'Health Care Select Sector', categoria: 'ETF Healthcare' },
        'XLE': { precio: 88, nombre: 'Energy Select Sector', categoria: 'ETF Energy' },
        'ICLN': { precio: 14, nombre: 'iShares Global Clean Energy', categoria: 'ETF Clean Energy' },

        // ═══ ETFs COMMODITIES ═══
        'GLD': { precio: 220, nombre: 'SPDR Gold Shares', categoria: 'ETF Oro' },
        'SLV': { precio: 26, nombre: 'iShares Silver Trust', categoria: 'ETF Plata' },

        // ═══ ETFs REGIONALES ═══
        'EWZ': { precio: 28, nombre: 'iShares MSCI Brazil', categoria: 'ETF Brasil' },

        // ═══ FONDOS ESPECIALES ═══
        'BYMAT': { precio: 1250, nombre: 'ByMA (Bolsas y Mercados Arg)', categoria: 'Fondo ARG' },
        'SMJP': { precio: 85, nombre: 'SMJP Fund', categoria: 'Fondo' },
        'MKOT': { precio: 42, nombre: 'MKOT Fund', categoria: 'Fondo' },
        'RAX': { precio: 95, nombre: 'RAX Fund', categoria: 'Fondo' },
        'PIBIT': { precio: 120, nombre: 'PIBIT Fund', categoria: 'Fondo' },
        'RSMH': { precio: 68, nombre: 'RSMH Fund', categoria: 'Fondo' }
    };

    // Buscar en preciosDemo (soporta variantes como BRK, BBRK, BRK.B)
    let demoData = preciosDemo[simbolo];

    // Si no encuentra, buscar en STOCK_DATA
    if (!demoData) {
        const stockInfo = buscarActivo(simbolo);
        if (stockInfo) {
            // Generar precio simulado basado en categoría
            const precioBase = stockInfo.tipo === 'crypto' ? Math.random() * 1000 + 10 :
                              stockInfo.tipo === 'etf' ? Math.random() * 300 + 50 :
                              Math.random() * 500 + 20;
            demoData = {
                precio: precioBase,
                nombre: stockInfo.nombre,
                categoria: stockInfo.categoria
            };
        }
    }

    if (!demoData) {
        return { error: true };
    }

    const variacion = (Math.random() - 0.5) * 6;
    const cambio = (Math.random() - 0.5) * 8;
    const precio = demoData.precio * (1 + variacion / 100);

    return {
        simbolo: simbolo,
        nombre: demoData.nombre,
        categoria: simbolo.length <= 3 && ['SPY', 'QQQ', 'DIA', 'IWM', 'VTI'].includes(simbolo) ? 'ETF' : 'Acción',
        precio: precio,
        cambio: cambio,
        high: precio * 1.02,
        low: precio * 0.98,
        apertura: precio * (1 + (Math.random() - 0.5) * 0.02),
        cierre_anterior: precio * (1 - cambio / 100),
        esDemo: true
    };
}

// Generar opinión de experto basada en datos
function generateExpertOpinion(data) {
    const { simbolo, cambio, precio, categoria } = data;
    let opinion = '';

    // Análisis basado en cambio diario
    if (cambio > 3) {
        opinion = `📈 <strong>${simbolo}</strong> está mostrando un <strong>movimiento alcista fuerte</strong> (+${cambio.toFixed(2)}%). `;
        opinion += `Este tipo de subidas pueden indicar noticias positivas o momentum del mercado. `;
        opinion += `<span style="color: #ffd93d;">⚠️ Precaución:</span> Después de subidas fuertes puede haber correcciones. Considerá esperar una consolidación antes de entrar.`;
    } else if (cambio > 1) {
        opinion = `📈 <strong>${simbolo}</strong> tiene un <strong>día positivo moderado</strong> (+${cambio.toFixed(2)}%). `;
        opinion += `El activo muestra fortaleza sin ser excesivamente volátil. `;
        opinion += `Si estás considerando entrar, este tipo de movimientos suelen ser más sostenibles que las subidas explosivas.`;
    } else if (cambio > -1) {
        opinion = `➡️ <strong>${simbolo}</strong> está <strong>lateral</strong> (${cambio >= 0 ? '+' : ''}${cambio.toFixed(2)}%). `;
        opinion += `El precio se mantiene estable, lo cual puede indicar consolidación. `;
        opinion += `Es un buen momento para analizar la tendencia de mediano plazo antes de tomar decisiones.`;
    } else if (cambio > -3) {
        opinion = `📉 <strong>${simbolo}</strong> muestra una <strong>corrección leve</strong> (${cambio.toFixed(2)}%). `;
        opinion += `Las correcciones pequeñas son normales y saludables en tendencias alcistas. `;
        opinion += `Podría ser una oportunidad de entrada si tu análisis de largo plazo es positivo.`;
    } else {
        opinion = `📉 <strong>${simbolo}</strong> está en <strong>caída significativa</strong> (${cambio.toFixed(2)}%). `;
        opinion += `<span style="color: #ff6b6b;">⚠️ Alerta:</span> Caídas fuertes pueden indicar problemas o pánico del mercado. `;
        opinion += `Investigá las noticias antes de actuar. "No atrapes cuchillos cayendo" - esperá estabilización.`;
    }

    // Agregar contexto por tipo de activo
    if (categoria === 'ETF') {
        opinion += `<br><br>💡 <strong>Nota:</strong> Como ETF, ${simbolo} ofrece diversificación automática, reduciendo el riesgo vs acciones individuales.`;
    }

    // Agregar disclaimer
    opinion += `<br><br><span style="font-size: 0.85em; opacity: 0.7;">⚠️ Esto no es asesoramiento financiero. Hacé tu propia investigación (DYOR) antes de invertir.</span>`;

    if (data.esDemo) {
        opinion += `<br><span style="font-size: 0.8em; opacity: 0.6;">📊 Datos de demostración. Para datos reales, configurá una API key de Finnhub.</span>`;
    }

    return opinion;
}

// Procesar pregunta al asistente de inversiones
async function procesarPreguntaInversion(pregunta) {
    const preguntaLower = pregunta.toLowerCase();

    // Detectar si menciona un símbolo específico
    const simbolosConocidos = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'NVDA', 'META', 'SPY', 'QQQ', 'MELI', 'GGAL', 'AMD', 'NFLX', 'DIS', 'V', 'JPM', 'BAC', 'BABA', 'YPF'];
    let simboloMencionado = null;

    for (const sym of simbolosConocidos) {
        if (preguntaLower.includes(sym.toLowerCase())) {
            simboloMencionado = sym;
            break;
        }
    }

    // Si menciona un símbolo específico, mostrar análisis
    if (simboloMencionado) {
        await consultarAccion(simboloMencionado);
        return;
    }

    // Respuestas a preguntas generales
    let respuesta = '';

    if (preguntaLower.includes('tech') || preguntaLower.includes('tecnología') || preguntaLower.includes('tecnologia')) {
        respuesta = `
            <strong>🖥️ Sector Tecnológico</strong><br><br>
            El sector tech sigue siendo uno de los más dinámicos del mercado:<br><br>
            <strong>Líderes actuales:</strong><br>
            • <strong>NVDA</strong> - Líder en AI/chips<br>
            • <strong>MSFT</strong> - Cloud + AI (Copilot)<br>
            • <strong>AAPL</strong> - Ecosistema sólido<br>
            • <strong>GOOGL</strong> - Publicidad + AI<br><br>
            <strong>Tendencias clave:</strong><br>
            • Inteligencia Artificial está impulsando valuaciones<br>
            • Cloud computing sigue creciendo<br>
            • Semiconductores con demanda fuerte<br><br>
            💡 <em>¿Querés análisis de alguna acción específica? Escribí el símbolo.</em>
        `;
    } else if (preguntaLower.includes('etf') || preguntaLower.includes('diversific')) {
        respuesta = `
            <strong>📊 ETFs Recomendados para Diversificar</strong><br><br>
            <strong>Mercado general:</strong><br>
            • <strong>SPY</strong> - S&P 500 (500 empresas grandes)<br>
            • <strong>QQQ</strong> - Nasdaq 100 (tech heavy)<br>
            • <strong>VTI</strong> - Todo el mercado US<br><br>
            <strong>Por sector:</strong><br>
            • <strong>XLK</strong> - Tecnología<br>
            • <strong>XLF</strong> - Financiero<br>
            • <strong>XLE</strong> - Energía<br><br>
            <strong>Ventajas de ETFs:</strong><br>
            ✅ Diversificación automática<br>
            ✅ Menores comisiones<br>
            ✅ Menos riesgo que acciones individuales<br><br>
            💡 <em>Para empezar, SPY o QQQ son excelentes opciones.</em>
        `;
    } else if (preguntaLower.includes('argentina') || preguntaLower.includes('arg') || preguntaLower.includes('cedear')) {
        respuesta = `
            <strong>🇦🇷 Acciones Argentinas (ADRs)</strong><br><br>
            <strong>ADRs argentinos en NYSE:</strong><br>
            • <strong>MELI</strong> - MercadoLibre ($1800+)<br>
            • <strong>GGAL</strong> - Banco Galicia<br>
            • <strong>YPF</strong> - Petrolera estatal<br>
            • <strong>BMA</strong> - Banco Macro<br>
            • <strong>PAM</strong> - Pampa Energía<br><br>
            <strong>CEDEARs populares:</strong><br>
            Los CEDEARs te permiten invertir en empresas internacionales desde Argentina en pesos.<br><br>
            ⚠️ <strong>Nota:</strong> Las acciones argentinas tienen mayor volatilidad debido al riesgo país.<br><br>
            💡 <em>¿Querés análisis de MELI, GGAL o YPF?</em>
        `;
    } else if (preguntaLower.includes('principiante') || preguntaLower.includes('empezar') || preguntaLower.includes('comenzar') || preguntaLower.includes('nuevo')) {
        respuesta = `
            <strong>🎯 Guía para Principiantes</strong><br><br>
            <strong>Pasos recomendados:</strong><br><br>
            <strong>1. Educación primero</strong><br>
            Aprendé conceptos básicos antes de invertir dinero real.<br><br>
            <strong>2. Empezá con ETFs</strong><br>
            SPY o QQQ son ideales para empezar - diversificación automática.<br><br>
            <strong>3. Invertí solo lo que puedas perder</strong><br>
            El mercado puede ser volátil a corto plazo.<br><br>
            <strong>4. Pensá a largo plazo</strong><br>
            Históricamente, el S&P 500 rinde ~10% anual promedio.<br><br>
            <strong>5. No intentes "timing" del mercado</strong><br>
            DCA (Dollar Cost Averaging) es mejor estrategia.<br><br>
            📚 <em>¿Tenés alguna pregunta específica?</em>
        `;
    } else if (preguntaLower.includes('compar')) {
        respuesta = `
            <strong>⚖️ Comparar Activos</strong><br><br>
            Para comparar, escribí los símbolos de las acciones que querés analizar.<br><br>
            <strong>Ejemplo:</strong><br>
            "Análisis AAPL" o "Qué opinas de MSFT"<br><br>
            Puedo darte análisis individual de cada activo para que compares:<br>
            • Precio actual y cambio diario<br>
            • Opinión basada en momentum<br>
            • Contexto del sector<br><br>
            💡 <em>Escribí el primer símbolo que querés analizar.</em>
        `;
    } else {
        respuesta = `
            <strong>🤖 Asistente de Inversiones</strong><br><br>
            No entendí exactamente tu pregunta. Puedo ayudarte con:<br><br>
            • <strong>Análisis de acciones:</strong> Escribí un símbolo (ej: "AAPL")<br>
            • <strong>Sector tech:</strong> Preguntá "¿qué opinas del sector tech?"<br>
            • <strong>ETFs:</strong> Preguntá "¿qué ETFs recomendás?"<br>
            • <strong>Argentina:</strong> Preguntá "acciones argentinas"<br>
            • <strong>Principiantes:</strong> Preguntá "cómo empezar a invertir"<br><br>
            💡 <em>Probá con: "análisis NVDA" o "qué opinas de Tesla"</em>
        `;
    }

    addChatMessageHTML('bot', respuesta);
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

// ============================================================================
// LISTA MAESTRA DE ACTIVOS - Criptos, Acciones, ETFs e Índices
// ============================================================================

const STOCK_DATA = [
    // ─────────────────────────────────────────────────────────────────────────
    // CRIPTOMONEDAS
    // ─────────────────────────────────────────────────────────────────────────
    { simbolo: 'DOT', nombre: 'Polkadot', categoria: 'Cripto', tipo: 'crypto' },
    { simbolo: 'ETH', nombre: 'Ethereum', categoria: 'Cripto', tipo: 'crypto' },
    { simbolo: 'ADA', nombre: 'Cardano', categoria: 'Cripto', tipo: 'crypto' },

    // ─────────────────────────────────────────────────────────────────────────
    // ACCIONES TECNOLÓGICAS (Big Tech)
    // ─────────────────────────────────────────────────────────────────────────
    { simbolo: 'AAPL', nombre: 'Apple Inc.', categoria: 'Tech', tipo: 'stock' },
    { simbolo: 'MSFT', nombre: 'Microsoft Corporation', categoria: 'Tech', tipo: 'stock' },
    { simbolo: 'GOOGL', nombre: 'Alphabet Inc. (Google)', categoria: 'Tech', tipo: 'stock' },
    { simbolo: 'AMZN', nombre: 'Amazon.com Inc.', categoria: 'Tech', tipo: 'stock' },
    { simbolo: 'TSLA', nombre: 'Tesla Inc.', categoria: 'Tech', tipo: 'stock' },
    { simbolo: 'NVDA', nombre: 'NVIDIA Corporation', categoria: 'Tech', tipo: 'stock' },
    { simbolo: 'AMD', nombre: 'Advanced Micro Devices', categoria: 'Tech', tipo: 'stock' },
    { simbolo: 'ADBE', nombre: 'Adobe Inc.', categoria: 'Tech', tipo: 'stock' },

    // ─────────────────────────────────────────────────────────────────────────
    // ACCIONES USA (Blue Chips & Healthcare)
    // ─────────────────────────────────────────────────────────────────────────
    { simbolo: 'T', nombre: 'AT&T Inc.', categoria: 'Telecom', tipo: 'stock' },
    { simbolo: 'UNH', nombre: 'UnitedHealth Group', categoria: 'Healthcare', tipo: 'stock' },
    { simbolo: 'PG', nombre: 'Procter & Gamble', categoria: 'Consumer', tipo: 'stock' },
    { simbolo: 'V', nombre: 'Visa Inc.', categoria: 'Financial', tipo: 'stock' },
    { simbolo: 'PEP', nombre: 'PepsiCo Inc.', categoria: 'Consumer', tipo: 'stock' },
    { simbolo: 'ABBV', nombre: 'AbbVie Inc.', categoria: 'Healthcare', tipo: 'stock' },
    { simbolo: 'CRSP', nombre: 'CRISPR Therapeutics', categoria: 'Biotech', tipo: 'stock' },
    { simbolo: 'AES', nombre: 'AES Corporation', categoria: 'Energy', tipo: 'stock' },

    // ─────────────────────────────────────────────────────────────────────────
    // ACCIONES LATAM & ARGENTINA
    // ─────────────────────────────────────────────────────────────────────────
    { simbolo: 'YPF', nombre: 'YPF S.A. (Argentina)', categoria: 'Energy LATAM', tipo: 'stock' },
    { simbolo: 'GLOB', nombre: 'Globant S.A. (Argentina)', categoria: 'Tech LATAM', tipo: 'stock' },
    { simbolo: 'CIB', nombre: 'Bancolombia S.A.', categoria: 'Financial LATAM', tipo: 'stock' },

    // ─────────────────────────────────────────────────────────────────────────
    // BERKSHIRE HATHAWAY
    // ─────────────────────────────────────────────────────────────────────────
    { simbolo: 'BRK.B', nombre: 'Berkshire Hathaway B', categoria: 'Holding', tipo: 'stock' },
    { simbolo: 'BRK.A', nombre: 'Berkshire Hathaway A', categoria: 'Holding', tipo: 'stock' },

    // ─────────────────────────────────────────────────────────────────────────
    // ETFs PRINCIPALES (Índices)
    // ─────────────────────────────────────────────────────────────────────────
    { simbolo: 'SPY', nombre: 'SPDR S&P 500 ETF', categoria: 'ETF Índice', tipo: 'etf' },
    { simbolo: 'QQQ', nombre: 'Invesco QQQ (Nasdaq 100)', categoria: 'ETF Índice', tipo: 'etf' },
    { simbolo: 'DIA', nombre: 'SPDR Dow Jones ETF', categoria: 'ETF Índice', tipo: 'etf' },

    // ─────────────────────────────────────────────────────────────────────────
    // ETFs SECTORIALES
    // ─────────────────────────────────────────────────────────────────────────
    { simbolo: 'XLK', nombre: 'Technology Select Sector', categoria: 'ETF Tech', tipo: 'etf' },
    { simbolo: 'XLV', nombre: 'Health Care Select Sector', categoria: 'ETF Healthcare', tipo: 'etf' },
    { simbolo: 'XLE', nombre: 'Energy Select Sector', categoria: 'ETF Energy', tipo: 'etf' },
    { simbolo: 'ICLN', nombre: 'iShares Global Clean Energy', categoria: 'ETF Clean Energy', tipo: 'etf' },

    // ─────────────────────────────────────────────────────────────────────────
    // ETFs COMMODITIES
    // ─────────────────────────────────────────────────────────────────────────
    { simbolo: 'GLD', nombre: 'SPDR Gold Shares', categoria: 'ETF Oro', tipo: 'etf' },
    { simbolo: 'SLV', nombre: 'iShares Silver Trust', categoria: 'ETF Plata', tipo: 'etf' },

    // ─────────────────────────────────────────────────────────────────────────
    // ETFs REGIONALES
    // ─────────────────────────────────────────────────────────────────────────
    { simbolo: 'EWZ', nombre: 'iShares MSCI Brazil', categoria: 'ETF Brasil', tipo: 'etf' },

    // ─────────────────────────────────────────────────────────────────────────
    // OTROS (Tickers especiales/fondos)
    // ─────────────────────────────────────────────────────────────────────────
    { simbolo: 'BYMAT', nombre: 'ByMA (Bolsas y Mercados Arg)', categoria: 'Fondo ARG', tipo: 'other' },
    { simbolo: 'SMJP', nombre: 'SMJP Fund', categoria: 'Fondo', tipo: 'other' },
    { simbolo: 'MKOT', nombre: 'MKOT Fund', categoria: 'Fondo', tipo: 'other' },
    { simbolo: 'RAX', nombre: 'RAX Fund', categoria: 'Fondo', tipo: 'other' },
    { simbolo: 'PIBIT', nombre: 'PIBIT Fund', categoria: 'Fondo', tipo: 'other' },
    { simbolo: 'RSMH', nombre: 'RSMH Fund', categoria: 'Fondo', tipo: 'other' }
];

// Función helper para buscar activos por símbolo o nombre
function buscarActivo(query) {
    const q = query.toUpperCase().trim();
    return STOCK_DATA.find(s =>
        s.simbolo === q ||
        s.simbolo.replace('.', '') === q ||
        s.nombre.toUpperCase().includes(q)
    );
}

// Función para obtener activos por categoría
function getActivosPorCategoria(categoria) {
    return STOCK_DATA.filter(s => s.categoria.includes(categoria));
}

// Función para obtener activos por tipo
function getActivosPorTipo(tipo) {
    return STOCK_DATA.filter(s => s.tipo === tipo);
}

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

// MERCADO LABORAL - Búsqueda de empleos en IA, BPA, Automatización y Vibe Coding
const JOB_SEARCH_TERMS = [
    // AI & ML
    'AI engineer',
    'prompt engineer',
    'machine learning',
    'LLM',
    'artificial intelligence',
    'AI developer',
    'chatbot developer',
    'NLP engineer',
    // Business Process Automation
    'business process automation',
    'BPA',
    'process automation',
    'workflow automation',
    'RPA developer',
    // Herramientas específicas
    'n8n',
    'Zapier',
    'Make automation',
    'Integromat',
    'Power Automate',
    'Microsoft Power Platform',
    'UiPath',
    'Automation Anywhere',
    // No-code / Low-code
    'no-code',
    'low-code',
    'citizen developer',
    // Vibe Coding relacionado
    'AI assistant',
    'copilot developer'
];

// Plataformas Freelance - Worldwide
const FREELANCE_PLATFORMS_WORLDWIDE = [
    { name: 'Upwork', url: 'https://www.upwork.com/nx/search/jobs/?q=automation%20n8n%20zapier&sort=recency', icon: '💼', desc: 'Freelance global' },
    { name: 'Freelancer', url: 'https://www.freelancer.com/jobs/automation/', icon: '🌐', desc: 'Proyectos variados' },
    { name: 'Toptal', url: 'https://www.toptal.com/automation', icon: '⭐', desc: 'Top 3% freelancers' },
    { name: 'Fiverr', url: 'https://www.fiverr.com/search/gigs?query=n8n%20automation', icon: '🎯', desc: 'Gigs rápidos' },
    { name: 'We Work Remotely', url: 'https://weworkremotely.com/remote-jobs/search?term=automation', icon: '🏠', desc: 'Solo remoto' },
    { name: 'Remote OK', url: 'https://remoteok.com/remote-automation-jobs', icon: '✈️', desc: 'Nómadas digitales' },
    { name: 'FlexJobs', url: 'https://www.flexjobs.com/search?search=automation&location=', icon: '🔄', desc: 'Trabajo flexible' },
    { name: 'Contra', url: 'https://contra.com/search/automation', icon: '🆓', desc: 'Sin comisiones' },
    { name: 'Gun.io', url: 'https://gun.io/', icon: '🎯', desc: 'Devs senior' },
    { name: 'Arc.dev', url: 'https://arc.dev/remote-jobs?search=automation', icon: '🌟', desc: 'Remote devs' }
];

// Plataformas para Argentina y LATAM
const FREELANCE_PLATFORMS_LATAM = [
    { name: 'Workana', url: 'https://www.workana.com/jobs?query=automatizacion+n8n', icon: '🇦🇷', desc: 'Popular en Argentina' },
    { name: 'GetOnBoard', url: 'https://www.getonbrd.com/empleos?q=automation&remote=true', icon: '🌎', desc: 'Startups LATAM' },
    { name: 'Hired', url: 'https://hired.com/talent', icon: '💎', desc: 'Tech talent' },
    { name: 'Torre', url: 'https://torre.ai/jobs?q=automation', icon: '🗼', desc: 'AI matching LATAM' },
    { name: 'LinkedIn Arg', url: 'https://www.linkedin.com/jobs/search/?keywords=automatizacion%20procesos&location=Argentina&f_WT=2', icon: '💼', desc: 'Remoto en LinkedIn' },
    { name: 'Computrabajo', url: 'https://www.computrabajo.com.ar/empleos-de-automatizacion', icon: '🇦🇷', desc: 'Empresas argentinas' },
    { name: 'Búmeran', url: 'https://www.bumeran.com.ar/empleos-busqueda-automatizacion.html', icon: '📋', desc: 'Portal argentino' },
    { name: 'Turing', url: 'https://www.turing.com/jobs', icon: '🧠', desc: 'Devs remotos USD' }
];

// Búsquedas específicas de herramientas
const TOOL_SPECIFIC_SEARCHES = [
    { tool: 'n8n', urls: [
        'https://www.upwork.com/nx/search/jobs/?q=n8n&sort=recency',
        'https://www.freelancer.com/jobs/n8n/',
        'https://remoteok.com/remote-n8n-jobs'
    ]},
    { tool: 'Zapier', urls: [
        'https://www.upwork.com/nx/search/jobs/?q=zapier%20automation&sort=recency',
        'https://weworkremotely.com/remote-jobs/search?term=zapier'
    ]},
    { tool: 'Power Automate', urls: [
        'https://www.upwork.com/nx/search/jobs/?q=power%20automate&sort=recency',
        'https://www.linkedin.com/jobs/search/?keywords=power%20automate&f_WT=2'
    ]},
    { tool: 'Make/Integromat', urls: [
        'https://www.upwork.com/nx/search/jobs/?q=make%20integromat&sort=recency',
        'https://www.freelancer.com/jobs/integromat/'
    ]}
];

// Combinar todas las plataformas para el reporte
const FREELANCE_PLATFORMS = [...FREELANCE_PLATFORMS_WORLDWIDE.slice(0, 5), ...FREELANCE_PLATFORMS_LATAM.slice(0, 5)];

async function fetchMercadoLaboral() {
    // Obtener perfil del CV si existe
    const perfil = mercadoState.cvData?.perfilExtraido || null;
    const searchTerms = obtenerTerminosBusqueda(perfil);

    addChatMessageHTML('bot', `
        <div class="mercado-loading">
            <div class="mercado-spinner"></div>
            <span>Buscando empleos ${perfil ? 'personalizados para tu perfil' : 'de automatización y tech'}...</span>
        </div>
    `);

    try {
        const empleos = await fetchEmpleos(searchTerms);
        const linksDirectos = generarLinksBusquedaDirecta(searchTerms, perfil);
        const html = generateLaboralHTML(empleos, linksDirectos, perfil);
        downloadHTML(html, perfil ? 'empleos_personalizados' : 'empleos_bpa_automation');

        const herramientas = empleos.filter(e =>
            e.titulo.toLowerCase().includes('n8n') ||
            e.titulo.toLowerCase().includes('zapier') ||
            e.titulo.toLowerCase().includes('power automate') ||
            e.titulo.toLowerCase().includes('make')
        ).length;

        let mensajeResultado = `
            <strong>✅ ¡Reporte generado!</strong><br><br>
            💼 <strong>${empleos.length}</strong> ofertas de APIs gratuitas<br>
        `;

        if (perfil) {
            mensajeResultado += `
                🎯 Personalizado para: <strong>${perfil.area}</strong><br>
                🔧 Skills buscados: ${searchTerms.slice(0, 5).join(', ')}<br><br>
            `;
        } else {
            mensajeResultado += `
                🔧 <strong>${herramientas}</strong> de herramientas específicas<br><br>
            `;
        }

        mensajeResultado += `
            <strong>🔗 LINKS DIRECTOS (postulación GRATIS):</strong><br>
            ${linksDirectos.map(l => `• <a href="${l.url}" target="_blank" style="color: #60a5fa;">${l.nombre}</a>`).join('<br>')}<br><br>
            <strong>📍 APIs consultadas:</strong> Remotive, Arbeitnow, Himalayas, Jobicy<br>
            <em style="color: #4ade80;">✓ Todas las plataformas son GRATIS para postularse</em><br><br>
            <em>El archivo se descargó automáticamente.</em>
        `;

        addChatMessageHTML('bot', mensajeResultado);
    } catch (error) {
        console.error('Error:', error);
        addChatMessage('❌ Error al buscar empleos. Intenta de nuevo más tarde.', 'bot');
    }
}

/**
 * Obtiene términos de búsqueda basados en el perfil del CV
 */
function obtenerTerminosBusqueda(perfil) {
    // Términos por defecto si no hay CV
    const terminosDefault = [
        'automation', 'n8n', 'zapier', 'power automate', 'workflow',
        'RPA', 'process automation', 'AI', 'no-code', 'low-code',
        'data analyst', 'power bi', 'business intelligence'
    ];

    if (!perfil || !perfil.hardSkills || perfil.hardSkills.length === 0) {
        return terminosDefault;
    }

    // Construir términos basados en el CV
    const terminosCV = [];

    // Agregar hard skills del CV
    perfil.hardSkills.forEach(skill => {
        terminosCV.push(skill);
    });

    // Agregar términos según el área detectada
    const terminosPorArea = {
        'Power Platform': ['power bi', 'power automate', 'power platform', 'microsoft', 'dataverse'],
        'Data & Analytics': ['data analyst', 'business intelligence', 'sql', 'tableau', 'looker', 'analytics'],
        'Automatización': ['automation', 'n8n', 'zapier', 'rpa', 'workflow', 'integration'],
        'Desarrollo': ['developer', 'software engineer', 'full stack', 'backend', 'frontend']
    };

    if (perfil.area && terminosPorArea[perfil.area]) {
        terminosCV.push(...terminosPorArea[perfil.area]);
    }

    // Eliminar duplicados y limitar
    return [...new Set(terminosCV)].slice(0, 15);
}

/**
 * Genera links de búsqueda directa en plataformas GRATIS
 */
function generarLinksBusquedaDirecta(searchTerms, perfil) {
    const query = searchTerms.slice(0, 3).join(' OR ');
    const queryEncoded = encodeURIComponent(searchTerms.slice(0, 2).join(' '));

    const ubicacion = perfil?.ubicacion || '';
    const remoto = perfil?.modalidad === 'Remoto' || !perfil;

    const links = [
        // LinkedIn - GRATIS para postularse
        {
            nombre: '🔗 LinkedIn Jobs',
            url: `https://www.linkedin.com/jobs/search/?keywords=${queryEncoded}&f_WT=2`,
            descripcion: 'Filtrado por remoto - GRATIS'
        },
        // Indeed - GRATIS
        {
            nombre: '🔗 Indeed',
            url: `https://www.indeed.com/jobs?q=${queryEncoded}&l=remote`,
            descripcion: 'GRATIS para postularse'
        },
        // Glassdoor - GRATIS
        {
            nombre: '🔗 Glassdoor',
            url: `https://www.glassdoor.com/Job/jobs.htm?sc.keyword=${queryEncoded}`,
            descripcion: 'GRATIS + reviews de empresas'
        },
        // We Work Remotely - GRATIS
        {
            nombre: '🔗 We Work Remotely',
            url: `https://weworkremotely.com/remote-jobs/search?term=${queryEncoded}`,
            descripcion: '100% remoto - GRATIS'
        },
        // RemoteOK - GRATIS
        {
            nombre: '🔗 RemoteOK',
            url: `https://remoteok.com/remote-${queryEncoded.replace(/%20/g, '-')}-jobs`,
            descripcion: 'Remoto - GRATIS'
        },
        // AngelList/Wellfound - GRATIS
        {
            nombre: '🔗 Wellfound (ex AngelList)',
            url: `https://wellfound.com/jobs?query=${queryEncoded}`,
            descripcion: 'Startups - GRATIS'
        }
    ];

    // Agregar plataformas LATAM si aplica
    if (ubicacion === 'Argentina' || ubicacion === 'LATAM' || !ubicacion) {
        links.push(
            {
                nombre: '🔗 GetOnBoard (LATAM)',
                url: `https://www.getonboard.com/empleos?q=${queryEncoded}`,
                descripcion: 'Tech LATAM - GRATIS'
            },
            {
                nombre: '🔗 Computrabajo Argentina',
                url: `https://www.computrabajo.com.ar/trabajo-de-${queryEncoded.replace(/%20/g, '-')}`,
                descripcion: 'Argentina - GRATIS'
            }
        );
    }

    // Agregar Europa si tiene ciudadanía
    if (perfil?.ciudadaniaEU) {
        links.push(
            {
                nombre: '🔗 Indeed España',
                url: `https://es.indeed.com/jobs?q=${queryEncoded}&l=remoto`,
                descripcion: 'España - GRATIS'
            },
            {
                nombre: '🔗 InfoJobs España',
                url: `https://www.infojobs.net/ofertas-trabajo/${queryEncoded.replace(/%20/g, '-')}`,
                descripcion: 'España - GRATIS'
            },
            {
                nombre: '🔗 Malt (Europa)',
                url: `https://www.malt.es/s?q=${queryEncoded}`,
                descripcion: 'Freelance Europa - GRATIS'
            }
        );
    }

    // ═══ PLATAFORMAS CONTRACTOR/FREELANCE (GRATIS postularse) ═══
    links.push(
        {
            nombre: '💼 Toptal (Elite)',
            url: 'https://www.toptal.com/talent/apply',
            descripcion: 'Top 3% freelancers - GRATIS aplicar'
        },
        {
            nombre: '💼 Turing',
            url: `https://www.turing.com/jobs?q=${queryEncoded}`,
            descripcion: 'Remote US companies - GRATIS'
        },
        {
            nombre: '💼 Gun.io',
            url: 'https://www.gun.io/find-work',
            descripcion: 'Freelance devs - GRATIS aplicar'
        },
        {
            nombre: '💼 Contra (Sin comisión)',
            url: `https://contra.com/search?q=${queryEncoded}`,
            descripcion: 'Freelance 0% comisión - GRATIS'
        },
        {
            nombre: '💼 Fiverr Pro',
            url: `https://www.fiverr.com/search/gigs?query=${queryEncoded}`,
            descripcion: 'Freelance - Solo paga si vendes'
        },
        {
            nombre: '💼 PeoplePerHour',
            url: `https://www.peopleperhour.com/freelance-jobs?keyword=${queryEncoded}`,
            descripcion: 'Freelance - GRATIS postularse'
        },
        {
            nombre: '💼 Flexiple',
            url: 'https://flexiple.com/freelancers',
            descripcion: 'Top freelancers - GRATIS aplicar'
        },
        {
            nombre: '💼 Arc.dev',
            url: `https://arc.dev/remote-jobs?search=${queryEncoded}`,
            descripcion: 'Remote devs - GRATIS'
        }
    );

    // LATAM Contractor específico
    if (ubicacion === 'Argentina' || ubicacion === 'LATAM' || !ubicacion) {
        links.push(
            {
                nombre: '💼 Workana (LATAM)',
                url: `https://www.workana.com/jobs?query=${queryEncoded}`,
                descripcion: 'Freelance LATAM - GRATIS postularse'
            },
            {
                nombre: '💼 Freelancer.com',
                url: `https://www.freelancer.com/jobs/?keyword=${queryEncoded}`,
                descripcion: 'Global - GRATIS (paga si ganas)'
            },
            {
                nombre: '💼 Soy Freelancer (ARG)',
                url: 'https://www.soyfreelancer.com/proyectos',
                descripcion: 'Argentina - GRATIS'
            },
            {
                nombre: '💼 Torre.ai (LATAM)',
                url: `https://torre.ai/jobs?q=${queryEncoded}`,
                descripcion: 'AI matching - GRATIS'
            }
        );
    }

    return links;
}

async function fetchEmpleos(searchTerms = null) {
    const empleosMap = new Map();
    const searchPromises = [];

    // Usar términos personalizados o default
    const terms = searchTerms || [
        'automation', 'n8n', 'zapier', 'power automate', 'workflow automation',
        'RPA', 'process automation', 'AI', 'no-code', 'low-code'
    ];

    // Remotive API - Jobs remotos GRATIS
    for (const term of terms.slice(0, 8)) {
        searchPromises.push(fetchRemotiveJobs(term));
    }

    // Arbeitnow API - Jobs Europa/Remote GRATIS
    searchPromises.push(fetchArbeitnowJobs());

    // Himalayas API - Remote jobs GRATIS
    searchPromises.push(fetchHimalayasJobs());

    // Jobicy API - Remote jobs GRATIS
    searchPromises.push(fetchJobicyJobs());

    // ═══ PLATAFORMAS CONTRACTOR/FREELANCE GRATUITAS ═══

    // Freelancer.com tiene búsqueda gratis (solo paga si ganas proyecto)
    // No tiene API pública pero podemos agregar link

    // Contra.com - Freelance sin comisión
    // Fiverr - Solo paga si vendes (agregar link)
    // Malt - Europa, gratis postularse

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

    // Convertir a array
    let empleos = Array.from(empleosMap.values());

    // Priorizar trabajos de herramientas específicas y Argentina
    empleos.sort((a, b) => {
        const aScore = getJobScore(a);
        const bScore = getJobScore(b);
        if (bScore !== aScore) return bScore - aScore;
        return new Date(b.fecha) - new Date(a.fecha);
    });

    // Si hay pocos resultados, agregar datos de demostración
    if (empleos.length < 10) {
        const demoJobs = generateDemoJobs();
        demoJobs.forEach(job => {
            if (!empleosMap.has(job.url)) {
                empleos.push(job);
            }
        });
    }

    return empleos.slice(0, 50);
}

// Puntuación para priorizar trabajos relevantes
function getJobScore(job) {
    let score = 0;
    const title = (job.titulo || '').toLowerCase();
    const location = (job.ubicacion || '').toLowerCase();
    const tags = (job.tags || []).join(' ').toLowerCase();

    // Herramientas específicas (+10 puntos cada una)
    if (title.includes('n8n') || tags.includes('n8n')) score += 10;
    if (title.includes('zapier') || tags.includes('zapier')) score += 10;
    if (title.includes('power automate') || tags.includes('power automate')) score += 10;
    if (title.includes('make') || title.includes('integromat')) score += 10;
    if (title.includes('uipath') || tags.includes('uipath')) score += 8;

    // BPA / Automation (+5 puntos)
    if (title.includes('business process') || title.includes('bpa')) score += 5;
    if (title.includes('workflow automation')) score += 5;
    if (title.includes('process automation')) score += 5;
    if (title.includes('rpa')) score += 5;

    // Argentina / LATAM (+7 puntos)
    if (location.includes('argentina')) score += 7;
    if (location.includes('latam') || location.includes('latin america')) score += 5;
    if (location.includes('south america')) score += 4;

    // AI relacionado (+3 puntos)
    if (title.includes('ai') || title.includes('artificial intelligence')) score += 3;
    if (title.includes('no-code') || title.includes('low-code')) score += 3;

    // Worldwide/Remote (+2 puntos)
    if (location.includes('worldwide') || location.includes('anywhere')) score += 2;

    // Marcado como relevante
    if (job.relevante) score += 2;

    return score;
}

// Himalayas API - Remote Jobs
async function fetchHimalayasJobs() {
    const empleos = [];
    try {
        const response = await fetch('https://himalayas.app/jobs/api?limit=30');
        const data = await response.json();

        if (data.jobs) {
            data.jobs.forEach(job => {
                const title = (job.title || '').toLowerCase();
                const description = (job.excerpt || '').toLowerCase();

                const isRelevant = title.includes('automation') ||
                    title.includes('n8n') ||
                    title.includes('zapier') ||
                    title.includes('power') ||
                    title.includes('workflow') ||
                    title.includes('rpa') ||
                    title.includes('process') ||
                    title.includes('ai') ||
                    title.includes('no-code') ||
                    description.includes('automation') ||
                    description.includes('workflow');

                if (isRelevant) {
                    empleos.push({
                        titulo: job.title,
                        empresa: job.companyName,
                        ubicacion: job.location || 'Remoto Worldwide',
                        url: job.applicationLink || `https://himalayas.app/jobs/${job.slug}`,
                        fecha: job.pubDate ? job.pubDate.slice(0, 10) : new Date().toISOString().slice(0, 10),
                        categoria: 'Automation',
                        tipo: job.type || 'Full-time',
                        salario: job.salary || 'No especificado',
                        tags: job.categories || [],
                        fuente: 'Himalayas',
                        relevante: true
                    });
                }
            });
        }
    } catch (e) {
        console.warn('Error Himalayas:', e);
    }
    return empleos;
}

// Jobicy API - Remote Jobs
async function fetchJobicyJobs() {
    const empleos = [];
    try {
        const response = await fetch('https://jobicy.com/api/v2/remote-jobs?count=30&industry=engineering');
        const data = await response.json();

        if (data.jobs) {
            data.jobs.forEach(job => {
                const title = (job.jobTitle || '').toLowerCase();

                const isRelevant = title.includes('automation') ||
                    title.includes('engineer') ||
                    title.includes('developer') ||
                    title.includes('process') ||
                    title.includes('ai') ||
                    title.includes('data');

                if (isRelevant) {
                    empleos.push({
                        titulo: job.jobTitle,
                        empresa: job.companyName,
                        ubicacion: job.jobGeo || 'Remoto Worldwide',
                        url: job.url,
                        fecha: job.pubDate ? job.pubDate.slice(0, 10) : new Date().toISOString().slice(0, 10),
                        categoria: job.jobIndustry || 'Tech',
                        tipo: job.jobType || 'Full-time',
                        salario: job.annualSalaryMin && job.annualSalaryMax
                            ? `$${job.annualSalaryMin} - $${job.annualSalaryMax}`
                            : 'No especificado',
                        tags: [job.jobIndustry, job.jobLevel].filter(Boolean),
                        fuente: 'Jobicy',
                        relevante: true
                    });
                }
            });
        }
    } catch (e) {
        console.warn('Error Jobicy:', e);
    }
    return empleos;
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
    // Trabajos de demostración enfocados en BPA, n8n, Power Automate, Zapier y Argentina
    const demoJobs = [
        // n8n específicos
        {
            titulo: 'n8n Automation Specialist',
            empresa: 'Workflow Experts',
            ubicacion: 'Remoto Worldwide',
            url: 'https://www.upwork.com/nx/search/jobs/?q=n8n&sort=recency',
            fecha: new Date().toISOString().slice(0, 10),
            categoria: 'Automation',
            tipo: 'Freelance',
            salario: '$40 - $80/hora',
            tags: ['n8n', 'Workflow', 'API Integration', 'Node.js'],
            fuente: 'Upwork (Demo)',
            relevante: true
        },
        {
            titulo: 'n8n Developer - Business Process Automation',
            empresa: 'AutomateNow',
            ubicacion: 'Remoto LATAM',
            url: 'https://www.workana.com/jobs?query=n8n',
            fecha: new Date().toISOString().slice(0, 10),
            categoria: 'BPA',
            tipo: 'Contract',
            salario: '$30 - $60/hora',
            tags: ['n8n', 'BPA', 'Integrations'],
            fuente: 'Workana (Demo)',
            relevante: true
        },
        // Power Automate específicos
        {
            titulo: 'Microsoft Power Automate Developer',
            empresa: 'Digital Solutions SA',
            ubicacion: 'Argentina (Remoto)',
            url: 'https://www.linkedin.com/jobs/search/?keywords=power%20automate&location=Argentina&f_WT=2',
            fecha: new Date().toISOString().slice(0, 10),
            categoria: 'Power Platform',
            tipo: 'Full-time',
            salario: '$50k - $90k USD',
            tags: ['Power Automate', 'Microsoft 365', 'Power Platform', 'SharePoint'],
            fuente: 'LinkedIn (Demo)',
            relevante: true
        },
        {
            titulo: 'Power Platform Consultant',
            empresa: 'Consulting Tech',
            ubicacion: 'Remoto Argentina/LATAM',
            url: 'https://www.getonbrd.com/empleos?q=power+automate',
            fecha: new Date().toISOString().slice(0, 10),
            categoria: 'Power Platform',
            tipo: 'Contract',
            salario: '$45 - $85/hora',
            tags: ['Power Automate', 'Power Apps', 'Power BI'],
            fuente: 'GetOnBoard (Demo)',
            relevante: true
        },
        // Zapier específicos
        {
            titulo: 'Zapier Automation Expert',
            empresa: 'Growth Hackers Inc',
            ubicacion: 'Remoto Worldwide',
            url: 'https://www.upwork.com/nx/search/jobs/?q=zapier&sort=recency',
            fecha: new Date().toISOString().slice(0, 10),
            categoria: 'Automation',
            tipo: 'Freelance',
            salario: '$35 - $70/hora',
            tags: ['Zapier', 'No-Code', 'Integrations', 'CRM'],
            fuente: 'Upwork (Demo)',
            relevante: true
        },
        // Make/Integromat
        {
            titulo: 'Make (Integromat) Developer',
            empresa: 'Automation Agency',
            ubicacion: 'Remoto',
            url: 'https://www.freelancer.com/jobs/integromat/',
            fecha: new Date().toISOString().slice(0, 10),
            categoria: 'Automation',
            tipo: 'Freelance',
            salario: '$30 - $60/hora',
            tags: ['Make', 'Integromat', 'Webhooks', 'API'],
            fuente: 'Freelancer (Demo)',
            relevante: true
        },
        // BPA / RPA
        {
            titulo: 'Business Process Automation Analyst',
            empresa: 'Enterprise Solutions',
            ubicacion: 'Argentina (Híbrido)',
            url: 'https://www.computrabajo.com.ar/empleos-de-automatizacion-procesos',
            fecha: new Date().toISOString().slice(0, 10),
            categoria: 'BPA',
            tipo: 'Full-time',
            salario: '$40k - $70k USD',
            tags: ['BPA', 'Process Mapping', 'BPMN', 'Lean'],
            fuente: 'Computrabajo (Demo)',
            relevante: true
        },
        {
            titulo: 'RPA Developer - UiPath',
            empresa: 'Automation Consulting',
            ubicacion: 'Remoto LATAM',
            url: 'https://www.torre.ai/jobs?q=rpa',
            fecha: new Date().toISOString().slice(0, 10),
            categoria: 'RPA',
            tipo: 'Contract',
            salario: '$45 - $90/hora',
            tags: ['UiPath', 'RPA', 'Automation Anywhere', 'Blue Prism'],
            fuente: 'Torre (Demo)',
            relevante: true
        },
        // AI + Automation
        {
            titulo: 'AI Automation Engineer',
            empresa: 'AI First Labs',
            ubicacion: 'Remoto Worldwide',
            url: 'https://weworkremotely.com/remote-jobs/search?term=ai+automation',
            fecha: new Date().toISOString().slice(0, 10),
            categoria: 'AI/ML',
            tipo: 'Full-time',
            salario: '$80k - $150k USD',
            tags: ['AI', 'LLM', 'Automation', 'Python'],
            fuente: 'WWR (Demo)',
            relevante: true
        },
        {
            titulo: 'Vibe Coding / AI Assistant Developer',
            empresa: 'NextGen Tech',
            ubicacion: 'Remoto',
            url: 'https://remoteok.com/remote-ai-jobs',
            fecha: new Date().toISOString().slice(0, 10),
            categoria: 'AI/ML',
            tipo: 'Full-time',
            salario: '$70k - $130k USD',
            tags: ['AI', 'Claude', 'GPT', 'Prompt Engineering'],
            fuente: 'RemoteOK (Demo)',
            relevante: true
        },
        // Argentina específicos
        {
            titulo: 'Desarrollador de Automatizaciones',
            empresa: 'Startup Argentina',
            ubicacion: 'Buenos Aires (Remoto)',
            url: 'https://www.bumeran.com.ar/empleos-busqueda-automatizacion.html',
            fecha: new Date().toISOString().slice(0, 10),
            categoria: 'Automation',
            tipo: 'Full-time',
            salario: '$800k - $1.5M ARS',
            tags: ['Python', 'Automation', 'n8n', 'APIs'],
            fuente: 'Búmeran (Demo)',
            relevante: true
        },
        {
            titulo: 'Consultor de Procesos y Automatización',
            empresa: 'Consultoría Digital',
            ubicacion: 'Argentina (Remoto)',
            url: 'https://www.workana.com/jobs?query=automatizacion',
            fecha: new Date().toISOString().slice(0, 10),
            categoria: 'Consulting',
            tipo: 'Freelance',
            salario: '$25 - $50/hora USD',
            tags: ['BPA', 'Consulting', 'Process Improvement'],
            fuente: 'Workana (Demo)',
            relevante: true
        },
        // No-code / Low-code
        {
            titulo: 'No-Code Automation Specialist',
            empresa: 'NoCode Agency',
            ubicacion: 'Remoto Worldwide',
            url: 'https://www.contra.com/search/no-code',
            fecha: new Date().toISOString().slice(0, 10),
            categoria: 'No-Code',
            tipo: 'Freelance',
            salario: '$35 - $65/hora',
            tags: ['No-Code', 'Zapier', 'Make', 'Airtable', 'Notion'],
            fuente: 'Contra (Demo)',
            relevante: true
        }
    ];
    return demoJobs;
}

function generateLaboralHTML(empleos, linksDirectos = [], perfil = null) {
    const fecha = new Date().toLocaleString('es-ES');

    // Filtrar empleos con salario mínimo $2500 USD/mes (si tiene info de salario)
    const SALARIO_MINIMO_USD = 2500;
    const empleosFiltrados = empleos.filter(e => {
        // Si no tiene salario, incluir (muchos no publican salario)
        if (!e.salario) return true;

        // Intentar extraer número del salario
        const salarioStr = e.salario.toString().toLowerCase();
        const numeros = salarioStr.match(/[\d,]+/g);

        if (!numeros) return true;

        // Convertir a número
        const salarioNum = parseInt(numeros[0].replace(/,/g, ''));

        // Si es anual, convertir a mensual
        if (salarioStr.includes('year') || salarioStr.includes('annual') || salarioNum > 100000) {
            return (salarioNum / 12) >= SALARIO_MINIMO_USD;
        }

        // Si es mensual
        return salarioNum >= SALARIO_MINIMO_USD;
    });

    const relevantes = empleosFiltrados.filter(e => e.relevante);
    const categorias = [...new Set(empleosFiltrados.map(e => e.categoria))];
    const fuentes = [...new Set(empleosFiltrados.map(e => e.fuente))];

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
        .platform-card.latam { border: 1px solid rgba(56, 239, 125, 0.3); }
        .platform-card.latam:hover { border-color: #38ef7d; box-shadow: 0 10px 30px rgba(56, 239, 125, 0.2); }
        .platform-card.worldwide { border: 1px solid rgba(102, 126, 234, 0.3); }
        .platform-icon { font-size: 2em; margin-bottom: 10px; }
        .platform-name { font-weight: 600; }
        .platform-desc { font-size: 0.75em; opacity: 0.7; margin-top: 5px; }
        .tools-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin-bottom: 30px;
        }
        .tool-card {
            background: linear-gradient(135deg, #1e1e3f, #2d2d5a);
            padding: 20px;
            border-radius: 12px;
            border-left: 3px solid #f093fb;
        }
        .tool-name { font-weight: 600; margin-bottom: 10px; font-size: 1.1em; }
        .tool-links a {
            color: #a5b4fc;
            text-decoration: none;
            font-size: 0.85em;
        }
        .tool-links a:hover { text-decoration: underline; }
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
            .tools-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🤖 ${perfil ? `Empleos para ${perfil.area}` : 'Empleos: BPA, n8n, Power Automate & IA'}</h1>
            <p>${perfil ? `Búsqueda personalizada basada en tu CV` : 'Oportunidades remotas en Business Process Automation, n8n, Zapier, Power Automate y Vibe Coding'}</p>
            <p style="margin-top: 10px;">💰 Filtrado: Salarios desde $2,500 USD/mes | ✅ Todas las plataformas son GRATIS para postularse</p>
            <p style="margin-top: 5px; font-size: 0.85em; opacity: 0.8;">📅 Generado: ${fecha}</p>
        </div>

        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-value">${empleosFiltrados.length}</div>
                <div class="stat-label">Ofertas ($2.5k+ USD)</div>
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
                <div class="stat-value">${linksDirectos.length || fuentes.length}</div>
                <div class="stat-label">Links directos</div>
            </div>
        </div>

        ${linksDirectos.length > 0 ? `
        <h2 class="section-title">🔗 LINKS DIRECTOS - Postulación GRATIS</h2>
        <p style="margin-bottom: 15px; opacity: 0.8;">Click para buscar en cada plataforma. Todas son gratuitas para postularse.</p>
        <div class="platforms-grid" style="grid-template-columns: repeat(4, 1fr);">
            ${linksDirectos.slice(0, 12).map(l => `
                <a href="${l.url}" target="_blank" class="platform-card worldwide" style="text-align: left; padding: 15px;">
                    <div style="font-weight: 600; margin-bottom: 5px;">${l.nombre}</div>
                    <div style="font-size: 0.75em; opacity: 0.7;">${l.descripcion}</div>
                </a>
            `).join('')}
        </div>

        <h2 class="section-title">💼 PLATAFORMAS CONTRACTOR / FREELANCE (GRATIS)</h2>
        <div class="platforms-grid" style="grid-template-columns: repeat(4, 1fr);">
            ${linksDirectos.filter(l => l.nombre.includes('💼')).map(l => `
                <a href="${l.url}" target="_blank" class="platform-card latam" style="text-align: left; padding: 15px;">
                    <div style="font-weight: 600; margin-bottom: 5px;">${l.nombre.replace('💼 ', '')}</div>
                    <div style="font-size: 0.75em; opacity: 0.7;">${l.descripcion}</div>
                </a>
            `).join('')}
        </div>
        ` : ''}

        <div class="filters">
            <span class="filter-tag" style="background: rgba(56, 239, 125, 0.2); color: #38ef7d;">⚡ n8n</span>
            <span class="filter-tag" style="background: rgba(56, 239, 125, 0.2); color: #38ef7d;">🔵 Power Automate</span>
            <span class="filter-tag" style="background: rgba(56, 239, 125, 0.2); color: #38ef7d;">🟠 Zapier</span>
            <span class="filter-tag" style="background: rgba(56, 239, 125, 0.2); color: #38ef7d;">🟣 Make</span>
            <span class="filter-tag">📊 BPA</span>
            <span class="filter-tag">🔄 RPA</span>
            <span class="filter-tag">🤖 AI</span>
            <span class="filter-tag">📝 No-Code</span>
            <span class="filter-tag">🇦🇷 Argentina</span>
            <span class="filter-tag">🌎 Worldwide</span>
        </div>

        <h2 class="section-title">🇦🇷 Plataformas para Argentina / LATAM</h2>
        <div class="platforms-grid">
            ${FREELANCE_PLATFORMS_LATAM.map(p => `
                <a href="${p.url}" target="_blank" class="platform-card latam">
                    <div class="platform-icon">${p.icon}</div>
                    <div class="platform-name">${p.name}</div>
                    <div class="platform-desc">${p.desc}</div>
                </a>
            `).join('')}
        </div>

        <h2 class="section-title">🌍 Plataformas Worldwide (Pago en USD)</h2>
        <div class="platforms-grid">
            ${FREELANCE_PLATFORMS_WORLDWIDE.map(p => `
                <a href="${p.url}" target="_blank" class="platform-card worldwide">
                    <div class="platform-icon">${p.icon}</div>
                    <div class="platform-name">${p.name}</div>
                    <div class="platform-desc">${p.desc}</div>
                </a>
            `).join('')}
        </div>

        <h2 class="section-title">🔧 Búsquedas por Herramienta</h2>
        <div class="tools-grid">
            ${TOOL_SPECIFIC_SEARCHES.map(t => `
                <div class="tool-card">
                    <div class="tool-name">⚡ ${t.tool}</div>
                    <div class="tool-links">
                        ${t.urls.map((url, i) => `<a href="${url}" target="_blank">Buscar ${i+1}</a>`).join(' | ')}
                    </div>
                </div>
            `).join('')}
        </div>

        <h2 class="section-title">💼 Ofertas de Trabajo - Salario $2,500+ USD (${empleosFiltrados.length})</h2>
        <div class="jobs-grid">`;

    if (empleosFiltrados.length > 0) {
        empleosFiltrados.forEach(emp => {
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
            <h3>💡 Tips para conseguir trabajo en BPA / Automatización</h3>
            <div class="tips-grid">
                <div class="tip-item">
                    <span class="tip-icon">🔧</span>
                    <span class="tip-text"><strong>Domina las herramientas clave:</strong> n8n (gratis, open source), Zapier, Make, Power Automate. Empieza con n8n que es gratis.</span>
                </div>
                <div class="tip-item">
                    <span class="tip-icon">🎯</span>
                    <span class="tip-text"><strong>Crea un portfolio:</strong> Automatiza algo real (CRM, email, reportes) y documéntalo en GitHub o Notion.</span>
                </div>
                <div class="tip-item">
                    <span class="tip-icon">🇦🇷</span>
                    <span class="tip-text"><strong>Para Argentina:</strong> Workana y GetOnBoard tienen muchos proyectos en español. Torre.ai usa AI para matchear.</span>
                </div>
                <div class="tip-item">
                    <span class="tip-icon">💰</span>
                    <span class="tip-text"><strong>Cobra en USD:</strong> Upwork, Toptal y Contra pagan en dólares. Ideal para freelancers argentinos.</span>
                </div>
                <div class="tip-item">
                    <span class="tip-icon">📜</span>
                    <span class="tip-text"><strong>Certificaciones útiles:</strong> Microsoft Power Platform, UiPath, Zapier Expert. Muchas son gratis.</span>
                </div>
                <div class="tip-item">
                    <span class="tip-icon">🚀</span>
                    <span class="tip-text"><strong>Vibe Coding:</strong> Aprende a usar Claude/GPT para generar código y automatizaciones más rápido.</span>
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
