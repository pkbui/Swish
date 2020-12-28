import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { TransactionSchema } from '../data_store/Transactions';
import { View, Text, StyleSheet, FlatList, NativeSyntheticEvent, TextInputChangeEventData, Route, TextComponent } from "react-native";
import { SearchBar, ListItem, Button, Icon, Overlay } from 'react-native-elements';
import {MonoText} from './StyledText';
import { NavigationProp } from '@react-navigation/native';
import { ContactSchema, Contacts, ContactsContext, TransactionContactPair, PaymentStatus } from '../data_store/Contacts';


interface PaymentDetailsProp {
    amountOwed: number,
    tip: number,
    tax: number
}

interface PaymentDetailsState{
    //currentTransaction: TransactionSchema,
    tip: number,
    tax: number,
    amountOwed: number,
    total: number,
    finalTotal: number
}
//LATER TODO: Adjust state if users decide to set TIP/TAX as default in Settings 
export class PaymentDetails extends React.Component<PaymentDetailsProp,PaymentDetailsState> {
    constructor(props : any) {
        super(props);
        this.state = {
            amountOwed: this.props.amountOwed,
            tip: this.props.tip,
            tax: this.props.tax,
            total: 0,
            finalTotal: 0
        };
    }

    calculateTax = () => {
        console.log("calling tax");
        let convert_decimal = Number(this.state.tax) / 100;
        let totalTax = this.state.amountOwed * convert_decimal;
        this.setState({total: Number((this.state.amountOwed + totalTax).toFixed(2)) + this.state.total});
    }

    calculateTip = () => {
        let convert_decimal = Number(this.state.tip) / 100;
        let totalTip = this.state.amountOwed * convert_decimal;
        this.setState({total: Number((this.state.amountOwed + totalTip).toFixed(2)) + this.state.total});
    }

    render() {
        return (
            <TextInput style = {{textAlign: 'right'}} defaultValue = {this.state.total.toString()} />

    
        );
    }
}

const styles = StyleSheet.create({
    input : {
        width: 60,
        margin: 8,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1
    }
})