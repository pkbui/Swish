import { Recurrence } from "../types/types.Recurrence";
import {RECURRENCE_TYPE, WEEK_DAYS, MONTH_DATES, MONTHS} from '../types/types.Recurrence';
export var recurringTransactionData : Recurrence[] = [
    {
        id: " r3curr1ng-1878-4b0a-8bbc-025eec1b9884", 
        recurrence_type: RECURRENCE_TYPE.Monthly,
        separation_count: 0,
        day_of_week: WEEK_DAYS.None,
        day_of_month: MONTH_DATES.Fifteenth,
        month_of_year: MONTHS.None,
        recurrence_count: 1,
        paid_count: 1,
        recurrence_start: new Date(),
        recurrence_end: new Date()
    }
];