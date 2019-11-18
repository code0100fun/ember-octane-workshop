import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class LoginFormComponent extends Component {
  handleSignIn(value) {
    console.log(value);
  }

  @action
  onLoginFormSubmit(evt /* DOM event */) {
    const { target } = evt;
    const selectElem = target.querySelector('select');
    evt.preventDefault();
    this.handleSignIn(selectElem.value);
  }
}
