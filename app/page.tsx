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
}

interface Activo {
  simbolo: string;
  nombre: string;
  sector: string;
  descripcion: string;
  precio: number;
  cambio: number;
  recomendacion: { tipo: string; texto: string };
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        '¡Hola! 👋 Soy tu copiloto de Vibe Coding.\n\n🚀 **¿Qué construimos hoy?**\n\nCuéntame tu idea y te guío paso a paso:\n• Definimos el plan juntos\n• Escribimos tests primero\n• Implementamos de forma incremental\n• Revisamos cada paso\n\n📝 Ejemplos para empezar:\n• "Quiero hacer una landing page"\n• "Necesito una API de autenticación"\n• "Ayúdame a crear un dashboard"\n\n💡 Escribe **"mercado"** para ver oportunidades laborales y financieras.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'guia' | 'chat' | 'laboral' | 'financiero'>('guia');
  const [empleos, setEmpleos] = useState<Empleo[]>([]);
  const [activos, setActivos] = useState<Activo[]>([]);
  const [loadingEmpleos, setLoadingEmpleos] = useState(false);
  const [loadingActivos, setLoadingActivos] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMessage }],
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
              // Ignorar líneas inválidas
            }
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Lo siento, hubo un error. Por favor intenta de nuevo.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const buscarEmpleos = async () => {
    setLoadingEmpleos(true);
    try {
      const response = await fetch('/api/mercado?tipo=laboral');
      const data = await response.json();
      setEmpleos(data.empleos || []);
    } catch (error) {
      console.error('Error buscando empleos:', error);
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
      console.error('Error obteniendo activos:', error);
    } finally {
      setLoadingActivos(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'laboral' && empleos.length === 0) {
      buscarEmpleos();
    } else if (activeTab === 'financiero' && activos.length === 0) {
      obtenerActivos();
    }
  }, [activeTab]);

  return (
    <main className="container">
      <div className="header">
        <h1>🚀 Vibe Coding</h1>
        <p>Desarrollo colaborativo con IA - Guía completa de buenas prácticas</p>
      </div>

      <div className="tabs">
        <button className={`tab ${activeTab === 'guia' ? 'active' : ''}`} onClick={() => setActiveTab('guia')}>
          📚 Guía
        </button>
        <button className={`tab ${activeTab === 'chat' ? 'active' : ''}`} onClick={() => setActiveTab('chat')}>
          💬 Chat IA
        </button>
        <button className={`tab ${activeTab === 'laboral' ? 'active' : ''}`} onClick={() => setActiveTab('laboral')}>
          💼 Mercado Laboral
        </button>
        <button className={`tab ${activeTab === 'financiero' ? 'active' : ''}`} onClick={() => setActiveTab('financiero')}>
          📈 Mercado Financiero
        </button>
      </div>

      {/* GUÍA DE VIBE CODING */}
      {activeTab === 'guia' && (
        <div className="guia-section">
          <div className="intro-box">
            <h2>¿Qué es Vibe Coding?</h2>
            <p>
              Vibe Coding es un enfoque de desarrollo donde <strong>colaboras con IA</strong> para crear software.
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
              <p className="practice-tip">
                <strong>Pregunta:</strong> "¿Por qué elegiste esta implementación? ¿Hay alternativas más eficientes?"
              </p>
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
              <p className="practice-tip">
                <strong>Regla:</strong> Si un cambio toca más de 3 archivos, probablemente es demasiado grande.
              </p>
            </div>

            <div className="practice-card">
              <div className="practice-icon">📝</div>
              <h3>4. Documentar Siempre</h3>
              <ul>
                <li>README actualizado</li>
                <li>Comentarios en código complejo</li>
                <li>Documentación de API</li>
                <li>Guías de contribución</li>
              </ul>
              <p className="practice-tip">
                <strong>Prompt:</strong> "Documenta esta función con JSDoc incluyendo ejemplos de uso."
              </p>
            </div>

            <div className="practice-card">
              <div className="practice-icon">🔒</div>
              <h3>5. Sandbox Activo</h3>
              <ul>
                <li>Entorno aislado siempre</li>
                <li>Revisar permisos antes de aprobar</li>
                <li>Nunca ejecutar comandos sin entender</li>
                <li>No compartir credenciales en prompts</li>
              </ul>
              <p className="practice-tip warning">
                <strong>⚠️ Nunca:</strong> Desactivar el sandbox sin entender los riesgos.
              </p>
            </div>

            <div className="practice-card">
              <div className="practice-icon">✨</div>
              <h3>6. Prompts Efectivos</h3>
              <ul>
                <li>Sé específico y da contexto</li>
                <li>Incluye ejemplos de input/output</li>
                <li>Pide paso a paso para tareas complejas</li>
                <li>Especifica el formato de respuesta</li>
              </ul>
              <div className="code-example">
                <code>
                  CONTEXTO: App React de e-commerce<br/>
                  TAREA: Componente de carrito<br/>
                  RESTRICCIONES: TypeScript, Tailwind<br/>
                  FORMATO: Código con comentarios
                </code>
              </div>
            </div>
          </div>

          <h2 className="section-title">📄 PRD - Product Requirements Document</h2>
          <div className="prd-section">
            <p>Antes de empezar a codear, define claramente qué vas a construir:</p>
            <div className="prd-grid">
              <div className="prd-item">
                <h4>📋 Descripción del Producto</h4>
                <p>¿Qué problema resuelve? ¿Para quién?</p>
              </div>
              <div className="prd-item">
                <h4>👤 User Stories</h4>
                <p>Como [usuario], quiero [acción], para [beneficio]</p>
              </div>
              <div className="prd-item">
                <h4>⚙️ Requisitos Técnicos</h4>
                <p>Stack, integraciones, limitaciones</p>
              </div>
              <div className="prd-item">
                <h4>✅ Criterios de Aceptación</h4>
                <p>¿Cómo sabemos que está listo?</p>
              </div>
            </div>
          </div>

          <h2 className="section-title">🚨 Errores Comunes a Evitar</h2>
          <div className="errors-grid">
            <div className="error-card">
              <span className="error-icon">❌</span>
              <div>
                <strong>Aceptar código sin revisar</strong>
                <p>La IA puede generar código con bugs o vulnerabilidades. Siempre revisa.</p>
              </div>
            </div>
            <div className="error-card">
              <span className="error-icon">❌</span>
              <div>
                <strong>Cambios masivos de una vez</strong>
                <p>Refactorizar todo junto hace imposible debuggear. Itera pequeño.</p>
              </div>
            </div>
            <div className="error-card">
              <span className="error-icon">❌</span>
              <div>
                <strong>Prompts vagos</strong>
                <p>"Hazme una app" no funciona. Sé específico con contexto y requisitos.</p>
              </div>
            </div>
            <div className="error-card">
              <span className="error-icon">❌</span>
              <div>
                <strong>Ignorar los tests</strong>
                <p>Sin tests, cada cambio puede romper algo. TDD es tu red de seguridad.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CHAT CON IA */}
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
              placeholder="Pregunta sobre Vibe Coding... (escribe 'mercado' para oportunidades)"
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
      {activeTab === 'laboral' && (
        <div className="mercado-section">
          <div className="mercado-header">
            <div>
              <h2>💼 Empleos Remotos - Data & AI</h2>
              <p className="mercado-subtitle">Salario mínimo: $2,500 USD/mes | Enfoque: Data Analytics → IA/Automation</p>
            </div>
            <button className="btn" onClick={buscarEmpleos} disabled={loadingEmpleos}>
              {loadingEmpleos ? 'Buscando...' : '🔄 Actualizar'}
            </button>
          </div>

          <div className="cv-upload-box">
            <h3>📄 Personaliza tu búsqueda</h3>
            <p>Próximamente: Sube tu CV para obtener recomendaciones personalizadas basadas en tu experiencia.</p>
            <button className="btn btn-secondary" disabled>Subir CV (Próximamente)</button>
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
                  <div className="empleo-tags">
                    {empleo.tags?.map((tag, i) => (
                      <span key={i} className="tag">{tag}</span>
                    ))}
                  </div>
                  <div className="empleo-detalles">
                    <span>📍 {empleo.ubicacion}</span>
                    <span>📅 {empleo.fecha}</span>
                    <span>🏷️ {empleo.categoria}</span>
                  </div>
                  <a href={empleo.url} target="_blank" rel="noopener noreferrer" className="empleo-link">
                    Ver oferta →
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="loading">
              <p>No se encontraron empleos. Intenta actualizar.</p>
            </div>
          )}
        </div>
      )}

      {/* MERCADO FINANCIERO */}
      {activeTab === 'financiero' && (
        <div className="mercado-section">
          <div className="mercado-header">
            <div>
              <h2>📈 Análisis de Mercado</h2>
              <p className="mercado-subtitle">Acciones, ETFs y Crypto seleccionados con recomendaciones</p>
            </div>
            <button className="btn" onClick={obtenerActivos} disabled={loadingActivos}>
              {loadingActivos ? 'Cargando...' : '🔄 Actualizar'}
            </button>
          </div>

          <div className="disclaimer-box">
            ⚠️ <strong>Disclaimer:</strong> Este análisis es solo informativo. No constituye asesoría financiera.
            Investiga por tu cuenta antes de invertir.
          </div>

          {loadingActivos ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Obteniendo datos del mercado...</p>
            </div>
          ) : activos.length > 0 ? (
            <div className="activos-grid">
              {['Crypto', 'Tech', 'Finance', 'Healthcare', 'Consumer', 'Energy', 'Argentina', 'ETF'].map((sector) => {
                const sectorActivos = activos.filter((a) => a.sector === sector);
                if (sectorActivos.length === 0) return null;

                return (
                  <div key={sector} className="sector-section">
                    <h3 className="sector-title">
                      {sector === 'Crypto' && '🪙'}
                      {sector === 'Tech' && '💻'}
                      {sector === 'Finance' && '🏦'}
                      {sector === 'Healthcare' && '🏥'}
                      {sector === 'Consumer' && '🛒'}
                      {sector === 'Energy' && '⚡'}
                      {sector === 'Argentina' && '🇦🇷'}
                      {sector === 'ETF' && '📊'}
                      {' '}{sector}
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
                          <div className={`activo-recomendacion ${activo.recomendacion?.tipo}`}>
                            {activo.recomendacion?.texto}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="loading">
              <p>No se pudieron cargar los datos. Intenta actualizar.</p>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
