class UsersController < ApplicationController

    skip_before_action :verify_authenticity_token, only: :create

    def index
        users = User.all 

        render json: users
    end

    def show
        user = User.find_by(id: params[:id])

        # rendering user with events they have created
        render json: user.to_json(except: [:created_at, :updated_at, :id, :password], include: { events: { only: [:title, :date] }})
    end

    def create
        user = User.create!(user_params)
        render json: user.to_json(except: [:created_at, :updated_at, :id]) 
    
        rescue ActiveRecord::RecordInvalid => invalid 
        render json: { errors: invalid.record.errors }, status: :unprocessable_entity
    end

    private 

    def user_params
        # Permitting params
        allowed_params = params.permit(:id, :first_name, :last_name, :username)
    end

end