"""
Chatbot con función secreta de oportunidades del mercado
La palabra mágica 'mercado' activa opciones (financiero/laboral) - no se muestra como opción
Genera archivos HTML descargables
"""

import os
import sys
import re
import webbrowser
from datetime import datetime

# Fix encoding para Windows
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

# Para datos del mercado financiero
try:
    import yfinance as yf
except ImportError:
    print("Instalando yfinance...")
    import subprocess
    subprocess.check_call(['pip', 'install', 'yfinance'])
    import yfinance as yf

# Para búsqueda de empleos
try:
    import requests
except ImportError:
    print("Instalando requests...")
    import subprocess
    subprocess.check_call(['pip', 'install', 'requests'])
    import requests


# Carpeta donde se guardan los reportes
REPORTES_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'reportes')

# Símbolos del mercado a monitorear (sin criptomonedas)
MARKET_SYMBOLS = {
    'acciones': ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA'],
    'indices': ['^XLV', '^EWZ', '^XLE']  # S&P 500, Dow Jones, NASDAQ
}


def crear_carpeta_reportes():
    """Crea la carpeta de reportes si no existe"""
    if not os.path.exists(REPORTES_DIR):
        os.makedirs(REPORTES_DIR)
    return REPORTES_DIR


# ============================================
# MERCADO FINANCIERO
# ============================================

def obtener_datos_mercado():
    """Obtiene datos actuales del mercado financiero"""
    oportunidades = []

    print("📊 Obteniendo datos del mercado financiero...")

    for categoria, simbolos in MARKET_SYMBOLS.items():
        for simbolo in simbolos:
            try:
                ticker = yf.Ticker(simbolo)
                hist = ticker.history(period='5d')

                if len(hist) >= 2:
                    precio_actual = hist['Close'].iloc[-1]
                    precio_anterior = hist['Close'].iloc[-2]
                    cambio_pct = ((precio_actual - precio_anterior) / precio_anterior) * 100

                    # Incluir todos los activos con su cambio
                    tipo = "📈 SUBIDA" if cambio_pct > 0 else "📉 BAJADA"
                    oportunidades.append({
                        'simbolo': simbolo,
                        'categoria': categoria,
                        'precio': precio_actual,
                        'cambio': cambio_pct,
                        'tipo': tipo,
                        'es_oportunidad': abs(cambio_pct) > 2
                    })
            except Exception:
                continue

    return oportunidades


def generar_html_financiero(datos):
    """Genera archivo HTML con datos del mercado financiero"""
    fecha = datetime.now().strftime("%d/%m/%Y %H:%M")
    fecha_archivo = datetime.now().strftime("%Y%m%d_%H%M%S")

    oportunidades = [d for d in datos if d['es_oportunidad']]

    html = f"""<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Oportunidades del Mercado - {fecha}</title>
    <style>
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        body {{
            font-family: 'Segoe UI', Arial, sans-serif;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            color: #eee;
            min-height: 100vh;
            padding: 20px;
        }}
        .container {{ max-width: 1200px; margin: 0 auto; }}
        .header {{
            background: linear-gradient(135deg, #667eea, #764ba2);
            padding: 30px;
            border-radius: 15px;
            margin-bottom: 30px;
            text-align: center;
        }}
        .header h1 {{ font-size: 2.5em; margin-bottom: 10px; }}
        .header p {{ opacity: 0.9; }}
        .section-title {{
            font-size: 1.5em;
            margin: 30px 0 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #667eea;
        }}
        .grid {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }}
        .card {{
            background: #16213e;
            padding: 20px;
            border-radius: 12px;
            border-left: 4px solid #667eea;
            transition: transform 0.3s;
        }}
        .card:hover {{ transform: translateY(-5px); }}
        .card.subida {{ border-left-color: #00ff88; }}
        .card.bajada {{ border-left-color: #ff4757; }}
        .card.oportunidad {{ box-shadow: 0 0 20px rgba(102, 126, 234, 0.3); }}
        .simbolo {{ font-size: 1.4em; font-weight: bold; margin-bottom: 5px; }}
        .categoria {{
            display: inline-block;
            background: #667eea33;
            padding: 3px 10px;
            border-radius: 20px;
            font-size: 0.8em;
            margin-bottom: 10px;
        }}
        .precio {{ font-size: 2em; font-weight: bold; margin: 10px 0; }}
        .cambio {{ font-size: 1.3em; font-weight: bold; }}
        .positivo {{ color: #00ff88; }}
        .negativo {{ color: #ff4757; }}
        .badge {{
            display: inline-block;
            background: #ff4757;
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 0.8em;
            margin-top: 10px;
        }}
        .badge.hot {{ background: linear-gradient(135deg, #f093fb, #f5576c); }}
        .footer {{
            text-align: center;
            margin-top: 40px;
            padding: 20px;
            opacity: 0.7;
            font-size: 0.9em;
        }}
        .stats {{
            display: flex;
            justify-content: center;
            gap: 40px;
            margin: 20px 0;
            flex-wrap: wrap;
        }}
        .stat {{
            text-align: center;
            background: #ffffff11;
            padding: 20px 30px;
            border-radius: 10px;
        }}
        .stat-value {{ font-size: 2em; font-weight: bold; color: #667eea; }}
        .stat-label {{ font-size: 0.9em; opacity: 0.8; }}
        @media print {{
            body {{ background: white; color: black; }}
            .card {{ border: 1px solid #ddd; }}
        }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 Oportunidades del Mercado</h1>
            <p>Reporte generado: {fecha}</p>
        </div>

        <div class="stats">
            <div class="stat">
                <div class="stat-value">{len(datos)}</div>
                <div class="stat-label">Activos analizados</div>
            </div>
            <div class="stat">
                <div class="stat-value">{len(oportunidades)}</div>
                <div class="stat-label">Oportunidades (>2%)</div>
            </div>
            <div class="stat">
                <div class="stat-value">{len([d for d in datos if d['cambio'] > 0])}</div>
                <div class="stat-label">En subida</div>
            </div>
        </div>
"""

    if oportunidades:
        html += '<h2 class="section-title">🔥 Oportunidades Detectadas (cambio > 2%)</h2>\n<div class="grid">\n'
        for op in oportunidades:
            clase_tipo = "subida" if op['cambio'] > 0 else "bajada"
            clase_cambio = "positivo" if op['cambio'] > 0 else "negativo"
            signo = "+" if op['cambio'] > 0 else ""

            html += f"""
            <div class="card {clase_tipo} oportunidad">
                <div class="simbolo">{op['simbolo']}</div>
                <span class="categoria">{op['categoria'].upper()}</span>
                <div class="precio">${op['precio']:.2f}</div>
                <div class="cambio {clase_cambio}">{signo}{op['cambio']:.2f}%</div>
                <span class="badge hot">🔥 OPORTUNIDAD</span>
            </div>
"""
        html += '</div>\n'

    html += '<h2 class="section-title">📊 Todos los Activos</h2>\n<div class="grid">\n'
    for op in datos:
        clase_tipo = "subida" if op['cambio'] > 0 else "bajada"
        clase_cambio = "positivo" if op['cambio'] > 0 else "negativo"
        signo = "+" if op['cambio'] > 0 else ""

        html += f"""
            <div class="card {clase_tipo}">
                <div class="simbolo">{op['simbolo']}</div>
                <span class="categoria">{op['categoria'].upper()}</span>
                <div class="precio">${op['precio']:.2f}</div>
                <div class="cambio {clase_cambio}">{signo}{op['cambio']:.2f}%</div>
            </div>
"""
    html += '</div>\n'

    html += """
        <div class="footer">
            <p>📈 Datos obtenidos de Yahoo Finance</p>
            <p>⚠️ Este reporte es informativo. No constituye asesoría financiera.</p>
            <p>Generado por Chatbot de Oportunidades</p>
        </div>
    </div>
</body>
</html>
"""

    # Guardar archivo
    crear_carpeta_reportes()
    filename = f"mercado_financiero_{fecha_archivo}.html"
    filepath = os.path.join(REPORTES_DIR, filename)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html)

    return filepath


# ============================================
# MERCADO LABORAL
# ============================================

def buscar_empleos_remoto_argentina():
    """Busca empleos remotos en Argentina para Automation/Process"""
    print("💼 Buscando empleos remotos en Argentina...")

    empleos = []

    # API de Remotive (gratuita, no requiere key)
    try:
        url = "https://remotive.com/api/remote-jobs"
        params = {
            'search': 'automation process',
            'limit': 20
        }
        response = requests.get(url, params=params, timeout=10)

        if response.status_code == 200:
            data = response.json()
            for job in data.get('jobs', []):
                location = job.get('candidate_required_location', '').lower()
                if any(loc in location for loc in ['argentina', 'latam', 'latin america', 'worldwide', 'anywhere', 'south america']):
                    empleos.append({
                        'titulo': job.get('title', 'Sin título'),
                        'empresa': job.get('company_name', 'Empresa no especificada'),
                        'ubicacion': job.get('candidate_required_location', 'Remoto'),
                        'url': job.get('url', ''),
                        'fecha': job.get('publication_date', '')[:10] if job.get('publication_date') else '',
                        'categoria': job.get('category', ''),
                        'tipo': job.get('job_type', ''),
                        'salario': job.get('salary', 'No especificado')
                    })
    except Exception as e:
        print(f"Error con Remotive API: {e}")

    # API de Arbeitnow (gratuita)
    try:
        url = "https://www.arbeitnow.com/api/job-board-api"
        response = requests.get(url, timeout=10)

        if response.status_code == 200:
            data = response.json()
            for job in data.get('data', []):
                title_lower = job.get('title', '').lower()
                if 'automation' in title_lower or 'process' in title_lower or 'rpa' in title_lower:
                    if job.get('remote', False):
                        empleos.append({
                            'titulo': job.get('title', 'Sin título'),
                            'empresa': job.get('company_name', 'Empresa no especificada'),
                            'ubicacion': 'Remoto',
                            'url': job.get('url', ''),
                            'fecha': job.get('created_at', '')[:10] if job.get('created_at') else '',
                            'categoria': 'Automation',
                            'tipo': 'Full-time',
                            'salario': 'No especificado'
                        })
    except Exception as e:
        print(f"Error con Arbeitnow API: {e}")

    # Eliminar duplicados por URL
    urls_vistas = set()
    empleos_unicos = []
    for emp in empleos:
        if emp['url'] not in urls_vistas:
            urls_vistas.add(emp['url'])
            empleos_unicos.append(emp)

    return empleos_unicos[:20]


def generar_html_laboral(empleos):
    """Genera archivo HTML con ofertas laborales"""
    fecha = datetime.now().strftime("%d/%m/%Y %H:%M")
    fecha_archivo = datetime.now().strftime("%Y%m%d_%H%M%S")

    html = f"""<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Empleos Remotos - Automation Process - {fecha}</title>
    <style>
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        body {{
            font-family: 'Segoe UI', Arial, sans-serif;
            background: linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%);
            color: #eee;
            min-height: 100vh;
            padding: 20px;
        }}
        .container {{ max-width: 1000px; margin: 0 auto; }}
        .header {{
            background: linear-gradient(135deg, #11998e, #38ef7d);
            padding: 30px;
            border-radius: 15px;
            margin-bottom: 30px;
            text-align: center;
        }}
        .header h1 {{ font-size: 2.2em; margin-bottom: 10px; color: #1a1a2e; }}
        .header p {{ color: #1a1a2e; opacity: 0.8; }}
        .filters {{
            background: #ffffff11;
            padding: 15px 20px;
            border-radius: 10px;
            margin-bottom: 20px;
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
        }}
        .filter-tag {{
            background: #38ef7d33;
            color: #38ef7d;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 0.9em;
        }}
        .stats {{
            display: flex;
            justify-content: center;
            gap: 30px;
            margin: 20px 0;
        }}
        .stat {{
            text-align: center;
            background: #ffffff11;
            padding: 15px 25px;
            border-radius: 10px;
        }}
        .stat-value {{ font-size: 1.8em; font-weight: bold; color: #38ef7d; }}
        .stat-label {{ font-size: 0.85em; opacity: 0.8; }}
        .job-list {{ display: flex; flex-direction: column; gap: 15px; }}
        .job-card {{
            background: #16213e;
            padding: 25px;
            border-radius: 12px;
            border-left: 4px solid #38ef7d;
            transition: all 0.3s;
        }}
        .job-card:hover {{
            transform: translateX(10px);
            box-shadow: 0 5px 20px rgba(56, 239, 125, 0.2);
        }}
        .job-header {{ display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px; }}
        .empresa {{
            color: #38ef7d;
            font-size: 0.95em;
            margin-bottom: 5px;
            display: flex;
            align-items: center;
            gap: 8px;
        }}
        .titulo {{ font-size: 1.3em; font-weight: bold; margin-bottom: 10px; }}
        .detalles {{
            display: flex;
            gap: 20px;
            font-size: 0.9em;
            opacity: 0.8;
            flex-wrap: wrap;
            margin: 15px 0;
        }}
        .detalle {{ display: flex; align-items: center; gap: 5px; }}
        .btn {{
            display: inline-block;
            background: linear-gradient(135deg, #11998e, #38ef7d);
            color: #1a1a2e;
            padding: 12px 25px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: bold;
            transition: transform 0.3s;
        }}
        .btn:hover {{ transform: scale(1.05); }}
        .footer {{
            text-align: center;
            margin-top: 40px;
            padding: 20px;
            opacity: 0.7;
            font-size: 0.9em;
        }}
        .no-results {{
            text-align: center;
            padding: 60px 20px;
            background: #16213e;
            border-radius: 15px;
        }}
        .no-results h2 {{ margin-bottom: 15px; }}
        @media (max-width: 600px) {{
            .job-header {{ flex-direction: column; }}
            .detalles {{ flex-direction: column; gap: 10px; }}
        }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>💼 Empleos Remotos</h1>
            <p>Automation Process | Argentina / LATAM</p>
            <p style="margin-top: 10px;">Generado: {fecha}</p>
        </div>

        <div class="filters">
            <span class="filter-tag">🔍 Automation Process</span>
            <span class="filter-tag">🌎 Remoto</span>
            <span class="filter-tag">🇦🇷 Argentina / LATAM</span>
        </div>

        <div class="stats">
            <div class="stat">
                <div class="stat-value">{len(empleos)}</div>
                <div class="stat-label">Ofertas encontradas</div>
            </div>
        </div>

        <div class="job-list">
"""

    if empleos:
        for i, emp in enumerate(empleos, 1):
            html += f"""
            <div class="job-card">
                <div class="job-header">
                    <div>
                        <div class="empresa">🏢 {emp['empresa']}</div>
                        <div class="titulo">{emp['titulo']}</div>
                    </div>
                </div>
                <div class="detalles">
                    <span class="detalle">📍 {emp['ubicacion']}</span>
                    <span class="detalle">📅 {emp['fecha']}</span>
                    <span class="detalle">🏷️ {emp['categoria']}</span>
                    <span class="detalle">⏰ {emp['tipo']}</span>
                </div>
                <a href="{emp['url']}" target="_blank" class="btn">Ver oferta →</a>
            </div>
"""
    else:
        html += """
            <div class="no-results">
                <h2>😔 No se encontraron empleos</h2>
                <p>No hay ofertas disponibles con estos filtros en este momento.</p>
                <p>Intenta de nuevo más tarde.</p>
            </div>
"""

    html += """
        </div>

        <div class="footer">
            <p>💼 Datos de Remotive y Arbeitnow</p>
            <p>Búsqueda: Automation Process | Remoto | Argentina/LATAM</p>
            <p>Generado por Chatbot de Oportunidades</p>
        </div>
    </div>
</body>
</html>
"""

    # Guardar archivo
    crear_carpeta_reportes()
    filename = f"empleos_remotos_{fecha_archivo}.html"
    filepath = os.path.join(REPORTES_DIR, filename)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html)

    return filepath


# ============================================
# FUNCIONES DEL CHATBOT
# ============================================

def procesar_mercado_financiero():
    """Procesa y genera reporte del mercado financiero"""
    datos = obtener_datos_mercado()

    oportunidades = [d for d in datos if d['es_oportunidad']]
    print(f"\n📊 Se analizaron {len(datos)} activos")
    print(f"🔥 Se encontraron {len(oportunidades)} oportunidades (cambio > 2%)")

    for op in oportunidades:
        signo = "+" if op['cambio'] > 0 else ""
        print(f"  {op['tipo']} {op['simbolo']}: ${op['precio']:.2f} ({signo}{op['cambio']:.2f}%)")

    print("\n📄 Generando reporte...")
    filepath = generar_html_financiero(datos)

    print(f"✅ ¡Reporte generado!")
    print(f"📁 Archivo: {filepath}")

    abrir = input("\n¿Abrir en el navegador? (s/n): ").strip().lower()
    if abrir == 's':
        webbrowser.open(f'file://{filepath}')


def procesar_mercado_laboral():
    """Procesa y genera reporte del mercado laboral"""
    empleos = buscar_empleos_remoto_argentina()

    print(f"\n💼 Se encontraron {len(empleos)} ofertas de trabajo")

    for emp in empleos[:5]:
        print(f"  🏢 {emp['empresa']}: {emp['titulo']}")

    if len(empleos) > 5:
        print(f"  ... y {len(empleos) - 5} más")

    print("\n📄 Generando reporte...")
    filepath = generar_html_laboral(empleos)

    print(f"✅ ¡Reporte generado!")
    print(f"📁 Archivo: {filepath}")

    abrir = input("\n¿Abrir en el navegador? (s/n): ").strip().lower()
    if abrir == 's':
        webbrowser.open(f'file://{filepath}')


def procesar_palabra_magica():
    """Procesa la palabra mágica 'mercado' - función secreta"""
    print("\n🔮 ¡Has descubierto la función secreta!")
    print("=" * 50)
    print("\n¿Qué tipo de mercado te interesa?")
    print("  1. Financiero (acciones, crypto, índices)")
    print("  2. Laboral (empleos remotos Argentina)")

    opcion = input("\nElige (1 o 2): ").strip()

    if opcion == '1' or 'financiero' in opcion.lower():
        procesar_mercado_financiero()
    elif opcion == '2' or 'laboral' in opcion.lower():
        procesar_mercado_laboral()
    else:
        print("❌ Opción no válida. Escribe 1 o 2.")


# Respuestas del chatbot (sin mencionar 'mercado')
RESPUESTAS = {
    'hola': '¡Hola! 👋 Soy tu asistente. Puedo ayudarte con información general. ¿En qué puedo ayudarte?',
    'ayuda': '🆘 Puedo responder preguntas sobre el clima, noticias, o simplemente charlar. ¿Qué necesitas?',
    'clima': '🌤️ Para el clima te recomiendo revisar tu app del tiempo favorita.',
    'gracias': '¡De nada! 😊 ¿Hay algo más en lo que pueda ayudarte?',
    'adios': '¡Hasta luego! 👋 Fue un placer ayudarte.',
    'chau': '¡Chau! 👋 ¡Que tengas un excelente día!',
    'quien eres': '🤖 Soy un chatbot asistente. Estoy aquí para ayudarte con lo que necesites.',
    'que haces': '💬 Puedo responder preguntas y charlar contigo. ¿Qué te gustaría saber?',
}


def obtener_respuesta(mensaje):
    """Obtiene respuesta del chatbot"""
    mensaje_lower = mensaje.lower().strip()

    # Palabra mágica secreta (no se muestra en opciones)
    if mensaje_lower == 'mercado':
        return None  # Señal para activar función secreta

    for keyword, respuesta in RESPUESTAS.items():
        if keyword in mensaje_lower:
            return respuesta

    return "🤔 No estoy seguro de cómo ayudarte con eso. Prueba preguntarme otra cosa."


def main():
    """Loop principal del chatbot"""
    print("=" * 50)
    print("🤖 CHATBOT ASISTENTE")
    print("=" * 50)
    print("Escribe 'salir' para terminar\n")

    while True:
        try:
            mensaje = input("Tú: ").strip()

            if not mensaje:
                continue

            if mensaje.lower() in ['salir', 'exit', 'quit']:
                print("Bot: ¡Hasta luego! 👋")
                break

            respuesta = obtener_respuesta(mensaje)

            if respuesta is None:
                # Palabra mágica detectada
                procesar_palabra_magica()
            else:
                print(f"Bot: {respuesta}")

            print()

        except KeyboardInterrupt:
            print("\n\nBot: ¡Hasta luego! 👋")
            break


if __name__ == "__main__":
    main()
