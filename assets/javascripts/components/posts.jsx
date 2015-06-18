var Posts = React.createClass({
  loadPosts: function () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function (response) {
        this.setState({ data: response.data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function () {
    return { data: [] }
  },
  componentDidMount: function () {
    this.loadPosts();
  },
  render: function () {
    return (
      <PostList data={this.state.data}></PostList>
    )
  }
});

var PostList = React.createClass({
  render: function () {
    var posts = this.props.data.map(function (post) {
      return (
        <Post filename={post}></Post>
      );
    });
    return (
      <ul class="postList">
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
