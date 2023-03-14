console.log("styles-PE.js loaded");

import usersArray from './usersData.js';


const categoriesInputs = document.querySelectorAll(".categories"); //filtra categorias del checkbox.
const searchInput = document.getElementById("search-input"); // filtro de search bar.
const searchMessage = document.getElementById("search-message"); //muestra mensaje que no encontró el evento deseado.
const searchResults = document.getElementById("card-template"); //template de las cartas.
let pastEvents = [];

//genera el modelo de carta para que no sea tan repetitivo escribir varias veces el mismo código.
function generateCardHTML(event) {
  return `
    <div class="card m-2" style="width: 19rem">
      <img src="${event.image}" alt="${event.category}" class="card-img-top" height="155" />
      <div class="card-body">
        <h5 class="card-title">${event.name}</h5>
        <p class="card-text">${event.description}</p>
        <p class="lead">${event.date}</p>
      </div>
      <div class="card-footer border-1">
        <div class="d-flex justify-content-between">
          <div class="word">Price: $${event.price}</div>
          <a href="./details.html?id=${event._id}" class="btn btn-danger">See more...</a>
        </div>
      </div>
    </div>
  `;
}

function filterEventsByCategory(events, categories) {
  if (categories.length === 0) {
    return events;
  }
  return events.filter((event) => categories.includes(event.category));
}

function paintDOM(events) {
  let html = "";
  events.forEach((event) => {
    html += generateCardHTML(event);
    pastEvents.push(event);
  });
  document.getElementById("card-template").innerHTML = html;
}

//filtra y mapea las categorias y el dia base de las cartas y del array.
function updateCards() {
  const selectedCategories = [...categoriesInputs]
    .filter((input) => input.checked)
    .map((input) => input.value);
  const filteredEvents = filterEventsByCategory(
    usersArray[0].events.filter((event) => usersArray[0].currentDate > event.date),
    selectedCategories
  );
  paintDOM(filteredEvents);
}

//filtro del buscador.
function searchEvents() {
  const searchText = searchInput.value.toLowerCase();
  const filteredEvents = usersArray[0].events.filter((event) => {
    const nameMatch = event.name.toLowerCase().includes(searchText);
    const categoryMatch = event.category.toLowerCase().includes(searchText);
    const dateMatch = event.date.toLowerCase().includes(searchText);
    return nameMatch || categoryMatch || dateMatch;
  });
  if (filteredEvents.length === 0) {
    searchMessage.innerHTML = `
      <div class= container my-4>
        <div class="alert alert-warning d-flex justify-content-center flex-wrap " role="alert" >
          <span class="bi-exclamation-triangle-fill me-2" aria-hidden="true"></span>
          <span>Sorry, no events found!</span>
        </div>
      </div>
    `;
    searchResults.innerHTML = "";
  } else {
    searchMessage.innerHTML = "";
    paintDOM(filteredEvents.filter((event) => usersArray[0].currentDate > event.date));
  }
}

categoriesInputs.forEach((input) => {
  input.addEventListener("change", updateCards);
});

searchInput.addEventListener("input", searchEvents);

updateCards();


