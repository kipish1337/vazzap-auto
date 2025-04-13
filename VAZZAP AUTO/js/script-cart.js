// Получаем элементы DOM
const cartItems = document.getElementById('cart-items');
const totalItems = document.getElementById('total-items');
const totalPrice = document.getElementById('total-price');

// Исходные данные корзины (можно сохранять в localStorage)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Функция для отображения товаров в корзине
function renderCart() {
    cartItems.innerHTML = ''; // Очищаем текущий список

    let total = 0;

    cart.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('cart-item');
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-info">
                <h3>${item.name}</h3>
                <p class="price">${item.price} ₽</p>
                <button class="btn remove-btn" data-id="${item.id}">Удалить</button>
            </div>
        `;
        cartItems.appendChild(card);

        total += item.price;
    });

    // Обновляем итоговую сумму
    totalItems.textContent = cart.length;
    totalPrice.textContent = `${total} ₽`;

    // Добавляем обработчики для кнопок "Удалить"
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', () => {
            const id = parseInt(button.dataset.id); // Получаем ID товара
            removeFromCart(id); // Удаляем товар из корзины
        });
    });
}

// Функция для удаления товара из корзины
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id); // Удаляем товар по ID
    localStorage.setItem('cart', JSON.stringify(cart)); // Сохраняем изменения в localStorage
    renderCart(); // Перерисовываем корзину
}

// Кнопка "Оформить заказ"
const checkoutBtn = document.getElementById('checkout-btn');
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Корзина пуста. Добавьте товары для оформления заказа.');
    } else {
        alert('Заказ оформлен! Спасибо за покупку.');
        cart = []; // Очищаем корзину
        localStorage.removeItem('cart'); // Удаляем данные из localStorage
        renderCart(); // Обновляем интерфейс
    }
});

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

// Инициализация при загрузке страницы
window.addEventListener('load', () => {
    renderCart(); // Отображаем текущие товары в корзине
});