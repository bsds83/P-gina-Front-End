document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('newsletterForm');

	form.addEventListener('submit', function (event) {
		event.preventDefault();

		// Obtenha os valores dos campos
		const nome = document.getElementById('nome').value;
		const email = document.getElementById('email').value;

		// Simule o envio para um servidor (substitua por sua lógica de envio real)
		console.log('Nome:', nome);
		console.log('E-mail:', email);

		// Armazenar no armazenamento local
		addToLocalStorage(nome, email);

		// Limpe os campos após o envio (opcional)
		document.getElementById('nome').value = '';
		document.getElementById('email').value = '';

		// Exibir a mensagem de confirmação
		showConfirmationMessage();
	});

	// Função para adicionar ao armazenamento local
	function addToLocalStorage(nome, email) {
		// Verificar se já existem registros armazenados
		let newsletterList = JSON.parse(localStorage.getItem('newsletterList')) || [];

		// Adicionar o novo registro
		newsletterList.push({ nome, email });

		// Armazenar de volta no armazenamento local
		localStorage.setItem('newsletterList', JSON.stringify(newsletterList));
	}

	// Exibir a mensagem de confirmação usando alert
	function showConfirmationMessage() {
		alert('Obrigado pelo seu registro, enviaremos mais novidades');

		// Adicione um console.log para verificar se a função está sendo chamada
		console.log('Mensagem de confirmação exibida');
	}
});
