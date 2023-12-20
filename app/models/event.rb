class Event < ApplicationRecord
    has_many :events_joined
    has_many :users, through: :events_joined
    has_many :comments

    # Setting default values for attributes
    after_initialize :set_defaults

    validates :title, presence: true
    validates :description, presence: true 
    validates :date, presence: true

    private
    
    def set_defaults
        self.interest ||= 0
    end

end
