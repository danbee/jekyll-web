require 'sinatra'
require 'sinatra/asset_pipeline'
require 'sass'

module JekyllWeb
  class Webserver < Sinatra::Base

    set server: 'puma'

    set :root, File.expand_path('../../', __dir__)

    set :assets_precompile, %w(app.js app.css *.png *.jpg *.svg *.eot *.ttf *.woff)
    set :assets_prefix, ['assets']

    register Sinatra::AssetPipeline
    register Sinatra::Namespace

    get '/' do
      "Hello, World!"
    end

    get '/env' do
      content_type :json
      ENV.to_hash.to_json
    end
  end
end
