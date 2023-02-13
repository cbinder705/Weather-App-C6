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
        return cord;
      }

      function formatDate(d8) {
        let dateString =
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
          const wDay = formatDate(wData.list[0].dt_txt);
          const city = wData.city.name;
          const temperature = wData.list[0].main.temp;
          const humidity = wData.list[0].main.humidity;
          const windSpeed = wData.list[0].wind.speed;
          theDate.innerHTML = `&nbsp;(` + wDay + `)`;
          theCity.textContent = city;
          theTemperature.textContent = temperature + " °F";
          theHumidity.textContent = humidity + "%";
          theWindSpeed.textContent = windSpeed + "mph";

          const daysAfterToday = wData.list.filter(
            (item) => item.dt_txt !== wDay
          );
          //8 below is because we are only showing the past 8 city search requests so keep array to last 8 always
          let ArrayOfDates = geoCord(daysAfterToday, 8);
          console.log(ArrayOfDates);
          ArrayOfDates.forEach((day, idx) => {
            // array wasnt being parsed correctly so i just used query selectors for each individual day of the 5 day cast.
            const todaysDate1 = day[0];
            const todaysDate2 = day[1];
            const todaysDate3 = day[2];
            const todaysDate4 = day[3];
            const todaysDate5 = day[4];

            document.querySelector("#future-date1").innerHTML = formatDate(
              todaysDate1.dt_txt
            );
            document.querySelector("#temp1").innerHTML =
              todaysDate1.main.temp + " °F";
            document.querySelector("#wind-speed1").innerHTML =
              todaysDate1.wind.speed + " MPH";
            document.querySelector("#humidity1").innerHTML =
              todaysDate1.main.humidity + " %";

            document.querySelector("#future-date2").innerHTML = formatDate(
              todaysDate2.dt_txt
            );
            document.querySelector("#temp2").innerHTML =
              todaysDate2.main.temp + " °F";
            document.querySelector("#wind-speed2").innerHTML =
              todaysDate2.wind.speed + " MPH";
            document.querySelector("#humidity2").innerHTML =
              todaysDate2.main.humidity + " %";

            document.querySelector("#future-date3").innerHTML = formatDate(
              todaysDate3.dt_txt
            );
            document.querySelector("#temp3").innerHTML =
              todaysDate3.main.temp + " °F";
            document.querySelector("#wind-speed3").innerHTML =
              todaysDate3.wind.speed + " MPH";
            document.querySelector("#humidity3").innerHTML =
              todaysDate3.main.humidity + " %";

            document.querySelector("#future-date4").innerHTML = formatDate(
              todaysDate4.dt_txt
            );
            document.querySelector("#temp4").innerHTML =
              todaysDate4.main.temp + " °F";
            document.querySelector("#wind-speed4").innerHTML =
              todaysDate4.wind.speed + " MPH";
            document.querySelector("#humidity4").innerHTML =
              todaysDate4.main.humidity + " %";

            document.querySelector("#future-date5").innerHTML = formatDate(
              todaysDate5.dt_txt
            );
            document.querySelector("#temp5").innerHTML =
              todaysDate5.main.temp + " °F";
            document.querySelector("#wind-speed5").innerHTML =
              todaysDate5.wind.speed + " MPH";
            document.querySelector("#humidity5").innerHTML =
              todaysDate5.main.humidity + " %";
          });
        })
        .catch((err) => {
          console.log(err);
        })
        .catch(function (err) {
          return err;
        });
    });
}
//end of main search function

// date to be formatted using formatDate()
// create functions to save city searches and to display searches on html
// need two fetch calls to convert city input to lat, long

// const today = ArrayOfDates[2];
// console.log(today);
// document.querySelector("#future-date1").innerHTML = formatDate(
//   today.dt_txt
// );
// document.querySelector("#temp1").innerHTML = today.main.temp + " °F";
// document.querySelector("#wind-speed1").innerHTML =
//   today.wind.speed + " MPH";
// document.querySelector("#humidity1").innerHTML =
//   today.main.humidity + " %";
