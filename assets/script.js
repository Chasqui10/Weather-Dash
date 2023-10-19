// HTML reference for sections
const targetDaily = $(".currentWeather");
const targetWeekly = $(".5dayForecast");
var formContainer = $("#formContainer")
var btnSearch = $("#btnSearch");
var cityTarget = $("#citySearch");

//Api Key for openweather
const apiKey = "e3d4af60a83c0902cca3fbece818aa9e"

//Event Listener List
btnSearch.on("click", getCityCoord);


// function to get API data from openweather.com for the target City's coordinates for the needed API pulls indicating weather based off the city's name from the input.
function getCityCoord(event){
    event.preventDefault();
    cityName = cityTarget.val().trim();
    const weatherLocApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}&units=imperial`

    fetch(weatherLocApiUrl)
    .then(function (response){
        return response.json();
    })
    .then(function (data){
        weatherData = data;
        getCityWeather(data); 
        getCity5DayWeather(data);

    }) 
};

// function for pulling text from the input form and  
function getCityWeather(){
    let targetCityLat = parseFloat(weatherData[0].lat);
    let targetCityLon = parseFloat(weatherData[0].lon);

    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${targetCityLat}&lon=${targetCityLon}&appid=${apiKey}&units=imperial`
    
    fetch(weatherApiUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        currentData = data;
        placeCurrentWeather(data);
    })

};

//function placing the data into respective container [current Forecast]
// function placeCurrentWeather(){

//     //console.log(currentData); //matches origin object data
//     currentTemp = currentData.main.temp;
//     //console.log(currentTemp); // gets me the degrees in temperature
//     currentWindSpeed = currentData.wind.speed;
//     //console.log(currentWindSpeed);// gets me the wind speed
//     currentHumidity = currentData.main.humidity;
//     //console.log(currentHumidity); //gets me the humidity percentage
 
// }


function getCity5DayWeather() {
    let targetCityLat = parseFloat(weatherData[0].lat);
    let targetCityLon = parseFloat(weatherData[0].lon);

    const weather5dayApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${targetCityLat}&lon=${targetCityLon}&appid=${apiKey}&units=imperial`
    
    fetch(weather5dayApiUrl)
    .then(function(response){
        return response.json();
    }).then(function(data){
        //console.log(data);
    })
};

//function placing the data into respective container [5 Day Forecast]
                



                 
 
               