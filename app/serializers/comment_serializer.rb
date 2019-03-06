class CommentSerializer < ActiveModel::Serializer
  attributes :id, :text, :user_id, :recommendation_id, :recommendation

  belongs_to :commentor, :class_name => "User", :foreign_key => "user_id"
  belongs_to :recommendation
end
