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
  let request = new XMLHttpRequest();
  const url = `http://api.giphy.com/v1/gifs/search?q=${userSearch}&api_key=${process.env.API_KEY}&rating=pg-13`;
  request.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      const response = JSON.parse(this.responseText);
      console.log(response);
      // call another func to deal with the response
      // normally, we'd use the response here, but for testing, we can use the sample/mock data
      getElements(response.data);
    }
  };
  request.open("GET", url, true);
  request.send();
}

// <img src="https://media2.giphy.com/media/Qem49y6xGw57W/giphy.gif" alt="Bo Burnham Pun GIF" style="width: 480px; height: 466.946px; left: 0px; top: 0px; opacity: 0;">
// data.url:"https://giphy.com/gifs/terrible-pun-Qem49y6xGw57W"

$("#faker").click(() => {
  // console.log(mockDataResponse)
  getElements(mockDataResponse.data)
})

function getElements(dataArray) {
  $("#gif-output").html(`<p>${dataArray[0].title}</p><img src="https://media2.giphy.com/media/${dataArray[0].id}/giphy.gif" alt="${dataArray[0].title}">`).show()
  console.log(dataArray[0].title)
  console.log(dataArray[0])
}

// listen for keyword form submission
// get the keyword
// query the giphy api
// validate the results
// show the results

// Object.keys(response.data[0])
// 0: "type"
// 1: "id"
// 2: "url"
// 3: "slug"
// 4: "bitly_gif_url"
// 5: "bitly_url"
// 6: "embed_url"
// 7: "username"
// 8: "source"
// 9: "title"
// 10: "rating"
// 11: "content_url"
// 12: "source_tld"
// 13: "source_post_url"
// 14: "is_sticker"
// 15: "import_datetime"
// 16: "trending_datetime"
// 17: "images"
// 18: "analytics_response_payload"
// 19: "analytics"
