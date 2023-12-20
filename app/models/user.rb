class User < ApplicationRecord
    has_many :events_joined
    has_many :events, through: :events_joined
    has_many :comments, dependent: :destroy # ensure comments are deleted if user is deleted
end