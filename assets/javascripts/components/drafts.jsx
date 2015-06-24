var Drafts = React.createClass({

  render: function () {
    var drafts = this.props.data.map(function (draft) {
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
