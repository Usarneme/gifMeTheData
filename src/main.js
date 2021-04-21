import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import Giphy from "./Giphy.js";

const mockDataResponse = require("./sampleDataResponse.json");

$("form").submit(async function (event) {
  console.log("form SUBMIT");
  event.preventDefault();
  const userSearch = $("#giphyKeyword").val();
  try {
    const result = await Giphy.apiQuery(userSearch);
    formatAndDisplay(result);
  } catch (error) {
    console.error(error);
  }
});

function formatAndDisplay(dataArray) {
  console.log("FORMATTING");
  console.log(dataArray);
  let html = `<div class="container p-1"><div class="row">`;
  dataArray.data.forEach((element) => {
    html += `<div class="card col-sm-3 text-center p-2 image-container" id="${element.id}"><img src="https://media2.giphy.com/media/${element.id}/giphy.gif" alt="${element.title}"><p class="text-center p-2">${element.title}</p></div>`;
  });
  html += `</div></div>`;
  $("#gif-output").html(html).show();
}

$("#faker").click(() => {
  // console.log(mockDataResponse)
  formatAndDisplay(mockDataResponse.data);
});
