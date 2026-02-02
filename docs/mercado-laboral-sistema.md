# Sistema Inteligente de Mercado Laboral

## Documentación del Módulo de CV y Búsqueda Laboral

---

## 1. SYSTEM PROMPT PARA CLAUDE

```text
Sos un **Asesor de Carrera Senior** con tono DIRECTO y CRÍTICO. Hablás en español rioplatense.

---

## CUANDO EL USUARIO ADJUNTE UN CV (PDF, imagen, Word o texto):

### 1. LEER Y EXTRAER
- Identificá: nombre, experiencia, habilidades, educación, logros
- Detectá automáticamente su área profesional y nivel

### 2. SI TAMBIÉN DA UNA DESCRIPCIÓN DE PUESTO → Modo ATS
Calculá Match Score y mostrá:

📊 MATCH ATS: XX%

🔧 HARD SKILLS
✓ Tiene: [lista]
✗ Le faltan: [lista] ← CRÍTICO

💬 SOFT SKILLS
✓ Tiene: [lista]
✗ Le faltan: [lista]

📝 CRÍTICAS DIRECTAS
[Sé brutalmente honesto sobre qué le falta]

🌟 LOGROS REESCRITOS (STAR)
• Situación → Tarea → Acción → Resultado
[Reescribí cada logro con métricas]

🎯 ACCIONES INMEDIATAS
1. Agregar: [keywords faltantes]
2. Cuantificar: [logros sin números]
3. Mejorar: [secciones débiles]

### 3. SI SOLO ADJUNTA CV (sin puesto) → Análisis General

📋 RESUMEN DE TU PERFIL
• Área detectada: [área]
• Nivel: [Junior/Mid/Senior]
• Fortalezas: [lo mejor del CV]
• Debilidades: [lo que falta]

⚠️ PROBLEMAS DETECTADOS
[Lista de issues críticos]

💼 CARGOS RECOMENDADOS PARA VOS
🎯 [Cargo 1] - Demanda: Alta - $XX-XXk
🎯 [Cargo 2] - ...

📍 DÓNDE BUSCAR
[Plataformas según su perfil]

🔧 PARA MEJORAR TU CV
1. [Acción específica]
2. [Acción específica]

---

## REGLAS

- **Adaptate** al CV que recibís (no pidas más info si ya la tenés)
- **Sé específico** con el área del candidato
- **Criticá** lo que está mal, sin rodeos
- **Cuantificá** siempre que puedas
- Si el CV está en inglés, respondé en español igual
- Si falta información clave, preguntá SOLO lo necesario
```

---

## 2. METODOLOGÍA DE ANÁLISIS

### 2.1 Análisis ATS (Applicant Tracking System)

#### Categorías de Keywords

| Categoría | Descripción | Ejemplos |
|-----------|-------------|----------|
| **Hard Skills** | Tecnologías, herramientas, lenguajes | Python, SQL, Power BI, Tableau, AWS |
| **Soft Skills** | Habilidades interpersonales | Liderazgo, comunicación, trabajo en equipo |
| **Metodologías** | Frameworks y certificaciones | Agile, Scrum, Six Sigma, PMP |

#### Fórmula de Match Score

```
Match Score = (keywords coincidentes / keywords del puesto) × 100

- 70%+ = ✅ Buen match (probablemente pase ATS)
- 40-69% = ⚠️ Necesita mejoras
- <40% = ❌ Alto riesgo de rechazo automático
```

### 2.2 Metodología STAR para Logros

| Letra | Significado | Pregunta a responder |
|-------|-------------|---------------------|
| **S** | Situación | ¿Cuál era el contexto o problema? |
| **T** | Tarea | ¿Cuál era tu responsabilidad específica? |
| **A** | Acción | ¿Qué hiciste concretamente? |
| **R** | Resultado | ¿Cuál fue el impacto medible? |

#### Ejemplo de transformación STAR

**ANTES (vago):**
> "Automatización de procesos operativos para optimizar la gestión"

**DESPUÉS (STAR):**
> **S:** Los equipos dedicaban +20hs semanales a tareas manuales repetitivas.
> **T:** Automatizar los flujos críticos de reporting y gestión.
> **A:** Diseñé e implementé automatizaciones con Power Automate y SQL.
> **R:** Reducción de 40% en tiempo operativo, liberando 15hs/semana.

---

## 3. DICCIONARIOS DE KEYWORDS

### 3.1 Hard Skills por Área

```javascript
const HARD_SKILLS = {
    'Data & Analytics': [
        'python', 'sql', 'power bi', 'tableau', 'looker', 'excel',
        'bigquery', 'snowflake', 'redshift', 'dbt', 'airflow',
        'pandas', 'numpy', 'spark', 'etl', 'data modeling'
    ],
    'Automatización & BPA': [
        'power automate', 'n8n', 'zapier', 'make', 'uipath',
        'automation anywhere', 'blue prism', 'rpa', 'workflow',
        'api', 'integration', 'no-code', 'low-code'
    ],
    'Desarrollo de Software': [
        'javascript', 'typescript', 'react', 'angular', 'vue',
        'node.js', 'python', 'java', '.net', 'c#', 'go',
        'docker', 'kubernetes', 'aws', 'azure', 'gcp', 'git'
    ],
    'BI & Visualization': [
        'power bi', 'tableau', 'looker', 'qlik', 'metabase',
        'dax', 'power query', 'm language', 'data visualization'
    ]
};
```

### 3.2 Soft Skills

```javascript
const SOFT_SKILLS = [
    'leadership', 'liderazgo',
    'communication', 'comunicación',
    'teamwork', 'trabajo en equipo',
    'problem solving', 'resolución de problemas',
    'stakeholder management', 'gestión de stakeholders',
    'presentation', 'presentación',
    'mentoring', 'mentoría',
    'adaptability', 'adaptabilidad',
    'critical thinking', 'pensamiento crítico'
];
```

### 3.3 Metodologías y Certificaciones

```javascript
const METHODOLOGIES = [
    'agile', 'scrum', 'kanban', 'lean', 'six sigma',
    'design thinking', 'okr', 'kpi',
    'pmp', 'prince2', 'itil', 'iso'
];
```

---

## 4. CARGOS RECOMENDADOS POR ÁREA

### Data & Analytics
| Cargo | Demanda | Salario USD |
|-------|---------|-------------|
| Data Analyst | Alta | $60-100k |
| BI Analyst | Alta | $55-90k |
| Data Scientist | Muy Alta | $80-150k |
| Analytics Engineer | Alta | $70-120k |

### Automatización & BPA
| Cargo | Demanda | Salario USD |
|-------|---------|-------------|
| Automation Engineer | Muy Alta | $65-120k |
| RPA Developer | Alta | $60-100k |
| Power Platform Architect | Muy Alta | $90-140k |
| Integration Specialist | Alta | $60-95k |

### Desarrollo de Software
| Cargo | Demanda | Salario USD |
|-------|---------|-------------|
| Software Engineer | Muy Alta | $70-150k |
| Full Stack Developer | Muy Alta | $60-130k |
| Backend Developer | Alta | $65-120k |
| Frontend Developer | Alta | $55-110k |

---

## 5. PLATAFORMAS DE EMPLEO RECOMENDADAS

### Trabajo Remoto Global
| Plataforma | URL | Tip |
|------------|-----|-----|
| LinkedIn | linkedin.com/jobs | Filtrar por "Remote", activar alertas |
| We Work Remotely | weworkremotely.com | Solo empresas 100% remoto |
| Remote OK | remoteok.com | Salarios transparentes |
| Turing | turing.com | Empresas US, pago en USD |
| Toptal | toptal.com | Elite freelance, bien pago |

### LATAM / Argentina
| Plataforma | URL | Tip |
|------------|-----|-----|
| GetOnBoard | getonboard.com | Startups tech LATAM |
| Torre | torre.ai | AI matching |
| Workana | workana.com | Freelance |
| Computrabajo | computrabajo.com.ar | Alto volumen local |

### Europa (con ciudadanía)
| Plataforma | URL | Tip |
|------------|-----|-----|
| LinkedIn EU | linkedin.com | Filtrar por país EU |
| Indeed EU | indeed.es/de/it | Por país específico |
| Glassdoor | glassdoor.com | Reviews + salarios |

---

## 6. ANÁLISIS DE CV - MARÍA LAURA FREYRE

**Fecha de análisis:** 2025-02-02

### 6.1 Datos del Perfil

| Campo | Valor |
|-------|-------|
| **Nombre** | María Laura Freyre |
| **Título** | Business Process Automation & Power Platform Consultant |
| **Área** | Data, BI & Power Platform / Automatización |
| **Nivel** | Senior (3+ años + certificaciones de arquitecto) |
| **Ubicación** | Capital Federal, Argentina |
| **Ciudadanía** | Italiana 🇮🇹 |
| **Idioma** | Inglés C1 (First Certificate + EF) |

### 6.2 Experiencia Laboral

| Período | Empresa | Rol | Cliente/Sector |
|---------|---------|-----|----------------|
| 11/2025 - Actual | Accenture | Consultant | Mercado Libre |
| 04/2022 - 10/2025 | Fresh BI | Power Platform Developer | Varios sectores |
| 07/2024 - 12/2024 | Media Chicas Jump Ed. | Tutora | Microsoft YPF |
| 01/2022 - 12/2022 | BIWINI | Analista BI | OMNI Financiera |
| 01/2022 - 12/2022 | Municipalidad Tigre | Data Analyst | Gestión pública |
| 08/2021 - 12/2022 | Coderhouse | Tutora | Educación |
| 05/2021 - 01/2022 | Coderhouse | Asistente | Educación |

### 6.3 Certificaciones

| Certificación | Código | Nivel |
|--------------|--------|-------|
| Power BI Data Analyst Associate | PL-300 | Professional |
| Power Platform Specialist | PL-900 | Foundational |
| Power Platform Solution Architect | PL-600 | Expert |
| Fabric Analytics Engineer Associate | DP-600 | Professional |
| Alteryx | PWC | Professional |

### 6.4 Stack Técnico

| Categoría | Herramientas |
|-----------|-------------|
| **Automation & Data** | Power Platform, Power BI, Power Query, SQL, n8n, Alteryx |
| **BI & Visualization** | Power BI, Tableau, Looker |
| **Databases** | PostgreSQL, MySQL, Oracle, BigQuery, DBeaver |
| **Programming** | Python, JavaScript (básico), HTML, CSS |
| **Cloud & AI** | Azure ML, GCP, Copilot, LLMs |
| **Tools** | Git, GitHub, VS Code, Jira, Teams, Slack, Notion |

### 6.5 Fortalezas Detectadas

1. ✅ **Certificaciones Microsoft de peso** (PL-300, PL-600, DP-600) - Nivel arquitecto
2. ✅ **Accenture + Mercado Libre** - Empresas de alta credibilidad
3. ✅ **Stack técnico completo** - Power Platform + SQL + BigQuery + Looker + IA
4. ✅ **Perfil híbrido** - Técnica + Formadora + Funcional (raro y valioso)
5. ✅ **Ciudadanía italiana** - Acceso a Europa sin visa
6. ✅ **Inglés C1 certificado** - Puede aplicar a roles globales

### 6.6 Problemas Detectados

| Prioridad | Problema | Solución |
|-----------|----------|----------|
| 🔴 CRÍTICO | **Cero métricas** - Logros sin números | Agregar % de mejora, cantidad de usuarios, tiempo ahorrado |
| 🔴 CRÍTICO | **Fechas inconsistentes** - Fresh BI dice 2025 | Corregir a 2024 si corresponde |
| 🟡 IMPORTANTE | **Link LinkedIn faltante** | Agregar URL completa |
| 🟡 IMPORTANTE | **Sin GitHub/Portfolio** | Crear repo con proyectos de n8n/Power Platform |
| 🟡 SUGERENCIA | **Psicología desconectada** | Vincular con Change Management o UX Research |

### 6.7 Logros Reescritos (STAR)

#### Logro 1: Automatización en Mercado Libre

**Original:**
> "Automatización de procesos operativos para optimizar la gestión y eficiencia de los flujos de trabajo"

**Versión STAR:**
> **S:** En Mercado Libre, los equipos operativos dedicaban +20hs semanales a tareas manuales repetitivas.
> **T:** Mi objetivo era automatizar los flujos críticos de reporting y gestión.
> **A:** Diseñé e implementé automatizaciones con Power Automate y SQL en BigQuery, integrando agentes de IA para monitoreo automático.
> **R:** Reducción de **X% en tiempo operativo**, liberando al equipo para tareas de mayor valor estratégico.

#### Logro 2: Dashboards en Looker

**Original:**
> "Creación de tableros de control en Looker para equipos internos de Mercado Libre"

**Versión STAR:**
> **S:** Los equipos de MeLi no tenían visibilidad en tiempo real de KPIs operativos críticos.
> **T:** Desarrollar dashboards que permitan decisiones data-driven inmediatas.
> **A:** Construí **X tableros en Looker** conectados a BigQuery, con alertas automatizadas de desvíos.
> **R:** Adoptado por **+X usuarios**, reduciendo tiempo de análisis de días a minutos.

### 6.8 Cargos Recomendados

| Cargo | Demanda | Salario Estimado |
|-------|---------|------------------|
| Power Platform Solution Architect | 🔥🔥 Muy Alta | $90-140k USD |
| BI Lead / Manager | 🔥 Alta | $80-120k USD |
| Automation Engineer (RPA/BPA) | 🔥🔥 Muy Alta | $70-110k USD |
| Data & Analytics Consultant | 🔥 Alta | $75-115k USD |
| AI Solutions Consultant | 🔥🔥 Creciente | $85-130k USD |

### 6.9 Plataformas Recomendadas

| Plataforma | Razón |
|------------|-------|
| LinkedIn (Europa) | Con ciudadanía italiana, filtrar por España, Italia, Alemania |
| Turing / Toptal | Empresas US que pagan en USD, buscan este perfil exacto |
| GetOnBoard | Startups LATAM buscan Power Platform |
| Microsoft Careers | Con PL-600 y DP-600, puede aplicar directo a Microsoft |
| Accenture Internal | Ya está adentro, buscar movilidad interna |

### 6.10 Acciones Inmediatas

| # | Acción | Prioridad |
|---|--------|-----------|
| 1 | Agregar métricas a TODOS los logros | 🔴 Alta |
| 2 | Corregir fechas (Fresh BI / Accenture) | 🔴 Alta |
| 3 | Agregar URL de LinkedIn real | 🟡 Media |
| 4 | Crear GitHub con 2-3 proyectos | 🟡 Media |
| 5 | Conectar psicología con change management | 🟢 Baja |

---

## 7. KEYWORDS PARA ALERTAS DE EMPLEO

```
Power Platform | Power BI | Solution Architect | BI Developer |
Automation Engineer | Data Analytics | Looker | BigQuery |
Microsoft Certified | AI Consultant | Process Automation
```

---

---

## 8. FLUJO ADAPTADO AL CV

### 8.1 Arquitectura del Flujo

```
┌─────────────────────────────────────────────────────────────────┐
│                    MERCADO LABORAL                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐          │
│   │ Optimizar   │   │  Búsqueda   │   │  Reporte    │          │
│   │     CV      │   │   Ofertas   │   │  Empleos    │          │
│   └──────┬──────┘   └──────┬──────┘   └──────┬──────┘          │
│          │                 │                 │                  │
│          ▼                 ▼                 ▼                  │
│   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐          │
│   │ Pegar desc  │   │  Pegar CV   │   │   Buscar    │          │
│   │  de puesto  │   │   (texto)   │   │    APIs     │          │
│   └──────┬──────┘   └──────┬──────┘   └─────────────┘          │
│          │                 │                                    │
│          ▼                 ▼                                    │
│   ┌─────────────┐   ┌─────────────────────────────┐            │
│   │  Pegar CV   │   │    extraerPerfilDeCV()      │            │
│   └──────┬──────┘   │  - Hard Skills              │            │
│          │          │  - Soft Skills              │            │
│          ▼          │  - Certificaciones          │            │
│   ┌─────────────┐   │  - Área profesional         │            │
│   │  Análisis   │   │  - Nivel (Jr/Mid/Sr)        │            │
│   │  ATS+STAR   │   │  - Ciudadanía EU            │            │
│   │             │   │  - Inglés                   │            │
│   │ - Match %   │   └──────────────┬──────────────┘            │
│   │ - Keywords  │                  │                            │
│   │ - Críticas  │                  ▼                            │
│   │ - Logros    │   ┌─────────────────────────────┐            │
│   └─────────────┘   │ generarBusquedaPersonalizada│            │
│                     │  - Cargos según área        │            │
│                     │  - Plataformas según perfil │            │
│                     │  - Keywords para alertas    │            │
│                     │  - Estrategia personalizada │            │
│                     └─────────────────────────────┘            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 8.2 Funciones Principales

| Función | Descripción |
|---------|-------------|
| `handleLaboralOption(opcion)` | Router principal de opciones laborales |
| `iniciarAnalisisCV()` | Inicia flujo de análisis de CV |
| `iniciarBusquedaAdaptada()` | Inicia búsqueda basada en CV |
| `extraerPerfilDeCV(texto)` | Extrae skills, nivel, área del CV |
| `generarBusquedaPersonalizada(perfil)` | Genera recomendaciones basadas en perfil |
| `analizarYOptimizarCV()` | Análisis ATS + STAR del CV |
| `detectarLogrosEnCV(cv)` | Detecta logros para formato STAR |
| `generarCriticasCV(cv, perfil)` | Genera críticas específicas |
| `procesarBusquedaLaboral(cvTexto)` | Procesa CV pegado para búsqueda |

### 8.3 Estado del Sistema

```javascript
mercadoState = {
    active: boolean,           // Si está activo el modo mercado
    waitingFor: string,        // Estado actual del flujo
    cvData: {
        descripcionPuesto: string,  // Descripción del puesto (si aplica)
        cvContenido: string,        // Texto del CV pegado
        perfilExtraido: {           // Perfil extraído automáticamente
            hardSkills: [],
            softSkills: [],
            metodologias: [],
            certificaciones: [],
            area: string,
            nivel: string,
            ubicacion: string,
            ciudadaniaEU: boolean,
            ingles: boolean,
            añosExp: number
        }
    }
}
```

### 8.4 Estados de waitingFor

| Estado | Descripción | Siguiente paso |
|--------|-------------|----------------|
| `laboral_opcion` | Esperando selección de opción | cv/busqueda/reporte |
| `cv_descripcion` | Esperando descripción del puesto | cv_contenido |
| `cv_contenido` | Esperando texto del CV | analizarYOptimizarCV() |
| `cv_para_busqueda` | Esperando CV para búsqueda | procesarBusquedaLaboral() |

### 8.5 Detección Automática de Área

| Área | Keywords que la activan |
|------|------------------------|
| Power Platform | power platform, power bi, power automate, pl-300, pl-600 |
| Automatización | n8n, zapier, rpa, automation, automatización, uipath |
| Data & Analytics | data analy, bi, business intelligence, tableau, looker, bigquery |
| Desarrollo | developer, desarrollador, software, full stack, react, angular |
| General | (default si no match) |

### 8.6 Selección de Plataformas según Perfil

```javascript
// Lógica de selección
if (remoto || sin ubicación específica) → plataformas.remoto
if (Argentina || LATAM) → plataformas.latam
if (ciudadaniaEU) → plataformas.europa
if (Power Platform + certificaciones) → plataformas.microsoft
```

---

*Documento generado: 2025-02-02*
*Actualizado: 2025-02-02*
*Módulo: Sistema Inteligente de Mercado Laboral*
