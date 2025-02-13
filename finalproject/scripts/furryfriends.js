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

    const mainElement = document.querySelector("main"); // Select the <main> element
    mainElement.classList.add("pets-container");

    pets.forEach(pet => {
        const petDiv = document.createElement("div");
        petDiv.classList.add("pet-card");

        // Create a heading for the pet name
        const title = document.createElement("h2");
        title.textContent = pet.name;

        // Create an image element
        const image = document.createElement("img");
        image.src = pet.image;
        image.alt = pet.alt;
        image.loading = "lazy";

        // Create a paragraph for the pet's age
        const age = document.createElement("p");
        age.textContent = `Age: ${pet.age}`;

        // Create a paragraph for the description
        const description = document.createElement("p");
        description.textContent = pet.description;

        // Create a "Learn More" button
        const button = document.createElement("button");
        button.textContent = "Learn More";
        button.onclick = () => window.location.href = pet.link;

        // Append elements to the petDiv
        petDiv.appendChild(title);
        petDiv.appendChild(image);
        petDiv.appendChild(age);
        petDiv.appendChild(description);
        petDiv.appendChild(button);

        // Append the petDiv to the main element
        mainElement.appendChild(petDiv);
    });
});
