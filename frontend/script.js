const BASE_URL = 'http://localhost:3000/'
document.addEventListener('DOMContentLoaded', ()=>{
  event.preventDefault()
  document.getElementById('destinationButton').style.display = "block"
  document.getElementById('destination-form').style.display = "none"
  document.getElementById('destination-fetch').addEventListener('click', () => {
    destinationsFetch()
  })
})

function destinationsFetch() { // fetch destinations from index to display on mouseover
  event.preventDefault()
  fetch(BASE_URL + 'destinations')
  .then(resp => resp.json())
  .then(destinationObject => {
    destinationObjectHandle(destinationObject)
  })
}

function showDestination(destinationId) {
  fetch(BASE_URL + 'destinations/' + destinationId)
  .then(resp => resp.json())
  .then(destinationObj => {
    destinationShowCard(destinationObj.data.attributes)
  })
}

function destinationObjectHandle(destinationObject) {
  for (object in destinationObject) {
    destinationCard(destinationObject[object])
  }
}
function destinationCard(attributes) { // creates destination cards
  let cardDiv = document.createElement('div')
  cardDiv.classList.add('card', 'mx-auto')
  cardDiv.style.width = "15rem"
  cardDiv.innerHTML = `<div class="card-body" id="location[${attributes.id}]"><h5 class="card-title">${attributes.city}</h5><strong>Country:</strong> <p>${attributes.country}</p><button onclick="showDestination(${attributes.id})">View ${attributes.city}</button></div>`
  document.getElementById('my-destinations').append(cardDiv)
}

function destinationShowCard(destination) {
  let destinationDiv = document.getElementById(`location[${destination.id}]`)
  let ul = document.createElement('ul')
  destination.sights.forEach(sight => {
    destinationDiv.innerHTML += `<li class="p-4">${sight.name} - ${sight.sight_type}</li>`
  })

  destinationDiv.appendChild(ul)
  // div.innerHTML = `<div class="card-body"><h5 class="card-title">${destination.city}</h5><strong>Country:</strong> <p>${destination.country}</p>`
  // document.getElementById('my-destinations').append(div)
}

function addDestination() { // removes button from DOM to display new destination form
  document.getElementById('destinationButton').style.display = "none"
  document.getElementById('destination-form').style.display = "block"
}

function handleNewDestination() {
  event.preventDefault()
  let newDestination = {
    city: document.getElementById('city').value,
    country: document.getElementById('country').value
  }
  fetch(BASE_URL + 'destinations', {
    method: 'POST',
    headers: {
      'Content-Type':'application/json',
      'Accept':'application/json'
    },
    body: JSON.stringify(newDestination)
  })
  .then(resp => resp.json())
  // document.getElementById('destinations').style.display = "none"
}
