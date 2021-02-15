import { AppActions, LOAD_RECURRENCES, CREATE_RECURRENCE, UPDATE_RECURRENCE } from "../types/types.actions";
import {Recurrence, RECURRENCE_TYPE} from '../types/types.Recurrence';

// export const loadRecurrence = () : AppActions => ({
//     type: LOAD_RECURRENCES,
// })

export const createRecurrence = (recurrence: Recurrence) : AppActions => ({
    type: CREATE_RECURRENCE,
    recurrence
})

export const updateRecurrence = (recurrenceId: string, updatedRecurrence: Recurrence) => ({
    type: UPDATE_RECURRENCE,
    recurrenceId,
    updatedRecurrence
})
