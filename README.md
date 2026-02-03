# 🚀 Vibe Coding Assistant

**Aplicación web para aprender y practicar Vibe Coding** - desarrollo colaborativo con IA.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Laurafrey11/VibeCoding_Tips)

---

## 📋 Características Principales

### 1. 📚 Guía Completa de Vibe Coding
- **Las 6 prácticas fundamentales** del desarrollo con IA
- **TDD (Test-Driven Development):** Red → Green → Refactor
- Cómo escribir **prompts efectivos**
- **Seguridad y sandbox** - mejores prácticas
- Creación de **PRD** (Product Requirements Document)
- Errores comunes a evitar

### 2. ✅ Checklist Interactivo
- **10 pasos** del flujo completo de Vibe Coding
- **Progreso persistente** (guardado en localStorage)
- Barra de progreso visual
- Tips específicos para cada paso
- Click para marcar como completado

### 3. 💬 Copiloto IA (GPT-4o)
Un asistente que **realmente hace Vibe Coding contigo**:
- Pregunta antes de codear (clarifica requisitos)
- Genera **mini-PRD** antes de implementar
- Escribe **tests primero** (TDD)
- Implementa de forma **incremental**
- Revisa código contigo en cada paso
- Advierte sobre temas de **seguridad**

### 4. 🔮 Modo Secreto
Escribe **"mercado"** en el chat para desbloquear:

#### 💼 Mercado Laboral
- Empleos remotos **$2,500+ USD/mes**
- Enfoque: **Data Analyst → IA/Automation**
- **Búsqueda inteligente con CV:**
  - Analiza tu perfil profesional automáticamente
  - Detecta tecnologías, años de experiencia, nivel
  - Muestra keywords detectados en tiempo real
  - Personaliza búsquedas según tu perfil
  - Prioriza empleos que matchean tus skills

#### 📈 Mercado Financiero
Análisis de inversiones **mediano plazo** (6-24 meses):

| Sector | Activos |
|--------|---------|
| 🪙 Crypto | DOT, ETH, ADA |
| 💻 Tech | GOOGL, MSFT, AMZN, NVDA, AMD, TSLA, AAPL, ADBE, TSM |
| 🏦 Finance | JPM, V, AXP, BRK-B, B |
| 🏥 Healthcare | UNH, ABBV, CRSP |
| 🛒 Consumer | KO, PG, PEP |
| ⚡ Energy | AES, XLE |
| 📡 Telecom | T (AT&T) |
| 🇦🇷 Argentina | GLOB, YPF, BMA |
| 📊 ETFs | SPY, QQQ, XLK, XLV, DIA, GLD, CIBR, SMH, SLV, EWZ, ICLN, IBIT |

Cada activo incluye:
- Precio actual en tiempo real
- Cambio % diario/semanal/mensual
- Nivel de riesgo (Alto/Medio/Bajo)
- **Recomendación inteligente** con acción sugerida

---

## 🛠️ Stack Tecnológico

| Tecnología | Uso |
|------------|-----|
| **Next.js 16** | Framework (App Router) |
| **TypeScript** | Tipado estático |
| **OpenAI GPT-4o** | Chatbot IA |
| **Vercel AI SDK** | Streaming de respuestas |
| **CSS Variables** | Estilos (sin frameworks) |
| **Vercel** | Hosting y deploy |

### APIs Externas
- **OpenAI** - Chat inteligente
- **Yahoo Finance** - Datos de mercado
- **Remotive** - Empleos remotos
- **Arbeitnow** - Empleos adicionales

---

## 🚀 Instalación Local

```bash
# 1. Clonar repositorio
git clone https://github.com/Laurafrey11/VibeCoding_Tips.git
cd VibeCoding_Tips

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local

# 4. Agregar tu API key de OpenAI en .env.local
OPENAI_API_KEY=sk-tu-api-key-aqui

# 5. Ejecutar en desarrollo
npm run dev
```

Abrir **http://localhost:3000**

---

## 🔑 Variables de Entorno

| Variable | Descripción | Requerida |
|----------|-------------|-----------|
| `OPENAI_API_KEY` | API key de OpenAI | ✅ Sí |

Obtener en: https://platform.openai.com/api-keys

---

## 📁 Estructura del Proyecto

```
VibeCoding_Tips/
├── app/
│   ├── api/
│   │   ├── chat/
│   │   │   └── route.ts          # API chatbot (OpenAI GPT-4o)
│   │   └── mercado/
│   │       └── route.ts          # API mercado laboral/financiero
│   ├── globals.css               # Estilos globales
│   ├── layout.tsx                # Layout principal
│   └── page.tsx                  # Página principal (toda la app)
│
├── docs/                         # Documentación adicional
├── public/                       # Assets estáticos
│
├── .env.example                  # Ejemplo de variables de entorno
├── .env.local                    # Variables de entorno (NO commitear)
├── .gitignore                    # Archivos ignorados por git
├── next.config.js                # Configuración Next.js
├── package.json                  # Dependencias npm
├── tsconfig.json                 # Configuración TypeScript
├── vercel.json                   # Configuración Vercel
└── README.md                     # Este archivo
```

---

## 🔮 Guía de Funcionalidades Secretas

### Activar Modo Mercado
1. Ir a la pestaña **"💬 Copiloto IA"**
2. Escribir: **mercado**
3. Se desbloquean las pestañas **💼 Laboral** y **📈 Financiero**

### Búsqueda Personalizada de Empleos
1. Ir a **💼 Laboral**
2. En el textarea, pegar tu perfil profesional:
   ```
   5 años como Data Analyst. Python, SQL, Power BI avanzado.
   Experiencia en ETL con Airflow. Conocimientos de Machine Learning
   con scikit-learn. Busco transición a AI/ML. Inglés B2.
   ```
3. Ver los **keywords detectados** automáticamente
4. Click en **"🎯 Buscar empleos para mi perfil"**

### Análisis Financiero
1. Ir a **📈 Financiero**
2. Los datos se cargan automáticamente
3. Cada activo muestra:
   - Precio y cambio %
   - Recomendación (Comprar/Mantener/Esperar/Vender)
   - Nivel de riesgo

---

## 📊 Checklist de Vibe Coding

Los 10 pasos para desarrollar con IA:

| # | Paso | Descripción |
|---|------|-------------|
| 1 | **Definir el Problema** | Qué resuelves y para quién |
| 2 | **Crear PRD** | Documentar requisitos |
| 3 | **Elegir Stack** | Tecnologías a usar |
| 4 | **Configurar Entorno Seguro** | Sandbox y variables de entorno |
| 5 | **Escribir Tests (Red)** | Tests que fallen primero |
| 6 | **Implementar (Green)** | Código mínimo para pasar tests |
| 7 | **Refactorizar (Blue)** | Mejorar sin romper tests |
| 8 | **Revisar Código** | Entender cada línea |
| 9 | **Documentar** | README, comentarios, API docs |
| 10 | **Iterar** | Repetir para cada feature |

---

## 🚀 Deploy en Vercel

### Opción 1: Un click
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Laurafrey11/VibeCoding_Tips)

### Opción 2: Manual
1. Push a GitHub
2. Ir a [vercel.com/new](https://vercel.com/new)
3. Importar repositorio
4. Agregar variable: `OPENAI_API_KEY`
5. Deploy

---

## 🔧 Scripts Disponibles

```bash
npm run dev      # Desarrollo local (http://localhost:3000)
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # Linter
```

---

## 📝 Changelog

### v2.0.0 (2025-02)
- ✨ Migración a Next.js + OpenAI
- ✨ Copiloto IA con GPT-4o
- ✨ Checklist interactivo
- ✨ Modo secreto (mercado)
- ✨ Búsqueda de empleos con análisis de CV
- ✨ Análisis financiero con recomendaciones
- ✨ Deploy en Vercel

### v1.0.0 (2025-01)
- 🎉 Versión inicial (HTML/CSS/JS)
- 📚 Guía de Vibe Coding
- 💬 Chatbot básico

---

## 🤝 Contribuir

1. Fork el repositorio
2. Crear rama: `git checkout -b feature/nueva-funcionalidad`
3. Commit: `git commit -m 'feat: nueva funcionalidad'`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Abrir Pull Request

---

## 👤 Autora

**María Laura Freyre** - [@Laurafrey11](https://github.com/Laurafrey11)

---

## 🙏 Créditos

- [Andrej Karpathy](https://twitter.com/karpathy) - Concepto de Vibe Coding
- [Vercel](https://vercel.com) - Hosting y AI SDK
- [OpenAI](https://openai.com) - GPT-4o
- [Claude](https://claude.ai) - Desarrollo asistido

---

## 📄 Licencia

MIT License - Ver [LICENSE](LICENSE) para detalles.

---

**Hecho con 💜 usando Vibe Coding**
