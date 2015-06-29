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

    handleMetaChange: function (event) {
      newMeta = {};
      newMeta[event.target.name] = event.target.value;
      Object.assign(this.state.post.meta, newMeta);
      this.setState({ post: this.state.post });
    },

    handleContentChange: function (event) {
      Object.assign(this.state.post, { content: event.target.value });
      this.setState({ post: this.state.post });
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
                     onChange={this.handleMetaChange}
                     value={this.state.post.meta.title} />
            </div>
            <div>
              <label htmlFor="author">Author</label>
              <input type="text"
                     id="author"
                     name="author"
                     onChange={this.handleMetaChange}
                     value={this.state.post.meta.author} />
            </div>
            <div>
              <label htmlFor="content">Content</label>
              <textarea type="text"
                        id="content"
                        name="content"
                        onChange={this.handleContentChange}
                        value={this.state.post.content} />
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
