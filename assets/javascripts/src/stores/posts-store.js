import _ from 'lodash'
import $ from 'jquery'
import Reflux from 'reflux';

import Actions from '../actions';

import Post from '../models/post';
import Posts from '../collections/posts';

let emptyPost = new Post({ meta: {} });

let posts = new Posts();

let postsStore = Reflux.createStore({
  init: function () {
    this.listenTo(Actions.fetchPosts, this.fetchPosts);
    this.listenTo(Actions.fetchPost, this.fetchPost);
    this.listenTo(Actions.savePost, this.savePost);
  },

  getPosts: function (query) {
    return posts.where(query);
  },

  getPost: function (id) {
    let post = posts.findWhere({ id: id });
    if (post == undefined) { return emptyPost; }
    else { return post }
  },

  savePost: function (attributes, callback) {
    let post = posts.findWhere({ id: attributes.id });
    post.save(attributes, {
      success: callback
    });
    this.trigger();
  },

  fetchPosts: function () {
    posts.fetch({
      success: () => {
        this.trigger();
      }
    });
  },

  fetchPost: function (id) {
    let post = posts.findWhere({ id: id });
    if (post == undefined) {
      post = new Post({ id: id });
      posts.add(post);
    }
    post.fetch({
      success: () => {
        this.trigger();
      }
    });
  },
});

export default postsStore;
