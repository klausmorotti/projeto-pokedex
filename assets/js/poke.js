// ATALHO PARA QUERY SELECTOR
let qs = (el) => {
    return document.querySelector(el);
}
let qsa = (el) => {
    return document.querySelectorAll(el);
}
// VARIÁVEIS GLOBAIS
let pokes = [];
// FAZENDO REQUISIÇÃO E JOGANDO NA TELA
async function getPokes() {
    // Loop for para fazer a requisição do tanto de pokemons existentes 
    for (let i = 1; i <= 150; i++) {
        let urlPokes = `https://pokeapi.co/api/v2/pokemon/${i}`;

        let results = await fetch(urlPokes);
        var json = await results.json();

        // Jogando json com pokemons para dentro de um array para mais fácil manipulação
        pokes.push(json);
    }
    // Chamando a função que joga os dados dos pokemons na tela passando como parâmetro o array de pokemons que nosso json retornou 
    showPokes(pokes);
}
getPokes();
// Função que mapeia todos os pokemons vindos do json para jogar a informação de cada um na tela 
function showPokes(pokes) {
    pokes.map((poke) => {
        // Adicionando as informações dos pokémons exobidos na tela
        let cardPoke = document.querySelector('.cardPoke').cloneNode(true);
        cardPoke.querySelector('.areaImage .imagePoke').src = poke.sprites.front_default;
        let idPoke;
        if (poke.id < 10) {
            idPoke = `00${poke.id}`;
        }
        if (poke.id >= 10 && poke.id < 100) {
            idPoke = `0${poke.id}`;
        }
        if (poke.id >= 100) {
            idPoke = poke.id;
        }
        cardPoke.querySelector('figure figcaption').innerHTML = `Nº ${idPoke}`;
        cardPoke.querySelector('.namePoke').innerHTML = poke.name;
        // Adicionando cor de fundo do poke de acordo com seu tipo
        changeType(poke.types[0].type.name);
        function changeType(firstType) {
            switch (firstType) {
                case 'grass':
                    cardPoke.querySelector('.areaImage').style.backgroundColor = 'rgba(0,250,154,0.2)';
                    break;
                case 'water':
                    cardPoke.querySelector('.areaImage').style.backgroundColor = 'rgba(30,144,255,0.2)';
                    break;
                case 'fire':
                    cardPoke.querySelector('.areaImage').style.backgroundColor = 'rgba(255,0,0,0.2)';
                    break;
                case 'flying':
                    cardPoke.querySelector('.areaImage').style.backgroundColor = 'rgba(131,111,255,0.2)';
                    break;
                case 'normal':
                    cardPoke.querySelector('.areaImage').style.backgroundColor = 'rgba(188,143,143,0.2)';
                    break;
                case 'fighting':
                    cardPoke.querySelector('.areaImage').style.backgroundColor = 'rgba(210,105,30,0.2)';
                    break;
                case 'poison':
                    cardPoke.querySelector('.areaImage').style.backgroundColor = 'rgba(153,50,204,0.2)';
                    break;
                case 'electric':
                    cardPoke.querySelector('.areaImage').style.backgroundColor = 'rgba(255,255,0,0.2)';
                    break;
                case 'ground':
                    cardPoke.querySelector('.areaImage').style.backgroundColor = 'rgba(205,133,63,0.2)';
                    break;
                case 'rock':
                    cardPoke.querySelector('.areaImage').style.backgroundColor = 'rgba(128,128,128,0.2)';
                    break;
                case 'psychic':
                    cardPoke.querySelector('.areaImage').style.backgroundColor = 'rgba(255,0,255,0.2)';
                    break;
                case 'ice':
                    cardPoke.querySelector('.areaImage').style.backgroundColor = 'rgba(173,216,230,0.2)';
                    break;
                case 'bug':
                    cardPoke.querySelector('.areaImage').style.backgroundColor = 'rgba(0,128,0,0.2)';
                    break;
                case 'ghost':
                    cardPoke.querySelector('.areaImage').style.backgroundColor = 'rgba(75,0,130,0.2)';
                    break;
                case 'steel':
                    cardPoke.querySelector('.areaImage').style.backgroundColor = 'rgba(64,224,208,0.2)';
                    break;
                case 'dragon':
                    cardPoke.querySelector('.areaImage').style.backgroundColor = 'rgba(0,139,139,0.2)';
                    break;
                case 'dark':
                    cardPoke.querySelector('.areaImage').style.backgroundColor = 'rgba(28,28,28,0.2)';
                    break;
                case 'fairy':
                    cardPoke.querySelector('.areaImage').style.backgroundColor = 'rgba(255,182,193,0.2)';
                    break;
            }
        }
        // Jogando o card na tela com as informações ja preenchidas
        qs('.areaPokes').append(cardPoke);


        // Ao clicar no card, abgre o modal com as informações do poke
            cardPoke.addEventListener('click', () => {
            qs('.areaPokes').style.display = 'none';
            qs('.modalInfoPokes').style.display = 'flex';
            qs('.modalInfoPokes .areaTop').style.backgroundColor = cardPoke.querySelector('.areaImage').style.backgroundColor;
            // Adiocionando nome do pokémon
            qs('.modalInfoPokes .name').innerHTML = poke.name;
            // Adicionando tipos do pokémon
            qs('.types').innerHTML = '';
            poke.types.map((typePoke) => {
                let type = document.createElement('div');
                type.classList.add('type');
                type.innerHTML = typePoke.type.name;
                qs('.types').append(type);
            })
            // Adicionando id do pokémon 
            qs('.areaName .id').innerHTML = `#${idPoke}`;
            // Adicionando imagem do pokémon
            qs('.areaBottom img').src = poke.sprites.other.home.front_default;
            // Adicionando as características dos pokémons
            qs('.areaBottom .stats').innerHTML = '';
            // puxando um objeto com o nome da caracteristica e o valor para um array
            let stats = [];
            poke.stats.map((item) => {
                stats.push({
                    nameStat:item.stat.name,
                    valueStat:item.base_stat
                })
            })
            // mapeando o array com o nome e caracteristicas e jogando na tela
            for( let i = 0; i <= 5; i++ ) {
                let stat = document.createElement('div');
                stat.classList.add('descInfo');
                stat.innerHTML = `${stats[i].nameStat}: <span>${stats[i].valueStat}</span>`;
                qs('.areaBottom .stats').append(stat);
            }
            // Adicionando as habilidades do pokémon
            qs('.areaBottom .abilities').innerHTML = '';
            // caso pokémon tenha duas habilidades, adicione as duas 
            if ( poke.abilities.length > 1 ) {
                for( let i = 0; i <= 1; i++ ) {
                    let ability = document.createElement('div');
                    ability.classList.add('descInfo');
                    ability.innerHTML = poke.abilities[i].ability.name;
                    qs('.areaBottom .abilities').append(ability);
                }
            }
            // caso pokémon tenha uma habilidade, adicione essa 
            if ( poke.abilities.length == 1 ) {
                let ability = document.createElement('div');
                ability.classList.add('descInfo');
                ability.innerHTML = poke.abilities[0].ability.name;
                qs('.areaBottom .abilities').append(ability);
            }
            // Adicionando movimentos principais do pokémon
            qs('.areaBottom .moves').innerHTML = '';
            for( let i = 0; i <= 3; i++ ) {
                let move = document.createElement('div');
                move.classList.add('descInfo');
                move.innerHTML = poke.moves[i].move.name;
                qs('.areaBottom .moves').append(move);
            }
            // Adicionando as informações gerais do pokémon (peso, altura e experiência)
            qs('.areaBottom .moreInfo').innerHTML = '';
            let moreInfo = [];
            let heightPoke = poke.height * 0.1;
            heightPoke = `Altura: <span>${heightPoke.toFixed(2)}m</span>`;
            let weightPoke = poke.weight * 0.1;
            weightPoke = `Peso: <span>${weightPoke.toFixed(1)}Kg</span>`;
            let expPoke = `Experiência: <span>${poke.base_experience}</span>`;
            moreInfo.push(heightPoke, weightPoke, expPoke);
            for( let i in moreInfo ) {
                let info = document.createElement('div');
                info.classList.add('descInfo');
                info.innerHTML = moreInfo[i];
                qs('.areaBottom .moreInfo').append(info);
            }
        })
        // Fechar modal com informações dos pokémons
        qs('.modalInfoPokes .close').addEventListener('click', () => {
            qs('.areaPokes').style.display = 'grid';
            qs('.modalInfoPokes').style.display = 'none';
        })

    })
}
// FILTRANDO POKÉMONS
// Filtro (Menor até maior, maior ate menor, A-Z, Z-A)
function filterPoke(value) {
    /* Varíaveis para filtrar os pokes de A-Z, Z-A pegando o nome de cada, ordenando por ordem alfabética e verificando se há algum poke com aquele nome, se houver me retorne e puxe para o array */
    let namePokesAZ = [];
    let arrayPokesAZ = [];
    let namePokesZA = [];
    let arrayPokesZA = [];
    switch (value) {
        // menor para maior
        case 'smallestNumber':
            if( qsa('.areaPokes .cardPoke').length > 0 ) {
                removePokes();
            }
            showPokes(pokes);
            break;
            // maior para menor
        case 'higherNumber':
            // Caso o pokemon pesquisado não exista e eu tentar filtrar por um desses casos, eu nao removo nada pois nao há nada na tela, pois o valor digitado anteriormente nao existia entao nada foi adicionado sendo assim dara erro ao tentar remover algo
            if( qsa('.areaPokes .cardPoke').length > 0 ) {
                removePokes();
            }
            let higherNumber = [];
            pokes.map((poke) => {
                higherNumber.push(poke)
            });
            higherNumber.reverse();
            showPokes(higherNumber);
            break;
            // A-Z
        case 'a-z':
            if( qsa('.areaPokes .cardPoke').length > 0 ) {
                removePokes();
            }
            pokes.map((item) => {
                namePokesAZ.push(item.name);
                namePokesAZ.sort();
            });
            namePokesAZ.map((name) => {
                let poke = pokes.find((poke) => {
                    return name == poke.name;
                })
                arrayPokesAZ.push(poke);
            });
            showPokes(arrayPokesAZ);
            break;
            //Z-A
        case 'z-a':
            if( qsa('.areaPokes .cardPoke').length > 0 ) {
                removePokes();
            }
            pokes.map((item) => {
                namePokesZA.push(item.name);
                namePokesZA.sort();
                namePokesZA.reverse();
            });
            namePokesZA.map((name) => {
                let poke = pokes.find((poke) => {
                    return name == poke.name;
                })
                arrayPokesZA.push(poke);
            })
            showPokes(arrayPokesZA);
            break;
    }
}
// Filtrando pela lupa de pesquisa
let form = qs('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    let namePoke = qs('input').value;
    /* quando pesquisado Remove os outros pokémons apenas se ja existir um na tela caso nao tenha nenhum e o usuario digite um existente, não removerá nada, so retornará o que foi buscado */
    if ( qsa('.areaPokes .cardPoke').length > 0 ) {
        removePokes();
    }
    // Verificando se o pokémon digitado existe no array de opções, se ele existe, retorna o objeto com suas informações
    let pokeSelected = [];
    pokes.find((poke) => {
        if (poke.name == namePoke) {
            qs('.warning').style.display = 'none';
            // Jogando o pokémon buscado na tela caso ele exista 
            pokeSelected.push(poke);
            showPokes(pokeSelected);
        } 
    })
    // Se o poke digitado não existe dê o aviso
    if ( pokeSelected.length == 0 ) {
        qs('.warning').innerHTML = 'Desculpe, Pokémon não encontrado.';
        qs('.warning').style.display = 'block'
    }
})
// FUNÇÃO QUE REMOVE POKES
function removePokes() { 
    // Pegando todos os cards para verificar quantos existem e dar um loop nessa quantidade para remover todos
    let cardsPoke = qsa('.areaPokes .cardPoke');
    // Caso tenha 150 cards, ou seja, estiver em ordem (menor para maior, maior para menor, A-Z, Z-A), remover todos
    if( cardsPoke.length == 150 ) {
        for( let i = 0; i <= 149; i++ ) {
            cardsPoke[i].remove();
        }
    // Caso tenha só 1 card, ou seja, o pokémon foi filtrado por procura na lupa retornando apenas 1, removo apenas esse 1
    } else {
        for( let i = 0; i <= 0; i++ ) {
            cardsPoke[i].remove();
        }
    }
}
