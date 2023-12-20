Rails.application.routes.draw do

  resources :events, only: [:index, :show, :create, :update, :delete]

  # PATCH to update events
  patch "/events/:id/interest", to: "events#update_interest"

  resources :users, only: [:index, :create]

  # /user/user_id/events to see events create by user and also assign created events to user
  resources :users, only: [:show] do 
    resources :events, only: [:index, :create]
  end

  # resources :events do
  #   resources :comments, only: [:index, :create]
  # end

  # # GET all events that have jam = true
  # get "/events/:jams", to: "events#all_jams"

  # # GET all events that have battle = true
  # get "/events/:battles", to: "events#all_battles"

end

