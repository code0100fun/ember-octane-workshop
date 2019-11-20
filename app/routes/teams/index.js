import Route from '@ember/routing/route';

export default class TeamsIndexRoute extends Route {

  beforeModel() {
    const [team] = this.modelFor('teams');

    if (team) {
      this.transitionTo('teams.team', team.id);
    }
  }

}
