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

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const searchValue = search.value
  locationPara.setAttribute('class', '')
  forecastPara.textContent = ''
  locationPara.textContent = 'Loading...'
  fetch(`http://localhost:3000/weather?search=${searchValue}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        locationPara.setAttribute('class', 'error')
        locationPara.textContent = 'Error'
        return forecastPara.textContent = data.error; 
      }
      locationPara.textContent = data.location;
      forecastPara.textContent = data.forecastString;
    })
  })
})