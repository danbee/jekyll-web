(function () {
  window.PostEditor = React.createClass({

    getInitialState: function () {
      return { post: postStore.getPost(this.type(), this.filename()) };
    },

    filename: function () {
      return this.props.params.filename;
    },

    type: function () {
      return this.props.params.type;
    },

    componentDidMount: function () {
      // returns an unsubscribe handler
      this.unsubscribePosts = postStore.listen(this.updatePost);
    },

    updatePost: function () {
      this.setState({
        post: postStore.getPost(this.type(), this.filename())
      });
    },

    render: function () {
      return (
        <div className="postEditor">
          <h2>Post Editor</h2>
          <form>
            <div>
              <label>Title</label>
              <input type="text" value={this.state.post.meta.title} />
            </div>
            <div>
              <label>Author</label>
              <input type="text" value={this.state.post.meta.author} />
            </div>
            <div>
              <label>Content</label>
              <textarea lines="50" value={this.state.post.content} />
            </div>
            <div className="controls">
              <input type="submit" value="Save" />
            </div>
          </form>
        </div>
      )
    }
  });

})();
