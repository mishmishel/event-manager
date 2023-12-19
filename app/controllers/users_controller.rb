class UsersController < ApplicationController
    def index
        users = User.all 

        render json: users
    end

    def show
        user = User.find_by(id: params[:id])

        # render json: user, include: :events, except: [:created_at, :updated_at, :id] 
        render json: user.to_json(except: [:created_at, :updated_at, :id, :password], include: { events: { only: [:title, :date] }})
    end
end