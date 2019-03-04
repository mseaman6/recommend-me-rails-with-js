$(function() {
  //attachListeners();
  getComments();
  getUserComments();
  nextRecommendation();
  submitComment();
  console.log("index.js loaded...");
})

//to move event Listeners into separate functions
function nextRecommendation() {
  $(".js-next").on("click", function(e) {
    e.preventDefault();
    let catId = $(".js-next").attr("data-cat-id");
    let recId = $(".js-next").attr("data-id");
    $.getJSON(`/categories/${catId}/recommendations/${recId}/next`, function(response) {
      if(response) {
        let recommendation = new Recommendation(response);
        $(".recommendationTitle").text(recommendation["title"]);
        $(".recommendationDescription").text(recommendation["description"]);
        $(".recommendationCategory").text(recommendation["category"]);
        $(".recommendationAuthor").text(recommendation["author"]);
        $(".js-next").attr("data-id", recommendation["id"]);
        getNextRecComments(recommendation.category_id, recommendation.id);
      } else {
        $(".error_message").text("There are no additional recommendations in this category.");
      }
    });
  });
}
//think about removing next rec link where last in cat; would need to know that next is blank... (so check prior to posting response)

function getNextRecComments(catID, recID) {
  $.getJSON(`/categories/${catID}/recommendations/${recID}/comments`, function(response) {
    let commentList = "";
    response.forEach(function(comm) {
      let comment = new Comment(comm);
      let commentHtmlData = comment.commentHTML();
      commentList += commentHtmlData
    });
    let commentSection = document.getElementById('comment-info');
    commentSection.innerHTML = commentList;
  });
}

class Recommendation {
  constructor(obj) {
    this.title = obj.title
    this.description = obj.description
    this.category = obj.category.name
    this.author = obj.user.name
    this.user_id = obj.user_id
    this.category_id = obj.category_id
    this.id = obj.id
  }
}

Recommendation.prototype.commentHTML = function () {
  return (`
    <div class="comment"><li>
    <a href='/users/' + ${this.commentor_id}>${this.commentor}</a> says "${this.text}"
    </li></div>
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
//with transfer to JSON, no longer has ability to delete one's own posts; cannot view session data to validate ownership

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
    commentSection.innerHTML = commentList;
  });
}
//with transfer to JSON, no longer has ability to delete one's own posts; cannot view session data to validate ownership

function submitComment() {
  $('.new_comment').submit(function(e) {
    e.preventDefault();
    let values = $(this).serialize();
    $.post(`${this.action}`, values, function (response) {
      let comment = new Comment(response);
      let commentHtmlData = comment.commentHTML();
      let commentSection = document.getElementById('comment-info');
      commentSection.innerHTML += commentHtmlData;
    });
  });
}
//after submit, to see about clearing out text in the text field and allowing submission of another comment

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

//function attachListeners() {
  //$(".js-next").addEventListener('click', nextRecommendation);
  //(e) {
    //debugger;
    //e.preventDefault();
    //nextRecommendation();
  //});

  //const commentsButton = document.getElementById('my-comments');
  //commentsButton.addEventListener('click', function(e) {
  //  e.preventDefault();
  //  getUserComments();
  //};

//  $(".new_comment").on("submit", function(e) {
//    e.preventDefault();
//    submitComment();
//  };
//};
//not working with event listeners extracted from functions
