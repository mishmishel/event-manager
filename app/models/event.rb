class Event < ApplicationRecord

    def title_date
        "#{self.title} #{self.date}"
    end
end
