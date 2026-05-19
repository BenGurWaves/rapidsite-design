// Custom Cursor
const cursor = document.querySelector('.cursor');

// Only enable custom cursor on non-touch devices
if (window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Hover effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .pricing-card, .faq-item, .feature-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    // Active state on click
    document.addEventListener('mousedown', () => cursor.classList.add('active'));
    document.addEventListener('mouseup', () => cursor.classList.remove('active'));
}

// Loader Animation
const loader = document.querySelector('.loader');
const loaderLine = document.querySelector('.loader-line');
const loaderCounter = document.querySelector('.loader-counter');

let counter = 0;
const duration = 2000; // 2 seconds
const interval = duration / 100;

const counterInterval = setInterval(() => {
    counter++;
    loaderCounter.textContent = counter.toString().padStart(2, '0');
    loaderLine.style.width = counter + '%';
    
    if (counter >= 100) {
        clearInterval(counterInterval);
        setTimeout(() => {
            loader.classList.add('hidden');
            // Trigger hero animations
            triggerHeroAnimations();
        }, 300);
    }
}, interval);

// Hero Animations
function triggerHeroAnimations() {
    const titleLines = document.querySelectorAll('.title-line');
    const heroSubhead = document.querySelector('.hero-subhead');
    const heroBtn = document.querySelector('.hero .btn-primary');
    const heroVisual = document.querySelector('.hero-visual');
    
    // Stagger title lines
    titleLines.forEach((line, index) => {
        setTimeout(() => {
            line.classList.add('visible');
        }, index * 150);
    });
    
    // Subhead and button
    setTimeout(() => {
        if (heroSubhead) heroSubhead.classList.add('visible');
        if (heroBtn) heroBtn.classList.add('visible');
        if (heroVisual) heroVisual.classList.add('visible');
    }, titleLines.length * 150 + 200);
}

// Scroll Animations using Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe sections for scroll-in enhancement (progressive — content is visible by default)
const enhanceStyle = document.createElement('style');
enhanceStyle.textContent = `
    @media (prefers-reduced-motion: no-preference) {
        .section { opacity: 0.001; transform: translateY(24px); transition: opacity 0.9s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94); }
        .section.visible, .section.in-hero-range { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(enhanceStyle);

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
    // Failsafe: anything still hidden after 2.5s gets revealed unconditionally
    setTimeout(() => section.classList.add('visible'), 2500);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Parallax effect for hero visual
window.addEventListener('scroll', () => {
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        heroVisual.style.transform = `translateY(calc(-50% + ${rate}px))`;
    }
});

// Dynamic section border illumination on scroll
const sections = document.querySelectorAll('.section');
window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + window.innerHeight / 2;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPos >= sectionTop && scrollPos <= sectionTop + sectionHeight) {
            section.style.borderColor = 'rgba(255, 107, 53, 0.3)';
        } else {
            section.style.borderColor = 'rgba(245, 245, 240, 0.1)';
        }
    });
});

// Add loading complete class to body after loader
setTimeout(() => {
    document.body.classList.add('loaded');
}, 2500);
