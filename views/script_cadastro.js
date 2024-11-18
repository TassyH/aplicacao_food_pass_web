document.getElementById('cadastroForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const funcionario = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        cpf: document.getElementById('cpf').value,
        senha: document.getElementById('senha').value,
        data_nascimento: document.getElementById('data_nascimento').value,
        logradouro: document.getElementById('logradouro').value,
        numero: document.getElementById('numero').value,
        complemento: document.getElementById('complemento').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value,
        cep: document.getElementById('cep').value,
        celular: document.getElementById('celular').value,
    };

    try {
        const response = await fetch('/api/cadastrar-funcionario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(funcionario)
        });

        const result = await response.json();
        document .getElementById('message').innerText = result.message;
        if (response.ok) {
            document.getElementById('cadastroForm').reset();
        }
    } catch (error) {
        document.getElementById('message').innerText = 'Erro ao cadastrar funcionário.';
    }
});