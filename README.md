# ⚔️ Arena Pokémon

Uma aplicação web interativa para montar sua própria arena Pokémon! Pesquise Pokémon, consulte informações diretamente na PokéAPI e monte sua equipe de treinadores com cards personalizados.

## ✨ Funcionalidades

- **Busca integrada à PokéAPI:** consulta informações dos Pokémon pelo nome.
- **Preenchimento automático:** identificação do Pokémon e preenchimento de nome, tipo e experiência-base.
- **Identificação por ID:** utiliza o identificador único retornado pela PokéAPI para identificar cada Pokémon cadastrado.
- **Validação de cadastro:** verifica os campos obrigatórios e exige um valor mínimo de 100 no campo de poder.
- **Prevenção de duplicatas:** impede que o mesmo Pokémon seja adicionado mais de uma vez à arena, independentemente de letras maiúsculas ou minúsculas.
- **Cards dinâmicos:** exibe imagem, nome, tipo, valor de poder e treinador responsável.
- **Personalização por tipo:** aplica cores e estilos aos cards de acordo com o tipo do Pokémon, incluindo combinações para Pokémon de dois tipos.
- **Gerenciamento da arena:** permite adicionar e remover Pokémon e atualiza automaticamente o contador de participantes.
- **Busca otimizada:** utiliza debounce e controle de requisições assíncronas para evitar consultas desnecessárias e resultados desatualizados.

## 🛠️ Tecnologias

- HTML5
- CSS3
- JavaScript
- PokéAPI
- Fetch API
- Manipulação do DOM
- Async/Await

## 🔌 API utilizada

O projeto utiliza a [PokéAPI](https://pokeapi.co/) para consultar dados dos Pokémon, incluindo identificador, nome, imagens, tipos e experiência-base.

## 📚 Aprendizados

Durante o desenvolvimento, foram explorados conceitos importantes de JavaScript, como:

- Consumo de APIs externas com `fetch`;
- Funções assíncronas e `async/await`;
- Manipulação dinâmica de elementos HTML;
- Validação de formulários;
- Eventos e delegação de eventos;
- Arrays, objetos e métodos de manipulação;
- Tratamento de erros;
- Controle de requisições e debounce.

## ⚠️ Observação sobre o valor de poder

A versão atual utiliza o atributo `base_experience` da PokéAPI como valor exibido no campo identificado como CP. Esse atributo representa a experiência-base do Pokémon, não o Combat Power oficial dos jogos Pokémon GO.

A validação do formulário exige um valor mínimo de 100, mas a aplicação ainda não realiza uma classificação automática para determinar o Pokémon de maior poder ou escolher um campeão.

## 🚀 Objetivo

O projeto foi desenvolvido como prática de desenvolvimento web, com foco na integração com APIs, lógica de programação e criação de interfaces dinâmicas.

---

<p align="center">Desenvolvido com JavaScript e muita curiosidade pelo universo Pokémon.</p>
