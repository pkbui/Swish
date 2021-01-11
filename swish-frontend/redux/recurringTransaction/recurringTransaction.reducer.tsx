import { TRANSACTION_TYPE } from "../types/types.Transaction";

const INITIAL_STATE = {
    recurrence_type : TRANSACTION_TYPE.STANDARD, //should be enum
    separation_count : 0,
    day_of_week: "", //enum
    day_of_month: "", //enum
    month_of_year: "", //enum
    recurrence_count: 0,
    paid_count: 0,
    recurrence_start: "",   //date
    recurrence_end: "" //date

}