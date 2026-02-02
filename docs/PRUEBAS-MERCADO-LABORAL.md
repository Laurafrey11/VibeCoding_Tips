# Casos de Prueba - Módulo Mercado Laboral

## Test Suite para verificar el funcionamiento

---

## TEST 1: Activación del módulo

### Pasos:
1. Abrir `index.html` en navegador
2. Click en chat widget
3. Escribir: `mercado`
4. Verificar que aparecen opciones Financiero/Laboral
5. Click en "Laboral"
6. Verificar que aparecen 3 botones

### Resultado esperado:
```
✅ Aparece menú con:
   - 📄 Optimización de CV
   - 🔍 Búsqueda de Ofertas
   - 📊 Generar Reporte de Empleos
```

---

## TEST 2: Búsqueda adaptada - Perfil Power Platform

### Input (CV de prueba):
```
MARÍA LAURA FREYRE
Business Process Automation & Power Platform Consultant

EXPERIENCIA:
- Accenture (2024-Actual) | Cliente: Mercado Libre
  Automatización de procesos operativos
  SQL en BigQuery, agentes de IA, Looker

- Fresh BI (2022-2024) | Power Platform Developer
  Diseño de soluciones Power BI y Power Platform
  Uso de Copilot y LLMs

CERTIFICACIONES:
- Microsoft Certified: Power BI Data Analyst (PL-300)
- Power Platform Solution Architect (PL-600)
- Fabric Analytics Engineer (DP-600)

SKILLS:
Power Platform, Power BI, SQL, n8n, BigQuery, Looker, Python

Inglés avanzado (C1)
Ciudadanía italiana
```

### Resultado esperado:
```
✅ Área detectada: Power Platform
✅ Nivel: Senior
✅ Skills: power bi, sql, n8n, bigquery, looker, python
✅ Certificaciones: Power BI Data Analyst, Power Platform Solution Architect, Fabric Analytics Engineer
✅ Ciudadanía EU: Sí
✅ Inglés: Sí
✅ Plataformas incluyen: Microsoft Careers, LinkedIn EU
```

---

## TEST 3: Búsqueda adaptada - Perfil Data Analyst Junior

### Input (CV de prueba):
```
JUAN PÉREZ
Data Analyst Junior

EXPERIENCIA:
- Empresa X (2023-Actual) | Analista de datos
  Creación de reportes en Excel
  Consultas SQL básicas

EDUCACIÓN:
- Ingeniería Industrial (en curso)

SKILLS:
Excel, SQL, Tableau (básico), Python (aprendiendo)

Ubicación: Buenos Aires, Argentina
```

### Resultado esperado:
```
✅ Área detectada: Data & Analytics
✅ Nivel: Junior
✅ Skills: excel, sql, tableau, python
✅ Certificaciones: ninguna
✅ Ciudadanía EU: No
✅ Plataformas incluyen: GetOnBoard, Computrabajo, LinkedIn
```

---

## TEST 4: Análisis ATS con puesto específico

### Input - Descripción del puesto:
```
Senior Power BI Developer

Requisitos:
- 5+ años de experiencia en Power BI
- Dominio de DAX y Power Query
- Experiencia con Azure Data Factory
- SQL avanzado
- Metodologías ágiles (Scrum)
- Inglés fluido

Deseable:
- Certificación PL-300
- Experiencia con Fabric
```

### Input - CV de prueba:
```
PEDRO GÓMEZ
BI Developer

Experiencia:
- Empresa Y (2020-2024): Desarrollador BI
  Dashboards en Power BI
  Consultas SQL

Skills: Power BI, SQL, Excel
```

### Resultado esperado:
```
✅ Match ATS: ~30-40% (bajo)
✅ Keywords faltantes: dax, power query, azure, agile, scrum
✅ Críticas: Sin métricas, pocas certificaciones
```

---

## TEST 5: Análisis ATS con buen match

### Input - Descripción del puesto:
```
Power Platform Developer
- Power BI, Power Automate
- SQL
- Inglés intermedio
```

### Input - CV:
```
ANA MARTÍNEZ
Power Platform Developer

Experiencia:
- Implementé 15 dashboards en Power BI
- Automaticé 20 procesos con Power Automate
- Reduje tiempo de reporting en 60%

Skills: Power BI, Power Automate, SQL, DAX

Inglés intermedio
```

### Resultado esperado:
```
✅ Match ATS: ~70-80% (bueno)
✅ Detecta métricas: 15 dashboards, 20 procesos, 60%
✅ Logros STAR identificados
```

---

## TEST 6: Detección de ciudadanía EU

### Inputs a probar:
```
1. "Ciudadanía italiana" → ✅ ciudadaniaEU: true
2. "ciudadania italiana" → ✅ ciudadaniaEU: true
3. "Pasaporte italiano" → ✅ ciudadaniaEU: true
4. "Pasaporte europeo" → ✅ ciudadaniaEU: true
5. "Italian citizenship" → ✅ ciudadaniaEU: true
6. "Vivo en Italia" → ❌ ciudadaniaEU: false (no es keyword)
```

---

## TEST 7: Detección de inglés

### Inputs a probar:
```
1. "Inglés avanzado" → ✅ ingles: true
2. "English C1" → ✅ ingles: true
3. "First Certificate" → ✅ ingles: true
4. "TOEFL 100" → ✅ ingles: true
5. "Fluent English" → ✅ ingles: true
6. "Inglés básico" → ❌ ingles: false (no debería detectar)
```

---

## TEST 8: Reporte de empleos

### Pasos:
1. Click en "📊 Generar Reporte de Empleos"
2. Esperar loading
3. Verificar descarga automática

### Resultado esperado:
```
✅ Se descarga archivo: empleos_bpa_automation.html
✅ Mensaje de éxito con cantidad de ofertas
```

---

## TEST 9: Manejo de errores

### Caso: CV vacío
```
Input: (nada)
Esperado: Mensaje de error pidiendo CV
```

### Caso: CV muy corto
```
Input: "Juan Pérez, analista"
Esperado: Crítica "CV muy corto"
```

### Caso: Sin skills claros
```
Input: "Trabajo en una empresa haciendo cosas"
Esperado: Crítica "Pocas skills técnicas claras"
```

---

## TEST 10: Flujo completo end-to-end

### Secuencia:
```
1. mercado → Laboral → Búsqueda de Ofertas
2. Pegar CV completo de María Laura
3. Ver recomendaciones personalizadas
4. Click en "Optimizar mi CV"
5. Escribir "general"
6. Pegar mismo CV
7. Ver análisis ATS + STAR
8. Click en "Ver ofertas actuales"
9. Verificar descarga de reporte
```

### Checkpoints:
```
✅ Transición fluida entre opciones
✅ Datos del CV se mantienen (perfilExtraido)
✅ Cada pantalla muestra info correcta
✅ Botones funcionan
```

---

## RESULTADOS DE PRUEBAS

| Test | Estado | Notas |
|------|--------|-------|
| TEST 1 | ⏳ | Activación del módulo |
| TEST 2 | ⏳ | Perfil Power Platform |
| TEST 3 | ⏳ | Perfil Junior |
| TEST 4 | ⏳ | ATS bajo match |
| TEST 5 | ⏳ | ATS buen match |
| TEST 6 | ⏳ | Ciudadanía EU |
| TEST 7 | ⏳ | Inglés |
| TEST 8 | ⏳ | Reporte |
| TEST 9 | ⏳ | Errores |
| TEST 10 | ⏳ | End-to-end |

---

## CÓMO EJECUTAR LAS PRUEBAS

### Manual (navegador):
1. Abrir `index.html`
2. Seguir cada test paso a paso
3. Marcar resultado en esta tabla

### Con consola (debug):
```javascript
// En F12 → Console

// Ver estado actual
console.log(mercadoState);

// Probar extracción de perfil
const testCV = "Power BI, SQL, PL-300, ciudadanía italiana, inglés C1";
console.log(extraerPerfilDeCV(testCV));

// Probar detección de logros
const testLogros = "Implementé 15 dashboards. Reduje costos en 30%.";
console.log(detectarLogrosEnCV(testLogros));
```

---

*Test Suite v1.0 - 2025-02-02*
