document.addEventListener('DOMContentLoaded', () => {
    const reviews = [
        {
            id: 1,
            author: "Алексей Смирнов",
            avatar: "images/avatars/user1.jpg",
            product: "Тормозные диски Brembo",
            rating: 5,
            text: "Заказал диски, доставили быстрее чем обещали! Качество на высоте - после установки торможение стало заметно эффективнее. Рекомендую этот магазин!",
            date: "15.05.2023"
        },
        {
            id: 2,
            author: "Ирина Ковалева",
            avatar: "images/avatars/user2.jpg",
            product: "Двигатель 1.6L Turbo",
            rating: 4,
            text: "Двигатель пришел в идеальном состоянии, все комплектующие на месте. Не хватило только более подробной инструкции по установке.",
            date: "22.04.2023"
        },
        {
            id: 3,
            author: "Дмитрий Васнецов",
            avatar: "images/avatars/user3.jpg",
            product: "Подвеска KW Coilovers",
            rating: 5,
            text: "Спасибо за профессиональную консультацию! Подвеска полностью изменила поведение машины в лучшую сторону. Теперь только к вам!",
            date: "10.03.2023"
        }
    ];

    const carousel = document.getElementById('reviews-carousel');
    
    // Заполняем карусель отзывами
    reviews.forEach(review => {
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card';
        reviewCard.innerHTML = `
            <div class="review-header">
                <img src="${review.avatar}" alt="${review.author}" class="review-avatar">
                <div>
                    <div class="review-author">${review.author}</div>
                    <div class="review-product">${review.product}</div>
                </div>
            </div>
            <div class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}</div>
            <p class="review-text">${review.text}</p>
            <div class="review-date">${review.date}</div>
        `;
        carousel.appendChild(reviewCard);
    });

    // Навигация по отзывам
    let currentIndex = 0;
    const cards = document.querySelectorAll('.review-card');
    
    function updateCarousel() {
        cards.forEach((card, index) => {
            card.style.transform = `translateX(${(index - currentIndex) * 320}px)`;
        });
    }
    
    document.querySelector('.next-review').addEventListener('click', () => {
        if (currentIndex < cards.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    });
    
    document.querySelector('.prev-review').addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    
    // Инициализация
    updateCarousel();
});