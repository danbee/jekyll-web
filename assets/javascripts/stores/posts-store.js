(function () {
  var posts = [];

  var endpoint = '/api/posts.json';

  window.postsStore = Reflux.createStore({
    init: function () {
      this.listenTo(Actions.refreshPosts, this.refreshItems);
    },

    getPosts: function (query) {
      return _.where(posts, query);
    },

    refreshItems: function () {
      $.ajax({
        url: endpoint,
        dataType: 'json',
        success: function (response) {
          posts = response.data;
          this.trigger();
        }.bind(this),
        error: function (xhr, status, err) {
          console.error(this.endpoint, status, err.toString());
        }.bind(this)
      });
    }
  });

})();
