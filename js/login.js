const formulario = document.getElementById("frm-login");

formulario.addEventListener("submit", fazerLogin);

function fazerLogin(event){

    event.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();

    const senha = document.getElementById("senha").value;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    let usuarioEncontrado = null;

    for(let i = 0; i < usuarios.length; i++){

        if(

            usuarios[i].email === email &&
            usuarios[i].senha === senha

        ){

            usuarioEncontrado = usuarios[i];

            break;

        }

    }

    if(usuarioEncontrado){

        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));

        alert("Login realizado com sucesso!");

        window.location.href = "../index.html";

    }else{

        alert("E-mail ou senha incorretos.");

    }

}