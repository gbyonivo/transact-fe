import { ELEMENT_TYPES, ACCOUNT_TYPES } from '../constants';
import { handleRandomDateFormats } from '../functions';

export const transactPaybackProperties = {
  paybackAmount: {
    label: 'Payback Amount',
    type: ELEMENT_TYPES.NUMBER_INPUT
  },
  profitAccount: {
    label: 'Profit Account',
    type: ELEMENT_TYPES.SELECT_INPUT,
    getOptions: accounts => [{ text: '', value: '' }]
      .concat((accounts || [])
        .filter(account => account.type === ACCOUNT_TYPES.PROFIT)
        .map(account => ({ text: account.name, value: account._id })))
  },
  associatedTransaction: {
    label: 'Transaction in Reference',
    type: ELEMENT_TYPES.SELECT_INPUT,
    getOptions: (accounts, transactions) => [{ text: '', value: '' }]
      .concat((transactions || [])
        .filter(transaction => transaction.status !== 'PAID' && transaction.sender)
        .map(transaction => ({ text: handleRandomDateFormats(transaction.date, 'YYYY-MM-DD HH:mm'), value: transaction._id })))
  },
  receiver: {
    label: 'Paying Into',
    type: ELEMENT_TYPES.SELECT_INPUT,
    getOptions: accounts => [{ text: '', value: '' }]
      .concat((accounts || [])
        .filter(account => account.type === ACCOUNT_TYPES.LENDER)
        .map(account => ({ text: account.name, value: account._id })))
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
  profitAccount, receiver, paybackAmount, associatedTransaction
}) => ({
  receiver, profitAccount, associatedTransaction, amount: paybackAmount
});