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
            render_record_not_found
        else
            render json: event, except: [:created_at, :updated_at, :id]
        end
    end

    def create
        event = Event.create!(event_params)
        
        render json: event, except: [:created_at, :updated_at, :id]

        rescue ActiveRecord::RecordInvalid => invalid 
            render json: { errors: invalid.record.errors }, status: :unprocessable_entity
    end

    def update 
        event = Event.find_by(id: params[:id])

        if event 
            event.update(event_params)

            render json: event
        else
            render_record_not_found
        end
    end

    def update_interest
        event = Event.find_by(id: params[:id])

        if event
            interest_incremented = event.interest + 1 # increment interest value by 1 

            event.update(interest: interest_incremented)

            render json: {event: event}
        else
            render_record_not_found
        end
    end

    def destroy
        event = Event.find_by(id: params[:id])

        if event
            event.destroy
            render json: { status: "deleted" }
        else
            render_record_not_found
        end
    end

    private

    def event_params
        # Permitting params
        allowed_params = params.permit(:id, :title, :description, :date, :battle, :jam, :interest)

        # Parse date string into a Date object and replace date in permitted params
        allowed_params[:date] = Date.parse(allowed_params[:date]) if allowed_params[:date].present?

        allowed_params
    end

    def render_record_not_found
        render json: {error: "Event can't be found"}, status: :not_found
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

