console.log("This works")

var requestUrl = 'http://api.openweathermap.org/data/2.5/weather?q='
var forecastList = document.querySelector('ul')
var fetchButton = document.getElementById('fetch-button');
//TODO: Create fetch button on HTML
//TODO: Create ul on HTML to append to
//TODO: Figure out how to dynamically alter API Url to match search inquiry.

function handleSearchFormSubmit(event) {
    event.preventDefault();

    var searchInputVal = document.getElementById('#search-input').value;
    if (!searchInputVal) {
        console.error('You need a search input value!');
        return;
      }

      //Line below is from mini project. ./search-results is the url query for that assignment.
      //It will not work for this homework and should be adjusted.
    var queryString = requestUrl + searchInputVal + '&appid=8ac4e9c71df25e60fb8115b69a592323';

   location.assign(queryString);
   getApi();
}

function getApi() {
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        // for (let i = 0; i < data.length; i++) {
        //     var weatherItem = document.createElement('li')
        //     weatherItem.textContent = data[i].OBJECTPROPERTYHERE
        //     forecastList.appendChild(weatherItem);
            
        // }
    })
}
fetchButton.addEventListener('click', handleSearchFormSubmit);