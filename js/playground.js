
function move() {
    let btn = document.querySelector(".target-button");
    let playground = document.querySelector(".playground");
    
    let buttonWidth = btn.clientWidth;
    let buttonHeight = btn.clientHeight;
    
    let wdth = playground.clientWidth;
    let hght = playground.clientHeight;

    btn.style.top = `${Math.random() * (hght - buttonHeight)}px`
    btn.style.left = `${Math.random() * (wdth - buttonWidth)}px`
}

window.addEventListener("load", () => {
    let btn = document.querySelector(".target-button");

    btn.addEventListener("mouseover", () => {
        setTimeout(move, 200);
    });
    
    btn.addEventListener("click", () => {
        window.location.href = "index.html";
    });
})
