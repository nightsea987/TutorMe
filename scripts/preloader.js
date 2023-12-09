const preloader = document.createElement('div');
preloader.setAttribute('id', 'preloader');
const imgElement = document.createElement('img');
imgElement.setAttribute('src', 'assets/gifs/loader.svg');
imgElement.setAttribute('alt', 'loader');
preloader.appendChild(imgElement);
document.body.appendChild(preloader);

window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('hide-preloader'), 500);
})