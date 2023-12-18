class Event < ApplicationRecord

    # Setting default values for attributes
    after_initialize :set_defaults

    private
    
    def set_defaults
        self.interest ||= 0
    end

end
