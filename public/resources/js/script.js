// const { response } = require("express");

console.log('Client side js loaded!');

// fetch('http://puzzle.mead.io/puzzle').then((response)=> {
//   response.json().then((data) => {
//     console.log(data)
//   })
// })


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const locationPara = document.querySelector('#location')
const forecastPara = document.querySelector('#forecast')
const weatherIcon = document.getElementById('weather-icon')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const searchValue = search.value
  locationPara.setAttribute('class', '')
  weatherIcon.style.display = 'none'
  forecastPara.textContent = ''
  locationPara.textContent = 'Loading...'
  fetch(`/weather?search=${searchValue}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        locationPara.setAttribute('class', 'error')
        locationPara.textContent = 'Error'
        return forecastPara.textContent = data.error; 
      }
      weatherIcon.src = data.weatherIcon
      weatherIcon.style.display = 'inline-block'
      locationPara.textContent = data.location
      forecastPara.textContent = data.forecastString
    })
  })
})