(() => {
    let startTime = performance.now();
    window.addEventListener("load", (e) => {
        let duration = performance.now() - startTime;
        
        let pageLoadSpan = document.createElement("span");
        pageLoadSpan.textContent = `page loaded in ${duration.toFixed(2)} ms`;
        pageLoadSpan.style = "color: white;"

        let pageLoadInfoEl = document.createElement("p");
        pageLoadInfoEl.appendChild(pageLoadSpan);
        
        document.querySelector("footer").appendChild(pageLoadInfoEl);       
    })
})();