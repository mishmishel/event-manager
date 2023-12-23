Rails.application.routes.draw do

  resources :events, only: [:index, :show, :create, :update, :delete]

  # PATCH to update events
  patch "/events/:id/interest", to: "events#update_interest"

  resources :users, only: [:index, :create, :destroy]

  # /user/user_id/events to see events create by user and also assign created events to user
  resources :users, only: [:show] do 
    resources :events, only: [:index, :create]
  end
  
  # /events/event_id/comments
  resources :events, only: [:show] do
    resources :comments, only: [:index, :show, :create, :delete]
  end

  # /user/user_id/events_joined
  resources :users, only: [:show] do
    resources :events_joineds, only: [:index, :show, :create]
  end

  # user login
  post '/login', to: "sessions#create"

  get '/me', to: "users#me"

  delete '/logout', to: "sessions#destroy"
end

