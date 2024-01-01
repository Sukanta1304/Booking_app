import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import Icon from '../components/Icon';
import {Button} from '@rneui/base';
import {text} from '../constants/globalStyles';
import { TouchableOpacity } from 'react-native';

const {height, width} = Dimensions.get('window');

const Profile = ({route, navigation}) => {
  const isUserLoggedIn = false;

  const listItems = [
    {
      type: '',
      items: [
        {
          id: 1,
          title: isUserLoggedIn
            ? 'Manage your account'
            : 'Sign in or create account',
          icon: isUserLoggedIn ? (
            <Icon library={'AntDesign'} name={'user'} />
          ) : (
            <Icon library={'AntDesign'} name={'login'} />
          ),
          onpress: () => console.log(1),
        },
        {
          id: 2,
          title: 'Rewards & Wallet',
          icon: <Icon library={'Entypo'} name={'wallet'} />,
          onpress: () => console.log(2),
        },
        {
          id: 3,
          title: 'Genius loyality programme',
          icon: <Icon library={'SimpleLineIcons'} name={'social-google'} />,
          onpress: () => console.log(3),
        },
        {
          id: 4,
          title: 'Reviews',
          icon: (
            <Icon
              library={'MaterialCommunityIcons'}
              name={'thumbs-up-down-outline'}
            />
          ),
          onpress: () => console.log(4),
        },
      ],
    },
    {
      type: 'Help and support',
      items: [
        {
          id: 5,
          title: 'Contact customer service',
          icon: <Icon library={'EvilIcons'} name={'question'} />,
          onpress: () => console.log(5),
        },
        {
          id: 6,
          title: 'Dispute Resolution',
          icon: <Icon library={'FontAwesome'} name={'handshake-o'} />,
          onpress: () => console.log(6),
        },
      ],
    },
    {
      type: 'Discover',
      items: [
        {
          id: 7,
          title: 'Deals',
          icon: <Icon library={'MaterialIcons'} name={'discount'} />,
          onpress: () => console.log(7),
        },
        {
          id: 8,
          title: 'Airport Taxis',
          icon: <Icon library={'FontAwesome'} name={'taxi'} />,
          onpress: () => console.log(8),
        },
      ],
    },
    {
      type: 'Settings',
      items: [
        {
          id: 9,
          title: 'Settings',
          icon: <Icon library={'Ionicons'} name={'settings-outline'} />,
          onpress: () => console.log(9),
        },
      ],
    },
    {
      type: 'Partners',
      items: [
        {
          id: 10,
          title: 'List your property',
          icon: <Icon library={'MaterialIcons'} name={'add-home-work'} />,
          onpress: () => console.log(10),
        },
      ],
    },
    {
      type: '',
      items: [
        {
          id: 11,
          title: 'Sign out',
          icon: <Icon library={'AntDesign'} name={'logout'} />,
          onpress: () => console.log(11),
        },
      ],
    },
  ];

  
  return (
    <View style={{flex:1}}>
      <View style={styles.upperContainer}></View>
      <ScrollView>
        <View
          style={[
            styles.upperContainer,
            {
              height: 'auto',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 15,
            },
          ]}>
          <Icon
            library={'FontAwesome'}
            name={'user-circle-o'}
            color={'white'}
            size={50}
          />
          <View>
            {isUserLoggedIn ? (
              <Text style={[text, {marginVertical: 10, color: 'white'}]}>
                emal@user.com
              </Text>
            ) : (
              <View>
                <Text style={[text, {marginVertical: 10, color: 'white'}]}>
                  Sign in to see deals and Genius Discounts
                </Text>
                <Button
                  title={'Sign in'}
                  onPress={() => navigation.navigate('Login')}
                  containerStyle={{width: width / 3, alignSelf: 'center'}}
                />
              </View>
            )}
          </View>
        </View>
        <View style={styles.listContainer}>
        {
        listItems.map((listItem,i)=>
        <View key={i}>
          {listItem.type && <Text style={[text,{marginVertical:10}]}>{listItem.type}</Text>}
          {
            listItem.items.map((item,i)=>
            <TouchableOpacity key={i} onPress={item.onpress} style={styles.listItem}>
              {item.icon}
              <Text style={text}>{item.title}</Text>
            </TouchableOpacity>
            )
          }
        </View>
        )
       }
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  upperContainer: {
    width: width,
    height: height / 10,
    backgroundColor: 'purple',
  },
  listContainer:{
    margin:10,
    padding:10
  },
  listItem:{
    flexDirection:'row',
    gap:5,
    marginBottom:10,
  }
});
