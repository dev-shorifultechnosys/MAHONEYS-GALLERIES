/* Mahoneys Galleries — lightweight interactions */
(() => {
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('[data-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const syncHeader = () => header?.classList.toggle('scrolled', window.scrollY > 36 || document.body.classList.contains('menu-open'));
  syncHeader(); window.addEventListener('scroll', syncHeader, {passive:true});

  const closeMenu = () => { document.body.classList.remove('menu-open'); mobileMenu?.classList.remove('open'); menuButton?.setAttribute('aria-expanded','false'); syncHeader(); };
  menuButton?.addEventListener('click', () => { const opening=!mobileMenu.classList.contains('open'); document.body.classList.toggle('menu-open',opening); mobileMenu.classList.toggle('open',opening); menuButton.setAttribute('aria-expanded',String(opening)); syncHeader(); });
  mobileMenu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));

  // Five-image cinematic home hero with manual progress controls.
  const slider = document.querySelector('[data-hero-slider]');
  if (slider) {
    const slides=[...slider.querySelectorAll('.hero-slide')]; const dots=[...document.querySelectorAll('[data-hero-dot]')];
    let index=0, timer;
    const show=(next)=>{index=(next+slides.length)%slides.length;slides.forEach((s,i)=>s.classList.toggle('active',i===index));dots.forEach((d,i)=>d.classList.toggle('active',i===index));};
    const start=()=>{clearInterval(timer); if(!matchMedia('(prefers-reduced-motion: reduce)').matches) timer=setInterval(()=>show(index+1),5200);};
    dots.forEach((dot,i)=>dot.addEventListener('click',()=>{show(i);start();})); show(0); start();
    document.addEventListener('visibilitychange',()=>document.hidden?clearInterval(timer):start());
  }




// Home: The Gallery image stack rotates slowly with subtle movement.
const introGallery = document.querySelector('[data-intro-gallery-slider]');
if (introGallery) {
  const slides = [...introGallery.querySelectorAll('.intro-gallery-slide')];
  let iIndex = 0, iTimer;
  const showIntro = (next) => {
    iIndex = (next + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('active', i === iIndex));
  };
  const startIntro = () => {
    clearInterval(iTimer);
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      iTimer = setInterval(() => showIntro(iIndex + 1), 5600);
    }
  };
  showIntro(0); startIntro();
  document.addEventListener('visibilitychange', () => document.hidden ? clearInterval(iTimer) : startIntro());
}

  // Slow, art-first crossfade for the Current Presentation media.
  const presentation=document.querySelector('[data-presentation-slider]');
  if(presentation){
    const slides=[...presentation.querySelectorAll('.presentation-slide')];
    let pIndex=0, pTimer;
    const showPresentation=(next)=>{pIndex=(next+slides.length)%slides.length;slides.forEach((slide,i)=>slide.classList.toggle('active',i===pIndex));const progress=presentation.querySelector('.presentation-progress span');if(progress){progress.style.animation='none';void progress.offsetWidth;progress.style.animation='presentationProgress 5.8s linear infinite';}};
    const startPresentation=()=>{clearInterval(pTimer);if(!matchMedia('(prefers-reduced-motion: reduce)').matches)pTimer=setInterval(()=>showPresentation(pIndex+1),5800);};
    showPresentation(0);startPresentation();
    document.addEventListener('visibilitychange',()=>document.hidden?clearInterval(pTimer):startPresentation());
  }

  const revealItems=document.querySelectorAll('.reveal');
  if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.10});revealItems.forEach(el=>observer.observe(el));}else revealItems.forEach(el=>el.classList.add('visible'));

  const lightbox=document.querySelector('[data-lightbox]'); const lightboxImage=lightbox?.querySelector('img');
  const closeLightbox=()=>{if(!lightbox)return;lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');};
  document.querySelectorAll('[data-zoom]').forEach(trigger=>trigger.addEventListener('click',()=>{const img=trigger.querySelector('img');if(!img||!lightboxImage)return;lightboxImage.src=img.src;lightboxImage.alt=img.alt;lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');lightbox.querySelector('button')?.focus();}));
  lightbox?.querySelector('button')?.addEventListener('click',closeLightbox); lightbox?.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();closeLightbox();}});

  document.querySelectorAll('[data-signup]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();const input=form.querySelector('input');const note=form.parentElement.querySelector('.form-note');if(!input.value||!input.validity.valid){note.textContent='Please enter a valid email address.';input.focus();return;}note.textContent='Thank you — your invitation request has been noted.';form.reset();}));

  const filterButtons=document.querySelectorAll('[data-filter]'); const directoryCards=document.querySelectorAll('[data-medium]');
  filterButtons.forEach(button=>button.addEventListener('click',()=>{const filter=button.dataset.filter;filterButtons.forEach(item=>item.classList.toggle('active',item===button));directoryCards.forEach(card=>{card.hidden=filter!=='all'&&card.dataset.medium!==filter;});}));

  document.querySelector('[data-contact-form]')?.addEventListener('submit',e=>{e.preventDefault();const form=e.currentTarget;const status=form.querySelector('.contact-form-status');if(!form.checkValidity()){status.textContent='Please complete the required fields.';form.reportValidity();return;}status.textContent='Thank you. This demo form is ready to connect to the gallery email or CRM.';form.reset();});
})();
