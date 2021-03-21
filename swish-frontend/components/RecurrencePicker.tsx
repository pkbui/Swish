import * as React from 'react';
import {StyleSheet, InteractionManager} from 'react-native';
import * as lodash from 'lodash';
import {Picker} from '@react-native-picker/picker';
import { Text, View } from '../components/Themed';
import {Button} from 'react-native-elements';
import { TextInput} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {AppState} from '../redux/root-reducer';
import {Dispatch} from 'redux';
import { Recurrence, RECURRENCE_TYPE, WEEK_DAYS, MONTHS, MONTH_DATES } from '../redux/types/types.Recurrence';
import { update } from 'lodash';
import {updateRecurrence} from '../redux/recurrence/recurrence.actions';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatDate } from '../utility/formatDate';

interface StateProps{
    currentRecurrence: Recurrence
}

interface DispatchProps{
    updateRecurrence: Function
}

interface ParentProps{
    recurrenceId: string,
    editable: boolean,
    saveChanges: boolean
}

//TODO: HANDLE WARNING "cannot update component from inside function body of another component"
interface RecurrencePickerProps extends StateProps, DispatchProps, ParentProps {};

function RecurrencePicker(props : RecurrencePickerProps){ 
    const weekValue = RECURRENCE_TYPE.Weekly;
    const monthValue = RECURRENCE_TYPE.Monthly;
    const yearValue = RECURRENCE_TYPE.Yearly;

    const weekday: WEEK_DAYS[] = [WEEK_DAYS.Mon, WEEK_DAYS.Tues, WEEK_DAYS.Wed, WEEK_DAYS.Thur, WEEK_DAYS.Fri, WEEK_DAYS.Sat, WEEK_DAYS.Sun];

    var date: MONTH_DATES[] = [];
    for (let i = 31; i >= 0; i--){
        date.push(i);
    }
    date.reverse();

    const months: MONTHS[] = [];
    for(let i = 12; i >= 0; i--){
        months.push(i);
    }
    const monthEndDate = [31, 30, 29];
    let monthEndInstance = monthEndDate[0];

    const [currentRecurrence, setRecurrence] = React.useState<Recurrence>(props.currentRecurrence);
    const updateRecurrence = (key: string, value: any) => {
        setRecurrence((prevState) => ({...prevState, [key] : value }));
    }

    const [show, setShow] = React.useState(false);

    if(!props.editable && props.saveChanges){
        if(!lodash.isEqual(props.currentRecurrence, currentRecurrence)){
            props.updateRecurrence(currentRecurrence.id, currentRecurrence);
        }
    }

    const headerText = 16;
    const bodyText = 16;

    const pickerStyling = {
        height: 50,
    }
    
    const recurrenceTypePicker = 
    <Picker style={{width: 120, height: 30, fontSize: bodyText}} selectedValue={currentRecurrence.recurrenceType.valueOf()} 
    onValueChange={(value) => {updateRecurrence("recurrenceType",value)}} prompt="Recurrence Type" enabled={props.editable}>
        <Picker.Item label="Week(s)" value={weekValue}/> 
        <Picker.Item label="Month(s)" value={monthValue}/>
        <Picker.Item label="Year(s)" value={yearValue}/>
    </Picker>;

    const recurrenceFrequencyInput = 
    <TextInput keyboardType="decimal-pad" 
        onEndEditing={(event) => {updateRecurrence("frequency", lodash.toInteger(event.nativeEvent.text))}}
        style={{textAlignVertical: "top", fontSize: bodyText, paddingLeft: 15}} enabled={props.editable}>
        {currentRecurrence.frequency}
    </TextInput>;

    const weeklySelector = 
        <Picker selectedValue={currentRecurrence.dayOfWeek} onValueChange={(value) => {updateRecurrence("dayOfWeek", value)}} style={pickerStyling} enabled={props.editable}>
            {weekday.map((instance) => {return <Picker.Item label={WEEK_DAYS[instance]} value={instance.valueOf()} key={instance}/>})}
        </Picker>;

    const monthlySelector = 
        <Picker selectedValue={currentRecurrence.dayOfMonth} onValueChange={(value) => {updateRecurrence("dayOfMonth", value)}} style={pickerStyling} enabled={props.editable}>
            {date.map((instance) => {return <Picker.Item label={MONTH_DATES[instance]} value={instance.valueOf()} key={instance}/>})}
        </Picker>;
    
    //month with 31 days
    if(currentRecurrence.monthOfYear == months[0] || currentRecurrence.monthOfYear == months[2] || currentRecurrence.monthOfYear == months[4] || currentRecurrence.monthOfYear == months[6] || 
        currentRecurrence.monthOfYear == months[7] || currentRecurrence.monthOfYear == months[9] || currentRecurrence.monthOfYear == months[11]){
        monthEndInstance = monthEndDate[0];
    }
    else{
        //February
        if(currentRecurrence.monthOfYear == months[1]) monthEndInstance = monthEndDate[2];
        //months with 30 days
        else monthEndInstance = monthEndDate[1];
    }

    const yearlySelector =
        <View style={{flexDirection: "row"}}>
            <Picker selectedValue={currentRecurrence.dayOfMonth} onValueChange={(value) => {updateRecurrence("dayOfMonth", value)}} style={{flex: 0.5}}>
                {date.slice(0, monthEndInstance).map((instance) => {return <Picker.Item label={MONTH_DATES[instance]} value={instance.valueOf()} key={instance}/>})}
            </Picker>
            <Picker selectedValue={currentRecurrence.monthOfYear} onValueChange={(value) => {updateRecurrence("monthOfYear", value)}} style={{flex: 0.5}}>
                {months.map((instance) => {return <Picker.Item label={MONTHS[instance]} value={instance.valueOf()} key={instance}/>})}
            </Picker>
        </View>;

    let recurrenceInstanceSelector;

    switch (currentRecurrence.recurrenceType) {
        case weekValue:
            recurrenceInstanceSelector = weeklySelector;
            break;
        case monthValue:
            recurrenceInstanceSelector = monthlySelector;
            break;
        case yearValue:
            recurrenceInstanceSelector = yearlySelector;
            break;
        default:
            recurrenceInstanceSelector = weeklySelector;
            break;
    }

    const endDatePicker = 
    <DateTimePicker 
        minimumDate={new Date()} 
        value={currentRecurrence.recurrenceEnd} 
        mode={"date"}
        onChange={(event, selectedDate) => {
            setShow(false);
            updateRecurrence("recurrenceEnd", selectedDate); }}
    />

    return (
        <View>
            <Text style={{fontSize: headerText,  borderBottomWidth: 1}}>RECURRENCE</Text>
            <View style={{flexDirection: "row",  borderBottomWidth: 1}}>
                <View style={{paddingTop: 4, flexDirection: "row"}}>
                    <Text style={{fontSize: bodyText}}>Repeat every</Text>
                    {recurrenceFrequencyInput}
                </View>
                {recurrenceTypePicker}
            </View>
            <View>
                {recurrenceInstanceSelector}
            </View>
            <View style={{paddingTop: 4, flexDirection: "row"}}>
                <Text style={{fontSize: bodyText}}>Ends on </Text>
                <Text style={{fontSize: bodyText}} onPress={() => setShow(props.editable && true)}>{formatDate(currentRecurrence.recurrenceEnd)}</Text>                
                {show && endDatePicker}
            </View>
        </View>
    );
}

const mapStateToProps = (state: AppState, ownProps: ParentProps) : StateProps => {
    const recurrenceReducer = state.recurrenceReducer;
    const recurrence : Recurrence = recurrenceReducer.find((recurrence) => {return ownProps.recurrenceId === recurrence.id});
    return {currentRecurrence: lodash.cloneDeep(recurrence)};
}

const mapDispatchToProps = (dispatch : Dispatch) => ({
    updateRecurrence: (recurrenceId : string, updatedRecurrence : Recurrence) => dispatch(updateRecurrence(recurrenceId, updatedRecurrence)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecurrencePicker);