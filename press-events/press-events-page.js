/* Press / Events page — five-image hero slider only. */
(() => {
  const slider = document.querySelector('[data-press-hero-slider]');
  if (!slider) return;
  const slides = [...slider.querySelectorAll('.press-hero-slide')];
  if (slides.length < 2) return;
  let index = 0;
  let timer;
  let firstRun = true;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const show = (next) => {
    index = (next + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
  };
  const start = () => {
    clearTimeout(timer);
    if (reduced.matches) return;
    const delay = firstRun ? 6800 : 5400;
    timer = setTimeout(() => {
      firstRun = false;
      show(index + 1);
      start();
    }, delay);
  };
  show(0);
  start();
  document.addEventListener('visibilitychange', () => document.hidden ? clearTimeout(timer) : start());
})();
