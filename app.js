let listaDeNumerosSorteados = []; // Aqui criamos uma lista vazia para armazenar os números sorteados.
let numeroLimite = 10; // Definimos o limite máximo para os números sorteados.
let numeroSecreto = gerarNumeroAleatorio(); // Chamamos a função para gerar um número aleatório e o atribuímos à variável numeroSecreto.
let tentativas = 1; // Inicializamos o contador de tentativas com o valor 1.

function exibirTextoNaTela(tag, texto) { // Criamos uma função para exibir texto na tela.
    let campo = document.querySelector(tag); // Selecionamos o elemento HTML usando a tag fornecida.
    campo.innerHTML = texto; // Atualizamos o conteúdo desse elemento com o texto fornecido.
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2}); // Utilizamos uma API para falar o texto em voz alta.
}

function exibirMensagemInicial() { // Função para exibir a mensagem inicial do jogo.
    exibirTextoNaTela('h1', 'Jogo do número secreto'); // Chamamos a função exibirTextoNaTela para exibir o título do jogo.
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10'); // Chamamos a função para exibir as instruções.
}

exibirMensagemInicial(); // Chamamos a função para exibir a mensagem inicial assim que o script é carregado.

function verificarChute() { // Função para verificar o número digitado pelo usuário.
    let chute = document.querySelector('input').value; // Capturamos o valor digitado pelo usuário.

    if (chute == numeroSecreto) { // Se o número digitado for igual ao número secreto:
        exibirTextoNaTela('h1', 'Acertou!'); // Exibimos uma mensagem de acerto.
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'; // Verificamos se houve mais de uma tentativa para ajustar a mensagem.
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`; // Mensagem indicando o número de tentativas.
        exibirTextoNaTela('p', mensagemTentativas); // Exibimos a mensagem de tentativas.
        document.getElementById('reiniciar').removeAttribute('disabled'); // Habilitamos o botão para reiniciar o jogo.
    } else { // Se o número digitado não for igual ao número secreto:
        if (chute > numeroSecreto) { // Se o número digitado for maior que o número secreto:
            exibirTextoNaTela('p', 'O número secreto é menor'); // Exibimos uma mensagem indicando que o número secreto é menor.
        } else { // Se o número digitado for menor que o número secreto:
            exibirTextoNaTela('p', 'O número secreto é maior'); // Exibimos uma mensagem indicando que o número secreto é maior.
        }
        tentativas++; // Incrementamos o contador de tentativas.
        limparCampo(); // Chamamos a função para limpar o campo de entrada.
    }
}

function gerarNumeroAleatorio() { // Função para gerar um número aleatório.
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1); // Geramos um número aleatório dentro do limite estabelecido.
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length; // Capturamos a quantidade de elementos na lista de números sorteados.

    if (quantidadeDeElementosNaLista == numeroLimite) { // Se a lista estiver cheia:
        listaDeNumerosSorteados = []; // Esvaziamos a lista.
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) { // Se o número gerado já estiver na lista:
        return gerarNumeroAleatorio(); // Chamamos recursivamente a função para gerar outro número.
    } else { // Se o número gerado não estiver na lista:
        listaDeNumerosSorteados.push(numeroEscolhido); // Adicionamos o número à lista de números sorteados.
        console.log(listaDeNumerosSorteados); // Exibimos a lista de números sorteados no console (para depuração).
        return numeroEscolhido; // Retornamos o número gerado.
    }
}

function limparCampo() { // Função para limpar o campo de entrada.
    chute = document.querySelector('input'); // Selecionamos o campo de entrada.
    chute.value = ''; // Limpa o valor do campo.
}

function reiniciarJogo() { // Função para reiniciar o jogo.
    numeroSecreto = gerarNumeroAleatorio(); // Geramos um novo número secreto.
    limparCampo(); // Chamamos a função para limpar o campo de entrada.
    tentativas = 1; // Reiniciamos o contador de tentativas.
    exibirMensagemInicial(); // Exibimos a mensagem inicial.
    document.getElementById('reiniciar').setAttribute('disabled', true); // Desabilitamos o botão de reiniciar.
}
