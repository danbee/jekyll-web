var JekyllWeb = React.createClass({
  render: function() {
    return (
      <div className="jekyllWeb">
        <h1>Jekyll Web</h1>
        <Posts url="/api/posts.json"></Posts>
        <Drafts url="/api/drafts.json"></Drafts>
      </div>
    );
  }
});

React.render(
  <JekyllWeb />,
  document.getElementById('content')
);
