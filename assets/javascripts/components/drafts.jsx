(function () {
  window.Drafts = React.createClass({

    render: function () {
      var drafts = this.props.data.map(function (draft) {
        return (
          <Post draft="true" data={draft} key={draft._id}></Post>
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
})();
