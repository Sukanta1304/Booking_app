/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';

import StackNavigaor from './src/navigators/StackNavigators';
import { NavigationContainer } from '@react-navigation/native';



function App(){
 
  return (
    <NavigationContainer>
        <StackNavigaor/>
    </NavigationContainer>
  );
}

export default App;
