document.addEventListener('DOMContentLoaded', () => {
  /* 1. ИНИЦИАЛИЗАЦИЯ ИКОНОК */
  if (typeof lucide !== 'undefined') {
      lucide.createIcons();
  }

  /* 2. СКРОЛЛ ЭФФЕКТ ХЕДЕРА */
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
          header.classList.add('header--scrolled');
          header.style.padding = '12px 0';
      } else {
          header.classList.remove('header--scrolled');
          header.style.padding = '20px 0';
      }
  });

  /* 3. МОБИЛЬНОЕ МЕНЮ */
  const burger = document.querySelector('.burger');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuLinks = document.querySelectorAll('.mobile-menu__link');

  const toggleMenu = () => {
      burger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  };

  burger.addEventListener('click', toggleMenu);
  menuLinks.forEach(link => link.addEventListener('click', toggleMenu));

  /* 4. АНИМАЦИЯ ПОЯВЛЕНИЯ (REVEAL) */
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('active');
              revealObserver.unobserve(entry.target);
          }
      });
  }, { threshold: 0.1 });

  reveals.forEach(el => revealObserver.observe(el));

  /* 5. ЛОГИКА ФОРМЫ И КАПЧИ */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
      const captchaLabel = document.getElementById('captchaQuest');
      const num1 = Math.floor(Math.random() * 10) + 1;
      const num2 = Math.floor(Math.random() * 10) + 1;
      const sum = num1 + num2;

      if (captchaLabel) captchaLabel.textContent = `${num1} + ${num2}`;

      // Валидация телефона
      const phoneInput = document.getElementById('userPhone');
      phoneInput.addEventListener('input', (e) => {
          e.target.value = e.target.value.replace(/[^0-9]/g, '');
      });

      contactForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const userAns = parseInt(document.getElementById('captcha').value);

          if (userAns !== sum) {
              alert('Пожалуйста, проверьте решение примера.');
              return;
          }

          const btn = contactForm.querySelector('.form-submit');
          btn.disabled = true;
          btn.innerHTML = 'Отправка...';

          setTimeout(() => {
              contactForm.style.display = 'none';
              document.getElementById('successMessage').style.display = 'flex';
          }, 1500);
      });
  }

  /* 6. COOKIE POPUP */
  const cookiePopup = document.getElementById('cookiePopup');
  const acceptBtn = document.getElementById('acceptCookies');

  if (!localStorage.getItem('metrPiler_cookies')) {
      setTimeout(() => {
          cookiePopup.classList.add('active');
      }, 2000);
  }

  acceptBtn.addEventListener('click', () => {
      localStorage.setItem('metrPiler_cookies', 'true');
      cookiePopup.classList.remove('active');
  });

  /* 7. ПЛАВНЫЙ СКРОЛЛ ДЛЯ ЯКОРЕЙ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
              target.scrollIntoView({ behavior: 'smooth' });
          }
      });
  });
});