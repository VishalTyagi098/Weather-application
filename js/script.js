// SELECTORS
let locationName = document.querySelector(".location-name");
let temperature = document.querySelector(".temp-degrees");
let description = document.querySelector(".temp-description");
let icon = document.querySelector(".icon");
let degreeButton = document.querySelector(".degree-changer-btn");

// CALLING API AND EVENT LISTENERS
window.addEventListener("load", () => {
  let long;
  let lat;
});

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    long = position.coords.longitude;
    lat = position.coords.latitude;

    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=2efdb87dc26b3a5828091ce77825d495`;

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
  }, removeButton);
}

function removeButton(error) {
  if (error.PERMISSION_DENIED == true) {
    degreeButton.parentNode.removeChild(degreeButton);
  }
}

// FUNCTIONS
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
