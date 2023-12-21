class CommentsController < ApplicationController
    
    before_action :find_event, only: [:show, :create] # calling find event before show and create

    def index
        event = Event.find(params[:event_id])
        comments = event.comments
        render json: comments, each_serializer: CommentSerializer
    end

    def show
        event = Event.find(params[:event_id])
        comments = event.comments.includes(:user)
        
        render json: comments, each_serializer: CommentSerializer, status: :ok # using CommentSerializer
    end

    def create
        user = User.find_by(id: params[:user_id])
        if user
            comment = @event.comments.create!(comment_params.merge(user: user))

            render json: comment 
        else
            render json: { error: "No user found" }, status: :not_found
        end
    end
    
    private

    def find_event
        @event = Event.find(params[:event_id])
    end
    
    def comment_params
        params.require(:comment).permit(:text, :user_id)
    end
end