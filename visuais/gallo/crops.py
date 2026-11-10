# Recortes dos exports do Figma (a 2x) usados nas composições do case study Gallo.
import sys, os
from PIL import Image
Image.MAX_IMAGE_PIXELS = None
SRC = sys.argv[1]; OUT = 'crops'
def o(n): return Image.open(os.path.join(SRC, n)).convert('RGB')
D = {'hero':(88,1048),'lenda':(1048,1744),'evo':(1744,2718),'sol':(2718,3528),'nova':(3528,4632),'emb':(4632,5472),'fecho':(5472,6097)}
M = {'hero':(64,864),'lenda':(864,1472),'evo':(1472,2332),'sol':(2332,2892),'nova':(2892,3687),'emb':(3687,4681),'fecho':(4681,5111)}
for mk in ['br','pt']:
    d = o(f'{mk}-desktop.png'); m = o(f'{mk}-mobile.png')
    for k,(a,b) in D.items(): d.crop((0,a*2,2880,b*2)).save(f'{OUT}/{mk}-d-{k}.jpg', quality=92)
    for k,(a,b) in M.items(): m.crop((0,a*2,780,b*2)).save(f'{OUT}/{mk}-m-{k}.jpg', quality=92)
    d.crop((0,0,2880,1048*2)).save(f'{OUT}/{mk}-d-top.jpg', quality=92)   # header + hero
    m.crop((0,0,780,844*2)).save(f'{OUT}/{mk}-m-top.jpg', quality=92)     # primeiro ecrã mobile
    d.save(f'{OUT}/{mk}-d-full.jpg', quality=90); m.save(f'{OUT}/{mk}-m-full.jpg', quality=90)
for n in ['tl-carrossel','tl-prateleira','tl-lineup','tl-opB','tl-opC','zoom1','zoom2','zoom3','hifi-v1','hifi-v2','hifi-v3-literal','wireframe']:
    o(n+'.png').save(f'{OUT}/{n}.jpg', quality=92)
f = o('fundacoes.png'); w,h = f.size
f.crop((w//2+int(w*0.015),0,w,h)).save(f'{OUT}/fundacoes-br.jpg', quality=92)
f.crop((0,0,w//2,h)).save(f'{OUT}/fundacoes-pt.jpg', quality=92)
print('ok')
