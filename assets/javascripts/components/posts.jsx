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
        <Post data={post}></Post>
      );
    });
    return (
      <table className="postList">
        <tr>
          <th>Title</th>
        </tr>
        {posts}
      </table>
    );
  }
});

var Post = React.createClass({
  render: function () {
    return (
      <tr>
        <td>{this.props.data.title}</td>
      </tr>
    );
  }
});
