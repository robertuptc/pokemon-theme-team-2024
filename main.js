
document.getElementById('get-pokemon').addEventListener('click', async (event) => {
    try {
        let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
        let responseData = await response.json()

        let firstPokeName = responseData.results[getRandomInt(1303)].name

        let secondResponse  = await fetch(`https://pokeapi.co/api/v2/pokemon/${firstPokeName}`)
        let secondResponseData = await secondResponse.json()

        document.getElementById("main-pokemon-name").innerText = secondResponseData.name
        document.getElementById('main-pokemon-image').src = secondResponseData.sprites.front_default


        const pokemonType = secondResponseData.types[0].type.name
        let thirdResponse = await fetch(`https://pokeapi.co/api/v2/type/${pokemonType}`)
        let thirdResponseData = await thirdResponse.json()


        const RandomPokemonNames = getPokemonNames(thirdResponseData)
        
        // Cleaning container before appending images and titles
        const divContainer = document.getElementById("pokemon-container")
        divContainer.innerHTML = ""; 

        for (let i = 0; i < RandomPokemonNames.length; i++) {
            let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${RandomPokemonNames[i]}`)
            let responseData = await response.json()

            // Creating div
            const divContainer = document.getElementById("pokemon-container")
            const div = document.createElement("div")
            div.id = "pokemon-div"
            divContainer.appendChild(div)
            // Creating p
            const p = document.createElement('p')
            p.id = `pokemon-${i}`
            p.innerHTML = responseData.name
            div.appendChild(p)
            // Creating img
            const img = document.createElement('img')
            img.src = `${responseData.sprites.front_default}`
            img.id = `pokemon-img`
            div.appendChild(img)

        }
    }
    catch (err) {
        console.log(err.message)
    }
})


function getRandomInt(max) {
    return Math.floor(Math.random() * (max - 0) + 0);
}

// Getting 5 random pokemon names
function getPokemonNames(data) {
    const dataLength = data.pokemon.length + 1
    const arrayNames = []
    
    for (let i = 0; i <=4; i++) {
        arrayNames.push(data.pokemon[getRandomInt(dataLength)].pokemon.name)
    }
    return arrayNames
}

