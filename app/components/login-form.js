import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import AuthService from 'shlack/services/auth';

export default class LoginFormComponent extends Component {

  @service auth;

  @tracked
  userId = null;

  get isDisabled() {
    return !this.userId;
  }

  handleSignIn(value) {
    if (typeof value === 'string' && value.length > 0) {
      this.auth.loginWithUserId(value);
    }
  }

  @action
  onSelectChanged(evt) {
    this.userId = evt.target.value;
  }

  @action
  onLoginFormSubmit(evt /* DOM event */) {
    const { target } = evt;
    const selectElem = target.querySelector('select');
    evt.preventDefault();
    if (!this.isDisabled) {
      this.handleSignIn(this.userId);
    }
  }
}
