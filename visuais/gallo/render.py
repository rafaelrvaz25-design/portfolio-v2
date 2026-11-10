# Exporta cada composição a 2x: desktop (1600 px) e mobile (800 px, sufixo -mobile).
# Uso: python3 render.py 01-identidade [02-processo ...]   (sem argumentos: todas)
import sys, glob, os
from playwright.sync_api import sync_playwright
from PIL import Image
OUT = '../../public/images/gallo'; os.makedirs(OUT, exist_ok=True)
names = sys.argv[1:] or sorted(os.path.splitext(f)[0] for f in glob.glob('[0-9]*.html'))
with sync_playwright() as p:
    b = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--allow-file-access-from-files'])
    for n in names:
        html = os.path.abspath(n + '.html')
        modes = [('', 1600, '')]
        if 'no-mobile' not in open(html).read(): modes.append(('-mobile', 800, 'm'))
        for suf, w, cls in modes:
            pg = b.new_page(viewport={'width': w, 'height': 900}, device_scale_factor=2)
            pg.goto('file://' + html)
            pg.evaluate(f"document.body.className='{cls}';document.documentElement.style.setProperty('--W','{w}px')")
            pg.wait_for_load_state('networkidle'); pg.evaluate('document.fonts.ready'); pg.wait_for_timeout(300)
            png = f'/tmp/claude-0/-home-claude/5e9ff47b-7b37-56a9-8586-bbe69056118a/scratchpad/gallo/{n}{suf}.png'
            pg.locator('#fig').screenshot(path=png, omit_background=True)
            im = Image.open(png); im.save(f'{OUT}/{n}{suf}.webp', 'WEBP', quality=88, method=6)
            print(n + suf, im.size); pg.close()
    b.close()
