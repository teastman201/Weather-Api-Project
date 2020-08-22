var curDay = moment().format(' L ');  

// Adds 1 day to the calendar.
// moment().add(1, 'days').format(' L ');  

var city = "New York ";
   var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=742e68c932f3e4e2f733f5a8c104a762";
   // Performing GET requests to the Open Weather API and logging the responses to the console
   $.ajax({
     url: queryURL,
     method: "GET"
   }).then(function (response) {
    
    // Populates current day area
    var temp = response.main.temp
    var tempFah =  ((temp-273.15)*1.8)+32;
    var iconCode = response.weather[0].icon;
    var iconURL = "http://openweathermap.org/img/wn/" + iconCode + ".png";
    $("#wicon").attr('src', iconURL);     
     $(".card-title-area").text(response.name + curDay);
     $(".card-text-temp").text("Temperature: " + tempFahgu);
     $(".card-text-wind").text("Windspeed: " + response.wind.speed);
     $(".card-text-hum").text("Humidity: " + response.main.humidity);

     // Code for UV-index

     // Populates four day area

    
   });



   

