// Usamos a janela global (window) para garantir que a variável persista na memória da página
if (window.pontosTotais === undefined) {
    window.pontosTotais = 0;
}

function computarPontuacao() {
    // 1. Captura os elementos do HTML pelo ID exato
    var campoAtividade = document.getElementById("selectAtividade");
    var campoToken = document.getElementById("codigoToken");
    
    var txtTotalPontos = document.getElementById("totalPontos");
    var txtSaldoReais = document.getElementById("saldoReais");

    // 2. Captura os valores digitados/selecionados
    var atividade = campoAtividade.value;
    var token = campoToken.value;

    // Se o usuário não digitou o código físico, o código para aqui
    if (token == "") {
        alert("Por favor, digite o Código Único!");
        return;
    }

    var pontosAtuais = 0;

    // 3. Verifica qual atividade foi selecionada e define os pontos
    if (atividade == "Transporte Público") {
        pontosAtuais = 40;
    }
    if (atividade == "ECO Ponto") {
        pontosAtuais = 30;
    }
    if (atividade == "Doação de Sangue") {
        pontosAtuais = 10000;
    }
    if (atividade == "Participação em Projetos Sociais") {
        pontosAtuais = 400;
    }

    // Se ele não escolheu nenhuma atividade da lista, para aqui
    if (pontosAtuais == 0) {
        alert("Por favor, selecione uma atividade realizada!");
        return;
    }

    // 4. Processamento matemático
    window.pontosTotais = window.pontosTotais + pontosAtuais;
    var resultadoReais = window.pontosTotais * 0.009;

    // 5. Injeção direta nos seletores da tela
    txtTotalPontos.innerText = window.pontosTotais + " pts";
    txtSaldoReais.innerText = "R$ " + resultadoReais.toFixed(2);

    // 6. Limpa o campo de texto do token para o próximo registro
    campoToken.value = "";
}