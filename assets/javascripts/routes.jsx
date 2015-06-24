(function () {
  var Route = ReactRouter.Route;
  var DefaultRoute = ReactRouter.DefaultRoute;

  var routes = (
    <Route handler={JekyllWeb} path="/">
      <DefaultRoute handler={PostList} />
      <Route name="posts" handler={PostList} />
      <Route name="post" path="/edit/:type/:filename" handler={PostEditor} />
      <Route name="draft" path="/edit/:type/:filename" handler={PostEditor} />
    </Route>
  );

  ReactRouter.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('content'));
  });
})();
