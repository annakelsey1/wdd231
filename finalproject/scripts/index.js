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

const weatherIcon = document.createElement("img");
weatherIcon.alt = "Weather icon";

// Function to fetch and display weather
async function getWeather() {
    const apiKey = '3b28f259ecf1e284f93e059013f7571d';
    const city = 'Orem';
    const country = 'US';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=imperial`; 

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('temperature').textContent = 'Unable to fetch weather.';
        document.getElementById('condition').textContent = '';
    }
}

function displayWeather(data) {
    const temperature = data.main.temp;
    const condition = data.weather[0].description;

    document.getElementById('temperature').textContent = `${temperature}°F`;
    document.getElementById('condition').textContent = condition.charAt(0).toUpperCase() + condition.slice(1);

    // Call function to update weather image
    updateWeather(condition);
}

// Function to update weather image based on condition
function updateWeather(condition) {
    const conditionElement = document.getElementById("condition");

    let weatherData = {
        "clear sky": { img: "images/sunny.png", text: "Sunny" },
        "few clouds": { img: "images/cloudy.png", text: "Partly Cloudy" },
        "scattered clouds": { img: "images/cloudy.png", text: "Cloudy" },
        "broken clouds": { img: "images/cloudy.png", text: "Cloudy" },
        "shower rain": { img: "images/rainy.png", text: "Rain Showers" },
        "rain": { img: "images/rainy.png", text: "Rainy" },
        "thunderstorm": { img: "images/storm.png", text: "Thunderstorm" },
        "snow": { img: "images/snowy.png", text: "Snowy" },
        "mist": { img: "images/mist.png", text: "Misty" }
    };

    // Match weather condition with an image
    let conditionKey = condition.toLowerCase();
    if (weatherData[conditionKey]) {
        weatherIcon.src = weatherData[conditionKey].img;
        conditionElement.textContent = weatherData[conditionKey].text;
    } else {
        weatherIcon.src = "images/default.png"; // Default image for unknown conditions
        conditionElement.textContent = condition;
    }

    // Append the image to the weather container
    const weatherContainer = document.querySelector(".weather-container");
    weatherContainer.appendChild(weatherIcon);
}

// Call the function when the page loads
getWeather();


