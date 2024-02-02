document.addEventListener('DOMContentLoaded', function () {
	// Elementos do carrinho
	const cartContainer = document.getElementById('cartContainer');
	const cartItemsList = document.getElementById('cartItemsList');
	const closeCartBtn = document.getElementById('closeCartBtn');
	const cartBtn = document.getElementById('cartBtn');
	const totalPriceElement = document.getElementById('totalPrice');
	let totalPrice = 0;

	// Função para adicionar item ao carrinho
	function addToCart(itemId, itemName, itemPrice) {
		// Verificar se o item já existe no carrinho
		var existingItem = document.querySelector(`#cartItemsList li[data-item="${itemId}"]`);

		if (!existingItem) {
			// Criar um novo item na lista
			var listItem = document.createElement('li');
			listItem.textContent = `${itemName.replace(/^\.+/, '')} €${itemPrice}`;

			// Adicionar campo de entrada numérica para a quantidade
			var quantityInput = document.createElement('input');
			quantityInput.type = 'number';
			quantityInput.value = 1;
			quantityInput.min = 1;
			quantityInput.classList.add('cartQuantityInput');

			// Adicionar botão de atualizar quantidade
			var updateButton = document.createElement('button');
			updateButton.textContent = 'Atualizar';
			updateButton.classList.add('updateQuantityBtn', 'removeFromCartBtn');
			updateButton.onclick = function () {
				updateCartItemQuantity(itemId, quantityInput.value);
				updateTotalPrice();
			};

			// Adicionar botão de remover
			var removeButton = document.createElement('button');
			removeButton.textContent = 'Remover';
			removeButton.classList.add('removeFromCartBtn');
			removeButton.onclick = function () {
				cartItemsList.removeChild(listItem);
				totalPrice -= parseFloat(itemPrice) * parseInt(quantityInput.value, 10);
				updateTotalPrice();
			};

			// Adicionar estilos para alinhar os botões à direita
			quantityInput.style.marginRight = '20px';
			updateButton.style.marginRight = '20px';

			// Adicionar elementos ao item da lista
			listItem.appendChild(quantityInput);
			listItem.appendChild(updateButton);
			listItem.appendChild(removeButton);

			// Configurar atributos do item
			listItem.setAttribute('data-item', itemId);
			listItem.setAttribute('data-price', itemPrice);

			// Adicionar item à lista de itens do carrinho
			cartItemsList.appendChild(listItem);

			// Atualizar preço total
			totalPrice += parseFloat(itemPrice);
			updateTotalPrice();

			// Imprimir na consola que o produto foi adicionado ao carrinho
			console.log(`Produto Adicionado ao Carrinho: ${itemName} (ID: ${itemId}), Preço: €${itemPrice}`);
		}
	}

	// Remover botão "Fechar" associado ao botão cinza
	closeCartBtn.parentNode.removeChild(closeCartBtn);

	// Atualizar a quantidade do item no carrinho
	function updateCartItemQuantity(itemId, newQuantity) {
		// Procurar o item na lista do carrinho
		var existingItem = document.querySelector(`#cartItemsList li[data-item="${itemId}"]`);

		if (existingItem) {
			// Atualizar a quantidade no atributo data-quantity
			existingItem.setAttribute('data-quantity', newQuantity);
		}
	}

	// Adicionar eventos aos botões de "Adicionar ao Carrinho"
	var addToCartButtons = document.querySelectorAll('.addToCartBtn');
	addToCartButtons.forEach(function (button) {
		button.addEventListener('click', function () {
			var itemId = button.getAttribute('data-item');
			var itemName = button.getAttribute('data-name');
			var itemPrice = button.getAttribute('data-price');
			addToCart(itemId, itemName, itemPrice);
			showCart();
		});
	});

	// Botão "Finalizar Encomenda"
	var checkoutButton = document.createElement('button');
	checkoutButton.textContent = 'Finalizar Encomenda';
	checkoutButton.classList.add('removeFromCartBtn', 'checkoutBtn');
	checkoutButton.onclick = function () {
		showPaymentMessage();
		cartContainer.style.display = 'none';
	};

	// Botão "Fechar"
	var closeButton = document.createElement('button');
	closeButton.textContent = 'Fechar';
	closeButton.classList.add('removeFromCartBtn', 'closeBtn', 'greyBtn');
	closeButton.onclick = function () {
		cartContainer.style.display = 'none';
	};

	// Container para resumo do carrinho
	var summaryContainer = document.createElement('div');
	summaryContainer.setAttribute('id', 'cartSummary');
	cartContainer.appendChild(summaryContainer);

	// Adicionar botões ao contêiner do carrinho
	cartContainer.appendChild(checkoutButton);
	cartContainer.appendChild(closeButton);

	// Adicionar evento ao botão de carrinho para mostrar o carrinho
	cartBtn.addEventListener('click', function () {
		showCart();
	});

	// Exibir o carrinho
	function showCart() {
		cartContainer.style.display = 'block';
	}

	// Exibir mensagem de pagamento
	function showPaymentMessage() {
		var paymentMessage = document.createElement('div');
		paymentMessage.classList.add('paymentMessage');

		var productBox = document.createElement('div');
		productBox.classList.add('productBox');
		productBox.innerHTML = '<h3>Obrigado pelo seu pedido, será redirecionado para a página de pagamento</h3>';

		paymentMessage.appendChild(productBox);
		document.body.appendChild(paymentMessage);

		// Centralizar a mensagem
		paymentMessage.style.position = 'fixed';
		paymentMessage.style.top = '50%';
		paymentMessage.style.left = '50%';
		paymentMessage.style.transform = 'translate(-50%, -50%)';

		// Remover a mensagem após alguns segundos (opcional)
		setTimeout(function () {
			document.body.removeChild(paymentMessage);
		}, 5000); // Remover após 5 segundos (ajuste conforme necessário)
	}

	// Atualizar o preço total
	function updateTotalPrice() {
		totalPrice = 0;
		var cartItems = document.querySelectorAll('#cartItemsList li');
		cartItems.forEach(function (item) {
			var quantity = parseInt(item.querySelector('.cartQuantityInput').value, 10);
			var price = parseFloat(item.getAttribute('data-price'));
			totalPrice += quantity * price;
		});
		totalPriceElement.textContent = `Preço Total: €${totalPrice.toFixed(2)}`;
	}

	// Adicionar margem ao botão "Finalizar Encomenda"
	checkoutButton.style.marginRight = '200px';
});
