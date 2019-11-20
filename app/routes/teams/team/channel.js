import Route from '@ember/routing/route';
import fetch from 'fetch';

export default class TeamsTeamChannelRoute extends Route {
  async model({ channelId }) {
    const { teamId } = this.paramsFor('teams.team');
    const response = await fetch(`/api/teams/${teamId}/channels/${channelId}`);
    const channel = await response.json();

    return channel;
  }
}
