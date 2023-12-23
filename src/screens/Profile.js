import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from '../components/Icon'
import { Button } from '@rneui/base';
import { text } from '../constants/globalStyles';

const {height,width}= Dimensions.get('window');

const Profile = ({route,navigation}) => {
  return (
    <View>
      <View style={styles.upperContainer}> 
        <Icon library={'FontAwesome'} name={'user-circle-o'} color={'white'}/>
        <Text style={[text,{marginVertical:10}]}>Sign in to see deals and Genius Discounts</Text>
        <Button
        title={'signin'}
        onPress={()=>navigation.navigate('Login')}
        />
      </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  upperContainer:{
    width:width,
    height:height/3,
    backgroundColor:'purple',
    justifyContent:'center',
    alignItems: 'center',
  }
})