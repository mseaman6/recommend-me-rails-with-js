class RecommendationsController < ApplicationController
  before_action :require_login

  def index
    if params[:category_id]
      @recommendations = Recommendation.where("category_id = ?", (params[:category_id]))
    else
      @recommendations = Recommendation.all
    end
    respond_to do |f|
      f.html {render :index}
      f.json {render json: @recommendations}
    end
  end

  def next
    @recommendation = Recommendation.where("category_id = ? and id > ?", (params[:category_id]), (params[:recommendation_id])).first
    render json: @recommendation
  end

  def recent
    if params[:category_id]
      @recommendations = Recommendation.where("category_id = ?", (params[:category_id])).recent
    else
      @recommendations = Recommendation.recent
    end
    render :index
  end

  def alphabetical
    @recommendations = Recommendation.title_a_z
    render :list
  end

  def new
    @recommendation = Recommendation.new
  end

  def create
    @recommendation = Recommendation.create(recommendation_params)
    @recommendation.user_id = session[:user_id]
    @category = Category.find_or_create_by(:name => params[:recommendation][:category][:name].upcase)
    if @category.save
      @recommendation.category_id = @category.id
    end
    if @recommendation.save
      redirect_to category_recommendation_path(@recommendation.category, @recommendation)
    else
      #flash[:message] = "The new recommendation failed to be created.  Please make sure that you complete all required fields and try again."
      render :new
    end
  end

  def show
    @category ||= Category.find(params[:category_id])
    @recommendation ||= Recommendation.find(params[:id])
    @comment = Comment.new
    respond_to do |f|
      f.html {render :show}
      f.json {render json: @recommendation}
    end
  end

  def edit
    @category ||= Category.find(params[:category_id])
    @recommendation = Recommendation.find(params[:id])
    if current_user.id == @recommendation.user_id
    else
      flash[:message] = "The recommendation can only be edited by the user that created it."
      redirect_to category_recommendation_path(@category, @recommendation)
    end
  end

  def update
    @category ||= Category.find(params[:category_id])
    @recommendation = Recommendation.find(params[:id])
    if current_user.id == @recommendation.user_id
      @recommendation.update(recommendation_params)
      @category = Category.find_or_create_by(:name => params[:recommendation][:category][:name].upcase)
      if @category.save
        @recommendation.category_id = @category.id
      end
      if @recommendation.save
        redirect_to category_recommendation_path(@category, @recommendation)
      else
        flash[:message] = "The recommendation failed to save, please try again."
        redirect_to edit_category_recommendation_path(@category, @recommendation)
      end
    else
      flash[:message] = "The recommendation can only be edited by the user that created it."
      redirect_to category_recommendation_path(@category, @recommendation)
    end
  end

  def destroy
    @category ||= Category.find(params[:category_id])
    @recommendation = Recommendation.find(params[:id])
    if current_user.id == @recommendation.user_id
      @recommendation = Recommendation.destroy(params[:id])
      flash[:message] = "Recommendation deleted successully."
      redirect_to recommendations_path
    else
      flash[:message] = "Recommendation can only be deleted by the user that created it."
      redirect_to recommendations_path
    end
  end

  private

  def recommendation_params
    params.require(:recommendation).permit(:title, :description, :user_id, :category_id)
  end

end
