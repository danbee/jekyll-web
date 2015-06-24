var Drafts = React.createClass({

  render: function () {
    var drafts = this.props.data.map(function (draft) {
      return (
        <Post data={draft} key={draft.filename}></Post>
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
