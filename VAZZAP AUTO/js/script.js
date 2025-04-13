// Переключение бургер-меню
const menuToggle = document.querySelector('.menu-toggle');
const burgerMenu = document.querySelector('.burger-menu');
const overlay = document.querySelector('.overlay');

menuToggle.addEventListener('click', () => {
    burgerMenu.classList.toggle('active'); // Показываем/скрываем меню
    overlay.classList.toggle('active'); // Показываем/скрываем затемнение
});

// Закрытие меню при клике на затемнение
overlay.addEventListener('click', () => {
    burgerMenu.classList.remove('active'); // Скрываем меню
    overlay.classList.remove('active'); // Скрываем затемнение
});


// Автоматическая карусель
const carouselTrack = document.querySelector('.carousel-track');
const carouselItems = document.querySelectorAll('.carousel-item');
const carTitle = document.getElementById('car-title');
const carDescription = document.getElementById('car-description');
const carSpecs = document.getElementById('car-specs');

let currentIndex = 0;

function updateCarousel() {
    const offset = -currentIndex * 100; // Сдвигаем на ширину одного слайда
    carouselTrack.style.transform = `translateX(${offset}%)`;

    // Обновляем информацию о машине
    const currentCar = carouselItems[currentIndex];
    carTitle.textContent = currentCar.dataset.title;
    carDescription.textContent = currentCar.dataset.description;

    // Обновляем технические характеристики
    const specs = currentCar.dataset.specs.split(' | ');
    carSpecs.innerHTML = ''; // Очищаем предыдущие характеристики
    specs.forEach(spec => {
        const li = document.createElement('li');
        li.textContent = spec;
        carSpecs.appendChild(li);
    });
}

function nextSlide() {
    currentIndex++;
    if (currentIndex >= carouselItems.length) {
        currentIndex = 0; // Зацикливаем
    }
    updateCarousel();
}

// Автоматическая прокрутка каждые 5 секунд
setInterval(nextSlide, 5000); // 5000 мс = 5 секунд

// Инициализация карусели при загрузке страницы
updateCarousel();