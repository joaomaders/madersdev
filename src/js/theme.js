/**
 * Theme toggle (dark/light) with localStorage persistence
 */
(function () {
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleMobile = document.getElementById('themeToggleMobile');

    function setTheme(theme) {
        const isDark = theme === 'dark';
        document.body.classList.toggle('dark-mode', isDark);
        document.body.classList.toggle('light-mode', !isDark);
        const emoji = isDark ? '☀️' : '🌙';
        if (themeToggle) themeToggle.textContent = emoji;
        if (themeToggleMobile) themeToggleMobile.textContent = emoji;
        localStorage.setItem('theme', theme);
    }

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
})();
