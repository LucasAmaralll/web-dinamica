let listaDeCompras = [];
let indiceEdicao = -1;

function limpaCampos() {
    document.getElementById('quantidade').value = 1; // Definindo o valor inicial como 1
}

function salvar(nomeItem, precoItem) {
    let quantidade = parseInt(document.getElementById('quantidade').value);
    
    // Verifica se a quantidade é válida (maior que 0)
    if (quantidade <= 0 || isNaN(quantidade)) {
        alert("A quantidade deve ser pelo menos 1.");
        return;
    }

    let valorTotal = (precoItem * quantidade).toFixed(2);

    if (indiceEdicao >= 0) {
        let obj = listaDeCompras[indiceEdicao];
        obj.quantidade = quantidade;
        obj.valorTotal = (precoItem * quantidade).toFixed(2); // Atualiza o valor total
        atualizarTabela();
        limpaCampos();
        indiceEdicao = -1;
        return;
    }

    let item = nomeItem;
    adicionarItemAoHTML(item, quantidade, valorTotal, listaDeCompras.length);

    listaDeCompras.push({ item: item, quantidade: quantidade, valorTotal: valorTotal });

    atualizarTotal();
    limpaCampos();
}

function aumentarQuantidade() {
    let quantidadeInput = document.getElementById('quantidade');
    let quantidade = parseInt(quantidadeInput.value);
    quantidadeInput.value = quantidade + 1;
}

function diminuirQuantidade() {
    let quantidadeInput = document.getElementById('quantidade');
    let quantidade = parseInt(quantidadeInput.value);
    if (quantidade > 1) {
        quantidadeInput.value = quantidade - 1;
    }
}

function editarItem(indice) {
    indiceEdicao = indice;
    let obj = listaDeCompras[indice];

    document.getElementById('quantidade').value = obj.quantidade;
    
}

function excluirItem(indice) {
    if (confirm(`Tem certeza que deseja excluir o item ${listaDeCompras[indice].item}`)) {
        listaDeCompras.splice(indice, 1);
        atualizarTabela();
    }
}

function calcularTotal() {
    return listaDeCompras.reduce((total, item) => total + parseFloat(item.valorTotal), 0).toFixed(2);
}

function atualizarTabela() {
    let tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';

    listaDeCompras.forEach((item, indice) => {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.item}</td>
            <td>${item.quantidade}</td>
            <td>R$ ${item.valorTotal}</td>
            <td>
                <button type="button" onclick="editarItem(${indice})" class="material-symbols-outlined btn-icone">edit</button>
                <button type="button" onclick="excluirItem(${indice})" class="material-symbols-outlined btn-icone">delete</button>
            </td>
        `;
        tableBody.appendChild(tr);
    });

    atualizarTotal();
}

function adicionarItemAoHTML(item, quantidade, valorTotal, indice) {
    let tableBody = document.getElementById('table-body');

    // Cria uma nova linha na tabela
    let tr = document.createElement('tr');

    // Define o conteúdo da linha
    tr.innerHTML = `
        <td>${item}</td>
        <td>${quantidade}</td>
        <td>R$ ${valorTotal}</td>
        <td>
            <button type="button" class="material-symbols-outlined btn-icone" onclick="editarItem(${indice})">edit</button>
            <button type="button" class="material-symbols-outlined btn-icone" onclick="excluirItem(${indice})">delete</button>
        </td>
    `;

    // Adiciona a linha à tabela
    tableBody.appendChild(tr);
}

function atualizarTotal() {
    let valorTotal = document.getElementById('valor-total');
    valorTotal.textContent = `R$ ${calcularTotal()}`;
}

// Chame a função para limpar os campos
limpaCampos();
