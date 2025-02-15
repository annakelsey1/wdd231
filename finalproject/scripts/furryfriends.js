import { pets } from "../data/furryfriends.mjs";

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("current-year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = `Last updated: ${new Date(document.lastModified).toLocaleString()}`;

    const hamburgerElement = document.querySelector('#myButton');
    const navElement = document.querySelector('#animateMe');

    hamburgerElement.addEventListener('click', () => {
        navElement.classList.toggle('open');
        hamburgerElement.classList.toggle('open');
    });

    const mainElement = document.querySelector("main");
mainElement.classList.add("pets-container");

pets.forEach(pet => {
    const petDiv = document.createElement("div");
    petDiv.classList.add("pet-card");

    const title = document.createElement("h2");
    title.textContent = pet.name;

    const image = document.createElement("img");
    image.src = "placeholder.jpg";
    image.dataset.src = pet.image;
    image.alt = pet.alt;
    image.loading = "lazy";

    const age = document.createElement("p");
    age.textContent = `Age: ${pet.age}`;

    const description = document.createElement("p");
    description.textContent = pet.description;

    const button = document.createElement("button");
    button.textContent = "Learn More";
    button.onclick = () => window.location.href = pet.link;

    petDiv.appendChild(title);
    petDiv.appendChild(image);
    petDiv.appendChild(age);
    petDiv.appendChild(description);
    petDiv.appendChild(button);

    mainElement.appendChild(petDiv);
});

const images = document.querySelectorAll('img[loading="lazy"]');

const lazyLoad = (image) => {
    image.src = image.dataset.src; // Set the image src from the data-src attribute
    image.onload = () => image.classList.add('loaded'); // Optionally, add a class when the image is loaded
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            lazyLoad(entry.target); // Load the image when it enters the viewport
            observer.unobserve(entry.target); // Stop observing after the image has loaded
        }
    });
}, { rootMargin: '0px 0px 200px 0px' }); // Adjust margin to load images slightly before they enter the viewport

images.forEach(image => {
    observer.observe(image); // Start observing each image
});

    const sidebarMessage = document.getElementById("visit-message");

    const lastVisit = localStorage.getItem("lastVisit");

    const currentDate = Date.now();

    if (!lastVisit) {
        sidebarMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitDate = Number(lastVisit);

        const timeDifference = currentDate - lastVisitDate;

        const daysBetweenVisits = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        if (daysBetweenVisits < 1) {
            sidebarMessage.textContent = "Welcome back! Some furry friends missed you!";
        } else if (daysBetweenVisits === 1) {
            sidebarMessage.textContent = "You last visited yesterday. Maybe today is the day you find a new best friend!";
        } else if (daysBetweenVisits <= 7) {
            sidebarMessage.textContent = `It's been ${daysBetweenVisits} days! New pets might be waiting just for you!`;
        } else if (daysBetweenVisits <= 30) {
            sidebarMessage.textContent = `It's been ${daysBetweenVisits} days! Our animals can't wait to meet you again!`;
        } else {
            sidebarMessage.textContent = `It's been a while! Come see the adorable pets looking for their forever home!`;
        }
        
    }

    localStorage.setItem("lastVisit", currentDate);
});

