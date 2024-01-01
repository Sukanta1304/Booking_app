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
import Stays from '../components/Stays';
import Flights from '../components/Flights';

const {height, width} = Dimensions.get('window');

const Home = () => {
  const [activeTab, setActiveTab] = useState(0);
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
          <Stays/>
        )}
        {activeTab === 1 && (
          <Flights/>
        )}
        {
          activeTab === 2 && 
          <Cars/>
        }
      </View>     
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
