document.addEventListener("DOMContentLoaded", () => {
    // Update current year and last modified date
    document.getElementById("current-year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = `Last updated: ${new Date(document.lastModified).toLocaleString()}`;

    // Handle menu button click
    const hamburgerElement = document.querySelector('#myButton');
    const navElement = document.querySelector('#animateMe');
    hamburgerElement.addEventListener('click', () => {
        navElement.classList.toggle('open');
        hamburgerElement.classList.toggle('open');
        hamburgerElement.setAttribute('aria-label', hamburgerElement.classList.contains('open') ? "Close menu" : "Open menu");
    });

    // Handle modals
    const openButtons = document.querySelectorAll(".open-modal");
    const closeButtons = document.querySelectorAll(".close");
    const modals = document.querySelectorAll(".modal");

    openButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modalId = button.getAttribute("data-modal");
            document.getElementById(modalId).style.display = "block";
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modalId = button.getAttribute("data-modal");
            document.getElementById(modalId).style.display = "none";
        });
    });

    window.addEventListener("click", (event) => {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    });

    // Set timestamp
    const timestampField = document.getElementById("timestamp");
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    // Fetch and display monthly spotlights
    const spotlightsContainer = document.querySelector('#monthly-spotlights');
    const jsonUrl = './data/members.json';

    fetch(jsonUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched JSON data:', data);
            const filteredCompanies = data.filter(company =>
                company.name === "Nokia" || company.name === "Kone"
            );
            filteredCompanies.forEach(company => {
                const companyElement = document.createElement('div');
                companyElement.innerHTML = `
                    <img src="${company.image}" alt="${company.name} Logo" style="width:100px;height:auto;">
                    <h4>${company.name}</h4>
                    <p>${company.additional_info.description}</p>
                    <p><strong>Founded:</strong> ${company.additional_info.founded}</p>
                    <p><strong>Industries:</strong> ${company.additional_info.industries.join(', ')}</p>
                `;
                spotlightsContainer.appendChild(companyElement);
            });
        })
        .catch(error => {
            console.error('Error fetching the JSON data:', error);
            spotlightsContainer.innerHTML = '<p>Unable to load monthly spotlights at this time. Please try again later.</p>';
        });

    // Fetch and display weather information
    const currentTemp = document.querySelector('#current-temp');
    const weatherIcon = document.createElement('img');
    const currentDescription = document.querySelector('#current-description');
    const forecastContainer = document.querySelector('#forecast');

    const apiKey = '3b28f259ecf1e284f93e059013f7571d';
    const lat = '60.17';
    const lon = '24.94';

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

    async function apiFetch(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    async function getWeather() {
        const weatherData = await apiFetch(url);
        const forecastData = await apiFetch(forecastUrl);

        currentTemp.textContent = `${weatherData.main.temp}`;
        currentDescription.textContent = weatherData.weather[0].description;

        const iconSrc = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
        weatherIcon.setAttribute('src', iconSrc);
        weatherIcon.setAttribute('alt', weatherData.weather[0].description);
        currentTemp.insertAdjacentElement('afterend', weatherIcon);

        displayForecast(forecastData);
    }

    function displayForecast(forecastData) {
        forecastContainer.innerHTML = '';

        const filteredForecast = forecastData.list.filter(item => item.dt_txt.includes('12:00:00'));

        for (let i = 0; i < 3; i++) {
            const dayData = filteredForecast[i];
            const date = new Date(dayData.dt_txt).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
            const temp = dayData.main.temp;
            const description = dayData.weather[0].description;
            const iconSrc = `http://openweathermap.org/img/wn/${dayData.weather[0].icon}@2x.png`;

            const forecastItem = document.createElement('div');
            forecastItem.innerHTML = `
                <p><strong>${date}</strong></p>
                <p>Temperature: ${temp} °F</p>
                <p>Description: ${description}</p>
                <img src="${iconSrc}" alt="${description}">
            `;
            forecastContainer.appendChild(forecastItem);
        }
    }

    getWeather();

    const fields = ["firstName", "lastName", "title", "email", "telephone", "organization", "membership", "organizationDesc"];
    fields.forEach(field => {
        const element = document.getElementById(field);
        if (element) {
            element.textContent = getQueryParam(field);
        }
    });
});

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param) || "N/A";
}

document.addEventListener("DOMContentLoaded", () => {
    const modals = document.querySelectorAll(".modal");
    const openModalButtons = document.querySelectorAll(".open-modal");
    const closeButtons = document.querySelectorAll(".modal .close");
    const membershipSelect = document.getElementById("membership");

    // Function to open modal
    openModalButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modalId = button.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            if (modal) modal.style.display = "block";
        });
    });

    // Function to close modal
    closeButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const modal = event.target.closest(".modal");
            if (modal) modal.style.display = "none";
        });
    });

    // Close modal when clicking outside of it
    window.addEventListener("click", (event) => {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    });

    // Auto-select membership level when modal header is clicked
    document.querySelectorAll(".modal-content h2").forEach(header => {
        header.addEventListener("click", () => {
            const level = header.textContent.split(" ")[0].toLowerCase();
            membershipSelect.value = level === "NP" ? "np" : level;
        });
    });
});
       