/* Artists page only — five-image cinematic hero slider */
(() => {
  const slider = document.querySelector('[data-page-hero-slider]');
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll('.page-hero-slide'));
  if (slides.length < 2) return;

  let index = Math.max(0, slides.findIndex((slide) => slide.classList.contains('active')));
  let timer = null;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const show = (nextIndex) => {
    index = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
  };

  const stop = () => {
    if (timer) window.clearInterval(timer);
    timer = null;
  };

  const start = () => {
    stop();
    if (reducedMotion.matches || document.hidden) return;
    timer = window.setInterval(() => show(index + 1), 5000);
  };

  show(index);
  start();
  document.addEventListener('visibilitychange', start);
  reducedMotion.addEventListener?.('change', start);
})();
