class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :password, :password_confirmation

  has_many :recommendations
  has_many :categories, through: :recommendations
  has_many :comments
  has_many :commented_recommendations, :through => :comments, :source => :recommendation
end
