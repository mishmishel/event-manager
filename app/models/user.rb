class User < ApplicationRecord
    has_many :events_joined
    has_many :events, through: :events_joined
    has_many :comments
end
