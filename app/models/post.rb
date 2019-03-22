class Post < ApplicationRecord
  validates :title, :content, :author, presence: true
end
