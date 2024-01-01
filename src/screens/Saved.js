import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { text } from '../constants/globalStyles';

const Saved = () => {

  const [saved,setSaved]= useState([]);

  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
       {
        saved.length?
        <Text style={text}>Your saved items</Text>:
        <Text style={text}>No saved to show</Text>
       }
    </View>
  )
}

export default Saved

const styles = StyleSheet.create({})