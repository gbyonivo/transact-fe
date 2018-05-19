import gql from 'graphql-tag';

const ACCOUNTS_QUERY = gql`query AccountQuery {
  getAccounts {
   name,
   _id,
   type,
   summary{
     interest,
     paid,
     borrowed
   }
  }
}`;

const ACCOUNT_TRANSACTIONS_QUERY = gql`query AccountQuery {
  getAccounts {
   name 
  }
}`;


export const queries = {
  ACCOUNTS_QUERY,
  ACCOUNT_TRANSACTIONS_QUERY
};

export const mutations = {
};