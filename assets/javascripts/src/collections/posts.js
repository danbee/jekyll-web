import Collection from 'ampersand-rest-collection';
import Post from '../models/post';

let Posts = Collection.extend({
  model: Post,
  url: "/api/posts"
});

export default Posts;
