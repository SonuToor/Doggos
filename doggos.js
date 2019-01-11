const dogListGen = 'https://dog.ceo/api/breeds/list/all';
const randomDoggo = "https://dog.ceo/api/breeds/image/random";

const doggos = document.querySelector(".doggos");
const selectMenu = document.getElementById("inputGroupSelect01");
const breedSelectButton = document.getElementById("selectedoggobutton");
const randomDoggoButton = document.getElementById("randomdoggobutton");
const doggoInfoButton = document.getElementById("doggoinfobutton");

breedSelectButton.addEventListener('click', addNewDoggo);
randomDoggoButton.addEventListener('click', addRandomDoggo);
doggoInfoButton.addEventListener('click', displayDoggoInfo);

fetch(dogListGen)
    .then((resp) => resp.json())
    .then(function(data) {
        const breeds = data.message
        for (key in breeds) {
            let breedOption = key;
            let el = document.createElement("option");
            el.textContent = key;
            el.value = key;
            selectMenu.appendChild(el);
        }
    }

    )
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });


function displayDoggoInfo() {
    let doggoChosen = selectMenu.value;
    window.open(`https://en.wikipedia.org/wiki/${doggoChosen}`)
    // well above is a much easier way to do it ---- doggoInfoButton.setAttribute("onclick", `location.href='https://en.wikipedia.org/wiki/${selectMenu.value}'`);

    // for some breeds this doesn't work, because the breed name is related to something else i.e african, boxer, labrador, pyrenees 
}



function addNewDoggo() {
    if (doggos.firstChild){
        doggos.removeChild(doggos.lastChild);
    }
    const dogPicURL = `https://dog.ceo/api/breed/${selectMenu.value}/images/random`;
    fetch(dogPicURL)
        .then((resp) => resp.json())
        .then(function(data) {
            const img = document.createElement("img");
            img.src = data.message
            img.alt = selectMenu.value
            doggos.appendChild(img)
        }
        )
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
}

function addRandomDoggo() {
    if (doggos.firstChild) {
        doggos.removeChild(doggos.lastChild);
    }
    fetch(randomDoggo)
        .then((resp) => resp.json())
        .then(function(data) {
            const img = document.createElement("img");
            img.src = data.message
            img.alt = "A cute lil doggo just for you"
            doggos.appendChild(img)
        }
        )
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
}

