// SELECTORS
let locationName = document.querySelector(".location-name");
let temperature = document.querySelector(".temp-degrees");
let description = document.querySelector(".temp-description");
let icon = document.querySelector(".icon");
let degreeButton = document.querySelector(".degree-changer-btn");
let searchInput = document.querySelector(".search-input");
let searchButton = document.querySelector(".search-btn");

//MAIN EVENT LISTENER

searchButton.addEventListener("click",getWeather)

// GETWEATHER FUNCTION

function getWeather(e) {
  // prevent button submit
  e.preventDefault();
  
  // calling API
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=2efdb87dc26b3a5828091ce77825d495`;

  fetch(api)
    .then((response) => {
      return response.json();
    })
    .then((data) => {

      // UPDATING VALUE OF DOM FROM API (EXCEPT ICON)
      newTemperature = data.main.temp;
      const newLocation = data.name;
      const newDescritption = data.weather[0].description;

      temperature.innerText = Math.round(newTemperature) + " \u00B0C";
      locationName.innerText = newLocation;
      description.innerText = capitalize(newDescritption);

      // INSERTING ICON
      const newIcon = data.weather[0].icon;
      changeIcon(newIcon);
      icon.style.background = `url(${iconURL})`;

      // DEGREE CHANGER BUTTON
      degreeButton.addEventListener("click", degreeChange);
    });
}




// EXTRA FUNCTIONS
function capitalize(s) {
  return s[0].toUpperCase() + s.slice(1);
}

function changeIcon(icon) {
  iconURL = ` http://openweathermap.org/img/wn/${icon}.png `;
}

function degreeChange() {
  if (temperature.innerText == Math.round(newTemperature) + " \u00B0C") {
    farValue = newTemperature * 1.8 + 32;
    temperature.innerText = Math.round(farValue) + " \u00B0F";
  } else if (temperature.innerText == Math.round(farValue) + " \u00B0F") {
    temperature.innerText = Math.round(newTemperature) + " \u00B0C";
  }
}



