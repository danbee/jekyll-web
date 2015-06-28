(function () {
  window.PostEditor = React.createClass({

    getInitialState: function () {
      return { post: postsStore.getPost(this.filename()) };
    },

    filename: function () {
      return this.props.params.filename;
    },

    componentDidMount: function () {
      // returns an unsubscribe handler
      Actions.fetchPost(this.filename());
      this.unsubscribePosts = postsStore.listen(this.updatePost);
    },

    componentWillUnmount: function () {
      this.unsubscribePosts();
    },

    updatePost: function () {
      this.setState({
        post: postsStore.getPost(this.filename())
      });
    },

    handleChange: function (event) {
      this.setState({ post: { meta: { title: event.target.value } } });
    },

    render: function () {
      return (
        <div className="postEditor">
          <h2>Post Editor</h2>
          <form>
            <div>
              <label htmlFor="title">Title</label>
              <input type="text"
                     id="title"
                     name="title"
                     onChange={Actions.updateTitle}
                     value={this.state.post.meta.title} />
            </div>
            <div>
              <label htmlFor="author">Author</label>
              <input type="text" id="author" name="author" value={this.state.post.meta.author} />
            </div>
            <div>
              <label htmlFor="content">Content</label>
              <textarea lines="50" id="content" name="content" value={this.state.post.content} />
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
