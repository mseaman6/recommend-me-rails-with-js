$(function() {
  getComments();
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
      let commentList = "";
      let header = "";
      response.forEach(function(comm) {
        let comment = new Comment(comm);
        header = comment.userHeader();
        let commentHtmlData = comment.userCommentHTML();
        commentList += commentHtmlData
      })
      let body = document.getElementById('content');
      body.innerHTML = header + commentList;
    });
  });
};
//can extract button click to separate function

function getComments() {
  $.ajax({
    url: `${this.location.href}/comments`,
    method: 'get',
    dataType: 'json'
  }).done(function (response) {
    let commentList = "";
    response.forEach(function(comm) {
      let comment = new Comment(comm);
      let commentHtmlData = comment.commentHTML();
      commentList += commentHtmlData
    })
    let commentSection = document.getElementById('comment-info');
    debugger;
    commentSection.innerHTML = commentList;
  });
}

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

Comment.prototype.userCommentHTML = function() {
  return (`
    <div class="comment"><p>
    <a href='/categories/' + ${this.category_id} + '/recommendations/' + ${this.recommendation_id}>${this.recommendation}</a> -
    <a href='/users/' + ${this.commentor_id}>${this.commentor}</a> says "${this.text}"
    </p></div>
  `)
}

Comment.prototype.userHeader = function() {
  return (`<h2><b>${this.commentor_up}'s</b> Comments</h2><br>`)
}

Comment.prototype.commentHTML = function () {
  return (`
    <div class="comment"><li>
    <a href='/users/' + ${this.commentor_id}>${this.commentor}</a> says "${this.text}"
    </li></div>
  `)
}
