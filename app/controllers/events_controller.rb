class EventsController < ApplicationController

    skip_before_action :verify_authenticity_token

    def index
        events = Event.all

        if events.empty?
            render json: {status: "No events yet"}
        else
            render json: events, except: [:created_at, :updated_at, :id]
        end
    end

    def show
        event = Event.find_by(id: params[:id])

        if !event
            render json: {status: "No events yet"}
        else
            render json: event, except: [:created_at, :updated_at, :id]
        end
    end

    def create
        title = params["title"]
        description = params["description"]
        date = params["date"]
        battle = params["battle"]
        jam = params["jam"]

        #parse date string into a Date object
        parsed_date = Date.parse(date)

        event = Event.create(
            title: title,
            description: description,
            date: parsed_date,
            battle: battle, 
            jam: jam
        )
        
        render json: event, except: [:created_at, :updated_at, :id]
    end

    # def all_battles
    #     battles = Event.where(battle: true)
    #     render json: battles, except: [:created_at, :updated_at, :id]
    # end

    # def all_jams
    #     jams = Event.where(jam: true)
    #     render json: jams, except: [:created_at, :updated_at, :id]
    # end

end

