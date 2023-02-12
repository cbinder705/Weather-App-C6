const theCity = document.querySelector("#current-city");
const theDate = document.querySelector("#current-date");
const apiKey = "106f2f72e03bbf98c782d152c4ecb390";
const theTemperature = document.querySelector("#temp");
const theHumidity = document.querySelector("#humidity");
const theWindSpeed = document.querySelector("#wind-speed");
const currentSearch = document.getElementById("search-input");
const searchHistory = localStorage.getItem("#search-history");
const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", function () {
  if (document.getElementById("search-input").value != "") {
    weatherSearch(currentSearch.value);
  } else {
    alert("Search criteria not met.");
  }
});

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
          cord.push(array.slice(i, (i += len)));
        }
        return geoCord;
      }

      function formatDate(d8) {
        dateString =
          d8.slice(5, 7) + "/" + d8.slice(8, 10) + "/" + d8.slice(0, 4);
        return dateString;
      }
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
      )
        .then((response) => {
          return response.json();
        })
        .then((wData) => {
          const description = wData.list[0].weather[0].description;
          const day = formatDate(wData.list[0].dt_txt);
          const city = wData.city.name;
          const temperature = wData.list[0].main.temp;
          const humidity = wData.list[0].main.humidity;
          const windSpeed = wData.list[0].wind.speed;
          theDate.innerHTML = `&nbsp;(` + day + `)`;
          theCity.textContent = city;
          theTemperature.textContent = temperature + " °F";
          theHumidity.textContent = humidity + "%";
          theWindSpeed.textContent = windSpeed + "mph";
          const date = wData.list[0].dt_txt;
          const followingDates = wData.list.filter((d8) => d8.dt_txt !== date);
          const ArrayOfDates = geoCord(followingDates, 8);
          ArrayOfDates.forEach((date, id) => {
            const today = date[2];
            document.querySelector(`#future-date${id}`).innerHTML = formatDate(
              today.dt_txt
            );
            document.querySelector(`#temp${id}`).innerHTML =
              today.main.temp + " °F";
            document.querySelector(`#wind-speed${id}`).innerHTML =
              today.wind.speed + " MPH";
            document.querySelector(`#humidity${id}`).innerHTML =
              today.main.humidity + " %";
          });
        });
    });
}
// date to be formatted using formatDate()
// create functions to save city searches and to display searches on html
// need two fetch calls to convert city input to lat, long
