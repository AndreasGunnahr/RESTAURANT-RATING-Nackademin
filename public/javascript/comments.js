const commentCONTAINER = document.querySelector('.showComment__container');
const commentBTN = document.getElementById('comment-btn');


commentBTN.addEventListener('click', () => {
    let comment = document.getElementById('comment-input').value;
    let username = document.getElementById('username').innerText;
    let date = new Date().toLocaleString();
    let postID = location.href.substring(location.href.lastIndexOf('/') + 1);
    let commentDIV = document.createElement('DIV');
    commentDIV.classList.add('comment');
    let commentStructure = 
    `<div class = "header">
        <img src = "/images/profile.jpg">
        <h1>${username}</h1>
        <span>${date}</span>
    </div>
    <p>${comment}</p>`
    commentDIV.innerHTML = commentStructure;
    commentCONTAINER.append(commentDIV);
    document.getElementById('comment-input').value = "";
    commentCONTAINER.scrollTop = commentCONTAINER.scrollHeight;
    $.ajax({
        url: 'http://localhost:3000/post/comment',
        type: 'POST',
        dataType : 'json',
        data: {
            post_id: postID,
            date: date,
            comment: comment,
            username: username
        }
    }).done(function(data){
        console.log(data);
    });
});