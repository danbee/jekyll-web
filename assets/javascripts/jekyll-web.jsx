var JekyllWeb = React.createClass({
  render: function() {
    return (
      <div className="jekyllWeb">
      <h1>Jekyll Web</h1>
      <h2>Drafts</h2>
      <Drafts url="/api/drafts.json"></Drafts>
      <h2>Posts</h2>
      <Posts url="/api/posts.json"></Posts>
      </div>
    );
  }
});

React.render(
  <JekyllWeb />,
  document.getElementById('content')
);

Actions.refreshPosts();
