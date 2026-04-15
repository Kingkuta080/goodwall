// NAV
const burger = document.getElementById('burger');
const drawer = document.getElementById('drawer');

function toggleMenu(force) {
  const isOpen = force !== undefined ? force : !drawer.classList.contains('open');
  drawer.classList.toggle('open', isOpen);
  burger.classList.toggle('open', isOpen);
  burger.setAttribute('aria-expanded', isOpen);
  drawer.setAttribute('aria-hidden', !isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

burger.addEventListener('click', (event) => {
  event.stopPropagation();
  toggleMenu();
});

document.addEventListener('click', (event) => {
  if (drawer.classList.contains('open') && !drawer.contains(event.target) && !burger.contains(event.target)) {
    toggleMenu(false);
  }
});

drawer.querySelectorAll('.nav__link').forEach((link) => {
  link.addEventListener('click', () => toggleMenu(false));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    toggleMenu(false);
  }
});

// STICKY NAV
const nav = document.getElementById('nav');
window.addEventListener(
  'scroll',
  () => nav.classList.toggle('scrolled', window.scrollY > 40),
  { passive: true }
);

// COUNT UP
function countUp(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  let start = null;

  const step = (timestamp) => {
    if (!start) {
      start = timestamp;
    }
    const progress = Math.min((timestamp - start) / duration, 1);
    const easing = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(easing * target);
    el.textContent = value >= 1000 ? value.toLocaleString() + suffix : value + suffix;
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
}

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('[data-target]').forEach((el) => countObserver.observe(el));

// REVEAL
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// FOOTER YEAR
const currentDate = new Date();
const footerYear = document.getElementById('footer-year');
if (footerYear) {
  footerYear.textContent = currentDate.getFullYear();
}
