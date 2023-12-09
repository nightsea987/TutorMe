let burger = document.querySelector('.menu__icon');
let menu = document.querySelector('.menu');
let body = document.querySelector('body');

if (burger && menu) {
	burger.onclick = () => {
		burger.classList.toggle('_active')
		menu.classList.toggle('_active')
		body.classList.toggle('_locked')
	}

	menu.querySelectorAll('.menu__link').forEach(link => {
		link.addEventListener('click', e => {
			if (e.target.closest('.menu__item')) {
				burger.classList.remove('_active')
				menu.classList.remove('_active')
				body.classList.remove('_locked')
			}
		})
	})
}
