import gql from 'graphql-tag';

const ACCOUNT_FIELDS = `
  name,
  _id,
  type,
  bankName,
  bankAccountNumber,
  address,
  regNumber,
  bankAccountName
  `;

const ACCOUNTS_QUERY = gql`query accountQuery {
  getAccounts {
    ${ACCOUNT_FIELDS},
    summary{
      interest,
      paid,
      borrowed
    }
  }
}`;

const ACCOUNT_QUERY = gql`query accountQuery($id: String) {
  getAccount(id: $id) {
   ${ACCOUNT_FIELDS}
   transactions{ date, amount, _id }
  }
}`;

const ACCOUNT_CREATION_QUERY = gql`mutation createAccountQuery(
  $name: String,
  $type: String,
  $bankName: String,
  $bankAccountName: String,
  $bankAccountNumber: String,
  $address: String,
  $regNumber: String
) {
  createAccount (
    name: $name,
    bankName: $bankName,
    type: $type,
    bankAccountName: $bankAccountName,
    bankAccountNumber: $bankAccountNumber,
    address: $address,
    regNumber: $regNumber
  ){
    ${ACCOUNT_FIELDS}
    transactions{ date, amount, _id }
    summary{
      interest,
      paid,
      borrowed
    }
  }
}`;

const ACCOUNT_UPDATE_QUERY = gql`mutation updateAccountQuery(
  $name: String,
  $_id: String,
  $bankName: String,
  $type: String,
  $bankAccountName: String,
  $bankAccountNumber: String,
  $address: String,
  $regNumber: String
) {
  updateAccount (
    name: $name,
    _id: $_id,
    bankName: $bankName,
    type: $type,
    bankAccountName: $bankAccountName,
    bankAccountNumber: $bankAccountNumber,
    address: $address,
    regNumber: $regNumber
  ){
   ${ACCOUNT_FIELDS}
   transactions{ date, amount, _id }
  }
}`;

const ACCOUNT_DELETE_QUERY = gql`mutation deleteAccountQuery(
  $_id: String
) {
  deleteAccount (
    _id: $_id
  ){
   message, _id
  }
}`;


export const queries = {
  ACCOUNTS_QUERY,
  ACCOUNT_QUERY
};

export const mutations = {
  ACCOUNT_CREATION_QUERY,
  ACCOUNT_UPDATE_QUERY,
  ACCOUNT_DELETE_QUERY
};