import React, { Component, PropTypes } from 'react';

class LoginForm extends Component {
  static propTypes = {
    inputs: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        type: PropTypes.string,
      })
    ),
    style: PropTypes.object,
    valid: PropTypes.bool,
    reset: PropTypes.func,
    submit: PropTypes.func,
    twoFactor: PropTypes.bool,
  };

  getFormData() {
    return Object.keys(this.refs).map(
      ref => this.refs[ref].value
    );
  }

  render() {
    const { style: s, valid, inputs, reset, submit } = this.props;
    return (
      <form onSubmit={submit}>
        {inputs.map(
          (input, index) => {
            if (input.condition && !this.props[input.condition]) return null;
            return (
              <div
                className={`${
                  s['form-group']
                } ${
                  valid === true ? s['has-success'] : ''
                } ${
                  valid === false ? s['has-danger'] : ''
                }`}
                key={index}
              >
                <label htmlFor={`input-${index}`} className={s['form-control-label']}>
                  {input.label}
                </label>
                <input
                  onChange={reset}
                  ref={`input-${index}`}
                  type={input.type}
                  placeholder={input.placeholder || ''}
                  className={`${
                    s['form-control']
                  } ${
                    valid === true ? s['form-control-success'] : ''
                  } ${
                    valid === false ? s['form-control-danger'] : ''
                  }`}
                />
              </div>
            );
          }
        )}
        <button type="submit" className={s['hidden-xs-up']} />
      </form>
    );
  }
}

export default LoginForm;
