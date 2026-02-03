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
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        '¡Hola! 👋 Soy tu asistente de Vibe Coding. Puedo ayudarte con buenas prácticas de desarrollo con IA, TDD, prompts efectivos, seguridad y más. ¿Qué te gustaría saber?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'empleos'>('chat');
  const [empleos, setEmpleos] = useState<Empleo[]>([]);
  const [loadingEmpleos, setLoadingEmpleos] = useState(false);
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
              // Ignorar líneas que no son JSON válido
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
          content: 'Lo siento, hubo un error al procesar tu mensaje. Por favor intenta de nuevo.',
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

  useEffect(() => {
    if (activeTab === 'empleos' && empleos.length === 0) {
      buscarEmpleos();
    }
  }, [activeTab]);

  return (
    <main className="container">
      <div className="header">
        <h1>🚀 Vibe Coding Assistant</h1>
        <p>Tu guía para desarrollo colaborativo con IA</p>
      </div>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'chat' ? 'active' : ''}`}
          onClick={() => setActiveTab('chat')}
        >
          💬 Chat con IA
        </button>
        <button
          className={`tab ${activeTab === 'empleos' ? 'active' : ''}`}
          onClick={() => setActiveTab('empleos')}
        >
          💼 Empleos Remotos
        </button>
      </div>

      {activeTab === 'chat' && (
        <>
          <div className="chat-container">
            <div className="chat-messages">
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.role}`}>
                  {message.content}
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
                placeholder="Pregunta sobre Vibe Coding, TDD, prompts..."
                className="chat-input"
                disabled={isLoading}
              />
              <button type="submit" className="btn" disabled={isLoading || !input.trim()}>
                Enviar
              </button>
            </form>
          </div>

          <div className="features">
            <div className="feature-card">
              <h3>🧪 TDD</h3>
              <p>
                Test-Driven Development: Red (escribe test que falla), Green (código mínimo), Refactor
                (mejora sin romper tests).
              </p>
            </div>
            <div className="feature-card">
              <h3>📝 Prompts Efectivos</h3>
              <p>Sé específico, da contexto, pide paso a paso. Mejores prompts = mejores resultados.</p>
            </div>
            <div className="feature-card">
              <h3>🔒 Seguridad</h3>
              <p>Revisa permisos, lee cada comando, mantén el sandbox activo, nunca compartas credenciales.</p>
            </div>
            <div className="feature-card">
              <h3>📄 PRD</h3>
              <p>
                Product Requirements Document: Define requisitos, user stories, specs técnicos y criterios
                de aceptación.
              </p>
            </div>
            <div className="feature-card">
              <h3>🔄 Iteración</h3>
              <p>Cambios pequeños y frecuentes. Un MVP funcional primero, luego mejoras incrementales.</p>
            </div>
            <div className="feature-card">
              <h3>📚 Documentación</h3>
              <p>Documenta mientras desarrollas. README, comentarios en código complejo, guías de API.</p>
            </div>
          </div>
        </>
      )}

      {activeTab === 'empleos' && (
        <div className="empleos-section">
          <div className="empleos-header">
            <h2>💼 Empleos Remotos - Automation/Process</h2>
            <button className="btn" onClick={buscarEmpleos} disabled={loadingEmpleos}>
              {loadingEmpleos ? 'Buscando...' : '🔄 Actualizar'}
            </button>
          </div>

          {loadingEmpleos ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Buscando empleos remotos...</p>
            </div>
          ) : empleos.length > 0 ? (
            <div className="empleos-list">
              {empleos.map((empleo, index) => (
                <div key={index} className="empleo-card">
                  <div className="empleo-empresa">🏢 {empleo.empresa}</div>
                  <div className="empleo-titulo">{empleo.titulo}</div>
                  <div className="empleo-detalles">
                    <span>📍 {empleo.ubicacion}</span>
                    <span>📅 {empleo.fecha}</span>
                    <span>🏷️ {empleo.categoria}</span>
                    {empleo.salario !== 'No especificado' && <span>💰 {empleo.salario}</span>}
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
    </main>
  );
}
