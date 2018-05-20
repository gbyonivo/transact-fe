import gql from 'graphql-tag';

const ACCOUNT_FIELDS = `
  name,
  _id,
  type
  `;

const ACCOUNTS_QUERY = gql`query AccountQuery {
  getAccounts {
    ${ACCOUNT_FIELDS},
    summary{
      interest,
      paid,
      borrowed
    }
  }
}`;

const ACCOUNT_QUERY = gql`query AccountQuery($id: String) {
  getAccount(id: $id) {
   ${ACCOUNT_FIELDS}
   transactions{ date }
  }
}`;

const ACCOUNT_TRANSACTIONS_QUERY = gql`query AccountQuery {
  getAccounts {
   name 
  }
}`;


export const queries = {
  ACCOUNTS_QUERY,
  ACCOUNT_TRANSACTIONS_QUERY,
  ACCOUNT_QUERY
};

export const mutations = {
};