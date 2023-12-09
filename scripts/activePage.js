const { pathname } = document.location;

const linkElements = document.querySelectorAll('.page-navigation-item-link');

linkElements.forEach(link => {
    const { value } = link.attributes.getNamedItem('href');
    if (pathname.includes(value)) {
        link.setAttribute('active', true);
    }
})