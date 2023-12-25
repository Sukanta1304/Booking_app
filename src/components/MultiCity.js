import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Icon from './Icon';
import {TouchableOpacity} from 'react-native-gesture-handler';
import moment from 'moment';
import {text} from '../constants/globalStyles';
import SingleDateModal from './SingleDateModal';

const MultiCity = ({
  setOpenAirportModal,
  singleDateModal,
  setSingleDateModal,
  setPassengerMoal,
  passengerDetails,
}) => {
    const [openDateModal,setOpenDateModal]= useState({state:false,type:''})
  const [multiCityDetails, setMultiCityDetails] = useState({
    date1: new Date(),
    date2: '',
    boardingCity1:'',
    boardingCity2:'',
    returnCity1:'',
    returnCity2:'',
  });

  const setVisibleModal = state => {
    setOpenDateModal({state: state, type:''});
  };

  const handleDateChange1 = date => {
    // setSingleDateModal({...singleDateModal, date: date});
    setMultiCityDetails({...multiCityDetails,date1:date})
  };

  const handleDateChange2= (date)=>{
    setMultiCityDetails({...multiCityDetails,date2:date})
  }

  const handleConfirm1 = () => {
    if (!multiCityDetails.date1) {
      Alert.alert(`Invalid Date`, 'Please select a date to proceed.');
    } else {
        setOpenDateModal({state:false,type:''})
      Alert.alert(
        `Confirm`,
        `You select \n Date: ${moment(multiCityDetails.date1)?.format('LL')}`,
      );
    }
  };

  const handleConfirm2 = () => {
    if (!multiCityDetails.date2) {
      Alert.alert(`Invalid Date`, 'Please select a date to proceed.');
    } else {
        setOpenDateModal({state:false,type:''})
      Alert.alert(
        `Confirm`,
        `You select \n Date: ${moment(multiCityDetails.date2)?.format('LL')}`,
      );
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
        {/* <View
          style={{
            flex: 0.2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon library={'MaterialCommunityIcons'} name={'swap-vertical'} />
        </View> */}
      </View>
      <TouchableOpacity
        style={styles.formElement}
        onPress={() => setOpenDateModal({state:true,type:'date1'})}>
        <Icon library={'FontAwesome'} name={'calendar-o'} />
        <Text>{moment(multiCityDetails.date1).format('ddd MMM D')}</Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row', marginVertical: 5}}>
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
        {/* <View
          style={{
            flex: 0.2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon library={'MaterialCommunityIcons'} name={'swap-vertical'} />
        </View> */}
      </View>
      <TouchableOpacity
        style={styles.formElement}
        onPress={() => setOpenDateModal({state:true,type:'date2'})}>
        <Icon library={'FontAwesome'} name={'calendar-o'} />
        <Text>{multiCityDetails.date2? moment(multiCityDetails.date2).format('ddd MMM D'):'When'}</Text>
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
        visible={openDateModal.state && openDateModal.type==='date1'}
        setVisible={setVisibleModal}
        handleDateChange={handleDateChange1}
        handleConfirm={handleConfirm1}
      />
      <SingleDateModal
        visible={openDateModal.state && openDateModal.type==='date2'}
        setVisible={setVisibleModal}
        handleDateChange={handleDateChange2}
        handleConfirm={handleConfirm2}
      />
    </View>
  );
};

export default MultiCity;

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
