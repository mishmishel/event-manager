class EventsController < ApplicationController

    def all_events
        events = Event.all

        render json: events, except: [:created_at, :updated_at, :id]
    end

    def show_event
        event = Event.find_by(id: params[:event_id])

        render json: event, except: [:created_at, :updated_at, :id]
    end
end
