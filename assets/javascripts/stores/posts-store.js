var postsStore = Reflux.createStore({
  init: function () {
    this.items = [];
    this.listenTo(Actions.refreshPosts, this.refreshItems);
  },

  refreshItems: function () {
    $.ajax({
      url: '/api/posts.json',
      dataType: 'json',
      success: function (response) {
        this.items = response.data;
        this.trigger(this.items);
      }.bind(this),
      error: function (xhr, status, err) {
        console.error('/api/posts.json', status, err.toString());
      }.bind(this)
    });
  }
});
