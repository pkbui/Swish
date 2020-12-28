
import { removeContactFromTransaction } from '../contactTransactionPair/contactTransactionPair.action'
import {Transaction, TRANSACTION_TYPE} from './types.Transaction';
import {Contact} from './types.contact';

export const ADD_CONTACT_TO_TRANSACTION = "ADD_CONTACT_TO_TRANSACTION";
export const REMOVE_CONTACT_FROM_TRANSACTION = "REMOVE_CONTACT_FROM_TRANSACTION";
export const EDIT_AMOUNT = "EDIT_AMOUNT";
export const LOAD_CONTACT_TRANSACTION_PAIRS = "LOAD_CONTACT_TRANSACTION_PAIRS";

export interface loadContactTransactionPairs {
    type: typeof LOAD_CONTACT_TRANSACTION_PAIRS
}

export interface addContactToTransactionAction {
    type: typeof ADD_CONTACT_TO_TRANSACTION,
    contact: Contact,
    transaction: Transaction
}

export interface removeContactFromTransactionAction {
    type: typeof REMOVE_CONTACT_FROM_TRANSACTION,
    contactId: string
}

export interface editAmountAction {
    type: typeof EDIT_AMOUNT,
    contactId: string,
    amount: number
}

export type ContactTransactionPairActionTypes = loadContactTransactionPairs | addContactToTransactionAction | removeContactFromTransactionAction | editAmountAction;

export const READ_CONTACT_BY_ID = "READ_CONTACT_BY_ID";
export const READ_CONTACT_BY_NAME = "READ_CONTACT_BY_NAME";
export const READ_ALL_CONTACTS = "READ_ALL_CONTACTS";
export const LOAD_CONTACTS = "LOAD_CONTACTS";
export const CREATE_CONTACT = "CREATE_CONTACT";
export const UPDATE_CONTACT = "UPDATE_CONTACT";
export const UPDATE_CONTACT_BY_PROPERTY = "UPDATE_CONTACT_BY_PROPERTY";
export const DELETE_CONTACT = "DELETE_CONTACT";
export const CLONE_CONTACTS = "CLONE_CONTACTS";

export interface CloneContact {
    type: typeof CLONE_CONTACTS,
    contact: Contact
}

export interface loadContacts {
    type: typeof LOAD_CONTACTS
}

export interface readAllContact {
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
    contactName: string
    contact: Contact
}

export interface deleteContactAction {
    type: typeof DELETE_CONTACT,
    contactId: string
}

export type ContactActionTypes = CloneContact | loadContacts | readAllContact | createContactAction | updateContactAction | updateContactByPropertyAction | deleteContactAction;

//Add more as we expand our redux
export const CREATE_TRANSACTION = 'CREATE_TRANSACTION';
export const UPDATE_TRANSACTION = 'UPDATE_TRANSACTION';
export const UPDATE_TRANSACTION_BY_PROPERTY = 'UPDATE_TRANSACTION_BY_PROPERTY';
export const UPDATE_TRANSACTION_TYPE = 'UPDATE_TRANSACTION_TYPE';
export const DELETE_TRANSACTION = 'DELETE_TRANSACTION';
export const LOAD_TRANSACTIONS = 'LOAD_TRANSACTIONS';

export interface loadTransactions {
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

export type TransactionActionTypes = loadTransactions | updateTransactionTypeAction | updateTransactionAction | updateTransactionByPropertyAction;



//Add more as we expand our redux
export type AppActions = ContactTransactionPairActionTypes | TransactionActionTypes | ContactActionTypes
