import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ELEMENT_TYPES, ACCOUNT_TYPES, NIGERIAN_BANKS } from '../constants';
import TextInput from './elements/textInput';
import SelectInput from './elements/selectInput';

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
  type: {
    type: ELEMENT_TYPES.SELECT_INPUT,
    options: Object.keys(ACCOUNT_TYPES).map(type => ({ text: type, value: type })),
    label: 'Account Type'
  }
};

class AccountDetails extends Component {
  constructor(props) {
    super(props);
    const { account } = props;
    this.state = {
      ...account
    };
    this.onChangeAccountDetails = this.onChangeAccountDetails.bind(this);
  }
  onChangeAccountDetails(value, name) {
    this.setState(() => ({ [name]: value }));
  }
  render() {
    return (<div>
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
    </div>);
  }
}

AccountDetails.propTypes = {
  account: PropTypes.object.isRequired
};

export default AccountDetails;