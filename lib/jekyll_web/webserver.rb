require 'sinatra'
require 'sinatra/asset_pipeline'
require 'sinatra/config_file'
require 'sass'

module JekyllWeb
  class Webserver < Sinatra::Base
    register Sinatra::ConfigFile
    register Sinatra::AssetPipeline
    register Sinatra::Namespace

    config_file '../../config.yml'

    set server: 'puma'

    set :root, File.expand_path('../../', __dir__)

    set :assets_precompile, %w(app.js app.css *.png *.jpg *.svg *.eot *.ttf *.woff)
    set :assets_prefix, ['assets']

    get '/' do
      "Hello, World!"
    end

    get '/env' do
      content_type :json
      ENV.to_hash.to_json
    end

    get '/drafts' do
      dir = Dir.new("#{settings.site_path}/#{settings.drafts_dir}")
      drafts = dir.each.select { |e| e[/#{settings.post_ext}$/] }
      content_type :json
      drafts.to_json
    end
  end
end
