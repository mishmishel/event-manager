class UsersController < ApplicationController

    def index
        users = User.all 
        render json: users
    end

    def show
        user = User.find_by(id: session[:user_id])

        if user
            render json: user.to_json(except: [:created_at, :updated_at, :id, :password], include: { events: { only: [:title, :date] }})
        else
            render_unauthorized
        end
    end

    def create
        if User.exists?(username: params[:username])
            render json: { errors: ["Username is already taken. Please choose a different one."] }, status: :unprocessable_entity
        elsif User.exists?(email: params[:email])
            render json: { errors: ["Email is already taken. Please choose a different one."] }, status: :unprocessable_entity
          else
            user = User.create!(user_params)
            session[:user_id] = user.id
            render json: user.to_json(except: [:created_at, :updated_at, :id, :password], status: :created)
          end
        rescue ActiveRecord::RecordInvalid => invalid
          render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity   
    end

    def events_created
        user = User.find(params[:user_id])
        events_created = Event.where(created_by: user.id)
        render json: events_created
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

    def me 
        user = User.find_by(id: session[:user_id])

        if user
            render json: user, status: :ok
        else
            render_unauthorized
        end
    end

    def check_username
        username = params[:username]
        user = User.find_by(username: username)
      
        render json: { exists: user.present? }
    end

    private 

    def user_params
        # Permitting params
        params.permit(:id, :password, :password_confirmation, :first_name, :last_name, :username, :email)
    end

    def render_record_not_found
        render json: {error: "No record found"}, status: :not_found 
    end

    def render_unauthorized
        render json: { error: "Unauthorized"}, status: :unauthorized
    end

end