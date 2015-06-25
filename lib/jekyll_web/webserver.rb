require 'sinatra'
require 'sinatra/contrib'
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
      get '/env.json' do
        content_type :json
        ENV.to_hash.to_json
      end

      get '/posts.json' do
        posts = Post.find_all_posts(site_path)
        send_json(posts.map(&:as_hash))
      end

      get '/posts/:filename' do
        post = Post.find(site_path, params[:filename])
        send_json(post.as_full_hash)
      end

      private

      def site_path
        Pathname.new(settings.site_path)
      end

      def send_json(data)
        content_type :json
        { status: :success,
          data: data }.to_json
      end

    end

  end
end
