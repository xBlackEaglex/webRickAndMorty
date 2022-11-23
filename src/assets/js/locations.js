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

            const infoLocations = await fetchData(`${urlApi}/location`);
            const numLocations = await infoLocations.info.count;
            let numRandomLocation = Math.floor(Math.random() * numLocations);
            while (numRandomLocation == 0) {
                numRandomLocation = Math.floor(Math.random() * numLocations);
            };
            const location = await fetchData(`${urlApi}/location/${numRandomLocation}`);
            
            let start =`
                <article class="location">
                <div class="content">
                <p id="nom">${location.name}</p>
                <p id="textLocation">Type:</p>
                <p id="location">${location.type}</p>
                <p id="textSeen">Dimension:</p>
                <p id="seen">${location.dimension}</p>
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
            const location = await fetchData(`${urlApi}/location/?name=${text}`);

            if (iterator < location.results.length) {
                let start = `
                <article class="location">
                <div class="content">
                <p id="nom">${location.results[iterator].name}</p>
                <p id="textLocation">Type:</p>
                <p id="location">${location.results[iterator].type}</p>
                <p id="textSeen">Dimension:</p>
                <p id="seen">${location.results[iterator].dimension}</p>
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
                if (location.results.length == 1){
                    next.style.visibility = "hidden";
                }else{

                };

                articles.innerHTML = start;
                //console.log(iterator,location.results.length);

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