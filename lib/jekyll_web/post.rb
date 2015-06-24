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
          self.meta['date'] = DateTime.parse(meta['date'].to_s).strftime('%FT%T%:z') if !self.meta['date'].nil?
          self.meta['filename'] = name
        end
      rescue SyntaxError => e
        Jekyll.logger.warn "YAML Exception reading #{File.join(base, name)}: #{e.message}"
      rescue Exception => e
        Jekyll.logger.warn "Error reading file #{File.join(base, name)}: #{e.message}"
      end

      self.meta ||= {}
    end

    def as_hash
      { meta: meta,
        content: content }
    end
  end
end
