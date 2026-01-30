# Changelog

Todos los cambios notables de este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Versionado Semántico](https://semver.org/lang/es/).

---

## [Unreleased]

### Por Agregar
- Tests unitarios para funciones principales
- Modo claro (light theme)
- Internacionalización (i18n)

---

## [1.2.0] - 2024-01-30

### Agregado
- Nueva sección "Documentación" en la web con guías detalladas
- Carpeta `docs/` con documentación del proyecto:
  - `PRD.md` - Documento de requisitos del producto
  - `AI_ITERATIONS.md` - Registro de iteraciones con IA
  - `CONVENTIONS.md` - Convenciones de código
  - `WORKFLOW.md` - Flujo de trabajo de desarrollo
- Archivo `CHANGELOG.md` para historial de cambios
- Ilustraciones y diagramas en la sección de documentación
- Timeline visual del proceso de documentación

### Cambiado
- Navegación actualizada con nueva sección
- Versión en footer actualizada a 1.2

---

## [1.1.0] - 2024-01-29

### Agregado
- Chatbot asistente con widget flotante
- Función secreta "mercado" en el chat:
  - Análisis de mercado financiero (acciones y ETFs)
  - Búsqueda de empleos remotos
  - Generación de reportes HTML descargables
- Integración con Finnhub API para datos financieros
- Integración con Remotive API para empleos
- Fallback a datos de demostración cuando no hay API key
- Respuestas expandidas del bot sobre Vibe Coding

### Cambiado
- Reemplazado criptomonedas por acciones y ETFs (más profesional)
- Mejorado diseño del widget de chat
- Optimizadas animaciones de apertura/cierre del chat

### Eliminado
- Opciones de criptomonedas del mercado financiero

---

## [1.0.0] - 2024-01-28

### Agregado
- Estructura inicial del proyecto
- Página principal con navegación SPA (Single Page Application)
- 4 secciones educativas:
  - Introducción a Vibe Coding
  - Pasos para crear apps con Claude
  - Políticas de uso seguro
  - Buenas prácticas de desarrollo
- Tema dark mode con variables CSS
- Diseño responsive para móviles
- Navegación por teclado (flechas izquierda/derecha)
- Animaciones de scroll con Intersection Observer
- Menú hamburguesa para móviles
- Timeline interactivo para los pasos de desarrollo
- Visualización del ciclo TDD (Red-Green-Refactor)
- Sistema de niveles de permisos (Seguro, Precaución, Revisar)
- Documentación técnica en `DOCUMENTACION.md`

### Características Técnicas
- HTML5 semántico
- CSS3 con variables y Grid/Flexbox
- JavaScript ES6+ vanilla (sin dependencias)
- Funciona offline
- Compatible con Chrome, Firefox, Edge, Safari

---

## Convención de Versionado

- **MAJOR** (X.0.0): Cambios incompatibles o rediseño completo
- **MINOR** (0.X.0): Nueva funcionalidad compatible
- **PATCH** (0.0.X): Correcciones de bugs

## Tipos de Cambios

- **Agregado**: Nuevas funcionalidades
- **Cambiado**: Cambios en funcionalidad existente
- **Obsoleto**: Funcionalidades que serán eliminadas
- **Eliminado**: Funcionalidades eliminadas
- **Corregido**: Correcciones de bugs
- **Seguridad**: Correcciones de vulnerabilidades
