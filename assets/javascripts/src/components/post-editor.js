import _ from 'lodash';
import React from 'react';

import Actions from '../actions';

import postsStore from '../stores/posts-store';

class PostEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.getPost();
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
      this.setState(this.getPost());
    });
  }

  componentWillUnmount() {
    this.unsubscribePosts();
  }

  handleMetaChange(event) {
    let newMeta = {};
    newMeta[event.target.name] = event.target.value;
    Object.assign(this.state.meta, newMeta);
    this.setState({ meta: this.state.meta });
  }

  handleContentChange(event) {
    this.setState({ content: event.target.value });
  }

  savePost(event) {
    event.preventDefault();
    Actions.showSpinner();
    Actions.savePost(this.state, () => {
      Actions.hideSpinner();
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
          <input type="hidden" id="id" name="id" ref="id" value={this.state.id} />
          <div className="inputs">
            <div>
              <label htmlFor="title">Title</label>
              <input type="text"
                      id="title"
                      name="title"
                      onChange={this.handleMetaChange.bind(this)}
                      value={this.state.meta.title} />
            </div>
            <div>
              <label htmlFor="author">Author</label>
              <input type="text"
                      id="author"
                      name="author"
                      onChange={this.handleMetaChange.bind(this)}
                      value={this.state.meta.author} />
            </div>
            <div>
              <label htmlFor="content">Content</label>
              <textarea type="text"
                        id="content"
                        name="content"
                        onChange={this.handleContentChange.bind(this)}
                        value={this.state.content} />
            </div>
          </div>
          <div className="controls">
            <button type="submit"
                    onClick={this.savePost.bind(this)}
                    className="save">Save</button>
            <button type="submit" onClick={this.cancelEdit} className="cancel">Cancel</button>
          </div>
        </form>
      </div>
    )
  }

};

export default PostEditor;
