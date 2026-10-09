// Interações do remake: entrada suave das secções, barra de progresso de leitura
// (como no site Webflow original) e menu em telemóvel.
document.documentElement.classList.remove('no-js');

// Entrada suave
const io = 'IntersectionObserver' in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' })
  : null;
document.querySelectorAll('.reveal').forEach((el) => (io ? io.observe(el) : el.classList.add('is-in')));

// Barra de progresso
const bar = document.querySelector('.scrollbar');
if (bar) {
  const update = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  };
  addEventListener('scroll', update, { passive: true });
  addEventListener('resize', update);
  update();
}

// Menu em telemóvel
const button = document.querySelector('.menu-button');
const menu = document.getElementById('menu');
if (button && menu) {
  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!open));
    menu.classList.toggle('open', !open);
  });
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
    button.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
  }));
}
