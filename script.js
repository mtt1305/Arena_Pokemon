
 // Dado mocado para teste offline
//  const dados = dadomokado.json(); linha 39

// exemplo
// const dadomokado = {
//     name: 'pikachu',
//     base_experience: 112,
//     types: [
//         { slot: 1, type: { name: 'electric' } }
//     ],
//     sprites: {
//         front_default: './pikachu.png',
//         other: {
//             'official-artwork': {
//                 front_default: './pikachu.png'
//             }
//         }
//     }
// }

const form = document.querySelector('#pokemon');
const feedback = document.querySelector('#feedback');
const listaCards = document.querySelector('#lista-pokemon');
const estadoVazio = document.querySelector('#estado-vazio');
const contador = document.querySelector('#contador');

console.log('script');

const URL_POKEAPI = 'https://pokeapi.co/api/v2/pokemon';

async function buscarDadosPokemon(nome) {
    const nomeFormatado = nome.toLowerCase().trim();

    try {
        const resposta = await fetch(
            `${URL_POKEAPI}/${encodeURIComponent(nomeFormatado)}`
        );

        if (!resposta.ok) {
            throw new Error('Pokemon não encontrado na PokeAPI');
        }

        return await resposta.json();
    } catch (error) {
        console.log(
            'Não foi possível carregar os dados do pokemon solicitado na PokeAPI',
            error
        );
        return null;
    }
}

function extrairImagemPokemon(dadosPokemon) {
    if (!dadosPokemon) {
        console.log('Dados Vazios');
        return null;
    }

    const artWorkOfficial =
        dadosPokemon.sprites?.other?.['official-artwork']?.front_default;

    const spriteDefault = dadosPokemon.sprites?.front_default;

    return artWorkOfficial || spriteDefault || null;
}

function extrairTipoPokemon(dadosPokemon) {
    if (!dadosPokemon || !dadosPokemon.types) {
        console.log('Dados vazios');
        return [];
    }

    return dadosPokemon.types.map(function (item) {
        return item.type.name;
    });
}

function traduzirTipoPokemon(tipo) {
    const traducoes = {
        normal: 'Normal',
        fire: 'Fogo',
        water: 'Água',
        grass: 'Planta',
        electric: 'Elétrico',
        ice: 'Gelo',
        fighting: 'Lutador',
        poison: 'Venenoso',
        ground: 'Terrestre',
        flying: 'Voador',
        psychic: 'Psíquico',
        bug: 'Inseto',
        rock: 'Pedra',
        ghost: 'Fantasma',
        dragon: 'Dragão',
        dark: 'Sombrio',
        steel: 'Metálico',
        fairy: 'Fada'
    };

    const tipos = Array.isArray(tipo) ? tipo : tipo ? [tipo] : [];

    return tipos.map(function (nomeTipo) {
        const nomeMinusculo = nomeTipo.toLowerCase();

        return traducoes[nomeMinusculo] ||
            nomeMinusculo.charAt(0).toUpperCase() + nomeMinusculo.slice(1);
    });
}

function extrairCombatPower(dadosPokemon) {
    if (!dadosPokemon || dadosPokemon.base_experience == null) {
        console.log('Dados vazios');
        return null;
    }

    return dadosPokemon.base_experience;
}

function atualizarArena() {
    const quantidade = listaCards.querySelectorAll('.card-pokemon').length;

    contador.textContent = `${quantidade} Pokémon`;
    estadoVazio.style.display = quantidade === 0 ? '' : 'none';
}

function verificaAntes(nome) {
    console.log('verificando...', nome);

    const cards = listaCards.querySelectorAll('.card-pokemon');
    const nomeFormatado = nome.trim().toLowerCase();

    let existe = false;

    // Array.from(listaCards).some(card=>{
    //            return card.id == id})

    cards.forEach(function (card) {
        if (card.dataset.nome === nomeFormatado) {
            existe = true;
        }
    });

    return existe;
}

// DESAFIO 0: O seletor precisa corresponder ao ID existente no HTML para que o JavaScript encontre a lista e consiga inserir os cards.

// nome,imagem, tipo, xp , treinador = "none"
function criarCardPokemon(
    id,
    nome,
    imagem,
    tipo,
    combatPower,
    treinador = 'Sem treinador'
) {
    const card = document.createElement('div');
    card.className = 'card-pokemon';
    card.setAttribute('id', id);
    card.dataset.nome = nome.trim().toLowerCase();
    card.style.position = 'relative';

    const btnRemover = document.createElement('button');
    btnRemover.type = 'button';
    btnRemover.className = 'btn-remover';
    btnRemover.textContent = '🗑️';
    btnRemover.setAttribute('aria-label', `Remover ${nome} da arena`);
    btnRemover.title = 'Remover Pokémon';
    btnRemover.style.position = 'absolute';
    btnRemover.style.top = '8px';
    btnRemover.style.right = '8px';
    btnRemover.style.zIndex = '1';
    btnRemover.style.width = '40px';
    btnRemover.style.height = '40px';
    btnRemover.style.padding = '0';
    btnRemover.style.display = 'flex';
    btnRemover.style.alignItems = 'center';
    btnRemover.style.justifyContent = 'center';
    btnRemover.style.fontSize = '20px';
    btnRemover.style.lineHeight = '1';
    btnRemover.style.borderRadius = '8px';
    btnRemover.style.cursor = 'pointer';
    btnRemover.style.boxSizing = 'border-box';

    const img = document.createElement('img');
    img.className = 'card-pokemon-img';
    img.src = imagem || 'https://placehold.co/96x96?text=?';
    img.alt = nome;

    const nomeCard = document.createElement('h3');
    nomeCard.className = 'card-pokemon-nome';
    nomeCard.textContent =
        nome.charAt(0).toUpperCase() + nome.slice(1);

    const infoTipo = document.createElement('p');
    infoTipo.className = 'card-pokemon-info';
    infoTipo.textContent =
        `Tipo: ${traduzirTipoPokemon(tipo).join(', ') || 'Desconhecido'}`;

    const cp = document.createElement('p');
    cp.className = 'card-pokemon-info';
    cp.textContent = `CP: ${combatPower ?? '000'}`;

    treinador = treinador && treinador.trim()
        ? treinador.trim()
        : 'Sem treinador';

    const treinadorName = document.createElement('p');
    treinadorName.className = 'card-pokemon-info';
    treinadorName.textContent = `Treinador: ${treinador}`;

    card.append(btnRemover, img, nomeCard, infoTipo, cp, treinadorName);

    // DESAFIO 2: Aplica a borda e o fundo conforme o primeiro tipo do Pokémon.
    aplicarEstiloPorTipo(card, tipo);

    listaCards.appendChild(card);
    atualizarArena();

    console.log(card, img, nomeCard);
}

// DESAFIO 2: Aplica o estilo do card conforme o tipo do Pokémon.
// Adicionei mais cores baseado nas cores originais das cartas).
function aplicarEstiloPorTipo(card, tipo) {
    const estiloCard = {
        fire:     { borda: '#d8223b', fundo: '#ffd6d9' },
        water:    { borda: '#05a8d9', fundo: '#c8effb' },
        grass:    { borda: '#19a648', fundo: '#ccefd7' },
        electric: { borda: '#d4a900', fundo: '#fff0a8' },
        poison:   { borda: '#9146b8', fundo: '#ead4f5' },
        normal:   { borda: '#898787', fundo: '#e8e5e5' },
        fairy:    { borda: '#d6457e', fundo: '#f8d5e5' },
        ghost:    { borda: '#665191', fundo: '#ded5f1' },
        dragon:   { borda: '#4f35a5', fundo: '#e9e5b9' },
        ice:      { borda: '#4fabc4', fundo: '#c9f0f5' },
        fighting: { borda: '#b16232', fundo: '#f1d4c1' },
        ground:   { borda: '#a88732', fundo: '#f0e1b8' },
        flying:   { borda: '#6d7fd1', fundo: '#d6defb' },
        bug:      { borda: '#7a8c16', fundo: '#e4edb9' },
        rock:     { borda: '#8b7840', fundo: '#e8ddc4' },
        steel:    { borda: '#72828c', fundo: '#dce3e8' },
        psychic:  { borda: '#957dab', fundo: '#e7d9f5' },
        dark:     { borda: '#50413f', fundo: '#ded6d4' }
    };

    const padrao = {
        borda: '#7f8c8d',
        fundo: '#ececec'
    };

    const tipos = Array.isArray(tipo) ? tipo : tipo ? [tipo] : [];
    const cor1 = estiloCard[tipos[0]] || padrao;
    const cor2 = tipos[1] ? estiloCard[tipos[1]] : null;

    card.style.border = `3px solid ${cor1.borda}`;

    if (cor2) {
        card.style.background =
            `linear-gradient(135deg, ${cor1.fundo} 50%, ${cor2.fundo} 50%)`;
    } else {
        card.style.background = cor1.fundo;
    }
}

form.addEventListener('submit', async function (event) {
    event.preventDefault(); //impedindo de recarregar a pagina

    const nome = document.querySelector('#nome').value.trim();
    const cp = Number(document.querySelector('#poder').value.trim());
    const treinador = document.querySelector('#treinador').value.trim();

    if (nome.length < 3) {
        feedback.textContent = '❌ Nome deve conter ao menos 3 caracteres.';
        feedback.style.color = 'red';
        return;
    }

    if (!treinador) {
        feedback.textContent = '❌ Informe o nome do treinador.';
        feedback.style.color = 'red';
        return;
    }

    if (!cp || cp < 100) {
        feedback.textContent = '❌ O poder do pokemon precisa ser maior que 100.';
        feedback.style.color = 'red';
        return;
    }

    const dadosApi = await buscarDadosPokemon(nome);

    // DESAFIO 3a: Quando a busca falha, dadosApi é null, exibe o erro e não cria o card.
    if (!dadosApi) {
        feedback.textContent = '❌ O pokemon não foi encontrado.';
        feedback.style.color = 'red';
        return;
    }

    const imagemURL = extrairImagemPokemon(dadosApi);
    const tipoPokemon = extrairTipoPokemon(dadosApi);
    const combatPower = extrairCombatPower(dadosApi);
    const id = dadosApi.id;

    // DESAFIO 3b: Compara os nomes sem diferenciar letras maiúsculas e minúsculas.
    if (verificaAntes(dadosApi.name)) {
        feedback.textContent = '❌ Esse pokemon já está na arena.';
        feedback.style.color = 'red';
        return;
    }

    criarCardPokemon(
        id,
        dadosApi.name,
        imagemURL,
        tipoPokemon,
        combatPower,
        treinador
    );

    feedback.textContent = '✅ Pokemon cadastrado com sucesso.';
    feedback.style.color = 'green';

    form.reset();
    limparCampos();
});

// Um único evento trata a remoção de todos os cards.
listaCards.addEventListener('click', function (event) {
    const btnRemover = event.target.closest('.btn-remover');

    if (!btnRemover) {
        return;
    }

    const card = btnRemover.closest('.card-pokemon');

    if (card) {
        card.remove();
        atualizarArena();
        feedback.textContent = '🗑️ Pokémon removido da arena.';
        feedback.style.color = 'green';
    }
});

function limparCampos() {
    document.querySelector('#nome').value = '';
    document.querySelector('#tipo').value = '';
    document.querySelector('#poder').value = '';
    document.querySelector('#treinador').value = '';
}

const nome = document.querySelector('#nome');
let debounceBusca = null;
let requisicaoAtual = 0;

// ela tambem deve criar o autocomplete
nome.addEventListener('input', function () {
    const valor = nome.value.trim().toLowerCase();

    clearTimeout(debounceBusca);
    requisicaoAtual++;

    if (valor.length < 3) {
        feedback.textContent = '❌ Nome deve conter ao menos 3 caracteres.';
        feedback.style.color = 'red';

        document.querySelector('#tipo').value = '';
        document.querySelector('#poder').value = '';
        return;
    }

    feedback.textContent = '';
    const idRequisicao = requisicaoAtual;

    debounceBusca = setTimeout(async function () {
        console.log(nome.value);

        const dadosApi = await buscarDadosPokemon(nome.value);

        if (idRequisicao !== requisicaoAtual) {
            return;
        }

        if (!dadosApi) {
            feedback.textContent = '❌ O pokemon não foi encontrado.';
            feedback.style.color = 'red';

            document.querySelector('#tipo').value = '';
            document.querySelector('#poder').value = '';
            return;
        }

        const nomePokemon = dadosApi.name || '';
        const tipoPokemon = extrairTipoPokemon(dadosApi);
        const combatPower = extrairCombatPower(dadosApi);

        document.querySelector('#nome').value =
            nomePokemon.charAt(0).toUpperCase() + nomePokemon.slice(1);

        document.querySelector('#tipo').value =
            traduzirTipoPokemon(tipoPokemon).join(', ');

        document.querySelector('#poder').value = combatPower;
    }, 1000);
});

form.addEventListener('reset', function () {
    setTimeout(function () {
        limparCampos();
        feedback.textContent = '';
        feedback.style.color = '';
    }, 0);
});

atualizarArena();