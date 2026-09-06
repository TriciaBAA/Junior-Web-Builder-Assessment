const navbar = document.querySelector('.navbar');
const heroCopy = document.querySelector('.hero-copy');
const menuToggle = document.querySelector('.menu-toggle');
const mainNavigation = document.querySelector('.main-navigation');
const serviceSteps = document.querySelectorAll('.service-step');
const serviceImages = document.querySelectorAll('.services-image');
const gallery = document.querySelector('.photo-gallery');
let lastScrollY = window.scrollY;

if (gallery) {
    const galleryImages = [
        'images/photoGallery.png',
        'images/photoGallery_2.png',
        'images/photoGallery_3.png',
        'images/photoGallery_4.png',
        'images/photoGallery_5.png',
        'images/photoGallery_6.png',
        'images/photoGallery_7.png'
    ];
    const galleryAlts = [
        'Aerial view of a Pahrump Valley community',
        'Bright living room with a desert view',
        'Pahrump Valley neighborhood and mountains',
        'Pahrump Valley homes and mountain landscape',
        'Community recreation center and tennis courts',
        'Pahrump Valley homes beside a golf course',
        'Pahrump Valley neighborhood'
    ];
    const galleryPhotos = gallery.querySelectorAll('.gallery-photo');
    const galleryPages = gallery.querySelectorAll('.gallery-page');
    let galleryIndex = 0;
    let galleryTimer;
    let galleryAnimating = false;
    const galleryRoles = ['gallery-photo--far-left', 'gallery-photo--left', 'gallery-photo--active', 'gallery-photo--right', 'gallery-photo--far-right'];

    const renderGallery = () => {
        const indexes = [
            (galleryIndex + galleryImages.length - 2) % galleryImages.length,
            (galleryIndex + galleryImages.length - 1) % galleryImages.length,
            galleryIndex,
            (galleryIndex + 1) % galleryImages.length,
            (galleryIndex + 2) % galleryImages.length
        ];

        galleryPhotos.forEach((photo, photoIndex) => {
            photo.src = galleryImages[indexes[photoIndex]];
            photo.alt = galleryAlts[indexes[photoIndex]];
        });

        galleryPages.forEach((page, pageIndex) => {
            page.classList.toggle('is-active', pageIndex === galleryIndex);
        });
    };

    const shiftPhotoRoles = (step) => {
        galleryPhotos.forEach((photo) => {
            const currentRole = galleryRoles.findIndex((role) => photo.classList.contains(role));
            const nextRole = (currentRole - step + galleryRoles.length) % galleryRoles.length;
            galleryRoles.forEach((role) => photo.classList.remove(role));
            photo.classList.add(galleryRoles[nextRole]);
        });
    };

    const restartGalleryTimer = () => {
        clearInterval(galleryTimer);
        galleryTimer = setInterval(() => moveGallery(1), 3000);
    };

    const moveGallery = (step, onComplete) => {
        if (galleryAnimating) {
            return;
        }

        galleryAnimating = true;
        clearInterval(galleryTimer);
        shiftPhotoRoles(step);
        galleryIndex = (galleryIndex + step + galleryImages.length) % galleryImages.length;

        window.setTimeout(() => {
            renderGallery();
            galleryAnimating = false;
            restartGalleryTimer();
            if (onComplete) {
                onComplete();
            }
        }, 780);
    };

    const moveToGallery = (targetIndex) => {
        if (targetIndex === galleryIndex) {
            return;
        }

        const forwardSteps = (targetIndex - galleryIndex + galleryImages.length) % galleryImages.length;
        const direction = forwardSteps <= galleryImages.length / 2 ? 1 : -1;
        moveGallery(direction, () => moveToGallery(targetIndex));
    };

    gallery.querySelector('.gallery-control--previous').addEventListener('click', () => moveGallery(-1));
    gallery.querySelector('.gallery-control--next').addEventListener('click', () => moveGallery(1));
    galleryPhotos.forEach((photo) => {
        photo.tabIndex = 0;
        photo.addEventListener('click', () => {
            if (photo.classList.contains('gallery-photo--left') || photo.classList.contains('gallery-photo--far-left')) {
                moveGallery(-1);
            } else if (photo.classList.contains('gallery-photo--right') || photo.classList.contains('gallery-photo--far-right')) {
                moveGallery(1);
            }
        });
        photo.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                photo.click();
            }
        });
    });
    galleryPages.forEach((page) => {
        page.addEventListener('click', () => {
            moveToGallery(Number(page.dataset.galleryIndex));
        });
    });

    renderGallery();
    restartGalleryTimer();
}

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
