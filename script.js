// Header scroll
const header = document.getElementById('header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// Hero slideshow
const heroSlides = document.querySelectorAll('.hero-slideshow .hero-bg');
if (heroSlides.length > 1) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let currentHeroSlide = 0;

  const showHeroSlide = (index) => {
    heroSlides.forEach((slide, slideIndex) => {
      slide.classList.toggle('is-active', slideIndex === index);
    });
  };

  showHeroSlide(currentHeroSlide);

  if (!prefersReducedMotion) {
    window.setInterval(() => {
      currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
      showHeroSlide(currentHeroSlide);
    }, 5200);
  }
}

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
if (hamburger && nav && header) {
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    nav.classList.toggle('active', isOpen);
    header.classList.toggle('nav-open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      nav.classList.remove('active');
      header.classList.remove('nav-open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });
reveals.forEach(el => revealObserver.observe(el));

// Gallery carousel
const track = document.getElementById('galleryTrack');
const dotsContainer = document.getElementById('galleryDots');
const prevBtn = document.getElementById('galleryPrev');
const nextBtn = document.getElementById('galleryNext');
if (track) {
  const slides = track.querySelectorAll('.slide');
  let current = 0;
  const getVisible = () => window.innerWidth <= 768 ? 1 : 3;
  let visible = getVisible();
  let maxIndex = Math.max(0, slides.length - visible);
  let dots = [];

  function buildDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    dots = [];
    visible = getVisible();
    maxIndex = Math.max(0, slides.length - visible);
    const numDots = maxIndex + 1;
    for (let i = 0; i < numDots; i++) {
      const dot = document.createElement('button');
      dot.classList.add('gallery-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
      dots.push(dot);
    }
  }

  function goTo(index) {
    current = Math.max(0, Math.min(index, maxIndex));
    const slideWidth = slides[0] ? slides[0].offsetWidth : 0;
    track.style.transform = `translateX(-${current * slideWidth}px)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
  }

  buildDots();
  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));
  window.addEventListener('resize', () => { buildDots(); goTo(0); });
}
