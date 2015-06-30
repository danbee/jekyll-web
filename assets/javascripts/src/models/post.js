import Model from 'ampersand-model';

let Post = Model.extend({
  urlRoot: '/api/posts',

  props: {
    id: 'string',
    published: 'boolean',
    meta: 'object',
    content: 'text'
  }
});

export default Post;
