import { RECURRENCE_TYPE, WEEK_DAYS, MONTH_DATES, MONTHS } from "../types/types.Recurrence";
import { LOAD_RECURRENCES, CREATE_RECURRENCE, UPDATE_RECURRENCE, AppActions } from "../types/types.actions";
import {Recurrence} from "../types/types.Recurrence";
import {recurrenceData} from "../recurrence/recurrence.data";
import * as lodash from "lodash";

const RECURRENCE_INITIAL_STATE : Recurrence[] = [{
    id: "",
    recurrenceType : RECURRENCE_TYPE.Weekly, //should be enum
    frequency : 0,
    dayOfWeek: WEEK_DAYS.Mon, //enum
    dayOfMonth: MONTH_DATES["1st"], //enum
    monthOfYear: MONTHS.January, //enum
    recurrenceCount: 0,
    paidCount: 0,
    recurrenceStart: new Date(),   //date
    recurrenceEnd: new Date() //date
}];

export const recurrenceReducer = (state = RECURRENCE_INITIAL_STATE, action: AppActions) 
: Recurrence[] => {
    switch(action.type){
        case LOAD_RECURRENCES: 
            return recurrenceData;
        case CREATE_RECURRENCE:
            const newRecurrence = action.recurrence;
            let newState : Recurrence[] = lodash.cloneDeep(state);
            newState.push(newRecurrence);
            return newState;
        case UPDATE_RECURRENCE:
            const updatedRecurrence : Recurrence = action.updatedRecurrence;
            const index = state.findIndex((recurrence) => {return recurrence.id == updatedRecurrence.id});
            newState = lodash.cloneDeep(state);
            newState[index] = updatedRecurrence;
            console.log(newState[index]);
            return newState;
        default:
            return state;
    }
}

