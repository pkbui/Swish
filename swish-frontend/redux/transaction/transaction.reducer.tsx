import { CREATE_TRANSACTION, LOAD_TRANSACTIONS, UPDATE_TRANSACTION, UPDATE_TRANSACTION_BY_PROPERTY, UPDATE_TRANSACTION_TYPE, DELETE_TRANSACTION, AppActions } from '../types/types.actions';
import {Transaction, TRANSACTION_TYPE} from '../types/types.Transaction';
import * as lodash from 'lodash';
import { transactionData }from '../transaction/transaction.data';

const TRANSACTION_INITIAL_STATE : Transaction[] = [{
    id: "",
    lenderId: "",
    transactionName: "",
    note: "",
    totalAmount: 0,
    createdDate: "",
    paymentDate: "",
    recurring: false,
    recurringId: "",
    groupId: "",
    transactionType: TRANSACTION_TYPE.STANDARD
}]

export const transactionReducer = (state = TRANSACTION_INITIAL_STATE, action: AppActions) 
: Transaction[] => {
    switch(action.type) {
        case LOAD_TRANSACTIONS:
            return transactionData;
        case UPDATE_TRANSACTION_TYPE:
            //find index that wants to change the transactionType
            let index = state.findIndex(transaction => transaction.id === action.transaction.id);
            return [
                //before the transaction, no need to change
                ...state.slice(0, index),
                {
                    //change this current index transaction type
                    ...state[index],
                    transactionType: action.transactionType
                },
                //rest of the transaction
                ...state.slice(index+1),
            ]
        case UPDATE_TRANSACTION:
            let transactions = lodash.cloneDeep(state);
            let transactionId = action.transaction.id;
            let indexTransaction = state.findIndex( (transaction : Transaction) => {return transaction.id == transactionId});
            transactions[indexTransaction] = action.transaction;

            let test =  [
                ...transactions,
            ];
            return test;
        case UPDATE_TRANSACTION_BY_PROPERTY:
            index = state.findIndex(transaction => transaction.id == action.id);
            const updateTransaction = {
                ...state[index],
                [action.propertyName]: action.value
            };            
            return [
                ...state.slice(0,index),
                updateTransaction,                    
                ...state.slice(index+1)
            ]
        default:
            return state;
    }
}
