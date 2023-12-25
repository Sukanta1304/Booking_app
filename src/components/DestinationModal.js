import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CommonHeader from './CommonHeader';
import {Input} from '@rneui/base';

const DestinationModal = ({visible, setVisible,placeHoleder}) => {
  const [serachValue, setSearchValue] = useState('');

  return (
    <Modal visible={visible} animationType="slide">
      {/* <CommonHeader onPress={()=>setVisible(false)}/> */}
      {/* <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
          <Input
            placeholder={placeHoleder ||"Enter your destination"}
            leftIcon={{
              type: 'antdesign',
              name: 'arrowleft',
              size: 20,
              color: 'black',
              onPress: () => setVisible(false),
            }}
            rightIcon={{
              type: 'antdesign',
              name: 'closecircleo',
              size: serachValue ? 20 : 0,
              color: 'black',
              onPress: () => setSearchValue(''),
            }}
            value={serachValue}
            onChangeText={setSearchValue}
          />
        {/* </TouchableWithoutFeedback>
      </KeyboardAvoidingView> */}
    </Modal>
  );
};

export default DestinationModal;

const styles = StyleSheet.create({});
