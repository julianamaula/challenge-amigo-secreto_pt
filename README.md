<p align="center">
<img width="500" height="300" alt="Imagem representativa de amigo secreto" src="assets/amigo-secreto.png">
</p>
Este é um projeto faz parte de um desafio do curso referente a praticando lógica de programação,  proposto pela Alura uma plataforma online de cursos de tecnologia na turma G8 - ONE. 
O projeto simples de Amigo Secreto que permite adicionar nomes de amigos, sortear um nome aleatório e usar síntese de voz para anunciar o nome sorteado visando as deretrizes da acessibilidade. 
O projeto utiliza HTML, CSS e JavaScript, incluindo a Web Speech API para reconhecimento de voz e síntese de voz.

## Funcionalidades

- Adicionar nomes à lista de amigos.
- Sortear um nome aleatório da lista.
- Anunciar o nome sorteado usando síntese de voz.
- Capturar nomes por voz usando a Web Speech API.
- Limpar a lista de amigos e o nome sorteado para iniciar um novo sorteio.

## Tecnologias Utilizadas

- HTML
- CSS
- JavaScript
- Web Speech API

# 📁 Acesso ao projeto

Você pode [acessar o código fonte inicial](https://github.com/julianamaula/challenge-amigo-secreto_pt)


## Como Usar

1. Clone o repositório para o seu ambiente local:
   ```bash
   git clone https://github.com/seu-usuario/amigo-secreto.git
   ```

2. Navegue até o diretório do projeto:
   ```bash
   cd amigo-secreto
   ```

3. Abra o arquivo `index.html` no seu navegador.

## Estrutura do Projeto

- `index.html`: Arquivo principal HTML que contém a estrutura da página.
- `style.css`: Arquivo CSS para estilização da página.
- `app.js`: Arquivo JavaScript que contém a lógica do aplicativo.

## Funções Principais

### adicionarAmigo()

Adiciona um nome à lista de amigos e atualiza a lista visível na página.

### atualizarLista()

Atualiza a lista de amigos visível na página.

### sortearAmigo()

Sorteia um nome aleatório da lista de amigos e anuncia o nome sorteado usando síntese de voz.

### falarTexto(texto)

Usa a Web Speech API para sintetizar o texto fornecido.

### capturarNomePorVoz()

Captura um nome por voz usando a Web Speech API e adiciona o nome à lista de amigos.

### iniciarNovoSorteio()

Limpa a lista de amigos e o nome sorteado para iniciar um novo sorteio.

## Contribuição

Se você quiser contribuir para este projeto, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).


![GitHub Org's stars](https://img.shields.io/github/stars/juliana?style=social)

