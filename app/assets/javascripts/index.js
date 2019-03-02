$(function() {
  getComments();
  getUserComments();
  nextRecommendation();
  console.log("index.js loaded...");
})

//  $(function () {
//    $(".js-next").on("click", function(e) {
//      e.preventDefault();
//      let catId = $(".js-next").attr("data-cat-id");
      //this is problematic because the next recommendation in this category is not necessarily the next number....
      //maybe create an iterator that checks each subsequent recommendation.id for where there is a category match
//      let recId = $(".js-next").attr("data-id");
//      debugger;
//      <% if @category.recommendations %>
//        <div class="error_message">
//          <p>This is the last recommendation in this category.</p>
//        </div>
//      <% end %>
//      $.get("/categories/" + catId + "/recommendations/" + nextId + ".json", function(data) {
//        let recommendation = data;
//        $(".recommendationTitle").text(recommendation["title"]);
//        $(".recommendationDescription").text(recommendation["description"]);
//        $(".recommendationCategory").text(recommendation["category"]);
//        $(".recommendationAuthor").text(recommendation["author"]);
        // re-set the id to current on the link
//        $(".js-next").attr("data-id", recommendation["id"]);
//      });
//    });
//  });

//need to move event Listeners into separate functions
function nextRecommendation() {
  $(".js-next").on("click", function(e) {
    e.preventDefault();
    let catId = $(".js-next").attr("data-cat-id");
    let recId = $(".js-next").attr("data-id");
    $.getJSON(`/categories/${catId}/recommendations/${recId}/next`, function(response) {
      let recommendation = new Recommendation(response);
      $(".recommendationTitle").text(recommendation["title"]);
      $(".recommendationDescription").text(recommendation["description"]);
      $(".recommendationCategory").text(recommendation["category"]);
      $(".recommendationAuthor").text(recommendation["author"]);
      $(".js-next").attr("data-id", recommendation["id"]);
      getNextRecComments(recommendation.category_id, recommendation.id);
      //figure out how to display error message for last recommendation in the category
    });
  });
}

function getNextRecComments(catID, recID) {
  $.getJSON(`/categories/${catID}/recommendations/${recID}`, function(response) {
    let commentList = "";
    let comments = response.comments
    debugger;
    if (comments) {
      comments.forEach(function(comm) {
        debugger;
        let comment = new Comment(comm);
        let commentHtmlData = comment.commentHTML();
        commentList += commentHtmlData
        debugger;
      })
    }
    debugger;
    let commentSection = document.getElementById('comment-info');
    commentSection.innerHTML = commentList;
    debugger;
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
    //this.comments = obj.comments; to figure out how to create multiple comments;
    //maybe send subsequent call to get comments with update...
  }
}

Recommendation.prototype.recHTML = function () {
  return (`
    <div>${this.title}</div>
  `)
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
//can extract button click to separate function
//with transfer to JSON, no longer has ability to delete one's own posts


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
//with transfer to JSON, no longer has ability to delete one's own posts

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
