import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel (transition) {
    const isLoggedIn = this.session.get('isLoggedIn');

    if (!isLoggedIn) {
      this.session.set('attemptedTransition', transition);
      this.transitionTo('login');
    }
  },

  actions: {
  	addTalk (title) {
  		if (title) {
  			var newTalk = this.store.createRecord('talk', { title });
  			newTalk.save().then(() => {this.transitionTo('homepage');});
  		} 
  	}
  }
});
