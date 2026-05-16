console.log("JS carregou");

const api = "http://localhost:3000/contatos";

function abrirModal() {

    document.getElementById("overlay").style.display = "flex";

}

function fecharModal() {

    document.getElementById("overlay").style.display = "none";

}

async function adicionarContato() {

    let nome = document.getElementById("nome").value;

    let telefone = document.getElementById("telefone").value;

    let email = document.getElementById("email").value;

    if (nome === "" || telefone === "" || email === "") {

        alert("Preencha todos os campos!");

        return;
    }

    const contato = {
        nome: nome,
        telefone: telefone,
        email: email
    };

    await fetch(api, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(contato)

    });

    document.getElementById("nome").value = "";

    document.getElementById("telefone").value = "";

    document.getElementById("email").value = "";

    fecharModal();

    carregarContatos();
}

async function carregarContatos() {

    const resposta = await fetch(api);

    const contatos = await resposta.json();

    let lista = document.getElementById("listaContatos");

    lista.innerHTML = "";

    contatos.forEach(contato => {

        lista.innerHTML += `

            <div class="contato">

                <h3>${contato.nome}</h3>

                <p>📞 ${contato.telefone}</p>

                <p>✉️ ${contato.email}</p>

                <button class="btn-delete"
                    onclick="deletarContato('${contato.id}')">

                    Deletar

                </button>

            </div>

        `;
    });
}

async function deletarContato(id) {

    await fetch(`http://localhost:3000/contatos/${id}`, {

        method: "DELETE"

    });

    carregarContatos();
}

carregarContatos();