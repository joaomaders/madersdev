const themeToggle = document.getElementById('themeToggle');
const themeToggleMobile = document.getElementById('themeToggleMobile');

const setTheme = (theme) => {
    const isDark = theme === 'dark';
    document.body.classList.toggle('dark-mode', isDark);
    document.body.classList.toggle('light-mode', !isDark);
    const emoji = isDark ? '☀️' : '🌙';
    if (themeToggle) themeToggle.textContent = emoji;
    if (themeToggleMobile) themeToggleMobile.textContent = emoji;
    localStorage.setItem('theme', theme);
};

document.addEventListener('DOMContentLoaded', () => {
    setTheme(localStorage.getItem('theme') || 'dark');
});

[themeToggle, themeToggleMobile].forEach(btn => {
    if (btn) {
        btn.addEventListener('click', () => {
            setTheme(document.body.classList.contains('dark-mode') ? 'light' : 'dark');
        });
    }
});

const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
        hamburgerBtn.classList.toggle('open');
        mobileMenu.classList.toggle('open');
    });
}

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('open');
        mobileMenu.classList.remove('open');
    });
});

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
            document.querySelector(`a[href="#${entry.target.id}"]`)?.classList.add('active');
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('section[id]').forEach(section => sectionObserver.observe(section));

const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    scrollToTopBtn.classList.toggle('visible', window.scrollY > 300);
}, { passive: true });

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

const animateOnScroll = (selector) => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(selector).forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s, transform 0.6s';
        observer.observe(el);
    });
};

animateOnScroll('.skill-tag');
animateOnScroll('.job');

const footerYear = document.getElementById('footerYear');
if (footerYear) footerYear.textContent = new Date().getFullYear();

function initPawEffect(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    section.style.position = 'relative';
    section.style.isolation = 'isolate';

    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:-1;';
    section.insertBefore(canvas, section.firstChild);

    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = section.offsetWidth;
        canvas.height = section.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const paws = [];
    let prevPawLeft = false;
    let animating = false;
    const mouse = { prev: { x: 0, y: 0 }, dist: 0 };
    let prevX = 0, prevY = 0;

    function drawPaw(x, y, size, angleDeg, left, alpha) {
        ctx.save();
        ctx.fillStyle = `rgba(239, 204, 110, ${alpha})`;
        ctx.translate(x - size / 2, y - size / 2);
        ctx.rotate((angleDeg + 90) * Math.PI / 180);
        ctx.translate(left ? size * 1.5 : -size * 1.5, 0);

        ctx.beginPath();
        ctx.ellipse(size / 2, size / 2, size * 0.45, size * 0.35, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(0, 0, size * 0.25, size * 0.25, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(size / 2, -size * 0.2, size * 0.25, size * 0.25, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(size, 0, size * 0.25, size * 0.25, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    section.addEventListener('mousemove', (e) => {
        const rect = section.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;

        if (mx >= 0 && my >= 0 && mx <= rect.width && my <= rect.height) {
            const dx = Math.abs(mx - prevX);
            const dy = Math.abs(my - prevY);

            if (mouse.dist > 25) {
                prevPawLeft = !prevPawLeft;
                paws.push({
                    x: mx, y: my,
                    angle: Math.atan2(my - mouse.prev.y, mx - mouse.prev.x) * 180 / Math.PI,
                    left: prevPawLeft,
                    alpha: 1,
                    size: 14,
                });
                mouse.dist = 0;
                mouse.prev = { x: mx, y: my };
                if (!animating) { animating = true; animate(); }
            } else {
                mouse.dist += dx + dy;
            }
        } else {
            mouse.prev = { x: mx, y: my };
        }

        prevX = mx;
        prevY = my;
    });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = paws.length - 1; i >= 0; i--) {
            const p = paws[i];
            p.alpha -= (paws.length - i) * 0.0004;
            if (p.alpha <= 0) { paws.splice(i, 1); continue; }
            drawPaw(p.x, p.y, p.size, p.angle, p.left, p.alpha);
        }

        if (paws.length > 0) {
            requestAnimationFrame(animate);
        } else {
            animating = false;
        }
    }
}

initPawEffect('about');
initPawEffect('experience');
