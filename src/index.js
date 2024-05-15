// Update Data from API
function refreshWeather(response) {
  // Temperature
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  // City
  let cityElement = document.querySelector("#city");
  // Country
  let countryElement = document.querySelector("#country");
  // Weather Condition
  let descriptionElement = document.querySelector("#description");
  // Humidity
  let humidityElement = document.querySelector("#humidity");
  // Wind
  let windElement = document.querySelector("#wind");
  // Time
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  // Icon
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = `${response.data.city},`;
  countryElement.innerHTML = response.data.country;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
  temperatureElement.innerHTML = Math.round(temperature);

  getForecast(response.data.city);
}

// Format Date
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day} ${hours}:${minutes}`;
}

// make api call the interface
function searchCity(city) {
  let apiKey = "f5371a45b3fc047t75a40051bo80cbe3";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

// forecast function to show the rest 6 week days

function getForecast(city) {
  let apiKey = "f5371a45b3fc047t75a40051bo80cbe3";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function displayForecast(response) {
  console.log(response.data);

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if ((index < 7) & (index > 0)) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-day">
      <div class="weather-forecast-date">${formatDay(day.time)}</div>
      <img src="${day.condition.icon_url}" class="weather-forecast-icon">
      <div class="weather-forecast-temperatures">
        <div class="weather-forecast-temperature">
          <strong>${Math.round(day.temperature.maximum)}</strong>
        </div>
        <div class="weather-forecast-temperature">${Math.round(
          day.temperature.minimum
        )}º</div>
      </div>
  </div>
  `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

// Default search
searchCity("Paris");
