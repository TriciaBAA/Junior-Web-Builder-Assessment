const navbar = document.querySelector('.navbar');
const heroCopy = document.querySelector('.hero-copy');
const menuToggle = document.querySelector('.menu-toggle');
const mainNavigation = document.querySelector('.main-navigation');
const serviceSteps = document.querySelectorAll('.service-step');
const serviceImages = document.querySelectorAll('.services-image');
let lastScrollY = window.scrollY;

if (serviceSteps.length && serviceImages.length) {
    const serviceObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            const serviceIndex = entry.target.dataset.serviceStep;
            serviceSteps.forEach((step) => step.classList.toggle('is-active', step === entry.target));
            serviceImages.forEach((image) => image.classList.toggle('is-active', image.dataset.serviceImage === serviceIndex));
        });
    }, { rootMargin: '-42% 0px -42% 0px', threshold: 0 });

    serviceSteps.forEach((step) => serviceObserver.observe(step));
}

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
