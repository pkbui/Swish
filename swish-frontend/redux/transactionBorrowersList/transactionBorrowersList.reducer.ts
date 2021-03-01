import { ContactTransactionPairActionTypes as TransactionBorrowersListActionTypes, LOAD_TRANSACTION_BORROWERS_LIST, ADD_NEW_TRANSACTION_BORROWER, REMOVE_BORROWER_FROM_TRANSACTION, REMOVE_ALL_BORROWERS_BY_TRANSACTION_ID, UPDATE_TRANSACTION_BORROWERS, ADD_MULTIPLE_TRANSACTION_BORROWERS, ADD_BORROWER_BY_TRANSACTION_ID as ADD_BORROWERS_BY_TRANSACTION_ID } from '../types/types.actions';
import { TransactionBorrowers, PaymentStatus } from '../types/types.TransactionBorrowers';
import * as _ from 'lodash';

const TRANSACTION_BORROWERS_LIST_INITIAL_STATE: TransactionBorrowers[] = [];

export const transactionBorrowersListReducer = 
(state = TRANSACTION_BORROWERS_LIST_INITIAL_STATE, action: TransactionBorrowersListActionTypes)
: TransactionBorrowers[] => {
    switch(action.type) {
        case LOAD_TRANSACTION_BORROWERS_LIST:
            //A map data structure might be better in terms of performance
            const transactionBorrowerList : TransactionBorrowers[] = [
                {
                    id: "88d9966b-751c-4bb5-af3f-5e5c493d9001",
                    transactionId: "122a5aa3-e4aa-4a57-a420-818fed3060f0",
                    borrowerList: [
                        {
                            contactId: "1",
                            paymentStatus: PaymentStatus.Unpaid,
                            amountBorrowed: 12.20
                        }
                    ]
                },
                {
                    id: "88d9966b-751c-4bb5-af3f-5e5c493d9002",
                    transactionId: "ef0a0809-e563-49eb-a1ac-303a404d83cc",
                    borrowerList: [
                        {
                            contactId: "2",
                            paymentStatus: PaymentStatus.Pending,
                            amountBorrowed: 22.65
                        },
                        {
                            contactId: "3",
                            paymentStatus: PaymentStatus.Pending,
                            amountBorrowed: 22.65,
                        }
                    ]
                },
                {
                    id: "88d9966b-751c-4bb5-af3f-5e5c493d9003",
                    transactionId: "8558845a-919f-4487-a5e4-19353ab944b4",
                    borrowerList: [
                        {
                            contactId: "3",
                            paymentStatus: PaymentStatus.Unpaid,
                            amountBorrowed: 20.00,
                        }
                    ]
                    
                }
            ];
            return transactionBorrowerList;        
        case ADD_NEW_TRANSACTION_BORROWER:
            let newState = _.clone(state);
            newState.push(action.transactionBorrowers);
            return newState;
        case ADD_BORROWERS_BY_TRANSACTION_ID: 
            newState = _.clone(state);
            let transactionIndex = newState.findIndex((transactionBorrower) => {return transactionBorrower.transactionId === action.transactionId});
            newState[transactionIndex].borrowerList = newState[transactionIndex].borrowerList.concat(action.borrowers);
            return newState;
        case ADD_MULTIPLE_TRANSACTION_BORROWERS:
            newState = _.clone(state);
            newState.concat(action.transactionBorrowersList);
            return newState;
        case REMOVE_BORROWER_FROM_TRANSACTION:
            newState = _.clone(state);
            transactionIndex = newState.findIndex((transactionBorrower) => {return transactionBorrower.transactionId === action.transactionId});
            newState[transactionIndex].borrowerList.splice(transactionIndex, 1);
            return newState;
        case REMOVE_ALL_BORROWERS_BY_TRANSACTION_ID:
            newState = _.clone(state);
            transactionIndex = newState.findIndex((transactionBorrower) => {return transactionBorrower.transactionId === action.transactionId});
            newState[transactionIndex].borrowerList.length = 0;
            return newState;
        case UPDATE_TRANSACTION_BORROWERS:
            newState = _.clone(state);
            transactionIndex = newState.findIndex((transactionBorrower) => {return transactionBorrower.transactionId === action.transactionId});
            const transactionBorrowers = newState[transactionIndex].borrowerList;
            const borrowerIndex = transactionBorrowers.findIndex((borrower) => {return borrower.contactId === action.contactId});
            transactionBorrowers[borrowerIndex].amountBorrowed = action.amount;
            return newState;
        default:
            return state;

    }
    
}