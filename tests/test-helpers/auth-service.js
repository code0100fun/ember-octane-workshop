import Service, { inject as service } from '@ember/service';
import Router from '@ember/routing/router';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class StubbedAuthService extends Service {
  /**
   * @type {Router}
   */
  @service router;
  /**
   * @type {string}
   */
  @tracked currentUserId = null;

  @action
  logout() {
    this.currentUserId = null;
    this.currentUser = null;
    this.router.transitionTo('login');
  }

  get isAuthenticated() {
    return Boolean(this.currentUserId);
  }

  async loginWithUserId(id) {
    this.currentUserId = id;
    await this.loadCurrentUser();
    this.router.transitionTo('teams');
  }

  async loadCurrentUser() {
    if (!this.isAuthenticated) {
      return;
    }
    this.currentUser = {
      id: this.currentUserId,
      name: 'Mike North',
    };
  }
}
