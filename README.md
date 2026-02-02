# Vibe Coding - Guía Interactiva con Asistente IA

## Aplicación web con chatbot inteligente y módulos de mercado

---

## Descripción

Aplicación web que combina:
- Guía interactiva de Vibe Coding y uso seguro de IA
- Chatbot con comandos secretos
- **Módulo de Mercado Financiero** (consulta de acciones, reportes)
- **Módulo de Mercado Laboral** (optimización CV, búsqueda de empleos)

---

## Inicio Rápido

```bash
# Abrir en navegador
Doble click en index.html
# O servir con Live Server
```

---

## Funcionalidades Secretas

### Activar módulo de mercado:
1. Abrir el chat (botón inferior derecha)
2. Escribir: `mercado`
3. Seleccionar: Financiero o **Laboral**

---

## Módulo Mercado Laboral

### Opciones disponibles:

| Opción | Función |
|--------|---------|
| 📄 **Optimización de CV** | Análisis ATS + metodología STAR |
| 🔍 **Búsqueda de Ofertas** | Recomendaciones personalizadas según tu CV |
| 📊 **Generar Reporte** | Descarga HTML con ofertas actuales |

### Cómo funciona la búsqueda adaptada:

```
Tu CV → Sistema extrae automáticamente:
         ├─ Skills (Power BI, SQL, Python...)
         ├─ Certificaciones (PL-300, PL-600...)
         ├─ Área profesional
         ├─ Nivel (Junior/Mid/Senior)
         ├─ Ciudadanía EU
         └─ Nivel de inglés
              ↓
         Genera recomendaciones:
         ├─ Cargos específicos para vos
         ├─ Plataformas donde buscar
         ├─ Keywords para alertas
         └─ Rangos salariales
```

---

## Estructura del Proyecto

```
mi-proyecto/
├── index.html              # Página principal
├── app.js                  # Lógica del chat + módulos
├── styles.css              # Estilos
├── README.md               # Este archivo
│
├── docs/
│   ├── mercado-laboral-sistema.md    # Doc técnica completa
│   ├── MANUAL-MERCADO-LABORAL.md     # Manual de usuario
│   └── PRUEBAS-MERCADO-LABORAL.md    # Casos de prueba
│
└── reportes/               # Reportes generados (HTML)
```

---

## Tecnologías

- **Frontend**: HTML5, CSS3, JavaScript Vanilla
- **APIs**: Finnhub (stocks), Remotive, Arbeitnow, Himalayas (empleos)
- **Sin dependencias externas**

---

## Módulo Laboral - Funciones Principales

### extraerPerfilDeCV(texto)
Extrae automáticamente del CV:
- Hard skills, soft skills, metodologías
- Certificaciones Microsoft/AWS
- Área profesional y nivel
- Ciudadanía EU e idioma inglés

### analizarYOptimizarCV()
- Calcula Match ATS (%)
- Identifica keywords faltantes
- Genera críticas directas
- Convierte logros a formato STAR

### generarBusquedaPersonalizada(perfil)
- Recomienda cargos según área detectada
- Selecciona plataformas según ubicación/ciudadanía
- Genera keywords para alertas
- Estima rangos salariales

---

## Documentación

| Archivo | Contenido |
|---------|-----------|
| [mercado-laboral-sistema.md](docs/mercado-laboral-sistema.md) | Arquitectura, system prompt, análisis de CV ejemplo |
| [MANUAL-MERCADO-LABORAL.md](docs/MANUAL-MERCADO-LABORAL.md) | Guía de usuario paso a paso |
| [PRUEBAS-MERCADO-LABORAL.md](docs/PRUEBAS-MERCADO-LABORAL.md) | Test suite con casos de prueba |

---

## Uso del System Prompt (para Claude)

El archivo `docs/mercado-laboral-sistema.md` contiene un System Prompt que podés usar para configurar Claude como asesor de carrera:

```
Pegá el System Prompt en Claude → Adjuntá tu CV → Recibí análisis profesional
```

---

## Próximas Mejoras (TODO)

- [ ] Integración con LinkedIn API
- [ ] Guardado de CVs en localStorage
- [ ] Comparador de múltiples puestos
- [ ] Exportar análisis a PDF
- [ ] Modo oscuro/claro

---

## Créditos

- **Desarrollado con**: Vibe Coding + Claude
- **Autor**: María Laura Freyre
- **Fecha**: 2025

---

## Licencia

Uso personal y educativo.
