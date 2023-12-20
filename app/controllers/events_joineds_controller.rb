class EventsJoinedsController < ApplicationController

    skip_before_action :verify_authenticity_token, only: :create

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
end
