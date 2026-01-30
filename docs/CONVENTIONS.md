# Convenciones de Código

Este documento establece las convenciones de código para mantener consistencia en todo el proyecto.

---

## JavaScript

### Nomenclatura
- **Variables y funciones:** camelCase
  ```javascript
  const userName = 'Laura';
  function getUserData() { }
  ```
- **Constantes globales:** UPPER_SNAKE_CASE
  ```javascript
  const API_KEY = 'xxx';
  const MAX_RETRIES = 3;
  ```
- **Clases:** PascalCase
  ```javascript
  class UserManager { }
  ```

### Declaración de Variables
- Usar `const` por defecto
- Usar `let` solo si se reasigna
- **Nunca** usar `var`

```javascript
// Bien
const items = [];
items.push('item');

let count = 0;
count++;

// Mal
var data = {};
```

### Funciones
- Preferir arrow functions para callbacks
- Funciones nombradas para mejor debugging
- Documentar funciones complejas

```javascript
// Callbacks - arrow function
items.forEach(item => console.log(item));

// Funciones principales - declaración nombrada
function navigateTo(sectionId) {
    // ...
}

// Función compleja - con documentación
/**
 * Genera un reporte HTML con los datos de mercado
 * @param {Array} datos - Lista de activos con precio y cambio
 * @returns {string} HTML del reporte
 */
function generateFinancieroHTML(datos) {
    // ...
}
```

### Strings
- Preferir template literals para interpolación
- Usar comillas simples para strings simples

```javascript
// Bien
const greeting = `Hola, ${userName}!`;
const status = 'active';

// Mal
const greeting = "Hola, " + userName + "!";
```

### Comparaciones
- Usar `===` y `!==` siempre
- Evitar comparaciones implícitas

```javascript
// Bien
if (value === null) { }
if (items.length === 0) { }

// Mal
if (value == null) { }
if (!items.length) { }
```

---

## CSS

### Nomenclatura de Clases
- Usar kebab-case: `.nav-link`, `.chat-widget`
- Seguir BEM para componentes complejos:
  - Bloque: `.card`
  - Elemento: `.card__title`
  - Modificador: `.card--featured`

```css
/* Componente simple */
.nav-link { }
.nav-link:hover { }

/* Componente con BEM */
.card { }
.card__header { }
.card__title { }
.card--featured { }
.card--featured .card__title { }
```

### Variables CSS
- Definir en `:root` para temas
- Usar nombres descriptivos

```css
:root {
    /* Colores */
    --bg-primary: #0d1117;
    --bg-secondary: #161b22;
    --text-primary: #e6edf3;
    --accent-blue: #58a6ff;

    /* Espaciado */
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 2rem;

    /* Transiciones */
    --transition: all 0.3s ease;
}
```

### Organización
1. Reset/Variables
2. Layout (sidebar, content)
3. Componentes (cards, buttons)
4. Utilidades
5. Media queries al final

### Media Queries
- Mobile-first approach
- Breakpoints estándar:
  - `768px` - Tablet
  - `1024px` - Desktop

```css
/* Base (mobile) */
.container { padding: 1rem; }

/* Tablet */
@media (min-width: 768px) {
    .container { padding: 2rem; }
}

/* Desktop */
@media (min-width: 1024px) {
    .container { padding: 3rem; }
}
```

---

## HTML

### Estructura
- Usar elementos semánticos: `<nav>`, `<main>`, `<section>`, `<article>`
- Atributos en orden: id, class, data-*, otros
- Indentación de 4 espacios

```html
<!-- Bien -->
<section id="intro" class="section active" data-index="0">
    <h1>Título</h1>
    <p>Contenido</p>
</section>

<!-- Mal -->
<div class="section" id="intro">
    <div class="title">Título</div>
</div>
```

### Accesibilidad
- Incluir `alt` en imágenes
- Usar `aria-label` en botones sin texto
- Asegurar navegación por teclado

```html
<button class="chat-toggle" onclick="toggleChat()" aria-label="Abrir chat">
    <span class="chat-icon">💬</span>
</button>

<img src="logo.png" alt="Logo de Vibe Coding">
```

---

## Python

### Estilo General
- Seguir PEP 8
- Máximo 79 caracteres por línea
- 4 espacios de indentación

### Nomenclatura
- **Variables y funciones:** snake_case
- **Clases:** PascalCase
- **Constantes:** UPPER_SNAKE_CASE

```python
# Variables y funciones
user_name = "Laura"
def get_user_data():
    pass

# Clases
class UserManager:
    pass

# Constantes
MAX_RETRIES = 3
API_BASE_URL = "https://api.example.com"
```

### Docstrings
- Usar para funciones públicas
- Formato Google style

```python
def fetch_stock_data(symbol: str) -> dict:
    """Obtiene datos de una acción desde la API.

    Args:
        symbol: Símbolo del activo (ej: 'AAPL')

    Returns:
        Diccionario con precio y cambio porcentual

    Raises:
        APIError: Si la API no responde
    """
    pass
```

### Type Hints
- Usar en funciones públicas
- Importar tipos de `typing` si es necesario

```python
from typing import List, Dict, Optional

def process_items(items: List[str]) -> Dict[str, int]:
    pass

def get_user(user_id: int) -> Optional[User]:
    pass
```

### Imports
- Orden: stdlib, terceros, locales
- Separar con línea en blanco

```python
# Standard library
import os
import json
from datetime import datetime

# Third party
import requests

# Local
from utils import format_date
```

---

## Git

### Mensajes de Commit
Formato: `<tipo>(<alcance>): <descripción>`

**Tipos:**
| Tipo | Uso |
|------|-----|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de bug |
| `docs` | Documentación |
| `style` | Formato (no afecta lógica) |
| `refactor` | Reestructuración de código |
| `test` | Agregar o modificar tests |
| `chore` | Tareas de mantenimiento |

**Ejemplos:**
```bash
feat(chat): add secret market function
fix(nav): resolve mobile menu not closing on link click
docs(readme): add installation instructions
style(css): format variables section
refactor(api): extract fetch logic to separate function
test(chat): add unit tests for bot responses
chore(deps): update finnhub api version
```

### Branches
- `main` - Producción estable
- `develop` - Desarrollo activo
- `feature/nombre` - Nueva funcionalidad
- `fix/nombre` - Corrección de bug

```bash
git checkout -b feature/documentation-section
git checkout -b fix/chat-scroll-issue
```

---

## Comentarios

### Cuándo Comentar
- Lógica compleja que no es obvia
- Workarounds o hacks necesarios
- TODOs con contexto

### Cuándo NO Comentar
- Código auto-explicativo
- Obviedades
- Código comentado (borrarlo)

```javascript
// Bien - explica el "por qué"
// Usamos setTimeout porque el DOM necesita actualizarse primero
setTimeout(() => scrollToBottom(), 100);

// Mal - describe lo obvio
// Incrementa el contador
counter++;

// Bien - TODO con contexto
// TODO: Reemplazar con API real cuando esté disponible
const mockData = getMockData();

// Mal - código muerto
// function oldFunction() { }
```

---

## Checklist de Revisión

Antes de cada commit, verificar:

- [ ] El código sigue las convenciones de nomenclatura
- [ ] No hay `console.log` de debugging
- [ ] No hay código comentado
- [ ] Las funciones complejas están documentadas
- [ ] El CSS usa variables donde corresponde
- [ ] El HTML es semántico y accesible
- [ ] El mensaje de commit sigue el formato
