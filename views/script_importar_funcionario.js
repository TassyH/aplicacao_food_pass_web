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
        const rows = csvData.split('\n').slice(1); // Ignora o cabeçalho
        const tableBody = document.getElementById('tableBody');
        console.log("Iniciando a leitura do arquivo CSV...");        
        tableBody.innerHTML = ''; // Limpa a tabela antes de adicionar novos dados
        let totalSaldo = 0;

        rows.forEach(row => {
            // Verifica se a linha não está vazia
            if (row.trim()) {
                const columns = row.split(',').map(col => col.trim()); // Remove espaços em branco

                // Verifica se a linha tem 4 colunas
                if (columns.length === 4) {
                    const nome = columns[0];
                    const cpf = columns[1];
                    const dataValidadeVR = columns[2];
                    const saldo = parseFloat(columns[3]) || 0; // Converte para número

                    totalSaldo += saldo; // Soma o saldo ao total

                    const newRow = document.createElement('tr');
                    newRow.innerHTML = `
                        <td>${nome}</td>
                        <td>${cpf}</td>
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

        // Atualiza o valor total na tela
        document.getElementById('valorTotal').innerText = `R$ ${totalSaldo.toFixed(2)}`;
        console.log("Leitura do arquivo concluída.");

         // Adiciona evento de exclusão para os botões
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

    };

    reader.readAsText(file);
});