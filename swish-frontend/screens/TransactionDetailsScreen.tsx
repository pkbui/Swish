import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, Route, AppState } from 'react-native';
import { Button, Icon, Overlay } from 'react-native-elements';
import { Text, View } from '../components/Themed';
import { TextInput, ScrollView} from 'react-native-gesture-handler';
import { NavigationProp} from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import {APP_PRIMARY_COLOR, APP_GRADIENT_COLOR} from '../constants/Colors';
import PaymentBreakdown from '../components/PaymentBreakdown';
import RecurrencePicker from '../components/RecurrencePicker';
import * as lodash from 'lodash';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Transaction } from '../redux/types/types.Transaction';
import { updateTransaction, updateTransactionType } from '../redux/transaction/transaction.actions';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatDate } from '../utility/formatDate';

interface DispatchProps {
    updateTransaction: Function,
    updateTransactionType: typeof actions.updateTransactionType,    
}

interface TransactionDetailsProps extends DispatchProps {
    navigation: NavigationProp<any>,
    updateTransaction: Function,
    updateTransactionType: typeof actions.updateTransactionType;
    route: Route;
}

interface TransactionDetailsState {
    currentTransaction: Transaction,
    editable: boolean,
    displaySavePrompt: boolean,
    saveChanges: boolean,
    transactionType: TRANSACTION_TYPE
}

const actions = {
    updateTransactionType: (transactionType: TRANSACTION_TYPE, transactionId: Transaction) : any => true,
}

enum TRANSACTION_TYPE{
    STANDARD, MEAL, RECURRING
}

export class TransactionDetailsScreen extends React.Component<TransactionDetailsProps, TransactionDetailsState>{
    constructor (props: TransactionDetailsProps, context: any){
        super(props, context);
        this.state = {
            currentTransaction : lodash.cloneDeep(this.props.route.params),
            editable: false,
            displaySavePrompt: false,
            saveChanges: false,
            transactionType: TRANSACTION_TYPE.STANDARD,
        };
    };

    updateTransaction = (key: string, value: any) => {
        let currentTransaction : Transaction = {
            ...this.state.currentTransaction,
            [key] : value
        };
        this.setState({currentTransaction});
    }

    handleButtonClick = () => {
        this.setState({editable: !this.state.editable}, 
            () => {
                if(!this.state.editable){
                    this.setState({
                        displaySavePrompt: !this.state.displaySavePrompt
                    })
                }        
            });    
    }

    toggleOverlay = () => {
        this.setState({
            displaySavePrompt: !this.state.displaySavePrompt
        });
    }

    saveChanges = () => {
        this.props.updateTransaction(this.state.currentTransaction);
        this.setState({
            saveChanges: true,
            displaySavePrompt: false
        }); 
    }

    cancelChanges = () => {
        this.setState({
            saveChanges: false,
            displaySavePrompt: false,
            currentTransaction: this.props.route.params
        });
    }
    
    render() {
        let displaySaveOverlay = <Overlay isVisible={this.state.displaySavePrompt} onBackdropPress={() => this.toggleOverlay()}>
            <View>
                <Text>Save changes?</Text>
                <View style={{flexDirection: 'row'}}>
                    <Button title="Save" 
                    onPress={() => this.saveChanges()}/>
                    <Button title="Cancel"
                    onPress={() => this.cancelChanges()}/>
                </View>
            </View>
        </Overlay>

        console.log("Detailed Screen Rendered", TRANSACTION_TYPE[this.state.transactionType]);
        return (
                <React.Fragment>
                    {displaySaveOverlay}
                    <View style={styles.topBar}>
                        <View style={{flexDirection: "row", backgroundColor: APP_PRIMARY_COLOR, alignSelf: 'center'}}>
                            <Text style={{textAlign: 'center'}}>Created by you on {this.state.currentTransaction.createdDate} </Text>
                            <Icon
                                name='pencil'
                                type='entypo'
                                size={20}
                                color="black"
                                onPress={() => this.handleButtonClick()}
                            />  
                        </View>
                        <View style={{flexDirection: "row", backgroundColor: APP_PRIMARY_COLOR, alignSelf: 'center'}}>
                            <Icon
                                name='checkcircleo'
                                type='antdesign'
                                size={20}
                                containerStyle={{alignSelf: 'center', paddingHorizontal: 2}}
                            />
                            <Text style={{fontSize: 20, textAlign: 'center'}}>{this.state.currentTransaction.transactionName}</Text>
                        </View>
                    </View>

                    <RNPickerSelect
                    style={pickerStyle}
                    disabled={!this.state.editable}
                    items={[
                        {label: 'Standard Transaction', value: TRANSACTION_TYPE.STANDARD},
                        {label: 'Meal Transaction', value: TRANSACTION_TYPE.MEAL},
                        {label: 'Recurring Transcation', value: TRANSACTION_TYPE.RECURRING}
                    ]}
                    onValueChange={(value) => {
                        if (value !== null)
                            updateTransactionType(value, this.state.currentTransaction);
                    }}
                    placeholder={{label: 'Choose Transaction Mode', value: null}}
                    />

                    <ScrollView style={styles.container}>
                        <KeyboardAvoidingView behavior={Platform.OS == 'android' ? 'height' : 'position'}>
                            <FieldInputWithLabel currentTransaction={this.state.currentTransaction} propertyName="paymentDate" label="PAYMENT DEADLINE" editable={this.state.editable} updateEditedTransaction={this.updateTransaction}/>                            
                            <FieldInputWithLabel currentTransaction={this.state.currentTransaction} propertyName="note" label="NOTE" editable={this.state.editable} updateEditedTransaction={this.updateTransaction}/>                            
                            <PaymentBreakdown currentTransaction={this.state.currentTransaction} editable={this.state.editable} saveChanges={this.state.saveChanges}></PaymentBreakdown>
                            <Text style={this.state.transactionType === TRANSACTION_TYPE.MEAL ? null : {display: 'none'}}>Tax: 12%, Tips: 5%</Text>
                            <Button title={"Recurring Details"} titleStyle={{color: 'black'}} containerStyle={this.state.transactionType === TRANSACTION_TYPE.RECURRING ? null : {display: 'none'}}/>
                            <FieldInputWithLabel currentTransaction={this.state.currentTransaction} propertyName="totalAmount" label="TOTAL AMOUNT" editable={this.state.editable} updateEditedTransaction={this.updateTransaction}/>        
                            {(this.state.currentTransaction.transactionType == TRANSACTION_TYPE.RECURRING) && <RecurrencePicker recurrenceId={this.state.currentTransaction.recurringId} editable={this.state.editable} saveChanges={this.state.saveChanges}></RecurrencePicker>}
                            <Button title={"Complete Payment"} titleStyle={{color: 'black'}} buttonStyle={{backgroundColor: APP_PRIMARY_COLOR}}/>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </React.Fragment>
        );
    }
}

interface FieldInputWithLabelProps{
    currentTransaction: Transaction,
    propertyName: string,
    label: string,
    editable: boolean,
    updateEditedTransaction: (propertyName: string, value: any) => void
}

function FieldInputWithLabel(props : FieldInputWithLabelProps){
    var fieldValue = props.currentTransaction[props.propertyName];
    var label : string = props.label;
    var styling = props.editable ? styles.inputFieldEditable : styles.inputField;
    const [displayDatePicker, setDisplayDatePicker] = React.useState(false);

    if (props.propertyName === "paymentDate"){
            const options = {year: 'numeric', month: 'short', day: '2-digit' };
            return (
            <View>
                <Text style={{borderBottomWidth: 1}}>{label}</Text>
                <Text style={styling} 
                onPress={() => {if (props.editable) setDisplayDatePicker(true); }}>
                {props.currentTransaction[props.propertyName]}  
                </Text>
                {displayDatePicker &&  
                <DateTimePicker
                    value={new Date(props.currentTransaction[props.propertyName])}
                    mode={'date'}
                    display="default"
                    onChange={(event, date) => {
                        setDisplayDatePicker(false);
                        props.updateEditedTransaction(props.propertyName, formatDate(date)); 
                        }
                    }  
                />}
            </View> 
        );
    }
    else{
        return (
            <View>
                <Text style={{borderBottomWidth: 1}}>{label}</Text>
                <TextInput style={styling} 
                onChangeText={(text) => 
                    props.updateEditedTransaction(props.propertyName, text)}
                editable={props.editable}>
                {fieldValue}  
                </TextInput>
            </View> 
        );
    }
}

const styles = StyleSheet.create({
    topBar: {
        backgroundColor: APP_PRIMARY_COLOR, 
        flex: .2,
        flexDirection: 'column',
        paddingTop: 50
    },
    container: {
        flex: 1,
    },
    inputContainer: {
        flexDirection: "row",
        paddingVertical: 15,
        borderTopWidth: 1,
    },
    inputField: {
        paddingLeft: 5,
        backgroundColor: '#ffffff',  
        flex: 1,
        borderBottomWidth: 1
    },
    inputFieldEditable: {
        paddingLeft: 5, 
        backgroundColor: '#ffd700', 
        flex: 1,
        borderBottomWidth: 1
    },
});

const pickerStyle = StyleSheet.create({
    inputAndroid: {
        paddingLeft: 100,
        width: 200,
    },
    inputIOS: {
        paddingLeft: 100,   
        width: 200,
    }
})

const mapDispatchToProps = (dispatch : Dispatch) => {
    return {
        updateTransaction: (transaction : Transaction) => dispatch(updateTransaction(transaction)),
    }
}

export default connect(null, mapDispatchToProps)(TransactionDetailsScreen);

