// ARRAY DOS PRODUTOS NO CARRINHO
let itensCarrinho = JSON.parse(sessionStorage.getItem("carrinhoSessao")) || [];

// FUNÇÃO QUE CRIA UM PRODUTO DO CARRINHO
const item = (objProduto) => {

    return {

        id_produto: objProduto.id_produto,
        descricao_produto: objProduto.descricao_produto,
        valor_unitario: objProduto.valor_unitario,
        caminho_imagem: objProduto.caminho_imagem,
        quantidade: 1

    };

};

// FUNÇÃO PARA ADICIONAR PRODUTO
const addItem = (objItem) => {

    const pos = itensCarrinho.findIndex(elem => elem.id_produto == objItem.id_produto);

    if (pos == -1) {

        itensCarrinho.push(item(objItem));

    } else {

        itensCarrinho[pos].quantidade++;

    }

    sessionStorage.setItem("carrinhoSessao", JSON.stringify(itensCarrinho));

};

// FUNÇÃO PARA LISTAR PRODUTOS
const listItens = () => {

    return JSON.parse(sessionStorage.getItem("carrinhoSessao")) || [];

};

// FUNÇÃO PARA REMOVER PRODUTO
const removeItem = (pos) => {

    itensCarrinho.splice(pos, 1);

    sessionStorage.setItem("carrinhoSessao", JSON.stringify(itensCarrinho));

};

//EXPORTAÇÃO
export { addItem, listItens, removeItem };