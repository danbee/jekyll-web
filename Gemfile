source 'https://rubygems.org'

ruby '2.2.2'

gem 'dotenv'

gem 'sinatra'
gem 'sinatra-contrib'
gem 'sinatra-asset-pipeline'
gem 'react-jsx-sprockets'
gem 'foreman'

source 'https://rails-assets.org' do
  gem 'rails-assets-jquery'
  gem 'rails-assets-react'
  gem 'rails-assets-reflux'
end

group :development, :test do
  gem 'pry'
end

group :test do
  gem 'rspec'
  gem 'rspec-mocks'
end

group :development do
  gem 'shotgun'
end

group :production do
  gem 'puma'
end
