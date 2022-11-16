const API = 'https://rickandmortyapi.com/api';

const articles = null || document.querySelector(".articles");

const sectionMore = document.querySelector(".sectionMore");

const btn = document.querySelector(".btn");

const more = document.querySelector(".more");

const input = document.querySelector(".input");




async function fetchData (urlApi){
    const response = await fetch (urlApi);
    const data = response.json();
    return data;
};

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
};






const search = async(urlApi) => {

    var text = input.value;


    if (text == ""){
        articles.innerHTML = ``; 
        show(API);
        sectionMore.style.visibility = 'visible';
    }
    else {

        try {
            const character = await fetchData(`${urlApi}/character/?name=${text}`);

            let start = `
                    <article class="article">
                    <img src="${character.results[0].image}" alt="character">
                    <div class="content">
                    <p id="nom">${character.results[0].name}</p>
                    <p id="status">${character.results[0].status} - ${character.species}</p>
                    <p id="textLocation">Last known location:</p>
                    <p id="location">${character.results[0].location.name}</p>
                    <p id="textSeen">First seen in:</p>
                    <p id="seen">${character.results[0].episode[0].name}</p>
                    </div>
                    </article>
                `;

            articles.innerHTML = start;

            sectionMore.style.visibility = 'hidden';


        } catch (err) {
            console.error(err);

            let start = `
                    <h1>There is nothing to show</h1>
                `;

            articles.innerHTML = start;    

            sectionMore.style.visibility = 'hidden';

        }

    }
};


(function () {
    show(API);
})();


input.addEventListener("keyup", function(e) {
    if (e.code === 'Enter') {
        btn.onclick = search(API);
    }
});

btn.addEventListener("click", function() {
    search(API);
});


more.addEventListener("click", function() {
    show(API);
});