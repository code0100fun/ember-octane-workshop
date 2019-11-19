import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import StubbedAuthService from 'shlack/tests/test-helpers/auth-service';

module('Integration | Component | team-sidebar', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:auth', StubbedAuthService);
  });

  test('it renders', async function(assert) {
    this.owner.lookup('service:auth').currentUserId = 'LOL';

    await render(hbs`<TeamSidebar />`);

    assert.equal(find('[data-test-user]').textContent.trim(), 'Mike North (LOL)');
  });
});
