// HTML reference for sections
const targetDaily = $("#currentWeather");
const targetWeekly = $(".5dayForecast");
var formContainer = $("#formContainer")
var btnSearch = $("#btnSearch");
var cityTarget = $("#citySearch");
var cityHistoryContainer = $(".cityHistory");


// Api Key for openweather
const apiKey = "e3d4af60a83c0902cca3fbece818aa9e"

// Event Listener List
btnSearch.on("click", getCityCoord);

// Function to get API data from openweather.com for the target City's coordinates for the needed API pulls indicating weather based off the city's name from the input.
function getCityCoord(event){
    event.preventDefault();
    cityName = cityTarget.val().trim();
    localStorage.setItem('City Name', cityName);
    storeCityHistory();
    const weatherLocApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}&units=imperial`

    fetch(weatherLocApiUrl)
    .then(function (response){
        return response.json();
    })
    .then(function (data){
        weatherData = data;
        getCityWeather(data); 
        getCity5DayWeather(data);

    });
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
        //console.log(data);
        currentData = data;
        placeCurrentWeather(data);
    })

};

//function placing the data into respective container [current Forecast]
function placeCurrentWeather(){
    var currentDetails = $(".currentDetails");
    for (let i = 0; i< currentDetails.length; i++){
        currentDetails[i].remove();
    }
    
    currentTemp = currentData.main.temp;
    //console.log(currentTemp); // gets me the degrees in temperature
    currentWindSpeed = currentData.wind.speed;
    //console.log(currentWindSpeed);// gets me the wind speed
    currentHumidity = currentData.main.humidity;
    //console.log(currentHumidity); //gets me the humidity percentage
    currentIcon = currentData.weather[0].icon;
    //console.log(currentIcon); //gets the id icon from the weather API

    // Appending the elements that will pop up after the city is searched. 
    targetDaily.append(`<h2 class="currentDetails">${cityName} <img class="currentAlign" alt= "weather icon" src=https://openweathermap.org/img/wn/${currentIcon}@2x.png ></h2>`);
    targetDaily.append(`<h6 class="currentDetails"> Temperature: ${currentTemp}°F</h6>`);
    targetDaily.append(`<h6 class="currentDetails"> Wind Speed: ${currentWindSpeed} mph</h6>`);
    targetDaily.append(`<h6 class="currentDetails"> Humidity: ${currentHumidity}%</h6>`);
}

function getCity5DayWeather() {
    let targetCityLat = parseFloat(weatherData[0].lat);
    let targetCityLon = parseFloat(weatherData[0].lon);

    const weather5dayApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${targetCityLat}&lon=${targetCityLon}&appid=${apiKey}&units=imperial`
    
    fetch(weather5dayApiUrl)
    .then(function(response){
        return response.json();
    }).then(function(data){
        //console.log(data);
        fiveDayData = data;
        place5DayWeather(data);
    })
};

//function placing the data into respective container [5 Day Forecast]
function place5DayWeather() {
    var cardDetails = $(".cardDetails");
    for (let i = 0; i< cardDetails.length; i++){
        // cardDetails[i].removeClass("active");
        cardDetails[i].remove();
    };

    // Adding the heading for the 5 day forecast
    targetWeekly.prepend(`<h2 class="active cardDetails"> 5 Day Forecast for ${cityName} </h2>`);
    
    //Setting variable for Days 1-5 Card Elements from the "<li id="day#of 5"
    const day1CardEl = $("#day1of5"); 
    const day2CardEl = $("#day2of5"); 
    const day3CardEl = $("#day3of5"); 
    const day4CardEl = $("#day4of5"); 
    const day5CardEl = $("#day5of5"); 

    // Setting up variables for each day for the weather cards utilizing each date at noon
    let day1Data = fiveDayData.list[4];
    let day2Data = fiveDayData.list[12];
    let day3Data = fiveDayData.list[20];
    let day4Data = fiveDayData.list[28];
    let day5Data = fiveDayData.list[36];

    //Setting up Day 1 Data variable
    day1Temp = day1Data.main.temp;
    day1Icon = day1Data.weather[0].icon;
    day1Wind = day1Data.wind.speed;
    day1Hum = day1Data.main.humidity;
    //Setting up Day 2 Data variable 
    day2Temp = day2Data.main.temp;
    day2Icon = day2Data.weather[0].icon;
    day2Wind = day2Data.wind.speed;
    day2Hum = day2Data.main.humidity;
    //Setting up Day 3 Data variable 
    day3Temp = day3Data.main.temp;
    day3Icon = day3Data.weather[0].icon;
    day3Wind = day3Data.wind.speed;
    day3Hum = day3Data.main.humidity;
    //Setting up Day 4 Data variable 
    day4Temp = day4Data.main.temp;
    day4Icon = day4Data.weather[0].icon;
    day4Wind = day4Data.wind.speed;
    day4Hum = day4Data.main.humidity;
    //Setting up Day 5 Data variable 
    day5Temp = day5Data.main.temp;
    day5Icon = day5Data.weather[0].icon;
    day5Wind = day5Data.wind.speed;
    day5Hum = day5Data.main.humidity;

    // Appending Elements for Day1
    day1CardEl.append(`<h4 class="active cardDetails p-2 " >Day 1 of 5 <img class="currentAlign" alt="weather icon" src=https://openweathermap.org/img/wn/${day1Icon}@2x.png </h4>`);
    day1CardEl.append(`<h6 class="active cardDetails px-2">Temp: ${day1Temp}°F</h6>`);
    day1CardEl.append(`<h6 class="active cardDetails px-2">Wind: ${day1Wind}mph</h6>`);
    day1CardEl.append(`<h6 class="active cardDetails px-2">Humidity: ${day1Hum}%</h6>`);
    
    // Appending Elements for Day2
    day2CardEl.append(`<h4 class="active cardDetails p-2">Day 2 of 5 <img class="currentAlign" alt="weather icon" src=https://openweathermap.org/img/wn/${day2Icon}@2x.png </h4>`);
    day2CardEl.append(`<h6 class="active cardDetails px-2">Temp: ${day2Temp}°F</h6>`);
    day2CardEl.append(`<h6 class="active cardDetails pxl-2">Wind: ${day2Wind}mph</h6>`);
    day2CardEl.append(`<h6 class="active cardDetails px-2">Humidity: ${day2Hum}%</h6>`);

    // Appending Elements for Day3
    day3CardEl.append(`<h4 class="active cardDetails p-2">Day 3 of 5 <img class="currentAlign" alt="weather icon" src=https://openweathermap.org/img/wn/${day3Icon}@2x.png </h4>`);
    day3CardEl.append(`<h6 class="active cardDetails px-2">Temp: ${day3Temp}°F</h6>`);
    day3CardEl.append(`<h6 class="active cardDetails px-2">Wind: ${day3Wind}mph</h6>`);
    day3CardEl.append(`<h6 class="active cardDetails px-2">Humidity: ${day3Hum}%</h6>`);

    // Appending Elements for Day4
    day4CardEl.append(`<h4 class="active cardDetails p-2">Day 4 of 5 <img class="currentAlign" alt="weather icon" src=https://openweathermap.org/img/wn/${day4Icon}@2x.png </h4>`);
    day4CardEl.append(`<h6 class="active cardDetails px-2">Temp: ${day4Temp}°F</h6>`);
    day4CardEl.append(`<h6 class="active cardDetails px-2">Wind: ${day4Wind}mph</h6>`);
    day4CardEl.append(`<h6 class="active cardDetails px-2">Humidity: ${day4Hum}%</h6>`);

    // Appending Elements for Day5
    day5CardEl.append(`<h4 class="active cardDetails p-2">Day 5 of 5 <img class="currentAlign" alt="weather icon" src=https://openweathermap.org/img/wn/${day5Icon}@2x.png </h4>`);
    day5CardEl.append(`<h6 class="active cardDetails px-2">Temp: ${day5Temp}°F</h6>`);
    day5CardEl.append(`<h6 class="active cardDetails px-2">Wind: ${day5Wind}mph</h6>`);
    day5CardEl.append(`<h6 class="active cardDetails px-2">Humidity: ${day5Hum}%</h6>`);
};

// Local Storage function 
function storeCityHistory(){
    pastCity = localStorage.getItem('City Name');
    // console.log(pastCity);
    cityHistoryContainer.append(`<button type="button" class="btn btn-secondary searchedCity"> ${pastCity} </button>`);

    // Event listener for new buttons to work as well.  
    $(".searchedCity").on("click", function(event){
        //event.preventDefault();
        
        const btnText = event.currentTarget.textContent;
        // Tried setting up the text content to local Storage and attempt to re run the get City Cordinates and run through the application again......
        // localStorage.setItem('City Name', btnText);
        
        console.log(btnText);
        
        event.stopPropagation();
        event.stopImmediatePropagtaion();
        
    });

    
};



