import React from 'react';

import Post from './post';

let Posts = React.createClass({

  render: function () {
    return (
      <table className="postList">
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Time</th>
        </tr>
        {this.props.data.map((post) => {
          return <Post data={post} key={post.id}></Post>;
        })}
      </table>
    );
  }
});

export default Posts;
