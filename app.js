// Lista para armazenar os nomes dos amigos
let amigos = [];

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

    amigos.forEach((amigo, index) => {
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
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR';
        utterance.rate = 1.2;
        window.speechSynthesis.speak(utterance);
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

// Adicionar evento para confirmar com Enter
const inputAmigo = document.getElementById("amigo");
inputAmigo.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        adicionarAmigo();
    }
});
