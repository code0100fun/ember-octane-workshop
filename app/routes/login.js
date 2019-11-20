import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthService from 'shlack/services/auth';
import fetch from 'fetch';

export default class LoginRoute extends Route {
  /**
  * @type {AuthService}
  */
 @service auth;

  async beforeModel(transition) {
    await super.beforeModel(transition);
    if (this.auth.isAuthenticated) {
      this.transitionTo('teams');
    }
  }

  async model() {
    const response = await fetch('/api/users');
    const users = await response.json();

    return users;
  }
}
