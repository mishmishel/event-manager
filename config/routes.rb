Rails.application.routes.draw do
  # GET /events
  get "/events", to: "events#all_events"
  # events_controller.rb

  # GET events by id
  get "/events/:event_id", to: "events#show_event"

  # GET events index
  get "/events", to: "events#index"
end
