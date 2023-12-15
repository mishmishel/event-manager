Rails.application.routes.draw do
  # GET /events
  get "/events", to: "events#all_events"
  # events_controller.rb

  # GET all events that have jam = true
  get "/events/jams", to: "events#all_jams"

   # GET all events that have battle = true
   get "/events/battles", to: "events#all_battles"

  # GET events by id
  get "/events/:event_id", to: "events#show_event"

end

