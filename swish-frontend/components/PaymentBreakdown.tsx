import * as React from 'react';
import { SearchBar, ListItem, Button, Icon, Overlay } from 'react-native-elements';
import {View} from './Themed';
import {StyleSheet, Text, FlatList} from 'react-native';
import { TextInput} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {Contact} from '../redux/types/types.Contact';
import { TransactionBorrowers, PaymentStatus, Borrower } from '../redux/types/types.TransactionBorrowers';
import {AppState} from '../redux/root-reducer';
import {Dispatch} from 'redux';
import { Transaction } from '../redux/types/types.Transaction';
import { addMultipleTransactionBorrowers, updateTransactionBorrowers, removeBorrowerFromTransaction, removeAllBorrowersByTransactionId, addBorrowerByTransactionId } from '../redux/transactionBorrowersList/transactionBorrowersList.action';
import * as _ from 'lodash';


interface StateProps {
    transactionBorrowers: TransactionBorrowers,
    contacts: Contact[]
}

interface DispatchProps {
    addBorrowersByTransactionId: Function,
    removeBorrowerFromTransaction: Function,
    removeAllBorrowers: Function,
    updateTransactionBorrowers: Function 
}

interface ParentProps {
    currentTransaction: Transaction,
    editable: boolean,
    saveChanges: boolean,
}

interface PaymentBreakdownProps extends StateProps, DispatchProps, ParentProps {}

interface PaymentBreakdownState{
    search: string,
    searchResultList: Contact[],
    transactionBorrowers: TransactionBorrowers,
    contactViewVisible: boolean,
    editable: boolean,
    saveChanges: boolean,
}

class PaymentBreakdown extends React.Component<PaymentBreakdownProps, PaymentBreakdownState> {
    constructor(props : PaymentBreakdownProps){
        super(props);
        this.state = {
          search: "",
          searchResultList: [], 
          transactionBorrowers: _.cloneDeep(this.props.transactionBorrowers),
          contactViewVisible: false,
          editable: this.props.editable,
          saveChanges: this.props.saveChanges,
        };
    }

    updateSearch = (search : string) => {
        this.setState({ search }, () => {
            this.setState({
                searchResultList: this.state.search === "" ? [] : this.getContactByName(search)
            })
        });
    }

    getContactByName = (name: string) => {
        console.log ("Contacts: ", this.props.contacts);
        return this.props.contacts.filter((contact : Contact) => {return contact.name.includes(name)} );
    }

    addBorrowerToTransaction = (contact : Contact) => {
        const newBorrower : Borrower = {
            contactId: contact.id,
            amountBorrowed: 0,
            paymentStatus: PaymentStatus.Unpaid
        };
        const transactionBorrowers = _.clone(this.state.transactionBorrowers);
        transactionBorrowers.borrowerList.push(newBorrower);
        this.setState({
            transactionBorrowers
        });
    }

    removeBorrowerFromTransaction = (contactId: string) => {
        const borrowerIndex = this.props.transactionBorrowers.borrowerList.findIndex((borrower) => {return borrower.contactId === contactId});
        const transactionBorrowers = _.clone(this.state.transactionBorrowers);
        transactionBorrowers.borrowerList.splice(borrowerIndex, 1);
        this.setState({
            transactionBorrowers
        });
    }

    editAmount = (contactId : string, amount: string) => {
        const amountFloat = parseFloat(amount);
        const borrowerIndex = this.state.transactionBorrowers.borrowerList.findIndex((borrower) => {return borrower.contactId === contactId});
        const transactionBorrowers = _.clone(this.state.transactionBorrowers);
        transactionBorrowers.borrowerList[borrowerIndex].amountBorrowed = amountFloat;
        this.setState({
            transactionBorrowers
        });
    }

    toggleContactView = () => {
        this.setState({
            contactViewVisible: !this.state.contactViewVisible
        });
    }

    componentDidUpdate = () => {
        if(this.state.saveChanges){
            this.updateContactsByTransactions();
        }
    }

    updateContactsByTransactions = () => {
        const changeHappened = !_.isEqual(this.props.transactionBorrowers, this.state.transactionBorrowers);
        if (changeHappened){
            this.props.removeAllBorrowers(this.props.currentTransaction.id);
            this.props.addBorrowersByTransactionId(this.props.currentTransaction.id, this.state.transactionBorrowers.borrowerList);
        }        
    }

    static getDerivedStateFromProps = (nextProps : PaymentBreakdownProps, prevState : PaymentBreakdownState) => {
        if(nextProps.editable !== prevState.editable){
            return ({editable: nextProps.editable})
        }
        if(nextProps.saveChanges !== prevState.saveChanges){
            return ({saveChanges: nextProps.saveChanges}); 
        }
        return null;
    }

    getContactById = (contactId: string) => {
        return this.props.contacts.find((contact : Contact) => {return contactId === contact.id});
    }

    render(){
        const search = this.state.search;

        //Display results of searching for contacts
        const displayResultElement = <FlatList 
                data={this.state.searchResultList} 
                renderItem={ ({item: contact}) => {
                    return(
                    <ListItem
                    onPress={() => {this.addBorrowerToTransaction(contact); this.setState({contactViewVisible: false});} } 
                    key={contact.id}>
                        <ListItem.Title>
                            {contact.name}
                        </ListItem.Title>
                    </ListItem>
                    )} 
                }
                keyExtractor={(item) => item.id}/>

        return(
            <View>
                <Text style={{borderBottomWidth: 1}}>PAYMENT BREAKDOWN</Text>
                <Overlay isVisible={this.state.contactViewVisible} onBackdropPress={() => this.toggleContactView()}
                    overlayStyle={{height: "80%", width: "90%"}}>
                    <React.Fragment>
                        <SearchBar placeholder="Search for contact"
                            onChangeText={this.updateSearch}
                            value={search}/>
                        {displayResultElement}
                    </React.Fragment>
                </Overlay>

                {/* Add contact to current transaction */}
                <View>
                    <ListItem
                    onPress={ () => this.toggleContactView() }
                    containerStyle={this.state.editable? {backgroundColor: "#000000", flex: 0.9} : styles.displayHide}>
                        <ListItem.Content>
                            <ListItem.Title style={{color: "#ffffff"}}>
                                {"Add Contact"}
                            </ListItem.Title>
                            {this.state.transactionBorrowers.borrowerList.map((borrower) => (
                                <View style={{flexDirection: 'row', borderBottomWidth: 1}} key={borrower.contactId}>
                                    <ListItem
                                        onPress={ () => console.log("Contact Pressed")}
                                        style={{flex: 0.8}}>
                                        <ListItem.Title style={{fontSize: 14}}>
                                            {this.getContactById(borrower!.contactId)!.name}
                                        </ListItem.Title>
                                    </ListItem>
                                    <Text style={{textAlignVertical: 'center'}}>$</Text>    
                                    <TextInput
                                        defaultValue={borrower!.amountBorrowed.toString()}
                                        onSubmitEditing={ ({nativeEvent}) => this.editAmount(borrower.contactId, nativeEvent.text)}
                                        key={borrower!.contactId}
                                        style={{flex: 0.8, fontSize: 14}}
                                        keyboardType='number-pad'
                                        editable={this.state.editable}
                                    />
                                    <Button 
                                    icon={
                                        <Icon
                                        name='circle-with-minus'
                                        type='entypo'
                                        size={18}
                                        color="black"
                                        />
                                    }
                                    type="clear"
                                    containerStyle={this.state.editable? styles.removeContactButton : styles.displayHide}
                                    onPress={() => {this.removeBorrowerFromTransaction(borrower!.contactId)}}
                                    /> 
                                </View>
                            ))}
                        </ListItem.Content>
                    </ListItem>
                </View>      
            </View>
        );
    }
}

const styles = StyleSheet.create({
    displayShow: {
        flex: 1,
    },
    displayHide: {
        display: "none"
    },
    removeContactButton: {
        alignSelf: 'center',
    }
});

const mapStateToProps = (state: AppState, ownProps : ParentProps): StateProps => {
    const transactionBorrowersList : TransactionBorrowers[] = state.transactionBorrowersListReducer;
    const contacts : Contact[] = state.contactReducer;

    const transactionBorrowers = transactionBorrowersList.find((transactionBorrowers) => {
        return transactionBorrowers.transactionId ==  ownProps.currentTransaction.id;
    });
    
    return {transactionBorrowers, contacts};
};

const mapDispatchToProps = (dispatch: Dispatch) : DispatchProps => ({
    addBorrowersByTransactionId: (transactionId: string, borrower: Borrower[]) => dispatch(addBorrowerByTransactionId(transactionId, borrower)),
    removeBorrowerFromTransaction: (transactionId: string, contactId : string) => dispatch(removeBorrowerFromTransaction(transactionId, contactId)),
    removeAllBorrowers: (transactionId: string) => dispatch(removeAllBorrowersByTransactionId(transactionId)),
    updateTransactionBorrowers: (transactionId: string, contactId: string, amount: number) => dispatch(updateTransactionBorrowers(transactionId, contactId,amount)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentBreakdown);