import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { ELEMENT_TYPES, ACCOUNT_TYPES, NIGERIAN_BANKS } from '../constants';
import TextInput from './elements/textInput';
import SelectInput from './elements/selectInput';
import Button from './elements/button';
import { mutations, queries } from '../queries';

const accountProperties = {
  name: {
    type: ELEMENT_TYPES.TEXT_INPUT,
    label: 'Account Name'
  },
  bankAccountName: {
    type: ELEMENT_TYPES.TEXT_INPUT,
    label: 'Bank Account Name'
  },
  bankName: {
    type: ELEMENT_TYPES.SELECT_INPUT,
    options: NIGERIAN_BANKS.map(bankName => ({ text: bankName, value: bankName })),
    label: 'Bank'
  },
  regNumber: {
    type: ELEMENT_TYPES.TEXT_INPUT,
    label: 'Registration Number'
  },
  bankAccountNumber: {
    type: ELEMENT_TYPES.TEXT_INPUT,
    label: 'Bank Account Number'
  },
  address: {
    type: ELEMENT_TYPES.TEXT_INPUT,
    label: 'Address'
  },
  type: {
    type: ELEMENT_TYPES.SELECT_INPUT,
    options: Object.keys(ACCOUNT_TYPES).map(type => ({ text: type, value: type })),
    label: 'Account Type'
  }
};

const getAccountFromState = ({
  name, bankName, bankAccountName, bankAccountNumber, type, regNumber, address
}) => ({
  name, bankName, bankAccountName, bankAccountNumber, type, regNumber, address
});

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
    this.closeNotification = this.closeNotification.bind(this);
  }
  onChangeAccountDetails(value, name) {
    this.setState(() => ({ [name]: value }));
  }
  closeNotification() {
    this.setState(() => ({ notification: undefined }));
  }
  createAccount() {
    const { createAccount, history } = this.props;
    createAccount(getAccountFromState(this.state))
      .then(({ data: { createAccount: { _id } } }) => {
        history.push(`/account/${_id}`);
        // this.setState(() => ({ notification: NOTIFICATIONS.SUCCESS_CREATING }));
      })
      .catch((error) => {
        console.error('there was an error sending the query', error); //eslint-disable-line
        // this.setState(() => ({ notification: NOTIFICATIONS.ERROR_CREATING }));
      });
  }
  updateAccount() {
    const { updateAccount, account: { _id }, history } = this.props;
    updateAccount({ ...getAccountFromState(this.state), _id })
      .then(() => {
        history.push(`/account/${_id}`);
        // this.setState(() => ({ notification: NOTIFICATIONS.SUCCESS_UPDATING }));
      })
      .catch((error) => {
        console.error('there was an error sending the query', error); //eslint-disable-line
        // this.setState(() => ({ notification: NOTIFICATIONS.ERROR_UPDATING }));
      });
  }
  deleteAccount() {
    const { deleteAccount, account: { _id }, history } = this.props;
    deleteAccount({ _id })
      .then(() => {
        history.push('/account/new');
        // this.setState(() => ({ notification: NOTIFICATIONS.SUCCESS_DELETING }));
      })
      .catch((error) => {
        console.error('there was an error sending the query', error); //eslint-disable-line
        // this.setState(() => ({ notification: NOTIFICATIONS.ERROR_DELETING }));
      });
  }
  render() {
    return (<div>
      <h2>{this.props.account._id ? 'Edit Account' : 'Create Account'}</h2>
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
  history: PropTypes.object.isRequired
};

export default withRouter(compose(
  graphql(mutations.ACCOUNT_CREATION_QUERY, {
    props: ({ mutate }) => ({
      createAccount: variables => mutate({
        variables,
        update: (proxy, { data: { createAccount } }) => {
          const query = { query: queries.ACCOUNTS_QUERY };
          const data = proxy.readQuery(query);
          data.getAccounts.push(createAccount);
          proxy.writeQuery({ ...query, data });
        }
      })
    })
  }),
  graphql(mutations.ACCOUNT_UPDATE_QUERY, {
    props: ({ mutate }) => ({
      updateAccount: variables => mutate({ variables })
    })
  }),
  graphql(mutations.ACCOUNT_DELETE_QUERY, {
    props: ({ mutate }) => ({
      deleteAccount: variables => mutate({
        variables,
        update: (proxy, { data: { deleteAccount } }) => {
          const query = { query: queries.ACCOUNTS_QUERY };
          const data = proxy.readQuery(query);
          data.getAccounts = data.getAccounts
            .filter(account => account._id !== deleteAccount._id);
          proxy.writeQuery({ ...query, data });
        }
      })
    })
  })
)(AccountDetails));