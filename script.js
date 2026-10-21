const botaoMenu = document.getElementById("botaoMenu");
const menu = document.getElementById("menu");

const botaoComecar = document.getElementById("botaoComecar");

const formTarefa = document.getElementById("formTarefa");
const nomeTarefa = document.getElementById("nomeTarefa");

const listaTarefas = document.getElementById("listaTarefas");
const contador = document.getElementById("contador");

const botoesCor = document.querySelectorAll(".cor");
const mensagemCor = document.getElementById("mensagemCor");

let quantidadeTarefas = 0;


// 2. Abrir e fechar o menu

botaoMenu.addEventListener("click", function () {

    menu.classList.toggle("menu-aberto");

});


// 3. Ir para a área de tarefas

botaoComecar.addEventListener("click", function () {

    document.getElementById("tarefas").scrollIntoView({
        behavior: "smooth"
    });

    nomeTarefa.focus();

});


// 4. Atualizar o contador de tarefas

function atualizarContador() {

    const tarefasPendentes = listaTarefas.querySelectorAll(
        "li:not(.concluida)"
    ).length;

    const totalTarefas = listaTarefas.children.length;

    quantidadeTarefas = tarefasPendentes;

    contador.textContent =
        `Você tem ${quantidadeTarefas} tarefa(s) pendente(s) de ${totalTarefas}.`;

}


// 5. Adicionar tarefas

formTarefa.addEventListener("submit", function (evento) {

    evento.preventDefault();

    const texto = nomeTarefa.value.trim();

    // Validação: não permite tarefa vazia

    if (texto === "") {

        alert("Por favor, digite o nome de uma tarefa!");

        nomeTarefa.focus();

        return;

    }

    // Criando os elementos da tarefa

    const item = document.createElement("li");

    const textoItem = document.createElement("span");

    textoItem.classList.add("texto-tarefa");

    textoItem.textContent = texto;

    const acoes = document.createElement("div");

    acoes.classList.add("acoes-tarefa");

    // Botão para concluir

    const botaoConcluir = document.createElement("button");

    botaoConcluir.type = "button";

    botaoConcluir.textContent = "✓";

    botaoConcluir.classList.add(
        "botao-acao",
        "botao-concluir"
    );

    botaoConcluir.setAttribute(
        "aria-label",
        "Concluir tarefa"
    );

    // Botão para excluir

    const botaoExcluir = document.createElement("button");

    botaoExcluir.type = "button";

    botaoExcluir.textContent = "✕";

    botaoExcluir.classList.add(
        "botao-acao",
        "botao-excluir"
    );

    botaoExcluir.setAttribute(
        "aria-label",
        "Excluir tarefa"
    );

    // Interação para concluir uma tarefa

    botaoConcluir.addEventListener("click", function () {

        item.classList.toggle("concluida");

        textoItem.classList.toggle("tarefa-concluida");

        if (item.classList.contains("concluida")) {

            botaoConcluir.textContent = "↩";

            botaoConcluir.setAttribute(
                "aria-label",
                "Reabrir tarefa"
            );

        } else {

            botaoConcluir.textContent = "✓";

            botaoConcluir.setAttribute(
                "aria-label",
                "Concluir tarefa"
            );

        }

        atualizarContador();

    });

    // Interação para excluir uma tarefa

    botaoExcluir.addEventListener("click", function () {

        item.remove();

        atualizarContador();

    });

    // Organizando os elementos

    acoes.appendChild(botaoConcluir);

    acoes.appendChild(botaoExcluir);

    item.appendChild(textoItem);

    item.appendChild(acoes);

    listaTarefas.appendChild(item);

    // Limpando o campo

    nomeTarefa.value = "";

    nomeTarefa.focus();

    atualizarContador();

});


// 6. Trocar a cor do aplicativo

botoesCor.forEach(function (botao) {

    botao.addEventListener("click", function () {

        const novaCor = botao.dataset.cor;

        document.body.style.backgroundColor = novaCor;

        mensagemCor.textContent =
            "Cor alterada com sucesso! ✨";

    });

});


// 7. Mensagem inicial no contador

atualizarContador();
