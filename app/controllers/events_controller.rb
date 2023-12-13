class EventsController < ApplicationController

    def all_events
        events = Event.all

        render json: events
    end

    def show_event
        event = Event.find_by(id: params[:event_id])

        render json: event

        if !event
            render "no_event"
        end
    end
end
