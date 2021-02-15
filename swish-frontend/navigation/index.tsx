import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {LOAD_TRANSACTIONS, LOAD_CONTACTS, LOAD_CONTACT_TRANSACTION_PAIRS, LOAD_RECURRENCES} from '../redux/types/types.actions';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started

interface DispatchProps {
  loadTransactions: Function,
  loadContacts: Function,
  loadContactTransactionPairs: Function
  loadRecurrence: Function
}

interface NavigationProps extends DispatchProps {
  colorScheme : ColorSchemeName
} 

function Navigation(props : NavigationProps) {
  //Load Redux store data at top level component
  props.loadTransactions();
  props.loadContacts();
  props.loadContactTransactionPairs();
  props.loadRecurrence();
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={props.colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) : DispatchProps => {
  return {
    loadTransactions: () => dispatch({type: LOAD_TRANSACTIONS}),
    loadContacts: () => dispatch({type: LOAD_CONTACTS}),
    loadContactTransactionPairs: () => dispatch({type: LOAD_CONTACT_TRANSACTION_PAIRS}),
    loadRecurrence: () => dispatch({type: LOAD_RECURRENCES})
  }
};

export default connect(null, mapDispatchToProps)(Navigation);

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
