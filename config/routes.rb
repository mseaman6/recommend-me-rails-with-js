Rails.application.routes.draw do

  root 'application#index'
  resources :categories do
    resources :recommendations do
      resources :comments
      get '/next' => 'recommendations#next'
    end
    get '/recent' => 'recommendations#recent'
  end

  get '/recommendations/recent' => 'recommendations#recent'
  get '/recommendations/alphabetical' => 'recommendations#alphabetical'

  resources :recommendations, only: [:index, :new, :create]

  resources :users do
    get '/comments' => 'comments#userindex'
  end

  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  get '/auth/google_oauth2/callback' => 'sessions#create'
  get '/auth/failure', to: redirect('/')
  delete '/logout' => 'sessions#destroy'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
