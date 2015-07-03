import React from 'react';

import Post from './post';

class Drafts extends React.Component {

  render() {
    return (
      <table className="draftList">
        <tr>
          <th>Title</th>
          <th>Author</th>
        </tr>
        {this.props.data.map((post) => {
          return <Post data={post} key={post.id}></Post>;
        })}
      </table>
    );
  }

};

export default Drafts;
