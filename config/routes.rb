Rails.application.routes.draw do

  resources :events

  # GET /events
  get "/events", to: "events#index"
  # events_controller.rb

  # POST to create new events
  post "/events", to: "events#create"

  # GET events by id - ensure ID route is under /battles and /jams to avoid issues
  get "/events/:id", to: "events#show"

  # # GET all events that have jam = true
  # get "/events/:jams", to: "events#all_jams"

  # # GET all events that have battle = true
  # get "/events/:battles", to: "events#all_battles"

end

