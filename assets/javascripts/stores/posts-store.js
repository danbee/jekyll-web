(function() {
  var data = { posts: [], drafts: [] }

  var endpoint = '/api/posts.json';

  window.postsStore = Reflux.createStore({
    init: function () {
      this.listenTo(Actions.refreshPosts, this.refreshItems);
    },

    getPosts: function() {
      return data;
    },

    refreshItems: function () {
      $.ajax({
        url: endpoint,
        dataType: 'json',
        success: function (response) {
          data = response.data;
          this.trigger();
        }.bind(this),
        error: function (xhr, status, err) {
          console.error(this.endpoint, status, err.toString());
        }.bind(this)
      });
    }
  });

})();
