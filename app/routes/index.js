import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {

  @service auth;

  beforeModel() {
    if (this.auth.isAuthenticated) {
      this.transitionTo('teams');
    } else {
      this.transitionTo('login');
    }
  }

}
