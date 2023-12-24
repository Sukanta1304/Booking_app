import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
// import {APP_NAME} from '@env';
import Icon from '../components/Icon';
import {heading} from '../constants/globalStyles';
import {Input} from '@rneui/themed';
import { Button } from '@rneui/base';

const {height,width}= Dimensions.get("window");

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
      <View style={{width:'90%',alignSelf:'center'}}>
        {activeTab === 0 && (
          <View>
           <TouchableOpacity style={styles.formElement}>
            <Icon library={'FontAwesome'} name={'search'}/>
            <Text>Enter Your Destination</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.formElement}>
            <Icon library={'FontAwesome'} name={'calendar-o'}/>
            <Text>Sun 24 Dec - Mon 25 Dec</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.formElement}>
            <Icon library={'AntDesign'} name={'user'}/>
            <Text>1 room - 2 Adults - 0 children(s)</Text>
           </TouchableOpacity>
            <Button
              title={'Search'}
            />
          </View>
        )}
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
  formElement:{
    flexDirection:'row',
    gap:10,
    padding:10,
    borderWidth:1,
    borderRadius:5,
    marginBottom:10,
    alignItems:'center'
  }
});
