ENV['RACK_ENV'] ||= 'development'

require 'dotenv'
Dotenv.load

require 'bundler'

Bundler.setup
Bundler.require(:default, ENV['RACK_ENV'])

require File.expand_path('lib/jekyll_web', __dir__)

run JekyllWeb::Webserver
