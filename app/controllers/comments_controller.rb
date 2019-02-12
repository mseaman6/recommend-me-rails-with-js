class CommentsController < ApplicationController

  def create
    @comment = Comment.create(comment_params)
    @comment.user_id = current_user.id
    @comment.recommendation_id = params[:recommendation_id]
    @category = Category.find(params[:category_id])
    @recommendation = Recommendation.find(params[:recommendation_id])
    if @comment.save
      redirect_to category_recommendation_path(@category, @recommendation)
    else
      flash[:message] = "The new comment failed to be created."
      redirect_to category_recommendation_path(@category, @recommendation)
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    @category = Category.find(params[:category_id])
    @recommendation = Recommendation.find(params[:recommendation_id])
    if session[:user_id] == @comment.user_id
      @comment = Comment.destroy(params[:id])
      flash[:message] = "Comment deleted successully."
      redirect_to category_recommendation_path(@category, @recommendation)
    else
      flash[:message] = "Comment can only be deleted by the user that created it."
      redirect_to category_recommendation_path(@category, @recommendation)
    end
  end

  def index
    @user = User.find(params[:user_id])
  end

  private

  def comment_params
    params.require(:comment).permit(:text, :user_id, :recommendation_id)
  end

end
