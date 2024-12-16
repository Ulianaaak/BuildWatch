document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('technical-attributes-modal');
    const closeModalButton = document.getElementById('close-modal');

    if (closeModalButton) {
        // Закрытие модального окна при клике на кнопку
        closeModalButton.addEventListener('click', function () {
            modal.style.display = 'none';
        });
    } else {
        console.error('Кнопка закрытия не найдена!');
    }

    // Закрытие модального окна при клике вне его содержимого
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});