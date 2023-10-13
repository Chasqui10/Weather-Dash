// HTML reference for sections
const targetDaily = $('#dailyForecast');
const targetWeekly = $('#weeklyForecast');
const formContainer = $('#formContainer')
const btnSearch = $('#btnSearch');



// function to get API data from openweather.com  
function getWeatherData(){
    //var cityName = "Torrance"
    //const apiKey = "e3d4af60a83c0902cca3fbece818aa9e"
    //const weatherAPIUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`
    
    
    // This Url use the City Name to pull the latittude and  longitude 
    const weatherAPIUrl = `http://api.openweathermap.org/geo/1.0/direct?q=Phoenix&limit=1&appid=e3d4af60a83c0902cca3fbece818aa9e`

    fetch(weatherAPIUrl)
    .then(function (response){
        return response.json();
    })
    .then(function (data){
        console.log(data);
    }) 
};

// function is needed on the weather search 


// function for pulling text from the input form and  
function WeatherSearch(){

};