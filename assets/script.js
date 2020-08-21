// // var city = "New York";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=742e68c932f3e4e2f733f5a8c104a762";

// Performing GET requests to the Open Weather API and logging the responses to the console
$.ajax({
    queryURL,
    method: "GET"
}).then(function (response) {
    console.log(response);
});
var city = $("#city-input").val();

$("#find-city").on("click", function () {

    console.log('hello');

});