module JekyllWeb
  class Post
    attr_accessor :meta, :content

    def initialize(base, name)
      @base, @name = base, name
      read_yaml(@base, @name)
    end

    def read_yaml(base, name, opts = {})
      begin
        self.content = File.read(base.join(name))
        if content =~ /\A(---\s*\n.*?\n?)^((---|\.\.\.)\s*$\n?)/m
          self.content = $POSTMATCH
          self.meta = SafeYAML.load($1)
          self.meta['date'] = DateTime.parse(meta['date'].to_s).strftime('%-d %B %Y, %H:%M') if !self.meta['date'].nil?
        end
      rescue SyntaxError => e
        Jekyll.logger.warn "YAML Exception reading #{File.join(base, name)}: #{e.message}"
      rescue Exception => e
        Jekyll.logger.warn "Error reading file #{File.join(base, name)}: #{e.message}"
      end

      self.meta ||= {}
    end

    def as_hash
      { id: @name,
        meta: meta,
        published: published }
    end

    def as_full_hash
      { id: @name,
        meta: meta,
        published: published,
        content: content }
    end

    def published
      true
    end

    class << self
      DRAFTS_DIR = '_drafts'
      POSTS_DIR = '_posts'
      POST_EXT = 'markdown'

      def find(base, name)
        if File.exists?(posts_dir(base).join(name))
          Post.new(posts_dir(base), name)
        elsif File.exists?(drafts_dir(base).join(name))
          DraftPost.new(drafts_dir(base), name)
        end
      end

      def find_all_posts(base)
        self.find_drafts(base) + self.find_published(base)
      end

      def find_drafts(base)
        path = drafts_dir(base)
        entries = Dir.new(path).sort
        self.get_items(path, entries, DraftPost)
      end

      def find_published(base)
        path = posts_dir(base)
        entries = Dir.new(path).sort.reverse
        self.get_items(path, entries, Post)
      end

      def get_items(path, entries, post_class)
        entries.each.select { |e| e[/#{POST_EXT}$/] }.map do |entry|
          post_class.new(path, entry)
        end
      end

      private

      def drafts_dir(base)
        Pathname.new(base).join(DRAFTS_DIR)
      end

      def posts_dir(base)
        Pathname.new(base).join(POSTS_DIR)
      end
    end
  end

  class DraftPost < Post
    def published
      false
    end
  end
end
