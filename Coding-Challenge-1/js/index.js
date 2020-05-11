console.log("Hola");

function fetchPokemon(getDataInfo){

    let url = "https://pokeapi.co/api/v2/pokemon/"+ getDataInfo;
    let settings = {
        method: 'GET'
    }

    let validation = document.querySelector('.js-search-results');

    fetch(url,settings)
        .then(response => {

            if(response.ok)
            {
                return response.json()
            }
            throw new Error(response.statusText);

        })
        .then(responseJSON => {
            console.log(responseJSON);


            validation.innerHTML = `

                <div> 
                    <h6> Name: ${responseJSON.name} </h6>
                    <p>Sprites: </p>
                    <img src="${responseJSON.sprites.back_default}"></img>
                </div>

            `;

            validation.innerHTML += `<p> Moves: </p>`;
            for(let i= 0 ; i< responseJSON.moves.length; i++)
            {
                validation.innerHTML += `
                <div> 
                    <h6> Move Name: ${responseJSON.moves[i].move.name} </h6>
                </div>

                `;
            }

            validation.innerHTML += `<p> Stats: </p>`;
            for(let i= 0 ; i< responseJSON.stats.length; i++)
            {
                validation.innerHTML += `
                <div> 
                    <h6> Stat Name: ${responseJSON.stats[i].stat.name} </h6>
                </div>

                `;
            }

        })
        .catch(err => {
            console.log("Pokémon not found");
            validation.innerHTML = `

                <div> 
                    <p>Pokemon Not Found</p>
                </div>

            `;
        })


}


function formGetPokemon(){
    let formPokemon = document.querySelector('.js-search-form');

    formPokemon.addEventListener('submit', (event) => {

        event.preventDefault();
        console.log("click");

        let data = document.getElementById("query").value;

        let validation = document.querySelector('.js-search-results');

        if(data === "")
        {
            console.log("Enter a pokemon name or id");
            validation.innerHTML = "<div> Enter a pokemon name or id </div>";
        }
        else
        {
            fetchPokemon(data);
        }


    });

}

function init(){
    formGetPokemon();
}

init();