import Service, { inject as service } from '@ember/service';
import { action } from '@ember/object';

const AUTH_KEY = 'wat';

export default class AuthService extends Service {
  /**
   * @type {Router}
   */
  @service router;

  get isAuthenticated() {
    return Boolean(this.currentUserId);
  }

  @action
  logout() {
    window.localStorage.removeItem(AUTH_KEY);
    this.router.transitionTo('login');
  }

  /**
   *
   * @param {string} userId
   */
  loginWithUserId(userId) {
    window.localStorage.setItem(AUTH_KEY, userId);
    this.router.transitionTo('teams');
  }

  get currentUserId() {
    return window.localStorage.getItem(AUTH_KEY);
  }
}
