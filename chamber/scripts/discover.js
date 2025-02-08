import { places } from "../data/discover.mjs";

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("current-year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = `Last updated: ${new Date(document.lastModified).toLocaleString()}`;

    const mainElement = document.querySelector("main"); // Select the <main> element

    places.forEach(place => {
        const placeDiv = document.createElement("div");

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
