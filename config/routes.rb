Rails.application.routes.draw do
  resource :sample, only: [], controller: :samples do
    get :with_vue, :without_vue
  end

  root to: 'samples#without_vue'
end
