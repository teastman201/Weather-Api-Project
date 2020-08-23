var curDay = moment().format(" L ");

// Adds 1 day to the calendar.
// moment().add(1, "days").format(" L ");  

// x = number of days after today
// // for ( x = 0; x < 4; x++) {
//   var daysAfter = moment().add(x, "days").format(" L ");
// // }


var city = "New York ";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=742e68c932f3e4e2f733f5a8c104a762";
//  var queryLocation = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&" + "lon=" + lon + "&exclude=hourly,daily&appid=742e68c932f3e4e2f733f5a8c104a762";
//  console.log(queryUrlMulti);
//   console.log(queryLocation);
// Performing GET requests to the Open Weather API and logging the responses to the console
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function (response) {
  // console.log(response);   
  // Populates current day area
  var lat = response.coord.lat;
  var lon = response.coord.lon;
  var temp = response.main.temp
  var tempFah = ((temp - 273.15) * 1.8) + 32;
  var iconCode = response.weather[0].icon;
  var iconURL = "http://openweathermap.org/img/wn/" + iconCode + ".png";
  $("#wicon").attr("src", iconURL);
  $(".card-title-area").text(response.name + curDay);
  $(".card-text-temp").text("Temperature: " + tempFah);
  $(".card-text-wind").text("Windspeed: " + response.wind.speed);
  $(".card-text-hum").text("Humidity: " + response.main.humidity);

  // Code for UV-index     
});


// // Populates five day area
var queryUrlMulti = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=742e68c932f3e4e2f733f5a8c104a762";


  // var lDate = $("<li>").addClass("list-group-item-date");
 
  // var uList = $("<ul>").addClass("list-group list-group-flush");




// $(uList).append(".card-header");


$.ajax({
  url: queryUrlMulti,
  method: "GET"
}).then(function (responseMulti) {
  //  console.log(responseMulti);
  //  console.log(responseMulti.city.name);
  //  console.log(Date(responseMulti.list[3].dt));
  var arrayOfDays = responseMulti.list;
  //  console.log(arrayOfDays);
  // var i = arrayOfDays;
  //  for (i=0; i < 5; i++) {
  //   // arrayOfDays += arrayOfDays[i];
  //   console.log(Date(arrayOfDays[i].dt));
  // }
 
  // for (t = 1; t < 6; t++) {
  
  //   var uList = $("<ul>").addClass("list-group list-group-flush" + [t]);
  //   var lDate = $("<li>").addClass("list-group-item-date" + [t]);
  //   var lIcon = $("<li>").addClass("list-group-item-icon" + [t]);
  //   var lTemp = $("<li>").addClass("list-group-item-temp" + [t]);
  //   var lHum = $("<li>").addClass("list-group-item-hum" + [t]);
  //   // uList.text(multiDate);
  //   // lDate.text("date " + m);
  //   lIcon.text("icon here" + [t]);
  //   lTemp.text("temp");
  //   lHum.text("Humidity");
  //   $(".card-header").append(uList); 
  //   $(uList).append(lDate); 
  //   $(uList).append(lIcon);
  //   $(uList).append(lTemp);
  //   $(uList).append(lHum);
  // }
  
  for (m = 1; m < 6; m++) {  
    // var uListGroups = 
    
    // var multiDate = 
    // $(".list-group-item-date").text(multiDate);
    // $(uList).prepend(lDate);
    // console.log(multiDate);
    // $(".list-group-item-date").text(m);   
  }
  
  var x = 0;

  for (i = 7; i < arrayOfDays.length; i += 8) {
  //   var iconMulti = responseMulti.weather[0].icon;
  var iconMulti = responseMulti.list[i].weather[0].icon;
  var iconURLMulti = "http://openweathermap.org/img/wn/" + iconMulti + ".png";

  // $("#wicon").attr("src", iconURLMulti);
  console.log(responseMulti.list[i]);
  
 
  x += 1;
  var multiDate = moment().add(x, "days").format(" L "); 
 
  
    // var groupDate = $("list-group-item-date");
    var tempMulti = ((responseMulti.list[i].main.temp - 273.15) * 1.8) + 32;
    var humidMulti = responseMulti.list[i].main.humidity;
    // var windMulti = responseMulti.list[i].wind.speed;
    var uList = $("<ul>").addClass("list-group list-group-flush" + [i]);
    var lDate = $("<li>").addClass("list-group-item-date" + [i]);
    var lIcon = $("<img>").addClass("list-group-item-icon" + [i]);
    var lTemp = $("<li>").addClass("list-group-item-temp" + [i]);
    var lHum = $("<li>").addClass("list-group-item-hum" + [i]);
    // uList.text(multiDate);
    lDate.text(multiDate);
    lIcon.attr("src", iconURLMulti);
    lTemp.text("Temp: " + tempMulti);
    lHum.text("Humidty: " + humidMulti);    
    $(".card-header").append(uList); 
    $(uList).append(lDate); 
    $(uList).append(lIcon);
    $(uList).append(lTemp);
    $(uList).append(lHum);
    // $(".list-group-item-date1").text(tempMulti);
    // $(".list-group-item-date2").text(tempMulti);
    // $(".list-group-item-date" + [i]).text(tempMulti);
    // console.log(groupDate + [i]);
    // lTemp.text(tempMulti);
    // console.log(responseMulti.list[i].dt_txt);

    // console.log(responseMulti.list[i].main.temp);

    // console.log(tempMulti.toFixed(2));
    // console.log(humidMulti);
    // console.log(windMulti);



  }

  // console.log(responseMulti);
  // var i;
 


  // //  Populates five day area
  //  var tempMulti = responseMulti.main.temp
  //  var tempFahMulti =  ((temp-273.15)*1.8)+32;
  //  var iconCodeMulti = responseMulti.weather[0].icon;
  //  var iconURLMulti = "http://openweathermap.org/img/wn/" + iconCodeMulti + ".png";
  //  $("#wicon").attr("src", iconURLMulti);     
  //   $(".card-title-area").text(responseMulti.name + curDay);
  //   $(".card-text-temp").text("Temperature: " + tempFahMulti);
  //   $(".card-text-wind").text("Windspeed: " + responseMulti.wind.speed);
  //   $(".card-text-hum").text("Humidity: " + responseMulti.main.humidity);
  //   console.log(tempMulti);
  //   // Code for UV-index     
  //   console.log(queryUrlMulti);
});






