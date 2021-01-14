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

// saved cities
var returns = [];

$(document).ready(function() {
    console.log("ready");
  
    $("form").submit(function(event) {
        event.preventDefault();
        console.log("search");
       
        var searchInput = $(".search-field").val();
        if (searchInput === "") {
            alert("Oops! Please enter a city name to check the weather.")
        } else if (returns.length <= 5) {
            returns.shift();
            returns.push(searchInput);
            console.log(searchInput);
            };
        
            // $.ajax(
                
            // )
        });

    });
