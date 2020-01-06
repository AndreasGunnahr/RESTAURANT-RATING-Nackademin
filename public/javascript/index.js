const overlay = document.getElementsByClassName('overlay')[0];
const cuisineDropdownBtn = document.getElementsByClassName('dropdown__cuisineBtn')[0];
const cuisineDropdownContent = document.getElementsByClassName('dropdown__cuisineContent')[0];
const sortByDropdownBtn = document.getElementsByClassName('dropdown__sortByBtn')[0];
const sortByDropdownContent = document.getElementsByClassName('dropdown__sortByContent')[0];
const searchCuisine = document.querySelectorAll('.search__cuisine');
const searchSortBy = document.querySelectorAll('.search__sortBy');
const cardsContainer = document.querySelectorAll('.card__container');
const restaurantFound = document.getElementById('restaurant__found');
const restaurantList = document.getElementById('restaurant__list')

searchSortBy.forEach(btn => {
    btn.addEventListener('click', (e) => {
        let store = [];
        sortByDropdownContent.classList.toggle('show');
        overlay.classList.toggle('show');
        let sortName = e.target.innerText;
        sortByDropdownBtn.innerHTML = `${sortName} <i class="fa fa-caret-down"></i>`;
        if(sortName == "Reset"){
            sortByDropdownBtn.innerHTML = `Sort by <i class="fa fa-caret-down"></i>`;
            sortCards(store, 0, 0, sortName);
            appendCards(store);
        }
        else if(sortName == "Highest rating"){
            sortCards(store, -1, 1);
            appendCards(store);
        }
        else if(sortName == "Lowest rating"){
            sortCards(store, 1, -1);
            appendCards(store);
        }
    })
});

function appendCards(store){
    store.forEach(card => {
        restaurantList.append(card);
    })
}

function sortCards(store,order1, order2, sortName){
    cardsContainer.forEach(card => {
        store.push(card);
    });
    if(sortName != "Reset"){
        store.sort((cardOne,cardTwo) => {
            if(cardOne.attributes[2].value > cardTwo.attributes[2].value) return order1;
            if(cardOne.attributes[2].value < cardTwo.attributes[2].value) return order2;
        });
    };
}

searchCuisine.forEach(btn => {
    btn.addEventListener('click', (e) => {
       cuisineDropdownContent.classList.toggle('show');
       overlay.classList.toggle('show');
       let cuisine = e.target.innerText;
       cuisineDropdownBtn.innerHTML = `${cuisine} <i class="fa fa-caret-down"></i>`;
       let counter = 0;
       cards.forEach(card => {
            let cuisineText = card.children[1].children[2].children[1].children[1].innerText; // MÅSTE GÅ ATT GÖRA BÄTTRE/SNYGGARE.
            if(cuisine == 'Reset'){
                cuisineDropdownBtn.innerHTML = `Cuisine <i class="fa fa-caret-down"></i>`;
                card.style.display = "flex";
                counter++;
            }
            else if(cuisine.toLowerCase().trim() != cuisineText.toLowerCase().trim()){
                card.style.display = "none";
            }
            else{
                card.style.display = "flex";
                counter++;
            }
       });
       restaurantFound.innerHTML = `<i class="fas fa-utensils"></i>Restaurant Found: ${counter}`
    });
})


cuisineDropdownBtn.addEventListener('click', () => {
    cuisineDropdownBtn.style.zIndex = "5";
    sortByDropdownBtn.style.zIndex = "0";
    cuisineDropdownContent.classList.toggle('show');
    overlay.classList.toggle('show');
    overlay.style.background = "rgba(0,0,0,0.3)";
});

sortByDropdownBtn.addEventListener('click', () => {
    sortByDropdownBtn.style.zIndex = "5";
    cuisineDropdownBtn.style.zIndex = "0";
    sortByDropdownContent.classList.toggle('show');
    overlay.classList.toggle('show');
    overlay.style.background = "rgba(0,0,0,0.3)";
});

overlay.addEventListener('click', () => {
    overlay.classList.toggle('show');
    cuisineDropdownContent.classList.remove('show');
    sortByDropdownContent.classList.remove('show');
})