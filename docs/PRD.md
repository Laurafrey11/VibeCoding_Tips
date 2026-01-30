# PRD - Guía de Vibe Coding & Safe Use

## Visión del Producto

Una aplicación web educativa e interactiva que enseña las mejores prácticas de desarrollo asistido por IA (Vibe Coding) y el uso seguro de herramientas como Claude Code.

### Problema que Resuelve
- Falta de guías estructuradas para desarrollar con IA de forma segura
- Desconocimiento de buenas prácticas de Vibe Coding
- Necesidad de un recurso educativo accesible y práctico

### Audiencia Objetivo
- Desarrolladores que comienzan a usar IA para programar
- Estudiantes de programación
- Profesionales que quieren adoptar Vibe Coding de forma responsable

---

## Objetivos

| ID | Objetivo | Métrica de Éxito |
|----|----------|------------------|
| O-01 | Educar sobre Vibe Coding | Usuario completa las 5 secciones |
| O-02 | Promover desarrollo seguro | Usuario entiende niveles de permisos |
| O-03 | Enseñar documentación | Usuario conoce PRD, Changelog, etc. |
| O-04 | Proporcionar herramientas | Chatbot responde consultas correctamente |

---

## Requisitos Funcionales

| ID | Requisito | Prioridad | Estado |
|----|-----------|-----------|--------|
| RF-01 | Navegación SPA entre secciones | Alta | Completado |
| RF-02 | Sección Introducción con tarjetas informativas | Alta | Completado |
| RF-03 | Sección Pasos con timeline interactivo | Alta | Completado |
| RF-04 | Sección Seguridad con niveles de permisos | Alta | Completado |
| RF-05 | Sección Buenas Prácticas con TDD | Alta | Completado |
| RF-06 | Sección Documentación con guías detalladas | Alta | Completado |
| RF-07 | Chat widget con asistente Vibe | Media | Completado |
| RF-08 | Función secreta de mercado | Baja | Completado |
| RF-09 | Navegación por teclado (flechas) | Media | Completado |
| RF-10 | Diseño responsive para móviles | Alta | Completado |

---

## Requisitos No Funcionales

| ID | Requisito | Especificación |
|----|-----------|----------------|
| RNF-01 | Rendimiento | Carga inicial < 2 segundos |
| RNF-02 | Accesibilidad | Navegable por teclado |
| RNF-03 | Compatibilidad | Chrome, Firefox, Edge, Safari |
| RNF-04 | Sin dependencias | Funciona offline, vanilla JS |
| RNF-05 | Mantenibilidad | Código modular y documentado |

---

## User Stories

### US-01: Aprender sobre Vibe Coding
**Como** desarrollador principiante
**Quiero** entender qué es Vibe Coding
**Para** poder desarrollar apps con asistencia de IA de forma efectiva

**Criterios de Aceptación:**
- [ ] Puedo leer una definición clara de Vibe Coding
- [ ] Veo ejemplos prácticos de uso
- [ ] Entiendo los beneficios y limitaciones

### US-02: Conocer los pasos para crear apps
**Como** usuario de Claude
**Quiero** conocer el proceso paso a paso
**Para** seguir un flujo estructurado de desarrollo

**Criterios de Aceptación:**
- [ ] Veo los 4 pasos: Idea, PRD, Prototipo, Iteración
- [ ] Cada paso tiene ejemplos claros
- [ ] Hay checklists para cada fase

### US-03: Entender la seguridad
**Como** desarrollador
**Quiero** conocer las políticas de uso seguro
**Para** mantener mi proyecto y sistema protegidos

**Criterios de Aceptación:**
- [ ] Entiendo los 3 niveles de permisos
- [ ] Sé cómo revisar comandos antes de ejecutar
- [ ] Comprendo el funcionamiento del sandbox

### US-04: Aplicar buenas prácticas
**Como** desarrollador
**Quiero** conocer las mejores prácticas
**Para** crear código de calidad con IA

**Criterios de Aceptación:**
- [ ] Conozco el ciclo TDD (Red-Green-Refactor)
- [ ] Sé escribir prompts efectivos
- [ ] Entiendo la importancia de revisar código

### US-05: Documentar mi proyecto
**Como** desarrollador profesional
**Quiero** saber cómo documentar correctamente
**Para** mantener un proyecto organizado y mantenible

**Criterios de Aceptación:**
- [ ] Conozco la estructura de un PRD
- [ ] Sé cómo mantener un Changelog
- [ ] Entiendo el workflow de desarrollo con IA

---

## Arquitectura Técnica

```
mi-proyecto/
├── index.html          # Estructura HTML principal (SPA)
├── styles.css          # Estilos CSS (dark mode, responsive)
├── app.js              # Lógica de navegación, chat, mercado
├── chatbot.py          # Chatbot CLI en Python
├── docs/
│   ├── PRD.md          # Este documento
│   ├── AI_ITERATIONS.md
│   ├── CONVENTIONS.md
│   └── WORKFLOW.md
├── CHANGELOG.md
├── DOCUMENTACION.md
└── reportes/           # Reportes generados por función mercado
```

---

## Criterios de Éxito del Proyecto

- [ ] Todas las secciones son navegables y funcionales
- [ ] El chatbot responde preguntas sobre Vibe Coding
- [ ] La documentación está completa y actualizada
- [ ] El proyecto funciona sin conexión a internet
- [ ] El código sigue las convenciones establecidas

---

## Historial de Cambios del PRD

| Fecha | Versión | Cambios |
|-------|---------|---------|
| 2024-01-30 | 1.0 | Creación inicial del PRD |
