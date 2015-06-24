(function () {
  var posts = {};

  var endpoint = '/api';

  var emptyPost = { meta: {}, content: '' };

  window.postStore = Reflux.createStore({
    getPost: function (type, filename) {
      if (posts[filename] == undefined) {
        this.fetchPost(type, filename);
        return emptyPost;
      }
      return posts[filename];
    },

    fetchPost: function (type, filename) {
      var postEndpoint = [endpoint, type, filename].join('/');
      console.log(postEndpoint);

      $.ajax({
        url: postEndpoint,
        dataType: 'json',
        success: function (response) {
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
