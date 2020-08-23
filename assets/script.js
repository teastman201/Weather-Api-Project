var curDay = moment().format(' L ');  

// Adds 1 day to the calendar.
// moment().add(1, 'days').format(' L ');  

// x = number of days after today
// // for ( x = 0; x < 4; x++) {
//   var daysAfter = moment().add(x, 'days').format(' L ');
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
    var tempFah =  ((temp-273.15)*1.8)+32;
    var iconCode = response.weather[0].icon;
    var iconURL = "http://openweathermap.org/img/wn/" + iconCode + ".png";
    $("#wicon").attr('src', iconURL);     
     $(".card-title-area").text(response.name + curDay);
     $(".card-text-temp").text("Temperature: " + tempFah);
     $(".card-text-wind").text("Windspeed: " + response.wind.speed);
     $(".card-text-hum").text("Humidity: " + response.main.humidity);

     // Code for UV-index     
   });

// // Populates five day area
var queryUrlMulti = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=742e68c932f3e4e2f733f5a8c104a762";
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
  console.log(responseMulti);
  var i;
   for (i=7; i < arrayOfDays.length; i+=8) {
     var temp = ((responseMulti.list[i].main.temp-273.15)*1.8)+32;

    // console.log(responseMulti.list[i].dt_txt);
    // console.log(moment().add(i, 'days').format(' L '));
    // console.log(responseMulti.list[i].main.temp);
    
    console.log(temp.toFixed(2));
    console.log(responseMulti.list[i].main.humidity);
    console.log(responseMulti.list[i].wind.speed);

    
  }
  
 
  //  Populates five day area
  //  var tempMulti = responseMulti.main.temp
  //  var tempFahMulti =  ((temp-273.15)*1.8)+32;
  //  var iconCodeMulti = responseMulti.weather[0].icon;
  //  var iconURLMulti = "http://openweathermap.org/img/wn/" + iconCodeMulti + ".png";
  //  $("#wicon").attr('src', iconURLMulti);     
  //   $(".card-title-area").text(responseMulti.name + curDay);
  //   $(".card-text-temp").text("Temperature: " + tempFahMulti);
  //   $(".card-text-wind").text("Windspeed: " + responseMulti.wind.speed);
  //   $(".card-text-hum").text("Humidity: " + responseMulti.main.humidity);
  //   console.log(tempMulti);
  //   Code for UV-index     
  //   console.log(queryUrlMulti);
  });
    



   

