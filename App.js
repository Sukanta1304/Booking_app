/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';

import StackNavigaor from './src/navigators/StackNavigators';
import { NavigationContainer } from '@react-navigation/native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';


function App(){

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '772428799515-9ajm6ijfjueq7tbgqjk1ou86f9dk1quk.apps.googleusercontent.com', 
    });
  }, []);

 
  return (
    <NavigationContainer>
        <StackNavigaor/>
    </NavigationContainer>
  );
}

export default App;
