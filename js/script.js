/**
 * Utility Management Services – script.js
 * Corporate Water & Wastewater Technology Website
 * Vanilla JavaScript – No frameworks, no dependencies
 */

'use strict';

/* ═══════════════════════════════════════════════════════════════════
   1. DOM READY UTILITY
   ════════════════════════════════════════════════════════════════════ */
function onReady(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

onReady(init);

function init() {
  initNavbar();
  initMobileMenu();
  initSmoothScroll();
  initScrollAnimations();
  initProductTabs();
  initVideoSection();
  initHeroVideoTrigger();
  initContactForm();
  initBackToTop();
  initActiveNavLinks();
  setFooterYear();
  initImageFallbacks();
}

/* ═══════════════════════════════════════════════════════════════════
   2. NAVBAR – Scroll Class & Shrink Effect
   ════════════════════════════════════════════════════════════════════ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastScroll = 0;

  function onScroll() {
    const currentScroll = window.scrollY;

    // Add scrolled class for shadow/bg change
    if (currentScroll > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Run once on load
}

/* ═══════════════════════════════════════════════════════════════════
   3. MOBILE MENU – Hamburger Toggle
   ════════════════════════════════════════════════════════════════════ */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  function openMenu() {
    hamburger.classList.add('open');
    mobileMenu.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    if (mobileMenu.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  hamburger.addEventListener('click', toggleMenu);

  // Close on any mobile nav link click
  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close on ESC key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMenu();
      hamburger.focus();
    }
  });

  // Close on outside click (overlay tap)
  document.addEventListener('click', function (e) {
    if (
      mobileMenu.classList.contains('open') &&
      !mobileMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      closeMenu();
    }
  });
}

/* ═══════════════════════════════════════════════════════════════════
   4. SMOOTH SCROLLING
   ════════════════════════════════════════════════════════════════════ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const navbarHeight = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--navbar-height'),
        10
      ) || 72;

      const targetTop = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 16;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });
}

/* ═══════════════════════════════════════════════════════════════════
   5. SCROLL ANIMATIONS – IntersectionObserver
   ════════════════════════════════════════════════════════════════════ */
function initScrollAnimations() {
  // Respect user's reduced-motion preference
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    // Make everything visible immediately
    document.querySelectorAll('.animate-on-scroll').forEach(function (el) {
      el.classList.add('is-visible');
    });
    return;
  }

  if (!('IntersectionObserver' in window)) {
    // Fallback: show all
    document.querySelectorAll('.animate-on-scroll').forEach(function (el) {
      el.classList.add('is-visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = parseInt(el.getAttribute('data-delay') || '0', 10);

          setTimeout(function () {
            el.classList.add('is-visible');
          }, delay);

          observer.unobserve(el);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  document.querySelectorAll('.animate-on-scroll').forEach(function (el) {
    observer.observe(el);
  });
}

/* ═══════════════════════════════════════════════════════════════════
   6. PRODUCT TABS – Domestic / Industrial Toggle
   ════════════════════════════════════════════════════════════════════ */
function initProductTabs() {
  const tabs = document.querySelectorAll('.product-tab');
  if (!tabs.length) return;

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      // Update tab active state
      tabs.forEach(function (t) {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      // Show / hide panels
      const targetTab = tab.getAttribute('data-tab');
      document.querySelectorAll('.product-grid').forEach(function (grid) {
        if (grid.id === 'tab-' + targetTab) {
          grid.classList.remove('hidden');
          // Re-trigger animations for newly visible cards
          grid.querySelectorAll('.animate-on-scroll').forEach(function (el) {
            el.classList.remove('is-visible');
            requestAnimationFrame(function () {
              const delay = parseInt(el.getAttribute('data-delay') || '0', 10);
              setTimeout(function () {
                el.classList.add('is-visible');
              }, delay);
            });
          });
        } else {
          grid.classList.add('hidden');
        }
      });
    });
  });
}

/* ═══════════════════════════════════════════════════════════════════
   7. PROMO VIDEO SECTION – Play / Pause Toggle
   ════════════════════════════════════════════════════════════════════ */
function initVideoSection() {
  const video = document.getElementById('promoVideo');
  const overlay = document.getElementById('videoOverlay');
  const playBtn = document.getElementById('videoPlayBtn');

  if (!video || !overlay || !playBtn) return;

  function playVideo() {
    video.play().catch(function () {
      // Autoplay blocked – user must interact again
    });
    overlay.classList.add('hidden-overlay');
    playBtn.setAttribute('aria-label', 'Pause video');
    playBtn.querySelector('i').className = 'ph ph-pause-circle';
  }

  function pauseVideo() {
    video.pause();
    overlay.classList.remove('hidden-overlay');
    playBtn.setAttribute('aria-label', 'Play video');
    playBtn.querySelector('i').className = 'ph ph-play-circle';
  }

  playBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    if (video.paused) {
      playVideo();
    } else {
      pauseVideo();
    }
  });

  overlay.addEventListener('click', function () {
    if (video.paused) {
      playVideo();
    } else {
      pauseVideo();
    }
  });

  video.addEventListener('ended', function () {
    overlay.classList.remove('hidden-overlay');
    playBtn.setAttribute('aria-label', 'Play video');
    playBtn.querySelector('i').className = 'ph ph-play-circle';
    video.currentTime = 0;
  });

  video.addEventListener('pause', function () {
    if (!video.ended) {
      overlay.classList.remove('hidden-overlay');
      playBtn.querySelector('i').className = 'ph ph-play-circle';
    }
  });

  video.addEventListener('play', function () {
    overlay.classList.add('hidden-overlay');
    playBtn.querySelector('i').className = 'ph ph-pause-circle';
  });

  // Keyboard support
  overlay.addEventListener('keydown', function (e) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (video.paused) playVideo(); else pauseVideo();
    }
  });

  // Show native controls as fallback on mobile
  if ('ontouchstart' in window) {
    video.setAttribute('controls', '');
    overlay.style.display = 'none';
  }
}

/* ═══════════════════════════════════════════════════════════════════
   8. HERO VIDEO TRIGGER – Opens promo video section
   ════════════════════════════════════════════════════════════════════ */
function initHeroVideoTrigger() {
  const trigger = document.getElementById('heroVideoTrigger');
  if (!trigger) return;

  function scrollToVideo() {
    const videoSection = document.getElementById('advertisement');
    if (!videoSection) return;

    const navbarHeight = 72;
    const top = videoSection.getBoundingClientRect().top + window.scrollY - navbarHeight - 16;

    window.scrollTo({ top: top, behavior: 'smooth' });

    // Auto-play after scroll
    setTimeout(function () {
      const video = document.getElementById('promoVideo');
      const overlay = document.getElementById('videoOverlay');
      if (video && video.paused) {
        video.play().catch(function () {});
        if (overlay) overlay.classList.add('hidden-overlay');
      }
    }, 700);
  }

  trigger.addEventListener('click', scrollToVideo);
  trigger.addEventListener('keydown', function (e) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      scrollToVideo();
    }
  });
}

/* ═══════════════════════════════════════════════════════════════════
   9. CONTACT FORM – Validation & WhatsApp Integration
   ════════════════════════════════════════════════════════════════════ */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');
  if (!form) return;

  /* ── Validation helpers ── */
  function getVal(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  function setError(fieldId, errorId, message) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    if (field) field.classList.add('error');
    if (error) error.textContent = message;
    return false;
  }

  function clearError(fieldId, errorId) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    if (field) field.classList.remove('error');
    if (error) error.textContent = '';
  }

  function validateForm() {
    let valid = true;
    clearError('name', 'nameError');
    clearError('phone', 'phoneError');
    clearError('email', 'emailError');
    clearError('service', 'serviceError');

    const name = getVal('name');
    const phone = getVal('phone');
    const email = getVal('email');
    const service = getVal('service');

    if (!name || name.length < 2) {
      setError('name', 'nameError', 'Please enter your full name.');
      valid = false;
    }

    if (!phone) {
      setError('phone', 'phoneError', 'Please enter your phone number.');
      valid = false;
    } else if (!/^[\d\s\+\-\(\)]{7,15}$/.test(phone)) {
      setError('phone', 'phoneError', 'Please enter a valid phone number.');
      valid = false;
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('email', 'emailError', 'Please enter a valid email address.');
      valid = false;
    }

    if (!service) {
      setError('service', 'serviceError', 'Please select a product or service.');
      valid = false;
    }

    return valid;
  }

  /* ── Build WhatsApp message ── */
  function buildWhatsAppMessage() {
    const name    = getVal('name');
    const phone   = getVal('phone');
    const email   = getVal('email');
    const service = getVal('service');
    const message = getVal('message');

    var msg = 'Hello, I found you on your website and would like to enquire:\n\n';
    msg += '• Name: ' + name + '\n';
    msg += '• Phone: ' + phone + '\n';
    if (email) msg += '• Email: ' + email + '\n';
    msg += '• Interested In: ' + service + '\n';
    if (message) msg += '• Message: ' + message + '\n';

    return encodeURIComponent(msg);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!validateForm()) {
      // Focus first error field
      var firstError = form.querySelector('.error');
      if (firstError) firstError.focus();
      return;
    }

    /*
      WHATSAPP INTEGRATION:
      Replace 91XXXXXXXXXX with the actual WhatsApp number (country code + number, no + or spaces).
      Example: 919845000000 for +91 98450 00000
    */
    var waNumber = '91XXXXXXXXXX';
    var waURL = 'https://wa.me/' + waNumber + '?text=' + buildWhatsAppMessage();

    window.open(waURL, '_blank', 'noopener,noreferrer');

    // Show success state
    if (successMsg) {
      form.classList.add('hidden');
      successMsg.classList.remove('hidden');
    }
  });

  // Live inline validation
  ['name', 'phone', 'email', 'service'].forEach(function (fieldId) {
    var field = document.getElementById(fieldId);
    if (!field) return;
    field.addEventListener('blur', function () {
      // Re-validate just this field on blur
      clearError(fieldId, fieldId + 'Error');
      var val = field.value.trim();
      if (fieldId === 'name' && (!val || val.length < 2)) {
        setError('name', 'nameError', 'Please enter your full name.');
      }
      if (fieldId === 'phone' && val && !/^[\d\s\+\-\(\)]{7,15}$/.test(val)) {
        setError('phone', 'phoneError', 'Please enter a valid phone number.');
      }
      if (fieldId === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        setError('email', 'emailError', 'Please enter a valid email address.');
      }
    });
  });
}

/* ═══════════════════════════════════════════════════════════════════
   10. BACK TO TOP BUTTON
   ════════════════════════════════════════════════════════════════════ */
function initBackToTop() {
  var btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ═══════════════════════════════════════════════════════════════════
   11. ACTIVE NAV LINK – Highlight current section
   ════════════════════════════════════════════════════════════════════ */
function initActiveNavLinks() {
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  var navHeight = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--navbar-height'),
    10
  ) || 72;

  function onScroll() {
    var scrollPos = window.scrollY + navHeight + 60;
    var current = '';

    sections.forEach(function (section) {
      if (section.offsetTop <= scrollPos) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ═══════════════════════════════════════════════════════════════════
   12. FOOTER YEAR
   ════════════════════════════════════════════════════════════════════ */
function setFooterYear() {
  var el = document.getElementById('footerYear');
  if (el) el.textContent = new Date().getFullYear();
}

/* ═══════════════════════════════════════════════════════════════════
   13. IMAGE FALLBACKS – Graceful missing image handling
   ════════════════════════════════════════════════════════════════════ */
function initImageFallbacks() {
  document.querySelectorAll('img').forEach(function (img) {
    img.addEventListener('error', function () {
      // Apply a gradient background as placeholder
      this.style.background = 'linear-gradient(135deg, #F1F8FC 0%, #d4e9f4 100%)';
      this.style.minHeight = '120px';
      // Prevent infinite error loops
      this.removeEventListener('error', arguments.callee);
    });
  });

  // Proprietor image – show placeholder icon if image missing
  var proprietorImg = document.querySelector('.proprietor-card__image img');
  if (proprietorImg) {
    proprietorImg.addEventListener('error', function () {
      var overlay = document.querySelector('.proprietor-card__placeholder-overlay');
      if (overlay) {
        this.style.opacity = '0';
        overlay.style.display = 'flex';
      }
    });
  }
}

/* ═══════════════════════════════════════════════════════════════════
   14. PRODUCT ENQUIRY BUTTONS – Track clicks (optional analytics hook)
   ════════════════════════════════════════════════════════════════════ */
document.addEventListener('click', function (e) {
  var btn = e.target.closest('.product-enquire');
  if (!btn) return;
  // Hook for analytics: log which product was enquired
  var productName = btn.closest('.product-card__body')
    ? btn.closest('.product-card__body').querySelector('.product-card__name')
    : null;
  if (productName) {
    console.log('[UMS] Product enquiry clicked:', productName.textContent.trim());
    // Replace with: gtag('event', 'enquiry_click', { product: productName.textContent });
  }
});
