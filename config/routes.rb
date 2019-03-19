Rails.application.routes.draw do
	root 'site#index'

	namespace :api do
		resources :posts, only: [:index, :show]
	end
end
