/* RapidSite.design — interactions */

/* ---------- Custom cursor (fine pointer only) ---------- */
const cursor = document.querySelector('.cursor');
if (cursor && window.matchMedia('(pointer: fine)').matches) {
    let x = 0, y = 0, tx = 0, ty = 0;
    document.addEventListener('mousemove', (e) => { tx = e.clientX; ty = e.clientY; });
    const tick = () => {
        x += (tx - x) * 0.25;
        y += (ty - y) * 0.25;
        cursor.style.left = x + 'px';
        cursor.style.top = y + 'px';
        requestAnimationFrame(tick);
    };
    tick();
    const hoverables = document.querySelectorAll('a, button, .plan, .faq, .compare-card, .niche, .example');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

/* ---------- Loader ---------- */
const loader = document.querySelector('.loader');
const loaderRule = document.querySelector('.loader-rule');
const loaderCounter = document.querySelector('.loader-counter');

if (loader && loaderRule && loaderCounter) {
    let pct = 0;
    const duration = 1600;
    const step = duration / 100;
    const t = setInterval(() => {
        pct++;
        loaderCounter.textContent = String(pct).padStart(3, '0');
        loaderRule.style.width = pct + '%';
        if (pct >= 100) {
            clearInterval(t);
            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.classList.add('loaded');
                revealHero();
            }, 280);
        }
    }, step);
} else {
    document.body.classList.add('loaded');
    revealHero();
}

function revealHero() {
    const lines = document.querySelectorAll('.hero-title .line');
    const subhead = document.querySelector('.hero-subhead');
    const ctaRow = document.querySelector('.hero-cta-row');
    const visual = document.querySelector('.hero-visual');
    lines.forEach((line, i) => setTimeout(() => line.classList.add('visible'), i * 140));
    setTimeout(() => {
        if (subhead) subhead.classList.add('visible');
        if (ctaRow) ctaRow.classList.add('visible');
        if (visual) visual.classList.add('visible');
    }, lines.length * 140 + 120);
}

/* ---------- Smooth scroll for in-page anchors ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.length <= 1) return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

/* ---------- Scroll reveal for sections ---------- */
if ('IntersectionObserver' in window) {
    const enhance = document.createElement('style');
    enhance.textContent = `
        @media (prefers-reduced-motion: no-preference) {
            .reveal { opacity: 0; transform: translateY(20px); transition: opacity .9s cubic-bezier(.2,.7,.3,1), transform .9s cubic-bezier(.2,.7,.3,1); }
            .reveal.in { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(enhance);

    document.querySelectorAll('.section, .cta-strip').forEach(s => s.classList.add('reveal'));

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => io.observe(el));

    // Failsafe: anything still hidden after 3s reveals unconditionally
    setTimeout(() => document.querySelectorAll('.reveal').forEach(el => el.classList.add('in')), 3000);
}
