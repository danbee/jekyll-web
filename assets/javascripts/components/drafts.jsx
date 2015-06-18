var Drafts = React.createClass({
  loadDrafts: function () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function (response) {
        this.setState({ data: response.data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function () {
    return { data: [] }
  },
  componentDidMount: function () {
    this.loadDrafts();
  },
  render: function () {
    return (
      <DraftList data={this.state.data}></DraftList>
    )
  }
});

var DraftList = React.createClass({
  render: function () {
    var drafts = this.props.data.map(function (draft) {
      return (
        <Draft filename={draft}></Draft>
      );
    });
    return (
      <ul class="draftList">
        {drafts}
      </ul>
    );
  }
});

var Draft = React.createClass({
  render: function () {
    return (
      <li>{this.props.filename}</li>
    );
  }
});
