# Workflow de Desarrollo con IA

Este documento describe el proceso de trabajo para desarrollar con asistencia de IA de manera efectiva y segura.

---

## Flujo General

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   PLANEAR   │ ──▶ │  DESARROLLAR │ ──▶ │   REVISAR   │ ──▶ │  DOCUMENTAR │
│             │     │              │     │             │     │             │
│ • PRD       │     │ • Prompt     │     │ • Código    │     │ • Changelog │
│ • Alcance   │     │ • Iterar     │     │ • Tests     │     │ • Commits   │
│ • Criterios │     │ • Ajustar    │     │ • Seguridad │     │ • AI Log    │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

---

## Fase 1: Planear

### Antes de Escribir Código

1. **Definir el objetivo claramente**
   - ¿Qué problema resuelve?
   - ¿Quién lo usará?
   - ¿Cuál es el resultado esperado?

2. **Crear/Actualizar PRD**
   - Agregar nuevo requisito funcional
   - Definir criterios de aceptación
   - Estimar prioridad

3. **Verificar código existente**
   - ¿Hay código relacionado?
   - ¿Se puede reutilizar algo?
   - ¿Qué archivos se modificarán?

### Checklist de Planificación
```
□ Objetivo definido claramente
□ PRD actualizado con nuevo requisito
□ Criterios de aceptación establecidos
□ Código existente revisado
□ Archivos a modificar identificados
```

---

## Fase 2: Desarrollar

### Escribir el Prompt

**Estructura recomendada:**
```
[Contexto] + [Tarea específica] + [Requisitos] + [Restricciones]
```

**Ejemplo malo:**
```
Haz una función de login
```

**Ejemplo bueno:**
```
Contexto: Estoy creando una app de tareas en JavaScript vanilla.

Tarea: Crea una función de autenticación que:
1. Valide formato de email
2. Verifique contraseña mínimo 8 caracteres
3. Retorne un objeto con {success, message, token}

Requisitos:
- Sin dependencias externas
- Manejo de errores descriptivo
- Compatible con ES6+

Restricciones:
- No usar localStorage para guardar credenciales
- No hacer llamadas a APIs reales (mock data)
```

### Iterar con la IA

1. **Enviar prompt inicial**
2. **Revisar output** - ¿Cumple los requisitos?
3. **Solicitar ajustes** si es necesario:
   - "Agrega validación para..."
   - "Cambia el formato de..."
   - "Refactoriza para..."
4. **Repetir** hasta satisfacción

### Checklist de Desarrollo
```
□ Prompt específico y detallado
□ Requisitos incluidos
□ Restricciones mencionadas
□ Output revisado antes de integrar
□ Ajustes solicitados si necesario
```

---

## Fase 3: Revisar

### Revisión de Código

**4 Pasos obligatorios:**

```
┌────────────────────────────────────────────────────────────────┐
│  1. ENTENDER                                                    │
│     ¿Qué hace este código? ¿Puedo explicarlo?                  │
├────────────────────────────────────────────────────────────────┤
│  2. SEGURIDAD                                                   │
│     ¿Hay vulnerabilidades? ¿Credenciales expuestas?            │
├────────────────────────────────────────────────────────────────┤
│  3. TESTS                                                       │
│     ¿Pasan los tests existentes? ¿Necesito nuevos?             │
├────────────────────────────────────────────────────────────────┤
│  4. PRUEBA MANUAL                                               │
│     ¿Funciona en el navegador/terminal?                        │
└────────────────────────────────────────────────────────────────┘
```

### Puntos de Seguridad

Verificar que NO haya:
- [ ] API keys hardcodeadas
- [ ] Contraseñas en el código
- [ ] Datos sensibles en logs
- [ ] eval() o innerHTML con datos de usuario
- [ ] Requests a URLs no validadas

### Checklist de Revisión
```
□ Entiendo la lógica del código
□ No hay vulnerabilidades de seguridad
□ Tests existentes pasan
□ Probé manualmente la funcionalidad
□ El código sigue las convenciones
```

---

## Fase 4: Documentar

### Actualizar Changelog

```markdown
## [X.X.X] - YYYY-MM-DD
### Agregado
- Nueva funcionalidad X

### Cambiado
- Mejora en Y

### Corregido
- Bug en Z
```

### Registrar Iteración con IA

En `docs/AI_ITERATIONS.md`:
```markdown
## Iteración N - [Título]
**Fecha:** YYYY-MM-DD

### Prompt Enviado
[Prompt exacto]

### Output de IA
[Resumen de lo generado]

### Cambios Manuales
[Lista de ajustes hechos]

### Razones
[Por qué se hicieron los cambios]
```

### Commit Descriptivo

```bash
# Formato
git commit -m "tipo(alcance): descripción breve"

# Ejemplo
git commit -m "feat(chat): add secret market function with API integration"
```

### Checklist de Documentación
```
□ CHANGELOG.md actualizado
□ AI_ITERATIONS.md con nueva entrada
□ Commit con mensaje descriptivo
□ PRD actualizado si aplica
□ README actualizado si hay cambios de uso
```

---

## Comandos Útiles

### Desarrollo Local

```bash
# Iniciar servidor web
python -m http.server 8000

# Ejecutar chatbot
python chatbot.py

# Ver archivos modificados
git status

# Ver cambios
git diff
```

### Git

```bash
# Ver historial reciente
git log --oneline -10

# Crear branch para feature
git checkout -b feature/nombre

# Agregar archivos específicos
git add archivo1.js archivo2.css

# Commit con mensaje
git commit -m "feat(scope): description"

# Volver a main
git checkout main
```

### Búsqueda

```bash
# Buscar en archivos
grep -r "texto" --include="*.js"

# Buscar archivos
find . -name "*.html"
```

---

## Ciclo TDD con IA

```
┌─────────────────────────────────────────────────────────────┐
│                    CICLO TDD + IA                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────┐                                               │
│   │  RED    │  1. Pide a Claude: "Escribe un test que       │
│   │  🔴     │     verifique [funcionalidad]"                │
│   └────┬────┘                                               │
│        │                                                    │
│        ▼                                                    │
│   ┌─────────┐                                               │
│   │  GREEN  │  2. Pide: "Implementa el código mínimo        │
│   │  🟢     │     para que pase este test"                  │
│   └────┬────┘                                               │
│        │                                                    │
│        ▼                                                    │
│   ┌─────────┐                                               │
│   │REFACTOR │  3. Pide: "Refactoriza este código            │
│   │  🔵     │     manteniendo los tests verdes"             │
│   └────┬────┘                                               │
│        │                                                    │
│        └──────────────▶ Repetir                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Errores Comunes a Evitar

| Error | Consecuencia | Solución |
|-------|--------------|----------|
| No revisar código de IA | Bugs, vulnerabilidades | Siempre revisar antes de integrar |
| Prompts vagos | Output incorrecto | Ser específico y detallado |
| Ignorar tests | Regresiones | TDD desde el inicio |
| No documentar | Código inmantenible | Documentar cada iteración |
| Desactivar sandbox | Riesgo de seguridad | Mantenerlo siempre activo |
| Commits gigantes | Difícil de revisar | Commits pequeños y frecuentes |

---

## Templates Rápidos

### Template de Prompt
```
Contexto: [Descripción del proyecto/situación]

Tarea: [Qué necesito que hagas]

Requisitos:
- [Requisito 1]
- [Requisito 2]

Restricciones:
- [Restricción 1]
- [Restricción 2]

Output esperado: [Formato o estructura esperada]
```

### Template de Issue/Bug
```
## Descripción
[Qué está pasando]

## Pasos para Reproducir
1. [Paso 1]
2. [Paso 2]

## Comportamiento Esperado
[Qué debería pasar]

## Comportamiento Actual
[Qué está pasando]

## Screenshots
[Si aplica]
```

### Template de Feature Request
```
## Funcionalidad
[Descripción breve]

## Motivación
[Por qué es necesaria]

## Propuesta
[Cómo implementarla]

## Alternativas
[Otras opciones consideradas]
```
