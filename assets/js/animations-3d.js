/**
 * Dairy Pure & Organic (DPO) - 3D & Dynamic Animation Engine
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    init3DTiltCards();
    initScroll3DReveal();
    initHero3DCanvas();
    initAnimatedCounters();
    initButtonRipples();
    initHoloGoldCard();
  });

  // ==========================================
  // 1. Interactive 3D Card Tilt with Specular Glare
  // ==========================================
  function init3DTiltCards() {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return; // Disable heavy tilt on touch devices for battery efficiency

    const tiltElements = document.querySelectorAll(`
      .product-card,
      .feature-card,
      .stat-item,
      .membership-card-visual,
      .process-card,
      .testimonial-card,
      .benefit-card,
      .tilt-card-3d
    `);

    tiltElements.forEach(card => {
      // Add glare element if not already present
      if (!card.querySelector('.glare-effect')) {
        const glare = document.createElement('div');
        glare.className = 'glare-effect';
        card.appendChild(glare);
      }

      let reqId = null;

      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;

        const rotateX = -deltaY * 10; // Max 10 deg tilt
        const rotateY = deltaX * 10;

        card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
        card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);

        if (reqId) cancelAnimationFrame(reqId);
        reqId = requestAnimationFrame(() => {
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.025, 1.025, 1.025)`;
        });
      });

      card.addEventListener('mouseleave', () => {
        if (reqId) cancelAnimationFrame(reqId);
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  }

  // ==========================================
  // 2. 3D Scroll Reveal Animations
  // ==========================================
  function initScroll3DReveal() {
    // Automatically apply 3d reveal to common sections
    const autoRevealSelectors = [
      '.feature-card',
      '.product-card',
      '.stat-item',
      '.process-card',
      '.testimonial-card',
      '.benefit-card',
      '.faq-item',
      '.section-header-wrap',
      '.membership-highlight'
    ];

    autoRevealSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach((el, idx) => {
        if (!el.hasAttribute('data-reveal-3d')) {
          el.setAttribute('data-reveal-3d', '');
          el.classList.add(`stagger-${(idx % 4) + 1}`);
        }
      });
    });

    const revealElements = document.querySelectorAll('[data-reveal-3d], [data-reveal-left], [data-reveal-right]');

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed-3d');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  }

  // ==========================================
  // 3. Hero 3D Particle & Droplet Canvas
  // ==========================================
  function initHero3DCanvas() {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;

    let canvas = hero.querySelector('.hero-3d-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.className = 'hero-3d-canvas';
      hero.insertBefore(canvas, hero.firstChild);
    }

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const particleCount = window.innerWidth < 768 ? 16 : 32;

    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    function resize() {
      width = canvas.width = hero.offsetWidth;
      height = canvas.height = hero.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    hero.addEventListener('mousemove', e => {
      const rect = hero.getBoundingClientRect();
      mouse.targetX = (e.clientX - rect.left - width / 2) * 0.05;
      mouse.targetY = (e.clientY - rect.top - height / 2) * 0.05;
    });

    // Particle Object
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.z = Math.random() * 0.8 + 0.2; // 3D depth layer
        this.radius = (Math.random() * 4 + 2) * this.z;
        this.vx = (Math.random() - 0.5) * 0.4 * this.z;
        this.vy = -(Math.random() * 0.5 + 0.2) * this.z;
        this.alpha = Math.random() * 0.5 + 0.2;
        this.hue = Math.random() > 0.4 ? '120, 80%, 45%' : '205, 90%, 55%'; // Green / Blue
      }

      update() {
        this.x += this.vx + (mouse.x * this.z * 0.02);
        this.y += this.vy + (mouse.y * this.z * 0.02);

        if (this.y < -10) this.y = height + 10;
        if (this.x < -10) this.x = width + 10;
        if (this.x > width + 10) this.x = -10;
      }

      draw() {
        ctx.beginPath();
        const grad = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius * 2
        );
        grad.addColorStop(0, `hsla(${this.hue}, ${this.alpha})`);
        grad.addColorStop(1, `hsla(${this.hue}, 0)`);
        ctx.fillStyle = grad;
        ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animate);
    }

    animate();
  }

  // ==========================================
  // 4. Animated Statistics Counters
  // ==========================================
  function initAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-number, .stat-value, [data-counter]');

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          animateValue(el);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));

    function animateValue(obj) {
      const originalText = obj.innerText.trim();
      const match = originalText.match(/(\d+)/);
      if (!match) return;

      const target = parseInt(match[0], 10);
      const prefix = originalText.split(match[0])[0] || '';
      const suffix = originalText.split(match[0])[1] || '';

      const duration = 1800;
      const start = 0;
      let startTimestamp = null;

      const step = timestamp => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        const current = Math.floor(easeProgress * (target - start) + start);

        obj.innerText = `${prefix}${current}${suffix}`;

        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          obj.innerText = originalText;
        }
      };

      window.requestAnimationFrame(step);
    }
  }

  // ==========================================
  // 5. Button Click Dynamic Ripple
  // ==========================================
  function initButtonRipples() {
    document.addEventListener('click', e => {
      const btn = e.target.closest('.btn');
      if (!btn) return;

      const circle = document.createElement('span');
      const diameter = Math.max(btn.clientWidth, btn.clientHeight);
      const radius = diameter / 2;

      const rect = btn.getBoundingClientRect();
      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.classList.add('ripple-wave');

      const existing = btn.querySelector('.ripple-wave');
      if (existing) existing.remove();

      btn.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
    });
  }

  // ==========================================
  // 6. Holographic Card Dynamic Parallax Follow
  // ==========================================
  function initHoloGoldCard() {
    const goldCards = document.querySelectorAll('.holo-gold-card, .membership-card-visual');
    goldCards.forEach(card => {
      card.classList.add('holo-gold-card');
    });
  }

})();
