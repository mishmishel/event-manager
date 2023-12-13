class EventsController < ApplicationController
    def all_events
        Event.all
    end
end
