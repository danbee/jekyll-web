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
        dir = site_path.join(settings.drafts_dir)
        drafts = get_posts(dir)
        send_json(drafts)
      end

      get '/posts.json' do
        dir = site_path.join(settings.posts_dir)
        posts = get_posts(dir)
        send_json(posts)
      end

      def send_json(data)
        content_type :json
        { status: :success,
          data: data }.to_json
      end

      def get_posts(path)
        Dir.new(path).each.select { |e| e[/#{settings.post_ext}$/] }.map do |entry|
          #YAML.load(File.read(path.join(entry)))
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
