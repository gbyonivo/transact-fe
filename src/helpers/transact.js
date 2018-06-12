import { ELEMENT_TYPES, ACCOUNT_TYPES } from '../constants';
import { handleRandomDateFormats } from '../functions';

export const transactPaybackProperties = {
  receivingAccounts: {
    label: 'Paying Into Accounts',
    type: ELEMENT_TYPES.CHECK_AND_FILL_INPUT,
    getOptions: accounts => [{ text: '', value: '', inputValue: 0 }]
      .concat((accounts || [])
        .filter(account => account.type !== ACCOUNT_TYPES.BORROWER)
        .map(account => ({ text: account.name, value: account._id, inputValue: 1 })))
  },
  associatedTransaction: {
    label: 'Transaction in Reference',
    type: ELEMENT_TYPES.SELECT_INPUT,
    getOptions: (accounts, transactions) => [{ text: '', value: '' }]
      .concat((transactions || [])
        .filter(transaction => transaction.status !== 'PAID' && transaction.sender)
        .map(transaction => ({
          text: `${handleRandomDateFormats(transaction.date, 'YYYY-MM-DD HH:mm')} - ${transaction.amountPaid}`,
          value: transaction._id
        })))
  }
};

export const transactBorrowProperties = {
  borrowAmount: {
    label: 'Amount To Be Borrowed',
    type: ELEMENT_TYPES.NUMBER_INPUT
  },
  rate: {
    label: 'Interest Rate',
    type: ELEMENT_TYPES.NUMBER_INPUT
  },
  rateIntervals: {
    label: 'Rate Intervals (months)',
    type: ELEMENT_TYPES.NUMBER_INPUT
  },
  sender: {
    label: 'Paid From',
    type: ELEMENT_TYPES.SELECT_INPUT,
    getOptions: accounts => [{ text: '', value: '' }]
      .concat((accounts || [])
        .filter(account => account.type === ACCOUNT_TYPES.LENDER || !account.type)
        .map(account => ({ text: account.name, value: account._id })))
  }
};

export const getBorrowParamsFromState = ({
  rate, rateIntervals, sender, borrowAmount
}) => ({
  rate, rateIntervals, sender, amount: borrowAmount
});

export const getPaybackParamsFromState = ({
  associatedTransaction, receivingAccounts
}) => ({
  associatedTransaction,
  receivingAccounts: receivingAccounts.map(({ value, inputValue }) => ({ accountId: value, amount: inputValue }))
});