Rails.application.routes.draw do
  # GET /events
  get "/events", to: "events#all_events"
  # events_controller.rb
end
