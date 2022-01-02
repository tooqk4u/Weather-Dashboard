// set global variables
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
let citySubmitHandler = function (event) {
  event.preventDefault();
  let city = $("#searchBar").val().trim();
  if (city) {
    getWeatherData(city);
    $("#searchBar").val("");
  } else {
    alert("Please enter a city.");
  }
};
// get current weather data and call uv index and 5 day forecast
// also sets location for search history
let getWeatherData = function (city) {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=" +
      units +
      "&appid=" +
      appId
  ).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        conditionSet(data.weather[0].main);
        let lat = data.coord.lat;
        let lon = data.coord.lon;
        let location = data.name;
        let currentDate = moment().format(dateFormat);
        $("#location").html(location + " (" + currentDate + ")" + weather);
        $("#temperature").text(
          "Temperature: " + data.main.temp.toFixed(1) + " " + tempUnitDisplay
        );
        $("#humidity").text("Humidity: " + data.main.humidity + "%");
        $("#windspeed").text(
          "Wind Speed: " + data.wind.speed + " " + speedUnitDisplay
        );
        getFiveDay(lat, lon);
        updateHistory(location);
        fetch(
          "https://api.openweathermap.org/data/2.5/uvi?lat=" +
            lat +
            "&lon=" +
            lon +
            "&appid=" +
            appId
        ).then(function (response) {
          if (response.ok) {
            response.json().then(function (data) {
              $("#uv").html(
                "UV Index: <span class='text-light py-1 px-2 rounded' id='uv-val'>" +
                  data.value.toFixed(1) +
                  "</span>"
              );
              $("#uv-val").removeClass("bg-warning", "bg-danger", "bg-success");
              if (data.value > 2 && data.value < 5) {
                $("#uv-val").addClass("bg-warning");
              } else if (data.value < 2) {
                $("#uv-val").addClass("bg-success");
              } else if (data.value > 5) {
                $("#uv-val").addClass("bg-danger");
              }
            });
          } else {
            alert("Unable to display UV Index. Please try again.");
          }
        });
      });
    } else {
      alert(
        "Unable to display information for that city. Make sure it is spelled correctly."
      );
    }
  });
};
