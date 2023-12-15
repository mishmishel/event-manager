class EventsController < ApplicationController

    def all_events
        events = Event.all

        if events.empty?
            render json: {status: "No events yet"}
        else
            render json: events, except: [:created_at, :updated_at, :id]
        end
    end

    def show_event
        event = Event.find_by(id: params[:event_id])

        render json: event, except: [:created_at, :updated_at, :id]
    end

    def all_battles
        battles = Event.where(battle: true)
        render json: battles, except: [:created_at, :updated_at, :id]
    end

    def all_jams
        jams = Event.where(jam: true)
        render json: jams, except: [:created_at, :updated_at, :id]
    end
end
