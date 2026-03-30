/* ============================================================
   JMM Propaganda — script.js
   ============================================================ */

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ---- Hamburger menu ----
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('mobile-open');
});
// Close on link click
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('mobile-open');
  });
});

// ---- FAQ accordion ----
function toggleFaq(id) {
  const item = document.getElementById(id);
  const btn  = item.querySelector('.faq-question');
  const isOpen = item.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-item').forEach(el => {
    el.classList.remove('open');
    el.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
  });

  // Open clicked (if it was closed)
  if (!isOpen) {
    item.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
  }
}

// ---- Scroll reveal ----
const revealElements = document.querySelectorAll('.service-card, .step, .gallery-item, .faq-item, .feature-item, .pain-item, .about-text, .about-image, .pain-text, .pain-image, .gallery-testimonial');

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, entry.target.dataset.delay || 0);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

// Stagger siblings
document.querySelectorAll('.services-grid, .how-steps, .gallery-grid, .faq-grid, .pain-list, .about-features').forEach(parent => {
  parent.querySelectorAll('.reveal').forEach((el, i) => {
    el.dataset.delay = i * 80;
  });
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ---- Smooth anchor scroll with offset ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---- Mobile nav styles injected via JS ----
const mobileStyle = document.createElement('style');
mobileStyle.textContent = `
  @media (max-width: 768px) {
    .nav-links {
      position: fixed;
      top: 0; right: -100%;
      height: 100vh;
      width: 280px;
      background: #0d0d0d;
      border-left: 1px solid rgba(255,255,255,0.08);
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      gap: 32px;
      padding: 40px 32px;
      transition: right 0.35s ease;
      z-index: 999;
    }
    .nav-links.mobile-open { right: 0; }
    .nav-links a { font-size: 1.1rem; color: #f0f0f0; }
    .hamburger { display: flex; z-index: 1001; }
  }
`;
document.head.appendChild(mobileStyle);
