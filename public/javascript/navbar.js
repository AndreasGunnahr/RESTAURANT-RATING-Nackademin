const profileDropdown = document.getElementsByClassName('profile__dropdownBtn')[0];
const profileContent = document.getElementsByClassName('profile__dropdownContent')[0];

// .profile__dropdown:hover .profile__dropdownContent{
//     display: flex;
// }

profileDropdown.addEventListener('click', (e) => {
    console.log(e.target)
    profileContent.classList.toggle('toggle');
});