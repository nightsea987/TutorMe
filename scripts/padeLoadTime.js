(() => {
    const startTime = Date.now();
    window.addEventListener("load", () => {
        const endTime = Date.now();
        const timeElement = document.getElementById("page-load-time")
        timeElement.innerText = `Время загрузки страницы: ${
            endTime - startTime
        } ms`;
        timeElement.style.color = '#000000';
        document.getElementById("load-time").style.textAlign = 'center';
    });
})();