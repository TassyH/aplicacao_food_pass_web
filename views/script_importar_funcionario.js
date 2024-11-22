document.getElementById('importButton').addEventListener('click', function() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Por favor, selecione um arquivo CSV.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const csvData = event.target.result;
        const rows = csvData.split('\n').slice(1); 
        const tableBody = document.getElementById('tableBody');
        console.log("Iniciando a leitura do arquivo CSV...");        
        tableBody.innerHTML = ''; 
        let totalSaldo = 0;
        const funcionarios = [];

        rows.forEach(row => {
            if (row.trim()) {
                const columns = row.split(',').map(col => col.trim()); 

                if (columns.length === 15) {
                    const nome = columns[0];
                    const email = columns [1]
                    const cpf = columns[2];
                    const dataNascimento = columns [3];
                    const ativo = columns [4];
                    const dataInclusao = columns [5];
                    const logradouro = columns [6];
                    const bairro = columns [7];
                    const cidade = columns [8];
                    const estado = columns [9];
                    const cep = columns [10];
                    const celular = columns [11];
                    const id_empresa = columns [12];
                    const dataValidadeVR = columns[13];
                    const saldo = parseFloat(columns[14]) || 0; 

                    funcionarios.push({ 
                        nome,
                        email,
                        cpf,
                        dataNascimento,
                        ativo,
                        dataInclusao,
                        logradouro,
                        bairro,
                        cidade,
                        estado,
                        cep,
                        celular,
                        id_empresa,
                        dataValidadeVR,
                        saldo
                    });

                    totalSaldo += saldo; 
                    const newRow = document.createElement('tr');
                    newRow.innerHTML = `
                        <td>${nome}</td>
                        <td>${email}</td>
                        <td>${cpf}</td>
                        <td>${dataNascimento}</td>
                        <td>${ativo}</td>
                        <td>${dataInclusao}</td>
                        <td>${logradouro}</td>
                        <td>${bairro}</td>
                        <td>${cidade}</td>
                        <td>${estado}</td>
                        <td>${cep}</td>
                        <td>${celular}</td>
                        <td>${id_empresa}</td>
                        <td>${dataValidadeVR}</td>
                        <td>R$ ${saldo.toFixed(2)}</td>
                        <td><button class="deleteButton" data-saldo="${saldo}">Excluir</button></td>

                    `;
                    tableBody.appendChild(newRow);
                } else {
                    console.warn("Linha ignorada (não possui 4 colunas):", row);
                }
            }
        });

        document.getElementById('valorTotal').innerText = `R$ ${totalSaldo.toFixed(2)}`;
        console.log("Leitura do arquivo concluída.");
        console.log(rows);

         const deleteButtons = document.querySelectorAll('.deleteButton');
         deleteButtons.forEach(button => {
             button.addEventListener('click', function() {
                 const row = this.parentNode.parentNode; // Obtém a linha correspondente
                 const saldo = parseFloat(this.getAttribute('data-saldo')); // Obtém o saldo do atributo data
                 row.parentNode.removeChild(row); // Remove a linha da tabela
                 totalSaldo -= saldo; // Soma o saldo ao total
                 document.getElementById('valorTotal').innerText = `R$ ${totalSaldo.toFixed(2)}`;

             });
         });

        document.getElementById('enviarButton').addEventListener('click', function() {

            fetch('URL_DA_SUA_API', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(funcionarios) 
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Erro na requisição: ' + response.statusText);
            })
            .then(data => {
                console.log('Funcionários cadastrados com sucesso:', data);
                alert('Funcionários cadastrados com sucesso!');
            })
            .catch(error => {
                console.error('Erro ao cadastrar funcionários:', error);
                alert('Erro ao cadastrar funcionários. Tente novamente.');
            });
        });
    };

    reader.readAsText(file);
});

