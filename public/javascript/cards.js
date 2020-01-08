const cards = document.querySelectorAll('.card__container');
const averageRating = document.querySelectorAll('.average');
let starContainer = document.querySelectorAll('.star__container');
const editCards = document.querySelectorAll('.editCard');


if(cards){
    cards.forEach((card,index) => {
        let nrOfStars = averageRating[index].innerText;
        for(let x = 0; x < nrOfStars; x++){
            starContainer[index].children[x].style.color = "#f1c40f";
        }
        card.addEventListener('click', () => {
            const postID = card.id;
            location.href = '/post/' + postID;
        })
    });
}

if(editCards){
    editCards.forEach((card,index) => {
        let nrOfStars = averageRating[index].innerText;
        for(let x = 0; x < nrOfStars; x++){
            starContainer[index].children[x].style.color = "#f1c40f";
        }
    });
}