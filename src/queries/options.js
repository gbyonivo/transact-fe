import { deleteAccountUpdate, createAccountUpdate, paybackUpdate, borrowUpdate } from './storeUpdates';

export const createAccountOptions = {
  props: ({ mutate }) => ({
    createAccount: variables => mutate({
      variables,
      update: createAccountUpdate
    })
  })
};

export const updateAccountOptions = {
  props: ({ mutate }) => ({
    updateAccount: variables => mutate({ variables })
  })
};

export const deleteAccountOptions = {
  props: ({ mutate }) => ({
    deleteAccount: variables => mutate({
      variables,
      update: deleteAccountUpdate
    })
  })
};

export const paybackOptions = {
  props: ({ mutate }) => ({
    payback: variables => mutate({
      variables,
      update: paybackUpdate
    })
  })
};

export const borrowOptions = {
  props: ({ mutate }) => ({
    borrow: variables => mutate({
      variables,
      update: borrowUpdate
    })
  })
};