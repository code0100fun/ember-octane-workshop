import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthService from 'shlack/services/auth';
import fetch from 'fetch';

export default class TeamsRoute extends Route {
  /**
   * @type {AuthService}
   */
  @service auth;

  async beforeModel(transition) {
    if (this.auth.isAuthenticated) {
      await this.auth.loadCurrentUser();
    } else {
      this.transitionTo('login');
    }
  }

  async model() {
    const response = await fetch('/api/teams');
    const teams = await response.json();

    return teams;
  }
}
