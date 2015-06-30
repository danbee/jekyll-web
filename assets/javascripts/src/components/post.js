import React from 'react';

let Post = React.createClass({
  render: function () {

    var postDate;

    if (this.props.data.meta.date) {
      postDate = <td>{this.props.data.meta.date}</td>;
    }

    var postLink = '#/edit/' + this.props.data.id;

    return (
      <tr>
        <td><a href={postLink}>{this.props.data.meta.title}</a></td>
        <td>{this.props.data.meta.author}</td>
        {postDate}
      </tr>
    );
  }
});

export default Post;
