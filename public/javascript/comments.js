const commentCONTAINER = document.querySelector('.showComment__container');



if(commentBTN){
    commentBTN.disabled = true;
    commentBTN.addEventListener('click', () => {
        let comment = document.getElementById('comment-input').value;
        let username = document.getElementById('username').innerText;
        let date = new Date().toLocaleString();
        let postID = location.href.substring(location.href.lastIndexOf('/') + 1);
        let commentDIV = document.createElement('DIV');
        commentDIV.classList.add('comment');
        let HTML = "";
        let counter = "";
        for(let x = ratingNumber; x <= 4; x++){
            HTML += '<a class="fas fa-star"></a>'; 
            counter += 'x';
        }
        let commentStructure = 
        `<div class = "header">
            <img src = "/images/avatar.png">
            <h1>${username}</h1>
            <span>${date}</span>
            <div class="commentStars__container">
               ${HTML}
            </div>
        </div>
        <p>${comment}</p>`
        commentDIV.innerHTML = commentStructure;
        commentCONTAINER.append(commentDIV);
        document.getElementById('comment-input').value = "";
        commentCONTAINER.scrollTop = commentCONTAINER.scrollHeight;
        $.ajax({
            url: '/post/comment',
            type: 'POST',
            dataType : 'json',
            data: {
                post_id: postID,
                date: date,
                comment: comment,
                username: username,
                stars: counter
            }
        }).done(function(data){
            commentBTN.disabled = true;
            stars.forEach(star => {
                star.style.color = "#A3B4D3";
            });
        });
        $.ajax({
            url: '/post/rating',
            type: 'POST',
            data: {
                score: counter.length,
                post_id: postID
            }
        })
    });
}


