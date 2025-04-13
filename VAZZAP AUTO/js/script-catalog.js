// Получаем элементы DOM
const productGrid = document.getElementById('product-grid');
const filtersForm = document.getElementById('filters-form');
const searchInput = document.getElementById('search-input');
const pagination = document.getElementById('pagination');

// Исходные данные о товарах
const products = [
    // Двигатели
    { id: 1, name: 'Двигатель 1.6L Turbo', category: 'engine', price: 354000, image: 'https://avatars.mds.yandex.net/i?id=d5024efa46bd8f6da75323b06cdadf2866b7d253-3574038-images-thumbs&n=13' },
    { id: 2, name: 'Двигатель 1.8L MPI', category: 'engine', price: 299000, image: 'https://avatars.mds.yandex.net/i?id=379549508b3bf22f8fec15192d0f2964c272dab3-6950809-images-thumbs&n=13' },
    { id: 3, name: 'Двигатель 1.4L TSI', category: 'engine', price: 420000, image: 'https://avatars.mds.yandex.net/i?id=9b76c0f4beb7433a02ea4265aa487a76495cec34-4841042-images-thumbs&n=13' },

    // Тормозная система
    { id: 4, name: 'Тормозные диски Brembo', category: 'brakes', price: 15200, image: 'https://avatars.mds.yandex.net/i?id=8397111e9a21e1241475c310cedf0414d9cdba6d-9051244-images-thumbs&n=13' },
    { id: 5, name: 'Тормозные колодки Ferodo', category: 'brakes', price: 8700, image: 'https://avatars.mds.yandex.net/i?id=33834b4eacbe25c688d4f5a9fe8e84d59d5eb6c3-12495433-images-thumbs&n=13' },
    { id: 6, name: 'Суппорты AP Racing', category: 'brakes', price: 45000, image: 'https://avatars.mds.yandex.net/i?id=ce283986b0d48845a42281c9b53a5e252c8fc44d2a1a77aa-12438661-images-thumbs&n=13' },

    // Подвеска
    { id: 7, name: 'Подвеска KW Coilovers', category: 'suspension', price: 31500, image: 'https://avatars.mds.yandex.net/i?id=366b11179e6412d9b4fdde40c046c2150647672c-11035673-images-thumbs&n=13' },
    { id: 8, name: 'Стойки амортизаторов Sachs', category: 'suspension', price: 12800, image: 'https://avatars.mds.yandex.net/i?id=58b90f1936b8380554271ecf1f3d5e1de72985dd-12495433-images-thumbs&n=13' },
    { id: 9, name: 'Пружины H&R', category: 'suspension', price: 9600, image: 'https://avatars.mds.yandex.net/i?id=3e095e79aab35eaf88f4fe678fe33cbc11dee7fd-5691454-images-thumbs&n=13' },

    // Электроника
    { id: 10, name: 'Блок управления двигателем', category: 'electronics', price: 24700, image: 'https://avatars.mds.yandex.net/i?id=44a2b0077b65db0342d2dd074d23cdc52611a62e-5540728-images-thumbs&n=13' },
    { id: 11, name: 'Датчик ABS Bosch', category: 'electronics', price: 5200, image: 'https://avatars.mds.yandex.net/i?id=4216abd0d1081937f6cd25ec56cfbce7042d36c2-5879932-images-thumbs&n=13' },
    { id: 12, name: 'Камера заднего вида', category: 'electronics', price: 7800, image: 'https://avatars.mds.yandex.net/i?id=d8abbc6871905672bf5bc88f7f8e65a0870dfb75-10954814-images-thumbs&n=13' },

    // Кузов
    { id: 13, name: 'Бампер передний', category: 'body', price: 12500, image: 'https://avatars.mds.yandex.net/i?id=b84c0b6eef311db59c3827b15710d89b307160de-5109160-images-thumbs&n=13' },
    { id: 14, name: 'Капот углепластиковый', category: 'body', price: 25000, image: 'https://avatars.mds.yandex.net/i?id=7174935a73c838075c091c1052e645807a999185-10697115-images-thumbs&n=13' },
    { id: 15, name: 'Зеркала заднего вида', category: 'body', price: 6700, image: 'https://avatars.mds.yandex.net/i?id=8fc1aab625585cec3702c7d5682fa09d9d492eee-4865215-images-thumbs&n=13' },

    // Трансмиссия
    { id: 16, name: 'Коробка передач механическая', category: 'transmission', price: 89000, image: 'https://avatars.mds.yandex.net/i?id=e2bcdf737181b9c2a90e52d008beff12cf08729a-5219700-images-thumbs&n=13' },
    { id: 17, name: 'Сцепление Valeo', category: 'transmission', price: 14500, image: 'https://avatars.mds.yandex.net/i?id=c277f26a5f23c2feefa3592ec5aaf0ba4524ea8d-4968790-images-thumbs&n=13' },
    { id: 18, name: 'Карданный вал усиленный', category: 'transmission', price: 45000, image: 'https://avatars.mds.yandex.net/i?id=a805380be3790a0215415bfa6aa2f0c22cd0f87104d363d4-10495176-images-thumbs&n=13' },
];

// Настройки пагинации
const itemsPerPage = 6; // Количество товаров на странице
let currentPage = 1; // Текущая страница

// Функция для отображения товаров
function renderProducts(filteredProducts) {
    const start = (currentPage - 1) * itemsPerPage;
    const end = currentPage * itemsPerPage;
    const paginatedProducts = filteredProducts.slice(start, end);

    productGrid.innerHTML = ''; // Очищаем текущий список товаров

    paginatedProducts.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">${product.price} ₽</p>
                <a href="#" class="btn">Подробнее</a>
            </div>
        `;
        productGrid.appendChild(card);
    });
}

// Функция для обновления пагинации
function updatePagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    pagination.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement('a');
        pageLink.href = '#';
        pageLink.textContent = i;
        pageLink.classList.add('page-link');
        if (i === currentPage) pageLink.classList.add('active');

        pageLink.addEventListener('click', (e) => {
            e.preventDefault();
            currentPage = i;
            filterAndRenderProducts();
        });

        pagination.appendChild(pageLink);
    }
}

// Функция для фильтрации и отображения товаров
function filterAndRenderProducts() {
    const selectedCategories = Array.from(filtersForm.querySelectorAll('input[type="checkbox"]:checked'))
        .map(input => input.value);

    const searchTerm = searchInput.value.toLowerCase();

    const filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        const matchesSearch = product.name.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesSearch;
    });

    updatePagination(filteredProducts.length);
    renderProducts(filteredProducts);
}

// Инициализация при загрузке страницы
window.addEventListener('load', () => {
    // Анимация появления карточек
    setTimeout(() => {
        productGrid.style.opacity = 1;
        productGrid.style.transform = 'translateY(0)';
    }, 300);

    // Первоначальное отображение товаров
    filterAndRenderProducts();
});

// Слушатели событий
filtersForm.addEventListener('change', filterAndRenderProducts);
searchInput.addEventListener('input', filterAndRenderProducts);

// Бургер-меню
const menuToggle = document.querySelector('.menu-toggle');
const burgerMenu = document.querySelector('.burger-menu');
const overlay = document.querySelector('.overlay');

// Переключение бургер-меню
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    burgerMenu.classList.toggle('active');
    overlay.classList.toggle('active');

    // Добавляем эффект размытия фона
    if (burgerMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden'; // Запрещаем прокрутку
        document.body.style.filter = 'blur(0px)';
    } else {
        document.body.style.overflow = ''; // Возвращаем прокрутку
        document.body.style.filter = '';
    }
});

// Закрытие меню при клике на затемнение
overlay.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    burgerMenu.classList.remove('active');
    overlay.classList.remove('active');

    // Убираем эффект размытия фона
    document.body.style.overflow = '';
    document.body.style.filter = '';
});
