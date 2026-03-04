/**
 * Footer year, paw trail effect
 */
(function () {
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
        if (!ctx) return;

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
})();
