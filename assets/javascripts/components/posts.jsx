var Posts = React.createClass({

  getInitialState: function () {
    return { items: [] }
  },

  componentDidMount: function () {
    // returns an unsubscribe handler
    this.unsubscribe = postsStore.listen(this.updateItems);
  },

  componentWillUnmount: function() {
    this.unsubscribe();
  },

  updateItems: function (items) {
    this.setState({ items: items });
  },

  render: function () {
    var posts = this.state.items.map(function (post) {
      return (
        <Post filename={post}></Post>
      );
    });
    return (
      <ul className="postList">
        {posts}
      </ul>
    );
  }
});

var Post = React.createClass({
  render: function () {
    return (
      <li>{this.props.filename}</li>
    );
  }
});
