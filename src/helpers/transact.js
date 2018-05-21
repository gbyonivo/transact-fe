import { ELEMENT_TYPES, ACCOUNT_TYPES } from '../constants';

export const transactPaybackProperties = {
  paybackAmount: {
    label: 'Payback Amount',
    type: ELEMENT_TYPES.NUMBER_INPUT
  },
  receiver: {
    label: 'Paying Into',
    type: ELEMENT_TYPES.SELECT_INPUT,
    getOptions: accounts => (accounts || [])
      .filter(account => account.type === ACCOUNT_TYPES.LENDER)
      .map(account => ({ text: account.name, value: account._id }))
  }
};

export const transactBorrowProperties = {
  borrowAmount: {
    label: 'Amount To Be Borrowed',
    type: ELEMENT_TYPES.NUMBER_INPUT
  },
  rate: {
    label: 'Interest Rate',
    type: ELEMENT_TYPES.TEXT_INPUT
  },
  rateIntervals: {
    label: 'Rate Intervals (months)',
    type: ELEMENT_TYPES.TEXT_INPUT
  },
  sender: {
    label: 'Paid From',
    type: ELEMENT_TYPES.SELECT_INPUT,
    getOptions: accounts => (accounts || [])
      .filter(account => account.type === ACCOUNT_TYPES.LENDER)
      .map(account => ({ text: account.name, value: account._id }))
  }
};