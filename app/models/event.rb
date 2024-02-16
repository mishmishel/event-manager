class Event < ApplicationRecord
    has_many :events_joined, dependent: :destroy
    has_many :users, through: :events_joined
    has_many :comments

    # setting default values for attributes
    after_initialize :set_defaults

    validates :title, presence: true
    validates :description, presence: true 
    validates :date, presence: true

    # before_destroy :delete_associated_events_joined

    private
    
    def set_defaults
        self.interest ||= 0
    end

    # def delete_associated_events_joined
    #     events_joined.destroy_all
    # end

end

