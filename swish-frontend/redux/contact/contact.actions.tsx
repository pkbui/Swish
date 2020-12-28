import { AppActions, READ_CONTACT_BY_ID, READ_CONTACT_BY_NAME, CREATE_CONTACT, UPDATE_CONTACT, UPDATE_CONTACT_BY_PROPERTY, DELETE_CONTACT, LOAD_CONTACTS, CLONE_CONTACTS } from "../types/types.actions"
import { ContactSchema } from "../../data_store/Contacts";
import { Contact } from "../types/types.Contact";

export const createContact = (contact: ContactSchema): AppActions => ({
    type: CREATE_CONTACT,
    contact
});

export const updateContactByProperty = (contactId: string,  propertyName: string, propertyValue: any) : AppActions => ({
    type: UPDATE_CONTACT_BY_PROPERTY,
    contactId,
    propertyName,
    propertyValue
});

export const updateContact = (contactName: string, contact: Contact) : AppActions => ({
    type: UPDATE_CONTACT,
    contactName,
    contact
});

export const deleteContact = (contactId: string) : AppActions => ({
    type: DELETE_CONTACT,
    contactId 
});

export const LoadContact = () : AppActions => ({
    type: LOAD_CONTACTS,
})

export const CloneContact = (contact: Contact) : AppActions => ({
    type: CLONE_CONTACTS,
    contact
})
