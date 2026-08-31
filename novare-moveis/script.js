/**
 * NOVARE MÓVEIS PLANEJADOS - JAVASCRIPT INTERATIVO & CONVERSÃO
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

    document.addEventListener('click', (e) => {
      if (!mobileNavPanel.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        toggleMenu(false);
      }
    });
  }

  // 2. Header Scroll Effect & Active Nav Link Spy
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

  // 5. Formulário de Orçamento / Briefing de Projeto no WhatsApp
  const projectForm = document.getElementById('project-form');

  if (projectForm) {
    projectForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const clientName = document.getElementById('client-name').value.trim();
      const roomType = document.getElementById('room-select').value;
      const propertyType = document.getElementById('property-select').value;
      const city = document.getElementById('city-input').value.trim() || 'Itaúna e Região';

      if (!clientName) {
        alert('Por favor, informe seu nome.');
        return;
      }

      const message = `Olá, equipe Novare Móveis Planejados! Meu nome é *${clientName}*.\n\n` +
                      `Gostaria de solicitar um atendimento / projeto 3D para o meu imóvel:\n` +
                      `📐 *Ambiente de Interesse:* ${roomType}\n` +
                      `🏠 *Tipo de Imóvel:* ${propertyType}\n` +
                      `📍 *Cidade/Local:* ${city}\n\n` +
                      `Poderiam me apresentar as opções de projeto e agendar um horário? Obrigado!`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/5537998055769?text=${encodedMessage}`;

      window.open(whatsappUrl, '_blank');
    });
  }
});
