var returns = [];
var searchedCity = $("#search-field").text();

// Ready function
$(document).ready(function() {
    console.log("ready");
    
    //Display searched cities
    function searchedCities() {
        $(".searched-cities").empty();
        $("#search-field").val("");
        for (i = 0; i < returns.length; i++) {
            var a = $("<a>");
            a.addClass("searched-city");
            a.text(returns[i]);
            $(".searched-cities").prepend(a);

        }
    };

    // Pull Cities from local storage
    function searchedCities() {
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

    // Store search array
    function setArray() {
        localStorage.setItem("cities", JSON.stringify(returns));
    };

    // Store current search
    function setCurrCity() {
        localStorage.setItem("currentCity", JSON.stringify(searchedCity));
    };

    // Submit event
    $("form").submit(function(event) {
        event.preventDefault();
        searchedCity = $(".search-field").val().trim();
        
        if (searchedCity === "") {
            alert("Oops! Please enter a city name to check the weather.")
            } else if (returns.length >= 5) {
                returns.shift();
                returns.push(searchedCity);
            } else {
                returns.push(searchedCity);
            };
            setCurrCity();
            setArray();
            searchedCities();
            showWeather();
            showForecast();
        });
    
    // Weather AJAX call
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?id=524901&appid=0f0bc1c3fcb1960a5ade4fdb7f4a77ef"
    var call = $.ajax({
        url: queryURL,
        method: "GET",
    });
        console.log(call);

    // // Getting weather elements to display on page
    var currWeather = $("#weather-card");
    var date = new Date();
    var fullDate = (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
    var checkCurrCity = $("<h4 class='card-body'>").text(checkCurrCity+" ("+fullDate+")");
    currWeather.append(checkCurrCity);
    var thisCity = call.name;
    var showWind = $("<p class='weather-text'>").text("Wind Speed: " + checkWind + "mph");
    currWeather.append(showWind);


    // Checking UV
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?id=524901&appid=0f0bc1c3fcb1960a5ade4fdb7f4a77ef"
    var uvReturn = $.ajax({
        url: queryURL,
        method: "GET",
    })

    var checkUVIndex = uvReturn.value;
    var uvIndex = $("<span>");
        if (checkUVIndex > 0 && checkUVIndex <= 2.99) {
            uvIndex.addClass("favorable");
        } else if (checkUVIndex >= 3 && checkUVIndex <= 5.99) {
            uvIndex.addClass("moderate");
        } else {
            (checkUVIndex >=6);
            uvIndex.addClass("severe");
        }
        uvIndex.text(checkUVIndex);
        var showUVIndex = $("<p class='weather-text'>").text("UV Index: ");
        uvIndex.append(showUVIndex);
        $("#weather-card").html(currWeather);
    })

    // // forecast AJAX call
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?id=524901&appid=0f0bc1c3fcb1960a5ade4fdb7f4a77ef"
    var call = $.ajax({
        url: queryURL,
        method: "GET",
    })    

        // Five Day forecasts
        var forecast = $("#forecast-cards");
        var fiveDayHeader = $("<h6 class='forecast-header'>").text("Five Day Forecast");
        forecast.append(fiveDayHeader);
        var showForecast = $("<div class='forecast-card'>");
        forecast.append(showForecast);

        for (i=0; i < 5; i++) {
            var cardPanel = $("<div class='forecast-body'>");
            var date = new Date();
            var fullDate = (date.getMonth()+1)+"/"+(date.getDate()+i+1)+"/"+date.getFullYear();
            var futureDate = $("<h6 class='forecast-title'>").text(fullDate);
            cardPanel.append(futureDate);
            var getIcon = call;
            console.log(getIcon);
            var checkHumidity = call;
            var showHumidity = $("<p class='forecast-text'>").text("Hum: " + checkHumidity + "%");
            cardPanel.append(showHumidity);

        }
        $("#forecast-cards").html(forecast);
    

    function pastSearches() {
        searchedCity = $(this).attr("data-name");
        showWeather();
        showForecast();
    };
