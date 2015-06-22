var Drafts = React.createClass({

  getInitialState: function () {
    return { items: [] }
  },

  componentDidMount: function () {
    // returns an unsubscribe handler
    this.unsubscribe = draftsStore.listen(this.updateItems);
  },

  componentWillUnmount: function() {
    this.unsubscribe();
  },

  updateItems: function (items) {
    this.setState({ items: items });
  },

  render: function () {
    var drafts = this.state.items.map(function (draft) {
      return (
        <Draft data={draft}></Draft>
      );
    });
    return (
      <table className="draftList">
        <tr>
          <th>Title</th>
          <th>Author</th>
        </tr>
        {drafts}
      </table>
    );
  }
});

var Draft = React.createClass({
  render: function () {
    return (
      <tr>
        <td>{this.props.data.title}</td>
        <td>{this.props.data.author}</td>
      </tr>
    );
  }
});
