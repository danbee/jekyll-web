var draftsStore = Reflux.createStore({
  init: function () {
    this.endpoint = '/api/drafts.json';
    this.listenTo(Actions.refreshPosts, this.refreshItems);
  },

  refreshItems: function () {
    $.ajax({
      url: this.endpoint,
      dataType: 'json',
      success: function (response) {
        this.trigger(response.data);
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.endpoint, status, err.toString());
      }.bind(this)
    });
  }
});
