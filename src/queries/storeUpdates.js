import { queries } from './';

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

const updateSummaryAfterTransaction = (proxy, {
  _id,
  summary,
  alteredAccountsSummaries,
  transactions
}) => {
  const query = { query: queries.ACCOUNTS_QUERY };
  const data = proxy.readQuery(query);
  const existingAccountInList = data.getAccounts.find(account => account._id === _id);
  const alteredAccountsIds = alteredAccountsSummaries.map(({ _id: id }) => id);
  const alteredAccountsSummariesMap = alteredAccountsSummaries
    .reduce((acc, { _id: id, ...rest }) => ({ ...acc, [id]: rest }), {});
  const alteredAccountsWithUpdatedSummaries = data.getAccounts
    .filter(account => alteredAccountsIds.includes(account._id))
    .map(account => ({ ...account, summary: alteredAccountsSummariesMap[account._id] }));
  data.getAccounts = data.getAccounts
    .filter(account => ![_id, ...alteredAccountsIds].includes(account._id))
    .concat([
      { ...existingAccountInList, summary },
      ...alteredAccountsWithUpdatedSummaries
    ]);
  proxy.writeQuery({ ...query, data });

  const accountQuery = { query: queries.ACCOUNT_QUERY, variables: { _id } };
  const accountData = proxy.readQuery(accountQuery);
  accountData.getAccount.transactions = transactions;
  proxy.writeQuery({ ...accountQuery, data: accountData });
};

export const paybackUpdate = (proxy, { data: { payback } }) => {
  updateSummaryAfterTransaction(proxy, payback);
};

export const borrowUpdate = (proxy, { data: { borrow } }) => {
  updateSummaryAfterTransaction(proxy, borrow);
};