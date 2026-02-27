// Dark Mode Toggle - Initialize ASAP
(function() {
    const getSavedTheme = () => {
        return localStorage.getItem('theme') || 'dark';
    };

    const theme = getSavedTheme();
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.add('light-mode');
    }
})();

const themeToggle = document.getElementById('themeToggle');
const themeToggleMobile = document.getElementById('themeToggleMobile');

const setTheme = (theme) => {
    const emoji = theme === 'dark' ? '☀️' : '🌙';
    if (theme === 'dark') {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
    }
    if (themeToggle) themeToggle.textContent = emoji;
    if (themeToggleMobile) themeToggleMobile.textContent = emoji;
    localStorage.setItem('theme', theme);
};

// Initialize theme button state on page load
document.addEventListener('DOMContentLoaded', () => {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    setTheme(currentTheme);
});

// Toggle theme on button click
[themeToggle, themeToggleMobile].forEach(btn => {
    if (btn) {
        btn.addEventListener('click', () => {
            const newTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }
});

// Hamburger menu
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
        hamburgerBtn.classList.toggle('open');
        mobileMenu.classList.toggle('open');
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('open');
        mobileMenu.classList.remove('open');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Add active state to nav links based on scroll position
const observerOptions = {
    threshold: 0.3
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            const activeLink = document.querySelector(`a[href="#${entry.target.id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section[id]').forEach(section => {
    observer.observe(section);
});

// Add styles for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    font-size: 1.5rem;
    z-index: 999;
    transition: all 0.3s;
    box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'flex';
        scrollToTopBtn.style.alignItems = 'center';
        scrollToTopBtn.style.justifyContent = 'center';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollToTopBtn.addEventListener('hover', function() {
    this.style.transform = 'translateY(-5px)';
});

// Add animation on scroll for skill tags and job items
const animateOnScroll = (selector, className) => {
    const elements = document.querySelectorAll(selector);
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s, transform 0.6s';
        observer.observe(el);
    });
};

// Animate skills on scroll
animateOnScroll('.skill-tag', 'fade-in');
animateOnScroll('.job', 'fade-in');

// Set footer year dynamically
(function setFooterYear() {
    const el = document.getElementById('footerYear');
    if (el) {
        const now = new Date();
        el.textContent = now.getFullYear();
    }
})();

// Paw cursor effect
function initPawEffect(sectionId) {
    const aboutSection = document.getElementById(sectionId);
    if (!aboutSection) return;

    aboutSection.style.position = 'relative';
    aboutSection.style.isolation = 'isolate';

    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:-1;';
    aboutSection.insertBefore(canvas, aboutSection.firstChild);

    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = aboutSection.offsetWidth;
        canvas.height = aboutSection.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const paws = [];
    let prevPawLeft = false;
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

    aboutSection.addEventListener('mousemove', (e) => {
        const rect = aboutSection.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;

        if (mx >= 0 && my >= 0 && mx <= rect.width && my <= rect.height) {
            const dx = Math.abs(mx - prevX);
            const dy = Math.abs(my - prevY);

            if (mouse.dist > 25) {
                prevPawLeft = !prevPawLeft;
                const angle = Math.atan2(my - mouse.prev.y, mx - mouse.prev.x);
                paws.push({ x: mx, y: my, angle: (angle * 180) / Math.PI, left: prevPawLeft, alpha: 1, size: 14 });
                mouse.dist = 0;
                mouse.prev = { x: mx, y: my };
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
            if (p.alpha <= 0) {
                paws.splice(i, 1);
                continue;
            }
            drawPaw(p.x, p.y, p.size, p.angle, p.left, p.alpha);
        }

        requestAnimationFrame(animate);
    }
    animate();
}

initPawEffect('about');
initPawEffect('experience');
