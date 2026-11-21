// ===============================
// MENU MOBILE
// ===============================

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('active');

  menuToggle.setAttribute('aria-expanded', isOpen);
  menuToggle.textContent = isOpen ? '✕' : '☰';
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    menuToggle.textContent = '☰';
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===============================
// ANIMATIONS AU SCROLL
// ===============================

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

document.querySelectorAll('.reveal, .skill-card').forEach(el => {
  revealObserver.observe(el);
});

// ===============================
// BARRE DE PROGRESSION
// ===============================

const progressBar = document.querySelector('.scroll-progress');

let scrollScheduled = false;

window.addEventListener('scroll', () => {
  if (scrollScheduled) return;

  scrollScheduled = true;

  requestAnimationFrame(() => {
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress = maxScroll > 0
      ? window.scrollY / maxScroll * 100
      : 0;

    progressBar.style.width = `${progress}%`;
    scrollScheduled = false;
  });
}, { passive: true });

// ===============================
// CURSEUR PERSONNALISÉ
// ===============================

const cursor = document.querySelector('.custom-cursor');
const follower = document.querySelector('.cursor-follower');

const canUseCustomCursor =
  window.matchMedia('(pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (canUseCustomCursor) {
  let mouseX = 0;
  let mouseY = 0;
  let followerX = 0;
  let followerY = 0;

  document.addEventListener('mousemove', event => {
    mouseX = event.clientX;
    mouseY = event.clientY;

    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
  }, { passive: true });

  let cursorRunning = true;

  function animateCursor() {
    if (!cursorRunning) return;

    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;

    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;

    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  document.querySelectorAll('a, button, .skill-card')
    .forEach(element => {
      element.addEventListener('mouseenter', () => {
        follower.classList.add('hover');
      });

      element.addEventListener('mouseleave', () => {
        follower.classList.remove('hover');
      });
    });

  document.addEventListener('visibilitychange', () => {
    cursorRunning = !document.hidden;

    if (cursorRunning) animateCursor();
  });
}

// ===============================
// EFFET 3D SUR LES PROJETS
// ===============================

const supportsHover =
  window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (supportsHover && canUseCustomCursor) {
  document.querySelectorAll('.project-card').forEach(card => {

    card.addEventListener('mousemove', event => {
      const rect = card.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      const rotateY = (x - 0.5) * 8;
      const rotateX = (0.5 - y) * 8;

      card.style.transform =
        `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });

  });
}

// ===============================
// ANNÉE AUTOMATIQUE
// ===============================

const footerText = document.querySelector('footer p');

if (footerText) {
  footerText.textContent =
    `© ${new Date().getFullYear()} — Crafted with passion.`;
}
