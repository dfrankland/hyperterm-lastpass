import React, { Component, PropTypes } from 'react';
import { filter } from 'fuzzaldrin';

class Search extends Component {
  static propTypes = {
    style: PropTypes.object,
    accounts: PropTypes.array,
    done: PropTypes.func,
    sendString: PropTypes.func,
  };

  componentWillMount() {
    this.setState({
      search: '',
    });
  }

  updateSearch = event => {
    const { value: search } = event.target;
    this.setState({ search });
  }

  autofill = password => event => {
    if (event) event.preventDefault();
    this.props.sendString(password);
    this.props.done(true);
  }

  render() {
    const { style: s, accounts } = this.props;
    const { search } = this.state;
    return (
      <div>
        <div className={s['form-group']}>
          <input
            onChange={this.updateSearch}
            ref="input-search"
            type="text"
            className={s['form-control']}
            placeholder="Search for an account name"
          />
        </div>
        <div className={s['table-responsive']} style={{ maxHeight: '200px' }}>
          <table className={`${s.table} ${s['table-sm']} ${s['table-hover']}`}>
            <thead>
              <tr>
                <th>#</th>
                <th>Account</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              {filter(accounts, search, { key: 'name' }).map(
                (account, index) => {
                  const { id, name, username, password } = account;
                  return (
                    <tr key={id} onClick={this.autofill(password)} style={{ cursor: 'pointer' }}>
                      <th>{index}</th>
                      <td>{name}</td>
                      <td>{username}</td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Search;
