import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {heading} from '../constants/globalStyles';
import { colors } from '../constants/colors';
import Icon from './Icon';

const {height,width}= Dimensions.get('window');

const CommonHeader = ({onPress}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onPress}>
        <Icon library={'AntDesign'} name={'close'} color={'white'} />
      </TouchableOpacity>
      <Text style={[heading, {color: 'white'}]}>Booking.com</Text>
    </View>
  );
};

export default CommonHeader;

const styles = StyleSheet.create({
  header: {
    width: width,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    padding: 10,
  },
});
