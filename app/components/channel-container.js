import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import fetch from 'fetch';
import { inject as service } from '@ember/service';

export default class ChannelContainerComponent extends Component {
  @service auth;
  @service notifications;

  @tracked
  messages = [];

  @action
  async loadMessages() {
    const {
      channel: { id: channelId, teamId },
    } = this.args;

    const messages = await (await fetch(
      `/api/teams/${teamId}/channels/${channelId}/messages`
    )).json();
    if (this.isDestroyed || this.isDestroying) return;
    this.messages = messages;
  }

  @action
  async createMessage(body) {
    // Grab `channelId` and `teamId` from `this.args`
    const {
      channel: { id: channelId, teamId },
    } = this.args;

    // Make a POST request to /api/message with:
    // - channelId
    // - teamId
    // - body
    // - the current userId
    const resp = await fetch(`/api/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        channelId,
        teamId,
        body,
        userId: this.auth.currentUserId,
      }),
    });

    // Why’s this important? Let’s discuss as a group...
    if (this.isDestroyed || this.isDestroying) return;

    // If the response was *not OK* then throw an error
    if (!resp.ok) {
      const reason = await resp.text();
      this.notifications.notify(`Problem creating message: ${reason}`, 'red');
      return;
    }

    // Grab the message data from the response
    const newMessage = await resp.json();

    // Another one of these...
    if (this.isDestroyed || this.isDestroying) return;

    // Set `this.messages` to a new array with our brand new message at the end.
    // We’ll also sneak in an extra `user` property while we’re here for some reason.
    this.messages = [
      ...this.messages,
      { ...newMessage, user: this.auth.currentUser },
    ];

    this.notifications.notify('Created new message', 'green-dark');

    return newMessage;
  }

  @action async deleteMessage(message) {
    const resp = await fetch(`/api/messages/${message.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!resp.ok) {
      const reason = await resp.text();
      this.notifications.notify(`Problem deleting message: ${reason}`, 'red');
      return;
    }

    const idx = this.messages
      .map(m => m.id)
      .indexOf(message.id);

    this.messages.splice(idx, 1);

    // "no-op" assignment to trigger an update
    this.messages = this.messages;
    this.notifications.notify('Deleted message');
  }
}
