console.log("styles-details.js loaded")

import usersArray from './usersData.js';


let query = location.search

let params = new URLSearchParams(query)

let idParams = params.get("id")

let data = usersArray[0].events

let profile = data.find(info => info._id == idParams)

const container = document.getElementById("card-details");
let body = "";

body += `
  <div class="col-md-7 order-md-2 my-5">
    <h2 class="featurette-heading fw-normal ">${profile.name}</h2>
    <p class="lead">${profile.description}</p>
    <p class="lead">Capacity: ${profile.assistance}</p>  
    <p class="lead">Place: ${profile.place} </p>
  </div>
  <div class="col-md-5 order-md-1">
    <img src="${profile.image}" class="card-img-top" alt="${profile.date}" width="300" height="300">  
  </div>
  `
container.innerHTML = body
