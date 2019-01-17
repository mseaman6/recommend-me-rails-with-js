# RECOMMEND-ME-RAILS
##Description:
This application was created in order to organize and share recommendations among a groups of individuals.  A user account can be created with a name, email and password, or by logging in with a Google account (and using OmniAuth verification).  A user can log in at any time with their email and password, or once again through their Google account.  Once logged in, a user is able to see a listing of all the current recommendations, sorted by category.  A user may create new recommendations, and view details on existing recommendations (including other user's comments).  Recommendations may also be viewed limited to specific categories, or by the recommender.  Recommendations may only be edited or deleted by the user that created the recommendation.  Users may also comment on recommendations, which similarly, may only be edited or deleted by the user that generated the comment.

##Install Instructions:
To use this app, just clone it from GitHub, run 'bundle install', and 'rake db:migrate'. Then launch it by entering "thin start --ssl" in your terminal.  This is necessary to provide a secure connection which will allow the OmniAuth signin option to work.  From there direct your browser to "https://localhost:3000".  The browser will likely be concerned that the connection is not private, so you will then need to choose the "ADVANCED" link (in Google Chrome) and then select "Proceed to localhost (unsafe)" to view the app.


##Contributors Guide:
We welcome the input, advice and contribution of others.

If you see an opportunity for improvement and can make the change yourself go ahead and use a typical git workflow to make it happen:

-Fork this repository
-Make the change on your fork, with descriptive commits in the standard format
-Open a Pull Request against this repo

We will review your change and approve or comment on it.

If you notice a problem with the application that you believe needs improvement but you're unable to make the change yourself, you should raise a Github issue containing a clear description of the problem. Include relevant snippets of the content and/or screenshots if applicable. We strive to regularly review issue lists.

##Link to License for Code:
Please view the LICENSE file for permissions related to this application.
