const navbar = document.querySelector('.navbar');
let lastScrollY = window.scrollY;

if (navbar) {
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY <= 10 || currentScrollY < lastScrollY) {
            navbar.classList.remove('navbar-hidden');
        } else {
            navbar.classList.add('navbar-hidden');
        }

        lastScrollY = currentScrollY;
    }, { passive: true });
}
