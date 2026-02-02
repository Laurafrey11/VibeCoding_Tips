# Manual de Usuario - Módulo Mercado Laboral

## Guía Completa de Uso

---

## 1. ACCESO AL MÓDULO

### Paso 1: Abrir la aplicación
```
Abrir: index.html en el navegador
```

### Paso 2: Activar el chat
- Click en el botón del chat (esquina inferior derecha)
- O presionar el ícono 💬

### Paso 3: Activar palabra secreta
```
Escribir: mercado
```

### Paso 4: Seleccionar tipo de mercado
```
Opciones:
1. 📈 Financiero
2. 💼 Laboral  ← Seleccionar esta
```

---

## 2. OPCIONES DEL MERCADO LABORAL

Al seleccionar "Laboral" aparecen 3 opciones:

| Opción | Descripción | Cuándo usarla |
|--------|-------------|---------------|
| 📄 **Optimización de CV** | Análisis ATS + STAR | Cuando tenés un puesto específico |
| 🔍 **Búsqueda de Ofertas** | Recomendaciones personalizadas | Para saber dónde aplicar |
| 📊 **Generar Reporte** | Lista de empleos actuales | Para ver ofertas reales |

---

## 3. OPTIMIZACIÓN DE CV (Opción 1)

### Flujo completo:

```
┌─────────────────────────────────────────────┐
│  1. Click en "📄 Optimización de CV"        │
│                    ↓                        │
│  2. Pegar DESCRIPCIÓN DEL PUESTO            │
│     (o escribir "general" para análisis     │
│      sin puesto específico)                 │
│                    ↓                        │
│  3. Pegar TU CV (texto completo)            │
│                    ↓                        │
│  4. Recibir ANÁLISIS:                       │
│     - Match ATS (%)                         │
│     - Keywords faltantes                    │
│     - Críticas directas                     │
│     - Logros en formato STAR                │
└─────────────────────────────────────────────┘
```

### Ejemplo de uso:

**Paso 2 - Pegar descripción del puesto:**
```
Buscamos Power BI Developer con experiencia en:
- Power BI, DAX, Power Query
- SQL y bases de datos
- Azure Data Factory
- Metodologías ágiles
Requisitos: 3+ años de experiencia, inglés avanzado
```

**Paso 3 - Pegar tu CV:**
```
JUAN PÉREZ
Data Analyst

Experiencia:
- Empresa X (2020-2023): Analista de datos
  Creación de dashboards en Tableau
  Análisis de KPIs comerciales

Skills: SQL, Excel, Tableau, Python básico
```

**Resultado esperado:**
```
📊 ANÁLISIS CRÍTICO DE TU CV

🎯 Match ATS: 35%
❌ Probablemente rechazado por ATS

❌ KEYWORDS FALTANTES:
• power bi
• dax
• power query
• azure
• agile

✅ HARD SKILLS DETECTADAS:
sql, excel, tableau, python

📝 CRÍTICAS DIRECTAS:
🔴 Sin métricas % - Agregá logros con porcentajes
🔴 Pocas skills técnicas claras
🟡 Sin LinkedIn - Agregá el link

🌟 TUS LOGROS EN FORMATO STAR:
[Logros reescritos con metodología STAR]
```

---

## 4. BÚSQUEDA DE OFERTAS (Opción 2)

### Flujo completo:

```
┌─────────────────────────────────────────────┐
│  1. Click en "🔍 Búsqueda de Ofertas"       │
│                    ↓                        │
│  2. Pegar TU CV (texto completo)            │
│                    ↓                        │
│  3. Sistema EXTRAE automáticamente:         │
│     - Área profesional                      │
│     - Nivel (Jr/Mid/Sr)                     │
│     - Skills principales                    │
│     - Certificaciones                       │
│     - Ciudadanía EU (si aplica)             │
│     - Nivel de inglés                       │
│                    ↓                        │
│  4. Recibir RECOMENDACIONES:                │
│     - Cargos específicos para vos           │
│     - Plataformas donde buscar              │
│     - Keywords para alertas                 │
│     - Estrategia personalizada              │
└─────────────────────────────────────────────┘
```

### Ejemplo de resultado:

```
🎯 BÚSQUEDA PERSONALIZADA PARA TU PERFIL

📋 Tu Perfil Detectado:
• Área: Power Platform
• Nivel: Senior (~4+ años)
• Skills principales: power bi, sql, power automate, n8n, bigquery
• Certificaciones: Power BI Data Analyst, Power Platform Solution Architect
• 🇪🇺 Ciudadanía Europea - Podés trabajar en EU sin visa
• 🗣️ Inglés avanzado - Podés aplicar a roles globales

💼 CARGOS RECOMENDADOS PARA VOS:
🎯 Power Platform Architect - Demanda: 🔥🔥 Muy Alta - $90-150k USD
🎯 Power BI Developer - Demanda: 🔥 Alta - $65-110k USD
🎯 Power Platform Consultant - Demanda: 🔥 Alta - $75-130k USD

📍 DÓNDE BUSCAR:
🌐 LinkedIn - Filtrar por Remote, activar alertas
🌐 Turing - Empresas US, pago en USD
🌐 GetOnBoard - Startups tech LATAM
🌐 Microsoft Careers - Directo a Microsoft

⚡ KEYWORDS PARA TUS ALERTAS:
Power Platform Architect | Power BI Developer | power bi | sql | power automate
```

---

## 5. GENERAR REPORTE (Opción 3)

### Qué hace:
- Busca ofertas reales en múltiples APIs
- Genera un archivo HTML descargable
- Incluye empleos de: Remotive, Arbeitnow, Himalayas, Jobicy

### Resultado:
- Se descarga automáticamente `empleos_bpa_automation.html`
- Contiene ofertas filtradas por: n8n, Zapier, Power Automate, RPA, AI

---

## 6. DETECCIÓN AUTOMÁTICA DE PERFIL

### Keywords que detecta el sistema:

#### Hard Skills
| Categoría | Keywords |
|-----------|----------|
| BI Tools | power bi, tableau, looker, qlik |
| Databases | sql, postgresql, mysql, mongodb, bigquery |
| Automation | n8n, zapier, power automate, uipath, rpa |
| Cloud | aws, azure, gcp, docker, kubernetes |
| Programming | python, javascript, react, angular, node |

#### Certificaciones
| Código | Nombre detectado |
|--------|-----------------|
| pl-300 | Power BI Data Analyst |
| pl-600 | Power Platform Solution Architect |
| dp-600 | Fabric Analytics Engineer |
| pmp | Project Management Professional |

#### Área profesional (detección automática)
| Si el CV contiene... | Área detectada |
|---------------------|----------------|
| power platform, power bi, pl-300, pl-600 | Power Platform |
| n8n, zapier, rpa, automation | Automatización |
| data analyst, tableau, looker, bigquery | Data & Analytics |
| developer, full stack, react, angular | Desarrollo |

#### Nivel (detección automática)
| Si el CV contiene... | Nivel |
|---------------------|-------|
| senior, lead, architect, manager | Senior |
| junior, trainee, pasante | Junior |
| (default) | Mid-level |

#### Extras detectados
| Keyword | Beneficio |
|---------|-----------|
| ciudadanía italiana/europea | Recomienda plataformas EU |
| inglés, english, c1, first certificate | Recomienda roles globales |

---

## 7. METODOLOGÍA STAR

### Qué es:
Formato para escribir logros de forma impactante.

| Letra | Significado | Ejemplo |
|-------|-------------|---------|
| **S** | Situación | "El equipo perdía 20hs/semana en reportes manuales" |
| **T** | Tarea | "Mi objetivo era automatizar el proceso" |
| **A** | Acción | "Implementé dashboards en Power BI con refresh automático" |
| **R** | Resultado | "Reducción del 80% en tiempo de reporting" |

### Ejemplo completo:

**ANTES (vago):**
> "Creación de dashboards para el equipo de ventas"

**DESPUÉS (STAR):**
> "Ante la falta de visibilidad en KPIs de ventas (S), lideré la implementación de dashboards en Power BI (T), desarrollando 5 reportes interactivos con actualización automática (A), logrando que el equipo reduzca el tiempo de análisis de 4 horas a 15 minutos diarios (R)."

---

## 8. TROUBLESHOOTING

### El chat no aparece
```
Solución: Verificar que app.js esté cargado (F12 → Console)
```

### "mercado" no activa nada
```
Solución: Escribir exactamente "mercado" en minúsculas
```

### No detecta mis skills
```
Solución: Asegurarse de escribir las keywords exactas
Ej: "Power BI" no "PowerBI" o "power bi desktop"
```

### Match ATS muy bajo
```
Solución:
1. Verificar que el CV tenga las keywords del puesto
2. Agregar skills de forma explícita en una sección "Skills"
3. No usar sinónimos, usar los términos exactos del puesto
```

---

## 9. ATAJOS Y TIPS

| Acción | Cómo hacerlo |
|--------|--------------|
| Análisis rápido sin puesto | Escribir "general" en paso 1 |
| Volver al menú | Hacer click en otro botón |
| Copiar keywords | Seleccionar el bloque de código |

### Tips para mejor análisis:
1. **Pegá el CV completo** - Mientras más info, mejor detección
2. **Incluí certificaciones** con códigos (PL-300, DP-600)
3. **Mencioná ciudadanía EU** si la tenés
4. **Listá skills explícitamente** en una sección separada

---

## 10. ARQUITECTURA TÉCNICA

### Archivos involucrados:
```
mi-proyecto/
├── index.html          # Interfaz principal
├── app.js              # Lógica del chat + módulo laboral
├── styles.css          # Estilos
└── docs/
    ├── mercado-laboral-sistema.md    # Documentación técnica
    └── MANUAL-MERCADO-LABORAL.md     # Este manual
```

### Estados del sistema:
```javascript
mercadoState.waitingFor =
  'laboral_opcion'    // Esperando selección
  'cv_descripcion'    // Esperando descripción puesto
  'cv_contenido'      // Esperando CV para análisis
  'cv_para_busqueda'  // Esperando CV para búsqueda
```

### Funciones principales:
| Función | Responsabilidad |
|---------|-----------------|
| `handleLaboralOption()` | Router de opciones |
| `extraerPerfilDeCV()` | Extrae perfil del CV |
| `generarBusquedaPersonalizada()` | Genera recomendaciones |
| `analizarYOptimizarCV()` | Análisis ATS + STAR |

---

*Manual v1.0 - Fecha: 2025-02-02*
