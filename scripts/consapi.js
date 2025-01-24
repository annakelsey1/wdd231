const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=${apiKey}&units=imperial';

const apiKey = '3b28f259ecf1e284f93e059013f7571d';
const lat = '49.75';
const lon = '6.637';

async function apiFetch(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
      const data = await response.json();
      currentTemp.textContent = data.main.temp + ' °F';
      const iconSrc = 'http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png';
      weatherIcon.setAttribute('src', iconSrc);
      weatherIcon.setAttribute('alt', data.weather[0].description);
      captionDesc.textContent = data.weather[0].description;
      console.log(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }
apiFetch(url);

