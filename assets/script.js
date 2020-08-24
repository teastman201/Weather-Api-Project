var curDay = moment().format(" L ");

// var key1 = JSON.parse(localStorage.getItem('city', [0]));
// var key2 = JSON.parse(localStorage.getItem('city', [1]));
// var key3 = JSON.parse(localStorage.getItem('city', [2]));
// var key4 = JSON.parse(localStorage.getItem('city', [3]));
// var key5 = JSON.parse(localStorage.getItem('city', [4]));
// var key6 = JSON.parse(localStorage.getItem('city', [5]));
// var key7 = JSON.parse(localStorage.getItem('city', [6]));
// var key8 = JSON.parse(localStorage.getItem('city', [7]));


// localStorage.setItem('city', JSON.stringify(''));
// localStorage.setItem('city2', JSON.stringify(''));
// localStorage.setItem('city3', JSON.stringify(''));
// localStorage.setItem('city4', JSON.stringify(''));
// localStorage.setItem('city5', JSON.stringify(''));
// localStorage.setItem('city6', JSON.stringify(''));
// localStorage.setItem('city7', JSON.stringify(''));
// localStorage.setItem('city8', JSON.stringify(''));
retrievedData = localStorage.getItem("city");
var retrievedKeys = JSON.parse(retrievedData);
console.log(retrievedData);
// var arrayOfKeys = [];




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

  listGroupCity.append(`<button type="button" class="list-city-group list-city${h+1}">${newArrayOfKeys[h]}</button>`);
  // listCity.addClass('list-group-city' + [h]);
  // var listCityClass = 'list-group-city' + [h];
// console.log(listCityClass);
// listCity.addClass(listCityClass);
  // $(".list-group-city").append("<li>");
  // $("<li>").addClass("list-group-city" + [h]);
  // $("<ul>").addClass("list-group list-group-flush" + [i]);
}


// var uList = $("<ul>").addClass("list-group list-group-flush" + [i]);

// newCity = ;


//  function last(newArrayOfKeys) {
//   return newArrayOfKeys[newArrayOfKeys.length - 1];
// }
var lastCity = arrayOfKeys[arrayOfKeys.length - 1];

var city = lastCity;
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=742e68c932f3e4e2f733f5a8c104a762";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function (response) {
  
  // arrayOfKeys.push(response.name);
  // localStorage.setItem('city', JSON.stringify(arrayOfKeys));
  // console.log(arrayOfKeys);
  // var lat = response.coord.lat;
  // var lon = response.coord.lon;
  var temp = response.main.temp
  var tempFah = ((temp - 273.15) * 1.8) + 32;
  var iconCode = response.weather[0].icon;
  var iconURL = "http://openweathermap.org/img/wn/" + iconCode + ".png";
  $("#wicon").attr("src", iconURL);
  $(".card-title-area").text(response.name + curDay);
  $(".card-text-temp").text("Temperature: " + tempFah.toFixed(0));
  $(".card-text-wind").text("Windspeed: " + response.wind.speed);
  $(".card-text-hum").text("Humidity: " + response.main.humidity);
  
  // Code for UV-index     
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
    lTemp.text("Temp: " + tempMulti.toFixed(0));
    lHum.text("Humidty: " + humidMulti);
    $(".card-header").append(uList);
    $(uList).append(lDate);
    $(uList).append(lIcon);
    $(uList).append(lTemp);
    $(uList).append(lHum);

  }

});




// function showBtn(){
  
//   arrayOfKeys=JSON.parse(localStorage.getItem('city'))


//   console.log(arrayOfKeys);

//   for(var i=0; i<arrayOfKeys.length;i++){
// console.log(i,arrayOfKeys[i])

//     
//   }

// }


// $(".list-group-city1").text(retrievedKeys[0]);
// $(".list-group-city2").text(retrievedKeys[1]);
// $(".list-group-city3").text(retrievedKeys[2]);
// $(".list-group-city4").text(retrievedKeys[3]);
// $(".list-group-city5").text(retrievedKeys[4]);
// $(".list-group-city6").text(retrievedKeys[5]);
// $(".list-group-city7").text(retrievedKeys[6]);
// $(".list-group-city8").text(retrievedKeys[7]);


// $('.list-city1').click(function () {
//   // function(execute);
  
//   var city = $(".list-city1").text();
//   var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=742e68c932f3e4e2f733f5a8c104a762";
//   var queryUrlMulti = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=742e68c932f3e4e2f733f5a8c104a762";
 
//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(function (response) {
    
//     arrayOfKeys.push(response.name);
//     localStorage.setItem('city', JSON.stringify(arrayOfKeys));
//     console.log(arrayOfKeys);
//     var lat = response.coord.lat;
//     var lon = response.coord.lon;
//     var temp = response.main.temp
//     var tempFah = ((temp - 273.15) * 1.8) + 32;
//     var iconCode = response.weather[0].icon;
//     var iconURL = "http://openweathermap.org/img/wn/" + iconCode + ".png";
//     $("#wicon").attr("src", iconURL);
//     $(".card-title-area").text('' + curDay);
//     $(".card-text-temp").text("Temperature: " + tempFah.toFixed(0));
//     $(".card-text-wind").text("Windspeed: " + response.wind.speed);
//     $(".card-text-hum").text("Humidity: " + response.main.humidity);

//     // Code for UV-index     
//   });
//   $.ajax({
//     url: queryUrlMulti,
//     method: "GET"
//   }).then(function (responseMulti) {

//     var arrayOfDays = responseMulti.list;

//     var x = 0;

//     for (i = 7; i < arrayOfDays.length; i += 8) {

//       var iconMulti = responseMulti.list[i].weather[0].icon;
//       var iconURLMulti = "http://openweathermap.org/img/wn/" + iconMulti + ".png";
//       x += 1;
//       var multiDate = moment().add(x, "days").format(" L ");


//       var tempMulti = ((responseMulti.list[i].main.temp - 273.15) * 1.8) + 32;
//       var humidMulti = responseMulti.list[i].main.humidity;

//       var uList = $("<ul>").addClass("list-group list-group-flush" + [i]);
//       var lDate = $("<li>").addClass("list-group-item-date" + [i]);
//       var lIcon = $("<img>").addClass("list-group-item-icon" + [i]);
//       var lTemp = $("<li>").addClass("list-group-item-temp" + [i]);
//       var lHum = $("<li>").addClass("list-group-item-hum" + [i]);

//       lDate.text(multiDate);
//       lIcon.attr("src", iconURLMulti);
//       lTemp.text("Temp: " + tempMulti.toFixed(0));
//       lHum.text("Humidty: " + humidMulti);
//       $(".card-header").append(uList);
//       $(uList).append(lDate);
//       $(uList).append(lIcon);
//       $(uList).append(lTemp);
//       $(uList).append(lHum);

//     }

//   });

// });

// Performing GET requests to the Open Weather API and logging the responses to the console

// if ($('.list-city1').on(execte());
$(".list-city1").on("click", execute, myFunction1);
  
  
  // execute();

// if ($('.list-city2').click(function() {
//   var city  = $(".list-city2").text();
//   console.log('clicked');
// })); 

$("#find-city").on("click", execute);

function myFunction1(){
  city = $(".list-city4").text();
  console.log(city);
  return city;
}
function myFunction2(){
  city = $(".list-city2").text();
  return city;
}
function myFunction3(){
  city = $(".list-city3").text();
  return city;
}
function myFunction4(){
  city = $(".list-city4").text();
  return city;
}
function myFunction5(){
  city = $(".list-city5").text();
  return city;
}
function myFunction6(){
  city = $(".list-city6").text();
  return city;
}
function myFunction7(){
  city = $(".list-city7").text();
  return city;
}
function myFunction8(){
  city = $(".list-city8").text();
  return city;
}

function myFunction9(){
  city = $("input").val();
  return city;
}


function execute() {
  // if ($("input").val() == null){
  //   city = 
  // };
  var city = $("input").val();
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=742e68c932f3e4e2f733f5a8c104a762";
  var queryUrlMulti = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=742e68c932f3e4e2f733f5a8c104a762";
// console.log(city);
  // city = $("input").val();
// console.log(city);
  function searchCityWeather(city) {    
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=742e68c932f3e4e2f733f5a8c104a762";    
  };

  city = searchCityWeather(encodeURIComponent(city));
  console.log(city);
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {    
    arrayOfKeys.push(response.name);
    localStorage.setItem('city', JSON.stringify(arrayOfKeys));
    console.log(arrayOfKeys);
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    var temp = response.main.temp
    var tempFah = ((temp - 273.15) * 1.8) + 32;
    var iconCode = response.weather[0].icon;
    var iconURL = "http://openweathermap.org/img/wn/" + iconCode + ".png";
    $("#wicon").attr("src", iconURL);
    $(".card-title-area").text(response.name + curDay);
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

      var uList = $("<ul>").addClass("card list-group list-group-flush" + [i]);
      var lDate = $(".list-group-item-date" + [i]);
      var lIcon = $(".list-group-item-icon" + [i]);
      var lTemp = $(".list-group-item-temp" + [i]);
      var lHum = $(".list-group-item-hum" + [i]);

      lDate.text(multiDate);
      lIcon.attr("src", iconURLMulti);
      lTemp.text("Temp: " + tempMulti.toFixed(0));
      lHum.text("Humidty: " + humidMulti);
      
    }

  });

  // showBtn();
  document.getElementById('city-input').value = "";
  

};
