const menuButton = document.querySelector('#menu-toggle-btn');
const dropdownMenu = document.querySelector('#dropdown-menu');

if (menuButton && dropdownMenu) {
	const closeMenu = () => {
		dropdownMenu.classList.remove('open');
		menuButton.setAttribute('aria-expanded', 'false');
	};

	menuButton.setAttribute('aria-expanded', 'false');

	menuButton.addEventListener('click', () => {
		const isOpen = dropdownMenu.classList.toggle('open');
		menuButton.setAttribute('aria-expanded', String(isOpen));
	});

	document.addEventListener('click', (event) => {
		if (!event.target.closest('.header-left')) {
			closeMenu();
		}
	});

	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') {
			closeMenu();
		}
	});
}
