import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './BottomNavigators';
import Launch from '../screens/Launch';
import Login from '../screens/Login';

const Stack = createStackNavigator();

function StackNavigaor() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Launch" component={Launch} options={{headerShown:false}}/>
      <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
      <Stack.Screen name="Main" component={TabNavigator} options={{headerShown:false}}/>
      {/* <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} /> */}
    </Stack.Navigator>
  );
}

export default StackNavigaor;