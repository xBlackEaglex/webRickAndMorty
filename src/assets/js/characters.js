const API = 'https://rickandmortyapi.com/api';

const articles = null || document.querySelector(".articles");

const sectionMore = document.querySelector(".sectionMore");

const btn = document.querySelector(".btn");

const more = document.querySelector(".more");

const next = document.querySelector(".next");

const previous = document.querySelector(".previous");

const input = document.querySelector(".input");

var iterator = 0;


next.style.visibility = "hidden";
previous.style.visibility = "hidden";




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


    if (text == "") {
        articles.innerHTML = ``;
        show(API);
        more.style.visibility = "visible";
        next.style.visibility = "hidden";
        previous.style.visibility = "hidden";
    } else {
        try {
            const character = await fetchData(`${urlApi}/character/?name=${text}`);
            

            if (iterator < character.results.length) {
                const episode = await fetchData(character.results[iterator].episode[0]);
                let start = `
                <article class="article">
                <img src="${character.results[iterator].image}" alt="character">
                <div class="content">
                <p id="nom">${character.results[iterator].name}</p>
                <p id="status">${character.results[iterator].status} - ${character.results[iterator].species}</p>
                <p id="textLocation">Last known location:</p>
                <p id="location">${character.results[iterator].location.name}</p>
                <p id="textSeen">First seen in:</p>
                <p id="seen">${episode.name}</p>
                </div>
                </article>
            `;

                if (iterator == 0) {
                    previous.style.visibility = "hidden";
                    next.style.visibility = "visible";
                    more.style.visibility = "hidden";
                }else {
                    next.style.visibility = "visible";
                    previous.style.visibility = "visible";
                    more.style.visibility = "hidden";
                };
                if (character.results.length == 1){
                    next.style.visibility = "hidden";
                }else{

                };

                articles.innerHTML = start;
                //console.log(iterator,character.results.length);

            }
            else {
                previous.style.visibility = "visible";
                next.style.visibility = "hidden";
                more.style.visibility = "hidden";
                iterator --;
            }

        } catch (err) {
            console.error(err);

            let start = `
                    <h1>There is nothing to show</h1>
                `;

            articles.innerHTML = start;

            more.style.visibility = "hidden";
            next.style.visibility = "hidden";
            previous.style.visibility = "hidden";
        }
    }
};


(function () {
    show(API);
})();


input.addEventListener("keyup", function(e) {
    if (e.code === 'Enter') { 
        iterator = 0;
        btn.onclick = search(API);
    }
});

btn.addEventListener("click", function() {
    iterator = 0;
    search(API);
});


more.addEventListener("click", function() {
    show(API);
});

next.addEventListener("click", function() {
    iterator++;
    search(API);
});

previous.addEventListener("click", function() {
    iterator--;
    search(API);
});