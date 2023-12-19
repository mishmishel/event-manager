class Event < ApplicationRecord
    belongs_to :user

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
