import {Alert, Modal, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CommonHeader from './CommonHeader';
import {Button} from '@rneui/base';
import moment from 'moment';
import CalendarPicker from 'react-native-calendar-picker';

const DateModal = ({visible,setVisible,handleDateChange,handleConfirm}) => {
  const minDate = new Date();
  minDate.setDate(new Date().getDate());
  // console.log(moment(value.split(' ')[0]).format('ddd MMM D'),'date');

  return (
    <Modal visible={visible}>
      <CommonHeader onPress={() => setVisible(false)} />
      <View>
        <CalendarPicker
          allowRangeSelection={true}
          minDate={minDate}
          todayBackgroundColor="#f2e6ff"
          selectedDayColor="#7300e6"
          selectedDayTextColor="#FFFFFF"
          onDateChange={handleDateChange}
        />
      </View>
      <Button
        title={'Confirm'}
        onPress={handleConfirm}
      />
    </Modal>
  );
};

export default DateModal;

const styles = StyleSheet.create({});
