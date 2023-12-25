import {
  Alert,
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
// import {APP_NAME} from '@env';
import Icon from '../components/Icon';
import {heading, text} from '../constants/globalStyles';
import {Input} from '@rneui/themed';
import {Button, CheckBox} from '@rneui/base';
import CommonHeader from '../components/CommonHeader';
import DestinationModal from '../components/DestinationModal';
import DateModal from '../components/DateModal';
import moment from 'moment';
import RoomsModal from '../components/RoomsModal';
import SearchModal from '../components/SearchModal';
import PassengerModal from '../components/PassengerModal';
import OneWay from '../components/OneWay';
import SingleDateModal from '../components/SingleDateModal';
import MultiCity from '../components/MultiCity';
import Cars from '../components/Cars';

const {height, width} = Dimensions.get('window');

const Home = () => {
  const [activeTab, setActiveTab] = useState(0);
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
  // console.log(checkIndetails,'ckdetails')
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
  const [singleDateModal,setSingleDateModal] =useState({state:false,date: new Date()});

  const tabs = [
    {
      id: 1,
      name: 'Stays',
      icon: active => (
        <Icon
          library={'FontAwesome'}
          name={'hotel'}
          color={active ? 'purple' : 'white'}
        />
      ),
    },
    {
      id: 2,
      name: 'Flights',
      icon: active => (
        <Icon
          library={'FontAwesome'}
          name={'plane'}
          color={active ? 'purple' : 'white'}
        />
      ),
    },
    {
      id: 3,
      name: 'Cars',
      icon: active => (
        <Icon
          library={'FontAwesome'}
          name={'car'}
          color={active ? 'purple' : 'white'}
        />
      ),
    },
  ];

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

  const handleTabPress = index => {
    setActiveTab(index);
  };

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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={heading}> Booking </Text>
      <View
        style={{
          backgroundColor: 'purple',
          width: '100%',
          paddingVertical: 10,
          marginVertical: 10,
        }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}>
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.tab,
                {
                  backgroundColor: activeTab === index ? 'white' : 'purple',
                },
              ]}
              onPress={() => handleTabPress(index)}>
              {tab.icon(activeTab === index)}
              <Text style={{color: activeTab === index ? 'purple' : 'white'}}>
                {tab.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View>
        {activeTab === 0 && (
          <View style={{width: width / 1.1, alignSelf: 'center'}}>
            <TouchableOpacity
              style={styles.formElement}
              onPress={() => setSearchVisible(true)}>
              <Icon library={'FontAwesome'} name={'search'} />
              <Text>Enter Your Destination</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.formElement}
              onPress={() => setDateModalVisible(true)}>
              <Icon library={'FontAwesome'} name={'calendar-o'} />
              <Text>
                {moment(dates?.checkin).format('ddd MMM D')} -{' '}
                {moment(dates?.checkout).format('ddd MMM D')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.formElement}
              onPress={() => setRoomVisible(true)}>
              <Icon library={'AntDesign'} name={'user'} />
              <Text>
                {checkIndetails.rooms} room - {checkIndetails.adults} Adults -{' '}
                {checkIndetails.children.length} children(s)
              </Text>
            </TouchableOpacity>
            <Button title={'Search'} />
          </View>
        )}
        {activeTab === 1 && (
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
            { selectedCheckIndex ===0 ?
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
                      <Text style={[text, {paddingVertical: 5}]}>
                        Where from?
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        setOpenAirportModal({state: true, type: 'takeoff'})
                      }>
                      <Text style={[text, {paddingVertical: 5}]}>
                        Where to?
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flex: 0.2,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Icon
                      library={'MaterialCommunityIcons'}
                      name={'swap-vertical'}
                    />
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
                  <Text>
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
                    <Text>{passengerDetails.adults} Adults ,</Text>
                  ) : null}
                  {passengerDetails.children.length ? (
                    <Text>
                      {passengerDetails.children.length} Children(s) -
                    </Text>
                  ) : null}
                  {passengerDetails.cabinClass ? (
                    <Text>{passengerDetails.cabinClass}</Text>
                  ) : null}
                </TouchableOpacity>
              </View>: null
            }
            { selectedCheckIndex ===1 ?
              <OneWay 
              setOpenAirportModal={setOpenAirportModal}
              singleDateModal={singleDateModal}
              setSingleDateModal={setSingleDateModal}
              setPassengerMoal={setPassengerMoal}
              passengerDetails={passengerDetails}
              />: null
            }
            {
              selectedCheckIndex ===2 ?
              <MultiCity
              setOpenAirportModal={setOpenAirportModal}
              singleDateModal={singleDateModal}
              setSingleDateModal={setSingleDateModal}
              setPassengerMoal={setPassengerMoal}
              passengerDetails={passengerDetails}
              />: null
            }
            <Button title={'Search'} />
          </View>
        )}
        {
          activeTab === 2 && 
          <Cars/>
        }
      </View>
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
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tab: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 15,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
