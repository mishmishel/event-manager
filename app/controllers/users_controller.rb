class UsersController < ApplicationController

    skip_before_action :verify_authenticity_token

    def index
        users = User.all 

        render json: users
    end

    def show
        user = User.find_by(id: params[:id])

        if user
            render json: user.to_json(except: [:created_at, :updated_at, :id, :password], include: { events: { only: [:title, :date] }})
        else
            render_record_not_found
        end
    end

    def create
        user = User.create!(user_params)
        render json: user.to_json(except: [:created_at, :updated_at, :id]) 
    
        rescue ActiveRecord::RecordInvalid => invalid 
        render json: { errors: invalid.record.errors }, status: :unprocessable_entity
    end

    def destroy
        user = User.find_by(id: params[:id])

        if user
            user.destroy
            render json: { status: "deleted" }
        else
            render_record_not_found
        end
    end

    private 

    def user_params
        # Permitting params
        allowed_params = params.permit(:id, :first_name, :last_name, :username)
    end

    def render_record_not_found
        render json: {error: "No record found"}, status: :not_found 
    end

end