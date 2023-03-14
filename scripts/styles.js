console.log("styles.js loaded")
//datos 

import usersArray from './usersData.js';

console.log(usersArray);


/*
Muestra todo el array de datos
for (let i = 0; i < usersArray[0].events.length; i++){
  console.log(usersArray[0].events[i])
}*/


// -.-.-.-.-.-.--.-.-.-.-.-.--.-.-.-.-.-.- Start - Show cards with checkbox filter -.-.-.-.-.-.--.-.-.-.-.-.--.-.-.-.-.-.- 

const input = document.querySelectorAll(".categories"); //filtra las categorias
const tagToUpdate = document.getElementById("card-template"); 
const searchInput = document.getElementById('search-input');
const searchMessage = document.getElementById('search-message');
const searchResults = document.getElementById('card-template');

function createCard(event) {
  return `
    <div class="card m-2" style="width: 19rem" >
      <img src="${event.image}" alt="${event.category}" class="card-img-top" height="155" />
      <div class="card-body">
        <h5 class="card-title">${event.name}</h5>
        <p class="card-text">${event.description}</p>
        <p class="lead">${event.date}</p>
      </div>
      <div class="card-footer border-1">
        <div class="d-flex justify-content-between">
          <div class="word">Price: $${event.price}</div>
          <a href="./details.html?id=${event._id}" onclick="goToDetailsPage(${event._id})" class="btn btn-danger">See more...</a>
        </div>
      </div>
    </div>
  `;
}

function paintCards(events) {
  let body = '';
  events.forEach(event => body += createCard(event));
  tagToUpdate.innerHTML = body;
}

function filterAndPaintCards() {
  const checkedValue = [...document.querySelectorAll('.categories')]
    .filter(input => input.checked)
    .map(input => input.value);
  let filteredStore = usersArray[0].events; 
  if (checkedValue.length > 0) {
    filteredStore = filteredStore.filter(({ category }) => checkedValue.includes(category));
  }
  paintCards(filteredStore);
}

paintCards(usersArray[0].events);
input.forEach(function(item) {
  item.addEventListener("change", filterAndPaintCards);
});

searchInput.addEventListener('input', () => {
  const searchText = searchInput.value.toLowerCase();

  const filteredStore = usersArray[0].events.filter(event => {
    const nameMatch = event.name.toLowerCase().includes(searchText);
    const categoryMatch = event.category.toLowerCase().includes(searchText);
    const dateMatch = event.date.toLowerCase().includes(searchText);
    return nameMatch || categoryMatch || dateMatch;
  });

  let body = '';
  if (filteredStore.length === 0) {
    searchMessage.innerHTML = `
      <div class= container my-4>
        <div class="alert alert-warning d-flex justify-content-center flex-wrap " role="alert" >
          <span class="bi-exclamation-triangle-fill me-2" aria-hidden="true"></span>
          <span>Sorry, no events found!</span>
        </div>
      </div>
    `;
    searchResults.innerHTML = '';
    alert('Sorry, i cant found events for your search. Please try to write again!');
  } else {
    searchMessage.innerHTML = '';
    filteredStore.forEach(event => body += createCard(event));
    searchResults.innerHTML = body;
  }
});


// -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.- End - input search filter with alert -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-

