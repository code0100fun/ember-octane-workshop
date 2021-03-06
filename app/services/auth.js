import Service, { inject as service } from '@ember/service';
import { action } from '@ember/object';
import fetch from 'fetch';
import { tracked } from '@glimmer/tracking';

const AUTH_KEY = 'wat';

export default class AuthService extends Service {
  /**
   * @type {Router}
   */
  @service router;
  @tracked currentUser = null;
  @service cookies;

  get isAuthenticated() {
    return Boolean(this.currentUserId);
  }

  @action
  logout() {
    this.cookies.write(AUTH_KEY, null, {path: '/'});
    this.router.transitionTo('login');
  }

  /**
   *
   * @param {string} userId
   */
  async loginWithUserId(userId) {
    this.cookies.write(AUTH_KEY, userId, {path: '/'});
    this.router.transitionTo('teams');
  }

  async loadCurrentUser() {
    const { currentUserId } = this;
    if (!currentUserId) {
      return;
    }
    this.currentUser = await (await fetch(
      `/api/users/${currentUserId}`
    )).json();
  }

  get currentUserId() {
    return this.cookies.read(AUTH_KEY);
  }
}
