$(function() {
  getUserComments();
  console.log("index.js loaded...");
})


function getRecommendations() {
  $.ajax({
    url: '/recommendations', //'https://localhost:3---/recommendations' or onclick of a certain button, etc.
    method: 'get',
    dataType: 'json'
  }).done(function (response) {
    console.log("index.js response: ", response);

    let rec = new Recommendation(response[0])
    //switch to .map functionality to process all itmes in response array

    let recHtmlData = rec.recHTML()

    //append recHtmlData to DOM, etc.
    debugger;
  })
}

class Recommendation {
  constructor(obj) {
    this.title = obj.title
    this.description = obj.description
    this.user_id = obj.user_id
  }
}

Recommendation.prototype.recHTML = function () {
  return (`
    <div>${this.title}</div>
  `)
}

function getUserComments() {
  const commentsButton = document.getElementById('my-comments');
  commentsButton.addEventListener('click', function(e) {
    e.preventDefault();
    debugger;
    //gameID = $(this).data("id");
    //let userId = params[:user_id];
    //$.getJSON(`/users/${}/comments`, function (response) {
      console.log('index.js response: ', response);
    })
  }
};
