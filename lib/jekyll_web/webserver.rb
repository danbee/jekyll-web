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

    set :assets_precompile, %w(styles.css *.png *.jpg *.svg *.eot *.ttf *.woff)
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

      get '/posts' do
        posts = Post.find_all_posts(site_path)
        send_json(posts.map(&:as_hash))
      end

      get '/posts/:filename' do
        post = Post.find(site_path, params[:filename])
        if post
          send_json(post.as_full_hash)
        else
          not_found
        end
      end

      private

      def site_path
        Pathname.new(settings.site_path)
      end

      def not_found
        status 404
        content_type :json
        { status: :not_found }.to_json
      end

      def send_json(data)
        content_type :json
        data.to_json
      end

    end

  end
end
