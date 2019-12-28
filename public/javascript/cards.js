const cards = document.querySelectorAll('.card__container');


cards.forEach(card => {
    card.addEventListener('click', () => {
        const postID = card.id;
        location.href = 'http://localhost:3000/post/' + postID;
    })
});