import React from 'react';

import Post from './post';

let Drafts = React.createClass({

  render: function () {
    var drafts = this.props.data.map(function (draft) {
      return (
        <Post draft="true" data={draft} key={draft.id}></Post>
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

export default Drafts;
