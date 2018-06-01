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
   transactions{ date, amount, _id, sender, receiver, interest, amountPaid }
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
    transactions{ date, amount, _id, sender, receiver }
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
   transactions{ date, amount, _id, sender, receiver }
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

const PAYBACK_QUERY = gql`mutation paybackQuery(
  $_id: String,
  $receiver: String,
  $profitAccount: String,
  $associatedTransaction: String,
  $amount: Float,
) {
  payback (
    _id: $_id,
    receiver: $receiver,
    profitAccount: $profitAccount,
    associatedTransaction: $associatedTransaction,
    amount: $amount,
  ){
    _id,
   transactions{ date, amount, _id, sender, receiver },
   summary{ interest, paid, borrowed },
   alteredAccountsSummaries{ interest, paid, borrowed, _id }
  }
}`;

const BORROW_QUERY = gql`mutation borrowQuery(
  $_id: String,
  $sender: String,
  $amount: Float,
  $rate: Float,
  $rateIntervals: Int,
) {
  borrow (
    _id: $_id,
    sender: $sender,
    amount: $amount,
    rate: $rate,
    rateIntervals: $rateIntervals,
  ){
    _id,
   transactions{ date, amount, _id, sender, receiver },
   summary{ interest, paid, borrowed },
   alteredAccountsSummaries{ interest, paid, borrowed, _id }
  }
}`;

export const queries = {
  ACCOUNTS_QUERY,
  ACCOUNT_QUERY
};

export const mutations = {
  ACCOUNT_CREATION_QUERY,
  ACCOUNT_UPDATE_QUERY,
  ACCOUNT_DELETE_QUERY,
  PAYBACK_QUERY,
  BORROW_QUERY
};