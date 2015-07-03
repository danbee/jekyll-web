import _ from 'lodash';
import React from 'react';

import Actions from '../actions';

import postsStore from '../stores/posts-store';

class PostEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = { post: this.getPost() };
  }

  id() {
    return this.props.params.id;
  }

  getPost() {
    let post = postsStore.getPost(this.id());
    return { id: post.id,
             meta: post.meta,
             content: post.content };
  }

  componentDidMount() {
    // returns an unsubscribe handler
    Actions.fetchPost(this.id());
    this.unsubscribePosts = postsStore.listen(() => {
      this.setState({ post: this.getPost() });
    });
  }

  componentWillUnmount() {
    this.unsubscribePosts();
  }

  handleMetaChange(event) {
    let newMeta = {};
    newMeta[event.target.name] = event.target.value;
    Object.assign(this.state.post.meta, newMeta);
    this.setState({ post: this.state.post });
  }

  handleContentChange(event) {
    Object.assign(this.state.post, { content: event.target.value });
    this.setState({ post: this.state.post });
  }

  savePost(event) {
    event.preventDefault();
    console.log(this.state.post);
    Actions.savePost(this.state.post, () => {
      window.history.back();
    });
  }

  cancelEdit(event) {
    event.preventDefault();
    window.history.back();
  }

  render() {
    return (
      <div className="postEditor">
        <h2>Post Editor</h2>
        <form>
          <div>
            <label htmlFor="title">Title</label>
            <input type="text"
                    id="title"
                    name="title"
                    onChange={this.handleMetaChange}
                    value={this.state.post.meta.title} />
          </div>
          <div>
            <label htmlFor="author">Author</label>
            <input type="text"
                    id="author"
                    name="author"
                    onChange={this.handleMetaChange}
                    value={this.state.post.meta.author} />
          </div>
          <div>
            <label htmlFor="content">Content</label>
            <textarea type="text"
                      id="content"
                      name="content"
                      onChange={this.handleContentChange}
                      value={this.state.post.content} />
          </div>
          <div className="controls">
            <button type="submit" onClick={this.savePost} className="save">Save</button>
            <button type="submit" onClick={this.cancelEdit} className="cancel">Cancel</button>
          </div>
        </form>
      </div>
    )
  }

};

export default PostEditor;
