import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'awesome-talks/tests/helpers/start-app';

var application;

module('Acceptance: TalksNavigation', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('Homepage', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(find('.talk-list .talk-badge').length, 3);
    assert.equal(find('.talk-list .talk-badge:eq(0)').text().trim(), 'Ember in Action');
  });

  click('.talk-list .talk-badge:eq(0) a');
  andThen(function () {
    assert.equal(find('.talk-title').text().trim(), 'Ember in Action');
  });
});

test('login flow 1', function(assert) {
  visit('/talks/add');

  andThen(function() {
    assert.equal(currentURL(), '/login');
  });

  fillIn('#input-username', 'user1');
  click('input[type="submit"]');

  andThen(function() {
    assert.equal(currentURL(), '/talks/add');
  });
});

test('login flow 2', function(assert) {
  visit('/login');

  andThen(function() {
    assert.equal(currentURL(), '/login');
  });

  fillIn('#input-username', 'user1');
  click('input[type="submit"]');

  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});

test('Add new talk', function(assert) {
  visit('/talks/add');
  
  //login
  fillIn('#input-username', 'user1');
  click('input[type="submit"]');

  //add new talk
  fillIn('#talk-title', 'Backbone in Action!');
  click('input[type="submit"]');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('.talk-list .talk-badge:last-child').text().trim(), 'Backbone in Action!');
  });
});