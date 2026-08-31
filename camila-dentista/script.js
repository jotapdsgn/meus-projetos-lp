/**
 * ESTÚDIO ORAL ODONTOLOGIA ESPECIALIZADA - DRA. CAMILA CRISTINA
 * JavaScript Interativo & Otimização Mobile
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Menu Mobile Drawer
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileNavPanel = document.getElementById('mobile-nav-panel');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (mobileMenuToggle && mobileNavPanel) {
    const toggleMenu = (state) => {
      const isExpanded = state !== undefined ? state : mobileMenuToggle.getAttribute('aria-expanded') !== 'true';
      mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
      mobileMenuToggle.classList.toggle('active', isExpanded);
      mobileNavPanel.classList.toggle('open', isExpanded);
    };

    mobileMenuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggleMenu(false);
      });
    });

    // Fechar ao clicar fora no mobile
    document.addEventListener('click', (e) => {
      if (!mobileNavPanel.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        toggleMenu(false);
      }
    });
  }

  // 2. Header Scroll Effect & Active Link Spy
  const siteHeader = document.getElementById('site-header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    if (siteHeader) {
      if (scrollY > 40) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { passive: true });

  // 3. Scroll Reveal com Intersection Observer
  const revealElements = document.querySelectorAll('[data-reveal]');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute('data-delay') || 0;
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // 4. FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      const isActive = faqItem.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        faqItem.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // 5. Contador de Estatísticas
  const statNumbers = document.querySelectorAll('.stat-num');
  let animated = false;

  const countUpObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target'), 10);
          const duration = 1600;
          const stepTime = 20;
          const totalSteps = duration / stepTime;
          const increment = target / totalSteps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              stat.textContent = target >= 1000 ? `${(target / 1000).toFixed(1).replace('.0', '')}k` : target;
              clearInterval(timer);
            } else {
              stat.textContent = Math.floor(current);
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsContainer = document.querySelector('.about-stats-grid');
  if (statsContainer) {
    countUpObserver.observe(statsContainer);
  }

  // 6. Formulário de Agendamento no WhatsApp
  const appointmentForm = document.getElementById('appointment-form');

  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const treatment = document.getElementById('treatment-select').value;
      const patientName = document.getElementById('patient-name').value.trim();
      const period = document.getElementById('preferred-period').value;

      if (!patientName) {
        alert('Por favor, informe seu nome.');
        return;
      }

      const message = `Olá, Dra. Camila! Meu nome é *${patientName}*.\n\n` +
                      `Gostaria de agendar uma consulta no *Estúdio Oral* para o seguinte tratamento:\n` +
                      `🦷 *Tratamento de Interesse:* ${treatment}\n` +
                      `⏰ *Preferência de Horário:* ${period}\n\n` +
                      `Poderiam me informar os próximos horários disponíveis? Obrigado(a)!`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/5537998330362?text=${encodedMessage}`;

      window.open(whatsappUrl, '_blank');
    });
  }

  // 7. Fechar balão do WhatsApp flutuante
  const badgeCloseBtn = document.getElementById('badge-close-btn');
  const whatsappBadgeMsg = document.getElementById('whatsapp-badge-msg');

  if (badgeCloseBtn && whatsappBadgeMsg) {
    badgeCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      whatsappBadgeMsg.style.display = 'none';
    });
  }
});
