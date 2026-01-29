# Documentación - Guía de Vibe Coding & Safe Use

## Descripción del Proyecto

Esta es una aplicación web interactiva que sirve como guía educativa sobre **Vibe Coding** (desarrollo asistido por IA) y **Safe Use** (prácticas de uso seguro). Está construida con HTML, CSS y JavaScript puro, sin dependencias externas.

---

## Estructura del Proyecto

```
mi-proyecto/
├── index.html          # Estructura HTML principal
├── styles.css          # Estilos CSS (dark mode)
├── app.js              # Lógica de navegación y animaciones
└── DOCUMENTACION.md    # Este archivo
```

### Descripción de Archivos

| Archivo | Propósito |
|---------|-----------|
| `index.html` | Contiene toda la estructura semántica, las 4 secciones de contenido y la barra lateral de navegación |
| `styles.css` | Define el tema dark mode, variables CSS, layout responsive y estilos de componentes |
| `app.js` | Maneja la navegación SPA, animaciones de scroll, soporte móvil y navegación por teclado |

---

## Cómo Funciona la Web

### Navegación
- **Single Page Application (SPA)**: Las secciones se muestran/ocultan sin recargar la página
- **Hash routing**: La URL refleja la sección actual (`#intro`, `#pasos`, etc.)
- **Navegación por teclado**: Usa las flechas ← → para moverte entre secciones

### Secciones

1. **Introducción** (`#intro`)
   - Bienvenida y explicación de conceptos básicos
   - Tarjetas informativas sobre Vibe Coding y Safe Use

2. **Crear Apps con Claude** (`#pasos`)
   - Timeline visual con 4 fases: Idea → PRD → Prototipo → Iteración
   - Ejemplos prácticos y checklists para cada fase

3. **Uso Seguro** (`#seguridad`)
   - Manejo de permisos (niveles: Seguro, Precaución, Revisar)
   - Revisión de comandos antes de ejecutar
   - Funcionamiento del sandbox

4. **Buenas Prácticas** (`#practicas`)
   - TDD (Test-Driven Development) asistido por IA
   - Cómo escribir prompts efectivos
   - Revisión de código y documentación

### Características Técnicas
- **Responsive**: Se adapta a móviles con menú hamburguesa
- **Animaciones**: Elementos aparecen con fade-in al hacer scroll
- **Sin dependencias**: Funciona offline, solo necesita un navegador

---

## Agente de Buenas Prácticas (experto-vibe)

Se ha configurado un agente especializado llamado **experto-vibe** para revisar código siguiendo las mejores prácticas.

### ¿Qué hace el agente?

El agente `experto-vibe` realiza revisiones de código enfocadas en:

1. **Seguridad**
   - Detecta API keys o credenciales expuestas
   - Identifica vulnerabilidades comunes (OWASP Top 10)
   - Verifica manejo seguro de datos sensibles

2. **Modularidad**
   - Evalúa la estructura del código
   - Sugiere separación de responsabilidades
   - Recomienda patrones de diseño apropiados

3. **Testing**
   - Verifica cobertura de tests
   - Sugiere casos de prueba adicionales
   - Promueve prácticas de TDD

### Cómo Usar el Agente

El agente se activa automáticamente cuando:
- Escribes código nuevo (especialmente integraciones con APIs)
- Solicitas una revisión de código
- Trabajas con módulos de autenticación o configuración de base de datos

También puedes invocarlo explícitamente pidiendo:
```
"Revisa mi código con el agente experto-vibe"
"Haz una auditoría de seguridad de este módulo"
"Analiza las buenas prácticas de este archivo"
```

### Ejemplo de Uso

```
Usuario: "Acabo de escribir la integración con Stripe"

Claude: Activará el agente experto-vibe para revisar:
  ✓ Que no haya API keys hardcodeadas
  ✓ Que el manejo de errores sea adecuado
  ✓ Que existan tests para los casos principales
  ✓ Que la estructura sea modular
```

---

## Cómo Ejecutar la Aplicación

### Opción 1: Abrir directamente
Doble clic en `index.html` para abrirlo en tu navegador.

### Opción 2: Servidor local (recomendado)
```bash
# Con Python
python -m http.server 8000

# Con Node.js (npx)
npx serve .

# Con PHP
php -S localhost:8000
```

Luego visita `http://localhost:8000`

---

## Personalización

### Cambiar colores
Edita las variables CSS en `styles.css`:
```css
:root {
    --bg-primary: #0d1117;      /* Fondo principal */
    --accent-blue: #58a6ff;     /* Color de acento */
    --accent-green: #3fb950;    /* Color de éxito */
    /* ... más variables */
}
```

### Añadir nuevas secciones
1. Agrega un nuevo `<li>` en la navegación (`index.html`)
2. Crea una nueva `<section>` con el id correspondiente
3. El JavaScript manejará la navegación automáticamente

---

## Créditos

Desarrollado con asistencia de Claude (Anthropic) como demostración de Vibe Coding.
