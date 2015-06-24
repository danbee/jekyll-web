(function () {
  var posts = {};

  var endpoint = '/api/posts/';

  var emptyPost = { meta: {}, content: '' };

  window.postStore = Reflux.createStore({
    getPost: function (filename) {
      if (posts[filename] == undefined) {
        this.fetchPost(filename);
        return emptyPost;
      }
      return posts[filename];
    },

    fetchPost: function (filename) {
      var postEndpoint = endpoint + filename;

      $.ajax({
        url: postEndpoint,
        dataType: 'json',
        success: function (response) {
          console.log(response);
          posts[filename] = response.data;
          this.trigger();
        }.bind(this),
        error: function (xhr, status, err) {
          console.error(this.postEndpoint, status, err.toString());
        }.bind(this)
      });
    }
  });
})();
