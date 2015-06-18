require 'sinatra'
require 'sinatra/asset_pipeline'
require 'sinatra/config_file'
require 'sass'

module JekyllWeb
  class Webserver < Sinatra::Base
    register Sinatra::ConfigFile
    register Sinatra::Namespace

    set server: 'puma'

    set :root, File.expand_path('../../', __dir__)

    config_file "#{settings.root}/config.yml"

    set :assets_precompile, %w(application.js styles.css *.png *.jpg *.svg *.eot *.ttf *.woff)
    set :assets_prefix, ['assets']

    register Sinatra::AssetPipeline

    if defined?(RailsAssets)
      RailsAssets.load_paths.each do |path|
        settings.sprockets.append_path(path)
      end
    end

    get '/' do
      erb :index
    end

    namespace '/api' do

      # TODO: Don't leave this hanging around!
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
end
