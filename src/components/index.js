import React from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { queries } from '../queries';

const Index = ({ accounts: { loading, getAccounts, error } }) =>
  loading || error
    ? <div>loading or error</div>
    : <ul>{getAccounts.map(account =>
      <li key={account.name}>{account.name}</li>)}
    </ul>;

Index.propTypes = {
  accounts: PropTypes.object
};

export default graphql(queries.ACCOUNTS_QUERY, { name: 'accounts' })(Index);