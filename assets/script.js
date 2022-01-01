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
