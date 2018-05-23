import { ELEMENT_TYPES, ACCOUNT_TYPES, NIGERIAN_BANKS } from '../constants';

export const accountProperties = {
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

export const getAccountFromState = ({
  name, bankName, bankAccountName, bankAccountNumber, type, regNumber, address
}) => ({
  name, bankName, bankAccountName, bankAccountNumber, type, regNumber, address
});

