var JekyllWeb = React.createClass({
  render: function() {
    return (
      <div className="jekyllWeb">
      <h1>Jekyll Web</h1>
      <section id="drafts">
        <h2>Drafts</h2>
        <Drafts url="/api/drafts.json"></Drafts>
      </section>
      <section id="posts">
        <h2>Posts</h2>
        <Posts url="/api/posts.json"></Posts>
      </section>
      </div>
    );
  }
});

React.render(
  <JekyllWeb />,
  document.getElementById('content')
);

Actions.refreshPosts();
