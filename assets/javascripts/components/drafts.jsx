var Drafts = React.createClass({
  getInitialState: function () {
    return { items: [] }
  },
  componentDidMount: function () {
    this.unsubscribe = draftsStore.listen(this.updateItems);
  },
  updateItems: function (items) {
    this.setState({ items: items });
  },
  render: function () {
    var drafts = this.state.items.map(function (draft) {
      return (
        <Draft filename={draft}></Draft>
      );
    });
    return (
      <ul className="draftList">
        {drafts}
      </ul>
    );
  }
});

var Draft = React.createClass({
  render: function () {
    return (
      <li>{this.props.filename}</li>
    );
  }
});
