var curDay = moment().format(" L ");

// var key1 = JSON.parse(localStorage.getItem('city', [0]));
// var key2 = JSON.parse(localStorage.getItem('city', [1]));
// var key3 = JSON.parse(localStorage.getItem('city', [2]));
// var key4 = JSON.parse(localStorage.getItem('city', [3]));
// var key5 = JSON.parse(localStorage.getItem('city', [4]));
// var key6 = JSON.parse(localStorage.getItem('city', [5]));
// var key7 = JSON.parse(localStorage.getItem('city', [6]));
// var key8 = JSON.parse(localStorage.getItem('city', [7]));


// localStorage.setItem('city1', JSON.stringify(''));
// localStorage.setItem('city2', JSON.stringify(''));
// localStorage.setItem('city3', JSON.stringify(''));
// localStorage.setItem('city4', JSON.stringify(''));
// localStorage.setItem('city5', JSON.stringify(''));
// localStorage.setItem('city6', JSON.stringify(''));
// localStorage.setItem('city7', JSON.stringify(''));
// localStorage.setItem('city8', JSON.stringify(''));
retrievedData = localStorage.getItem("city", "value");
var retrievedKeys = JSON.parse(retrievedData);
// console.log(retrievedData);
var arrayOfKeys = [];
$(".list-group-city1").text(retrievedKeys[0]);
$(".list-group-city2").text(retrievedKeys[1]);
$(".list-group-city3").text(retrievedKeys[2]);
$(".list-group-city4").text(retrievedKeys[3]);
$(".list-group-city5").text(retrievedKeys[4]);
$(".list-group-city6").text(retrievedKeys[5]);
$(".list-group-city7").text(retrievedKeys[6]);
$(".list-group-city8").text(retrievedKeys[7]);




// Performing GET requests to the Open Weather API and logging the responses to the console

$('button').click(function () {
  var city = $("input").val();
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=742e68c932f3e4e2f733f5a8c104a762";
  var queryUrlMulti = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=742e68c932f3e4e2f733f5a8c104a762";

  for (h = 1; h < 9; h++) {

    // $(".list-group-city").append("<li>");
    // $("<li>").addClass("list-group-city" + [h]);
    // $("<ul>").addClass("list-group list-group-flush" + [i]);
  }

  // console.log(city);
  $(".list-group-city1").text(retrievedKeys[0]);
$(".list-group-city2").text(retrievedKeys[1]);
$(".list-group-city3").text(retrievedKeys[2]);
$(".list-group-city4").text(retrievedKeys[3]);
$(".list-group-city5").text(retrievedKeys[4]);
$(".list-group-city6").text(retrievedKeys[5]);
$(".list-group-city7").text(retrievedKeys[6]);
$(".list-group-city8").text(retrievedKeys[7]);

  city = $("input").val();

  function searchCityWeather(city) {
    // console.log(city, 'IS THE CITY GETTING PASSED INTO THIS FUNCTION');
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=742e68c932f3e4e2f733f5a8c104a762";
    // console.log(queryURL, 'IS THE URL');
  };

  // console.log(queryURL);

  city = searchCityWeather(encodeURIComponent(city));




  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    
    arrayOfKeys.push(response.name);
    localStorage.setItem('city', JSON.stringify(arrayOfKeys));
    console.log(arrayOfKeys);
    // console.log('');

    var lat = response.coord.lat;
    var lon = response.coord.lon;
    var temp = response.main.temp
    var tempFah = ((temp - 273.15) * 1.8) + 32;
    var iconCode = response.weather[0].icon;
    var iconURL = "http://openweathermap.org/img/wn/" + iconCode + ".png";
    $("#wicon").attr("src", iconURL);
    $(".card-title-area").text('' + curDay);
    $(".card-text-temp").text("Temperature: " + tempFah.toFixed(0));
    $(".card-text-wind").text("Windspeed: " + response.wind.speed);
    $(".card-text-hum").text("Humidity: " + response.main.humidity);

    // Code for UV-index     
  });



  $.ajax({
    url: queryUrlMulti,
    method: "GET"
  }).then(function (responseMulti) {

    var arrayOfDays = responseMulti.list;

    var x = 0;

    for (i = 7; i < arrayOfDays.length; i += 8) {

      var iconMulti = responseMulti.list[i].weather[0].icon;
      var iconURLMulti = "http://openweathermap.org/img/wn/" + iconMulti + ".png";
      x += 1;
      var multiDate = moment().add(x, "days").format(" L ");


      var tempMulti = ((responseMulti.list[i].main.temp - 273.15) * 1.8) + 32;
      var humidMulti = responseMulti.list[i].main.humidity;

      var uList = $("<ul>").addClass("list-group list-group-flush" + [i]);
      var lDate = $("<li>").addClass("list-group-item-date" + [i]);
      var lIcon = $("<img>").addClass("list-group-item-icon" + [i]);
      var lTemp = $("<li>").addClass("list-group-item-temp" + [i]);
      var lHum = $("<li>").addClass("list-group-item-hum" + [i]);

      lDate.text(multiDate);
      lIcon.attr("src", iconURLMulti);
      lTemp.text("Temp: " + tempMulti.toFixed(0));
      lHum.text("Humidty: " + humidMulti);
      $(".card-header").append(uList);
      $(uList).append(lDate);
      $(uList).append(lIcon);
      $(uList).append(lTemp);
      $(uList).append(lHum);

    }

  });


  document.getElementById('city-input').value = "";


});