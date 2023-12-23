import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Chat from '../screens/Chat';
import Saved from '../screens/Saved';
import Icon from '../components/Icon';
import Bookings from '../screens/Bookings';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <Icon library={"MaterialCommunityIcons"} name="home" size={size} color={color} />
          ),
        }}
      />
        <Tab.Screen
        name="Saved"
        component={Saved}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <Icon library={"MaterialIcons"} name="favorite" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={Bookings}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <Icon library={"MaterialCommunityIcons"} name="bag-suitcase" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <Icon library={"FontAwesome"} name="user-circle-o" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
