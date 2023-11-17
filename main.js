const API_KEY = '07b460036e844612a0862022231711';
const API_URL = 'https://api.weatherapi.com/v1/current.json';

const inputWeather = document.getElementById('input_weather');
const countryElement = document.getElementById('country');
const dataElement = document.getElementById('data');
const timeElement = document.getElementById('time');
const blocks = document.querySelector('.blocks');
const errorMessage = document.querySelector('.error-message');
const enterCityMessage = document.querySelector('.enter-city');
const weatherIcon = document.getElementById('weather_icon');
const degreeTemp = document.getElementById('degree-temp');
const weatherDescription = document.getElementById('weather');
const feelsLikeElement = document.getElementById('feels-like');
const humidityElement = document.getElementById('humidity');
const windElement = document.getElementById('wind');
const loader = document.querySelector('.cs-loader');

blocks.style.display = 'none';
enterCityMessage.style.display = 'block';
errorMessage.style.display = 'none'

inputWeather.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    const city = inputWeather.value;
    if (city) {
      blocks.style.display = 'block';
      enterCityMessage.style.display = 'none';
      getWeather(city);
    }
  }
});

function getWeather(city) {
  loader.style.display = 'flex';
  blocks.style.display = 'none';
  inputWeather.disabled = true;
  errorMessage.style.display = 'none';

  fetch(`${API_URL}?key=${API_KEY}&q=${city}`)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        throw new Error(data.error.message);
      }

      updateWeather(data);
      clearError();
      loader.style.display = 'none';
      blocks.style.display = 'block';
    })
    .catch(error => {
      errorMessage.style.display = 'block';
      loader.style.display = 'none';
      blocks.style.display = 'none';
    })
    .finally(() => {
      inputWeather.disabled = false;
    });
}

function clearError() {
  errorMessage.style.display = 'none';
}



const currentDate = new Date();
const dateFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const timeFormatOptions = { hour: '2-digit', minute: '2-digit' };


function updateWeather(data) {
  countryElement.innerText = `${data.location.name}, ${data.location.country}`;
  dataElement.innerText = currentDate.toLocaleDateString('en-US', dateFormatOptions);
  timeElement.innerText = currentDate.toLocaleTimeString('en-US', timeFormatOptions);
  weatherDescription.innerText = data.current.condition.text;
  weatherIcon.src = `https:${data.current.condition.icon}`;
  degreeTemp.innerText = `${Math.round(data.current.temp_c)} °C`;
  feelsLikeElement.innerText = `Feels like: ${Math.round(data.current.feelslike_c)} °C`;
  humidityElement.innerText = `Humidity: ${Math.round(data.current.humidity)}%`;
  windElement.innerText = `Wind: ${Math.round(data.current.wind_kph)} kph`;
}