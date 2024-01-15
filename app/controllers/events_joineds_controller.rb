class EventsJoinedsController < ApplicationController

    def create
        user = User.find(params[:user_id])
        event = Event.find(params[:event_id])
    
        # Ensure user is not already joined to the event
        unless user.events.include?(event)
          user.events_joined.create(event: event)
          render json: { status: 'Joined successfully' }, status: :created
        else
          render json: { error: 'User is already joined to the event' }, status: :unprocessable_entity
        end
    end

    def index
        user = User.find(params[:user_id])
        events_joined = user.events_joined.includes(:event)
        render json: events_joined, each_serializer: EventsJoinedSerializer
    end

    def unjoin
      user = User.find_by(id: session[:user_id])
      event = Event.find(params[:event_id])
  
      if user && user.events_joined.exists?(event: event)
        user.events_joined.find_by(event: event).destroy
        render json: { status: 'Event removed successfully' }, status: :ok
      else
        render json: { error: 'User is not joined to the event' }, status: :unprocessable_entity
      end
    end
end
