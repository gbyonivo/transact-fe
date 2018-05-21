import queries from './';

export const deleteAccountUpdate = (proxy, { data: { deleteAccount } }) => {
  const query = { query: queries.ACCOUNTS_QUERY };
  const data = proxy.readQuery(query);
  data.getAccounts = data.getAccounts
    .filter(account => account._id !== deleteAccount._id);
  proxy.writeQuery({ ...query, data });
};

export const createAccountUpdate = (proxy, { data: { createAccount } }) => {
  const query = { query: queries.ACCOUNTS_QUERY };
  const data = proxy.readQuery(query);
  data.getAccounts.push(createAccount);
  proxy.writeQuery({ ...query, data });
};