(function () {
  window.Post = React.createClass({
    render: function () {
      //var postDate = moment(this.props.data.date).format('MMMM Do YYYY, h:mm:ss a');
      var postDate;
      if (this.props.data.date) {
        postDate = <td>{this.props.data.date}</td>;
      }
      return (
        <tr>
          <td>{this.props.data.title}</td>
          <td>{this.props.data.author}</td>
          {postDate}
        </tr>
      );
    }
  });
})();
