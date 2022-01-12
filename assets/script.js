console.log("This works")
//TODO: Save search history.
//TODO: Reduce redundant code via for-loop to dynamically create weather cards.


var requestUrlToday = 'http://api.openweathermap.org/data/2.5/weather?q='
var requestUrlForecast = 'http://api.openweathermap.org/data/2.5/forecast?q='
var todaysWeatherEl = document.querySelector('#current-weather')
var todaysDate = document.querySelector('#date-today')


var forecastOneEl = document.querySelector('#day-one')
var forecastTwoEl = document.querySelector('#day-two')
var forecastThreeEl = document.querySelector('#day-three')
var forecastFourEl = document.querySelector('#day-four')
var forecastFiveEl = document.querySelector('#day-five')
var dateOne = document.querySelector('#date-one')
var dateTwo = document.querySelector('#date-two')
var dateThree = document.querySelector('#date-three')
var dateFour = document.querySelector('#date-four')
var dateFive = document.querySelector('#date-five')


var fetchButton = document.querySelector('#fetch-button');
var formSubmission = document.querySelector('#search-form')
var city = document.querySelector('.location-here')

var searchHistoryContainer = document.querySelector('#history-container')
var searchHistoryEl = document.querySelector('#history')
var searchHistory = [];

// function renderHistory () {
//     for (let i = 0; i < history.length; i++) {
//         var 
        
//     }
// }



function handleSearchFormSubmit(event) {
    event.preventDefault();
    todaysWeatherEl.innerHTML = '';
    forecastOneEl.innerHTML = '';
    forecastTwoEl.innerHTML = '';
    forecastThreeEl.innerHTML = '';
    forecastFourEl.innerHTML = '';
    forecastFiveEl.innerHTML = '';

    var searchInput = document.querySelector('#search-input');
    var searchInputVal = searchInput.value;
    console.log(typeof searchInputVal)
    if (!searchInputVal) {
        console.error('You need a search input value!');
        return;
      }


    searchHistory = JSON.parse(localStorage.getItem("searchItems")) || []
    if (searchHistory !== null) {
        searchHistoryEl.innerHTML = '';
      }
    
    searchHistory.push(searchInputVal);
    localStorage.setItem("searchItems", JSON.stringify(searchHistory));

//TODO: Needs debugging. Renders more list items than needed.
    for (let i = 0; i < searchHistory.length; i++) {
        var searchItems = searchHistory[i];

        var searchItem = document.createElement("li");
        searchItem.textContent = searchItems;
        searchItem.classList.add("search-item");
        searchHistoryEl.appendChild(searchItem);
    }
    
    searchHistoryContainer.style.display = "block";

    var queryStringToday = requestUrlToday + searchInputVal + '&appid=8ac4e9c71df25e60fb8115b69a592323&units=imperial';
    var queryStringForecast = requestUrlForecast + searchInputVal + '&appid=8ac4e9c71df25e60fb8115b69a592323&units=imperial'

    fetch(queryStringToday)
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        
        city.textContent = data.name;
        var iconCode = data.weather[0].icon;
        var iconUrl = "<img src='http://openweathermap.org/img/w/" + iconCode + ".png' alt='Icon depicting current weather.'>";
        console.log(iconUrl);
        document.querySelector('#icon-today').innerHTML = iconUrl

        todaysDate.textContent = moment().format('MMM Do YYYY');


        var weather = document.createElement('li')
            weather.textContent = data.weather[0].main;
            todaysWeatherEl.appendChild(weather);

        var temperature = document.createElement('li')
            temperature.textContent = 'Feels like ' + data.main.feels_like + '°C';
            todaysWeatherEl.appendChild(temperature);

        var weatherIcon = document.createElement('li')
            weatherIcon.textContent = data.weather.icon;
            todaysWeatherEl.appendChild(weatherIcon);

        var windSpeed = document.createElement('li')
            windSpeed.textContent = 'Wind speed: ' + data.wind.speed + ' mph';
            todaysWeatherEl.appendChild(windSpeed);

        var humidity = document.createElement('li')
            humidity.textContent = 'Humidity: ' + data.main.humidity + '%';
            todaysWeatherEl.appendChild(humidity);
    })

    fetch(queryStringForecast)
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        var forecastRow = document.querySelector('#forecast')
        forecastRow.style.display = "flex";

        //__________________Loop Testing___________________________
        // for (let i = 0; i < data.list.length; i+=8) {
        //     console.log(data.list[i].weather[0].icon)
            
        //     var forecastCard = document.createElement('div');
        //     forecastCard.classList.add("card col-xl-2");
        //     var forecastCardBody = document.createElement('div');
        //     forecastCardBody.classList.add("card-body")
        //     var forecastCardTitle = document.createElement('h5');
        //     forecastCardTitle.classList.add("card-title")
            
            
        //     var iconCode = data.list[i].weather[0].icon;
        //     var iconUrl = "<img src='http://openweathermap.org/img/w/" + iconCode + ".png' alt='Icon depicting current weather.'>";

        // }


        // ________________Day One_________________________________

        dateOne.textContent = moment().add(1, 'days').calendar();
        var iconCode = data.list[1].weather[0].icon;
        var iconUrl = "<img src='http://openweathermap.org/img/w/" + iconCode + ".png' alt='Icon depicting current weather.'>";
        document.querySelector('#icon-tomorrow').innerHTML = iconUrl

        var weatherTomorrow = document.createElement('li')
        weatherTomorrow.textContent = data.list[1].weather[0].main;
        forecastOneEl.appendChild(weatherTomorrow);

        var tempTomorrow = document.createElement('li')
        tempTomorrow.textContent = data.list[1].main.feels_like + '°C';
        forecastOneEl.appendChild(tempTomorrow);
        
        var windTomorrow = document.createElement('li')
        windTomorrow.textContent = 'Wind speed: ' + data.list[1].wind.speed + ' mph' ;
        forecastOneEl.appendChild(windTomorrow);

        var humidityTomorrow = document.createElement('li')
        humidityTomorrow.textContent = 'Humidity: ' + data.list[1].main.humidity + '%';
        forecastOneEl.appendChild(humidityTomorrow);

        // ________________Day Two_________________________________


        dateTwo.textContent = moment().add(2, 'days').calendar();
        var iconCode = data.list[2].weather[0].icon;
        var iconUrl = "<img src='http://openweathermap.org/img/w/" + iconCode + ".png' alt='Icon depicting current weather.'>";
        document.querySelector('#icon-day-two').innerHTML = iconUrl

        var weatherTwo = document.createElement('li')
        weatherTwo.textContent = data.list[2].weather[0].main;
        forecastTwoEl.appendChild(weatherTwo);

        var tempTwo = document.createElement('li')
        tempTwo.textContent = data.list[2].main.feels_like + '°C';
        forecastTwoEl.appendChild(tempTwo);
        
        var windTwo = document.createElement('li')
        windTwo.textContent = 'Wind speed: ' + data.list[2].wind.speed + ' mph' ;
        forecastTwoEl.appendChild(windTwo);

        var humidityTwo = document.createElement('li')
        humidityTwo.textContent = 'Humidity: ' + data.list[2].main.humidity + '%';
        forecastTwoEl.appendChild(humidityTwo);

        // ________________Day Three_________________________________

        dateThree.textContent = moment().add(3, 'days').calendar();
        var iconCode = data.list[3].weather[0].icon;
        var iconUrl = "<img src='http://openweathermap.org/img/w/" + iconCode + ".png' alt='Icon depicting current weather.'>";
        document.querySelector('#icon-day-three').innerHTML = iconUrl

        var weatherThree = document.createElement('li')
        weatherThree.textContent = data.list[3].weather[0].main;
        forecastThreeEl.appendChild(weatherThree);

        var tempThree = document.createElement('li')
        tempThree.textContent = data.list[3].main.feels_like + '°C';
        forecastThreeEl.appendChild(tempThree);
        
        var windThree = document.createElement('li')
        windThree.textContent = 'Wind speed: ' + data.list[3].wind.speed + ' mph' ;
        forecastThreeEl.appendChild(windThree);

        var humidityThree = document.createElement('li')
        humidityThree.textContent = 'Humidity: ' + data.list[3].main.humidity + '%';
        forecastThreeEl.appendChild(humidityThree);

        // ________________Day Four_________________________________

        dateFour.textContent = moment().add(4, 'days').calendar();
        var iconCode = data.list[4].weather[0].icon;
        var iconUrl = "<img src='http://openweathermap.org/img/w/" + iconCode + ".png' alt='Icon depicting current weather.'>";
        document.querySelector('#icon-day-four').innerHTML = iconUrl

        var weatherFour = document.createElement('li')
        weatherFour.textContent = data.list[4].weather[0].main;
        forecastFourEl.appendChild(weatherFour);

        var tempFour = document.createElement('li')
        tempFour.textContent = data.list[4].main.feels_like + '°C';
        forecastFourEl.appendChild(tempFour);
        
        var windFour = document.createElement('li')
        windFour.textContent = 'Wind speed: ' + data.list[4].wind.speed + ' mph' ;
        forecastFourEl.appendChild(windFour);

        var humidityFour = document.createElement('li')
        humidityFour.textContent = 'Humidity: ' + data.list[4].main.humidity + '%';
        forecastFourEl.appendChild(humidityFour);

        // ________________Day Five_________________________________

        dateFive.textContent = moment().add(5, 'days').calendar();
        var iconCode = data.list[5].weather[0].icon;
        var iconUrl = "<img src='http://openweathermap.org/img/w/" + iconCode + ".png' alt='Icon depicting current weather.'>";
        document.querySelector('#icon-day-five').innerHTML = iconUrl

        var weatherFive = document.createElement('li')
        weatherFive.textContent = data.list[5].weather[0].main;
        forecastFiveEl.appendChild(weatherFive);

        var tempFive = document.createElement('li')
        tempFive.textContent = data.list[5].main.feels_like + '°C';
        forecastFiveEl.appendChild(tempFive);
        
        var windFive = document.createElement('li')
        windFive.textContent = 'Wind speed: ' + data.list[5].wind.speed + ' mph' ;
        forecastFiveEl.appendChild(windFive);

        var humidityFive = document.createElement('li')
        humidityFive.textContent = 'Humidity: ' + data.list[5].main.humidity + '%';
        forecastFiveEl.appendChild(humidityFive);


    })
}

formSubmission.addEventListener('submit', handleSearchFormSubmit);
fetchButton.addEventListener('click', handleSearchFormSubmit);