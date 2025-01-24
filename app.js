// Lista para armazenar os nomes dos amigos
let amigos = [];
let ultimoTextoFalado = ""; // Variável global para armazenar o último texto falado
let reconhecimentoVoz = null; // Instância global de reconhecimento de voz
let reconhecimentoVozAtivo = false; // Flag para indicar se o reconhecimento de voz está ativo
let synth = window.speechSynthesis; // Instância global de síntese de voz
let voices = []; // Lista de vozes disponíveis

// Função para popular a lista de vozes disponíveis para síntese de fala
function popularListaVozes() {
    voices = synth.getVoices();
    const voiceSelect = document.getElementById("voiceSelect");
    
    if (voiceSelect) {
        voiceSelect.innerHTML = ""; // Limpa a lista de vozes existentes

        voices.forEach((voice) => {
            const option = document.createElement("option");
            option.textContent = `${voice.name} (${voice.lang})`;

            if (voice.default) {
                option.textContent += " -- PADRÃO";
            }

            option.setAttribute("data-lang", voice.lang);
            option.setAttribute("data-name", voice.name);
            voiceSelect.appendChild(option);
        });
    }
}

// Atualizar lista de vozes quando disponível
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = popularListaVozes;
}

// Função para adicionar um nome à lista
function adicionarAmigo() {
    const inputAmigo = document.getElementById("amigo");
    const nome = inputAmigo.value.trim();

    if (nome === "") {
        alert("Por favor, insira um nome válido.");
        falarTexto("Por favor, insira um nome válido.");
        return;
    }

    amigos.push(nome);
    atualizarLista();
    inputAmigo.value = ""; // Limpa o campo de texto após adicionar
    inputAmigo.focus(); // Volta o foco para o campo de entrada
    falarTexto(`Nome ${nome} adicionado à lista.`);
}

// Função para atualizar a lista visível na página
function atualizarLista() {
    const listaAmigos = document.getElementById("listaAmigos");
    listaAmigos.innerHTML = ""; // Limpa a lista antes de atualizá-la

    amigos.forEach((amigo) => {
        const li = document.createElement("li");
        li.textContent = amigo;
        listaAmigos.appendChild(li);
    });
}

// Função para sortear um nome aleatório e usar síntese de voz
function sortearAmigo() {
    if (amigos.length === 0) {
        alert("A lista está vazia. Adicione pelo menos um nome para sortear.");
        falarTexto("A lista está vazia. Adicione pelo menos um nome para sortear.");
        return;
    }

    const indiceSorteado = Math.floor(Math.random() * amigos.length);
    const amigoSorteado = amigos[indiceSorteado];

    const resultado = document.getElementById("resultado");
    resultado.innerHTML = ""; // Limpa o resultado anterior

    const li = document.createElement("li");
    li.textContent = `Amigo sorteado: ${amigoSorteado}`;
    resultado.appendChild(li);

    const texto = `Amigo sorteado: ${amigoSorteado}`;
    falarTexto(texto);

    // Limpar a lista de amigos após o sorteio
    amigos = [];
    atualizarLista();
    falarTexto("Vamos começar um novo sorteio.");
}

// Função para sintetizar texto usando Web Speech API
function falarTexto(texto) {
    if (synth) {
        if (reconhecimentoVozAtivo && reconhecimentoVoz) {
            reconhecimentoVoz.abort();
        }

        ultimoTextoFalado = texto; // Armazena o texto que será falado
        const utterance = new SpeechSynthesisUtterance(texto);
        const voiceSelect = document.getElementById("voiceSelect");

        if (voiceSelect && voiceSelect.selectedOptions.length > 0) {
            const selectedOption = voiceSelect.selectedOptions[0].getAttribute("data-name");
            utterance.voice = voices.find((voice) => voice.name === selectedOption);
        }

        utterance.lang = 'pt-BR';
        utterance.rate = 1.2;

        utterance.onend = function () {
            setTimeout(() => {
                if (reconhecimentoVozAtivo && reconhecimentoVoz) {
                    reconhecimentoVoz.start();
                }
            }, 500);
        };

        synth.speak(utterance);
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

// Função para configurar o reconhecimento de voz
function configurarReconhecimentoVoz() {
    if ('webkitSpeechRecognition' in window) {
        reconhecimentoVoz = new webkitSpeechRecognition();
        reconhecimentoVoz.lang = 'pt-BR';
        reconhecimentoVoz.continuous = false;
        reconhecimentoVoz.interimResults = false;

        reconhecimentoVoz.onstart = function () {
            reconhecimentoVozAtivo = true;
            console.log("Reconhecimento de voz iniciado.");
        };

        reconhecimentoVoz.onresult = function (event) {
            const nomeReconhecido = event.results[0][0].transcript.trim();
        
            console.log("Voz reconhecida:", nomeReconhecido);
        
            // Evita capturar a própria voz do sistema
            if (nomeReconhecido === ultimoTextoFalado) {
                console.log("Texto ignorado porque foi falado pelo sistema.");
                return;
            }
        
            document.getElementById("amigo").value = nomeReconhecido;
            adicionarAmigo();
        };
        
        reconhecimentoVoz.onerror = function (event) {
            console.log("Erro no reconhecimento de voz:", event.error);
        
            // Se o erro for 'no-speech', não faça nada, apenas reinicie
            if (event.error === "no-speech") {
                console.log("Nenhuma fala detectada. Tentando novamente...");
                return;
            }
        
            // Outros erros são exibidos no console, mas sem acionar a fala
        };
        
        reconhecimentoVoz.onend = function () {
            console.log("Reconhecimento de voz finalizado.");
        
            // Reinicia a escuta automaticamente
            setTimeout(() => {
                if (reconhecimentoVozAtivo) {
                    console.log("Reiniciando reconhecimento de voz...");
                    reconhecimentoVoz.start();
                }
            }, 1000);
        };
        
    } else {
        alert("O reconhecimento de voz não é suportado neste navegador.");
        falarTexto("O reconhecimento de voz não é suportado neste navegador.");
    }
}

function capturarNomePorVoz() {
    if (reconhecimentoVoz) {
        falarTexto("Por favor, diga o nome que deseja adicionar.");
        reconhecimentoVoz.start();
    } else {
        alert("O reconhecimento de voz não está configurado corretamente.");
    }
}

function iniciarIntroducao() {
    falarTexto("Bem-vindo ao jogo. Digite o nome a ser adicionado à lista ou use o comando de voz.");
}

configurarReconhecimentoVoz();
popularListaVozes();
iniciarIntroducao();

setTimeout(() => {
    if (reconhecimentoVoz) {
        reconhecimentoVoz.start();
    }
}, 1500);
