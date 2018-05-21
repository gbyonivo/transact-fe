import { deleteAccountUpdate, createAccountUpdate } from './storeUpdates';

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