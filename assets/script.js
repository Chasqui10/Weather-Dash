// HTML reference for sections
const targetDaily = $(".currentWeather");
const targetWeekly = $(".5dayForecast");
const formContainer = $("#formContainer")
const btnSearch = $("#btnSearch");
const cityTarget = $("#citySearch");



// function to get API data from openweather.com  
function getCityCoord(){
    //var cityName = "Torrance"
    //const apiKey = "e3d4af60a83c0902cca3fbece818aa9e"
    //const weatherAPIUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`
    cityName = cityTarget.val().trim();
    console.log(cityName);

    // This Url use the City Name to pull the latittude and  longitude 
    const weatherLocApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=Phoenix&limit=1&appid=e3d4af60a83c0902cca3fbece818aa9e`

    fetch(weatherLocApiUrl)
    .then(function (response){
        return response.json();
    })
    .then(function (data){
        console.log(data);
        weatherData = data;
        getCityWeather(); 

    }) 
};

// function is needed on the weather search 


// function for pulling text from the input form and  
function getCityWeather(data){
    let targetCityLat = parseFloat(weatherData[0].lat);
     //console.log(targetCityLat)

    let targetCityLon = parseFloat(weatherData[0].lon);
     //console.log(targetCityLon)

    // const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}`
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${targetCityLat}&lon=${targetCityLon}&appid=e3d4af60a83c0902cca3fbece818aa9e`;
    
    fetch(weatherApiUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data)
    })
};

                
btnSearch.addEventListner("click", getCityCoord());

                 
 
               