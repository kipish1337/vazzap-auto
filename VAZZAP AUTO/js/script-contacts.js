
document.addEventListener('DOMContentLoaded', () => {
    const contactInfo = document.querySelectorAll('.info-item');

    contactInfo.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = 1;
            item.style.transform = 'translateY(0)';
        }, 300 * index);
    });
});

const menuToggle = document.querySelector('.menu-toggle');
const burgerMenu = document.querySelector('.burger-menu');
const overlay = document.querySelector('.overlay');


menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    burgerMenu.classList.toggle('active');
    overlay.classList.toggle('active');

    
    if (burgerMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden'; 
        document.body.style.filter = 'blur(0px)';
    } else {
        document.body.style.overflow = ''; 
        document.body.style.filter = '';
    }
});


overlay.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    burgerMenu.classList.remove('active');
    overlay.classList.remove('active');

    
    document.body.style.overflow = '';
    document.body.style.filter = '';
});

ymaps.ready(function () {
    const map = new ymaps.Map("map", {
        center: [55.128140, 61.264357], 
        zoom: 15, 
        controls: ["zoomControl"], 
    });

    
    const marker = new ymaps.Placemark(
        [55.128140, 61.264357], 
        {
            balloonContentHeader: "Автозапчасти для ВАЗ", 
            balloonContentBody: "г. Челябинск, ул. Изумрудная, д. 5", 
            balloonContentFooter: "Телефон: +7 (951) 128-48-11", 
        },
        {
            preset: "islands#redIcon", 
        }
    );

    
    map.geoObjects.add(marker);

    
    marker.events.add("click", function () {
        marker.balloon.open();
    });
});