Rails.application.routes.draw do

  resources :events, only: [:index, :show, :create, :update, :delete]

  # GET /events
  get "/events", to: "events#index"
  # events_controller.rb

  # GET events by id - ensure ID route is under /battles and /jams to avoid issues
  get "/events/:id", to: "events#show"

  # POST to create new events
  post "/events", to: "events#create"

  # PATCH to update events
  patch "/events/:id/interest", to: "events#update_interest"

  # DELETE events
  delete "/events/:id", to: "events#destroy"

  resources :users, only: [:index]

  resources :users, only: [:show] do 
    resources :events, only: [:index]
  end

  # # GET all events that have jam = true
  # get "/events/:jams", to: "events#all_jams"

  # # GET all events that have battle = true
  # get "/events/:battles", to: "events#all_battles"

end

