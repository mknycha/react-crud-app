class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :author, :created_at
end
