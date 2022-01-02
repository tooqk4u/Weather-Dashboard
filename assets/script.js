// set global letiables
let appId = "6afefe490042d7fc49826f4e6606e420";
let units = "imperial";
let tempUnitDisplay = "°F";
let speedUnitDisplay = "MPH";
let dateFormat = "MM/DD/YYYY";
let fiveDateFormat = "dddd MM/DD YYYY";
let cityHistory = [];

let currentTime = moment().format("dddd MMMM, Do, YYYY, h:mm A");
let showTime = document.getElementById("currentDay");
showTime.innerHTML = currentTime;
console.log(currentTime);

// search submission listener
$("#search-container").on("submit", citySubmitHandler);


// function for city search
var citySubmitHandler = function (event) {
  event.preventDefault();
  var city = $("#searchBar").val().trim();
  if (city) {
    getWeatherData(city);
    $("#searchBar").val("");
  } else {
    alert("Please enter a city.");
  }
};


