var draftsStore = Reflux.createStore({
  init: function () {
    this.items = [];
    this.listenTo(Actions.refreshPosts, this.refreshItems);
  },

  refreshItems: function () {
    $.ajax({
      url: '/api/drafts.json',
      dataType: 'json',
      success: function (response) {
        this.items = response.data;
        this.trigger(this.items);
      }.bind(this),
      error: function (xhr, status, err) {
        console.error('/api/drafts.json', status, err.toString());
      }.bind(this)
    });
  }
});
