class CommentsController < ApplicationController

    def index
        comments = Comment.all
        
        render json: comments
    end

    def show
        event = Event.find(params[:event_id])
        comments = event.comments.includes(:user)
    
        render json: comments, each_serializer: CommentSerializer, status: :ok
    end
    
    private
    
    def comment_params
        params.require(:comment).permit(:text, :user_id)
    end
end