/* ============================================================
   LUXE MOBILE CARE — script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Smooth scroll for ALL internal anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ── Nav background on scroll ── */
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 60
      ? 'rgba(8,8,8,0.98)'
      : 'linear-gradient(to bottom, rgba(8,8,8,0.98), transparent)';
  }, { passive: true });

  /* ── Formspree booking form submission ── */
  const form = document.getElementById('bookingForm');
  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();

      const btn = form.querySelector('.form-submit');
      const successMsg = document.getElementById('successMsg');
      const originalText = btn.textContent;

      // Basic validation
      const required = ['firstName', 'phone', 'service', 'vehicle'];
      let valid = true;
      required.forEach(id => {
        const el = document.getElementById(id);
        if (!el || !el.value.trim()) {
          el && (el.style.borderBottom = '1px solid #C9A84C');
          valid = false;
        } else {
          el.style.borderBottom = '';
        }
      });

      if (!valid) {
        btn.textContent = 'Please fill required fields';
        setTimeout(() => { btn.textContent = originalText; }, 2500);
        return;
      }

      btn.textContent = 'Sending...';
      btn.disabled = true;

      try {
        const data = new FormData(form);
        const res = await fetch('https://formspree.io/f/mjgqrepp', {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
          form.style.display = 'none';
          successMsg.classList.add('show');
          successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          throw new Error('Network response not ok');
        }
      } catch {
        btn.textContent = 'Error — please email us directly';
        btn.disabled = false;
        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
        }, 3000);
      }
    });
  }

});
