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
    $.getJSON(`${this.href}`, function(response) {
      console.log('index.js response: ', response);
      debugger;
      let comment = new Comment(response[0]);
      debugger;
      let commentHtmlData = comment.commentHTML();
      let header = comment.userHeader();
      let body = document.getElementById('content');
      body += header + commentHtmlData
      debugger;
    });
  });
};

class Comment {
  constructor(obj) {
    this.text = obj.text
    this.commentor = obj.commentor.name
    this.recommendation = obj.recommendation.title
    this.category_id = obj.recommendation.category_id
    this.recommendation_id = obj.recommendation.id
    this.commentor_id = obj.commentor.id
    this.commentor_up = obj.commentor.name.toUpperCase()
  }
}

Comment.prototype.commentHTML = function() {
  return (`
    <div class="comment"><p>
    <a href='/categories/' + ${this.category_id} + '/recommendations/' + ${this.recommendation_id}>${this.recommendation}</a> -
    <a href='/users/' + ${this.commentor_id}>${this.commentor}</a> says ${this.text}
    </p></div>
  `)
}

Comment.prototype.userHeader = function() {
  return (`<h2><b>${this.commentor_up}'s</b> Comments</h2><br>`)
}

//<div class="comments">
//  <p><%= link_to comment.recommendation.title, category_recommendation_path(comment.recommendation.category, comment.recommendation) %> -
//  <%= render partial: 'comment', locals: {comment: comment} %></p>
//</div>
