import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { compose as reduxCompose } from 'redux';
import { withRouter } from 'react-router-dom';

import { ELEMENT_TYPES, NOTIFICATIONS } from '../constants';
import TextInput from './elements/textInput';
import SelectInput from './elements/selectInput';
import Button from './elements/button';
import { mutations } from '../queries';
import * as actions from '../actions';
import { deleteAccountOptions, updateAccountOptions, createAccountOptions } from '../queries/options';
import { getAccountFromState, accountProperties } from '../helpers/accountDetails';
import styles from './accountDetails.scss';

class AccountDetails extends Component {
  constructor(props) {
    super(props);
    const { account } = props;
    this.state = {
      ...account,
      isDeleting: false,
      isCreatingOrUpdating: false
    };
    this.onChangeAccountDetails = this.onChangeAccountDetails.bind(this);
    this.updateAccount = this.updateAccount.bind(this);
    this.createAccount = this.createAccount.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
  }
  onChangeAccountDetails(value, name) {
    this.setState(() => ({ [name]: value }));
  }
  createAccount() {
    const { createAccount, history, openNotification } = this.props;
    createAccount(getAccountFromState(this.state))
      .then(({ data: { createAccount: { _id } } }) => {
        history.push(`/account/${_id}`);
        openNotification(NOTIFICATIONS.SUCCESS_CREATING);
      })
      .catch((error) => {
        console.error('there was an error sending the query', error); //eslint-disable-line
        openNotification(NOTIFICATIONS.ERROR_CREATING);
      });
  }
  updateAccount() {
    const {
      updateAccount, account: { _id }, history, openNotification
    } = this.props;
    updateAccount({ ...getAccountFromState(this.state), _id })
      .then(() => {
        history.push(`/account/${_id}`);
        openNotification(NOTIFICATIONS.SUCCESS_UPDATING);
      })
      .catch((error) => {
        console.error('there was an error sending the query', error); //eslint-disable-line
        openNotification(NOTIFICATIONS.ERROR_UPDATING);
      });
  }
  deleteAccount() {
    const {
      deleteAccount, account: { _id }, history, openNotification
    } = this.props;
    deleteAccount({ _id })
      .then(() => {
        history.push('/account/new');
        openNotification(NOTIFICATIONS.SUCCESS_DELETING);
      })
      .catch((error) => {
        console.error('there was an error sending the query', error); //eslint-disable-line
        openNotification(NOTIFICATIONS.ERROR_DELETING);
      });
  }
  render() {
    return (<div className={`${styles.accountDetails} ${this.props.account._id ? styles.editMode : styles.createMode}`}>
      <h2>{this.props.account._id ? 'Edit Account' : 'Create Account'}</h2>
      <div className={styles.accountDetailsBody}>
        {Object.keys(accountProperties).map(key =>
          accountProperties[key].type === ELEMENT_TYPES.TEXT_INPUT
            ? <TextInput
              defaultValue={this.state[key] || ''}
              onChange={this.onChangeAccountDetails}
              name={key}
              key={key}
              label={accountProperties[key].label}
              placeholder={accountProperties[key].label}
            />
            : <SelectInput
              value={this.state[key] || ''}
              onChange={this.onChangeAccountDetails}
              name={key}
              key={key}
              label={accountProperties[key].label}
              placeholder={accountProperties[key].label}
              options={accountProperties[key].options}
            />)}
      </div>
      <Button
        value={this.props.account._id ? 'update' : 'create'}
        onClick={this.props.account._id ? this.updateAccount : this.createAccount}
      />
      {
        this.props.account._id
          ? <Button
            value={'delete'}
            onClick={this.deleteAccount}
          />
          : null
      }
    </div>);
  }
}

AccountDetails.defaultProps = {
  account: {},
  createAccount: () => { },
  deleteAccount: () => { },
  updateAccount: () => { },
};

AccountDetails.propTypes = {
  account: PropTypes.object.isRequired,
  createAccount: PropTypes.func.isRequired,
  updateAccount: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  openNotification: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = () => ({});
const mapActionsToProps = dispatch => ({ openNotification: reduxCompose(dispatch, actions.openNotification) });

export default withRouter(connect(mapStateToProps, mapActionsToProps)(compose(
  graphql(mutations.ACCOUNT_CREATION_QUERY, createAccountOptions),
  graphql(mutations.ACCOUNT_UPDATE_QUERY, updateAccountOptions),
  graphql(mutations.ACCOUNT_DELETE_QUERY, deleteAccountOptions)
)(AccountDetails)));