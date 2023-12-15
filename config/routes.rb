Rails.application.routes.draw do
  # GET /events
  get "/events", to: "events#all_events"
  # events_controller.rb

  # GET events by id
  get "/events/:event_id", to: "events#show_event"

  # GET all events that have battle = true
  get "/battles", to: "events#all_battles"

  # GET all events that have jam = true
  get "/events/jams", to: "events#all_jams"

end

