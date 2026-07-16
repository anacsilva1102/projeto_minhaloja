// IMPORTANDO OS PRODUTOS
import { produtos } from "./lista_produtos.js";

// ELEMENTOS
const sectionCards = document.querySelector("#cards");
const txtPesquisa = document.querySelector("#pesquisa");

// LISTAR PRODUTOS
const listarProdutos = () => {

    montaCards(produtos);

};

// MENU DAS SEÇÕES
const menuSecoes = () => {

    const mapSecoes = new Map();

    produtos.forEach((produto) => {

        mapSecoes.set(produto.id_secao, produto);

    });

    return [...mapSecoes.values()];

};

// CARREGAR MENU
const carregaSecoes = () => {

    const ul = document.querySelector("#menu-secoes");

    ul.innerHTML = "";

    // TODOS
    const liTodos = document.createElement("li");

    const aTodos = document.createElement("a");

    aTodos.setAttribute("href", "#");
    aTodos.setAttribute("class", "lnk-secao");
    aTodos.innerHTML = "Todos";

    aTodos.addEventListener("click", (e) => {

        e.preventDefault();

        montaCards(produtos);

    });

    liTodos.appendChild(aTodos);

    ul.appendChild(liTodos);

    menuSecoes().forEach((secao) => {

        const li = document.createElement("li");

        const a = document.createElement("a");

        a.setAttribute("href", "#");
        a.setAttribute("class", "lnk-secao");
        a.innerHTML = secao.secao;

        a.addEventListener("click", (e) => {

            e.preventDefault();

            const filtro = produtos.filter((produto) => {

                return produto.id_secao == secao.id_secao;

            });

            montaCards(filtro);

        });

        li.appendChild(a);

        ul.appendChild(li);

    });

};

// MONTA OS CARDS
const montaCards = (lista) => {

    sectionCards.innerHTML = "";

    lista.forEach((produto) => {

        const card = document.createElement("div");

        card.setAttribute("class", "card");

        card.innerHTML = `
            <img src="${produto.caminho_imagem}" alt="${produto.descricao_produto}">
            <p>${produto.descricao_produto}</p>
            <h2>R$ ${parseFloat(produto.valor_unitario).toFixed(2).replace(".", ",")}</h2>
            <button class="btn-add">Adicionar</button>
        `;

        const botao = card.querySelector(".btn-add");

        botao.addEventListener("click", () => {

            let carrinho = JSON.parse(sessionStorage.getItem("carrinhoSessao")) || [];

            const existe = carrinho.find((item) => {

                return item.id_produto == produto.id_produto;

            });

            if (existe) {

                existe.quantidade++;

            } else {

                carrinho.push({

                    id_produto: produto.id_produto,
                    descricao_produto: produto.descricao_produto,
                    valor_unitario: produto.valor_unitario,
                    caminho_imagem: produto.caminho_imagem,
                    id_secao: produto.id_secao,
                    secao: produto.secao,
                    quantidade: 1

                });

            }

            sessionStorage.setItem(
                "carrinhoSessao",
                JSON.stringify(carrinho)
            );

            window.location.href = "paginas/carrinho.html";

        });

        sectionCards.appendChild(card);

    });

};

// PESQUISA
if (txtPesquisa) {

    txtPesquisa.addEventListener("keyup", () => {

        const texto = txtPesquisa.value.toLowerCase();

        const resultado = produtos.filter((produto) => {

            return produto.descricao_produto.toLowerCase().includes(texto);

        });

        montaCards(resultado);

    });

}

// INICIAR
listarProdutos();

carregaSecoes();