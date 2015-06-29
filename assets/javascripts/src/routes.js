import React from 'react';
import {Route, DefaultRoute} from 'react-router';

import JekyllWeb  from './components/jekyll-web';
import PostList   from './components/post-list';
import PostEditor from './components/post-editor';

let Routes = (
  <Route handler={JekyllWeb} path="/">
    <Route name="posts" handler={PostList} />
    <Route name="post" path="/edit/:id" handler={PostEditor} />
    <Route name="draft" path="/edit/:id" handler={PostEditor} />
    <DefaultRoute handler={PostList} />
  </Route>
);

export default Routes;
