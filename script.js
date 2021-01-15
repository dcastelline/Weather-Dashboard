var searchedCity = [];

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
    var call = $.ajax({
        url: "https://api.openweathermap.org/data/2.5/onecall?" + searchedCity + "&units=imperial&appid=0f0bc1c3fcb1960a5ade4fdb7f4a77ef",
        method: "GET",
    });

    // Getting weather elements to display on page
    var currWeather = $("#weather-card");
    var date = new Date();
    var fullDate = (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
    var getIcon = call.weather.icon;
    var showIcon = $("<img src=> alt='weather icon'");
    var checkCurrCity = $("<h4 class='card-body'>").text(checkCurrCity+" ("+fullDate+")");
    currWeather.append(checkCurrCity);
    var checkTemp = call.main.temp;
    var thisCity = call.name;
    var showTemp = $("<p class='weather-text'>").text("Temperature: " + checkTemp + "º F");
    currWeather.append(showTemp);
    var checkHumidity = call.main.humidity;
    var showHumidity = $("<p class='weather-text'>").text("Humidity: " + checkHumidity + "%");
    currWeather.append(showHumidity);
    var checkWind = call.wind.speed.toFixed(0);
    var showWind = $("<p class='weather-text'>").text("Wind Speed: " + checkWind + "mph");
    currWeather.append(showWind);
    var checkLong = call.coord.lon;
    var checkLat = call.coord.lat;

    // Checking UV
    var uvReturn = $.ajax({
        url: "http://api.openweathermap.org/data/2.5/onecall?" + searchedCity + "units=imperial&appid=0f0bc1c3fcb1960a5ade4fdb7f4a77ef",
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

    // forecast AJAX call
    var call = $.ajax({
        url: "http://api.openweathermap.org/data/2.5/onecall?" + searchedCity + "units=imperial&appid=0f0bc1c3fcb1960a5ade4fdb7f4a77ef",
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
            var getIcon = call.list[i].weather[0].icon;
            console.log(getIcon);
            var showIcon = $("<img src''");
            cardPanel.append(showIcon);
            var checkTemp = call.main.temp;
            var showTemp = $("<p class='forecast-text'>").text("Temp: " + checkTemp + "º F");
            cardPanel.append(showTemp);
            var checkHumidity = call.list[i].main.humidity;
            var showHumidity = $("<p class='forecast-text'>").text("Hum: " + checkHumidity + "%");
            cardPanel.append(showHumidity);
            futurePanel.append(cardPanel);
            showForecast.append(futurePanel);
        }
        $("#forecast-cards").html(forecast);
    

    function pastSearches() {
        searchedCity = $(this).attr("data-name");
        showWeather();
        showForecast();
    }