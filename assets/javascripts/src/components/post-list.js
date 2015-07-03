import React from 'react';

import Actions from '../actions';

import postsStore from '../stores/posts-store';
import Drafts from './drafts';
import Posts from './posts';

let getState = () => {
  return {
    drafts: postsStore.getPosts({ published: false }),
    posts: postsStore.getPosts({ published: true })
  };
}

class PostList extends React.Component {

  constructor(props) {
    super(props);
    this.state = getState();
  }

  componentDidMount() {
    // returns an unsubscribe handler
    this.unsubscribePosts = postsStore.listen(() => {
      this.setState(getState());
    });
    Actions.fetchPosts();
  }

  componentWillUnmount() {
    this.unsubscribePosts();
  }

  render() {
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

};

export default PostList;
