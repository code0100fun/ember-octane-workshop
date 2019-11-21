import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ChannelFooterComponent extends Component {
  @tracked messageBody; // the state of the `<input>` value

  @action
  updateMessageBody(evt) {
    // action fired on `<input>`'s "input" event
    this.messageBody = evt.target.value; // updating our state
  }

  @action
  async onSubmit(evt) {
    evt.preventDefault();

    await this.args.createMessage(this.messageBody); // call the fn we were passed as an arg

    if (this.isDestroyed || this.isDestroying) return;

    this.messageBody = ''; // reset the message field
  }

  // derived state: whether messageBody is empty or not
  get isDisabled() {
    return !this.messageBody;
  }
}
