document.addEventListener('DOMContentLoaded', () => {
    // Элементы DOM
    const cartItems = document.getElementById('cart-items');
    const subtotalEl = document.getElementById('subtotal');
    const totalPriceEl = document.getElementById('total-price');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    // Загрузка корзины из localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Отображение корзины
    function renderCart() {
        cartItems.innerHTML = '';
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<div class="empty-cart">Ваша корзина пуста</div>';
            subtotalEl.textContent = '0 ₽';
            totalPriceEl.textContent = '0 ₽';
            return;
        }
        
        let subtotal = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="product-info">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="product-details">
                        <h3>${item.name}</h3>
                        <button class="remove-btn" data-id="${item.id}">Удалить</button>
                    </div>
                </div>
                <div class="price">${item.price.toLocaleString()} ₽</div>
                <div class="quantity-control">
                    <button class="decrement" data-id="${item.id}">-</button>
                    <input type="number" value="${item.quantity}" min="1" data-id="${item.id}">
                    <button class="increment" data-id="${item.id}">+</button>
                </div>
                <div class="total-price">${itemTotal.toLocaleString()} ₽</div>
            `;
            
            cartItems.appendChild(cartItem);
        });
        
        subtotalEl.textContent = `${subtotal.toLocaleString()} ₽`;
        totalPriceEl.textContent = `${subtotal.toLocaleString()} ₽`;
        
        // Добавляем обработчики событий
        addEventListeners();
    }
    
    // Добавление обработчиков событий
    function addEventListeners() {
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                removeFromCart(id);
            });
        });
        
        document.querySelectorAll('.decrement').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                updateQuantity(id, -1);
            });
        });
        
        document.querySelectorAll('.increment').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                updateQuantity(id, 1);
            });
        });
        
        document.querySelectorAll('.quantity-control input').forEach(input => {
            input.addEventListener('change', (e) => {
                const id = parseInt(e.target.dataset.id);
                const newQuantity = parseInt(e.target.value);
                
                if (newQuantity > 0) {
                    updateQuantity(id, 0, newQuantity);
                } else {
                    e.target.value = 1;
                }
            });
        });
    }
    
    // Удаление товара из корзины
    function removeFromCart(id) {
        if (confirm('Вы уверены, что хотите удалить этот товар из корзины?')) {
            cart = cart.filter(item => item.id !== id);
            saveCart();
            renderCart();
        }
    }
    
    // Обновление количества товара
    function updateQuantity(id, change, newQuantity = null) {
        const item = cart.find(item => item.id === id);
        
        if (item) {
            if (newQuantity !== null) {
                item.quantity = newQuantity;
            } else {
                item.quantity += change;
                
                if (item.quantity < 1) {
                    removeFromCart(id);
                    return;
                }
            }
            
            saveCart();
            renderCart();
        }
    }
    
    
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Ваша корзина пуста!');
            return;
        }
        
        if (confirm('Подтвердить оформление заказа?')) {
            alert('Заказ успешно оформлен! Спасибо за покупку.');
            cart = [];
            saveCart();
            renderCart();
        }
    });
    
    // Инициализация
    renderCart();
    
    // Бургер-меню (оставляем предыдущую реализацию)
    const menuToggle = document.querySelector('.menu-toggle');
    const burgerMenu = document.querySelector('.burger-menu');
    const overlay = document.querySelector('.overlay');
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        burgerMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        
        if (burgerMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    overlay.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        burgerMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });
});