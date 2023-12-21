class EventsController < ApplicationController

    def index
        if params[:user_id]
            user = User.find_by(id: params[:user_id])
            events = user.events
        else
            events = Event.all
        end

        if events.empty?
            render json: { status: "No events yet" }
          else
            render json: events
        end
    end

    def show
        event = Event.find_by(id: params[:id])

        if !event
            render_record_not_found
        else # rendering event with credit to user 
            render json: event.to_json(except: [:created_at, :updated_at, :id, :user_id], include: { users: { only: [:first_name, :last_name] } })
        end
    end

    def create
        if params[:user_id]
            user = User.find_by(id: params[:user_id])
            event = user.events.create!(event_params)
            render json: event.to_json(except: [:created_at, :updated_at, :id, :user_id], include: { user: { only: [:first_name, :last_name] } })
        else
            event = Event.create!(event_params)
            render json: event.to_json(except: [:created_at, :updated_at, :id, :user_id]) 
        end
       
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
        allowed_params = params.permit(:id, :title, :description, :date, :battle, :jam, :interest, :user_id)

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

