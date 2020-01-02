const dashboardBtn = document.getElementById('dashboard');
const settingsBtn = document.getElementById('settings');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const overlay = document.querySelector('.overlay');
const editBtn = document.querySelectorAll('.editBtn');
const deleteBtn = document.querySelectorAll('.deleteBtn');
const editContainer = document.querySelector('.editPost__container');
const deleteContainer = document.querySelector('.delete__container');
const exitBtn = document.querySelectorAll('.exit__btn');
const editForm = document.querySelector('.edit__form');
let postID;

editBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
        let editID = e.target.attributes[0].value;
        overlay.style.display = "block";
        editContainer.style.display = "flex";
        $.ajax({
            url: 'http://localhost:3000/post/info/' + editID,
            type: 'GET'
        }).done(function(data){
            document.getElementById('edit__title').value = data.clickedPost.title;
            document.getElementById('edit__tags').value = data.clickedPost.tags;
            document.getElementById('edit__city').value = data.clickedPost.city;
            document.getElementById('edit__cuisine').value = data.clickedPost.cuisine;
            document.getElementById('edit__description').value = data.clickedPost.description;
            document.getElementById('selected__file').innerText = data.clickedPost.img;
        });
    });
});

exitBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        editContainer.style.display = "none";
        overlay.style.display = "none";
    });
});

deleteBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
        postID = e.target.attributes[0].value;
        overlay.style.display = "block";
        deleteContainer.style.display = "block"

    });
});

yesBtn.addEventListener('click', (e) => {
    $.ajax({
        url: 'http://localhost:3000/post/delete/' + postID,
        type: 'DELETE',
    }).done(function(data){
        location.reload();
        deleteContainer.style.display = "none";
        overlay.style.display = "none";
    });
});

noBtn.addEventListener('click', () => {
    deleteContainer.style.display = "none";
    overlay.style.display = "none";
})

overlay.addEventListener('click', () => {
    overlay.style.display = "none";
    deleteContainer.style.display = "none";
    editContainer.style.display = "none";
})