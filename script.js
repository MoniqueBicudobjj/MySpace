const botaoMenu = document.getElementById("botaoMenu");
const menu = document.getElementById("menu");

const botaoComecar = document.getElementById("botaoComecar");

const formTarefa = document.getElementById("formTarefa");
const nomeTarefa = document.getElementById("nomeTarefa");

const listaTarefas = document.getElementById("listaTarefas");
const contador = document.getElementById("contador");
const resumoContador = document.getElementById("resumoContador");

const listaVazia = document.getElementById("listaVazia");

const botoesCor = document.querySelectorAll(".cor");
const mensagemCor = document.getElementById("mensagemCor");


// =====================================
// 1. ABRIR E FECHAR O MENU
// =====================================

botaoMenu.addEventListener("click", function () {

    const aberto = menu.classList.toggle("menu-aberto");

    botaoMenu.setAttribute(
        "aria-expanded",
        String(aberto)
    );

    botaoMenu.setAttribute(
        "aria-label",
        aberto ? "Fechar menu" : "Abrir menu"
    );

    botaoMenu.textContent = aberto ? "×" : "☰";

});


// Fecha o menu depois de clicar em uma opção

menu.querySelectorAll("a").forEach(function (link) {

    link.addEventListener("click", function () {

        menu.classList.remove("menu-aberto");

        botaoMenu.setAttribute("aria-expanded", "false");

        botaoMenu.setAttribute("aria-label", "Abrir menu");

        botaoMenu.textContent = "☰";

    });

});


// =====================================
// 2. BOTÃO COMEÇAR AGORA
// =====================================

botaoComecar.addEventListener("click", function () {

    document.getElementById("tarefas").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    window.setTimeout(function () {

        nomeTarefa.focus({
            preventScroll: true
        });

    }, 350);

});


// =====================================
// 3. ATUALIZAR CONTADORES
// =====================================

function atualizarContador() {

    const itens = Array.from(listaTarefas.children);

    const pendentes = itens.filter(function (item) {

        return !item.classList.contains("concluida");

    }).length;

    const total = itens.length;

    contador.textContent =
        `Você tem ${pendentes} tarefa(s) pendente(s) de ${total}.`;

    resumoContador.textContent = String(pendentes);

    listaVazia.classList.toggle("oculta", total > 0);

}


// =====================================
// 4. CRIAR UMA TAREFA
// =====================================

function criarTarefa(texto) {

    const item = document.createElement("li");

    const textoItem = document.createElement("span");

    const acoes = document.createElement("div");

    const botaoConcluir = document.createElement("button");

    const botaoExcluir = document.createElement("button");


    // Texto da tarefa

    textoItem.className = "texto-tarefa";

    textoItem.textContent = texto;


    // Área dos botões

    acoes.className = "acoes-tarefa";


    // Botão para concluir

    botaoConcluir.type = "button";

    botaoConcluir.className =
        "botao-acao botao-concluir";

    botaoConcluir.textContent = "✓";

    botaoConcluir.setAttribute(
        "aria-label",
        `Concluir tarefa: ${texto}`
    );

    botaoConcluir.title = "Concluir ou reabrir tarefa";


    // Botão para excluir

    botaoExcluir.type = "button";

    botaoExcluir.className =
        "botao-acao botao-excluir";

    botaoExcluir.textContent = "×";

    botaoExcluir.setAttribute(
        "aria-label",
        `Excluir tarefa: ${texto}`
    );

    botaoExcluir.title = "Excluir tarefa";


    // =====================================
    // CONCLUIR OU REABRIR TAREFA
    // =====================================

    botaoConcluir.addEventListener("click", function () {

        const concluida = item.classList.toggle("concluida");

        textoItem.classList.toggle(
            "tarefa-concluida",
            concluida
        );

        botaoConcluir.textContent =
            concluida ? "↩" : "✓";

        botaoConcluir.setAttribute(
            "aria-label",
            `${concluida ? "Reabrir" : "Concluir"} tarefa: ${texto}`
        );

        atualizarContador();

    });


    // =====================================
    // EXCLUIR TAREFA
    // =====================================

    botaoExcluir.addEventListener("click", function () {

        item.remove();

        atualizarContador();

    });


    // Organizando os elementos

    acoes.append(
        botaoConcluir,
        botaoExcluir
    );

    item.append(
        textoItem,
        acoes
    );

    listaTarefas.appendChild(item);

}


// =====================================
// 5. VALIDAR E ADICIONAR TAREFA
// =====================================

formTarefa.addEventListener("submit", function (evento) {

    evento.preventDefault();

    const texto = nomeTarefa.value.trim();


    // Validação para não aceitar campo vazio

    if (!texto) {

        alert("Digite o nome da tarefa antes de adicionar.");

        nomeTarefa.focus();

        return;

    }


    // Criar a tarefa

    criarTarefa(texto);


    // Limpar o formulário

    formTarefa.reset();


    // Atualizar o contador

    atualizarContador();


    // Preparar o campo para a próxima tarefa

    nomeTarefa.focus();

});


// =====================================
// 6. TROCAR AS CORES DO APLICATIVO
// =====================================

botoesCor.forEach(function (botao) {

    botao.addEventListener("click", function () {

        const fundo = botao.dataset.cor;

        const destaque = botao.dataset.destaque;


        // Alterar as cores principais

        document.documentElement.style.setProperty(
            "--fundo",
            fundo
        );

        document.documentElement.style.setProperty(
            "--destaque",
            destaque
        );


        // Definir uma cor escura para cada tema

        const coresEscuras = {

            "#b45c86": "#914369",

            "#8870b5": "#66508f",

            "#568bb8": "#356b98"

        };


        document.documentElement.style.setProperty(
            "--destaque-escuro",
            coresEscuras[destaque] || "#914369"
        );


        // Mostrar qual tema está selecionado

        botoesCor.forEach(function (outroBotao) {

            const selecionado = outroBotao === botao;

            outroBotao.classList.toggle(
                "selecionada",
                selecionado
            );

            outroBotao.setAttribute(
                "aria-pressed",
                String(selecionado)
            );

        });


        // Mensagem de confirmação

        mensagemCor.textContent =
            "Tema alterado com sucesso! ✨";

    });

});


// =====================================
// 7. INICIALIZAR O APLICATIVO
// =====================================

atualizarContador();
