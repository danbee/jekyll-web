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

      get '/drafts.json' do
        drafts = get_drafts
        send_json(drafts)
      end

      get '/posts.json' do
        posts = get_posts
        send_json(posts)
      end

      def get_drafts
        path = site_path.join(settings.drafts_dir)
        entries = Dir.new(path).sort
        get_post_items(path, entries)
      end

      def get_posts
        path = site_path.join(settings.posts_dir)
        entries = Dir.new(path).sort.reverse
        get_post_items(path, entries)
      end

      def send_json(data)
        content_type :json
        { status: :success,
          data: data }.to_json
      end

      def get_post_items(path, entries)
        entries.each.select { |e| e[/#{settings.post_ext}$/] }.map do |entry|
          post = Post.new(path, entry)
          post.data
        end
      end

      def site_path
        Pathname.new(settings.site_path)
      end

    end

  end
end
