(() => {
    window.addEventListener("load", (e) => {
        setTimeout(() => {
            let [p] = performance.getEntriesByType("navigation");
            let duration = p.loadEventEnd - p.startTime;
            
            let pageLoadSpan = document.createElement("span");
            pageLoadSpan.textContent = `page loaded in ${duration.toFixed(2)} ms`;
            pageLoadSpan.style = "color: white;"

            let pageLoadInfoEl = document.createElement("p");
            pageLoadInfoEl.appendChild(pageLoadSpan);
            
            document.querySelector("footer").appendChild(pageLoadInfoEl);    
        }, 0);   
    })
})();