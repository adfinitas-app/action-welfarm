$(document).foundation();
window.onscroll = setStickyButton;

function setStickyButton() {
    let button = document.getElementById("smallStickyButton");

    if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
        button.style.display = "block";
        button.classList.add("is-stuck");
        button.classList.remove("is-anchored");
    } else {
        button.style.display = "none";
        button.classList.remove("is-stuck");
        button.classList.add("is-anchored");
    }
}