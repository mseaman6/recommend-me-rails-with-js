//to add into index.js file when appropriate
<script type="text/javascript" charset="utf-8">
  $(function () {
    $('form#new_comment').submit(function(event) {
      event.preventDefault();
      debugger;
      let catId = $("input#comment_category_id").attr("value");
      let recId = $("input#comment_recommendation_id").attr("value");
      let text = $("input#comment_text").attr("value");
      let comment = $.post('categories' + catId + '/recommendations' + recId, text);
      comment.done(function(data) {
        debugger;
        let comment = data;
        const commentsDiv = $(".comments");
        let newComment = `
          <div class="comment">
            <li>
              comment.text
            </li>
          </div>
        `

//          <#%= link_to comment.commentor.name, user_path(comment.commentor) %> says "<#%= comment.text %>"
  //          <#% if current_user.id == comment.user_id %>
  //            <#%= form_tag(category_recommendation_comment_path(@category, @recommendation, comment), method: "delete") do %>
  //              <div><#%= submit_tag 'Delete Comment' %></div>
  //            <#% end %>
  //          <#% end %>

        commentsDiv.innerHTML += newComment;
      });
    });
  });
</script>
