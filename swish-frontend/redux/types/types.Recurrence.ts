

export enum RECURRENCE_TYPE {
    "Weekly" = 0,
    "Monthly" = 1, 
    "Yearly" = 2
}

export enum WEEK_DAYS {
    "None", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun", 
}

export enum MONTH_DATES {
    "None", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th",
    "11th", "12th", "13th", "14th", "15th", "16th", "17th", "18th", "19th", "20th",
    "21st", "22nd", "23rd", "24th", "25th", "26th", "27th", "28th", "29th", "30th", "31st"
}

export enum MONTHS {
    "None", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
}

export interface Recurrence {
    id: string, 
    recurrenceType: RECURRENCE_TYPE, //should be enum
    frequency: number,
    dayOfWeek: WEEK_DAYS, //enum
    dayOfMonth: MONTH_DATES, //enum
    monthOfYear: MONTHS, //enum
    recurrenceCount: number,
    paidCount: number,
    recurrenceStart: Date,   //date
    recurrenceEnd: Date //date
}