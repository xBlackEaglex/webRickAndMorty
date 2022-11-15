const API = 'https://rickandmortyapi.com/api';

const articles = null || document.querySelector(".articles");



async function fetchData (urlApi){
    const response = await fetch (urlApi);
    const data = response.json();
    return data;
}

const show = async(urlApi) => {
    try {


        for (let i = 0; i < 6; i++) {

            const infoCharacters = await fetchData(`${urlApi}/character`);
            const num = await infoCharacters.info.count;
            let numRandom = Math.floor(Math.random() * num);
            const character = await fetchData(`${urlApi}/character/${numRandom}`);
            const episode = await fetchData(character.episode[0]);
            
            let start =`
                <article class="article">
                <img src="${character.image}" alt="character">
                <div class="content">
                <p id="nom">${character.name}</p>
                <p id="status">${character.status} - ${character.species}</p>
                <p id="textLocation">Last known location:</p>
                <p id="location">${character.location.name}</p>
                <p id="textSeen">First seen in:</p>
                <p id="seen">${episode.name}</p>
                </div>
                </article>
            `;

            articles.insertAdjacentHTML('beforeend', start);

        }    

    } catch (err) {
        console.error(err);
    }
}


(function () {
    show(API);
})();

