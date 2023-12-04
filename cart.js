document.addEventListener("DOMContentLoaded", function () {
    const addToCartButtons = document.querySelectorAll('.addToCartBtn');
    const cartItemsList = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    let total = 0;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault(); // Предотвращаем переход по ссылке

            const productContainer = this.closest('.product');
            const productName = productContainer.querySelector('h4').innerText;
            const productPriceText = productContainer.querySelector('h3').innerText;

            const productPriceMatch = productPriceText.match(/(\d+\.\d+)/);

            if (productPriceMatch) {
                const productPrice = parseFloat(productPriceMatch[0]);

                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <span>${productName}</span>
                    <span>${productPrice.toFixed(2)} €</span>
                `;
                cartItemsList.appendChild(listItem);

                total += productPrice;
                cartTotal.innerText = total.toFixed(2) + ' €';
            } else {
                console.error('Не удалось извлечь цену из текста:', productPriceText);
            }
        });
    });
});


    const checkoutButton = document.getElementById('checkoutBtn');
    checkoutButton.addEventListener('click', function () {
        if (total > 0) {
            alert(`Tellimus on esitatud! Summa: ${total.toFixed(2)} €`);
            // Здесь вы можете добавить дополнительную логику для процесса оформления заказа
            // Например, отправку данных корзины на сервер
            // и очистку корзины при успешном оформлении заказа
            clearCart();
        } else {
            alert("Ostukorv on tühi. Lisa tooted enne tellimist.");
        }
    });

    function clearCart() {
        // Очистить элементы корзины и сбросить общую сумму
        cartItemsList.innerHTML = '';
        total = 0;
        cartTotal.innerText = '0.00 €';
    }

