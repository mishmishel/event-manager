class User < ApplicationRecord
    has_many :events_joined
    has_many :events, through: :events_joined
    has_many :comments, dependent: :destroy # ensure comments are deleted if user is deleted
    validates :username, presence: true, uniqueness: true

    has_secure_password

    validates :password, presence: true, length: { minimum: 6 }, allow_nil: true
    validates :password_confirmation, presence: true, on: :create
end

