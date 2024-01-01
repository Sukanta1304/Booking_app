import {Alert, Dimensions, StyleSheet, Text, View} from 'react-native';
import React, { useState } from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from './Icon';
import moment from 'moment';
import {Button} from '@rneui/base';
import DestinationModal from './DestinationModal';
import DateModal from './DateModal';
import RoomsModal from './RoomsModal';
import { text } from '../constants/globalStyles';
import { colors } from '../constants/colors';

const {height, width} = Dimensions.get('window');

const Stays = () => {

    const [serachVisible, setSearchVisible] = useState(false);
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [dates, setDates] = useState({
    checkin: new Date(),
    checkout: new Date().setDate(new Date().getDate() + 1),
  });
  const [roomVisible, setRoomVisible] = useState(false);
  const [checkIndetails, setCheckInDetails] = useState({
    rooms: 1,
    adults: 1,
    children: [],
  });

  const handleCheckinDate = async (date, type) => {
    if (type === 'END_DATE') {
      // console.log('end date :', date);
      setDates({...dates, checkout: date});
    } else {
      setDates({...dates, checkin: date});
    }
  };

  const handleCheckinConfirm = async () => {
    // console.log(value,'values')
    if (!dates.checkin || !dates.checkout) {
      Alert.alert(
        'Invalid Choice',
        'Plese select both checkin and checkout date',
      );
    } else {
      setDateModalVisible(false);
      Alert.alert(
        'Confirm',
        `Your select for \n Check-in date :${moment(dates.checkin).format(
          'LL',
        )} \n Check-out date ${moment(dates.checkout).format('LL')}`,
      );
    }
  };

  return (
    <View style={{width: width / 1.1, alignSelf: 'center'}}>
      <TouchableOpacity
        style={styles.formElement}
        onPress={() => setSearchVisible(true)}>
        <Icon library={'FontAwesome'} name={'search'} />
        <Text style={[text,{color: colors.placeholderColor}]}>Enter Your Destination</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.formElement}
        onPress={() => setDateModalVisible(true)}>
        <Icon library={'FontAwesome'} name={'calendar-o'} />
        <Text style={[text,{color: colors.placeholderColor}]}>
          {moment(dates?.checkin).format('ddd MMM D')} -{' '}
          {moment(dates?.checkout).format('ddd MMM D')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.formElement}
        onPress={() => setRoomVisible(true)}>
        <Icon library={'AntDesign'} name={'user'} />
        <Text style={[text,{color: colors.placeholderColor}]}>
          {checkIndetails.rooms} room - {checkIndetails.adults} Adults -{' '}
          {checkIndetails.children.length} children(s)
        </Text>
      </TouchableOpacity>
      <Button title={'Search'} />
      <DestinationModal
        visible={serachVisible}
        setVisible={setSearchVisible}
        placeHoleder={'Enter your destination'}
      />
      <DateModal
        visible={dateModalVisible}
        setVisible={setDateModalVisible}
        handleDateChange={handleCheckinDate}
        handleConfirm={handleCheckinConfirm}
      />
      <RoomsModal
        roomVisible={roomVisible}
        setRoomVisible={setRoomVisible}
        checkIndetails={checkIndetails}
        setCheckInDetails={setCheckInDetails}
      />
    </View>
  );
};

export default Stays;

const styles = StyleSheet.create({
  formElement: {
    flexDirection: 'row',
    gap: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
});
