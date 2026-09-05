const navbar = document.querySelector('.navbar');
const heroCopy = document.querySelector('.hero-copy');
let lastScrollY = window.scrollY;

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
