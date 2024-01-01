import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { text } from '../constants/globalStyles'

const Bookings = () => {
  const [bookings,setBookings]= useState([])
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
       {
        bookings.length?
        <Text style={text}>Your bookings items</Text>:
        <Text style={text}>No bookings to show</Text>
       }
    </View>
  )
}

export default Bookings

const styles = StyleSheet.create({})