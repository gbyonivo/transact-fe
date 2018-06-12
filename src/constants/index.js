export const SUMMARY_HEADERS = {
  profit: 'Profit Made',
  lentOut: 'Money Lent Out',
  expectedProfit: 'Expected Profit',
  miscellaneous: 'Miscellaneous Spending',
  loss: 'Money Lost or Pardoned'
};

export const ACCOUNT_TYPES = {
  PROFIT: 'PROFIT',
  BORROWER: 'BORROWER',
  LENDER: 'LENDER'
};

export const ELEMENT_TYPES = {
  TEXT_INPUT: 'TEXT_INPUT',
  SELECT_INPUT: 'SELECT_INPUT',
  NUMBER_INPUT: 'NUMBER_INPUT',
  CHECK_AND_FILL_INPUT: 'CHECK_AND_FILL_INPUT',
};

export const NIGERIAN_BANKS = [
  '',
  'Access Bank',
  'Citibank',
  'Diamond Bank',
  'Dynamic Standard Bank',
  'Ecobank Nigeria',
  'Fidelity Bank Nigeria',
  'First Bank of Nigeria',
  'First City Monument Bank',
  'Guaranty Trust Bank',
  'Heritage Bank Plc',
  'Keystone Bank Limited',
  'Providus Bank Plc',
  'Skye Bank',
  'Stanbic IBTC Bank Nigeria Limited',
  'Standard Chartered Bank',
  'Sterling Bank',
  'Suntrust Bank Nigeria Limited',
  'Union Bank of Nigeria',
  'United Bank for Africa',
  'Unity Bank Plc',
  'Wema Bank',
  'Zenith Bank'
];

export const TRANSACT_VIEWS = {
  PAYBACK: 'PAYBACK',
  BORROW: 'BORROW'
};

export const NOTICATION_TYPES = {
  WARNING: 'warning',
  SUCCESS: 'success',
  ERROR: 'error',
};

export const NOTIFICATIONS = {
  ERROR_DELETING: {
    text: 'Error occured while trying to delete account',
    type: NOTICATION_TYPES.ERROR
  },
  SUCCESS_DELETING: {
    text: 'Account has been successfully deleted',
    type: NOTICATION_TYPES.SUCCESS
  },
  ERROR_CREATING: {
    text: 'Error occured while trying to create account',
    type: NOTICATION_TYPES.ERROR
  },
  SUCCESS_CREATING: {
    text: 'Account has been successfully created',
    type: NOTICATION_TYPES.SUCCESS
  },
  ERROR_UPDATING: {
    text: 'Error occured while trying to update account',
    type: NOTICATION_TYPES.ERROR
  },
  SUCCESS_UPDATING: {
    text: 'Account has been successfully updated',
    type: NOTICATION_TYPES.SUCCESS
  },
  SUCCESS_TRANSACTING: {
    text: 'Transaction successfully carried out',
    type: NOTICATION_TYPES.SUCCESS
  },
  ERROR_TRANSACTING: {
    text: 'Transaction failed. Please refresh page',
    type: NOTICATION_TYPES.SUCCESS
  }
};

export const ACTIONS = {
  CLOSE_NOTIFICATION: 'CLOSE_NOTIFICATION',
  OPEN_NOTIFICATION: 'OPEN_NOTIFICATION'
};