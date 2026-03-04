/**
 * Device preview overlay (mobile/tablet iframe)
 */
(function () {
    const DEVICES = {
        mobile: { width: 390, vPad: 68, maxH: 844 },
        tablet: { width: 820, vPad: 90, maxH: 1180 },
    };

    let currentDevice = 'mobile';
    let isOpen = false;

    const phoneIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`;
    const tabletIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="18" rx="2"/><line x1="18" y1="12" x2="18.01" y2="12"/></svg>`;

    const triggerBtn = document.createElement('button');
    triggerBtn.className = 'device-preview-btn';
    triggerBtn.title = 'Preview on device';
    triggerBtn.setAttribute('aria-label', document.documentElement.lang.startsWith('pt') ? 'Visualizar em dispositivo' : 'Preview on device');
    const hintMsg = document.documentElement.lang.startsWith('pt') ? 'Experiência responsiva' : 'Responsive experience';
    triggerBtn.innerHTML = `<span class="device-preview-hint-text">${hintMsg}</span>${phoneIcon}`;
    document.body.appendChild(triggerBtn);

    const overlay = document.createElement('div');
    overlay.className = 'device-preview-overlay';
    overlay.innerHTML = `
        <button class="device-preview-close" title="Close (Esc)" aria-label="Close">&times;</button>
        <div class="device-frame-wrapper">
            <div class="device-frame mobile">
                <div class="device-screen">
                    <iframe title="Device preview" scrolling="yes"></iframe>
                </div>
            </div>
        </div>
        <div class="device-preview-header">
            <div class="device-selector">
                <button class="device-selector-btn active" data-device="mobile">${phoneIcon} Mobile</button>
                <button class="device-selector-btn" data-device="tablet">${tabletIcon} Tablet</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);

    const frame = overlay.querySelector('.device-frame');
    const iframe = overlay.querySelector('iframe');
    const closeBtn = overlay.querySelector('.device-preview-close');
    const wrapper = overlay.querySelector('.device-frame-wrapper');
    const selectorBtns = overlay.querySelectorAll('.device-selector-btn');

    function updateSize() {
        if (!frame || !iframe) return;
        const overlayV = 32;
        const available = window.innerHeight - overlayV;

        const tabletBtn = overlay.querySelector('[data-device="tablet"]');
        const tabletFits = window.innerWidth >= 1100;
        if (tabletBtn) tabletBtn.style.display = tabletFits ? '' : 'none';
        if (!tabletFits && currentDevice === 'tablet') switchDevice('mobile');

        const dev = DEVICES[currentDevice];
        const iframeH = Math.min(Math.max(available - dev.vPad, 300), dev.maxH);
        iframe.style.height = iframeH + 'px';

        const header = overlay.querySelector('.device-preview-header');
        const sidebarW = header ? header.offsetWidth : 0;
        const maxW = window.innerWidth - 32 - sidebarW - 16;
        frame.style.width = Math.min(dev.width, maxW) + 'px';
    }

    function switchDevice(device) {
        currentDevice = device;
        if (frame) frame.className = `device-frame ${device}`;
        selectorBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.device === device));
        updateSize();
    }

    let hintShowTimer, hintHideTimer;

    function cancelHint() {
        clearTimeout(hintShowTimer);
        clearTimeout(hintHideTimer);
        triggerBtn.classList.remove('hint');
    }

    hintShowTimer = setTimeout(function showHint() {
        if (isOpen) return;
        triggerBtn.classList.add('hint');
        hintHideTimer = setTimeout(() => {
            triggerBtn.classList.remove('hint');
            hintShowTimer = setTimeout(showHint, 10000);
        }, 4000);
    }, 3000);

    function open() {
        cancelHint();
        if (iframe) iframe.src = window.location.href;
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
        isOpen = true;
        updateSize();
    }

    function close() {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
        isOpen = false;
        setTimeout(() => { if (!isOpen && iframe) iframe.src = ''; }, 300);
    }

    triggerBtn.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay || e.target === wrapper) close();
    });

    selectorBtns.forEach(btn => {
        btn.addEventListener('click', () => switchDevice(btn.dataset.device));
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isOpen) close();
    });

    window.addEventListener('resize', () => {
        if (isOpen) updateSize();
    }, { passive: true });
})();
