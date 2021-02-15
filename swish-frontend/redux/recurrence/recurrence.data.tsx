import { Recurrence } from "../types/types.Recurrence";
import {RECURRENCE_TYPE, WEEK_DAYS, MONTH_DATES, MONTHS} from '../types/types.Recurrence';
export var recurrenceData : Recurrence[] = [
    {
        id: "r3curr1ng-1878-4b0a-8bbc-025eec1b9884", 
        recurrenceType: RECURRENCE_TYPE["Monthly"],
        frequency: 1,
        dayOfWeek: WEEK_DAYS.None,
        dayOfMonth: MONTH_DATES["15th"],
        monthOfYear: MONTHS.None,
        recurrenceCount: 1,
        paidCount: 1,
        recurrenceStart: new Date(),
        recurrenceEnd: new Date()
    }
];