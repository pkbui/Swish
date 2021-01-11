import { AppActions, LOAD_RECURRENCES, CREATE_RECURRENCE, UPDATE_RECURRENCE } from "../types/types.actions";
import {Recurrence, RECURRENCE_TYPE} from '../types/types.Recurrence';

export const loadRecurrenceActionType = () : AppActions => ({
    type: LOAD_RECURRENCES,
})

export const createRecurrenceActionType = (recurrence: Recurrence) : AppActions => ({
    type: CREATE_RECURRENCE,
    recurrence
})

export const updateRecurrenceActionType = (recurrenceId: string, updatedRecurrence: Recurrence) => ({
    type: UPDATE_RECURRENCE,
    recurrenceId,
    updatedRecurrence
})
