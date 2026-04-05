Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/*
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest

  # API routes
  namespace :api do
    # Public routes for guests
    namespace :public do
      get 'events', to: 'public#events'
      get 'events/:id', to: 'public#event'
      post 'bookings', to: 'public#create_booking'
    end

    # Owner routes
    namespace :owner do
      get 'dashboard', to: 'owner#dashboard'
      get 'bookings', to: 'owner#bookings'
      post 'events', to: 'owner#create_event'
      delete 'events/:id', to: 'owner#delete_event'
      delete 'bookings/:id', to: 'owner#delete_booking'
    end

    # Legacy routes for backward compatibility
    resources :events, only: [:index, :show, :create, :destroy]
    resources :bookings, only: [:index, :show, :create, :destroy]
    get 'available_slots', to: 'available_slots#index'
    get 'owner', to: 'owners#show'
    get 'owner/dashboard', to: 'owners#dashboard'
  end

  # Defines the root path route ("/")
  # root "posts#index"
end
