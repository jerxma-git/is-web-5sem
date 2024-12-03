function getLastPathEntry(urlstr) {
    return urlstr.split("/").at(-1);
}

window.addEventListener("load", () => {
    document.querySelectorAll(".nav-bar__link").forEach(link => {
        let link_path = getLastPathEntry(String(link.href));
        let curr_path = getLastPathEntry(String(window.location.href));
    
        if (link_path == curr_path) {
            link.classList.add("nav-bar__link_current");
        } else {
            link.classList.remove("nav-bar__link_current");
        }
    });
})

