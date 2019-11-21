import Service from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

// Generates a random ID
const getId = () => Math.round(Math.random() * 10000000);

const HANG_TIME = 3000; // ms

export default class NotificationsService extends Service {
  @tracked
  messages = [];

  @action
  notify(body, color = 'indigo-darker') {
    const id = getId();
    const newNotification = { id, body, color };

    this.messages = [...this.messages, newNotification];

    // Remove after HANG_TIME is complete
    setTimeout(() => {
      this.messages = this.messages.filter(m => m !== newNotification);
    }, HANG_TIME);
  }
}
