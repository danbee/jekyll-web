import React from 'react';

import Actions from '../actions';

import postsStore from '../stores/posts-store';
import Drafts from './drafts'
import Posts from './posts'

let getState = function () {
  return {
    drafts: postsStore.getPosts({ published: false }),
    posts: postsStore.getPosts({ published: true })
  };
}

let PostList = React.createClass({

  getInitialState: getState,

  componentDidMount: function () {
    // returns an unsubscribe handler
    this.unsubscribePosts = postsStore.listen(this.updatePosts);
    Actions.fetchPosts();
  },

  componentWillUnmount: function () {
    this.unsubscribePosts();
  },

  updatePosts: function () {
    this.setState(getState);
  },

  render: function () {
    return (
      <div className="postList">
        <section id="drafts">
          <h2>Drafts</h2>
          <Drafts data={this.state.drafts}></Drafts>
        </section>
        <section id="posts">
          <h2>Posts</h2>
          <Posts data={this.state.posts}></Posts>
        </section>
      </div>
    )
  }
});

export default PostList;
