import Funcionario from '../MODEL/Funcionario.js'


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
                    const novoFuncionario = new Funcionario(
                        columns[0], // nome
                        columns[1], // email
                        columns[2], // cpf
                        columns[3], // dataNascimento
                        columns[4], // ativo
                        columns[5], // dataInclusao
                        columns[6], // logradouro
                        columns[7], // bairro
                        columns[8], // cidade
                        columns[9], // estado
                        columns[10], // cep
                        columns[11], // celular
                        columns[12], // id_empresa
                        columns[13], // dataValidadeVR
                        parseFloat(columns[ 14]) || 0 // saldo
                    );
    
                    funcionarios.push(novoFuncionario);

                    totalSaldo += novoFuncionario.saldo; // Corrigido aqui
                    const newRow = document.createElement('tr');
                    newRow.innerHTML = `
                        <td>${novoFuncionario.nome}</td>
                    <td>${novoFuncionario.email}</td>
                    <td>${novoFuncionario.cpf}</td>
                    <td>${novoFuncionario.dataNascimento}</td>
                    <td>${novoFuncionario.ativo}</td>
                    <td>${novoFuncionario.dataInclusao}</td>
                    <td>${novoFuncionario.logradouro}</td>
                    <td>${novoFuncionario.bairro}</td>
                    <td>${novoFuncionario.cidade}</td>
                    <td>${novoFuncionario.estado}</td>
                    <td>${novoFuncionario.cep}</td>
                    <td>${novoFuncionario.celular}</td>
                    <td>${novoFuncionario.id_empresa}</td>
                    <td>${novoFuncionario.dataValidadeVR}</td>
                    <td>R$ ${novoFuncionario.saldo.toFixed(2)}</td>
                    <td><button class="deleteButton" data-saldo="${novoFuncionario.saldo}">Excluir</button></td>
                    `;
                    tableBody.appendChild(newRow);
                } else {
                    console.log("Linha ignorada (não possui 15 colunas):", row);
                }
            }
        });

        document.getElementById('valorTotal').innerText = `R$ ${totalSaldo.toFixed(2)}`;
        console.log("Leitura do arquivo concluída.");
        console.log(rows);

         const deleteButtons = document.querySelectorAll('.deleteButton');
         deleteButtons.forEach(button => {
             button.addEventListener('click', function() {
                 const row = this.parentNode.parentNode; 
                 const saldo = parseFloat(this.getAttribute('data-saldo')); 
                 row.parentNode.removeChild(row); 
                 totalSaldo -= saldo; 
                 document.getElementById('valorTotal').innerText = `R$ ${totalSaldo.toFixed(2)}`;

             });
         });

         const enviarButton = document.getElementById('enviarButton');
         if (enviarButton) {
             enviarButton.addEventListener('click', async function() {
                 if (funcionarios.length === 0) {
                     alert('Nenhum funcionário para enviar.');
                     return;
                 }

                 try {
                    const response = await fetch('http://localhost:3002/novo/cliente', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(funcionarios)
                    });

                    if (!response.ok) {
                        throw new Error('Erro ao enviar os dados: ' + response.statusText);
                    }

                    const result = await response.json();
                    console.log('Dados enviados com sucesso:', result);
                    alert('Funcionários enviados com sucesso!');
                } catch (error) {
                    console.error('Erro ao enviar os dados:', error);
                    alert('Ocorreu um erro ao enviar os dados. Tente novamente.');
                }
            });
        } else {
            console.error('Botão "Enviar" não encontrado no DOM.');
        }
    };

    reader.readAsText(file);
});

