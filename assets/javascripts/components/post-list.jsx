var PostList = React.createClass({

  getInitialState: function () {
    return {
      drafts: [],
      posts: []
    }
  },

  componentDidMount: function () {
    // returns an unsubscribe handler
    this.unsubscribePosts = postsStore.listen(this.updatePosts);
    this.unsubscribeDrafts = draftsStore.listen(this.updateDrafts);
    Actions.refreshPosts();
  },

  updatePosts: function (data) {
    this.setState({ posts: data });
  },
  updateDrafts: function (data) {
    this.setState({ drafts: data });
  },

  componentWillUnmount: function() {
    this.unsubscribePosts();
    this.unsubscribeDrafts();
  },

  render: function () {
    return (
      <div className="postList">
        <section id="drafts">
          <h2>Drafts</h2>
          <Drafts data={this.state.drafts}></Drafts>
        </section>
        <section id="posts">
          <h2>Posts</h2>
          <Posts data={this.state.posts}></Posts>
        </section>
      </div>
    )
  }
});
