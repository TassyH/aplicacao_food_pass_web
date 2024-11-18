document.getElementById('cadastroForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const restaurante = {
        nome: document.getElementById('nome').value,
        cnpj: document.getElementById('cnpj').value,
        descricao: document.getElementById('descricao').value,
        horario_funcionamento: document.getElementById('horario_funcionamento').value,
        logradouro: document.getElementById('logradouro').value,
        numero: document.getElementById('numero').value,
        complemento: document .getElementById('complemento').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value,
        cep: document.getElementById('cep').value,
        telefone: document.getElementById('telefone').value,
        celular: document.getElementById('celular').value,
        senha: document.getElementById('senha').value,
        email: document.getElementById('email').value,
        horario_abertura: document.getElementById('horario_abertura').value,
        horario_fechamento: document.getElementById('horario_fechamento').value,
        latitude: document.getElementById('latitude').value,
        longitude: document.getElementById('longitude').value,
        imagem_estabelecimento: document.getElementById('imagem_estabelecimento').value,
    };

    try {
        const response = await fetch('/novo/restaurante', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(restaurante)
        });

        const result = await response.json();
        document.getElementById('message').innerText = result.message;
        if (response.ok) {
            document.getElementById('cadastroForm').reset();
        }
    } catch (error) {
        document.getElementById('message').innerText = 'Erro ao cadastrar restaurante.';
    }
});