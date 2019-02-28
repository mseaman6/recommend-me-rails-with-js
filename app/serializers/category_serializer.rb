class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :users, through: :recommendations
  has_many :recommendations
end
