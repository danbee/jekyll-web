(function () {
  window.PostEditor = React.createClass({

    getInitialState: function () {
      return { post: postStore.getPost(this.filename()) };
    },

    filename: function () {
      return this.props.params.filename;
    },

    componentDidMount: function () {
      // returns an unsubscribe handler
      this.unsubscribePosts = postStore.listen(this.updatePost);
    },

    updatePost: function () {
      this.setState({
        post: postStore.getPost(this.filename())
      });
    },

    render: function () {
      return (
        <div className="postEditor">
          <h2>Post Editor</h2>
          <div>
            <label>Title</label>
            <input type="text" value={this.state.post.meta.title} />
          </div>
          <div>
            <label>Content</label>
            <textarea value={this.state.post.content} />
          </div>
        </div>
      )
    }
  });

})();
