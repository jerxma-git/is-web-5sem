let btn = null;
let playground = null;

const BTN_MOVE_DELAY_MS = 200;

function move() {
    let buttonWidth = btn.clientWidth;
    let buttonHeight = btn.clientHeight;
    
    let wdth = playground.clientWidth;
    let hght = playground.clientHeight;

    btn.style.top = `${Math.random() * (hght - buttonHeight)}px`
    btn.style.left = `${Math.random() * (wdth - buttonWidth)}px`
}

window.addEventListener("load", () => {
    btn = document.querySelector(".target-button");
    playground = document.querySelector(".playground");

    btn.addEventListener("mouseover", () => {
        setTimeout(move, BTN_MOVE_DELAY_MS);
    });
    
    btn.addEventListener("click", () => {
        window.location.href = "index.html";
    });
})
