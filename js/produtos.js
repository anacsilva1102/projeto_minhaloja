// IMPORTANDO OS PRODUTOS
import { produtos } from "./lista_produtos.js";


console.log("Produtos Maison Crochê carregado");



// ELEMENTOS DO HTML

const sectionCards = document.querySelector("#cards");

const menuSecoes = document.querySelector("#menu-secoes");

const pesquisa = document.querySelector("#pesquisa");




// MOSTRAR PRODUTOS

const montaCards = (lista) => {


    sectionCards.innerHTML = "";



    lista.forEach((produto)=>{


        let card = document.createElement("div");

        card.className = "card";



        card.innerHTML = `


            <img 
            src="${produto.caminho_imagem}" 
            alt="${produto.descricao_produto}">


            <p>
            ${produto.descricao_produto}
            </p>


            <h2>
            R$ ${parseFloat(produto.valor_unitario)
            .toFixed(2)
            .replace(".",",")}
            </h2>


            <button class="btn-add">
            Adicionar
            </button>


        `;


        let botao = card.querySelector(".btn-add");


        botao.addEventListener("click",()=>{


            adicionarCarrinho(produto);


        });


        sectionCards.appendChild(card);


    });



};


// ADICIONAR AO CARRINHO

const adicionarCarrinho = (produto) => {

    let carrinho = JSON.parse(

        localStorage.getItem("carrinho")

    ) || [];

    // Verifica se o produto já existe no carrinho
    let produtoExiste = carrinho.find(function(item){

        return item.id_produto == produto.id_produto;

    });

    if(produtoExiste){

        produtoExiste.quantidade++;

    }else{

        produto.quantidade = 1;

        carrinho.push(produto);

    }

    localStorage.setItem(

        "carrinho",

        JSON.stringify(carrinho)

    );

    // Redireciona para o carrinho
    window.location.href = "paginas/carrinho.html";

};



// CRIAR MENU DE CATEGORIAS

const criarMenu = ()=>{


    menuSecoes.innerHTML="";



    let secoes = [];



    produtos.forEach((produto)=>{


        if(!secoes.includes(produto.secao)){

            secoes.push(produto.secao);

        }


    });



    let todos = document.createElement("li");


    todos.innerHTML = `

    <a href="#" class="lnk-secao">

    Todos

    </a>

    `;



    todos.addEventListener("click",(e)=>{


        e.preventDefault();

        montaCards(produtos);


    });



    menuSecoes.appendChild(todos);

    secoes.forEach((secao)=>{


        let li = document.createElement("li");


        li.innerHTML = `

        <a href="#" class="lnk-secao">

        ${secao}

        </a>

        `;



        li.addEventListener("click",(e)=>{


            e.preventDefault();



            let filtrados = produtos.filter(

                produto=>produto.secao == secao

            );



            montaCards(filtrados);



        });



        menuSecoes.appendChild(li);



    });



};


// PESQUISA

pesquisa.addEventListener("keyup",()=>{


    let texto = pesquisa.value.toLowerCase();



    let resultado = produtos.filter((produto)=>{


        return produto.descricao_produto
        .toLowerCase()
        .includes(texto);



    });


    montaCards(resultado);


});



// INICIAR PÁGINA


montaCards(produtos);

criarMenu();