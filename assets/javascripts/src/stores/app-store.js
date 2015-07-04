import Reflux from 'reflux';

import Actions from '../actions';

let spinner = false;

let appStore = Reflux.createStore({

  init: function () {
    this.listenTo(Actions.showSpinner, this.showSpinner);
    this.listenTo(Actions.hideSpinner, this.hideSpinner);
  },

  getState: function () {
    return {
      spinner: spinner
    }
  },

  showSpinner: function () {
    spinner = true;
    this.trigger();
  },

  hideSpinner: function () {
    spinner = false;
    this.trigger();
  }

});

export default appStore;
