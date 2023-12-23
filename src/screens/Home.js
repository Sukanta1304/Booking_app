import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
// import {APP_NAME} from '@env';
import Icon from '../components/Icon';
import { heading } from '../constants/globalStyles';
import { FlatList } from 'react-native-gesture-handler';

const Home = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs=[
    {
      id:1,
      name: 'Stays',
      icon:(active)=> <Icon library={'FontAwesome'} name={'hotel'} color={active?'purple':'white'}/>
    },
    {
      id:2,
      name: 'Flights',
      icon: (active)=> <Icon library={'FontAwesome'} name={'plane'} color={active?'purple':'white'}/>
    },
    {
      id:3,
      name: 'Cars',
      icon:(active)=> <Icon library={'FontAwesome'} name={'car'} color={active?'purple':'white'}/>
    }
  ];

  const handleTabPress = (index) => {
    setActiveTab(index);
  };
  
  return (
    <View style={styles.container}>
      <Text style={heading}> Booking </Text>
      <View style={{backgroundColor:'purple',width:'100%',paddingVertical:10,marginVertical:10}}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.tab,
              {
                backgroundColor: activeTab === index ? 'white' : 'purple',
              },
            ]}
            onPress={() => handleTabPress(index)}
          >
            {tab.icon(activeTab === index)}
            <Text style={{ color: activeTab === index ? 'purple' : 'white' }}>{tab.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container:{
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
    height:50,
    justifyContent: 'center',
    alignItems: 'center',
  },
})