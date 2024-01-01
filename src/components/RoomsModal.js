import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BottomSheet, Button, color} from '@rneui/base';
import {heading, text} from '../constants/globalStyles';
import DropDownPicker from 'react-native-dropdown-picker';
import {Input} from '@rneui/themed';
import Icon from './Icon';

const RoomsModal = ({
  roomVisible,
  setRoomVisible,
  checkIndetails,
  setCheckInDetails,
}) => {
  const handleIncDec = (type, op) => {
    console.log(type, op, 'params');
    if (type === 'room') {
      if (op === 'inc') {
        setCheckInDetails({...checkIndetails, rooms: checkIndetails.rooms + 1});
      } else {
        if (checkIndetails.rooms > 1) {
          setCheckInDetails({
            ...checkIndetails,
            rooms: checkIndetails.rooms - 1,
          });
        }
      }
    } else if (type === 'adult') {
      if (op === 'inc') {
        setCheckInDetails({
          ...checkIndetails,
          adults: checkIndetails.adults + 1,
        });
      } else {
        if (checkIndetails.adults > 1) {
          setCheckInDetails({
            ...checkIndetails,
            adults: checkIndetails.adults - 1,
          });
        }
      }
    } else if (type === 'children') {
      if (op === 'inc') {
        setCheckInDetails({
          ...checkIndetails,
          children: [
            ...checkIndetails.children,
            {id: checkIndetails.children.length, age: ''},
          ],
        });
      } else {
        if (checkIndetails.children.length) {
          const updateChildren = checkIndetails.children.pop();
          setCheckInDetails({
            ...checkIndetails,
            children: checkIndetails.children,
          });
        }
      }
    }
  };

  // useEffect(() => {
  //   const backAction = () => {
  //     setRoomVisible(false);
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );

  //   return () => backHandler.remove();
  // }, []);

  const handleConfirm = () => {
    const chilrenMessage = checkIndetails?.children
      ?.map((item, i) => `Children: ${i + 1}, Age: ${item.age}`)
      .join('\n');
    Alert.alert(
      'Confirm',
      `Your checkin input  \n room(s): ${checkIndetails.rooms} \n adults:${
        checkIndetails.adults
      } \n children:${checkIndetails.children.length} \n ${
        checkIndetails.children.length ? chilrenMessage:''
      }`,
    );
    setRoomVisible(false);
  };

  const handleInputChange = (text, index) => {
    if (text > 17 || text < 0) {
        const updatedata = checkIndetails.children.map((item, i) =>
        i === index ? {...item, age: ""} : item,
      );
      setCheckInDetails({...checkIndetails, children: updatedata});
      Alert.alert('Invaliid age', 'Age should be between 1 to 17 years');
    } else {
      const updatedata = checkIndetails.children.map((item, i) =>
        i === index ? {...item, age: text} : item,
      );
      setCheckInDetails({...checkIndetails, children: updatedata});
    }
  };

  return (
    <BottomSheet
      isVisible={roomVisible}
      onBackdropPress={() => setRoomVisible(false)}>
      <View style={styles.container}>
        <TouchableOpacity
          style={{marginBottom: 10}}
          onPress={() => setRoomVisible(false)}>
          <Icon library={'AntDesign'} name={'close'} size={30} />
        </TouchableOpacity>
        <ScrollView>
          <Text style={[heading, {color: 'black'}]}>
            Select rooms and guests
          </Text>
          <View style={styles.mainSingleContainer}>
            <View style={{flex: 1}}>
              <Text style={text}>Rooms:</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.singleBtn}
                onPress={() => handleIncDec('room', 'dec')}>
                <Text style={[text]}>-</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.singleBtn}>
                <Text style={text}>{checkIndetails.rooms}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.singleBtn}
                onPress={() => handleIncDec('room', 'inc')}>
                <Text style={text}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.mainSingleContainer}>
            <View style={{flex: 1}}>
              <Text style={text}>Adults:</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.singleBtn}
                onPress={() => handleIncDec('adult', 'dec')}>
                <Text style={[text]}>-</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.singleBtn}>
                <Text style={text}>{checkIndetails.adults}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.singleBtn}
                onPress={() => handleIncDec('adult', 'inc')}>
                <Text style={text}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.mainSingleContainer}>
            <View style={{flex: 1}}>
              <Text style={text}>Childrens:</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.singleBtn}
                onPress={() => handleIncDec('children', 'dec')}>
                <Text style={[text]}>-</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.singleBtn}>
                <Text style={text}>{checkIndetails.children.length}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.singleBtn}
                onPress={() => handleIncDec('children', 'inc')}>
                <Text style={text}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          {checkIndetails?.children?.length ? (
            <View>
              <Text style={[text, {marginVertical: 10}]}>
                Age of children at checkout
              </Text>
              {checkIndetails?.children?.map((child, i) => (
                <View key={i}>
                  <Text style={[text, {margin: 5}]}>{`Child ${i + 1}`}</Text>
                  <Input
                    placeholder="Enter the age"
                    value={child.age}
                    onChangeText={text => handleInputChange(text, i)}
                  />
                </View>
              ))}
            </View>
          ) : null}
        </ScrollView>
        <Button title={'Apply'} onPress={handleConfirm} />
      </View>
    </BottomSheet>
  );
};

export default RoomsModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 5,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  singleBtn: {
    padding: 10,
  },
  mainSingleContainer: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    marginVertical: 10,
  },
});
