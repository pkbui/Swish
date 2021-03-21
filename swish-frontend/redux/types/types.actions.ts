import {Transaction, TRANSACTION_TYPE} from './types.Transaction';
import {Contact} from './types.contact';
import { TransactionBorrowers, Borrower} from './types.TransactionBorrowers';
import { Recurrence } from './types.Recurrence';

export const ADD_NEW_TRANSACTION_BORROWER = "ADD_NEW_TRANSACTION_BORROWER";
export const ADD_BORROWER_BY_TRANSACTION_ID = "ADD_BORROWER_BY_TRANSACTION_ID";
export const ADD_MULTIPLE_TRANSACTION_BORROWERS = "ADD_MULTIPLE_TRANSACTION_BORROWERS";
export const UPDATE_TRANSACTION_BORROWERS = "UPDATE_TRANSACTION_BORROWERS";
export const LOAD_TRANSACTION_BORROWERS_LIST = "LOAD_TRANSACTION_BORROWERS_LIST";
export const REMOVE_BORROWER_FROM_TRANSACTION = "REMOVE_BORROWER_FROM_TRANSACTION";
export const REMOVE_ALL_BORROWERS_BY_TRANSACTION_ID = "REMOVE_ALL_BORROWERS_BY_TRANSACTION_ID";

export interface loadTransactionBorrowersList {
    type: typeof LOAD_TRANSACTION_BORROWERS_LIST
}

export interface addNewTransactionBorrowers {
    type: typeof ADD_NEW_TRANSACTION_BORROWER,
    transactionBorrowers: TransactionBorrowers
} 

export interface addBorrowersByTransactionId {
    type: typeof ADD_BORROWER_BY_TRANSACTION_ID,
    transactionId: string,
    borrowers: Borrower[] 
}

export interface removeBorrowerFromTransactionAction {
    type: typeof REMOVE_BORROWER_FROM_TRANSACTION,
    transactionId: string,
    contactId: string
}

export interface removeAllBorrowersByTransactionId {
    type: typeof REMOVE_ALL_BORROWERS_BY_TRANSACTION_ID,
    transactionId: string
}

export interface updateTransactionBorrowers {
    type: typeof UPDATE_TRANSACTION_BORROWERS,
    transactionId: string,
    contactId: string,
    amount: number
}

export interface addMultipleTransactionBorrowers {
    type: typeof ADD_MULTIPLE_TRANSACTION_BORROWERS,
    transactionBorrowersList: TransactionBorrowers[]
}

export type ContactTransactionPairActionTypes = loadTransactionBorrowersList | addNewTransactionBorrowers | addBorrowersByTransactionId | addMultipleTransactionBorrowers | removeBorrowerFromTransactionAction | removeAllBorrowersByTransactionId |updateTransactionBorrowers;

export const READ_CONTACT_BY_ID = "READ_CONTACT_BY_ID";
export const READ_CONTACT_BY_NAME = "READ_CONTACT_BY_NAME";
export const READ_ALL_CONTACTS = "READ_ALL_CONTACTS";
export const LOAD_CONTACTS = "LOAD_CONTACTS";
export const CREATE_CONTACT = "CREATE_CONTACT";
export const UPDATE_CONTACT = "UPDATE_CONTACT";
export const UPDATE_CONTACT_BY_PROPERTY = "UPDATE_CONTACT_BY_PROPERTY";
export const DELETE_CONTACT = "DELETE_CONTACT";

export interface loadContactsAction {
    type: typeof LOAD_CONTACTS
}

export interface readAllContactsAction {
    type: typeof READ_ALL_CONTACTS
}

export interface createContactAction {
    type: typeof CREATE_CONTACT,
    contact: Contact
}

export interface updateContactByPropertyAction {
    type: typeof UPDATE_CONTACT_BY_PROPERTY, 
    contactId: string
    propertyName: string
    propertyValue: any
}

export interface updateContactAction {
    type: typeof UPDATE_CONTACT, 
    contactId: string
    contact: Contact
}

export interface deleteContactAction {
    type: typeof DELETE_CONTACT,
    contactId: string
}


export type ContactActionTypes = loadContactsAction | readAllContactsAction | createContactAction | updateContactAction | updateContactByPropertyAction | deleteContactAction | removeAllBorrowersByTransactionId;

//Add more as we expand our redux
export const CREATE_TRANSACTION = 'CREATE_TRANSACTION';
export const UPDATE_TRANSACTION = 'UPDATE_TRANSACTION';
export const UPDATE_TRANSACTION_BY_PROPERTY = 'UPDATE_TRANSACTION_BY_PROPERTY';
export const UPDATE_TRANSACTION_TYPE = 'UPDATE_TRANSACTION_TYPE';
export const DELETE_TRANSACTION = 'DELETE_TRANSACTION';
export const LOAD_TRANSACTIONS = 'LOAD_TRANSACTIONS';

export interface loadTransactionsAction {
    type: typeof LOAD_TRANSACTIONS
}


export interface updateTransactionTypeAction {
    type: typeof UPDATE_TRANSACTION_TYPE,
    transactionType: TRANSACTION_TYPE,
    transaction: Transaction
}

export interface updateTransactionAction {
    type: typeof UPDATE_TRANSACTION,
    transaction: Transaction
}

export interface updateTransactionByPropertyAction {
    type: typeof UPDATE_TRANSACTION_BY_PROPERTY,
    id: string,
    propertyName: string,
    value: any
}

export type TransactionActionTypes = loadTransactionsAction | updateTransactionTypeAction | updateTransactionAction | updateTransactionByPropertyAction;

export const CREATE_RECURRENCE = 'CREATE_RECURRENCE';
export const UPDATE_RECURRENCE = 'UPDATE_RECURRENCE';
export const DELETE_RECURRENCE = 'DELETE_RECURRENCE';
export const LOAD_RECURRENCES = 'LOAD_RECURRENCES';

export interface loadRecurrenceAction {
    type: typeof LOAD_RECURRENCES
}

export interface createRecurrenceAction {
    type: typeof CREATE_RECURRENCE,
    recurrence: Recurrence
}

export interface updateRecurrenceAction {
    type: typeof UPDATE_RECURRENCE,
    id: string,
    updatedRecurrence: Recurrence
}

export type RecurrenceActionTypes = loadRecurrenceAction | createRecurrenceAction | updateRecurrenceAction;

//Add more as we expand our redux
export type AppActions = ContactTransactionPairActionTypes | TransactionActionTypes | ContactActionTypes | RecurrenceActionTypes;



