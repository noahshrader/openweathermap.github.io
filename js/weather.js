// Set default variables
var apiKey = 'b72d10b7b527b805c5445dcce41e666c'
var temp;
var city;
var desc;
var img;

// Check the input from user after submission
function checkWeather() {

  // Check weather when the submit button is clicked
  var checkWeatherButton = document.getElementById('check-button')
  checkWeatherButton.onclick = function() {
    var checkWeatherInput = document.getElementById('check-input').value
    getWeather(checkWeatherInput)
  }

  // If there's already an input value, go ahead and check
  if (localStorage.getItem('weatherInput') !== null) {
    document.getElementById('check-input').value = localStorage.getItem('weatherInput');
    var checkWeatherInput = document.getElementById('check-input').value
    getWeather(checkWeatherInput)
  }
}

// Form the call to openweathermap.org
function getWeather(checkWeatherInput) {
  let method = isNaN(checkWeatherInput) ? 'q' : 'zip'
  // Example: https://api.openweathermap.org/data/2.5/weather?zip=38133&units=imperial&APPID=b72d10b7b527b805c5445dcce41e666c
  let query = `https://api.openweathermap.org/data/2.5/weather?${method}=${checkWeatherInput}&units=imperial&APPID=${apiKey}`

  // Save input for future use
  localStorage.setItem('weatherInput', checkWeatherInput);

  // Let's get the weather
  getRequest(query)
}

// Request info
function getRequest(query) {

  // Let's use Fetch API
  fetch(query).then(response => {
    return response.json()
  }).then(data => {
    var weather = {}
    weather.img = data.weather[0].icon
    weather.city = data.name
    weather.temp = Math.round(data.main.temp)
    weather.desc = data.weather[0].main
    update(weather)
  }).catch( err => {
    alert('Oops! That\'s not a city! Try again.')
  })
}

function update(weather) {
  let weatherContainer = document.getElementById('weather')

  // Set the weather content
  temperature.innerHTML = weather.temp + '&#176;'
  city.innerHTML = weather.city
  image.src = 'https://openweathermap.org/img/w/' + weather.img + '.png'

  // Apply weather description as class to the main container
  weatherContainer.className = ''
  weatherContainer.classList.add(weather.desc.toLowerCase())

  // Check the temperature and assign a class based on feeling of weather
  if (weather.temp >= 85) {
    weatherContainer.classList.add('hot')
  } else if (weather.temp < 90 && weather.temp >= 65) {
    weatherContainer.classList.add('warm')
  } else if (weather.temp < 65 && weather.temp >= 55) {
    weatherContainer.classList.add('cool')
  } else {
    weatherContainer.classList.add('cold')
  }
}

window.onload = function () {

  // Set elements
  temp = document.getElementById('temperature')
  city = document.getElementById('city')
  img = document.getElementById('image')

  checkWeather()
}