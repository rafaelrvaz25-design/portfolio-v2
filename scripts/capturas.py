# Capturas e verificações no browser das cinco páginas, servidas a partir de out/.
#   python3 scripts/capturas.py <pasta-de-saída> [--motion]
# Sem --motion: "reduzir movimento" ligado, para capturas comparáveis (o hero e o 3D ficam fixos).
# Com --motion: animações ligadas, para verificar que correm (capturas não comparáveis ao píxel).
# Para cada página e cada ecrã (desktop 1440x900, mobile 390x844): percorre a página com scroll,
# regista erros de consola, pedidos falhados e imagens que não carregaram, e guarda capturas
# do ecrã em 5 posições + página inteira. Escreve relatorio.json na pasta de saída.
import json, sys, os, threading, functools, http.server, socketserver
from playwright.sync_api import sync_playwright

OUT_DIR = sys.argv[1]
MOTION = '--motion' in sys.argv
ROOT = os.path.join(os.getcwd(), 'out')
PORT = 4810 if not MOTION else 4811
PAGES = ['/', '/projetos/design-system-fpf/', '/projetos/rrs-pingo-doce/',
         '/projetos/monday-talent-pool/', '/projetos/gallo/']
VIEWPORTS = {'desktop': (1440, 900), 'mobile': (390, 844)}

class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass

handler = functools.partial(Quiet, directory=ROOT)
socketserver.TCPServer.allow_reuse_address = True
httpd = socketserver.TCPServer(('127.0.0.1', PORT), handler)
threading.Thread(target=httpd.serve_forever, daemon=True).start()

os.makedirs(OUT_DIR, exist_ok=True)
report = {}
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'])
    for vname, (w, h) in VIEWPORTS.items():
        ctx = browser.new_context(viewport={'width': w, 'height': h}, device_scale_factor=1,
                                  reduced_motion='no-preference' if MOTION else 'reduce')
        for path in PAGES:
            page = ctx.new_page()
            errors, failed = [], []
            page.on('console', lambda m: errors.append(m.text) if m.type == 'error' else None)
            page.on('pageerror', lambda e: errors.append(str(e)))
            page.on('requestfailed', lambda r: failed.append(r.url))
            page.on('response', lambda r: failed.append(f'{r.status} {r.url}') if r.status >= 400 else None)
            page.goto(f'http://127.0.0.1:{PORT}{path}', wait_until='networkidle')
            page.wait_for_timeout(1500)
            total = page.evaluate('document.documentElement.scrollHeight')
            # percorre a página para carregar as imagens lazy e acionar as animações de scroll
            y = 0
            while y < total:
                y += h // 2
                page.mouse.wheel(0, h // 2)
                page.wait_for_timeout(120)
                total = page.evaluate('document.documentElement.scrollHeight')
            page.wait_for_timeout(800)
            info = page.evaluate('''() => ({
                title: document.title,
                robots: document.querySelector('meta[name=robots]')?.content || null,
                h1: document.querySelector('h1')?.getAttribute('aria-label') || document.querySelector('h1')?.innerText,
                readTime: document.querySelector('[class*=readTime]')?.innerText || null,
                brokenImages: [...document.images].filter(i => i.complete && i.naturalWidth === 0).map(i => i.currentSrc || i.src),
                images: [...document.images].map(i => i.currentSrc || i.src),
                links: [...new Set([...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')))],
                canvas: !!document.querySelector('canvas'),
                scrollHeight: document.documentElement.scrollHeight,
            })''')
            slug = (path.strip('/').split('/')[-1] or 'home')
            shots = []
            for i, frac in enumerate([0, .25, .5, .75, 1]):
                target = int((info['scrollHeight'] - h) * frac)
                page.evaluate(f'window.scrollTo(0, {target})')
                page.wait_for_timeout(700)
                f = f'{vname}-{slug}-pos{i}.png'
                page.screenshot(path=os.path.join(OUT_DIR, f))
                shots.append(f)
            page.evaluate('window.scrollTo(0, 0)')
            page.wait_for_timeout(700)
            if not MOTION:
                f = f'{vname}-{slug}-inteira.png'
                page.screenshot(path=os.path.join(OUT_DIR, f), full_page=True)
                shots.append(f)
            info.update(errors=errors, failed=failed, shots=shots)
            report[f'{vname} {path}'] = info
            page.close()
        ctx.close()
    browser.close()
httpd.shutdown()
json.dump(report, open(os.path.join(OUT_DIR, 'relatorio.json'), 'w'), indent=1, ensure_ascii=False)
for k, v in report.items():
    print(k, '| erros', len(v['errors']), '| falhas', len(v['failed']), '| imagens partidas', len(v['brokenImages']),
          '| imgs', len(v['images']), '| leitura', v['readTime'], '| robots', v['robots'], '| canvas', v['canvas'])
