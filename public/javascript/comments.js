const commentCONTAINER = document.querySelector('.showComment__container');
const commentBTN = document.getElementById('comment-btn');


commentBTN.addEventListener('click', () => {
    let comment = document.getElementById('comment-input').value;
    let username = document.getElementById('username').innerText;
    let date = new Date().toLocaleString();
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
        // method: 'POST',
        // url: ''
    });
});