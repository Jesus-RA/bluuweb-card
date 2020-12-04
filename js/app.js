
const random = (min, max) => Math.floor( Math.random() * (max - min) ) + min

const fetchData = async (id) => {
    try{

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = await response.json()
        
        const pokemon = {
            name: data.name,
            image : data.sprites.other.dream_world.front_default,
            hp : data.stats[0].base_stat,
            experience : data.base_experience,
            attack : data.stats[1].base_stat,
            special : data.stats[2].base_stat,
            defense: data.stats[3].base_stat
        }

        printCard(pokemon)

    }catch(error){
        console.log(error)
    }
}

const printCard = (pokemon) => {

    // Donde irá el template
    const main = document.querySelector('.flex')
    // Capturamos el template
    const template = document.getElementById('template-card').content
    // Clonamos el template
    const clone = template.cloneNode(true)
    // Creamos un fragment
    const fragment = document.createDocumentFragment()
    
    // Cargamos toda la información del Pokemon
    clone.querySelector('.card-body-img').setAttribute('src', pokemon.image)
    clone.querySelector('.card-body-title').innerHTML = `
        ${pokemon.name}
        <span>${pokemon.hp} hp</span>
    `
    clone.querySelector('.card-body-text').textContent = pokemon.experience + ' Exp'
    clone.querySelectorAll('.card-footer-social h3')[0].textContent = pokemon.attack + ' K'
    clone.querySelectorAll('.card-footer-social h3')[1].textContent = pokemon.special + ' K'
    clone.querySelectorAll('.card-footer-social h3')[2].textContent = pokemon.defense + ' K'

    // Lo anexamos al fragment
    fragment.appendChild(clone)

    // Y lo pasamos al main
    main.appendChild(fragment)

}

document.addEventListener('DOMContentLoaded', () => {

    const id = random(1, 151)

    fetchData(id)

})