import React, { Component, PropTypes } from 'react';
import Modal from '../../components/Modal';
import LoginForm from '../../components/LoginForm';
import Search from '../../components/Search';
import getAccounts from '../../lib/getAccounts';

let loginForm;
let decryptedAccounts;

class Lastpass extends Component {
  static propTypes = {
    style: PropTypes.object,
    sendString: PropTypes.func,
  };

  componentWillMount() {
    this.setState({
      fadeIn: false,
      display: false,
      valid: undefined,
      status: '',
      twoFactor: false,
      loggedIn: false,
    });
  }

  setValidity = (event, validity) => {
    if (event) event.preventDefault();
    if (this.state.valid === validity) return;
    let valid;
    if (typeof validity !== 'undefined') valid = !!validity;
    this.setState({ valid });
  }

  handleToggle = event => {
    if (event) event.preventDefault();

    // Reset everything if toggling the modal
    this.setValidity();
    this.updateStatus('');
    this.logOut();

    const { fadeIn, display } = this.state;

    if (!fadeIn && !display) {
      this.setState({ display: !display });
      setTimeout(
        () => this.setState({ fadeIn: !fadeIn }),
        200
      );
    } else if (fadeIn && display) {
      this.setState({ fadeIn: !fadeIn });
      setTimeout(
        () => this.setState({ display: !display }),
        200
      );
    }
  }

  updateStatus = status => {
    if (this.state.status === status) return;
    this.setState({ status });
  };

  handleFormSubmit = event => {
    if (event) event.preventDefault();
    const values = loginForm.getFormData();
    const username = values[0];
    const password = values[1];
    const twoFactor = values[2] && values[2].length > 1 ? values[2] : undefined;
    (async () => {
      const { accounts, success, error, twoFactorError } = await getAccounts({
        updateStatus: this.updateStatus,
        username,
        password,
        twoFactor,
      });
      if (success) {
        this.setValidity(null, true);
        decryptedAccounts = accounts;
        this.setState({ twoFactor: false, loggedIn: true });
      } else {
        this.setValidity(null, false);
        if (twoFactorError) this.setState({ twoFactor: true });
        console.error(error);
      }
    })();
  }

  logOut = close => {
    decryptedAccounts = undefined;
    this.setState({ loggedIn: false });
    if (close) this.handleToggle();
  }

  render() {
    const { style, sendString } = this.props;
    const { status, fadeIn, display, valid, twoFactor, loggedIn } = this.state;
    return (
      <Modal
        style={style}
        fadeIn={fadeIn}
        display={display}
        toggle={this.handleToggle}
        header={`${loggedIn ? '🔓' : '🔐'} Lastpass`}
        footer={{
          status,
          button: loggedIn ? false : 'Submit',
          click: loggedIn ? this.handleSearchSubmit : this.handleFormSubmit,
        }}
      >
        {loggedIn && (
          <div className={`${style.alert} ${style['alert-danger']}`}>
            <strong>Warning!&nbsp;</strong>
            <span>
              At this time your account is unclocked and passwords are decrypted in memory.
            </span>
          </div>
        )}
        {loggedIn ? (
          <Search
            style={style}
            accounts={decryptedAccounts}
            sendString={sendString}
            done={this.logOut}
          />
        ) : (
          <LoginForm
            ref={
              c => {
                if (c === null) return;
                loginForm = c;
              }
            }
            style={style}
            valid={valid}
            inputs={[
              {
                label: 'Username:',
                type: 'text',
                placeholder: 'Enter your email',
              },
              {
                label: 'Password:',
                type: 'password',
                placeholder: 'Enter your password',
              },
              {
                label: 'Two Factor Authentication PIN (optional):',
                type: 'text',
                condition: 'twoFactor',
                placeholder: 'Enter your PIN',
              },
            ]}
            reset={this.setValidity}
            submit={this.handleFormSubmit}
            twoFactor={twoFactor}
          />
        )}
      </Modal>
    );
  }
}

export default Lastpass;
