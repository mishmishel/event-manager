Rails.application.routes.draw do

  resources :events, only: [:index, :show, :create, :update, :destroy]

  # PATCH to update events
  patch "/events/:id/interest", to: "events#update_interest"

  resources :users, only: [:index, :destroy]

  # /user/user_id/events to see events create by user and also assign created events to user
  resources :users, only: [:show] do 
    resources :events, only: [:index, :create]
  end
  
  # /events/event_id/comments
  resources :events, only: [:show] do
    resources :comments, only: [:index, :show, :create]
  end

  # delete comments
  delete '/delete/:comment_id', to: "comments#destroy"

  # /user/user_id/events_joined
  resources :users, only: [:show] do
    resources :events_joineds, only: [:index, :show, :create]
  end

  # unjoin events route
  delete '/unjoin/:event_id', to: "events_joineds#unjoin"

  # user login
  post '/login', to: "sessions#create"

  get '/me', to: "users#me"

  delete '/logout', to: "sessions#destroy"

  # user creation

  post '/signup', to: "users#create"

  # checking username uniqueness

  get '/check-username', to: 'users#check_username'

end


