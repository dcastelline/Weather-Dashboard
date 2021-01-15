// // Possible needed variables
//     // current city display
//     var currCity = "";
//     // 5 day forecast
//     var fiveDay = "";
//     // date
//     var currDate = "";
    // // submit button
    // var searchBtn = "";
    // // URL for AJAX
    // var queryURL = "";

// API key
var apiKey = "0f0bc1c3fcb1960a5ade4fdb7f4a77ef"

// Saved cities searched
var returns = [];
var searchedCities = $(".searched-cities");

// Ready function
$(document).ready(function() {
    console.log("ready");
    
    //Display searched cities
    function searchedCities() {
        returns.empty();
        $("#search-field").val("");
        for (i = 0; i < returns.length; i++) {
            var a = $("<a>");
            a.addClass("searched-city");
            a.text(returns[i]);
            returns.prepend(a);

        }
    };

    // Pull Cities from local storage
    function pullCities() {
        var returnedCities = JSON.parse(localStorage.getItem("cities"));

        if (returnedCities !== null) {
            returns = returnedCities;
        }
        returnedCities;
    };

    // Use the input to get weather
    function checkWeather() {
        var checkedWeather = JSON.parse(localStorage.getItem("currCity"));

        if (checkWeather !== null) {
           searchedCity = checkWeather;
           showWeather();
           showForecast(); 
        }
    };

    // Submit event
    $("form").submit(function(event) {
        event.preventDefault();
        var searchInput = $(".search-field").val().trim();
        console.log(searchInput);
        
        if (searchInput === "") {
            alert("Oops! Please enter a city name to check the weather.")
            } else if (returns.length <= 5) {
                returns.push(searchInput);
                console.log(returns);
            } else if (returns.length > 5) {
                returns.slice();
                returns.push(searchInput);
            };

            // Store city
            localStorage.setItem("city", JSON.stringify(searchInput));
            console.log(localStorage);
        
            //Check weather function
            
        });

    });
