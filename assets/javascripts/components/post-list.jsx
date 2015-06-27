(function () {
  var getState = function () {
    return {
      drafts: postsStore.getPosts({ published: false }),
      posts: postsStore.getPosts({ published: true })
    };
  }

  window.PostList = React.createClass({

    getInitialState: getState,

    componentDidMount: function () {
      // returns an unsubscribe handler
      this.unsubscribePosts = postsStore.listen(this.updatePosts);
      Actions.refreshPosts();
    },

    updatePosts: function () {
      this.setState(getState);
    },

    componentWillUnmount: function () {
      this.unsubscribePosts();
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

})();
