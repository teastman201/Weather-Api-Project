// Checks moment API for current date and sets it to variable
var curDay = moment().format(" L ");

// Grabs localStorage for specific key
retrievedData = localStorage.getItem("city");

// Converts key data to strings
var retrievedKeys = JSON.parse(retrievedData);

// Checks if localStorage data is empty or not
if (retrievedKeys) {
  var arrayOfKeys = retrievedKeys;
} else {
  var arrayOfKeys = [];
}

// Trims duplicate data from array
var newArrayOfKeys = [...new Set(arrayOfKeys)];

// Sets element with class to variable
var listGroupCity = $(".list-group-city");
var listCity = $('.list-city');
var lastCity = arrayOfKeys[arrayOfKeys.length - 1];

// Loops through and appends results
for (h = 0; h < newArrayOfKeys.length; h++) {
  listGroupCity.append(`<button type="button" class="my-button-class list-city-group list-city${h + 1}">${newArrayOfKeys[h]}</button>`);
}

// Encodes entered data with %20 to account for blank spaces in URL
var city = encodeURIComponent(lastCity);

// Sets API URL for single day forecast to variable
var queryWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=742e68c932f3e4e2f733f5a8c104a762";

// Ajaxx call on weather API for current days' weather
$.ajax({
  url: queryWeather,
  method: "GET"
}).then(function (weatherResponse) {

  var lat = weatherResponse.coord.lat;
  var lon = weatherResponse.coord.lon;
  var queryUV = "https://api.openweathermap.org/data/2.5/uvi?" + "&APPID=742e68c932f3e4e2f733f5a8c104a762&lat=" + lat + "&lon=" + lon;
  
  
  // Sets API response data to a variable
  var weatherTemp = weatherResponse.main.temp;
  var tempFah = ((weatherTemp - 273.15) * 1.8) + 32;
  var weatherIconCode = weatherResponse.weather[0].icon;
  var weatherIconURL = "https://openweathermap.org/img/wn/" + weatherIconCode + ".png";

  // Updates element properties with API response data stored in variables
  $("#wicon").attr("src", weatherIconURL);
  $(".card-title-area").text(`${weatherResponse.name} ${curDay}`);
  $(".card-text-temp").text("Temperature: " + tempFah.toFixed(2) + " °F");
  $(".card-text-hum").text("Humidity: " + weatherResponse.main.humidity + "%");
  $(".card-text-wind").text("Windspeed: " + weatherResponse.wind.speed + " MPH");


  //Ajax call on weather API for UV index
  $.ajax({
    url: queryUV,
    method: "GET"
  }).then(function (uvResponse) {

    // Checks if returned value is greater than or less than specified amount and applies appropriate classes
    $(".ultraViolet").text(uvResponse.value);
    if (uvResponse.value < 2) {
      $(".ultraViolet").addClass("card-text-uv1");
    }
    if (uvResponse.value >= 3) {
      $(".ultraViolet").addClass("card-text-uv2");
    }
    if (uvResponse.value >= 6) {
      $(".ultraViolet").addClass("card-text-uv3");
    }
   

  });

  var queryGeo = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=742e68c932f3e4e2f733f5a8c104a762"; 

  // Ajax call on weather API for current geolocation data
  $.ajax({
    url: queryGeo,
    method: "GET"
  }).then(function (geoResponse) {

    // returns geo location lat + lon
    // console.log(geoResponse);
   

  });

});

// Sets API URL for multi-day forecast to variable
var queryForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=742e68c932f3e4e2f733f5a8c104a762";

// Ajax call on URL for multi-day forecast
$.ajax({
  url: queryForecast,
  method: "GET"
}).then(function (forecastResponse) {

  var arrayOfDays = forecastResponse.list;

  var x = 0;

  // Loop to get ajax response for specific times of the day for five days
  for (i = 7; i < arrayOfDays.length; i += 8) {

    var forecastIcon = forecastResponse.list[i].weather[0].icon;
    var forecastIconURL = "https://openweathermap.org/img/wn/" + forecastIcon + ".png";
    x += 1;
    var forecastDates = moment().add(x, "days").format(" L ");


    var forecastTemp = ((forecastResponse.list[i].main.temp - 273.15) * 1.8) + 32;
    var forecastHumidity = forecastResponse.list[i].main.humidity;

    // Creates elements and sets their class
    var uList = $("<ul>").addClass("list-group list-group-flush" + [i]);
    var listDate = $("<li>").addClass("list-group-item-date" + [i]);
    var listIcon = $("<img>").addClass("list-group-item-icon" + [i]);
    var listTemp = $("<li>").addClass("list-group-item-temp" + [i]);
    var listHum = $("<li>").addClass("list-group-item-hum" + [i]);

    // Updates properties of created elements
    listDate.text(forecastDates);
    listIcon.attr("src", forecastIconURL);
    listTemp.text("Temp: " + forecastTemp.toFixed(2) + " °F");
    listHum.text("Humidty: " + forecastHumidity + "%");

    // Appends elements to DOM at respective locations
    $(".card-header").append(uList);
    $(uList).append(listDate);
    $(uList).append(listIcon);
    $(uList).append(listTemp);
    $(uList).append(listHum);

  }

});

// Function to check today's weather.
function getWeather() {

  var queryWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=742e68c932f3e4e2f733f5a8c104a762";
  var queryForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=742e68c932f3e4e2f733f5a8c104a762";

  $.ajax({
    url: queryWeather,
    method: "GET"
  }).then(function (weatherReponse) {
    var lat = weatherReponse.coord.lat;
    var lon = weatherReponse.coord.lon;
    var queryUV = "https://api.openweathermap.org/data/2.5/uvi?" + "&APPID=742e68c932f3e4e2f733f5a8c104a762&lat=" + lat + "&lon=" + lon;
    arrayOfKeys.push(weatherReponse.name);
    localStorage.setItem('city', JSON.stringify(arrayOfKeys));
    console.log(arrayOfKeys);

    var weatherTemp = weatherReponse.main.temp
    var tempFah = ((weatherTemp - 273.15) * 1.8) + 32;
    var weatherIconCode = weatherReponse.weather[0].icon;
    var weatherIconURL = "https://openweathermap.org/img/wn/" + weatherIconCode + ".png";
    $("#wicon").attr("src", weatherIconURL);
    $(".card-title-area").text(weatherReponse.name + curDay);
    $(".card-text-temp").text("Temperature: " + tempFah.toFixed(2) + " °F");
    $(".card-text-hum").text("Humidity: " + weatherReponse.main.humidity + "%");
    $(".card-text-wind").text("Windspeed: " + weatherReponse.wind.speed + " MPH");


    $.ajax({
      url: queryUV,
      method: "GET"
    }).then(function (uvResponse) {

      console.log(uvResponse.value);
      $(".ultraViolet").text(uvResponse.value);
      if (uvResponse.value < 2) {
        $(".ultraViolet").addClass("card-text-uv1");
      }
      if (uvResponse.value >= 3) {
        $(".ultraViolet").addClass("card-text-uv2");
      }
      if (uvResponse.value >= 6) {
        $(".ultraViolet").addClass("card-text-uv3");
      }

    });


  });

  $.ajax({
    url: queryForecast,
    method: "GET"
  }).then(function (forecastResponse) {

    var arrayOfDays = forecastResponse.list;

    var x = 0;

    for (i = 7; i < arrayOfDays.length; i += 8) {

      var forecastIcon = forecastResponse.list[i].weather[0].icon;
      var forecastIconURL = "https://openweathermap.org/img/wn/" + forecastIcon + ".png";
      x += 1;
      var forecastDates = moment().add(x, "days").format(" L ");


      var forecastTemp = ((forecastResponse.list[i].main.temp - 273.15) * 1.8) + 32;
      var forecastHumidity = forecastResponse.list[i].main.humidity;


      var listDate = $(".list-group-item-date" + [i]);
      var listIcon = $(".list-group-item-icon" + [i]);
      var listTemp = $(".list-group-item-temp" + [i]);
      var listHum = $(".list-group-item-hum" + [i]);

      listDate.text(forecastDates);
      listIcon.attr("src", forecastIconURL);
      listTemp.text("Temp: " + forecastTemp.toFixed(2) + " °F");
      listHum.text("Humidty: " + forecastHumidity + "%");

    }

  });

  // Clears the input field after clicking submit
  document.getElementById('city-input').value = "";

};

// Click event listener that executes a function
$(document).on("click", ".my-button-class", function () {
  city = $(this).text();
  getWeather();

})

$(document).on("click", "#find-city", function () {
  city = $("input").val();
  getWeather();
})

// var x = document.getElementById("current-day-area-area");

// function getLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition);
//   } else { 
//     x.innerHTML = "Geolocation is not supported by this browser.";
//   }
// }

// function showPosition(position) {
//   x.innerHTML = "Latitude: " + position.coords.latitude + 
//   "<br>Longitude: " + position.coords.longitude;
// }

// console.log(showPosition());