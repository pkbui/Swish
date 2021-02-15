import {ContactActionTypes, READ_ALL_CONTACTS, LOAD_CONTACTS, CREATE_CONTACT, UPDATE_CONTACT, UPDATE_CONTACT_BY_PROPERTY, DELETE_CONTACT} from '../types/types.actions';
import {Contact} from '../types/types.Contact';
import { update } from "lodash";
import {contactsData} from "../contact/contact.data";

const CONTACT_INITIAL_STATE : Contact[] = [];

export const contactReducer = (state = CONTACT_INITIAL_STATE, action: ContactActionTypes) 
: Contact[] => {
    switch (action.type){
        case LOAD_CONTACTS:
            return contactsData;
        case READ_ALL_CONTACTS:
            return state;
        case CREATE_CONTACT:
            let newContact = action.contact;
            state.concat([newContact]);
            return state;
        case UPDATE_CONTACT:
            var updatedContact : Contact = action.contact;
            var indexToModify = state.findIndex((contact) => {return contact?.id === updatedContact.id});
            state[indexToModify] = updatedContact;
            return state;
        case UPDATE_CONTACT_BY_PROPERTY:
            var contactId = action.contactId;
            var propertyName = action.propertyName;
            var propertyValue = action.propertyValue;
            var indexToModify = state.findIndex((contact) => {return contact?.id === contactId});
            state[indexToModify][propertyName] = propertyValue;
            return state;
        case DELETE_CONTACT:
            var contactId = action.contactId;
            var indexToRemove = state.findIndex((contact) => {return contact?.id === contactId});
            state.splice(indexToRemove, 1);
        default: 
            return state;
    }

}




