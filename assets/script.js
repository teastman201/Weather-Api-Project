var value = ""

function thingThing() {
  console.log(value)
}



var curDay = moment().format(" L ");

retrievedData = localStorage.getItem("city");
var retrievedKeys = JSON.parse(retrievedData);
console.log(retrievedData);

if (retrievedKeys) {
  var arrayOfKeys = retrievedKeys;
} else {
  var arrayOfKeys = [];
}

var newArrayOfKeys = [...new Set(arrayOfKeys)];

var listGroupCity = $(".list-group-city");

console.log(newArrayOfKeys);


var listCity = $('.list-city');

for (h = 0; h < newArrayOfKeys.length; h++) {

  listGroupCity.append(`<button type="button" class="my-button-class list-city-group list-city${h + 1}">${newArrayOfKeys[h]}</button>`);

}


var lastCity = arrayOfKeys[arrayOfKeys.length - 1];

var city = lastCity;
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=742e68c932f3e4e2f733f5a8c104a762";
// 

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function (response) {
  var lat = response.coord.lat;
  var lon = response.coord.lon;
  var queryUV = "https://api.openweathermap.org/data/2.5/uvi?" + "&APPID=742e68c932f3e4e2f733f5a8c104a762&lat=" + lat + "&lon=" + lon;

  var temp = response.main.temp
  var tempFah = ((temp - 273.15) * 1.8) + 32;
  var iconCode = response.weather[0].icon;
  var iconURL = "http://openweathermap.org/img/wn/" + iconCode + ".png";
  $("#wicon").attr("src", iconURL);
  $(".card-title-area").text(`${response.name} ${curDay}`);
  $(".card-text-temp").text("Temperature: " + tempFah.toFixed(2) + " °F");
  $(".card-text-hum").text("Humidity: " + response.main.humidity + "%");
  $(".card-text-wind").text("Windspeed: " + response.wind.speed + " MPH");



  $.ajax({
    url: queryUV,
    method: "GET"
  }).then(function (response2) {

    console.log(response2.value);
    $(".ultraViolet").text(response2.value);
    if (response2.value < 2) {
      $(".ultraViolet").addClass("card-text-uv1");
    }
    if (response2.value >= 3) {
      $(".ultraViolet").addClass("card-text-uv2");
    }
    if (response2.value >= 6) {
      $(".ultraViolet").addClass("card-text-uv3");
    }

  });

});

var queryUrlMulti = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=742e68c932f3e4e2f733f5a8c104a762";

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
    lTemp.text("Temp: " + tempMulti.toFixed(2) + " °F");
    lHum.text("Humidty: " + humidMulti + "%");
    $(".card-header").append(uList);
    $(uList).append(lDate);
    $(uList).append(lIcon);
    $(uList).append(lTemp);
    $(uList).append(lHum);

  }

});

$(".list-city1").on("click", doSomething);




// function myFunction1(){
//   city = $(".list-city4").text();
//   console.log(city);
//   return city;
// }
// 
// function myFunction9(){
//   city = $("input").val();
//   return city;
// }




function doSomething() {

  // var city = $("input").val();
  // var city = "";
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=742e68c932f3e4e2f733f5a8c104a762";
  var queryUrlMulti = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=742e68c932f3e4e2f733f5a8c104a762";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    var queryUV = "https://api.openweathermap.org/data/2.5/uvi?" + "&APPID=742e68c932f3e4e2f733f5a8c104a762&lat=" + lat + "&lon=" + lon;
    arrayOfKeys.push(response.name);
    localStorage.setItem('city', JSON.stringify(arrayOfKeys));
    console.log(arrayOfKeys);

    var temp = response.main.temp
    var tempFah = ((temp - 273.15) * 1.8) + 32;
    var iconCode = response.weather[0].icon;
    var iconURL = "http://openweathermap.org/img/wn/" + iconCode + ".png";
    $("#wicon").attr("src", iconURL);
    $(".card-title-area").text(response.name + curDay);
    $(".card-text-temp").text("Temperature: " + tempFah.toFixed(2) + " °F");
    $(".card-text-hum").text("Humidity: " + response.main.humidity);
    $(".card-text-wind").text("Windspeed: " + response.wind.speed + " MPH");


    $.ajax({
      url: queryUV,
      method: "GET"
    }).then(function (response2) {

      console.log(response2.value);
      $(".ultraViolet").text(response2.value);
      if (response2.value < 2) {
        $(".ultraViolet").addClass("card-text-uv1");
      }
      if (response2.value >= 3) {
        $(".ultraViolet").addClass("card-text-uv2");
      }
      if (response2.value >= 6) {
        $(".ultraViolet").addClass("card-text-uv3");
      }

    });


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

      var uList = $("<ul>").addClass("card list-group list-group-flush" + [i]);
      var lDate = $(".list-group-item-date" + [i]);
      var lIcon = $(".list-group-item-icon" + [i]);
      var lTemp = $(".list-group-item-temp" + [i]);
      var lHum = $(".list-group-item-hum" + [i]);

      lDate.text(multiDate);
      lIcon.attr("src", iconURLMulti);
      lTemp.text("Temp: " + tempMulti.toFixed(2) + " °F");
      lHum.text("Humidty: " + humidMulti + "%");

    }

  });

  document.getElementById('city-input').value = "";

};

$(document).on("click", ".my-button-class", function () {
  city = $(this).text()

  doSomething();
  // console.log("clicked");
})


$(document).on("click", "#find-city", function () {
  city = $("input").val();

  doSomething();
  // console.log("clicked");
})
