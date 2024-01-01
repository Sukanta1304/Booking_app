import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Button, CheckBox} from '@rneui/base';
import Icon from './Icon';
import {text} from '../constants/globalStyles';
import OneWay from './OneWay';
import MultiCity from './MultiCity';
import SearchModal from './SearchModal';
import DateModal from './DateModal';
import PassengerModal from './PassengerModal';
import moment from 'moment';
import { colors } from '../constants/colors';

const {height, width} = Dimensions.get('window');

const Flights = () => {
  const chekTabs = [
    {
      id: 1,
      title: 'Round trip',
    },
    {
      id: 2,
      title: 'One way',
    },
    {
      id: 3,
      title: 'Multi-city',
    },
  ];

  const [selectedCheckIndex, setSelectedCheckIndex] = useState(0);
  const [openAirportModal, setOpenAirportModal] = useState({
    state: false,
    type: '',
  });
  const [flightDateModal, setFlightDateModal] = useState(false);
  const [journeyDate, setJourneyDate] = useState({
    start: new Date(),
    end: new Date().setDate(new Date().getDate() + 7),
  });
  const [passengerModal, setPassengerMoal] = useState(false);
  const [passengerDetails, setPassengerDetails] = useState({
    adults: 1,
    children: [],
    cabinClass: '',
  });
  const [singleDateModal, setSingleDateModal] = useState({
    state: false,
    date: new Date(),
  });

  const handleFlightDateChange = async (date, type) => {
    if (type === 'END_DATE') {
      // console.log('end date :', date);
      setJourneyDate({...journeyDate, end: date});
    } else {
      // console.log('start date :', date);
      setJourneyDate({...journeyDate, start: date});
    }
  };
  const handleFlightDateConfirm = async () => {
    if (!journeyDate.start || !journeyDate.end) {
      Alert.alert(
        'Invalid Choice',
        'Plese select both journey start and end date',
      );
    } else {
      setFlightDateModal(false);
      Alert.alert(
        'Confirm',
        `Your select for \n Boaring date :${moment(journeyDate.start).format(
          'LL',
        )} \n Return date ${moment(journeyDate.end).format('LL')}`,
      );
    }
  };

  return (
    <View style={{width: width / 1.1}}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {chekTabs.map((tab, i) => (
          <CheckBox
            key={i}
            title={tab.title}
            containerStyle={{
              backgroundColor: 'transparent',
              margin: 0,
              padding: 0,
            }}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={selectedCheckIndex === i}
            onPress={() => setSelectedCheckIndex(i)}
          />
        ))}
      </ScrollView>
      {selectedCheckIndex === 0 ? (
        <View>
          <View style={{flexDirection: 'row', marginVertical: 15,justifyContent:'center',alignItems:'center'}}>
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
                <Text style={[text, {paddingBottom: 15,color: colors.placeholderColor}]}>Where from?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  setOpenAirportModal({state: true, type: 'takeoff'})
                }>
                <Text style={[text, {paddingTop: 15,color: colors.placeholderColor}]}>Where to?</Text>
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
            style={[
              styles.formElement,
              {
                borderLeftWidth: 0,
                borderRightWidth: 0,
                borderTopWidth: 0,
              },
            ]}
            onPress={() => setFlightDateModal(true)}>
            <Icon library={'FontAwesome'} name={'calendar-o'} />
            <Text style={[text,{color:colors.placeholderColor}]}>
              {moment(journeyDate.start).format('ddd MMM D')} -{' '}
              {moment(journeyDate.end).format('ddd MMM D')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.formElement,
              {
                borderLeftWidth: 0,
                borderRightWidth: 0,
                borderTopWidth: 0,
              },
            ]}
            onPress={() => setPassengerMoal(true)}>
            <Icon library={'AntDesign'} name={'user'} />
            {passengerDetails.adults ? (
              <Text style={[text,{color:colors.placeholderColor}]}>{passengerDetails.adults} Adults ,</Text>
            ) : null}
            {passengerDetails.children.length ? (
              <Text>{passengerDetails.children.length} Children(s) -</Text>
            ) : null}
            {passengerDetails.cabinClass ? (
              <Text>{passengerDetails.cabinClass}</Text>
            ) : null}
          </TouchableOpacity>
        </View>
      ) : null}
      {selectedCheckIndex === 1 ? (
        <OneWay
          setOpenAirportModal={setOpenAirportModal}
          singleDateModal={singleDateModal}
          setSingleDateModal={setSingleDateModal}
          setPassengerMoal={setPassengerMoal}
          passengerDetails={passengerDetails}
        />
      ) : null}
      {selectedCheckIndex === 2 ? (
        <MultiCity
          setOpenAirportModal={setOpenAirportModal}
          singleDateModal={singleDateModal}
          setSingleDateModal={setSingleDateModal}
          setPassengerMoal={setPassengerMoal}
          passengerDetails={passengerDetails}
        />
      ) : null}
      <Button title={'Search'} />
      <SearchModal
        visible={openAirportModal}
        setVisible={setOpenAirportModal}
      />
      <DateModal
        visible={flightDateModal}
        setVisible={setFlightDateModal}
        handleDateChange={handleFlightDateChange}
        handleConfirm={handleFlightDateConfirm}
      />
      <PassengerModal
        visible={passengerModal}
        setVisible={setPassengerMoal}
        data={passengerDetails}
        setData={setPassengerDetails}
      />
    </View>
  );
};

export default Flights;

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
