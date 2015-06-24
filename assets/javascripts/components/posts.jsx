var Posts = React.createClass({

  render: function () {
    var posts = this.props.data.map(function (post) {
      return (
        <Post data={post}></Post>
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

var Post = React.createClass({
  render: function () {
    var postDate = moment(this.props.data.date).format('MMMM Do YYYY, h:mm:ss a');
    return (
      <tr>
        <td>{this.props.data.title}</td>
        <td>{this.props.data.author}</td>
        <td>{postDate}</td>
      </tr>
    );
  }
});
