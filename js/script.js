const navbar = document.querySelector('.navbar');
const heroCopy = document.querySelector('.hero-copy');
const menuToggle = document.querySelector('.menu-toggle');
const mainNavigation = document.querySelector('.main-navigation');
let lastScrollY = window.scrollY;

if (menuToggle && mainNavigation) {
    menuToggle.addEventListener('click', () => {
        const isOpen = mainNavigation.classList.toggle('menu-open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });

    mainNavigation.addEventListener('click', (event) => {
        if (event.target.closest('a')) {
            mainNavigation.classList.remove('menu-open');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Open navigation');
        }
    });
}

if (navbar || heroCopy) {
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (navbar) {
            if (currentScrollY <= 10 || currentScrollY < lastScrollY) {
                navbar.classList.remove('navbar-hidden');
            } else {
                navbar.classList.add('navbar-hidden');
            }
        }

        if (heroCopy && currentScrollY > 80) {
            heroCopy.classList.add('hero-copy-visible');
        } else if (heroCopy) {
            heroCopy.classList.remove('hero-copy-visible');
        }

        lastScrollY = currentScrollY;
    }, { passive: true });
}
