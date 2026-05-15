function abrirModal() {
    document.getElementById("overlay").style.display = "flex";
}

function fecharModal() {
    document.getElementById("overlay").style.display = "none";
}

function adicionarContato() {

    let nome = document.getElementById("nome").value;
    let telefone = document.getElementById("telefone").value;
    let email = document.getElementById("email").value;

    if (nome === "" || telefone === "" || email === "") {
        alert("Preencha todos os campos!");
        return;
    }

    let lista = document.getElementById("listaContatos");

    lista.innerHTML += `
        <div class="contato">
            <h3>${nome}</h3>
            <p>📞 ${telefone}</p>
            <p>✉️ ${email}</p>
        </div>
    `;

    document.getElementById("nome").value = "";
    document.getElementById("telefone").value = "";
    document.getElementById("email").value = "";

    fecharModal();
}