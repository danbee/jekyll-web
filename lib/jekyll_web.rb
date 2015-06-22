require 'json'

module JekyllWeb
  autoload :Webserver, File.expand_path('jekyll_web/webserver.rb', __dir__)
  autoload :Post, File.expand_path('jekyll_web/post.rb', __dir__)
end
