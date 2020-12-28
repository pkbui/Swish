import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator, FlatList, SectionList, TouchableOpacity, Modal, TouchableHighlight} from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import {CloneContact, LoadContact, updateContact} from '../redux/contact/contact.actions'
import {Dispatch} from 'redux';
import { Contact } from '../redux/types/types.Contact';
import {AppState} from '../redux/root-reducer';
import { Contacts } from '../data_store/Contacts';
import { Transaction } from '../redux/types/types.Transaction';
import { getCustomTabsSupportingBrowsersAsync } from 'expo-web-browser';
import { clone, first, update } from 'lodash';
import * as lodash from 'lodash';
import { Button, Route } from 'react-native';
import { Input } from 'react-native-elements';
import ContactScreen from './ContactScreen';
import { NavigationProp } from '@react-navigation/native';
import { addContactToTransaction } from '../redux/contactTransactionPair/contactTransactionPair.action';
import { loadTransactions } from '../redux/transaction/transaction.actions';
import { TransactionDetailsScreen } from './TransactionDetailsScreen';


interface State {
    modalVisible: boolean
}

interface Props extends DispatchProps, State{
    contacts: Contact[]
    route: Route
    navigation: NavigationProp<any>
    modalVisible: boolean
    transactionList: Transaction[]
}

interface DispatchProps {
    LoadContact: Function
    updateContact: Function
    CloneContact: Function
    addContactToTransaction: Function
    loadTransactions: Function
}

export class contactListScreen extends React.Component<Props,State> {
    construtor(props: Props) {
        this.state = {
            modalVisible: false
        };
    }

    setModalVisible = (visible: boolean) => {
        this.setState({ modalVisible: visible });
      }

    // changeModalView = () => {
    //     this.setState({showModal: !this.state.showModal})
    // }

    getData = (contactList : Contact[]) => {
        let contactsArr = [];
        let currChar = "";
        let aCode = "A".charCodeAt(0);
        let obj: any = {};
        for(let i = 0; i < 26; i++) {
            currChar = String.fromCharCode(aCode + i);
            obj = {
                title: currChar
            }


            let currContacts = contactList.filter(item => {
                return item.name[0].toUpperCase() === currChar;   
            });
    
            if(currContacts.length > 0) {
                currContacts.sort((a,b) => a.name.localeCompare(b.name));
                obj.data = currContacts;
                contactsArr.push(obj)
            }
        }

    
        return contactsArr;
    }



    render() {
        const {contacts, navigation, addContactToTransaction, transactionList} = this.props;
        const {mealType} = this.props.route.params;
        return (   

        <View style={styles.container}>
            <SectionList
                sections = {this.getData(contacts)}
                renderItem={({ item }) => (
                <View style={styles.row}>
                    <TouchableOpacity key = {item.id} onPress = {() => addContactToTransaction(item, transactionList[0])}>

                        <Text>{item.name}</Text>

                    </TouchableOpacity>
                </View>
                )}
                renderSectionHeader={({ section }) => (
                <View style={styles.sectionHeader}>
                    <Text>{section.title}</Text>
                </View>
                )}
                keyExtractor={item => item.id}
            />
                
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={true}
                    >
                        <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Hello World!</Text>

                            <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                    >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                            </TouchableHighlight>
                        </View>
                        </View>
                    </Modal>

                    <TouchableHighlight
                        style={styles.openButton}
                    >
                        <Text style={styles.textStyle}>Show Modal</Text>
                    </TouchableHighlight>
                    </View>

            </View>
        );
    }

}


const mapStateToProps = (state: AppState, ownProps : {userId: string, navigationCallback : any}): any=> {
    let transactionList = state.transactionReducer
    let contacts = state.contactReducer;
    return {transactionList, contacts};
};


const mapDispatchToProps = (dispatch : Dispatch): DispatchProps => ({
    LoadContact: (): any => dispatch(LoadContact()),
    updateContact: (contactName : string, contact: Contact) : any => dispatch(updateContact(contactName, contact)),
    CloneContact: (contact: Contact) : any => dispatch(CloneContact(contact)),
    addContactToTransaction: (contact: Contact, transaction: Transaction) : any => dispatch(addContactToTransaction(contact, transaction)),
    loadTransactions: (): any => dispatch(loadTransactions())
});


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        flexDirection: "row",
        alignSelf: "stretch",
        paddingVertical: 20
    },
    row: {
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    sectionHeader: {
        backgroundColor: "#efefef",
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
});

export default connect(mapStateToProps, mapDispatchToProps)(contactListScreen);

