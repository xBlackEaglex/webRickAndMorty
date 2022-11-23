const API = 'https://rickandmortyapi.com/api';

const articles = null || document.querySelector(".articles");



async function fetchData (urlApi){
    const response = await fetch (urlApi);
    const data = response.json();
    return data;
}

const show = async(urlApi) => {
    try {


            const infoCharacters = await fetchData(`${urlApi}/character`);
            const numCharacters = await infoCharacters.info.count;
            let numRandom = Math.floor(Math.random() * numCharacters);
            while (numRandom == 0) {
                numRandom = Math.floor(Math.random() * numCharacters);
            };
            const character = await fetchData(`${urlApi}/character/${numRandom}`);
            const episode = await fetchData(character.episode[0]);

            const infoLocations = await fetchData(`${urlApi}/location`);
            const numLocations = await infoLocations.info.count;
            let numRandomLocation = Math.floor(Math.random() * numLocations);
            while (numRandomLocation == 0) {
                numRandomLocation = Math.floor(Math.random() * numLocations);
            };
            const location = await fetchData(`${urlApi}/location/${numRandomLocation}`);
            
            const infoEpisodes = await fetchData(`${urlApi}/episode`);
            const numEpisodes = await infoEpisodes.info.count;
            let numRandomEpisode = Math.floor(Math.random() * numEpisodes);
            while (numRandomEpisode == 0) {
                numRandomEpisode = Math.floor(Math.random() * numEpisodes);
            };
            const showEpisode = await fetchData(`${urlApi}/episode/${numRandomEpisode}`);
            
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

                <article class="location">
                <div class="content">
                <p id="nom">${location.name}</p>
                <p id="textLocation">Type:</p>
                <p id="location">${location.type}</p>
                <p id="textSeen">Dimension:</p>
                <p id="seen">${location.dimension}</p>
                </div>
                </article>

                <article class="episode">
                <div class="content">
                <p id="nom">${showEpisode.name}</p>
                <p id="textLocation">Air Date:</p>
                <p id="location">${showEpisode.air_date}</p>
                <p id="textSeen">Episode:</p>
                <p id="seen">${showEpisode.episode}</p>
                </div>
                </article>
            `;

            articles.innerHTML = start;
    
    } catch (err) {
        console.error(err);
    }
}


(function () {
    show(API);
})();

