import { RECURRENCE_TYPE, WEEK_DAYS, MONTH_DATES, MONTHS } from "../types/types.Recurrence";

const INITIAL_STATE = {
    id: "",
    recurrence_type : RECURRENCE_TYPE.Weekly, //should be enum
    separation_count : 0,
    day_of_week: WEEK_DAYS.Mon, //enum
    day_of_month: null, //enum
    month_of_year: null, //enum
    recurrence_count: 0,
    paid_count: 0,
    recurrence_start: new Date(),   //date
    recurrence_end: new Date() //date
}

