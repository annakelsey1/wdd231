document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("current-year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = `Last updated: ${new Date(document.lastModified).toLocaleString()}`;
});

const hamburgerElement = document.querySelector('#myButton');
const navElement = document.querySelector('#animateMe');

hamburgerElement.addEventListener('click', () => {
    navElement.classList.toggle('open');
    hamburgerElement.classList.toggle('open');
    hamburgerElement.setAttribute('aria-label', isOpen ? "Close menu" : "Open menu");
});

const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.createElement('img');
const captionDesc = document.querySelector('#current-description');
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
