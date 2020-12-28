import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Icon, Text } from 'react-native-elements';
import Modal from 'react-native-modal';
import {createStackNavigator} from '@react-navigation/stack'
import { useNavigation} from '@react-navigation/native';




export default function CreateTransaction() {
  const navigation = useNavigation(); 



  const [modalVisible, setModalVisible] = useState(false);


  function ChangeModalView() {
    setModalVisible(!modalVisible)
  }



  return (
    <>
      <Button onPress={() => {setModalVisible(true)}}
        icon={
          <Icon name= 'pluscircle' type = 'ant-design' size = {20} />
        }
      />
      <View >
        <Modal
          backdropOpacity={0.3}
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
          style={styles.contentView}
        >

          <View style={styles.content}>
            <View style = {styles.subtitle}>
              <Text>Select Transaction</Text>
            </View>


            <TouchableOpacity onPress = {() => { navigation.navigate('contactList', {mealType : 'standard'});
                                                ChangeModalView();} }>
              <Text> Standard</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress = {() => { navigation.navigate('contactList', {mealType: 'meal'});
                                                ChangeModalView();} }>

              <Text> Meal</Text>
            </TouchableOpacity>


            <TouchableOpacity onPress = {() => { navigation.navigate('contactList', {mealType: 'recurring'});
                                                ChangeModalView();} }>
              <Text> Recurring</Text>
            </TouchableOpacity>
            
          </View>
        </Modal>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    padding: 50,
    borderTopRightRadius: 17,
    borderTopLeftRadius: 17,
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  contentView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  subtitle: {
    alignItems: 'flex-start'
  }
});