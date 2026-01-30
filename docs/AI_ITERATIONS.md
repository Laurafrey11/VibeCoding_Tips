# Registro de Iteraciones con IA

Este documento registra todas las interacciones significativas con Claude durante el desarrollo del proyecto, incluyendo prompts enviados, outputs recibidos, cambios manuales y decisiones técnicas.

---

## Iteración 1 - Setup Inicial

**Fecha:** 2024-01-28
**Objetivo:** Crear estructura base de la aplicación web

### Prompt Enviado
```
Crea una página web interactiva sobre Vibe Coding y Safe Use con:
- Navegación SPA
- Tema dark mode
- 4 secciones principales
- Diseño responsive
```

### Output de IA
- `index.html` - Estructura HTML con 4 secciones
- `styles.css` - Estilos dark mode con variables CSS
- `app.js` - Navegación SPA con hash routing

### Cambios Manuales
1. Ajusté colores para mejor contraste (accesibilidad)
2. Agregué navegación por teclado (flechas)
3. Mejoré animaciones de transición

### Razones
- Los colores originales no cumplían con WCAG 2.1 AA
- La navegación por teclado mejora la accesibilidad
- Las animaciones suaves mejoran la UX

---

## Iteración 2 - Chat Widget

**Fecha:** 2024-01-29
**Objetivo:** Agregar asistente de chat interactivo

### Prompt Enviado
```
Agrega un chat widget flotante que responda preguntas sobre
Vibe Coding y buenas prácticas. Debe tener:
- Botón flotante para abrir/cerrar
- Historial de mensajes
- Respuestas predefinidas sobre los temas de la guía
```

### Output de IA
- Widget de chat con diseño moderno
- Sistema de respuestas basado en keywords
- Animaciones de apertura/cierre

### Cambios Manuales
1. Expandí las respuestas del bot con más temas
2. Agregué más keywords para mejor detección
3. Mejoré el estilo del avatar y timestamps

### Razones
- Las respuestas originales eran muy básicas
- Más keywords = mejor experiencia de usuario
- El diseño necesitaba pulirse visualmente

---

## Iteración 3 - Función Secreta Mercado

**Fecha:** 2024-01-29
**Objetivo:** Agregar función oculta de análisis de mercado

### Prompt Enviado
```
Agrega una función secreta al chat que se active con la palabra
"mercado" y permita:
- Consultar mercado financiero (acciones, ETFs)
- Consultar mercado laboral (empleos remotos)
- Generar reportes HTML descargables
```

### Output de IA
- Sistema de estados para el flujo de mercado
- Integración con APIs (Finnhub, Remotive)
- Generador de reportes HTML estilizados

### Cambios Manuales
1. Reemplacé crypto por acciones/ETFs (más profesional)
2. Agregué fallback a datos demo cuando no hay API key
3. Mejoré el diseño de los reportes generados

### Razones
- Enfoque en activos más tradicionales y regulados
- Los usuarios sin API key también pueden probar la función
- Reportes más atractivos visualmente

---

## Iteración 4 - Chatbot Python

**Fecha:** 2024-01-29
**Objetivo:** Crear versión CLI del chatbot

### Prompt Enviado
```
Crea un chatbot en Python que funcione en terminal con:
- Las mismas capacidades de respuesta sobre Vibe Coding
- La función secreta de mercado
- Interfaz amigable en consola
```

### Output de IA
- `chatbot.py` con menú interactivo
- Sistema de respuestas similar al widget web
- Integración con APIs de mercado

### Cambios Manuales
1. Agregué manejo de errores más robusto
2. Mejoré los mensajes de bienvenida
3. Agregué más respuestas sobre buenas prácticas

### Razones
- Evitar crashes por errores de red
- Mejor primera impresión al usuario
- Consistencia con el contenido web

---

## Iteración 5 - Sección de Documentación

**Fecha:** 2024-01-30
**Objetivo:** Agregar sección sobre buenas prácticas de documentación

### Prompt Enviado
```
Agrega una nueva sección a la web sobre documentación de proyectos:
- PRD (Product Requirements Document)
- Changelog
- Registro de iteraciones con IA
- Convenciones de código
- Workflow de desarrollo
Con ilustraciones y pasos detallados.
```

### Output de IA
- Nueva sección en index.html
- Estilos adicionales en styles.css
- Actualización de navegación en app.js
- Archivos de documentación en docs/

### Cambios Manuales
- (Pendiente de revisión)

### Razones
- Completar la guía con documentación profesional
- Dar ejemplos prácticos y aplicables

---

## Decisiones Técnicas

| Decisión | Alternativas Consideradas | Elegida | Razón |
|----------|--------------------------|---------|-------|
| Sin framework JS | React, Vue, Svelte | Vanilla JS | Simplicidad, sin build step, funciona offline |
| CSS Variables | SASS, Tailwind | CSS puro | Sin preprocesador, fácil mantenimiento |
| Hash routing | History API, Router library | Hash | Simple, funciona sin servidor |
| Python para CLI | Node.js, Go | Python | Amplio ecosistema, fácil de usar |
| Finnhub API | Alpha Vantage, Yahoo Finance | Finnhub | Tier gratuito generoso, buena documentación |
| Remotive API | Indeed, LinkedIn | Remotive | API pública sin autenticación |

---

## Lecciones Aprendidas

### Lo que funcionó bien
1. **Prompts específicos** - Describir exactamente qué se necesita produce mejores resultados
2. **Iteración incremental** - Pequeños cambios son más fáciles de revisar
3. **Revisión manual** - Siempre mejorar el output de la IA
4. **Documentar decisiones** - Facilita entender el "por qué" después

### Lo que mejoraría
1. Escribir tests desde el principio (TDD)
2. Definir el PRD antes de empezar a codear
3. Establecer convenciones de código desde el inicio

---

## Plantilla para Nuevas Iteraciones

```markdown
## Iteración N - [Título]

**Fecha:** YYYY-MM-DD
**Objetivo:** [Descripción breve]

### Prompt Enviado
```
[Prompt exacto enviado a Claude]
```

### Output de IA
- [Lista de archivos/cambios generados]

### Cambios Manuales
1. [Cambio 1]
2. [Cambio 2]

### Razones
- [Por qué se hizo cada cambio manual]
```
