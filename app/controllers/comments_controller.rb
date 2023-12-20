class CommentsController < ApplicationController
    skip_before_action :verify_authenticity_token
  
    def index
        event = Event.find(params[:event_id])
      comments = event.comments
      render json: comments, status: :ok
    end
  
    def create
        event = Event.find(params[:event_id])
      comment = event.comments.new(comment_params.merge(user_id: params[:comment][:user_id]))
  
      if comment.save
        render json: comment, status: :created
      else
        render json: comment.errors, status: :unprocessable_entity
      end
    end
  
    private
  
    def comment_params
      params.require(:comment).permit(:text)
    end
end