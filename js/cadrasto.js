document.addEventListener("DOMContentLoaded", function () {

    const formulario = document.getElementById("frm-pessoa");

    formulario.addEventListener("submit", function (event) {

        event.preventDefault();

        const usuario = {

            nome: document.getElementById("nome").value.trim(),

            cpf: document.getElementById("cpf").value.trim(),

            telefone: document.getElementById("telefone").value.trim(),

            email: document.getElementById("email").value.trim().toLowerCase(),

            dataNascimento: document.getElementById("dataNascimento").value,

            cep: document.getElementById("cep").value.trim(),

            logradouro: document.getElementById("logradouro").value.trim(),

            numero: document.getElementById("numero").value.trim(),

            complemento: document.getElementById("complemento").value.trim(),

            bairro: document.getElementById("bairro").value.trim(),

            cidade: document.getElementById("cidade").value.trim(),

            estado: document.getElementById("estado").value.trim().toUpperCase(),

            senha: document.getElementById("senha").value,

            novidades: document.getElementById("novidades").checked

        };

        if(

            usuario.nome == "" ||
            usuario.cpf == "" ||
            usuario.telefone == "" ||
            usuario.email == "" ||
            usuario.dataNascimento == "" ||
            usuario.cep == "" ||
            usuario.logradouro == "" ||
            usuario.numero == "" ||
            usuario.bairro == "" ||
            usuario.cidade == "" ||
            usuario.estado == "" ||
            usuario.senha == ""

        ){

            alert("Preencha todos os campos obrigatórios.");

            return;

        }

        let usuarios = JSON.parse(localStorage.getItem("usuarios"));

        if(usuarios == null){

            usuarios = [];

        }

        let existe = false;

        for(let i = 0; i < usuarios.length; i++){

            if(usuarios[i].email == usuario.email){

                existe = true;

                break;

            }

        }

        if(existe){

            alert("Este e-mail já está cadastrado.");

            return;

        }

        usuarios.push(usuario);

        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        alert("Cadastro realizado com sucesso!");

        formulario.reset();

        window.location.href = "login.html";

    });

});