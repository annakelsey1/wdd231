document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("current-year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = `Last updated: ${new Date(document.lastModified).toLocaleString()}`;

    const hamburgerElement = document.querySelector('#myButton');
    const navElement = document.querySelector('#animateMe');
    hamburgerElement.addEventListener('click', () => {
        navElement.classList.toggle('open');
        hamburgerElement.classList.toggle('open');
        hamburgerElement.setAttribute('aria-label', hamburgerElement.classList.contains('open') ? "Close menu" : "Open menu");
    });
});