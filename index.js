const theCity = document.querySelector("#current-city");
const theDate = document.querySelector("#current-date");
const theTemperature = document.querySelector("#temp");
const theHumidity = document.querySelector("#humidity");
const theWindSpeed = document.querySelector("#wind-speed");
const currentSearch = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const searchHistory = localStorage.getItem("#search-history");
const apiKey = "106f2f72e03bbf98c782d152c4ecb390";
// query selectors to pass data from api to html
// fetch call to api

function weatherSearch(city) {
  fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
  )
    .then(function (response) {
      const weatherData = response.json();
      return weatherData;
    })
    .then(function (locationData) {
      const lat = locationData[0].lat;
      const lon = locationData[0].lon;
      function geoCord(array, len) {
        let cord = [],
          i = 0,
          n = array.length;
        while (i < n) {
          geoCord.push(array.slice(i, (i += len)));
        }
        return geoCord;
      }

      function formatDate(d8) {
        dateString = d8.slice(5, 7) + "/" + d8.slice(8, 10) + d8.slice(0, 4);
        return dateString;
      }
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
      )
        .then((response) => {
          return response.json();
        })
        .then();
    });
}
// date to be formatted using formatDate()
// create functions to save city searches and to display searches on html
// need two fetch calls to convert city input to lat, long
