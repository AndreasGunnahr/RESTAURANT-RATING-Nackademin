const dashboardBtn = document.getElementById('dashboard');
const settingsBtn = document.getElementById('settings');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const editImgSRC = document.getElementById('editImgSRC');
const editImageForm = document.getElementById('edit__img-form');
const saveEditBtn = document.getElementById('edit__btn');
const editForm = document.getElementById('edit__form');
const overlay = document.querySelector('.overlay');
const editBtn = document.querySelectorAll('.editBtn');
const deleteBtn = document.querySelectorAll('.deleteBtn');
const editContainer = document.querySelector('.editPost__container');
const deleteContainer = document.querySelector('.delete__container');
const exitBtn = document.querySelectorAll('.exit__btn');
const editFileSpan = document.getElementById('selectedEdit__file');
const uploadEditImage = document.getElementById('editFile');
let postID;

uploadEditImage.addEventListener('change', () => {
    const filename = uploadEditImage.files[0].name;
    editFileSpan.innerText = filename + " selected";
})

saveEditBtn.addEventListener('click', (e) => {
    if(editFileSpan.innerText != "No file selected"){
        if(document.getElementById('selectedEdit__file').innerText != editFileSpan.innerText){
            editImageForm.submit();
        }
        let nameIMG = editFileSpan.innerText.split(" ")[0];
        editImgSRC.value = nameIMG.toLowerCase();   
        editForm.attributes[2].value = `/post/update/${postID}?_method=put`;
        editForm.submit();
    }
});

editBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
        postID = e.target.attributes[0].value;
        overlay.style.display = "block";
        editContainer.style.display = "flex";
        $.ajax({
            url: 'http://localhost:3000/post/info/' + postID,
            type: 'GET'
        }).done(function(data){
            document.getElementById('edit__title').innerText = data.clickedPost.title;
            document.getElementById('edit__title').value = data.clickedPost.title;
            document.getElementById('edit__tags').innerText = data.clickedPost.tags;
            document.getElementById('edit__tags').value = data.clickedPost.tags;
            document.getElementById('edit__city').innerText = data.clickedPost.city;
            document.getElementById('edit__city').value = data.clickedPost.city;
            document.getElementById('edit__cuisine').innerText = data.clickedPost.cuisine;
            document.getElementById('edit__cuisine').value = data.clickedPost.cuisine;
            document.getElementById('edit__description').innerText = data.clickedPost.description;
            document.getElementById('edit__description').value = data.clickedPost.description;
            document.getElementById('selectedEdit__file').innerText = data.clickedPost.img + ' ' +'selected';
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