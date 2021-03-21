export enum PaymentStatus {
    Pending,
    Unpaid,
    Paid,
}

export interface TransactionBorrowers {
    id: string,
    transactionId: string,
    borrowerList: Borrower[]
}

export interface Borrower {
    contactId: string,
    paymentStatus: PaymentStatus,
    amountBorrowed: number  
}