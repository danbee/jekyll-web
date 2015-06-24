(function () {
  var RouteHandler = ReactRouter.RouteHandler;

  window.JekyllWeb = React.createClass({
    render: function () {
      return (
        <div className="jekyllWeb">
          <h1>Jekyll Web</h1>
          <RouteHandler />
        </div>
      );
    }
  });
})();
