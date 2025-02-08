import { places } from "../data/discover.mjs";

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("current-year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = `Last updated: ${new Date(document.lastModified).toLocaleString()}`;

    const mainElement = document.querySelector("main"); // Select the <main> element
    mainElement.classList.add("places-container");

    places.forEach(place => {
        const placeDiv = document.createElement("div");
        placeDiv.classList.add("place-card");

        // Create a heading for the place name
        const title = document.createElement("h2");
        title.textContent = place.name;

        // Create an image element
        const image = document.createElement("img");
        image.src = place.image;
        image.alt = place.alt;

        // Create an address element
        const address = document.createElement("address");
        address.textContent = place.address;

        // Create a paragraph for the description
        const description = document.createElement("p");
        description.textContent = place.description;

        // Create a "Learn More" button
        const button = document.createElement("button");
        button.textContent = "Learn More";
        button.onclick = () => window.location.href = place.link;

        // Append elements to the placeDiv
        placeDiv.appendChild(title);
        placeDiv.appendChild(image);
        placeDiv.appendChild(address);
        placeDiv.appendChild(description);
        placeDiv.appendChild(button);

        // Append the placeDiv to the main element
        mainElement.appendChild(placeDiv);
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const sidebarMessage = document.getElementById("visit-message");

    // Retrieve last visit from localStorage
    const lastVisit = localStorage.getItem("lastVisit");

    // Get the current date in milliseconds
    const currentDate = Date.now();

    if (!lastVisit) {
        // First visit case
        sidebarMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        // Convert last visit from string to a number
        const lastVisitDate = Number(lastVisit);

        // Calculate the difference in time (in milliseconds)
        const timeDifference = currentDate - lastVisitDate;

        // Convert milliseconds to days
        const daysBetweenVisits = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        if (daysBetweenVisits < 1) {
            sidebarMessage.textContent = "Back so soon! Awesome!";
        } else if (daysBetweenVisits === 1) {
            sidebarMessage.textContent = "You last visited 1 day ago.";
        } else {
            sidebarMessage.textContent = `You last visited ${daysBetweenVisits} days ago.`;
        }
    }

    // Store the current visit date
    localStorage.setItem("lastVisit", currentDate);
});
