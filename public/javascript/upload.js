const uploadImagePost = document.getElementById('file');
const selectedFileSpan = document.getElementById('selected__file');
const postBtn = document.getElementById('post__btn');
const postTextForm = document.getElementById('post__text-form');
const postImgForm = document.getElementById('post__img-form');
const imgSRC = document.getElementById('imgSRC');

uploadImagePost.addEventListener('change', () => {
    const filename = uploadImagePost.files[0].name;
    selectedFileSpan.innerText = filename + " selected";
})

// postImgForm.submit(); för att posta bilden. 
// Behöver kolla ifall man har fyllt i alla fält + valt en bild. 
// Kolla längden på tagen och antalen. 
postBtn.addEventListener('click', () => {
    if(selectedFileSpan.innerText != "No file selected"){
        let nameIMG = selectedFileSpan.innerText.split(" ")[0];
        imgSRC.value = nameIMG.toLowerCase();
        postTextForm.submit();
        postImgForm.submit();
    }
});