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
    // Update the webpage with the fetched data
    const temperature = data.main.temp;
    const condition = data.weather[0].description;

    document.getElementById('temperature').textContent = `${temperature}°F`;
    document.getElementById('condition').textContent = condition.charAt(0).toUpperCase() + condition.slice(1);
}

// Call the function when the page loads
getWeather();

