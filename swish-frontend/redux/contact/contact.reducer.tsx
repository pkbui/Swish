import { ContactSchema } from "../../data_store/Contacts";
import harold from '../../assets/images/profile_test.webp';

import {ContactActionTypes, READ_ALL_CONTACTS, LOAD_CONTACTS, CREATE_CONTACT, UPDATE_CONTACT, UPDATE_CONTACT_BY_PROPERTY, DELETE_CONTACT, CLONE_CONTACTS} from '../types/types.actions';
import {Contact} from '../types/types.Contact';
import * as lodash from 'lodash';

const contact_INITIAL_STATE : Contact[] = [];

export const contactReducer = 
(state = contact_INITIAL_STATE, action: ContactActionTypes)  : Contact[] => {
    switch (action.type){
        case LOAD_CONTACTS:
            //TODO: This is mockup data. Will eventually be replaced with backend integration
            state = [
                {
                    id: "1",
                    ownerId: "0755850f-79a1-46f8-a06b-d169de9a23e4",
                    userId: "",
                    name: "Ken",
                    email: "kentest@gmail.com",
                    phoneNumber: "",
                    createdDate: "Jan 20th",
                    profilePicture: harold
                },
                {
                    id: "2",
                    ownerId: "0755850f-79a1-46f8-a06b-d169de9a23e4",
                    userId: "",
                    name: "Matthew",
                    email: "matthew@gmail.com",
                    phoneNumber: "",
                    createdDate: "Jan 20th",
                    profilePicture: harold
                },
                {
                    id: "3",
                    ownerId: "0755850f-79a1-46f8-a06b-d169de9a23e4",
                    userId: "",
                    name: "Krystal",
                    email: "krystal@gmail.com",
                    phoneNumber: "",
                    createdDate: "Jan 20th",
                    profilePicture: harold
                },
                {
                    id: "4",
                    ownerId: "0755850f-79a1-46f8-a06b-d169de9a23e4",
                    userId: "",
                    name: "John",
                    email: "john@gmail.com",
                    phoneNumber: "",
                    createdDate: "Jan 20th",
                    profilePicture: harold
                },
                {
                    id: "5",
                    ownerId: "0755850f-79a1-46f8-a06b-d169de9a23e4",
                    userId: "",
                    name: "Anson",
                    email: "anson@gmail.com",
                    phoneNumber: "",
                    createdDate: "Jan 20th",
                    profilePicture: harold
                }
            ];
            return state;
        case READ_ALL_CONTACTS:
            return state;
        case CREATE_CONTACT:
            let newContact = action.contact;
            state.concat([newContact]);
            return state;
        case UPDATE_CONTACT:
            // const filteredContact = state.filter(contact => {
            //     let FirstNameLowercase = contact.name.toLowerCase()

            //     return FirstNameLowercase.indexOf(action.contactName) > -1
            // })

            // return filteredContact
            let clone = lodash.cloneDeep(state)
            const filteredContact = clone.filter((contact) => {
                let contactLowercase = contact.name.toLowerCase()

                let searchTermLowercase = action.contactName.toLowerCase()

                return contactLowercase.indexOf(searchTermLowercase) > -1
            })

            return filteredContact
        
            // var name = action.contactName
            // let updatedContact = state.filter((contact) => contact.name.toLowerCase() !== name)

            // return updatedContact


            // var updatedContact : Contact = action.contact;
            // var indexToModify = state.findIndex((contact) => {return contact?.id === updatedContact.id});
            // state[indexToModify] = updatedContact;
            // return state;
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

        case CLONE_CONTACTS:
            var cloneContact = lodash.cloneDeep(state)

            return cloneContact
        default: 
            return state;
    }

}




