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

// search submission listener
$("#search-container").on("submit", citySubmitHandler);

// toggle weather condition icons
var conditionSet = function (dataSet) {                 
  switch (dataSet) {
    case "Thunderstorm":
      weather = " <img src='./assets/images/thunder.svg' />";
      break;
    case "Drizzle":
      weather = " <img src='./assets/images/drizzle.svg' />";
      break;
    case "Mist":
      weather = " <img src='./assets/images/mist.svg' />";
      break;
    case "Rain":
      weather = " <img src='./assets/images/rain.svg' />";
      break;
    case "Snow":
      weather = " <img src='./assets/images/snow.svg' />";
      break;
    case "Overcast":
      weather = " <img src='./assets/images/overcast.svg' />";
      break;
    case "Sunny":
      weather = " <img src='./assets/images/sunny.svg' />";
      break;
    case "Fog":
      weather = " <img src='./assets/images/fog.svg' />";
      break;
    case "Sleet":
      weather = " <img src='./assets/images/sleet.svg' />";
      break;
    case "Clouds":
      weather = " <img src='./assets/images/clouds.svg' />";
      break;
    case "Windy":
      weather = " <img src='./assets/images/wind.svg' />";
      break;
    case "Tornado":
      weather = " <img src='./assets/images/tornado.svg' />";
      break;
    default:
      "Default                      ";
      weather = " <img src='./assets/images/sunny.svg'/>";
      break;
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
// function for the five day forecast
let getFiveDay = function (lat, lon) {
  fetch(
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      lat +
      "&lon=" +
      lon +
      "&exclude=minutely,hourly&units=" +
      units +
      "&appid=" +
      appId
  ).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        let fiveDay = data.daily;
        fiveDay.splice(6);
        fiveDay.shift();
        let i = 0;
        let x = 1;
        $(".fiveDay").each(function () {
          $(this)
            .children(".fiveDay-temp")
            .text("Temp: " + Math.round(fiveDay[i].temp.day) + tempUnitDisplay);
          $(this)
            .children(".fiveDay-hum")
            .text("Hum: " + fiveDay[i].humidity + "%");
          conditionSet(fiveDay[i].weather[0].main);
          $(this).children(".fiveDay-condition").html(weather);
          let forecastDate = moment().add(x, "days").format(fiveDateFormat);
          $(this).children(".fiveDay-date").text(forecastDate);
          ++x;
          ++i;
        });
      });
    } else {
      alert("Unable to display five day forecast. Please try again");
    }
  });
};
// load search-history and update history buttons
let loadHistory = function () {
  cityHistory = localStorage.getItem("cityHistory");
  cityHistory = JSON.parse(cityHistory);
  if (!cityHistory) {
    cityHistory = [];
    return;
  } else {
    for (var i = 0; i < cityHistory.length; ++i) {
      let historyEl = document.createElement("p");
      historyEl.textContent = cityHistory[i];
      historyEl.classList =
        "search-history list-group-item btn btn-light border border-black-50 col-6 col-md-12 mb-1 overflow-hidden";
      $("#search-container").append(historyEl);
    }  
  }
};

























