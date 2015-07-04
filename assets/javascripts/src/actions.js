import Reflux from 'reflux';

let Actions = Reflux.createActions([
  "fetchPosts",
  "fetchPost",
  "updatePost",
  "savePost",

  "showSpinner",
  "hideSpinner"
]);

export default Actions;
