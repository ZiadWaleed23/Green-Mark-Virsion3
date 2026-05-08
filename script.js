// ---- Preloader ----
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
    setTimeout(() => preloader.style.display = 'none', 700);
  }, 1800);
});

// ---- Hamburger / Mobile Nav ----
const hamburger = document.getElementById('hamburger');
const navbar    = document.querySelector('.navbar');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navbar.classList.toggle('active');
});

// Close nav on link click
document.querySelectorAll('.navbar .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navbar.classList.remove('active');
  });
});

// Close nav on scroll
window.addEventListener('scroll', () => {
  hamburger.classList.remove('open');
  navbar.classList.remove('active');
});

// ---- Header scroll style ----
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
});

// ---- Active Nav Link on Scroll ----
const sections  = document.querySelectorAll('section, .home');
const navLinks  = document.querySelectorAll('header .navbar .nav-link');

const observerOptions = {
  root: null,
  rootMargin: '-40% 0px -40% 0px',
  threshold: 0
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active-link', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, observerOptions);

sections.forEach(s => observer.observe(s));

// ---- Scroll To Top Button ----
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
  const shouldShow = window.scrollY > 350;
  scrollTopBtn.style.display = shouldShow ? 'flex' : 'none';
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---- Reveal on scroll (fade-in) ----
const revealElements = document.querySelectorAll(
  '.service-card, .contact-card, .about-inner, .stat-item, .about-badge'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = `fadeUp 0.6s ${i * 0.1}s ease both`;
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => {
  el.style.opacity = '0';
  revealObserver.observe(el);
});

// Inject keyframe into page
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

// ---- Services Slider ----
(function () {
  const track   = document.getElementById('servicesTrack');
  const prevBtn = document.getElementById('servicesPrev');
  const nextBtn = document.getElementById('servicesNext');
  const dots    = document.querySelectorAll('.services-dot');

  if (!track || !prevBtn || !nextBtn) return;

  const cards = track.querySelectorAll('.service-card');
  let current = 0;

  function getVisibleCount() {
    if (window.innerWidth <= 768)  return 1;
    if (window.innerWidth <= 1100) return 2;
    return 3;
  }

  function maxIndex() {
    return Math.max(0, cards.length - getVisibleCount());
  }

  function goTo(index) {
    const vis = getVisibleCount();
    current = Math.max(0, Math.min(index, maxIndex()));

    // Card width + gap
    const cardEl   = cards[0];
    const gap      = parseFloat(getComputedStyle(track).gap) || 24;
    const cardW    = cardEl.getBoundingClientRect().width;
    const shift    = current * (cardW + gap);

    track.style.transform = `translateX(-${shift}px)`;

    // Arrows state
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current >= maxIndex();

    // Dots
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));
  dots.forEach(d => d.addEventListener('click', () => goTo(+d.dataset.index)));

  window.addEventListener('resize', () => goTo(current));

  goTo(0);
})();
var swiper = new Swiper(".home-slid", {
  loop: true,
  effect: "fade",
  fadeEffect: { crossFade: true },
  speed: 1000,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
