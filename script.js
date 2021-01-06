
function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);


 function displayWeatherCondition (response) {
   document.querySelector("#city").innerHTML=response.data.name;
   document.querySelector("#temperature").innerHTML=Math.round(response.data.main.temp
    );

      let humidity = response.data.main.humidity;
      let humidityElement = document.querySelector("#humidity");
      humidityElement.innerHTML = `Humidity: ${humidity}%`;

      let wind = Math.round(response.data.wind.speed);
      let windElement = document.querySelector("#wind");
      windElement.innerHTML = `Wind speed: ${wind} m/s`;

      let description = document.querySelector("#description");
      description.innerHTML = response.data.weather[0].main;

    }

    function searchCity(city) {
      let apiKey = "f58a3da8d9e0f160ba2b997349a49f23";
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      axios.get(apiUrl).then(displayWeatherCondition);
  }
    

  function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city-input").value; 
    searchCity(city);
  }
  
function searchLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${
    position.coords.latitude
  }&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}


function getCurrentLocation(event) {
   event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}


//Show coversion back to celsius//

function celsiusConversion(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", celsiusConversion);

//Show conversion to fahrenheit//

function fahrenheitConversion(event) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", fahrenheitConversion);

//Show current location//

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

//let currentLocationButton=document.querySelector("#current-location-button");
//currentLocationButton=addEventListener("click", getCurrentLocation);


searchCity("New York");
