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

// create the select menu based on available dogs in the DogAPI
fetch(dogListGen)
    .then((resp) => resp.json())
    .then(function(data) {
        const breeds = data.message
        for (key in breeds) {
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

// redirect user to the wikipedia article referring to their selected dog
function displayDoggoInfo() {
    let doggoChosen = selectMenu.value;
    if (doggoChosen == "") {
        return
    }
    window.open(`https://en.wikipedia.org/wiki/${doggoChosen}`)

    // for some breeds this doesn't work, because the breed name is related to something else i.e african, boxer, labrador, pyrenees 
        // for this there is from my understanding no way to programatically solve it, other than hardcoding the Wiki url for the dogs which require further disambiguation
}


// add a picture of the selected dog 
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
// add a picture of a random dog 
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

