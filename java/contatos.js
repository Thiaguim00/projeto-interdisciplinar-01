console.log("JS carregou");

const api = "http://localhost:3000/contatos";

let contatoEditando = null;

/* MODAL */

function abrirModal() {

    document.getElementById("overlay").style.display = "flex";
}

function fecharModal() {

    document.getElementById("overlay").style.display = "none";

    document.getElementById("nome").value = "";
    document.getElementById("telefone").value = "";
    document.getElementById("email").value = "";

    contatoEditando = null;
}

/* ADICIONAR OU EDITAR */

async function adicionarContato() {

    let nome = document.getElementById("nome").value.trim();

    let telefone = document.getElementById("telefone").value.trim();

    let email = document.getElementById("email").value.trim();

    if (!nome || !telefone || !email) {

        alert("Preencha todos os campos!");

        return;
    }

    const contato = {

        nome,
        telefone,
        email
    };

    if (contatoEditando) {

        await fetch(`${api}/${contatoEditando}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(contato)
        });

    } else {

        await fetch(api, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(contato)
        });
    }

    fecharModal();

    carregarContatos();
}

/* LISTAR */

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

                <div class="acoes">

                    <button
                        class="btn-edit"
                        onclick="editarContato('${contato.id}')">

                        Editar

                    </button>

                    <button
                        class="btn-delete"
                        onclick="deletarContato('${contato.id}')">

                        Deletar

                    </button>

                </div>

            </div>

        `;
    });
}

/* EDITAR */

async function editarContato(id) {

    const resposta = await fetch(`${api}/${id}`);

    const contato = await resposta.json();

    document.getElementById("nome").value = contato.nome;

    document.getElementById("telefone").value = contato.telefone;

    document.getElementById("email").value = contato.email;

    contatoEditando = id;

    abrirModal();
}

/* DELETAR */

async function deletarContato(id) {

    if (!confirm("Deseja realmente excluir este contato?")) {

        return;
    }

    await fetch(`${api}/${id}`, {

        method: "DELETE"
    });

    carregarContatos();
}

/* INICIAR */

carregarContatos();