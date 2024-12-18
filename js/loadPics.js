

function setImageConstructor() {
    const FAKE_ERROR_CHANCE = 0.1;
    const FAKE_REQUEST_DELAY = 0;

    let fetchedImageUrls = [];
    let fetchPromise = null;

    function hasImages() {
        return fetchedImageUrls.length > 0;
    }
    
    async function fetchImageUrls(fakeSleep=0, fakeErrorChance=0) {
        const albumId = Math.floor(Math.random() * 10) + 1;
        fetchPromise = fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
            .then(async response => {
                if (fakeSleep > 0) {
                    await new Promise(r => setTimeout(r, fakeSleep));
                }
                if (fakeErrorChance > 0 && Math.random() < fakeErrorChance) {
                    throw new Error("haha rip bozo");
                }
                return response;
            })
            .then(response => response.json())
            .then(json => json.map(obj => obj["url"]))
            .then(parsed => fetchedImageUrls.push(...parsed))
            .catch(error => {
                console.error("Error fetching images:", error);
                throw error;
            })
            .finally(_ => fetchPromise = null);
            return fetchPromise
                      
    }

    async function setImageFun(imgElement) {
        if (!hasImages()) {
            if (fetchPromise == null) {
                await fetchImageUrls(FAKE_REQUEST_DELAY, FAKE_ERROR_CHANCE);
            } else {
                await fetchPromise
            }
        }
        imgElement.src = fetchedImageUrls.pop();
    }
    return setImageFun;
}

let setImage = setImageConstructor();


window.addEventListener("load", () => {
    let sidebarList = document.querySelector(".sidebar__list");
    Promise.all(Array.from(sidebarList.children).map(setImage))
        .catch(error => {
            console.error(error);
            while (sidebarList.firstChild) {
                sidebarList.removeChild(sidebarList.firstChild);
            }
            let errorMsgElement = document.createElement("div");
            errorMsgElement.classList.add("sidebar__list-error-message");
            errorMsgElement.innerText = "⚠ Что-то пошло не так";
            sidebarList.appendChild(errorMsgElement);
        })
});