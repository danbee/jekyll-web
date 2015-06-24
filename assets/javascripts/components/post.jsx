(function () {
  window.Post = React.createClass({
    render: function () {

      var postDate;

      if (this.props.data.date) {
        postDate = <td>{this.props.data.date}</td>;
      }

      var postLink = '#/posts/' + this.props.data.filename;

      return (
        <tr>
          <td><a href={postLink}>{this.props.data.title}</a></td>
          <td>{this.props.data.author}</td>
          {postDate}
        </tr>
      );
    }
  });
})();
