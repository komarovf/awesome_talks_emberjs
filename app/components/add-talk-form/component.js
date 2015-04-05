import Ember from 'ember';

export default Ember.Component.extend({
	title: null,

	actions: {
		addTalk (title) {
			this.sendAction('addTalk', title);
		}
	}
});
