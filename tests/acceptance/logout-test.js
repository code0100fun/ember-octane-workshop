import { module, test } from 'qunit';
import { visit, currentURL, click, find } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import StubbedAuthService from '../test-helpers/auth-service';

module('Acceptance | logout', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:auth', StubbedAuthService);
  });

  test('visiting /teams', async function(assert) {
    const auth = this.owner.lookup('service:auth');
    auth.currentUserId = '1';

    await visit('/teams/li'); // Go to a URL

    assert.ok(currentURL().startsWith('/teams/li')); // Make sure we've arrived

    await click(find('.team-sidebar__logout-button')); // Click a button

    assert.equal(currentURL(), '/login'); // Make sure we're now at /login
  });

  test('visiting /teams while logged out', async function(assert) {
    const auth = this.owner.lookup('service:auth');
    auth.currentUserId = null;

    await visit('/teams/li');

    assert.equal(currentURL(), '/login');
  });
});
