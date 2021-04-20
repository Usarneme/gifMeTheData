import $ from 'jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/styles.css'

const mockDataResponse = require("./sampleDataResponse.json")

$("form").submit((event) => {
  event.preventDefault()
  const userSearch = $("#giphyKeyword").val();
  apiQuery(userSearch)
})

function apiQuery(userSearch) {
  let promise = new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    const url = `http://api.giphy.com/v1/gifs/search?q=${userSearch}&api_key=${process.env.API_KEY}&rating=pg-13`;
    request.onload = function() {
      if (this.status === 200) {
        resolve(JSON.parse(request.responseText));
      } else {
        reject(JSON.parse(request.response));
      }
    };
    request.open("GET", url, true);
    request.send();
  });

  promise.then(function(response) {
    formatAndDisplay(response.data);
  });
}

// const apiQuery = (userSearch) => {
//   let request = new XMLHttpRequest();
//   const url = `http://api.giphy.com/v1/gifs/search?q=${userSearch}&api_key=${process.env.API_KEY}&rating=pg-13`;
//   request.onreadystatechange = function() {
//     if (this.readyState === 4 && this.status === 200) {
//       const response = JSON.parse(this.responseText);
//       console.log(response);
//       // call another func to deal with the response
//       formatAndDisplay(response.data);
//     }
//   };
//   request.open("GET", url, true);
//   request.send();
// }

function formatAndDisplay(dataArray) {
  let html = `<div class="container p-1"><div class="row">`
  dataArray.forEach(element => {
    html += `<div class="card col-sm-3 text-center p-2 image-container" id="${element.id}"><img src="https://media2.giphy.com/media/${element.id}/giphy.gif" alt="${element.title}"><p class="text-center p-2">${element.title}</p></div>`
  })
  html += `</div></div>`
  $("#gif-output").html(html).show()
}

$("#faker").click(() => {
  // console.log(mockDataResponse)
  formatAndDisplay(mockDataResponse.data)
})

