var Posts = React.createClass({

  render: function () {
    var posts = this.props.data.map(function (post) {
      return (
        <Post data={post} key={post.filename}></Post>
      );
    });
    return (
      <table className="postList">
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Time</th>
        </tr>
        {posts}
      </table>
    );
  }
});
