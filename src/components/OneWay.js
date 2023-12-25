import {Alert, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from './Icon';
import {TouchableOpacity} from 'react-native-gesture-handler';
import moment from 'moment';
import {text} from '../constants/globalStyles';
import SingleDateModal from './SingleDateModal';

const OneWay = ({
  setOpenAirportModal,
  singleDateModal,
  setSingleDateModal,
  setPassengerMoal,
  passengerDetails,
}) => {

  const setVisibleModal= (state)=>{
     setSingleDateModal({...singleDateModal,state:state})
  };

  const handleDateChange = date => {
    setSingleDateModal({...singleDateModal, date: date});
  };

  const handleConfirm = () => {
    if (!singleDateModal.date) {
      Alert.alert(`Invalid Date`, 'Please select a date to proceed.');
    } else {
      setSingleDateModal({...singleDateModal,state:false});
      Alert.alert(`Confirm`, `You select \n Date: ${moment(singleDateModal.date)?.format('LL')}`);
    }
  };

  return (
    <View>
      <View style={{flexDirection: 'row', marginVertical: 15}}>
        <View style={{flex: 0.2}}>
          <Icon library={'Entypo'} name={'aircraft-take-off'} />
          <Icon library={'Entypo'} name={'flow-line'} />
          <Icon library={'Entypo'} name={'aircraft-landing'} />
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity
            style={{borderBottomWidth: 1}}
            onPress={() =>
              setOpenAirportModal({state: true, type: 'boarding'})
            }>
            <Text style={[text, {paddingVertical: 5}]}>Where from?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setOpenAirportModal({state: true, type: 'takeoff'})}>
            <Text style={[text, {paddingVertical: 5}]}>Where to?</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 0.2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon library={'MaterialCommunityIcons'} name={'swap-vertical'} />
        </View>
      </View>
      <TouchableOpacity
        style={styles.formElement}
        onPress={() => setSingleDateModal({...singleDateModal, state: true})}>
        <Icon library={'FontAwesome'} name={'calendar-o'} />
        <Text>{moment(singleDateModal.date).format('ddd MMM D')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.formElement}
        onPress={() => setPassengerMoal(true)}>
        <Icon library={'AntDesign'} name={'user'} />
        {passengerDetails.adults ? (
          <Text>{passengerDetails.adults} Adults ,</Text>
        ) : null}
        {passengerDetails.children.length ? (
          <Text>{passengerDetails.children.length} Children(s) -</Text>
        ) : null}
        {passengerDetails.cabinClass ? (
          <Text>{passengerDetails.cabinClass}</Text>
        ) : null}
      </TouchableOpacity>
      <SingleDateModal
        visible={singleDateModal.state}
        setVisible={setVisibleModal}
        handleDateChange={handleDateChange}
        handleConfirm={handleConfirm}
      />
    </View>
  );
};

export default OneWay;

const styles = StyleSheet.create({
  formElement: {
    flexDirection: 'row',
    gap: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
});
