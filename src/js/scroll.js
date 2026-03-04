/**
 * Scroll-to-top button and scroll-triggered animations
 */
(function () {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', () => {
        scrollToTopBtn.classList.toggle('visible', window.scrollY > 300);
    }, { passive: true });

    scrollToTopBtn.addEventListener('click', () => {
        const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
        window.scrollTo({ top: 0, behavior });
    });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function animateOnScroll(selector) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll(selector).forEach(el => {
            if (prefersReducedMotion) {
                el.style.opacity = '1';
                el.style.transform = 'none';
            } else {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'opacity 0.6s, transform 0.6s';
                observer.observe(el);
            }
        });
    }

    animateOnScroll('.skill-tag');
    animateOnScroll('.job');
})();
