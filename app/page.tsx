'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Empleo {
  titulo: string;
  empresa: string;
  ubicacion: string;
  url: string;
  fecha: string;
  categoria: string;
  tipo: string;
  salario: string;
  tags: string[];
  nivel: string;
  match: number;
}

interface Activo {
  simbolo: string;
  nombre: string;
  sector: string;
  descripcion: string;
  precio: number;
  cambio: number;
  cambioSemanal?: number;
  recomendacion: { tipo: string; texto: string; accion: string };
  riesgo: string;
  horizonte: string;
}

interface ChecklistItem {
  id: string;
  paso: number;
  titulo: string;
  descripcion: string;
  tips: string[];
  done: boolean;
}

// Función para extraer keywords del CV
function extractKeywordsFromCV(text: string): string[] {
  const keywords: string[] = [];
  const t = text.toLowerCase();

  // Tecnologías
  const techs = [
    'python', 'sql', 'r', 'java', 'javascript', 'typescript',
    'power bi', 'tableau', 'looker', 'metabase', 'qlik',
    'excel', 'google sheets',
    'aws', 'azure', 'gcp', 'google cloud',
    'spark', 'hadoop', 'databricks',
    'airflow', 'dbt', 'fivetran', 'stitch',
    'snowflake', 'redshift', 'bigquery', 'postgresql', 'mysql', 'mongodb',
    'tensorflow', 'pytorch', 'scikit-learn', 'keras',
    'pandas', 'numpy', 'matplotlib',
    'docker', 'kubernetes', 'git',
    'n8n', 'zapier', 'power automate', 'make', 'integromat',
    'rpa', 'uipath', 'automation anywhere', 'blue prism',
    'llm', 'gpt', 'langchain', 'openai', 'huggingface',
    'machine learning', 'deep learning', 'nlp', 'computer vision',
    'etl', 'elt', 'data pipeline',
  ];

  for (const tech of techs) {
    if (t.includes(tech)) {
      keywords.push(tech.charAt(0).toUpperCase() + tech.slice(1));
    }
  }

  // Roles
  if (t.includes('data analyst') || t.includes('analista de datos')) keywords.push('Data Analyst');
  if (t.includes('data engineer') || t.includes('ingeniero de datos')) keywords.push('Data Engineer');
  if (t.includes('data scientist') || t.includes('científico de datos')) keywords.push('Data Scientist');
  if (t.includes('machine learning') || t.includes('ml engineer')) keywords.push('ML Engineer');
  if (t.includes('bi developer') || t.includes('business intelligence')) keywords.push('BI Developer');
  if (t.includes('automation') || t.includes('automatización')) keywords.push('Automation');
  if (t.includes('ai engineer') || t.includes('artificial intelligence')) keywords.push('AI Engineer');

  // Años de experiencia
  const expMatch = t.match(/(\d+)\s*(años|years|año|year)/);
  if (expMatch) keywords.push(`${expMatch[1]}+ años exp`);

  // Idiomas
  if (t.includes('inglés') || t.includes('english')) keywords.push('Inglés');
  if (t.includes('portugués') || t.includes('portuguese')) keywords.push('Portugués');

  // Nivel
  if (t.includes('senior') || t.includes('sr')) keywords.push('Senior');
  if (t.includes('lead') || t.includes('líder')) keywords.push('Lead');
  if (t.includes('junior') || t.includes('jr')) keywords.push('Junior');

  return [...new Set(keywords)].slice(0, 12);
}

const CHECKLIST_INICIAL: ChecklistItem[] = [
  {
    id: '1',
    paso: 1,
    titulo: 'Definir el Problema',
    descripcion: 'Antes de escribir código, define claramente qué problema resuelves y para quién.',
    tips: [
      '¿Qué dolor resuelve tu app?',
      '¿Quién es tu usuario objetivo?',
      '¿Cómo sabrás que está resuelto?'
    ],
    done: false
  },
  {
    id: '2',
    paso: 2,
    titulo: 'Crear PRD (Product Requirements)',
    descripcion: 'Documenta los requisitos antes de empezar. Esto guiará todo el desarrollo.',
    tips: [
      'User stories: "Como [usuario], quiero [acción], para [beneficio]"',
      'Lista de features para el MVP',
      'Criterios de aceptación claros'
    ],
    done: false
  },
  {
    id: '3',
    paso: 3,
    titulo: 'Elegir Stack Tecnológico',
    descripcion: 'Define las tecnologías que usarás. Prioriza lo que conoces o lo que tiene buena documentación.',
    tips: [
      'Frontend: React, Vue, Next.js, etc.',
      'Backend: Node, Python, Go, etc.',
      'Base de datos: PostgreSQL, MongoDB, etc.'
    ],
    done: false
  },
  {
    id: '4',
    paso: 4,
    titulo: 'Configurar Entorno Seguro',
    descripcion: 'Configura tu sandbox y entorno de desarrollo aislado.',
    tips: [
      'Nunca desactives el sandbox',
      'Usa variables de entorno para secrets',
      'Configura .gitignore correctamente'
    ],
    done: false
  },
  {
    id: '5',
    paso: 5,
    titulo: 'Escribir Tests (TDD - Red)',
    descripcion: 'Escribe los tests ANTES de implementar. Define qué debe hacer tu código.',
    tips: [
      'Un test por comportamiento esperado',
      'Incluye casos edge (vacío, null, límites)',
      'El test debe FALLAR primero'
    ],
    done: false
  },
  {
    id: '6',
    paso: 6,
    titulo: 'Implementar Código Mínimo (TDD - Green)',
    descripcion: 'Escribe el código mínimo necesario para que los tests pasen.',
    tips: [
      'No optimices prematuramente',
      'Hazlo funcionar primero',
      'Código simple > código clever'
    ],
    done: false
  },
  {
    id: '7',
    paso: 7,
    titulo: 'Refactorizar (TDD - Blue)',
    descripcion: 'Mejora el código sin romper los tests. Limpia, organiza, optimiza.',
    tips: [
      'Elimina código duplicado',
      'Mejora nombres de variables/funciones',
      'Extrae funciones si algo es muy largo'
    ],
    done: false
  },
  {
    id: '8',
    paso: 8,
    titulo: 'Revisar Código Generado',
    descripcion: 'NUNCA aceptes código sin revisarlo. Busca bugs, vulnerabilidades y mejoras.',
    tips: [
      '¿Entiendes cada línea?',
      '¿Hay vulnerabilidades de seguridad?',
      '¿Maneja todos los casos edge?'
    ],
    done: false
  },
  {
    id: '9',
    paso: 9,
    titulo: 'Documentar',
    descripcion: 'Documenta mientras desarrollas, no al final.',
    tips: [
      'README con instrucciones de instalación',
      'Comentarios en código complejo',
      'Documentación de API si aplica'
    ],
    done: false
  },
  {
    id: '10',
    paso: 10,
    titulo: 'Iterar y Mejorar',
    descripcion: 'Repite el ciclo para cada nueva feature. Cambios pequeños y frecuentes.',
    tips: [
      'Un feature a la vez',
      'Commits frecuentes con mensajes claros',
      'Pide feedback temprano'
    ],
    done: false
  }
];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        '¡Hola! 👋 Soy tu copiloto de Vibe Coding.\n\n🚀 **¿Qué construimos hoy?**\n\nCuéntame tu idea y te guío paso a paso:\n• Definimos el plan juntos\n• Escribimos tests primero\n• Implementamos de forma incremental\n• Revisamos cada paso\n\n📝 Ejemplos para empezar:\n• "Quiero hacer una landing page"\n• "Necesito una API de autenticación"\n• "Ayúdame a crear un dashboard"',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'guia' | 'chat' | 'checklist' | 'laboral' | 'financiero'>('guia');
  const [secretMode, setSecretMode] = useState(false);
  const [empleos, setEmpleos] = useState<Empleo[]>([]);
  const [activos, setActivos] = useState<Activo[]>([]);
  const [loadingEmpleos, setLoadingEmpleos] = useState(false);
  const [loadingActivos, setLoadingActivos] = useState(false);
  const [checklist, setChecklist] = useState<ChecklistItem[]>(CHECKLIST_INICIAL);
  const [cvText, setCvText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Cargar checklist del localStorage
  useEffect(() => {
    const saved = localStorage.getItem('vibecoding-checklist');
    if (saved) {
      setChecklist(JSON.parse(saved));
    }
  }, []);

  // Guardar checklist en localStorage
  const toggleChecklistItem = (id: string) => {
    const updated = checklist.map(item =>
      item.id === id ? { ...item, done: !item.done } : item
    );
    setChecklist(updated);
    localStorage.setItem('vibecoding-checklist', JSON.stringify(updated));
  };

  const resetChecklist = () => {
    setChecklist(CHECKLIST_INICIAL);
    localStorage.removeItem('vibecoding-checklist');
  };

  const completedSteps = checklist.filter(item => item.done).length;
  const progress = (completedSteps / checklist.length) * 100;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim().toLowerCase();
    setInput('');

    // Detectar palabra mágica
    if (userMessage === 'mercado') {
      setSecretMode(true);
      setMessages(prev => [...prev,
        { role: 'user', content: input.trim() },
        { role: 'assistant', content: '🔮 **¡Has descubierto el modo secreto!**\n\nSe han desbloqueado nuevas pestañas:\n\n💼 **Mercado Laboral** - Empleos remotos Data/AI $2,500+ USD\n📈 **Mercado Financiero** - Análisis de inversiones\n\n👆 Mira arriba, ahora tienes acceso a las pestañas ocultas.' }
      ]);
      return;
    }

    setMessages((prev) => [...prev, { role: 'user', content: input.trim() }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: input.trim() }],
        }),
      });

      if (!response.ok) throw new Error('Error en la respuesta');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';

      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('0:')) {
            try {
              const text = JSON.parse(line.slice(2));
              assistantMessage += text;
              setMessages((prev) => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = {
                  role: 'assistant',
                  content: assistantMessage,
                };
                return newMessages;
              });
            } catch {
              // Ignorar
            }
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Error de conexión. Intenta de nuevo.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const buscarEmpleos = async () => {
    setLoadingEmpleos(true);
    try {
      const response = await fetch('/api/mercado?tipo=laboral' + (cvText ? `&cv=${encodeURIComponent(cvText)}` : ''));
      const data = await response.json();
      setEmpleos(data.empleos || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoadingEmpleos(false);
    }
  };

  const obtenerActivos = async () => {
    setLoadingActivos(true);
    try {
      const response = await fetch('/api/mercado?tipo=financiero');
      const data = await response.json();
      setActivos(data.activos || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoadingActivos(false);
    }
  };

  // Auto-cargar AMBOS mercados cuando se desbloquea el modo secreto
  useEffect(() => {
    if (secretMode) {
      if (activos.length === 0) {
        obtenerActivos();
      }
      if (empleos.length === 0) {
        buscarEmpleos();
      }
    }
  }, [secretMode]);

  // Recargar si se entra a la pestaña y está vacío
  useEffect(() => {
    if (secretMode && activeTab === 'laboral' && empleos.length === 0) {
      buscarEmpleos();
    }
    if (secretMode && activeTab === 'financiero' && activos.length === 0) {
      obtenerActivos();
    }
  }, [activeTab]);

  return (
    <main className="container">
      <div className="header">
        <h1>🚀 Vibe Coding</h1>
        <p>Tu copiloto para desarrollo colaborativo con IA</p>
      </div>

      <div className="tabs">
        <button className={`tab ${activeTab === 'guia' ? 'active' : ''}`} onClick={() => setActiveTab('guia')}>
          📚 Guía
        </button>
        <button className={`tab ${activeTab === 'checklist' ? 'active' : ''}`} onClick={() => setActiveTab('checklist')}>
          ✅ Checklist
        </button>
        <button className={`tab ${activeTab === 'chat' ? 'active' : ''}`} onClick={() => setActiveTab('chat')}>
          💬 Copiloto IA
        </button>
        {secretMode && (
          <>
            <button className={`tab secret ${activeTab === 'laboral' ? 'active' : ''}`} onClick={() => setActiveTab('laboral')}>
              💼 Laboral
            </button>
            <button className={`tab secret ${activeTab === 'financiero' ? 'active' : ''}`} onClick={() => setActiveTab('financiero')}>
              📈 Financiero
            </button>
          </>
        )}
      </div>

      {/* GUÍA */}
      {activeTab === 'guia' && (
        <div className="guia-section">
          <div className="intro-box">
            <h2>¿Qué es Vibe Coding?</h2>
            <p>
              Es un enfoque de desarrollo donde <strong>colaboras con IA</strong> para crear software.
              Describes lo que quieres en lenguaje natural y la IA genera el código. Tu rol es guiar, revisar y refinar.
            </p>
            <p className="quote">
              "You just see stuff, say stuff, run stuff, and copy-paste stuff, and it mostly works." — Andrej Karpathy
            </p>
          </div>

          <h2 className="section-title">🎯 Las 6 Prácticas Fundamentales</h2>

          <div className="practices-grid">
            <div className="practice-card">
              <div className="practice-icon">🧪</div>
              <h3>1. Tests Primero (TDD)</h3>
              <div className="tdd-steps">
                <div className="tdd-step red">🔴 RED: Escribe un test que falle</div>
                <div className="tdd-step green">🟢 GREEN: Código mínimo para pasar</div>
                <div className="tdd-step blue">🔵 REFACTOR: Mejora sin romper tests</div>
              </div>
              <p className="practice-tip">
                <strong>Prompt:</strong> "Genera tests unitarios para esta función antes de implementarla. Incluye edge cases."
              </p>
            </div>

            <div className="practice-card">
              <div className="practice-icon">👀</div>
              <h3>2. Revisar Todo el Código</h3>
              <ul>
                <li>Nunca aceptes código sin entenderlo</li>
                <li>Busca vulnerabilidades de seguridad</li>
                <li>Identifica edge cases no manejados</li>
                <li>Elimina código innecesario</li>
              </ul>
            </div>

            <div className="practice-card">
              <div className="practice-icon">🔄</div>
              <h3>3. Iterar Pequeño</h3>
              <ul>
                <li>Cambios incrementales, no reescrituras</li>
                <li>Un feature a la vez</li>
                <li>Commits frecuentes</li>
                <li>Mensajes de commit claros</li>
              </ul>
            </div>

            <div className="practice-card">
              <div className="practice-icon">📝</div>
              <h3>4. Documentar Siempre</h3>
              <ul>
                <li>README actualizado</li>
                <li>Comentarios en código complejo</li>
                <li>Documentación de API</li>
                <li>Changelog de cambios</li>
              </ul>
            </div>

            <div className="practice-card">
              <div className="practice-icon">🔒</div>
              <h3>5. Sandbox Activo</h3>
              <ul>
                <li>Entorno aislado siempre</li>
                <li>Revisar permisos antes de aprobar</li>
                <li>Nunca ejecutar comandos sin entender</li>
                <li>Variables de entorno para secrets</li>
              </ul>
            </div>

            <div className="practice-card">
              <div className="practice-icon">✨</div>
              <h3>6. Prompts Efectivos</h3>
              <ul>
                <li>Sé específico y da contexto</li>
                <li>Incluye ejemplos de input/output</li>
                <li>Pide paso a paso</li>
                <li>Especifica el formato</li>
              </ul>
            </div>
          </div>

          <div className="cta-box">
            <h3>🎯 ¿Listo para empezar?</h3>
            <p>Usa el <strong>Checklist</strong> para seguir los pasos, o habla con el <strong>Copiloto IA</strong> para que te guíe.</p>
            <div className="cta-buttons">
              <button className="btn" onClick={() => setActiveTab('checklist')}>Ver Checklist</button>
              <button className="btn btn-secondary" onClick={() => setActiveTab('chat')}>Hablar con Copiloto</button>
            </div>
          </div>
        </div>
      )}

      {/* CHECKLIST */}
      {activeTab === 'checklist' && (
        <div className="checklist-section">
          <div className="checklist-header">
            <div>
              <h2>✅ Checklist de Vibe Coding</h2>
              <p>Marca cada paso mientras avanzas en tu proyecto</p>
            </div>
            <button className="btn btn-small" onClick={resetChecklist}>🔄 Reiniciar</button>
          </div>

          <div className="progress-container">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <span className="progress-text">{completedSteps} de {checklist.length} completados ({Math.round(progress)}%)</span>
          </div>

          <div className="checklist-list">
            {checklist.map((item) => (
              <div key={item.id} className={`checklist-item ${item.done ? 'done' : ''}`} onClick={() => toggleChecklistItem(item.id)}>
                <div className="checklist-checkbox">
                  {item.done ? '✓' : item.paso}
                </div>
                <div className="checklist-content">
                  <h3>{item.titulo}</h3>
                  <p>{item.descripcion}</p>
                  <div className="checklist-tips">
                    {item.tips.map((tip, i) => (
                      <span key={i} className="tip-tag">💡 {tip}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {completedSteps === checklist.length && (
            <div className="completion-box">
              🎉 <strong>¡Felicitaciones!</strong> Has completado todos los pasos de Vibe Coding.
              ¡Ahora repite el ciclo para tu siguiente feature!
            </div>
          )}
        </div>
      )}

      {/* CHAT */}
      {activeTab === 'chat' && (
        <div className="chat-container">
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.role}`}>
                <pre>{message.content}</pre>
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role === 'user' && (
              <div className="message assistant">
                <span className="spinner"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="chat-input-container">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe qué quieres construir..."
              className="chat-input"
              disabled={isLoading}
            />
            <button type="submit" className="btn" disabled={isLoading || !input.trim()}>
              Enviar
            </button>
          </form>
        </div>
      )}

      {/* MERCADO LABORAL */}
      {activeTab === 'laboral' && secretMode && (
        <div className="mercado-section">
          <div className="mercado-header">
            <div>
              <h2>💼 Mercado Laboral - Modo Experto</h2>
              <p className="mercado-subtitle">Data Analytics → IA/Automation | Remoto | $2,500+ USD/mes</p>
            </div>
            <button className="btn" onClick={buscarEmpleos} disabled={loadingEmpleos}>
              {loadingEmpleos ? 'Buscando...' : '🔄 Buscar'}
            </button>
          </div>

          <div className="cv-section">
            <h3>📄 Describe tu perfil profesional</h3>
            <p>Incluye: años de experiencia, tecnologías, idiomas, industrias, rol actual o deseado</p>
            <textarea
              className="cv-textarea"
              placeholder="Ejemplo: 4 años como Data Analyst. Manejo avanzado de Python, SQL, Power BI y Tableau. Experiencia en ETL con Airflow. Conocimientos básicos de Machine Learning con scikit-learn. Trabajé en fintech y e-commerce. Busco transición a roles de AI/ML o Data Engineering. Inglés avanzado (B2). Disponibilidad full-time remoto."
              value={cvText}
              onChange={(e) => setCvText(e.target.value)}
              rows={5}
            />
            <div className="cv-actions">
              <button className="btn btn-primary" onClick={buscarEmpleos} disabled={loadingEmpleos || !cvText.trim()}>
                {loadingEmpleos ? '🔍 Analizando perfil...' : '🎯 Buscar empleos para mi perfil'}
              </button>
              {cvText && (
                <button className="btn btn-secondary" onClick={() => { setCvText(''); buscarEmpleos(); }}>
                  Ver todos los empleos
                </button>
              )}
            </div>
            {cvText && (
              <div className="cv-analysis">
                <strong>🔍 Keywords detectados:</strong>
                <div className="cv-keywords">
                  {extractKeywordsFromCV(cvText).map((kw, i) => (
                    <span key={i} className="keyword-tag">{kw}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="filters-info">
            <span className="filter-tag">🎯 Data Analyst</span>
            <span className="filter-tag">🤖 AI/ML Engineer</span>
            <span className="filter-tag">⚙️ Automation</span>
            <span className="filter-tag">📊 BI Developer</span>
            <span className="filter-tag">💰 $2,500+ USD</span>
          </div>

          {loadingEmpleos ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Buscando las mejores oportunidades...</p>
            </div>
          ) : empleos.length > 0 ? (
            <div className="empleos-list">
              {empleos.map((empleo, index) => (
                <div key={index} className="empleo-card">
                  <div className="empleo-header">
                    <div>
                      <div className="empleo-empresa">🏢 {empleo.empresa}</div>
                      <div className="empleo-titulo">{empleo.titulo}</div>
                    </div>
                    <div className="empleo-salario">{empleo.salario}</div>
                  </div>
                  {empleo.tags && empleo.tags.length > 0 && (
                    <div className="empleo-tags">
                      {empleo.tags.map((tag, i) => (
                        <span key={i} className="tag">{tag}</span>
                      ))}
                    </div>
                  )}
                  <div className="empleo-detalles">
                    <span>📍 {empleo.ubicacion}</span>
                    <span>📅 {empleo.fecha}</span>
                    <span>🏷️ {empleo.categoria}</span>
                  </div>
                  <a href={empleo.url} target="_blank" rel="noopener noreferrer" className="empleo-link">
                    Ver oferta y aplicar →
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>🔍 Haz clic en "Buscar" para encontrar oportunidades</p>
            </div>
          )}
        </div>
      )}

      {/* MERCADO FINANCIERO */}
      {activeTab === 'financiero' && secretMode && (
        <div className="mercado-section">
          <div className="mercado-header">
            <div>
              <h2>📈 Análisis de Inversiones - Mediano Plazo</h2>
              <p className="mercado-subtitle">Acciones, ETFs y Crypto seleccionados con análisis profesional</p>
            </div>
            <button className="btn" onClick={obtenerActivos} disabled={loadingActivos}>
              {loadingActivos ? 'Cargando...' : '🔄 Actualizar'}
            </button>
          </div>

          <div className="disclaimer-box">
            ⚠️ <strong>Disclaimer:</strong> Este análisis es solo informativo y educativo. No constituye asesoría financiera.
            Siempre haz tu propia investigación (DYOR) antes de invertir. Las inversiones conllevan riesgo de pérdida.
          </div>

          <div className="investment-info">
            <div className="info-card">
              <h4>🎯 Horizonte</h4>
              <p>Mediano plazo (6-24 meses)</p>
            </div>
            <div className="info-card">
              <h4>📊 Estrategia</h4>
              <p>DCA (Dollar Cost Averaging)</p>
            </div>
            <div className="info-card">
              <h4>⚖️ Diversificación</h4>
              <p>Multi-sector y multi-activo</p>
            </div>
          </div>

          {loadingActivos ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Obteniendo datos del mercado...</p>
            </div>
          ) : activos.length > 0 ? (
            <div className="activos-sections">
              {['Crypto', 'Tech', 'Finance', 'Healthcare', 'Consumer', 'Energy', 'Telecom', 'Argentina', 'ETF'].map((sector) => {
                const sectorActivos = activos.filter((a) => a.sector === sector);
                if (sectorActivos.length === 0) return null;

                return (
                  <div key={sector} className="sector-section">
                    <h3 className="sector-title">
                      {sector === 'Crypto' && '🪙 Criptomonedas'}
                      {sector === 'Tech' && '💻 Tecnología'}
                      {sector === 'Finance' && '🏦 Finanzas'}
                      {sector === 'Healthcare' && '🏥 Salud'}
                      {sector === 'Consumer' && '🛒 Consumo'}
                      {sector === 'Energy' && '⚡ Energía'}
                      {sector === 'Telecom' && '📡 Telecomunicaciones'}
                      {sector === 'Argentina' && '🇦🇷 Argentina'}
                      {sector === 'ETF' && '📊 ETFs'}
                    </h3>
                    <div className="activos-list">
                      {sectorActivos.map((activo, index) => (
                        <div key={index} className={`activo-card ${activo.cambio >= 0 ? 'positivo' : 'negativo'}`}>
                          <div className="activo-header">
                            <div className="activo-simbolo">{activo.simbolo}</div>
                            <div className={`activo-cambio ${activo.cambio >= 0 ? 'up' : 'down'}`}>
                              {activo.cambio >= 0 ? '▲' : '▼'} {Math.abs(activo.cambio).toFixed(2)}%
                            </div>
                          </div>
                          <div className="activo-nombre">{activo.nombre}</div>
                          <div className="activo-precio">${activo.precio?.toFixed(2)}</div>
                          <div className="activo-descripcion">{activo.descripcion}</div>
                          <div className="activo-meta">
                            <span className={`riesgo ${activo.riesgo}`}>Riesgo: {activo.riesgo}</span>
                          </div>
                          <div className={`activo-recomendacion ${activo.recomendacion?.tipo}`}>
                            <strong>{activo.recomendacion?.accion}</strong>
                            <p>{activo.recomendacion?.texto}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="empty-state">
              <p>📊 Haz clic en "Actualizar" para cargar datos del mercado</p>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
