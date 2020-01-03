const cards = document.querySelectorAll('.card__container');
const averageRating = document.querySelectorAll('.average');
let starContainer = document.querySelectorAll('.star__container');


cards.forEach((card,index) => {
    // console.log(i)
    let nrOfStars = averageRating[index].innerText;
    for(let x = 0; x < nrOfStars; x++){
        starContainer[index].children[x].style.color = "#f1c40f";
    }
    card.addEventListener('click', () => {
        const postID = card.id;
        location.href = 'http://localhost:3000/post/' + postID;
    })
});