(() => {
  const WA_NUMBER = '27791039855';

  // Mobile nav
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('nav');
  const setNav = (open) => {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  toggle.addEventListener('click', () => setNav(!nav.classList.contains('open')));
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setNav(false)));

  // Lookbook filters
  const looks = [...document.querySelectorAll('.look')];
  document.querySelectorAll('.chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chip').forEach((c) => c.classList.toggle('is-active', c === chip));
      const f = chip.dataset.filter;
      looks.forEach((l) => l.classList.toggle('is-hidden', f !== 'all' && l.dataset.cat !== f));
    });
  });

  // Lightbox
  const lb = document.getElementById('lightbox');
  const lbImg = lb.querySelector('img');
  const lbCap = lb.querySelector('figcaption');
  let current = 0;
  const visible = () => looks.filter((l) => !l.classList.contains('is-hidden'));
  const show = (look) => {
    const btn = look.querySelector('.look-btn');
    const thumb = btn.querySelector('img');
    lbImg.src = btn.dataset.full;
    lbImg.alt = thumb.alt;
    lbCap.textContent = look.querySelector('figcaption').textContent;
  };
  const step = (d) => {
    const v = visible();
    current = (current + d + v.length) % v.length;
    show(v[current]);
  };
  looks.forEach((look) => {
    look.querySelector('.look-btn').addEventListener('click', () => {
      current = visible().indexOf(look);
      show(look);
      lb.showModal();
    });
  });
  lb.querySelector('.lb-close').addEventListener('click', () => lb.close());
  lb.querySelector('.lb-prev').addEventListener('click', () => step(-1));
  lb.querySelector('.lb-next').addEventListener('click', () => step(1));
  lb.addEventListener('click', (e) => { if (e.target === lb) lb.close(); });
  lb.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });
  let touchX = null;
  lb.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
    touchX = null;
  });

  // Order form -> WhatsApp
  const form = document.getElementById('orderForm');
  const err = document.getElementById('formError');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form));
    if (!d.name.trim() || !d.occasion) { err.hidden = false; return; }
    err.hidden = true;
    let date = '';
    if (d.date) {
      date = new Date(d.date + 'T00:00').toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' });
    }
    const opt = (v, label) => (v && v.trim() ? `*${label}:* ${v.trim()}` : null);
    const text = [
      `Hi Pebetse! 🧵 I'd like a custom PB_Creationss design.`,
      '',
      `*Name:* ${d.name.trim()}`,
      `*Occasion:* ${d.occasion}`,
      opt(date, 'Date needed'),
      `*Number of outfits:* ${d.people || 1}`,
      opt(d.town, 'Location'),
      opt(d.idea, 'My idea'),
      '',
      '(Sent from pb-creationss.co.za)'
    ].filter((l) => l !== null).join('\n');
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  });

  // Reveal on scroll
  const targets = document.querySelectorAll('.section-head, .look, .card, .steps li, .measure-list li, .about-art, .about-copy, .order-form');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    targets.forEach((t) => { t.classList.add('reveal'); io.observe(t); });
  }

  document.getElementById('year').textContent = new Date().getFullYear();
})();
