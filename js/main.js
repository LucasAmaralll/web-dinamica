let listaDeCompras = [];
let indiceEdicao = -1;

// function limpaCampos() {
//     document.getElementById('quantidade').value = 1; // Definindo o valor inicial como 1
// }

function salvar(nomeItem, precoItem, quantidade) {
    //let quantidade = parseInt(document.getElementById('quantidade').value);
    
    // Verifica se a quantidade é válida (maior que 0)
    // if (quantidade <= 0 || isNaN(quantidade)) {
    //     alert("A quantidade deve ser pelo menos 1.");
    //     return;
    // }

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
    //limpaCampos();
}

function aumentarQuantidade(indice) {
    let obj = listaDeCompras[indice];
    unitario = obj.valorTotal / obj.quantidade;
    obj.quantidade = obj.quantidade + 1;
    obj.valorTotal = parseFloat((unitario * obj.quantidade), 0).toFixed(2);
    atualizarTabela();
}

function diminuirQuantidade(indice) {
    let obj = listaDeCompras[indice];
    unitario = obj.valorTotal / obj.quantidade;
    obj.quantidade = obj.quantidade - 1;
    if (obj.quantidade <= 0) {
        obj.quantidade = 1;
        alert("A quantidade deve ser pelo menos 1.");
    }
    obj.valorTotal = parseFloat((unitario * obj.quantidade), 0).toFixed(2);
    atualizarTabela();
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
            <td>
                <button type="button" class="quantidade-btn btn-icone" onclick="diminuirQuantidade(${indice})">-</button>
                ${item.quantidade}
                <button type="button" class="quantidade-btn btn-icone" onclick="aumentarQuantidade(${indice})">+</button>
            </td>
            <td>R$ ${item.valorTotal}</td>
            <td>
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
        <td>
            <button type="button" class="quantidade-btn btn-icone" onclick="diminuirQuantidade(${indice})">-</button>
            ${quantidade}
            <button type="button" class="quantidade-btn btn-icone" onclick="aumentarQuantidade(${indice})">+</button>
        </td>
        <td>R$ ${valorTotal}</td>
        <td>
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
