    // var city = "New York";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=742e68c932f3e4e2f733f5a8c104a762";

    // Performing GET requests to the Open Weather API and logging the responses to the console
    $.ajax({
      queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);
    });    
    var city = $("#city-input").val();

    $("#find-city").on("click", function() {

// event.preventDefault() can be used to prevent an event's default behavior.
// Here, it prevents the submit button from trying to submit a form when clicked
// event.preventDefault();
console.log('hello');
// Here we grab the text from the input box


// Here we construct our URL
// var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

// Write code between the dashes below to hit the queryURL with $ajax, then take the response data
// and display it in the div with an id of movie-view

// ------YOUR CODE GOES IN THESE DASHES. DO NOT MANUALLY EDIT THE HTML ABOVE.

// $.ajax({
//   url: queryURL,
//   method: "GET"
// }).then(function(response) {
//   $("#movie-view").text(JSON.stringify(response));
// });

// // -----------------------------------------------------------------------

});