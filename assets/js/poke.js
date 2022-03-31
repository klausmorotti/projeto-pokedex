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
    for (let i = 1; i <= 100; i++) {
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


function removePokes() {
    for (let i in elementCard) {
        elementCard[i].parentNode.removeChild(element[i]);
    }
}








// Função que mapeia todos os pokemons vindos do json para jogar a informação de cada um na tela 
function showPokes(pokes) {

    pokes.map((poke) => {
        let cardPoke = document.querySelector('.cardPoke').cloneNode(true);

        cardPoke.querySelector('.areaImage img').src = poke.sprites.front_default;
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


        qs('.areaPokes').append(cardPoke);
        // Abrir modal com informações dos pokémons
        cardPoke.addEventListener('click', () => {
            qs('.modalInfoPokes .modalNamePoke').innerHTML = poke.name;
            qs('.areaInfoPokes img').src = poke.sprites.other.dream_world.front_default;

            qs('.modalInfoPokes').style.opacity = 0
            qs('.modalInfoPokes').style.display = 'block';
            setTimeout(() => {
                qs('.modalInfoPokes').style.opacity = 1;
            }, 200)
        })
        // Fechar modal com informações dos pokémons
        qs('.closeModal img').addEventListener('click', () => {
            qs('.modalInfoPokes').style.opacity = 0;
            setTimeout(() => {
                qs('.modalInfoPokes').style.display = 'none';
            }, 200);
        })
    })
    

}


// FUNÇÃO DE FILTRAR POKÉMON PESQUISADO
let form = qs('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    namePoke = qs('input').value;
    // Verificando se o pokémon digitado existe no array de opções, se ele existe, retorna o objeto com suas informações
    pokes.find((poke) => {
        if (poke.name == namePoke) {
            let pokeRequired = poke;
            // Jogando o pokémon buscado na tela caso ele exista 
            let cardPoke = document.querySelector('.cardPoke').cloneNode(true);

            cardPoke.querySelector('.areaImage img').src = poke.sprites.front_default;
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

            qs('.areaPokes').append(cardPoke);
        }
    })
})

// FUNÇÃO DE FILTRO
function filterPoke(value) {
    let namePokesAZ = [];
    let arrayPokesAZ = [];
    let namePokesZA = [];
    let arrayPokesZA = [];
    switch (value) {
        case 'smallestNumber':
            showPokes(pokes);
            break;

        case 'higherNumber':
            let higherNumber = [];
            pokes.map((poke) => {
                higherNumber.push(poke)
            });
            higherNumber.reverse();
            showPokes(higherNumber);
            break;

        case 'a-z':
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

        case 'z-a':
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


