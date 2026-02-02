# Lista Maestra de Activos Financieros

## Configuración del Módulo Mercado Financiero

---

## Resumen

| Categoría | Cantidad | Ejemplos |
|-----------|----------|----------|
| Criptomonedas | 3 | DOT, ETH, ADA |
| Acciones Tech | 8 | AAPL, NVDA, MSFT |
| Acciones USA | 8 | V, UNH, PG |
| Acciones LATAM | 3 | YPF, GLOB, CIB |
| ETFs Índices | 3 | SPY, QQQ, DIA |
| ETFs Sectoriales | 4 | XLK, XLV, XLE, ICLN |
| ETFs Commodities | 2 | GLD, SLV |
| ETFs Regionales | 1 | EWZ |
| Fondos Especiales | 6 | BYMAT, PIBIT, etc. |
| **TOTAL** | **40** | - |

---

## Lista Completa por Categoría

### 🪙 CRIPTOMONEDAS

| Símbolo | Nombre | Descripción |
|---------|--------|-------------|
| `DOT` | Polkadot | Blockchain interoperable |
| `ETH` | Ethereum | Plataforma smart contracts |
| `ADA` | Cardano | Blockchain proof-of-stake |

---

### 💻 ACCIONES TECNOLÓGICAS (Big Tech)

| Símbolo | Nombre | Sector |
|---------|--------|--------|
| `AAPL` | Apple Inc. | Hardware/Software |
| `MSFT` | Microsoft Corporation | Software/Cloud |
| `GOOGL` | Alphabet Inc. (Google) | Internet/AI |
| `AMZN` | Amazon.com Inc. | E-commerce/Cloud |
| `TSLA` | Tesla Inc. | EV/Energy |
| `NVDA` | NVIDIA Corporation | Semiconductores/AI |
| `AMD` | Advanced Micro Devices | Semiconductores |
| `ADBE` | Adobe Inc. | Software creativo |

---

### 🏢 ACCIONES USA (Blue Chips)

| Símbolo | Nombre | Sector |
|---------|--------|--------|
| `T` | AT&T Inc. | Telecom |
| `UNH` | UnitedHealth Group | Healthcare |
| `PG` | Procter & Gamble | Consumer Goods |
| `V` | Visa Inc. | Financial Services |
| `PEP` | PepsiCo Inc. | Consumer Goods |
| `ABBV` | AbbVie Inc. | Pharma |
| `CRSP` | CRISPR Therapeutics | Biotech |
| `AES` | AES Corporation | Energy/Utilities |

---

### 🇦🇷 ACCIONES LATAM

| Símbolo | Nombre | País | Sector |
|---------|--------|------|--------|
| `YPF` | YPF S.A. | Argentina | Energy |
| `GLOB` | Globant S.A. | Argentina | Tech Services |
| `CIB` | Bancolombia S.A. | Colombia | Banking |

---

### 🏛️ BERKSHIRE HATHAWAY

| Símbolo | Nombre | Nota |
|---------|--------|------|
| `BRK.B` | Berkshire Hathaway B | Clase B (accesible) |
| `BRK.A` | Berkshire Hathaway A | Clase A (~$620k) |

**Aliases soportados:** `BRK`, `BBRK`, `B` → todos apuntan a BRK.B

---

### 📊 ETFs ÍNDICES PRINCIPALES

| Símbolo | Nombre | Índice que replica |
|---------|--------|-------------------|
| `SPY` | SPDR S&P 500 ETF | S&P 500 |
| `QQQ` | Invesco QQQ Trust | Nasdaq 100 |
| `DIA` | SPDR Dow Jones ETF | Dow Jones 30 |

---

### 📈 ETFs SECTORIALES

| Símbolo | Nombre | Sector |
|---------|--------|--------|
| `XLK` | Technology Select Sector | Tecnología |
| `XLV` | Health Care Select Sector | Salud |
| `XLE` | Energy Select Sector | Energía |
| `ICLN` | iShares Global Clean Energy | Energía limpia |

---

### 🥇 ETFs COMMODITIES

| Símbolo | Nombre | Commodity |
|---------|--------|-----------|
| `GLD` | SPDR Gold Shares | Oro |
| `SLV` | iShares Silver Trust | Plata |

---

### 🌎 ETFs REGIONALES

| Símbolo | Nombre | Región |
|---------|--------|--------|
| `EWZ` | iShares MSCI Brazil | Brasil |

---

### 📁 FONDOS ESPECIALES

| Símbolo | Nombre | Tipo |
|---------|--------|------|
| `BYMAT` | ByMA (Bolsas y Mercados Arg) | Fondo Argentina |
| `SMJP` | SMJP Fund | Fondo |
| `MKOT` | MKOT Fund | Fondo |
| `RAX` | RAX Fund | Fondo |
| `PIBIT` | PIBIT Fund | Fondo |
| `RSMH` | RSMH Fund | Fondo |

---

## Cómo Consultar un Activo

### Método 1: Consulta individual
```
1. Escribir: mercado
2. Seleccionar: Financiero
3. Seleccionar: 🔍 Consultar acción/ETF específico
4. Escribir símbolo: ETH, NVDA, SPY, etc.
```

### Método 2: Reporte completo
```
1. Escribir: mercado
2. Seleccionar: Financiero
3. Seleccionar: 📊 Generar reporte completo
→ Se descarga HTML con todos los activos
```

### Método 3: Asistente
```
1. Escribir: mercado
2. Seleccionar: Financiero
3. Seleccionar: 🤖 Asistente de inversiones
4. Preguntar: "¿Qué opinas de NVDA?" o "Compara SPY vs QQQ"
```

---

## Precios de Demostración

Si no hay API key configurada, el sistema usa precios simulados:

| Tipo | Rango de precios |
|------|------------------|
| Criptos | $0.50 - $3,500 |
| Acciones | $15 - $620,000 |
| ETFs | $14 - $600 |
| Fondos | $42 - $1,250 |

**Para datos reales:** Configurar `FINNHUB_API_KEY` en app.js
- Obtener key gratis en: https://finnhub.io

---

## Reglas de Interpretación

### Tickers pegados
El sistema interpreta automáticamente:
- `DOTETHADA` → DOT, ETH, ADA
- `BRKB` → BRK.B
- `GOOGL` o `GOOG` → GOOGL

### Aliases
| Input | Se interpreta como |
|-------|-------------------|
| BRK | BRK.B |
| BBRK | BRK.B |
| B | BRK.B |

---

## Agregar Nuevos Activos

### Ubicación en código:
```javascript
// app.js línea ~1441
const STOCK_DATA = [
    { simbolo: 'NUEVO', nombre: 'Nombre Completo', categoria: 'Categoría', tipo: 'stock' },
    // ...
];
```

### También agregar precio demo:
```javascript
// app.js línea ~1152
const preciosDemo = {
    'NUEVO': { precio: 100, nombre: 'Nombre Completo', categoria: 'Categoría' },
    // ...
};
```

---

*Documento actualizado: 2025-02-02*
