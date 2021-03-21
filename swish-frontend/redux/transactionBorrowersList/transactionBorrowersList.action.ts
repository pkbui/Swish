import { AppActions, ADD_NEW_TRANSACTION_BORROWER, REMOVE_BORROWER_FROM_TRANSACTION, UPDATE_TRANSACTION_BORROWERS, REMOVE_ALL_BORROWERS_BY_TRANSACTION_ID, ADD_MULTIPLE_TRANSACTION_BORROWERS, ADD_BORROWER_BY_TRANSACTION_ID} from "../types/types.actions"
import { TransactionBorrowers, Borrower } from "../types/types.TransactionBorrowers";

export const addNewTransactionBorrowers = (transactionBorrowers: TransactionBorrowers): AppActions => ({
    type: ADD_NEW_TRANSACTION_BORROWER,
    transactionBorrowers
})

export const addBorrowerByTransactionId = (transactionId: string, borrowers: Borrower[]): AppActions => ({
    type: ADD_BORROWER_BY_TRANSACTION_ID,
    transactionId,
    borrowers
})

export const addMultipleTransactionBorrowers = (transactionBorrowersList: TransactionBorrowers[]): AppActions => ({
    type: ADD_MULTIPLE_TRANSACTION_BORROWERS,
    transactionBorrowersList
})

export const removeBorrowerFromTransaction = (transactionId: string, contactId: string) : AppActions => ({
    type: REMOVE_BORROWER_FROM_TRANSACTION,
    transactionId,
    contactId
})

export const removeAllBorrowersByTransactionId = (transactionId: string) : AppActions => ({
    type: REMOVE_ALL_BORROWERS_BY_TRANSACTION_ID,
    transactionId
})

export const updateTransactionBorrowers = (transactionId: string, contactId: string, amount: number) : AppActions => ({
    type: UPDATE_TRANSACTION_BORROWERS,
    transactionId,
    contactId,
    amount
})