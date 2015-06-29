import _ from 'lodash'
import $ from 'jquery'
import Reflux from 'reflux';

import Actions from '../actions';

let posts = [];

let emptyPost = { meta: {}, content: '' };

let postsEndpoint = '/api/posts.json';
let postEndpoint = '/api/posts';

let postsStore = Reflux.createStore({
  init: function () {
    this.listenTo(Actions.fetchPosts, this.fetchPosts);
    this.listenTo(Actions.fetchPost, this.fetchPost);
  },

  getPosts: function (query) {
    return _.where(posts, query);
  },

  getPost: function (id) {
    var post = _.findWhere(posts, { _id: id })
    if (post == undefined) { return emptyPost; }
    else { return post }
  },

  fetchPosts: function () {
    $.ajax({
      url: postsEndpoint,
      dataType: 'json',
      success: function (response) {
        this.updatePosts(response.data);
        this.trigger();
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.endpoint, status, err.toString());
      }.bind(this)
    });
  },

  fetchPost: function (id) {
    $.ajax({
      url: [postEndpoint, id].join('/'),
      dataType: 'json',
      success: function (response) {
        this.updatePost(id, response.data);
        this.trigger();
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.endpoint, status, err.toString());
      }.bind(this)
    });
  },

  updatePosts: function (data) {
    _.each(data, function (item) {
      this.updatePost(item._id, item);
    }.bind(this));
  },

  updatePost: function (id, data) {
    var post = _.findWhere(posts, { _id: id });
    if (post == undefined) {
      post = data;
      posts.push(post);
    }
    else {
      Object.assign(post, data);
    }
  }
});

export default postsStore;
