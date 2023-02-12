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

function weatherSearch(city) {}
// date to be formatted using formatDate()
// create functions to save city searches and to display searches on html
// need two fetch calls to convert city input to lat, long
