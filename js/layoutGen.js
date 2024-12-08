function clearStars(stars) {
    for (let star of stars) {
        star.classList.remove("skull-creator__star_active");
        star.classList.add("skull-creator__star_inactive");
    }
}

function activateStars(stars) {
    for (let star of stars) {
        star.classList.add("skull-creator__star_active");
        star.classList.remove("skull-creator__star_inactive");
    }
}

function onCoolnessInputHover(event) {
    if (!(event.target.tagName == "use")) {
        return;
    }

    let stars = event.currentTarget.querySelectorAll(".skull-creator__star");
    let input = event.currentTarget.querySelector("input");
    
    let coolness = 0;
    for (let star of stars) {
        coolness++;
        if (star.children[0] == event.target) {
            break;
        }
    }

    clearStars(stars);
    activateStars(Array.from(stars).slice(0, coolness));

    input.value = coolness;
};

let skulls = [];

function appendSkull(skull) {
    let skullGridBody = document.getElementById("skull-grid")
            .querySelector(".skull-grid__body");
  
    let skullRecord = document.createElement('div');
    skullRecord.classList.add('skull-grid__row');
    skullRecord.innerHTML = `
        <div>${skull.id}</div>
        <div>${skull.name}</div>
        <div>${skull.coolness}</div>
    `;

    skullGridBody.appendChild(skullRecord);
}

function processSkullCreatorFormSubmission(event) {
    event.preventDefault();

    let form = document.getElementById("skull-creation-form");

    let name = form.elements['name'].value;
    let coolness = form.elements['coolness'].value;
    let skullId = 1 + Math.max(...skulls.map(skull => skull.id), 0);

    let skull = {
        "id": skullId,
        "name": name || "безымянный костян (жесть)",
        "coolness": coolness || "забыли проверить на крутость("
    }

    skulls.push(skull);
    appendSkull(skull);

    form.reset();
    clearStars(form.querySelectorAll(".skull-creator__star"));
    setSaveButtonState(false);
};

function clearSkulls() {
    skulls = [];
    let skullGridBody = document.getElementById("skull-grid")
            .querySelector(".skull-grid__body");
    while (skullGridBody.lastElementChild) {
        skullGridBody.removeChild(skullGridBody.lastElementChild);
    }
    setSaveButtonState(false);
}

function setSaveButtonState(isSaved) {
    let saveBtn = document.querySelector(".skull-container__save-btn");
    if (isSaved) {
        saveBtn.innerText = "Синхронизировано";
        saveBtn.setAttribute("disabled", "true");
    } else {
        saveBtn.innerText = "Синхронизировать";
        saveBtn.removeAttribute("disabled");
    }
}

function saveState() {
    localStorage.setItem("skulls", JSON.stringify(skulls));
    setSaveButtonState(true);
}

function loadAndRenderSkulls() {
    let serializedSkulls = localStorage.getItem("skulls");
    if (!serializedSkulls) return;

    skulls = JSON.parse(serializedSkulls);
    skulls.forEach(appendSkull);
    setSaveButtonState(true);
}

function syncSkulls() {
    clearSkulls();
    loadAndRenderSkulls();
}

window.addEventListener("load", () => {
    let form = document.getElementById("skull-creation-form");
    let coolnessInput = form.querySelector(".skull-creator__coolness-input");
    let saveBtn = document.querySelector(".skull-container__save-btn");
    let clearBtn = document.querySelector(".skull-container__reset-btn");
    let syncBtn = document.querySelector(".skull-container__sync-btn");

    
    coolnessInput.addEventListener("click", onCoolnessInputHover);
    form.addEventListener("submit", processSkullCreatorFormSubmission);
    saveBtn.addEventListener("click", saveState);
    clearBtn.addEventListener("click", clearSkulls);
    syncBtn.addEventListener("click", syncSkulls);
    
    
    loadAndRenderSkulls();
});