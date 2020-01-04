const stars = document.querySelectorAll('.star');
const starsPost = document.getElementsByClassName('star__container')[0].children;
const average = document.getElementsByClassName('average')[0].innerText;
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

for(let x = 0; x < parseInt(average); x++){
    starsPost[x].style.color = "#f1c40f";
}