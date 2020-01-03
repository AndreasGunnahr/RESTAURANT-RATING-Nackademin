const stars = document.querySelectorAll('.star');
const commentBTN = document.getElementById('comment-btn');
let ratingNumber; 

if(commentBTN){
    stars.forEach(star => {
        star.addEventListener('click', (e) => {
            commentBTN.disabled = false;
            ratingNumber = e.target.attributes[0].value;
            for(let x = 0; x <= 4; x++){
                stars[x].style.color = "#A3B4D3";
            }
            for(let x = ratingNumber; x <= 4; x++){
                stars[x].style.color = "#f1c40f";
            };
        })
    });
}